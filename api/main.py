from api.swapi.swapi_client import SwapiClient

from fastapi import FastAPI

app = FastAPI()
swapi_client = SwapiClient()

@app.get("/films/{id}")
def get_film(id: int):
    """ See https://swapi.tech/documentation#films
        Gets Star Wars film by ID

    Args:
        id (int): film id

    Returns:
        Film

    Raises:
        404 if film does not exist
    """
    return swapi_client.films.get(id)


@app.get("/starships/{id}")
def get_starships(id: int):
    """ See https://swapi.tech/documentation#films
        Gets Starship by ID

    Args:
        id (int): starship id

    Returns:
        Starship

    Raises:
        404 if film does not exist
    """
    return swapi_client.starships.get(id)