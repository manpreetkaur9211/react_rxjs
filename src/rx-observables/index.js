import {fromEvent} from "rxjs";
import {throttleTimeInterval} from "../utils/constants";
import {getDataStream} from "../event-emitter";
import {monitoringObservable} from "./monitoringObservable";
/**
 * initializes data streams and return Monitoring observable
 */
export const createDataObservable = ()=> {
    let tempStream = fromEvent(getDataStream(), 'data');
    let pressureStream = fromEvent(getDataStream(), 'data');
    let humidityStream = fromEvent(getDataStream(), 'data');
    return monitoringObservable(tempStream, pressureStream, humidityStream, throttleTimeInterval);
};


