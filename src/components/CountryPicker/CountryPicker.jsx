import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';

import { fetchCountries, fetchStates } from './../../api'; // initial data load
import { useDispatch } from 'react-redux';
import sagaActions from '../../sagaActions';


const CountryPicker = ({ type }) => {
    const [items, setItems] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchApi = async () => {
            type === 'state' ? setItems(await fetchStates()) : 
            setItems(await fetchCountries());
        }
        fetchApi();
    }, [type]);
    
    return (
       <FormControl style={{ paddingLeft: 10, paddingRight: 10 }}>
           <NativeSelect defaultValue="" 
            onChange={
                e => dispatch({ type: type ? sagaActions.FETCH_INDIAN_SAGA : sagaActions.FETCH_GLOBAL_SAGA, payload: e.target.value })
            }
            >
                <option value="">{type === 'state'? 'India' : 'World'}</option>
                { items.map((name, i) => (<option key={i} value={name}>{name}</option>)) }
           </NativeSelect>
       </FormControl>
    );
}

export default CountryPicker;