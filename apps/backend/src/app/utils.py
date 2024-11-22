from app.data import apartments


def generate_apartment_id() -> int:
    return (max(a["id"] for a in apartments) + 1) if apartments else 1
