from api.swapi.base import Client

class SwapiClient:
    def __init__(self) -> None:
        self.films = Client("films")
        self.starships = Client("starships")
