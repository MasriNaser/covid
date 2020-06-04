import React, { useState, useEffect } from 'react';

import { fetchDailyData } from '../../api';

import { Line, Bar } from 'react-chartjs-2';

import styles from './Chart.module.css';
import { red } from '@material-ui/core/colors';

const Chart = ({ data: { confirmed, deaths, recovered }, country }) => {
  const [dailyData, setDailyData] = useState([]);

  // empty [] to make the useEffect happen once like componentDidmount
  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData());
    }
    fetchAPI();
  }, []);

  // chat1
  const lineChart = (
    dailyData.length ? (
      <Line
        data={{
          labels: dailyData.map(({ date }) => date),
          datasets: [{
            data: dailyData.map(({ confirmed }) => confirmed),
            label: 'Infected',
            borderColor: '#3333ff',
            fill: true
          }, {
            data: dailyData.map(({ deaths }) => deaths),
            label: 'Deaths',
            borderColor: 'red',
            backgroundColor: 'rgba(255,0,0,0.5)',
            fill: true
          }],
        }}
      />) : null
  );

  // char for specific country
  const barChart = (
    confirmed ?
      (
        <Bar
          className={styles.test}
          data={{
            labels: ['Infected', 'Recovered', 'Deaths'],
            datasets: [{
              label: 'People',
              backgroundColor: [
                'rgb(0, 0, 255, 0.5)',
                'rgb(0, 255, 0, 0.5)',
                'rgb(255, 0, 0, 0.5)',
              ],
              data: [confirmed.value, recovered.value, deaths.value]
            }]
          }}
          options={{
            legend: { display: false },
            title: { display: true, text: `Current state is ${country}` },
          }}
        />

      ) : null
  )

  return (
    <div className={styles.container}>
      {country ? barChart : lineChart}
    </div>
  )
}

export default Chart;