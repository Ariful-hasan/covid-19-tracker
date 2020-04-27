import React, { useState, useEffect } from 'react';
import {fetchDailyData} from '../../api';
import { Line, Bar } from 'react-chartjs-2';
import styles from './Chart.module.css';

const Chart = ({data, country}) => {
    
    const [dailyData, setDailyData] = useState([]);
    
    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        }
        //console.log(dailyData);
        
        fetchAPI();
    }, []); //// use array that means the useEffect call just once other wise calling and calling for new data

    
    const lineChart = (
        dailyData.length ? (
        <Line
         data={{
            labels: dailyData.map(({date}) => date),
            datasets: [{
                data: dailyData.map(({confirmed}) => confirmed),
                label: 'Infected',
                borderColor: '#3333ff',
                fill: true,
            }, {
                data: dailyData.map(({deaths}) => deaths),
                label: 'Deaths',
                borderColor: 'rgba(255,0,0,0.5)',
                fill: true,
            }], 
        }} 
        />) : null
    );

    //console.log(data);
    //console.log(data.recovered);
    //console.log(data.deaths.value);
    
    const barChart =  (
        data.confirmed ? 
        (<Bar 
            data={{
                labels:  ['Infected', 'Recovered', 'Deaths'],
                datasets: [{
                    label: 'People',
                    backgroundColor: ['rgb(0, 0, 255, 0.5)', 'rgb(0, 255, 0, 0.5)', 'rgb(255, 0, 0, 0.5)'],
                    data: [data.confirmed.value, data.recovered.value, data.deaths.value]
                }]
            }}
            options={{
                legend: {display: false},
                title: {display: true, text: `Current state in ${country}`},
            }}
        />) : null
    );

    return (
        <div className={styles.container}>
            {country ? barChart : lineChart}
        </div>
    )
}

export default Chart;