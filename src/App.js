import React, { useState, useEffect } from 'react';
import styles from './App.module.css';
import { fetchData, fetchLatestDataIndia } from './api';
import cx from 'classnames';

import image from './images/image.png';

import { Cards, Charts, RegionTable, CountryPicker } from './components';

const App = () => {

  const [globalData, setGlobalData] = useState({});
  const [indianData, setIndianData] = useState({});
  //this will load initial data -- this could be initial state
  useEffect(() => {
    async function fetchInitialData() {
      setGlobalData(await fetchData());
      setIndianData(await fetchLatestDataIndia());
    }
    fetchInitialData();
  }, []);


  return (
    <div className={cx(styles.container)}>
      <header className={styles.headerSection}>
        <img className={styles.image} src={image} alt="COVID-19" />
        <div className={styles.regionSelectorSection}>
          <CountryPicker />
          <CountryPicker type="state" />
        </div>
      </header>
      <div className={cx(styles.contentSection)}>
        <RegionTable globalData={globalData} indianData={indianData} />
        <Cards data={indianData}></Cards>
        <div className={cx(styles.containerCharts)}>
          <Charts />
          <Charts type="timeline_perday" />
        </div>
      </div>
      <footer>
        <a href="https://github.com/kamleshkrjha/covid-19-status-tracker" target="_blank" rel="noopener noreferrer">Source Code</a>
        <a href="https://github.com/mathdroid/covid19" target="_blank" rel="noopener noreferrer">Golbal Data Source</a>
        <a href="https://github.com/amodm/api-covid19-in" target="_blank" rel="noopener noreferrer">Indian Data Source</a>
      </footer>
    </div>
  );

}

export default App;