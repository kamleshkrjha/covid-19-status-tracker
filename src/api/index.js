import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';
const localUrl = 'https://api.rootnet.in/covid19-in';

export const fetchData = async (country) => {
    let modifiedUrl = url;
    if(country) modifiedUrl = `${url}/countries/${country}`;
    try {
        const { data: { confirmed, recovered, deaths, lastUpdate }} = await axios.get(modifiedUrl);
        const active = confirmed.value-recovered.value-deaths.value;
        return { confirmed: confirmed.value, recovered: recovered.value, deaths:  deaths.value, lastUpdate, active };
    } catch (error) {
        return error;
    }
}

export const fetchCountries = async () => {
    try {
        const { data: { countries } } = await axios.get(`${url}/countries`);
        return (countries.map(({ name }) => name));
    } catch (error) {
        return error;
    }
}

export const fetchStates = async () => {
    try {
        const { data: { data: { regional } } } = await axios.get(`${localUrl}/stats/latest`);
        return regional.map(region => region.loc);
    } catch (error) {
        return error;
    }
}

export const fetchDailyDataIndia = async (state) => {
    try {
        const { data: { data: historicalData }} = await axios.get(`${localUrl}/stats/history`);
        return !state ?
        historicalData.map(({ summary, day:date }) => ({ confirmed: summary.total, deaths: summary.deaths, date, recovered: summary.discharged }))
        : historicalData.map(({regional, day:date }) => {
            const matched = regional.filter(region => region.loc === state)[0];
            if(matched) {
                return { 
                    confirmed: matched.totalConfirmed , 
                    recovered: matched.discharged, 
                    deaths: matched.deaths,
                    date
                 }
            }
            return null;
        }).filter(item => item !== null);
    } catch (error) {
        return error;
    }
}

export const fetchLatestDataIndia = async (state) => {
    try {
        let finalData = {};
        const response = await axios.get(`${localUrl}/stats/latest`);
        if (!state) {
            const { data: { data : { summary: {total: confirmed, discharged:recovered, deaths} }}} = response;
            finalData = { confirmed, recovered, deaths };
        } else {
            const { data: { data: { regional } } } = response;
            const { totalConfirmed: confirmed, discharged:recovered, deaths} = regional.filter(region=>region.loc===state)[0];
            finalData = { confirmed, recovered, deaths };
        }   
            const active = finalData.confirmed - finalData.recovered - finalData.deaths ;
            return { ...finalData,  active }
    } catch (error) {
        return error;
    }
}

export const fetchTestData = async () => {
    try {
        const { data: { data } } = await axios.get(`${localUrl}/stats/testing/history`);
        return data.map(({ totalIndividualsTested: tested, totalPositiveCases: positive , day:date}) => ({ tested, positive, date }));
    } catch (error) {
        return error;
    }
}