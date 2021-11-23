import {formatBenchMarkTime, benchMarkInTime, getBenchMarkTime} from "../src/benchmark.js";
import {hrtime} from "process";

// mocked data
const seconds0 = 0
const seconds1 = 1
const seconds2 = 2
const seconds3 = 3
const seconds4 = 4
const seconds5 = 5

const nanoseconds0 = 0
const nanoseconds1 = 1561279202
const nanoseconds2 = 2561279202
const nanoseconds3 = 3561279202
const nanoseconds4 = 4561279202
const nanoseconds5 = 5561279202

const hrtime0 = [seconds0, nanoseconds0]
const hrtime1 = [seconds1, nanoseconds1]
const hrtime2 = [seconds2, nanoseconds2]
const hrtime3 = [seconds3, nanoseconds3]
const hrtime4 = [seconds4, nanoseconds4]
const hrtime5 = [seconds5, nanoseconds5]

describe('BenchMark Testing', () => {
    describe('formatBenchMarkTime', () => {
        it('should format the benchmark time response', () => {

            const format0 = formatBenchMarkTime(hrtime0)
            const format1 = formatBenchMarkTime(hrtime1)
            const format2 = formatBenchMarkTime(hrtime2)
            const format3 = formatBenchMarkTime(hrtime3)
            const format4 = formatBenchMarkTime(hrtime4)
            const format5 = formatBenchMarkTime(hrtime5)

            expect(format0).toBe('0s 0ms')
            expect(format1).toBe('1s 1561.279202ms')
            expect(format2).toBe('2s 2561.279202ms')
            expect(format3).toBe('3s 3561.279202ms')
            expect(format4).toBe('4s 4561.279202ms')
            expect(format5).toBe('5s 5561.279202ms')
        });
    });

    describe('benchMarkInTime', () => {
        it('should return if the time condition is Ok', () => {
            expect(benchMarkInTime(hrtime0)).toBeTruthy()
            expect(benchMarkInTime(hrtime1)).toBeTruthy()
            expect(benchMarkInTime(hrtime2)).toBeTruthy()
            expect(benchMarkInTime(hrtime3)).toBeFalsy()
            expect(benchMarkInTime(hrtime4)).toBeFalsy()
            expect(benchMarkInTime(hrtime5)).toBeFalsy()
        });
    });

    describe('getBenchMarkTime', () => {
        it('should return time spend on benchmark', () => {
            const benchamark = getBenchMarkTime(hrtime())
            expect(benchamark).toHaveProperty('time')
        });
        it('should return if function is on time', () => {
            const benchamark = getBenchMarkTime(hrtime())
            expect(benchamark).toHaveProperty('in_time')
        });
    });
});
