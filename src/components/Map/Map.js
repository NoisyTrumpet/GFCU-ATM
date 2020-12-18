import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import axios from 'axios';
import GoogleMapReact from 'google-map-react';
import example from '../../constants/example.js'
import Pin from '../../assets/svg/Pin'
import AltPin from '../../assets/svg/AltPin'
import HomePin from '../../assets/svg/HomePin'
import './Map.scss'
import Skeleton from 'react-loading-skeleton';
import Marker from '../Marker/Marker.js';

const Map = ({ title, center, zoom }) => {
    const wrapperClasses = classNames('maps-wrapper')
    const [locations, setLocations] = React.useState(example.response.locations)
    const [submitting, setSubmitting] = useState(false);
    const [searchCenter, setCenter] = useState({ lat: 29.4241, lng: -98.4936})



    const MapResults = () => {
        return (
            <>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_API}}
                    center={searchCenter}
                    defaultZoom={zoom}
                >   
                <Marker
                    lat={searchCenter.lat}
                    lng={searchCenter.lng}
                    home
                >
                        <HomePin className="home-pin" />
                </Marker>

                    {locations.map((place) => (
                        <Marker
                            key={place.id}
                            text={place.institutionName}
                            tooltip={place.id}
                            lat={place.latitude}
                            lng={place.longitude}
                            show={place.show}
                            title={place.id}
                            place={place}
                        >       
                            {place.locatorType === 'A' ? <AltPin className="alt-pin" /> : <Pin className="pin" />}                                
                        </Marker>
                    ))}
                </GoogleMapReact>
            </>
        );
    }



    const getLocations = async ( request ) => {
        setSubmitting(true)
        const proxy = 'https://cors-anywhere.herokuapp.com/'

        const url = `${proxy}https://api.coop.org/locator/v1/proximitysearch?${request}`;

        const options = {
            headers: {
                'client_id': '53baaa15964c4b2c857bd26900fba3fe',
                'client_secret': '13Ff7232c0cf401cB4d0bF496D2f83F7',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            data: {}
        }
        return axios.get(url, options)
            .then((response) => {
                console.log('Response: ', response)
                setCenter({ lat: parseFloat(response.data.response.resultInfo.originLat), lng: parseFloat(response.data.response.resultInfo.originLong)})
                setLocations(response.data.response.locations)
                setSubmitting(false)
            })
            .catch((error) => {
                console.log(error)
            });
    }


    const Form = () => {

        const handleOnSubmit = (event) => {
            event.preventDefault();
            const form = new FormData(event.target);
            const data = []
            for (let [key, value] of form.entries()) {
                data[key] = value
            }
            const request = `zipcode+%7C+zip=${data.zip}&city=${data.city}&state=${data.state}&address=${data.address}&locatortype+%7C+loctype=${data.locType ? 'A' : 'AS'}${data.hr ? `&open24hours=Yes`: ''}`

            getLocations(request)
        }
        return (
            <section className='form-wrapper'>
                <span style={{ textAlign: 'left', fontFamily: 'Gotham', color: 'red', opacity: '0.3', marginBottom: '10px', fontSize: 10 }}>* Required</span>
                <form className='form' onSubmit={handleOnSubmit}>
                    <section className="checkboxes">
                        
                        <input
                            className='input address-input'
                            type="text"
                            name="address"
                            placeholder="Address*"
                            required
                        ></input>
                        <input
                            className='input city-input'
                            type="text"
                            name="city"
                            placeholder="City*"
                            required
                        ></input>
                    </section>
                    <section className="checkboxes">
                        <select
                            name="state"
                            required
                            placeholder="State*"
                            className='input state'
                        >
                            <option value="Select" defaultValue="TX" disabled="">
                                State*
              </option>
                            <option value="TX">Texas</option>
                            <option value="AL">Alabama</option>
                            <option value="AK">Alaska</option>
                            <option value="AZ">Arizona</option>
                            <option value="AR">Arkansas</option>
                            <option value="CA">California</option>
                            <option value="CO">Colorado</option>
                            <option value="CT">Connecticut</option>
                            <option value="DE">Delaware</option>
                            <option value="DC">District Of Columbia</option>
                            <option value="FL">Florida</option>
                            <option value="GA">Georgia</option>
                            <option value="HI">Hawaii</option>
                            <option value="ID">Idaho</option>
                            <option value="IL">Illinois</option>
                            <option value="IN">Indiana</option>
                            <option value="IA">Iowa</option>
                            <option value="KS">Kansas</option>
                            <option value="KY">Kentucky</option>
                            <option value="LA">Louisiana</option>
                            <option value="ME">Maine</option>
                            <option value="MD">Maryland</option>
                            <option value="MA">Massachusetts</option>
                            <option value="MI">Michigan</option>
                            <option value="MN">Minnesota</option>
                            <option value="MS">Mississippi</option>
                            <option value="MO">Missouri</option>
                            <option value="MT">Montana</option>
                            <option value="NE">Nebraska</option>
                            <option value="NV">Nevada</option>
                            <option value="NH">New Hampshire</option>
                            <option value="NJ">New Jersey</option>
                            <option value="NM">New Mexico</option>
                            <option value="NY">New York</option>
                            <option value="NC">North Carolina</option>
                            <option value="ND">North Dakota</option>
                            <option value="OH">Ohio</option>
                            <option value="OK">Oklahoma</option>
                            <option value="OR">Oregon</option>
                            <option value="PA">Pennsylvania</option>
                            <option value="RI">Rhode Island</option>
                            <option value="SC">South Carolina</option>
                            <option value="SD">South Dakota</option>
                            <option value="TN">Tennessee</option>

                            <option value="UT">Utah</option>
                            <option value="VT">Vermont</option>
                            <option value="VA">Virginia</option>
                            <option value="WA">Washington</option>
                            <option value="WV">West Virginia</option>
                            <option value="WI">Wisconsin</option>
                            <option value="WY">Wyoming</option>
                        </select>
                        <input
                            type="text"
                            name="zip"
                            placeholder="Zip Code*"
                            required
                        ></input>
                    </section>
                    <section className="checkboxes">
                        <div>
                            <label className="toggle-switch-label" for="toggleSwitch">
                                ATMS only? <input type="checkbox" name="locType" id="id" />
                            </label>
                        </div>
                        <div>
                            <label className="toggle-switch-label" for="toggleSwitch">
                                Open 24hrs? <input type="checkbox" name="hr" id="id" />
                            </label>
                        </div>
                    </section>
                    <button
                        type="submit"
                        className='button'
                    >
                        {submitting ? 'Locating...🤔' : 'Submit'}
                    </button>
                </form>
            </section>
        )
    }
    return (
        <section className={wrapperClasses}>
            <section className="title">
                <h1>
                    {title}
                </h1>
            </section>
            <section className="form">
                <Form />
            </section>
            <section className="map">
                <MapResults />
                
            </section>
            <section className="results">
                <section className="legend">
                    <div className="search-center">
                        <p>You searched for:</p>
                        <HomePin />
                    </div>
                    <div className="atm">
                        <p>ATM</p>
                        <AltPin />
                    </div>
                    <div className="shared-branch">
                        <p>ATM & Shared Branch</p>
                        <Pin />
                    </div>
                </section>
                <h3 style={{textAlign: 'center', fontFamily: 'Gotham'}}>Click, tap or hover over pin to see details.</h3>
                <ul>
                    {submitting ?
                        locations.map(() => (
                            <li>
                                <section className="list-info">
                                    <section className="list-pin">
                                        <Pin className="pin" />
                                    </section>
                                    <section className="text">
                                        <Skeleton count={6}/>
                                    </section>
                                </section>
                                <section className="list-directions">
                                    <p><b>Distance:</b> <Skeleton /> miles away</p>
                                    <Skeleton />
                                </section>
                            </li>
                        ))
                        :
                        locations.map((place) => (
                            <li>
                                <section className="list-info">
                                    <section className="list-pin">
                                        {place.locatorType === 'A' ? <AltPin className="alt-pin" /> : <Pin className="pin" />}
                                    </section>
                                    <section className="text">
                                        <h5>{place.institutionName}</h5>
                                        <p>{place.address}</p>
                                        <p>{place.city} {place.state}, {place.zip}</p>
                                        <p><b>{place.locatorType === 'A' ? 'ATM' : 'Branch and ATM'}</b></p>
                                    </section>
                                </section>
                                <section className="list-directions">
                                    <p><b>Distance:</b> {place.distance} miles away</p>
                                    <p>{place.city} {place.state}, {place.zip}</p>
                                    <a href={`https://google.com/maps/place/${place.address},+${place.city},+${place.state}+${place.zip}`}>
                                        Directions
                                    </a>
                                </section>
                            </li>
                        ))
                    }
                </ul>
            </section>
        </section>
    )
}

Map.propTypes = {
    title: PropTypes.string,
    center: PropTypes.object,
    zoom: PropTypes.number,
}

export default Map