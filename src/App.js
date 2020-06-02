import React from 'react';
import styles from './App.module.css';
import { fetchData, fetchLatestDataIndia } from './api';
import cx from 'classnames';

import image from './images/image.png';

import { Cards, Charts, RegionTable } from './components';

class App extends React.Component {

  state = {
    globalData: {},
    indianData: {},
    province: ''
  }

  async componentDidMount() {
    const fetchedData = await fetchData();
    const fetchedIndianData = await fetchLatestDataIndia();
    this.setState({ globalData: fetchedData, indianData: fetchedIndianData });
  }

  handleCountryChange = async (country) => {
    this.setState({ globalData: await fetchData(country) });
  };

  handleStateChange = async (state) => {
    this.setState({ indianData: await fetchLatestDataIndia(state), province: state });
  }

  onRegionChange = (data, type) => {
    type === 'global' ? this.handleCountryChange(data) : this.handleStateChange(data);
  }

  render() {
    const { globalData, indianData, province } = this.state;
    return (
      <div className={cx(styles.container)}>
        <header><img className={styles.image} src={image} alt="COVID-19" /></header>
        <div className={cx(styles.contentSection)}>
          <RegionTable globalData={globalData} indianData={indianData} onRegionChange={this.onRegionChange.bind(this)} />
          <Cards data={indianData}></Cards>
          <div className={cx(styles.containerCharts)}>
            <Charts province={province} />
            <Charts type="timeline_perday" province={province} />
          </div>
        </div>
        <footer>
          <a href="https://github.com/kamleshkrjha/covid-19-status-tracker" target="_blank" >Source Code</a>
          <a href="https://github.com/mathdroid/covid19" target="_blank" >Golbal Data Source</a>
          <a href="https://github.com/amodm/api-covid19-in" target="_blank" >Indian Data Source</a>
        </footer>
      </div>
    );
  }
}

export default App;