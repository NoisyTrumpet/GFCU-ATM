import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import axios from 'axios';
import GoogleMapReact from 'google-map-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import example from '../../constants/example.js'
import Pin from '../../assets/svg/Pin'
import AltPin from '../../assets/svg/AltPin'
import HomePin from '../../assets/svg/HomePin'
import './Map.scss'
import Skeleton from 'react-loading-skeleton';
import { Animated } from "react-animated-css";
import Marker from '../Marker/Marker.js';

const Map = ({ title, center, zoom }) => {
    const wrapperClasses = classNames('maps-wrapper')
    const [locations, setLocations] = React.useState(example.response.locations)
    const [submitting, setSubmitting] = useState(false);
    const [response, setResponse] = useState({})
    const [submitted, setSubmitted] = useState(false)
    const [searchCenter, setCenter] = useState({ lat: 29.4241, lng: -98.4936 })

    const notify = () => toast("Ooops! We've encountered an error, please try again!");

    const MapResults = () => {
        return (
            <>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_API }}
                    center={searchCenter}
                    defaultZoom={zoom}
                >
                    
                        <Marker
                            lat={searchCenter.lat}
                            lng={searchCenter.lng}
                            home
                        >
                            <Animated animationIn="fadeInDownBig" animationOut="fadeOut" isVisible={true}>
                                <HomePin className="home-pin" />
                            </Animated>
                                
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
                            {place.locatorType === 'A' ? 
                            <Animated animationIn="bounce" animationOut="fadeOut" isVisible={true}>
                                <AltPin className="alt-pin" />
                            </Animated>
                                 
                                : 
                                <Animated animationIn="bounce" animationOut="fadeOut" isVisible={true}>
                                    <Pin className="pin" />
                            </Animated>
                                
                            }
                        </Marker>
                    ))}
                </GoogleMapReact>
            </>
        );
    }



    const getLocations = async (request) => {
        setSubmitting(true)
        const proxy = 'https://cors.bridged.cc/'

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
                setCenter({ lat: parseFloat(response.data.response.resultInfo.originLat), lng: parseFloat(response.data.response.resultInfo.originLong) })
                setLocations(response.data.response.locations)
                setSubmitting(false)
                setResponse(response.data)
                setSubmitted(true)
            })
            .catch((error) => {
                console.log(error)
                notify()
                setSubmitting(false)
                setSubmitted(true)
            });
    }

    const Submission = () => {
        if (response === {}) {
            return null
        } else {
            return (
                <section className="searched-for">
                    <p>You Searched for: {response.response.resultInfo.originAddress ? response.response.resultInfo.originAddress : response.response.resultInfo.originPostal}, {response.response.resultInfo.originCity && response.response.resultInfo.originCity} {response.response.resultInfo.originState && response.response.resultInfo.originState}</p>
                    <p>{response.response.resultInfo.recordsAvailable} results found</p>
                </section>
            )
        }
    }


    const Form = () => {

        const handleOnSubmit = (event) => {
            event.preventDefault();
            const form = new FormData(event.target);
            const data = []
            for (let [key, value] of form.entries()) {
                data[key] = value
            }

            // const cityCheck = () => {
            //     if (data.city) {
            //         return `&city=${data.city}`
            //     }
            //     return ''
            // }
            const stateCheck = () => {
                if (data.state && data.state !== 'Select') {
                    return `&state=${data.state}`
                }
                return ''
            }

            const addressCheck = () => {
                if (data.address) {
                    return `&address=${data.address}`
                }
                return ''
            }


            const request = `ZipCode=${data.zip}${stateCheck()}${addressCheck()}${`&locatortype=${data.locType === 'on' ? 'A' : 'AS'}`}${data.hr === 'on' ? `&open24hours=Yes` : ''}`

            getLocations(request)
        }
        return (
            <section className='form-wrapper'>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"></link>
                <form className='form' onSubmit={handleOnSubmit}>
                    <section className="checkboxes">

                        <input
                            className='input address-input'
                            type="text"
                            name="address"
                            placeholder="Address"
                        ></input>
                        <input
                            type="text"
                            name="zip"
                            placeholder="Zip Code*"
                            required
                        ></input>

                    </section>
                    {/* <section className="checkboxes">

                    </section> */}
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
                {submitted && <Submission />}
            </section>
        )
    }
    return (
        <section className={wrapperClasses}>
            <section className="title">
                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                    <h1>
                    {title}
                </h1>
                </Animated>
                <p>In addition to our main GFCU branches and ATMs, we are also part of the <a href="https://co-opcreditunions.org/locator/?ref=co-opsharedbranch.org&sc=1" target="_blank" rel="noreferrer">CO-OP Shared Branching Network</a>, <a href="https://co-opcreditunions.org/locator/?ref=co-opatm.org&sc=1" target="_blank" rel="noreferrer">CO-OP ATM Network</a> and <a href="http://www.dolphindebit.com/our-network/" target="_blank" rel="noreferrer">Dolphin Debit ATM Network</a>, giving our members access to more than 5,000 shared credit union locations and nearly 30,000 ATMs nationwide.</p>
                <p><span style={{ textAlign: 'left', fontFamily: 'Gotham', color: 'red', opacity: '0.3', marginBottom: '10px', fontSize: 10 }}>* Required</span></p>
                <p>Search by zip, or full address.</p>
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
                <h3 className="instruction" style={{ textAlign: 'center', fontFamily: 'Gotham Book' }}>Click, tap or hover over pin to see details.</h3>
                <ul>
                    {submitting ?
                        locations.map(() => (
                            <li>
                                <section className="list-info">
                                    <section className="list-pin">
                                        <Pin className="pin" />
                                    </section>
                                    <section className="text">
                                        <Skeleton />
                                        <Skeleton />
                                        <Skeleton />
                                        <Skeleton />
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
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </section>
    )
}

Map.propTypes = {
    title: PropTypes.string,
    center: PropTypes.object,
    zoom: PropTypes.number,
}

export default Map