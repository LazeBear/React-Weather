import React, {Component} from 'react';


import CityCondition   from './CityCondition';
import Forecaster   from './Forecaster';
import Toolbar      from './ToolBar';


export default class WeatherChannel extends Component {
    constructor(props) {
        super(props);
        this.cityData;
        this.forcastData;
        this.unit="C";
        this.size=5;
        this.state = {
            // some dummy data for initial state
            condition: {
                city:  '--',
                temp: '--',
                weather: '--'
            },
            days: [
                {weekday: '--', high:23, low:18, icon:'http://icons.wxug.com/i/c/k/clear.gif'},
                {weekday: '--', high:29, low:18, icon:'http://icons.wxug.com/i/c/k/chancerain.gif'},
                {weekday: '--', high:20, low:10, icon:'http://icons.wxug.com/i/c/k/chancerain.gif'},
                {weekday: '--', high:20, low:10, icon:'http://icons.wxug.com/i/c/k/chancerain.gif'},
                {weekday: '--', high:20, low:10, icon:'http://icons.wxug.com/i/c/k/chancerain.gif'}
            ]
        }
    }

    onConditionLoad(data) {
        this.cityData = data;

        const condition = {
            city: data.display_location.full,
            weather: data.weather,
            temp: this.unit ==="C"? `${data.temp_c}C`:`${data.temp_f}F`,
            desc: data.local_time_rfc822
    }
        // console.log(condition);
        this.setState({condition});
    }
    onForecastLoad(data) {

        this.forcastData = data;
        const days = data.slice(0, this.size).map(d => ({
                weekday: d.date.weekday,
                high: this.unit ==="C"? d.high.celsius:d.high.fahrenheit,
                low: this.unit ==="C"? d.low.celsius:d.low.fahrenheit,
                icon: d.icon_url
            })
        );
        // console.log(data);
        this.setState({days})
    }

    onUnitChange(unit) {
        this.unit = unit;
        this.onConditionLoad(this.cityData);
        this.onForecastLoad(this.forcastData);
    }

    onSizeChange(size) {
        this.size = size;
        this.onConditionLoad(this.cityData);
        this.onForecastLoad(this.forcastData);
    }

    render() {
        return (
            <main>
                <Toolbar
                    // Pass callback fn as props to child
                    // when data is ready, child will invoke it and state will be updated
                    onConditionLoad={data => this.onConditionLoad(data)}
                    onForecastLoad={data => this.onForecastLoad(data)}
                    onUnitChange = {unit => this.onUnitChange(unit)}
                    onSizeChange = {unit => this.onSizeChange(unit)}
                />
                <section id="left">
                    <CityCondition {...this.state.condition} />
                </section>
                <section id="right">
                    <Forecaster days={this.state.days} />
                </section>
            </main>
        )
    }
}