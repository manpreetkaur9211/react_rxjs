import {iif, throwError} from "rxjs";
import {timeoutWith, startWith, catchError} from "rxjs/operators";
import {defaultValue, ERROR_CODE} from "../utils/constants";
import {defaultValueEmissionInterval} from "../utils/constants";

export const defaultIfTimeout = (inputStream)=>inputStream.pipe(
    timeoutWith(defaultValueEmissionInterval, throwError(ERROR_CODE)),
    catchError((err)=> {
        return iif(() => err === ERROR_CODE, defaultIfTimeout(inputStream).pipe(startWith(defaultValue)), throwError(err))
    }));