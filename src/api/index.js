import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {

    let chnageableUrl = url;
    if (country) {
        chnageableUrl = `${url}/countries/${country}`;
    }

    try {

        const {data} = await axios.get(chnageableUrl); 
        const {confirmed, recovered, deaths, lastUpdate} = data;
        //const {data: {confirmed, recovered, deaths, lastUpdate} } = await axios.get(url); // destructring data from api.
        return {confirmed, recovered, deaths, lastUpdate};

    } catch (error) {
        console.log(error);
    }
}

export const fetchDailyData = async () => {
    try {
        const {data} = await axios.get(`${url}/daily`);
        // return data;
        return data.map(
            ({confirmed, deaths, reportDate: date}) => ({confirmed: confirmed.total, deaths: deaths.total, date})
        );
    } catch (error) {
        console.log(error);
    }
}

export const fetchCountries = async () => {
    try {
        const {data: {countries}} = await axios.get(`${url}/countries`);
        //console.log(response);
        return countries.map((country) => country.name);
    } catch (error) {
        console.log(error);
    }
}