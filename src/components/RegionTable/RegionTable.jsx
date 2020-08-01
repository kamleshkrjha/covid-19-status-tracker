import React from 'react';
import { connect } from 'react-redux';
import { Table, TableBody, TableHead, TableContainer, TableCell, TableRow } from '@material-ui/core';
import cx from 'classnames';
import CountUp from 'react-countup';
import styles from './RegionTable.module.css';

const mapStateToProps = (state, ownProps) => { 
  const { countries: { globalData, country }, states: { indianData, province }} = state;
  return {
    globalData: Object.keys(globalData).length ? globalData : ownProps.globalData,
    country,
    province,
    indianData: Object.keys(indianData).length ? indianData : ownProps.indianData,
  }

}

const RegionTable = ({ globalData, indianData, province, country }) => {

  return (<TableContainer className={cx(styles.containerTable, styles.elevation)}>
            <Table aria-label="simple table" className={styles.table}>
              <TableHead style={{ fontWeight: 700 }}>
                <TableRow>
                  <TableCell>Region</TableCell>
                  <TableCell align="center" className={styles.confirmed}>Confirmed</TableCell>
                  <TableCell align="center" className={styles.recovered}>Recovered</TableCell>
                  <TableCell align="center" className={styles.active}>Active</TableCell>
                  <TableCell align="center" className={styles.deaths}>Deaths</TableCell>
                  
                  <TableCell align="center" className={styles.infoRecovery}>Reovery (%)</TableCell>
                  <TableCell align="center" className={styles.infoMortality}> Mortality (%)</TableCell>
                  <TableCell align="right"> Last Update</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

                {globalData.confirmed && (
                  <TableRow key={1}>
                    <TableCell>{ country ? country : 'World'}</TableCell>
                    <TableCell align="center" className={styles.confirmed}><CountUp start={0} end={globalData.confirmed} duration={2} separator="," gutterBottom /></TableCell>
                    <TableCell align="center" className={styles.recovered}><CountUp start={0} end={globalData.recovered} duration={2} separator="," gutterBottom /></TableCell>
                    <TableCell align="center" className={styles.active}><CountUp start={0} end={globalData.active} duration={2} separator="," gutterBottom /></TableCell>
                    <TableCell align="center" className={styles.deaths}><CountUp start={0} end={globalData.deaths} duration={2} separator="," gutterBottom /></TableCell>
                    
                    <TableCell align="center" className={styles.infoRecovery}><CountUp start={0} end={globalData.recoveryRate} duration={2} separator="," decimals={2} gutterBottom /></TableCell>
                    <TableCell align="center" className={styles.infoMortality}><CountUp start={0} end={globalData.mortalityRate} duration={2} separator="," decimals={2} gutterBottom /></TableCell>
                    <TableCell align="right"> {new Date(globalData.lastUpdate).toLocaleString()} </TableCell>
                  </TableRow>
                )}

                {indianData.confirmed && (
                  <TableRow key={2}>
                    <TableCell>{province ? province : 'India'}</TableCell>
                    <TableCell align="center" className={styles.confirmed}><CountUp start={0} end={indianData.confirmed} duration={2} separator="," gutterBottom /></TableCell>
                    <TableCell align="center" className={styles.recovered}><CountUp start={0} end={indianData.recovered} duration={2} separator="," gutterBottom /></TableCell>
                    <TableCell align="center" className={styles.active}><CountUp start={0} end={indianData.active} duration={2} separator="," gutterBottom /></TableCell>
                    <TableCell align="center" className={styles.deaths}><CountUp start={0} end={indianData.deaths} duration={2} separator="," gutterBottom /></TableCell>
                    
                    <TableCell align="center" className={styles.infoRecovery}><CountUp start={0} end={indianData.recoveryRate} duration={2} separator="," decimals={2} gutterBottom /></TableCell>
                    <TableCell align="center" className={styles.infoMortality}><CountUp start={0} end={indianData.mortalityRate} duration={2} separator="," decimals={2} gutterBottom /></TableCell>
                    <TableCell align="right"> {new Date(indianData.lastUpdate).toLocaleString()} </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>)
}

export default connect(
  mapStateToProps
)(RegionTable);