import EventEmitter from "events";
import {defaultValueEmissionInterval, throttleTimeInterval} from "../utils/constants";

class MonitoringSystemEmitter extends EventEmitter {

    trigger() {
        this.emit('data', (Math.random() * 1000).toFixed(2))
    }

}
export const getDataStream = (duration)=> {
    const emitter = new MonitoringSystemEmitter();
    generateInterval(emitter, null, duration, true);
    return emitter;
};

const generateInterval = (emitter, interval)=> {
    if (interval)clearInterval(interval);
    let nextDuration = getRandomNumber(throttleTimeInterval, 2 * defaultValueEmissionInterval);
    interval = setInterval(()=> {
        emitter.trigger();
        generateInterval(emitter, interval);
    }, nextDuration);
};

export const getRandomNumber = (min, max)=>Math.floor(Math.random() * (max - min)) + min;