function calculateSpending(data) {
    if (!data) {
        return
    }

    const costPerStarship = {}
    for(let i = 0; i < data.films.length; i++) {
        let totalCost = 0
        const film = data.films[i]
        if (!film) {
            continue
        }
        const starships = data.starships.filter((s) => film.starshipIds.includes(s.id))
        for(let j = 0; j < starships.length; j++) {
            const starship = starships[j]
            if (!starship) {
                continue
            }
            totalCost += starship.cost
        }
        costPerStarship[parseInt(film.release_date.split("-")[0])] = totalCost
    }

    return costPerStarship
}

export { calculateSpending };