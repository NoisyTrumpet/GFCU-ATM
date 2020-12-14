import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 15px;
  height: 18px;
  user-select: none;
  transform: translate(-50%, -50%);
  cursor: ${(props) => (props.onClick ? 'pointer' : 'default')};
  &:hover {
    z-index: 1;
  }
`;

const Marker = ({ text, onClick, children, show }) => (
    <Wrapper
        alt={text}
        onClick={onClick}
    >
        {children}
    </Wrapper>
);

Marker.defaultProps = {
    onClick: null,
};

Marker.propTypes = {
    onClick: PropTypes.func,
    show: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
};

export default Marker;