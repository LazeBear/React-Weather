import React, {Component} from 'react';
import axios from 'axios';

const CONDITION_BASE_URL = 'http://api.wunderground.com/api/f029e46fd0232d12/geolookup/conditions/q/Australia/';
const FORECAST_BASE_URL = 'http://api.wunderground.com/api/f029e46fd0232d12/geolookup/forecast10day/q/Australia/';

export default class Toolbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            curCity: 'Adelaide',
            unit: "C",
            size: 5
        }
    }

    reFetch() {
        const {curCity} = this.state;
        this.fetchConditionData(curCity);
        this.fetchForecastData(curCity);
    }

    fetchConditionData(curCity) {
        axios.get(`${CONDITION_BASE_URL}${curCity}.json`)
            .then( city => {
                console.log(city);
                this.props.onConditionLoad(city.data.current_observation);
            })
            .catch(function (error) {
                alert(`Failed to load weather condition: ${error}`)
            });
    }

    fetchForecastData(curCity) {
        axios.get(`${FORECAST_BASE_URL}${curCity}.json`)
            .then(forecast => {
                // const respData = JSON.parse(forecast);
                console.log(forecast);
                this.props.onForecastLoad(forecast.data.forecast.simpleforecast.forecastday)
            })
            .catch(function (error) {
                alert(`Failed to load weather condition: ${error}`)
                // console.log(error);
            });
    }

    // kick off initial request when comp mounted
    componentDidMount() {
        this.reFetch();
    }

    // clean up resource when comp unmounted
    // componentWillUnmount() {
    // }

    changeUnit(unit) {
        this.props.onUnitChange(unit);
        if(unit ==="C") {
            this.setState({unit:"C"});
        } else {
            this.setState({unit:"F"});
        }
    }



    render() {
        return (
            <nav style={{padding:10}}>
                <input type="text" onChange={(e) => this.setState({curCity: e.target.value})} />
                <button onClick={() => this.reFetch()}>Load</button>
                <br />
                <label><input type="radio" name="unit" value="C" checked={this.state.unit === "C"?true:false} onChange={()=>this.changeUnit("C")}/> C</label>
                <label><input type="radio" name="unit" value="F" onChange={()=>this.changeUnit("F")}/> F</label>
                <br />

            </nav>
        )
    }
}