import React from "react";
import {render} from "@testing-library/react";
import {throttleTimeInterval, defaultValueEmissionInterval, defaultValue} from "../utils/constants";
import {isObservable} from "rxjs";
import {getRandomNumber} from "./../event-emitter/index";

let monitoringObservable;
let tempStream;
let pressureStream;
let humidityStream;
let combinedObservable;
const temperature = 21;
const humidity = 2;
const pressure = 82.1;
jest.setTimeout(3 * defaultValueEmissionInterval);
beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
    jest.clearAllMocks();
    monitoringObservable = require('./monitoringObservable').monitoringObservable;
    tempStream = new (require.requireActual('rxjs').Subject)();
    pressureStream = new (require.requireActual('rxjs').Subject)();
    humidityStream = new (require.requireActual('rxjs').Subject)();
    combinedObservable = monitoringObservable(tempStream, pressureStream, humidityStream, throttleTimeInterval)

});
describe('monitoringObservable', () => {

    it('1. should return combined data for all the streams', (done) => {
        expect(isObservable(combinedObservable)).toBe(true);

        let count = 0;
        const subscription = combinedObservable.subscribe(value=> {
            if (count == 0) {
                expect(value.temperature).toEqual(temperature);
                expect(value.humidity).toEqual(humidity);
                expect(value.pressure).toEqual(pressure);
                subscription.unsubscribe();
                done();

            }
            count++;
        });

        tempStream.next(temperature);
        pressureStream.next(pressure);
        humidityStream.next(humidity);
    });

    it('2. should emit value after 100 ms(throttleTimeInterval) interval ', (done) => {
        jest.clearAllMocks();
        const callback = jest.fn();

        const subscription = combinedObservable.subscribe(callback);

        tempStream.next(temperature);
        pressureStream.next(pressure);
        humidityStream.next(humidity);

        expect(callback).toHaveBeenCalledTimes(0);
        setTimeout(()=> {
            expect(callback).toHaveBeenCalledTimes(1);
            subscription.unsubscribe();
            done();
        }, throttleTimeInterval);
    });

    it('3. if a specific data source does not emit data for defaultValueEmissionInterval, other two does, observable shld emit N/A  as stream first value ', (done) => {
        jest.clearAllMocks();

        expect(isObservable(combinedObservable)).toBe(true);

        let count = 0;
        const subscription = combinedObservable.subscribe(value=> {
            if (count == 0) {
                //as temprature stream has no data so emitted first value shld be N/A
                expect(value.temperature).toEqual(defaultValue);
                expect(value.humidity).toEqual(humidity);
                expect(value.pressure).toEqual(pressure);
                subscription.unsubscribe();
                done();
            }
            count++;
        });
        const randomValue = getRandomNumber(throttleTimeInterval, defaultValueEmissionInterval);
        setTimeout(()=> {
            pressureStream.next(pressure);
            humidityStream.next(humidity);
        }, randomValue);
    });

    it('4. if no data has been emitted by all the data sources till 1000ms, observable would emit(N/A,N/A,N/A) after 1000ms(defaultValueEmissionInterval)  ', (done) => {
        jest.clearAllMocks();

        let count = 0;
        const subscription=combinedObservable.subscribe((value)=> {
            if (count == 0) {
                //as no stream has any data so emitted first value shld be N/A for each Stream
                expect(value.temperature).toEqual(defaultValue);
                expect(value.humidity).toEqual(defaultValue);
                expect(value.pressure).toEqual(defaultValue);
                subscription.unsubscribe();
                done();
            }
            count++;
        });
    });
});