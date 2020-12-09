import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';


let config = {
    method: 'get',
    url: 'https://cors-anywhere.herokuapp.com/https://anypoint.mulesoft.com/mocking/api/v1/sources/exchange/assets/902a620f-1bc1-4977-8c8d-933022d52108/locator-api/1.0.2/m/proximitysearch?zip=78254',
    headers: {
        'client_id': '53baaa15964c4b2c857bd26900fba3fe',
        'client_secret': '13Ff7232c0cf401cB4d0bF496D2f83F7',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
};


const locations = () => {
    return axios(config)
    .then((response) => {
        return response
        // console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
        console.log('ERROR', error);
    });
}

locations.defaultProps = {
    method: 'get',
    url: 'https://cors-anywhere.herokuapp.com/https://anypoint.mulesoft.com/mocking/api/v1/sources/exchange/assets/902a620f-1bc1-4977-8c8d-933022d52108/locator-api/1.0.2/m/proximitysearch?zip=78254',
    headers: {
        'client_id': '53baaa15964c4b2c857bd26900fba3fe',
        'client_secret': '13Ff7232c0cf401cB4d0bF496D2f83F7',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
}

export default locations