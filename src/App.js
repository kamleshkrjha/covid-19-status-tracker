import React from 'react';
import styles from './App.module.css';
import { fetchData, fetchLatestDataIndia } from './api';
import cx from 'classnames'; 

import image from './images/image.png';

import { Cards, Charts, CountryPicker } from './components';

class App extends React.Component {

    state= {
        data: {},
        indianData: {},
        province: ''
    }

    async componentDidMount () {
        const fetchedData = await fetchData();
        const fetchedIndianData  = await fetchLatestDataIndia();
        this.setState({ data: fetchedData, indianData: fetchedIndianData });

    }

    handleCountryChange  = async (country) => {
        this.setState({ data: await fetchData(country) });
    };

    handleStateChange =  async (state) => {
        this.setState({ indianData: await fetchLatestDataIndia(state), province: state });
    }

    render () {
        const { data, indianData } = this.state;
        return (
            <div className={cx(styles.container)}>
                <img className={styles.image} src={image} alt="COVID-19" />
                <div className={cx(styles.contentSection)}>      
                    <div className={cx(styles.containerCharts, styles.flexCol)}>
                        <Charts province={this.state.province}/>
                        <Charts type="timeline_perday" province={this.state.province}/>
                    </div>
                    <div className={cx(styles.containerCards)}>
                        <CountryPicker type="state" handleChange={this.handleStateChange}/>
                        <Cards data={indianData} />
                    </div>  
                    <div className={cx(styles.containerCards)}>
                        <CountryPicker handleChange={this.handleCountryChange}/>
                        <Cards data={data} />
                    </div>  
                </div>
            </div>
        );
    }
}

export default App;