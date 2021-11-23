import {hrtime} from "process";
import {getAllData} from "./requests.js";
import {getBenchMarkTime} from "./benchmark.js";

/**
 * @param  {string} char that will be search on data array
 * @param  {[object]} data is the response of request getted from API
 */
export function countCharFromData(char, data) {
    let qtyOfChars = 0
    const searchReg = new RegExp(char, "gi")
    data.forEach(dataObj => {
        const {name} = dataObj
        qtyOfChars += (name.match(searchReg) || []).length
    })
    return qtyOfChars
}


export default async function charCounter() {
    // Starts performance timer
    const startBenchMark = hrtime();
    // Request all data from API
    const characters = await getAllData("character", true)
    const locations = await getAllData("location", true)
    const episodes = await getAllData("episode", true)
    // Counts letters from data get in the step before
    const qtyOfCharOnCharacters = countCharFromData("c", characters)
    const qtyOfCharOnLocations = countCharFromData("l", locations)
    const qtyOfCharOnEpisodes = countCharFromData("e", episodes)
    // Get time that tooks process function
    const {time, in_time} = getBenchMarkTime(startBenchMark)
    return {
        "exercise_name": "Char counter",
        "time": time,
        "in_time": in_time,
        "results": [
            {
                "char": "l",
                "count": qtyOfCharOnLocations,
                "resource": "location"
            },
            {
                "char": "e",
                "count": qtyOfCharOnEpisodes,
                "resource": "episode"
            },
            {
                "char": "c",
                "count": qtyOfCharOnCharacters,
                "resource": "character"
            }
        ]
    }
}
