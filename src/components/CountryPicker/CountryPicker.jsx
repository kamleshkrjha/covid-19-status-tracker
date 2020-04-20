import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';

import { fetchCountries, fetchStates } from './../../api';

import styles from './CountryPicker.module.css';

const CountryPicker = ({ handleChange, type }) => {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
            const fetchApi = async () => {
                type === 'state' ? setCountries(await fetchStates()) : 
                setCountries(await fetchCountries());
            }
    
            fetchApi();

    }, [type]);
    
    return (
       <FormControl className={styles.formControl}>
           <NativeSelect defaultValue="" onChange={(e) => handleChange(e.target.value)}>
                <option value="">{type === 'state'? 'India' : 'World'}</option>
                { countries.map((name, i) => (<option key={i} value={name}>{name}</option>)) }
           </NativeSelect>
       </FormControl>
    );
}

export default CountryPicker; 