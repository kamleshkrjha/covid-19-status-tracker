import React, { useState, useEffect } from 'react';
import { fetchDailyDataIndia } from './../../api';
import { Line } from 'react-chartjs-2';

import styles from './Charts.module.css';

const getLineChart =  (dailyData, type = null, province = '') => {
  let chart, chartHeader = province ? `${province} Daily Timeline`: 'India Daily Timeline';
  if (type) {
    dailyData = dailyData.map((set, index, dailyData) => {
      if(index) {
        const prevSet = dailyData[index-1];
        return {
          confirmed: (set.confirmed - prevSet.confirmed) > 0 ? (set.confirmed - prevSet.confirmed) : 0,
          recovered: (set.recovered - prevSet.recovered) > 0 ? (set.recovered - prevSet.recovered) : 0,
          deaths: (set.deaths - prevSet.deaths) > 0 ? (set.deaths - prevSet.deaths) : 0,
          date: set.date
         }
      }
      return set;
    });
    chartHeader = province ? `${province} - Per Day Change`: ' India - Per Day Change';
  }
  chart =  (<Line
    options={{
      title:{ display: true, text:  `${chartHeader}`}
    }}

    data={{
      labels: dailyData.map(({ date }) => date),
      datasets: [{
        data: dailyData.map((data) => data.confirmed),
        label: 'Infected',
        borderColor: 'blue',
        fill: true,
      }, 
      {
        data: dailyData.map((data) => data.recovered),
        label: 'recovered',
        borderColor: 'green',
        fill: true
      },
      {
        data: dailyData.map((data) => data.deaths),
        label: 'Deaths',
        borderColor: 'red',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        fill: true,
      },
      ],
    }}
  />)
  return chart;
}
const Charts = ({ province, type }) => {
    const [dailyData, setDailyData] = useState({});

  useEffect(() => {
    const fetchMyAPI = async () => {
      setDailyData(await fetchDailyDataIndia(province));   
    };

    fetchMyAPI();
  }, [province, type]);

  const lineChart = (
    dailyData[0] ? getLineChart(dailyData, type, province) : null
  );

    return (
        <div className={styles.container}>
            { lineChart }
        </div>
    );
}

export default Charts; 