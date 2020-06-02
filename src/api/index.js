import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';
const localUrl = 'https://api.rootnet.in/covid19-in';

export const fetchData = async (country) => {
    let modifiedUrl = url;
    if (country) modifiedUrl = `${url}/countries/${country}`;
    try {
        const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(modifiedUrl);
        const active = confirmed.value - recovered.value - deaths.value;
        const recoveryRate = recovered.value / confirmed.value * 100;
        const mortalityRate = deaths.value / confirmed.value * 100;

        return { confirmed: confirmed.value, recovered: recovered.value, deaths: deaths.value, lastUpdate, active, recoveryRate, mortalityRate };
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
        const { data: { data: historicalData } } = await axios.get(`${localUrl}/stats/history`);
        return !state ?
            historicalData.map(({ summary, day: date }) => ({ confirmed: summary.total, deaths: summary.deaths, date, recovered: summary.discharged }))
            : historicalData.map(({ regional, day: date }) => {
                const matched = regional.filter(region => region.loc === state)[0];
                if (matched) {
                    return {
                        confirmed: matched.totalConfirmed,
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
        const testingData = await axios.get(`${localUrl}/stats/testing/latest`);
        const contacts = await fetchContactsData(state);
        let samples;
        if (!state) {
            const { data: { data: { summary: { total: confirmed, discharged: recovered, deaths } }, lastRefreshed: lastUpdate } } = response;
            finalData = { confirmed, recovered, deaths, lastUpdate };
        } else {
            const { data: { data: { regional }, lastRefreshed: lastUpdate } } = response;
            const { totalConfirmed: confirmed, discharged: recovered, deaths } = regional.filter(region => region.loc === state)[0];
            finalData = { confirmed, recovered, deaths, lastUpdate };
        }

        samples = testingData?.data?.data?.totalSamplesTested;

        const active = finalData.confirmed - finalData.recovered - finalData.deaths;
        const recoveryRate = finalData.recovered / finalData.confirmed * 100;
        const mortalityRate = finalData.deaths / finalData.confirmed * 100;
        return { ...finalData, active, recoveryRate, mortalityRate, samples, contacts }
    } catch (error) {
        return error;
    }
}

export const fetchContactsData = async (state) => {
    try {
        //https://api.rootnet.in/covid19-in/contacts
        const { data: { data: { contacts } } } = await axios.get(`${localUrl}/contacts`);
        let region;
        if (state) {
            region = contacts.regional.filter(region => region.loc === state)[0];
        }
        return { primary: contacts.primary, region };
    } catch (error) {
        return error;
    }
}