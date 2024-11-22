from fastapi import APIRouter, HTTPException, WebSocket, WebSocketDisconnect, status
from app.schema import Apartment, BaseApartment
from app.utils import generate_apartment_id
from app.data import apartments


router = APIRouter(prefix="/api")
clients: list[WebSocket] = []


@router.websocket("/ws/apartments")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    clients.append(websocket)
    try:
        available_apartments = [
            apartment for apartment in apartments if apartment.get("available", True)
        ]
        await websocket.send_json(available_apartments)

        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        clients.remove(websocket)


async def broadcast_all_apartments():
    available_apartments = [
        apartment for apartment in apartments if apartment.get("available", True)
    ]
    for client in clients:
        try:
            await client.send_json(available_apartments)
        except WebSocketDisconnect:
            clients.remove(client)


@router.post(
    "/apartments", response_model=Apartment, status_code=status.HTTP_201_CREATED
)
async def create_apartment(apartment: BaseApartment):
    next_id = generate_apartment_id()
    new_apartment = {"id": next_id, **apartment.model_dump(), "available": True}
    apartments.append(new_apartment)

    await broadcast_all_apartments()
    return new_apartment


@router.get("/apartments", response_model=list[Apartment])
def find_apartments():
    available_apartments = [
        apartment for apartment in apartments if apartment.get("available", True)
    ]
    return available_apartments


@router.get("/apartments/{id}", response_model=Apartment)
def find_apartment(id: int):
    apartment = next(
        (a for a in apartments if a["id"] == id and a.get("available", True)), None
    )
    if not apartment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Available apartment with id {id} not found.",
        )
    return apartment


@router.put("/apartments/{id}", response_model=Apartment)
async def update_apartment(id: int, updated_apartment: BaseApartment):
    for idx, apartment in enumerate(apartments):
        if apartment["id"] == id:
            updated = {"id": id, **updated_apartment.model_dump()}
            apartments[idx] = updated

            await broadcast_all_apartments()

            return apartments[idx]

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Apartment with id {id} not found.",
    )


@router.delete("/apartments/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_apartment(id: int):
    global apartments
    deleted_apartment = next((a for a in apartments if a["id"] == id), None)

    if deleted_apartment and deleted_apartment.get("available", True):
        apartments = [a for a in apartments if a["id"] != id]

        await broadcast_all_apartments()

        return {"message": f"Apartment with id {id} deleted successfully."}

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Available apartment with id {id} not found.",
    )
