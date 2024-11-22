import os

from pydantic_settings import BaseSettings
from starlette.config import Config

current_file_dir = os.path.dirname(os.path.realpath(__file__))
env_path = os.path.join(current_file_dir, "..", '..', ".env")

config = Config(env_path)


class Settings(BaseSettings):
    PORT: int = config("PORT")
    CORS_ORIGINS: str = config("CORS_ORIGINS")


settings = Settings()
