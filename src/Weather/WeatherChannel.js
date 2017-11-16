import React, {Component} from 'react';


import CityCondition   from './CityCondition';
import Forecaster   from './Forecaster';
import Toolbar      from './ToolBar';


export default class WeatherChannel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cityData:{},
            forecastData:{},
            condition: {
                city:  '--',
                temp: '--',
                weather: '--',
                desc:'--'
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

    filterConditionData(data,unit) {
        console.log(data)
        const condition = {
            city: data.display_location.full,
            weather: data.weather,
            temp: unit ==="C"? `${data.temp_c}C`:`${data.temp_f}F`,
            desc: data.local_time_rfc822
        }
        this.setState({condition});
    }

    filterForecastData(data,unit) {
        const days = data.map(d => ({
                weekday: d.date.weekday,
                high: unit ==="C"? d.high.celsius:d.high.fahrenheit,
                low: unit ==="C"? d.low.celsius:d.low.fahrenheit,
                icon: d.icon_url
            })
        );
        this.setState({days})
    }
    onConditionLoad(data) {
        this.setState({cityData:{data}});
        this.filterConditionData(data,"C");
    }
    onForecastLoad(data) {
        this.setState({forecastData:{data}});
        this.filterForecastData(data,"C");
    }

    onUnitChange(unit) {
        this.filterConditionData(this.state.cityData.data,unit);
        this.filterForecastData(this.state.forecastData.data,unit);

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