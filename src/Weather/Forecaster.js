import React from 'react';

function DailyItem(props) {
    const day = props.day;
    return (
        <div className="item">
            <span>{day.weekday}</span>
            <span><img src={day.icon} /></span>
            <span >{day.high}</span>
            <span >{day.low}</span>
        </div>
    )
}

export default function Forecaster(props) {
    // const {days} = props;
    // const size = days.size;
    // const day1 = days[0], day2 = days[1], day3 = days[2], day4=days[3], day5=days[4];
    return props.days.map(
        (day, i) => <DailyItem key={`${day.weekday}_${i}`} day={day} />
    )
    // return (
    //     <div>
    //         <DailyItem day={day1} />
    //         <DailyItem day={day2} />
    //         <DailyItem day={day3} />
    //         <DailyItem day={day4} />
    //         <DailyItem day={day5} />
    //     </div>
    // )
}