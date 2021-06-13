import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import axios from "axios";
import GoogleMapReact, {fitBounds} from "google-map-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import example from "../../constants/example.js";
import Pin from "../../assets/svg/Pin";
import AltPin from "../../assets/svg/AltPin";
import HomePin from "../../assets/svg/HomePin";
import "./Map.scss";
import Skeleton from "react-loading-skeleton";
import { Animated } from "react-animated-css";
import Marker from "../Marker/Marker.js";
import Geocode from "react-geocode";
import Pagination from "../Pagination/index.js";
import { BiCurrentLocation } from "react-icons/bi";

const Map = ({ title, center, zoom }) => {
  const wrapperClasses = classNames("maps-wrapper");
  const [locations, setLocations] = React.useState(example.response.locations);
  const [submitting, setSubmitting] = useState(false);
  const [response, setResponse] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [searchCenter, setCenter] = useState({ lat: 29.4241, lng: -98.4936 });
  const [myLocation, setMyLocation] = useState({ lat: 29.4241, lng: -98.4936 });
  const [myZip, setMyZip] = useState(78704);
  const [myAddress, setMyAddress] = useState({
    address: "",
    city: "",
    state: "",
    zip: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const indexOfLastLocation = currentPage * postsPerPage;
  const indexOfFirstLocation = indexOfLastLocation - postsPerPage;
  const currentLocations = locations.slice(
    indexOfFirstLocation,
    indexOfLastLocation
  );
  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);


// Fit map to its bounds after the api is loaded
const apiIsLoaded = (map, maps, places) => {
  // Get bounds by our places
  mapFunction.push(map)
};


// const handleChildClick = (place, map, maps, marker) => {
//   apiIsLoaded()
//   console.log(apiIsLoaded())

const mapFunction = []



// ES5 users
const _onClick = (obj) => {
  apiIsLoaded()
  mapFunction[0].setCenter({lat:  parseFloat(obj.lat), lng:  parseFloat(obj.lng)})
  mapFunction[0].setZoom(13)

}



  const length = locations.length;

  const notify = () =>
    toast("Ooops! We've encountered an error, please try again!");

  const MapResults = () => {
    return (
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_API }}
        center={searchCenter}
        defaultZoom={zoom}
        onChildClick={(key, place) => {
          _onClick(place)
        }}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => {
          apiIsLoaded(map, maps, locations)

        }}
      >

        <Marker lat={searchCenter.lat} lng={searchCenter.lng} home>
          <Animated
            animationIn="fadeInDownBig"
            animationOut="fadeOut"
            isVisible={true}
          >
            <HomePin className="home-pin" />
          </Animated>
        </Marker>

        {locations.map((place, index) => (
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
            {place.locatorType === "A" ? (
              <Animated
                animationIn="bounce"
                animationOut="fadeOut"
                isVisible={true}
              >
                <AltPin className="alt-pin" />
                <p className={`little-number ${index >= 9 && `double`}`}>
                  {index + 1}
                </p>
              </Animated>
            ) : (
              <Animated
                animationIn="bounce"
                animationOut="fadeOut"
                isVisible={true}
              >
                <Pin className="pin" />
                <p className={`little-number ${index >= 9 && `double`}`}>
                  {index + 1}
                </p>
              </Animated>
            )}
          </Marker>
        ))}
      </GoogleMapReact>
    );
  };

  const getCurrentLocation = async () => {
    setSubmitting(true);

    const options = {
      enableHighAccuracy: true,
      timeout: 7000,
      maximumAge: 0,
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error, options);
      function success(pos) {
        var crd = pos.coords;
        setMyLocation({
          lat: crd.latitude,
          lng: crd.longitude,
        });
        Geocode.fromLatLng(myLocation.lat, myLocation.lng).then(
          (response) => {
            if (response.status === "OK") {
              setMyAddress({
                address: `${response.results[0].address_components[0]?.long_name} ${response?.results[0]?.address_components[1]?.long_name}`,
                city: response?.results[0]?.address_components[3]?.long_name,
                state: response?.results[0]?.address_components[5]?.short_name,
                zip: response?.results[0]?.address_components[7]?.long_name,
              });
            }

            const request = `ZipCode=${myAddress?.zip}&city=${myAddress?.city}&state=${myAddress?.state}&address=${myAddress?.address}&locatortype=AS`;

            getLocations(request);
            setSubmitting(false);
          },
          (error) => {
            console.log(error);
            setSubmitting(false);
          }
        );
      }

      function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }
    }
  };

  const getLocations = async (request) => {
    setSubmitting(true);
    const proxy = "https://cors.bridged.cc/";

    const url = `${proxy}https://api.coop.org/locator/v1/proximitysearch?${request}`;

    const options = {
      headers: {
        client_id: "53baaa15964c4b2c857bd26900fba3fe",
        client_secret: "13Ff7232c0cf401cB4d0bF496D2f83F7",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {},
    };
    return axios
      .get(url, options)
      .then((response) => {

        setLocations(response.data.response.locations);
        setCenter({
          lat: parseFloat(response.data.response.resultInfo.originLat),
          lng: parseFloat(response.data.response.resultInfo.originLong),
        });
        setSubmitting(false);
        setResponse(response.data);
        setSubmitted(true);
      })
      .catch((error) => {
        console.log(error);
        notify();
        setSubmitting(false);
        setSubmitted(true);
      });
  };

  const Submission = () => {
    if (response === {}) {
      return null;
    } else {
      return (
        <section className="searched-for">
          <p>
            You Searched for:{" "}
            {response.response?.resultInfo.originAddress
              ? response.response?.resultInfo.originAddress
              : response.response?.resultInfo.originPostal}
            ,{" "}
            {response.response?.resultInfo.originCity &&
              response.response?.resultInfo.originCity}{" "}
            {response.response?.resultInfo.originState &&
              response.response?.resultInfo.originState}
          </p>
          <p>{response.response?.resultInfo.recordsAvailable} results found</p>
        </section>
      );
    }
  };

  const Form = () => {
    const handleOnSubmit = (event) => {
      event.preventDefault();
      const form = new FormData(event.target);
      const data = [];
      for (let [key, value] of form.entries()) {
        data[key] = value;
      }

      const cityCheck = () => {
        if (data.city) {
          return `&city=${data.city}`;
        }
        return "";
      };
      const stateCheck = () => {
        if (data.state && data.state !== "Select") {
          return `&state=${data.state}`;
        }
        return "";
      };

      const addressCheck = () => {
        if (data.address) {
          return `&address=${data.address}`;
        }
        return "";
      };

      const request = `ZipCode=${
        data.zip
      }${cityCheck()}${stateCheck()}${addressCheck()}${`&locatortype=${
        data.locType === "on" ? "A" : "AS"
      }`}${data.hr === "on" ? `&open24hours=Yes` : ""}`;

      getLocations(request);
    };

    return (
      <section className="form-wrapper">
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"
        ></link>
        <form className="form" onSubmit={handleOnSubmit}>
          <section className="checkboxes">
            <input
              className="input address-input"
              type="text"
              name="address"
              placeholder="Address"
            ></input>
            <input
              className="input city-input"
              type="text"
              name="city"
              placeholder="City"
            ></input>
          </section>
          <section className="checkboxes">
            <select name="state" placeholder="State" className="input state">
              <option value="Select" defaultValue="TX" disabled="">
                State
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
          <button type="submit" className="button">
            {submitting ? "Locating...🤔" : "Submit"}
          </button>
        </form>
        {submitted && <Submission />}
      </section>
    );
  };

  // React.useEffect(() => {
  //   console.log(getCurrentLocation())
  // }, [])

  return (
    <section className={wrapperClasses}>
      <section className="title">
        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
          <h1>{title}</h1>
        </Animated>
        <p>
          In addition to our main GFCU branches and ATMs, we are also part of
          the{" "}
          <a
            href="https://co-opcreditunions.org/locator/?ref=co-opsharedbranch.org&sc=1"
            target="_blank"
            rel="noreferrer"
          >
            CO-OP Shared Branching Network
          </a>
          ,{" "}
          <a
            href="https://co-opcreditunions.org/locator/?ref=co-opatm.org&sc=1"
            target="_blank"
            rel="noreferrer"
          >
            CO-OP ATM Network
          </a>{" "}
          and{" "}
          <a
            href="http://www.dolphindebit.com/our-network/"
            target="_blank"
            rel="noreferrer"
          >
            Dolphin Debit ATM Network
          </a>
          , giving our members access to more than 5,000 shared credit union
          locations and nearly 30,000 ATMs nationwide.
        </p>
        <p>
          <span
            style={{
              textAlign: "left",
              fontFamily: "Gotham",
              color: "red",
              opacity: "0.3",
              marginBottom: "10px",
              fontSize: 10,
            }}
          >
            * Required
          </span>
        </p>
        <p>Search by zip, full address, or current location</p>
        <button
          className="location-button"
          onClick={() => {
            getCurrentLocation();
          }}
        >
          <BiCurrentLocation />
        </button>
      </section>
      <section className="form">
        <Form />
      </section>
      <section className="map">
        {submitting ? <Skeleton height={700} /> : <MapResults />}
      </section>
      <section className="results">
        <section className="legend">
          <div className="atm">
            <p>ATM</p>
            <AltPin />
          </div>
          <div className="shared-branch">
            <p>ATM & Shared Branch</p>
            <Pin />
          </div>
        </section>
        <h3
          className="instruction"
          style={{ textAlign: "center", fontFamily: "Gotham Book" }}
        >
          Click, tap or hover over pin to see details.
        </h3>

        <ul>
          {submitting
            ? currentLocations.map((key, index) => (
                <li key={key.index}>
                  <section className="list-info">
                    <section className="list-pin">
                      <Pin className="pin" />
                    </section>
                    <section className="text">
                      <Skeleton count={1} height={10} />
                      <Skeleton count={1} height={10} />
                      <Skeleton count={1} height={10} />
                      <Skeleton count={1} height={10} />
                    </section>
                  </section>
                  <section className="list-directions">
                    <p>
                      <b>Distance:</b> <Skeleton /> miles away
                    </p>
                    <Skeleton />
                  </section>
                </li>
              ))
            : currentLocations.map((place, index, locations) => (
                <li>
                  <section className="list-info">
                    <section className="list-pin">
                      <p className={`list-little-number`}>
                        {length - (length - index) + 1}
                      </p>
                      {place.locatorType === "A" ? (
                        <AltPin className="alt-pin" />
                      ) : (
                        <Pin className="pin" />
                      )}
                    </section>
                    <section className="text">
                      {submitting ? (
                        <Skeleton />
                      ) : (
                        <h5>{place.institutionName}</h5>
                      )}
                      {submitting ? <Skeleton /> : <p>{place.address}</p>}
                      {submitting ? (
                        <Skeleton />
                      ) : (
                        <p>
                          {place.city} {place.state}, {place.zip}
                        </p>
                      )}
                      {submitting ? (
                        <Skeleton />
                      ) : (
                        <p>
                          <b>
                            {place.locatorType === "A"
                              ? "ATM"
                              : "Branch and ATM"}
                          </b>
                        </p>
                      )}
                    </section>
                  </section>
                  <section className="list-directions">
                    <p>
                      <b>Distance:</b> {place.distance} miles away
                    </p>
                    <p>
                      {place.city} {place.state}, {place.zip}
                    </p>
                    <a
                      href={`https://google.com/maps/place/${place.address},+${place.city},+${place.state}+${place.zip}`}
                    >
                      Directions
                    </a>
                  </section>
                </li>
              ))}
        </ul>
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={locations.length}
          paginate={paginate}
        />
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
  );
};

Map.propTypes = {
  title: PropTypes.string,
  center: PropTypes.object,
  zoom: PropTypes.number,
};

export default Map;
