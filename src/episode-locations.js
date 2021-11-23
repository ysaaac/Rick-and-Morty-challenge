import {hrtime} from "process";
import {getAllData} from "./requests.js";
import {getBenchMarkTime} from "./benchmark.js";

async function formatLocationsAndCharacters() {
    const characters = await getAllData("character", true)
    let formatedData = {}
    characters.forEach(characterObj => {
        const {id: characterId, origin: {name: originName}} = characterObj
        formatedData[characterId] = originName
    })
    return formatedData
}


export default async function episodeLocations() {
    // Starts performance timer
    const startBenchMark = hrtime();
    const episodes = await getAllData("episode", true)
    const formatedCharacters = await formatLocationsAndCharacters()
    // ------------------------------
    const result = []
    episodes.forEach(episodeObj => {
        const {name, episode, characters} = episodeObj
        const locationsSet = new Set()
        characters.forEach(characterURI => {
            const characterId = characterURI.match(/(\d+)/g)
            if (characterId) {
                locationsSet.add(formatedCharacters[characterId])
            }
        })
        const locations = [...locationsSet]
        result.push({
            name,
            episode,
            locations
        })
    })
    // ------------------------------
    // Get time that tooks process function
    const {time, in_time} = getBenchMarkTime(startBenchMark)
    return {
        "exercise_name": "Episode locations",
        "time": time,
        "in_time": in_time,
        "results": result
    }
}
