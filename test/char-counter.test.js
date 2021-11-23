import charCounter, {countCharFromData} from "../src/char-counter.js";

describe('CharCounter Testing', () => {
    describe('countCharFromData', () => {
        it('should count characters on data', () => {

            const char1 = "a aa aaa aaaa aaaaa"
            const char2 = "b bb bbb bbbb bbbbb"

            const mock_data = [{name: char1}, {name: char2}]

            expect(countCharFromData('a', mock_data)).toBe(15)
            expect(countCharFromData('b', mock_data)).toBe(15)
            expect(countCharFromData('c', mock_data)).toBe(0)

        });
    });
});
