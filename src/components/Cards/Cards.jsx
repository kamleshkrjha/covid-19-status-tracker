import React from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@material-ui/core';
import CountUp from 'react-countup';
import cx from 'classnames';
import styles from './Cards.module.css';
import PhoneIcon from '@material-ui/icons/Phone';


const Cards = ({ data: { samples, contacts } }) => {
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
    if (contacts.primary) {
        CardContents.push(
        {
            title: 'Primary',
            value: contacts.primary.number,
            class: 'info'
        },
        {
            title: 'Toll Free',
            value: contacts.primary['number-tollfree'],
            class: 'info'
        });
    }
    if(contacts.region) {
        CardContents.push({
            title: contacts.region.loc,
            value: contacts.region.number,
            class: 'info'
        });
    }

    return (
        <Grid container className={cx(styles.container)}>
            {
                CardContents.map(content => (
                    <Grid item component={Card} xs={12} className={cx(styles.card, styles[content.class], styles.elevation)} key={content.title}>
                        <CardContent className={styles.flexed}>
                            <Typography component='span' style={{ marginRight: 10 }}>
                                {content.title} : {' '}
                            </Typography>    
                            { (typeof content.value === 'number')
                            ? <CountUp start={0} end={content.value} duration={2} separator="," decimals={content.decimals} gutterBottom style={{ fontSize: 18, fontWeight: 700 }}/>
                            :
                            (
                            <Box component='span' className={styles.flexed}>
                                <PhoneIcon style={{ marginRight: 10}}/>
                                <Typography component='span' style={{ fontWeight: 700}}> {content.value} </Typography>
                            </Box>
                            )
                            }
                        </CardContent>
                    </Grid>
                ))
            }
        </Grid>
    );
}

export default Cards; 