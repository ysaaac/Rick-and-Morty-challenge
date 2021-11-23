import charCounter from "./src/char-counter.js";
import episodeLocations from "./src/episode-locations.js";


async function main() {
    const charCounterResponse = await charCounter()
    const episodeLocationsResponse = await episodeLocations()
    return JSON.stringify([charCounterResponse, episodeLocationsResponse], null, 2)
}

const mainResponse = await main()
console.log(mainResponse)