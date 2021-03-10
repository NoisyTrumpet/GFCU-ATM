import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import propTypes from 'prop-types';

const InfoWindow = (props) => {
    const { place } = props;
    const infoWindowStyle = {
        position: 'absolute',
        bottom: '12px',
        left: '10px',
        backgroundColor: 'white',
        boxShadow: '0 2px 7px 1px rgba(0, 0, 0, 0.3)',
        padding: 10,
        minWidth: 'max-content',
        fontSize: 14,
    };

    return (
        <div style={infoWindowStyle} className={`infoShow`}>
            <div style={{ fontSize: 14, marginBottom: '10px' }} >
                {place.institutionName}
            </div>
            <div style={{ fontSize: 14, color: 'grey' }}>
                <span><b>Address:</b> {place.address}<br></br>{place.city} {place.state}, {place.zip}</span>
            </div>
            <div style={{ fontSize: 14, color: 'grey' }}>
                {place.locationType}
            </div>
            <div style={{ fontSize: 14, color: 'grey' }}>
                <span><b>Distance:</b> {place.distance} miles away</span>
            </div>
            <div>
                <a href={`https://google.com/maps/place/${place.address},+${place.city},+${place.state}+${place.zip}`} target="_blank" rel="noreferrer">Directions</a>
            </div>
        </div>
    );
};
InfoWindow.propTypes = {
    place: PropTypes.shape({
        institutionName: PropTypes.string,
        address: PropTypes.string,
        locType: PropTypes.string,
        distance: PropTypes.string,
        city: PropTypes.string,
        state: propTypes.string,
        zip: PropTypes.string,
        singleMap: PropTypes.string
    })
};

// InfoWindow.propTypes = {
//     place: PropTypes.shape({
//         name: PropTypes.string,
//         formatted_address: PropTypes.string,
//         rating: PropTypes.number,
//         types: PropTypes.arrayOf(PropTypes.string),
//         price_level: PropTypes.number,
//         opening_hours: PropTypes.shape({
//             open_now: PropTypes.bool,
//         }),
//     }).isRequired,
// };


const Wrapper = styled.div`
  width: 20px;
  height: 24px;
  user-select: none;
  transform: translate(-50%, -50%);
  cursor: ${(props) => (props.onClick ? 'pointer' : 'default')};
  &:hover {
    z-index: 1;
  }
`;



const Marker = ({ text, children, show, place, tooltip, $hover, home }) => {

    const [click, setClick] = useState(false)

    const handleClick = () => {
        setClick(!click ? true : false)
    };

    if (home) {
        return <>
            <Wrapper
                alt={text}
            >
                {children}
            </Wrapper>
        </>
    }

    return (
        <>
            <Wrapper
                alt={text}
                onClick={handleClick}
                center={place}
            >
                {click && <InfoWindow place={place} />}
                {$hover && <InfoWindow place={place} />}
                {children}
            </Wrapper>
        </>
    )
};

Marker.defaultProps = {
    onClick: null,
};

Marker.propTypes = {
    onClick: PropTypes.func,
    place: PropTypes.shape({
        institutionName: PropTypes.string,
        address: PropTypes.string,
        locType: PropTypes.string,
        distance: PropTypes.string,
        city: PropTypes.string
    }),
    home: PropTypes.bool
};

export default Marker;