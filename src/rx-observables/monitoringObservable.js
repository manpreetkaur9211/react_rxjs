import {combineLatest, asyncScheduler} from "rxjs";
import {map, throttleTime} from "rxjs/operators";
import {defaultIfTimeout} from "./defaultIfTimeout";
/**
 * accepts data streams and return combined stream
 * which ignore source input for next throttleTimeInterval and then emits latest value
 * @param tempStream
 * @param pressureStream
 * @param humidityStream
 * @param throttleTimeInterval
 * @returns {*}
 */
export const monitoringObservable = (tempStream, pressureStream, humidityStream, throttleTimeInterval) => {
    return combineLatest(defaultIfTimeout(tempStream), defaultIfTimeout(pressureStream), defaultIfTimeout(humidityStream))
        .pipe(
            throttleTime(throttleTimeInterval, asyncScheduler, {leading: false, trailing: true}),
            map((values) => ({
                temperature: values[0],
                pressure: values[1],
                humidity: values[2],
            }))
        )
};
