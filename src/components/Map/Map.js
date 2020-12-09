import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import GoogleMapReact from 'google-map-react';
import getLocations from '../../api.js'
import Pin from '../../assets/svg/Pin'
import './Map.scss'

const Map = ({title, center, zoom}) => {
    const wrapperClasses = classNames('maps-wrapper')
    // const [locations, setLocations] = React.useState([])

    const locations = []

    getLocations().then((response) => {
        console.log(response)
        locations.push(response.data.response.locations)
        // setLocations(response.data.response.locations)
    })

    console.log(locations)

    
    const AnyReactComponent = ({children}) => (
        <div style={{
            color: 'white',
            background: 'grey',
            padding: '15px 10px',
            display: 'inline-flex',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '100%',
            transform: 'translate(-50%, -50%)'
        }}>
            {children}
        </div>
    );
    return (
        <section className={wrapperClasses}>
            <script src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyBfEp-SAhpJNtvFz3xakgrml80FfU25I3A`}  type="text/javascript"></script>
            <h1>
                {title}
            </h1>
            <Pin className="pin" />
            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyBfEp-SAhpJNtvFz3xakgrml80FfU25I3A'}}
                    defaultCenter={center}
                    defaultZoom={zoom}
                >
                    <AnyReactComponent
                        lat={30.243350}
                        lng={-97.772570}
                        text="marker"
                    >
                        <Pin className="pin" />
                    </AnyReactComponent>
                </GoogleMapReact>
            </div>
        </section>
    )
}

Map.propTypes = {
    title: PropTypes.string,
    center: PropTypes.object,
    zoom: PropTypes.number
}

export default Map