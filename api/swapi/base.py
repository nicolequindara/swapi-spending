from typing import Optional

import requests
from requests.exceptions import HTTPError

SWAPI_BASE_URL = "https://swapi.dev/api/"

class Client:
    def __init__(self, resource: str):
        self.resource = resource

    def _make_url(self, resource: str, id: Optional[int] = None) -> str:
        url = f"{SWAPI_BASE_URL}{resource}/"
        if id:
            url = f"{url}{id}/"
        return url

    def get(self, id: int):
        response = requests.get(self._make_url(self.resource, id))
        response.raise_for_status()
        return response.json()
    
    def list(self):
        response = requests.get(self._make_url(self.resource))
        response.raise_for_status()
        return response.json()