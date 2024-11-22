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
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        clients.remove(websocket)

async def broadcast_apartment_update(updated_apartment: dict):
    for client in clients:
        try:
            await client.send_json(updated_apartment)
        except WebSocketDisconnect:
            clients.remove(client)


@router.post(
    "/apartments", response_model=Apartment, status_code=status.HTTP_201_CREATED
)
def create_apartment(apartment: BaseApartment):
    next_id = generate_apartment_id()

    new_apartment = {"id": next_id, **apartment.model_dump()}
    apartments.append(new_apartment)
    return new_apartment


@router.get("/apartments", response_model=list[Apartment])
def find_apartments():
    return apartments


@router.get("/apartments/{id}", response_model=Apartment)
def find_apartment(id: int):
    apartment = next((a for a in apartments if a["id"] == id), None)
    if not apartment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Apartment with id {id} not found.",
        )
    return apartment


@router.put("/apartments/{id}", response_model=Apartment)
def update_apartment(id: int, updated_apartment: BaseApartment):
    for idx, apartment in enumerate(apartments):
        if apartment["id"] == id:
            apartments[idx] = {"id": id, **updated_apartment.model_dump()}
            return apartments[idx]
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Apartment with id {id} not found.",
    )


@router.delete("/apartments/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_apartment(id: int):
    global apartments
    apartments = [a for a in apartments if a["id"] != id]
    return {"message": f"Apartment with id {id} deleted successfully."}
