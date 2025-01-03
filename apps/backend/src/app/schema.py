from pydantic import BaseModel


class BaseApartment(BaseModel):
    rooms: int
    surface: float
    price: int
    floor: int
    favorite: bool
    available: bool


class Apartment(BaseApartment):
    id: int
