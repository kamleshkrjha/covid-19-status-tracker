import React from 'react';
import { Grid, Card, CardContent, Typography } from '@material-ui/core';
import CountUp from 'react-countup';
import cx from 'classnames';
import styles from './Cards.module.css';


const Cards = ({ data: { samples } }) => {
    if (samples === undefined || null) {
        return 'Loading....';
    }
    const CardContents = [];
    if (samples) {
        CardContents.push({
            title: 'India Total Tests',
            value: samples,
            class: 'info'
        })
    }
    return (
        <div>
            <Grid container className={styles.container}>
                {
                    CardContents.map(content => (
                        <Grid item component={Card} xs={12} className={cx(styles.card, styles[content.class])} key={content.title}>
                            <CardContent>

                                <Typography>
                                    {content.title} : {' '}
                                    <CountUp start={0} end={content.value} duration={2} separator="," decimals={content.decimals} gutterBottom style={{ fontSize: 18, fontWeight: 700 }}/>
                                    
                                </Typography>

                            </CardContent>
                        </Grid>
                    ))
                }
            </Grid>

        </div>
    );
}

export default Cards; 