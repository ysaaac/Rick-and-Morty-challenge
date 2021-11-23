import {hrtime} from "process";

/**
 * It returns a friendly way to read benchmark time
 * @param  {[number, number]} hrtime is the time returned by node native implementation
 */
export function formatBenchMarkTime(hrtime) {
    const seconds = hrtime[0]
    const nanoseconds = Number(hrtime[1]);
    const milliseconds = nanoseconds / 1000000;
    return `${seconds}s ${milliseconds}ms`
}

/**
 * One of the objectives is return response in less than 3seconds, but
 * sometimes it can not be possible due to internet connection so it returns if objective
 * was achived or not
 * @param  {[number, number]} hrtime is the time returned by node native implementation
 */
export function benchMarkInTime(hrtime) {
    const [seconds, nanoseconds] = hrtime
    if (Number(seconds) < 3) {
        return true
    } else if (Number(seconds) === 3 && (Number(nanoseconds) === 0)) {
        return true
    }
    return false
}

export function getBenchMarkTime(startBenchMark) {
    const endBenchmark = hrtime(startBenchMark);
    return {time: formatBenchMarkTime(endBenchmark), "in_time": benchMarkInTime(endBenchmark)}
}
