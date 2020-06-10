import React, { useState, useEffect } from 'react';
import { fetchDailyDataIndia } from './../../api';
import { Line } from 'react-chartjs-2';

import styles from './Charts.module.css';
import cx from 'classnames';

const getDiff = (current, prev) => {
  let diff = current - prev;
  return isNaN(diff) ? 0 : diff;
}

const getDataset = (dailyData, type) => {
  if(type) {
    return [
       {
        data: dailyData.map((data) => data.confirmed),
        label: 'Infected',
        borderColor: 'blue',
      },
      {
        data: dailyData.map((data) => data.active),
        label: 'Active',
        borderColor: '#6d4dce',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        fill: true
      }]
  }
  return [
      {
        data: dailyData.map((data) => data.confirmed),
        label: 'Infected',
        borderColor: 'blue',
      }, 
      {
        data: dailyData.map((data) => data.recovered),
        label: 'recovered',
        borderColor: 'green'
      },
      {
        data: dailyData.map((data) => data.deaths),
        label: 'Deaths',
        borderColor: 'red'
      },
      {
        data: dailyData.map((data) => data.active),
        label: 'Active',
        borderColor: '#6d4dce',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        fill: true
      }
    ]
}

const getLineChart =  (dailyData, type = null, province = '') => {
  let chart, chartHeader = province ? `${province} Daily Timeline`: 'India Daily Timeline';
  if (type) {
    dailyData = dailyData.map((set, index, dailyData) => {
      if(index) {
        const prevSet = dailyData[index-1];
        return {
          confirmed: getDiff(set.confirmed, prevSet.confirmed),
          recovered: getDiff(set.recovered, prevSet.recovered),
          deaths: getDiff(set.deaths, prevSet.deaths),
          active: getDiff(set.active, prevSet.active),
          date: set.date
         }
      }
      return set;
    });
    chartHeader = province ? `${province} - Per Day Change`: ' India - Per Day Change';
  }
  chart =  (<Line
    options={{
      title:{ display: true, text:  `${chartHeader}`},
      maintainAspectRatio: false 
    }}

    data={{
      labels: dailyData.map(({ date }) => date),
      datasets: getDataset(dailyData, type),
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
        <div className={cx(styles.container, styles.elevation)}>
            { lineChart }
        </div>
    );
}

export default Charts; 