import React from 'react';
import { Table, TableBody, TableHead, TableContainer, TableCell, TableRow } from '@material-ui/core';
import cx from 'classnames';
import CountUp from 'react-countup';
import styles from './RegionTable.module.css';
import { CountryPicker } from '../../components';

const RegionTable = ({ globalData, indianData, onRegionChange }) => {

  const handleCountryChange = async (country) => {
    onRegionChange(country, 'global');
  };

  const handleStateChange = async (state) => {
    onRegionChange(state, 'indian');
  }

  return (<TableContainer className={cx(styles.containerTable, styles.elevation)}>
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
                    <TableCell><CountryPicker handleChange={handleCountryChange} /></TableCell>
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
                    <TableCell><CountryPicker type="state" handleChange={handleStateChange} /></TableCell>
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
          </TableContainer>)
}

export default RegionTable;