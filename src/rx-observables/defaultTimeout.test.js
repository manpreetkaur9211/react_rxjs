import React from "react";
import {render} from "@testing-library/react";
import {defaultValueEmissionInterval, defaultValue} from "../utils/constants";
import {isObservable} from "rxjs";

let defaultIfTimeout;
let inputStream;
jest.setTimeout(3 * defaultValueEmissionInterval);

beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
    jest.clearAllMocks();
    defaultIfTimeout = require('./defaultIfTimeout').defaultIfTimeout;
    inputStream = new (require.requireActual('rxjs').Subject)();
});
describe('defaultIfTimeout', () => {
    it('1 .if no data has been emitted by by stream, will emit N/A after 1000ms(defaultValueEmissionInterval)  ', (done) => {
        jest.clearAllMocks();
        const monitoringObservable = defaultIfTimeout(inputStream);
        expect(isObservable(monitoringObservable)).toBe(true);
        let count = 0;
        const subscription = monitoringObservable.subscribe((value)=> {
            if (count == 0) {
                expect(value).toEqual(defaultValue);
                subscription.unsubscribe();
                done();
            }
            count++;
        });

    });
    it('2 .if initially data emitted before 1000ms, later no data emitted, will emit N/A after 1000ms(defaultValueEmissionInterval)  ', (done) => {
        jest.clearAllMocks();
        const inputValue = 10;
        const monitoringObservable = defaultIfTimeout(inputStream);
        expect(isObservable(monitoringObservable)).toBe(true);
        let count = 0;
        const subscription = monitoringObservable.subscribe((value)=> {
            if (count == 0) {
                expect(value).toEqual(inputValue);
            }
            if (count == 1) {
                expect(value).toEqual(defaultValue);
                subscription.unsubscribe();
                done();
            }
            count++;
        });
        inputStream.next(inputValue)

    });
});