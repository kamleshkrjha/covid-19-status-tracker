import React from 'react';
import styles from './App.module.css';
import { fetchData, fetchLatestDataIndia } from './api';
import { Table, TableBody, TableHead, TableContainer, TableCell, TableRow, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CountUp from 'react-countup';
import cx from 'classnames';

import image from './images/image.png';

import { Cards, Charts, CountryPicker } from './components';

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

  render() {
    const { globalData, indianData } = this.state;
    return (
      <div className={cx(styles.container)}>
        <header><img className={styles.image} src={image} alt="COVID-19" /></header>
        <div className={cx(styles.contentSection)}>
          <TableContainer className={styles.containerCards} component={Paper}>
            <Table aria-label="simple table" className={styles.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Region</TableCell>
                  <TableCell align="right" className={styles.confirmed}>Confirmed</TableCell>
                  <TableCell align="right" className={styles.recovered}>Recovered</TableCell>
                  <TableCell align="right" className={styles.deaths}>Deaths</TableCell>
                  <TableCell align="right" className={styles.active}>Active</TableCell>
                  <TableCell align="right" className={styles.infoRecovery}>Reovery Rate(%)</TableCell>
                  <TableCell align="right" className={styles.infoMortality}> Mortality Rate(%)</TableCell>
                  <TableCell align="right"> Last Update</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

                {globalData.confirmed && (
                  <TableRow key={1}>
                    <TableCell><CountryPicker handleChange={this.handleCountryChange} /></TableCell>
                    <TableCell align="right" className={styles.confirmed}><CountUp start={0} end={globalData.confirmed} duration={2} separator="," gutterBottom /></TableCell>
                    <TableCell align="right" className={styles.recovered}><CountUp start={0} end={globalData.recovered} duration={2} separator="," gutterBottom /></TableCell>
                    <TableCell align="right" className={styles.deaths}><CountUp start={0} end={globalData.deaths} duration={2} separator="," gutterBottom /></TableCell>
                    <TableCell align="right" className={styles.active}><CountUp start={0} end={globalData.active} duration={2} separator="," gutterBottom /></TableCell>
                    <TableCell align="right" className={styles.infoRecovery}><CountUp start={0} end={globalData.recoveryRate} duration={2} separator="," decimals={2} gutterBottom /></TableCell>
                    <TableCell align="right" className={styles.infoMortality}><CountUp start={0} end={globalData.mortalityRate} duration={2} separator="," decimals={2} gutterBottom /></TableCell>
                    <TableCell align="right"> {new Date(globalData.lastUpdate).toLocaleString()} </TableCell>
                  </TableRow>
                )}

                {indianData.confirmed && (
                  <TableRow key={2}>
                    <TableCell><CountryPicker type="state" handleChange={this.handleStateChange} /></TableCell>
                    <TableCell align="right" className={styles.confirmed}><CountUp start={0} end={indianData.confirmed} duration={2} separator="," gutterBottom /></TableCell>
                    <TableCell align="right" className={styles.recovered}><CountUp start={0} end={indianData.recovered} duration={2} separator="," gutterBottom /></TableCell>
                    <TableCell align="right" className={styles.deaths}><CountUp start={0} end={indianData.deaths} duration={2} separator="," gutterBottom /></TableCell>
                    <TableCell align="right" className={styles.active}><CountUp start={0} end={indianData.active} duration={2} separator="," gutterBottom /></TableCell>
                    <TableCell align="right" className={styles.infoRecovery}><CountUp start={0} end={indianData.recoveryRate} duration={2} separator="," decimals={2} gutterBottom /></TableCell>
                    <TableCell align="right" className={styles.infoMortality}><CountUp start={0} end={indianData.mortalityRate} duration={2} separator="," decimals={2} gutterBottom /></TableCell>
                    <TableCell align="right"> {new Date(indianData.lastUpdate).toLocaleString()} </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Cards data={indianData}></Cards>
          <div className={cx(styles.containerCharts)}>
            <Charts province={this.state.province} />
            <Charts type="timeline_perday" province={this.state.province} />
          </div>
        </div>
        <footer>
          <a href="https://github.com/kamleshkrjha/covid-19-status-tracker">Source Code</a>
          <a href="https://github.com/mathdroid/covid19">Golbal Data Source</a>
          <a href="https://github.com/amodm/api-covid19-in">Indian Data Source</a>
        </footer>
      </div>
    );
  }
}

export default App;