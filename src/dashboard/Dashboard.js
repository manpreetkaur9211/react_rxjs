import React from "react";
import './Dashboard.css';
import InfoCard from "./../views/info-card/InfoCard"
import {useDataProvider} from "../hooks/useDataProvider";

export default function Dashboard() {
    const displayObject = useDataProvider({
        temperature: 'Waiting...',
        pressure: 'Waiting...',
        humidity: 'Waiting...',
    });
    return (
        <div className="container">
            <InfoCard label={'Temperature'} value={displayObject.temperature}/>
            <InfoCard label={'Air Pressure'} value={displayObject.pressure}/>
            <InfoCard label={'Humidity'} value={displayObject.humidity}/>
        </div>
    )
};



