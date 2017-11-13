import React from 'react';

export default function CityCondition(props) {
    const {city, weather, temp, desc} = props;
    return (
        <div>
            <div id="location">{city}</div>
            <div id="weather">{weather}</div>
            <div id="temperature">{temp}</div>
            <div id="desc">{desc}</div>
        </div>
    )
}