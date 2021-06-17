import React, { useState, useEffect } from 'react';
import moment from "moment";

const Clock = props => {
    function getCurrentTime() {
        return moment().format("h:mm:ss a");
    }

    const [currentTime, setCurrentTime] = useState(getCurrentTime());

    useEffect(() => {
        var timerID = setInterval(() => tick(), 1000);
        return function cleanup() {
            clearInterval(timerID);
        };
    });

    function tick() {
        setCurrentTime(getCurrentTime());
    }

    return (
        <React.Fragment>
            {currentTime}
        </React.Fragment>
    );
}

export default Clock;