import  {useEffect, useState} from "react";
import {createDataObservable} from "../rx-observables/index";
/**
 * custom hook which accepts initialState of data and return the updated value
 * @param initialState
 * @returns {*}
 */
export const useDataProvider = (initialState)=> {
    const [displayObject, setDisplayObject] = useState(initialState);
    useEffect(() => {
        let subscription = createDataObservable()
            .subscribe((displayObject) =>setDisplayObject({...displayObject}));
        return () => subscription && subscription.unsubscribe()
    }, []);
    return displayObject;
};