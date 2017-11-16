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

export default class Forecaster extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            size : 5
        }

    }

    changeSize(e) {
        this.setState({size: e.target.value});
    }

    // const {days} = props;
    // const size = days.size;
    // const day1 = days[0], day2 = days[1], day3 = days[2], day4=days[3], day5=days[4];
    render() {
        const selection = <label>
            Pick the forecast days:
            <select value={this.state.size} onChange={e=>this.changeSize(e)}>
                <option value="3">3</option>
                <option value="5">5</option>
                <option value="7">7</option>
                <option value="10">10</option>
            </select>
        </label>;
        const days = this.props.days.slice(0, this.state.size).map(
            (day, i) => <DailyItem key={`${day.weekday}_${i}`} day={day} />);

        return (
            <div>
                {selection}
                {days}
            </div>
            // [selection, days]
        )

    }


}