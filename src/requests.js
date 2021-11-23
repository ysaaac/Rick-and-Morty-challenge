import nodeFetch from "node-fetch";

const HOST = 'https://rickandmortyapi.com/api'

/**
 * Request is an easy and reusable function that handle request from API
 * @param  {string} url is the endpoint that will be use for request data
 */
async function request(url) {
    try {
        const response = await nodeFetch(`${HOST}/${url}`)
        return response.json()
    } catch (err) {
        console.log(err.message);
    }
}

/**
 * getAllData handle the request to get all data on the API
 * There is two ways to get this data.
 * -> FasterWay approachs the API implementation of "Get multiple characters" (https://rickandmortyapi.com/documentation/#get-multiple-characters)
 * and request all data in just two request dinamically. The first time request data normally and get number of objects this endpoint has
 * mentioned at the info of the request response. After that it generate an array an request all data. The bad of this is that is assuming
 * that ids are secuencially numerated, that it's ok for this, but not the best idea for a production enviroment, but let's be realistic in a real
 * production enviroment this will not be done like this, because is easier to get all of it from a sql query or something similar
 * -> NOT FasterWay request all data from each page until the requests saids on info that there is no more pages and return all recolected data
 * @param  {string} url is the endpoint that will be use for request data
 * @param  {boolean || null} getFasterWay indicates the method that data will be request
 */
export async function getAllData(url, getFasterWay = null) {
    const data = []
    let req = await request(url)
    // getWay will define
    if (getFasterWay) {
        // Get all data from API assuming that ids increas by one each time
        // so it request data from id:1 to the last id number
        const {info: {count: qtyOfElements}} = req
        const numberData = Array.from(new Array(qtyOfElements), (x, i) => i + 1).join(",");
        return await request(`${url}/${numberData}`)
    } else {
        // Iterates through all the pages and get all data automatically
        let next = req.info.next
        let result = req.result
        while (!!next) {
            console.log(next)
            data.concat(result)
            let req = await request(next)
            next = req.info.next
            result = req.result
        }
    }
    return data
}