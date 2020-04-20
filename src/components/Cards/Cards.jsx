import React from 'react';
import { Grid, Card, CardContent, Typography } from '@material-ui/core';
import CountUp  from 'react-countup';
import cx from 'classnames';
import styles  from './Cards.module.css';

const Cards = ({ data: {confirmed, recovered, deaths, lastUpdate, active }}) => {
    if(confirmed === undefined || null ) {
        return 'Loading....';
    }
    return (
        <div className={styles.container}>
            <Grid container justify="center" >
                <Grid item component={Card} xs={12} md={12} className={cx(styles.card, styles.infected)}>
                    <CardContent>
                        
                        <Typography variant="h5">
                            <CountUp start={0} end={confirmed} duration={2} separator="," gutterBottom />
                            <Typography color="textSecondary" >Confirmed</Typography>
                        </Typography>
                        {/* <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography> */}
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={12} className={cx(styles.card, styles.recovered)}>
                    <CardContent>
                        
                        <Typography variant="h5">
                            <CountUp start={0} end={recovered} duration={2} separator="," />
                            <Typography color="textSecondary" >Recovered</Typography>
                        </Typography>
                        {/* <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography> */}
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={12} className={cx(styles.card, styles.deaths)}>
                    <CardContent>
                        
                        <Typography variant="h5">
                            <CountUp start={0} end={deaths} duration={2} separator="," />
                            <Typography color="textSecondary">Deaths</Typography>
                        </Typography>
                        {/* <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography> */}
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={12} className={cx(styles.card, styles.active)}>
                    <CardContent>
                        
                        <Typography variant="h5">
                            <CountUp start={0} end={active} duration={2} separator="," />
                            <Typography color="textSecondary" >Active</Typography>
                        </Typography>
                        {/* <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography> */}
                    </CardContent>
                </Grid>
            </Grid>
        </div>
    );
}

export default Cards; 