import { useEffect, useState } from "react";

export const validPassword = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$');

const cleanUrl = (url, resource) => url.replace(`https://swapi.dev/api/${resource}/`,"").replace("/", "")

const useFetchSpending = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [apiData, setApiData] = useState({films: [], starships: []});
    const [serverError, setServerError] = useState(null);

  
    useEffect(() => {
      setIsLoading(true);

      const fetchStarship = async (starshipId) => {
        /**
         * Get starship
         */
        return fetch(`https://swapi.dev/api/starships/${starshipId}/`, {
          method: "GET",
        })
          .then((response) => response.json())
          .then((data) => {
            const name = data.name
            const cost = isNaN(data.cost_in_credits) ? 0 : parseInt(data.cost_in_credits)
            apiData.starships[starshipId] = { cost, name, id: starshipId }
            setApiData({...apiData})
          })
          .catch((error) => console.log(error))
      }

      const fetchFilm = async (filmId) => {
        /**
         * Get starships per film
         */
        const costPerStarship = new Map()
        return fetch(`https://swapi.dev/api/films/${filmId}/`, {
          method: "GET",
        })
          .then((response) => response.json())
          .then((data) => {
            const starshipUrls = data.starships;
            starshipUrls.forEach((url) => {
              const starshipId = parseInt(cleanUrl(url, "starships"));

              if (!costPerStarship.has(starshipId)) {
                fetchStarship(starshipId)
              }
              return costPerStarship
            });
          })
          .catch((error) => console.log(error));
      }

      const fetchData = async () => {
        /**
         * Get films
         */
        try {
        // TODO: CORS issue in local dev
        //  fetch("http://0.0.0.0:8000/films/1", {
            fetch("https://swapi.dev/api/films", {
            method: "GET",
          })
            .then((response) => response.json())
            .then((data) => {
                const films = data.results
                films.forEach(film => {
                    const filmId = parseInt(cleanUrl(film.url, "films"));
                    const starshipIds = film.starships.map(u => parseInt(cleanUrl(u, "starships")));
                    apiData.films[filmId] = { id: filmId, starshipIds, ...film }
                    if (!filmId) {
                        console.log("Missing film " + filmId)
                    }
                    setApiData({...apiData})
                    fetchFilm(filmId)
                })
            })
            .catch((error) => console.log(error));
          setIsLoading(false);
        } catch (error) {
          setServerError(error);
          setIsLoading(false);
        }
      };
  
      fetchData();
    }, []);

    return { isLoading, apiData, serverError };
  };

export default useFetchSpending;