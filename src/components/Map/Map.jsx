import React, { useEffect } from 'react';
import './Map.module.css';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api"; // npm i @react-google-maps/api
import mapStyles from "./map-style"
import { formatRelative } from 'date-fns'; // npm i date-fns
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete"; // npm i use-places-autocomplete
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox"; // npm i @reach/combobox
import "@reach/combobox/styles.css"
import EventForm from '../EventForm/EventForm';
const libraries = ["places"];
//map width and height
const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
}
//center of map
const center = {
  lat: 43.653225,
  lng: -79.383186,
}
// maps options 
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
}
export default function App() {
  //put the api kep 
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries
  });
  //set hook
  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);
  //get api events to show on map 
  useEffect(() => {
    let jwt = localStorage.getItem('token')
    fetch('/api/events', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + jwt
      },
    }).then(fetchResponse => fetchResponse.json())
      .then((events) => {
        let _events = events.filter((event) => event.lat && event.lng && event.time).map((event) => ({
          ...event,
          submitted: true,
          time: new Date(event.time)
        }))
        setMarkers(_events)
      })
  }, [])
  //to create mark when click
  const onMapClick = React.useCallback((event) => {
    setMarkers((current) => [
      ...current, {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        time: new Date(),
        submitted: false,
      }
    ])
  }, []);
  //map load 
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, [])
  // zoom in the search location
  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, [])
  //updateMarker find by lat and lng
  const updateMarker = ({ name, location, lat, lng, date, details}) => {
    let ms = [...markers];
    let marker = ms.find((m) => m.lat === lat && m.lng === lng);
    marker.submitted = true;
    marker.name = name;
    marker.location = location;
    marker.date = date;
    marker.details = details;
    setMarkers(ms);
  }


  if (loadError) return "Error loading map;";
  if (!isLoaded) return "Loading Maps";

  return <div>


    <Search panTo={panTo} setMarkers={setMarkers} />

    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={8}
      center={center}
      options={options}
      onClick={onMapClick}
      onLoad={onMapLoad}
    >
      {markers.map((marker) => (
        <Marker
          key={marker.time.toISOString()}
          position={{ lat: marker.lat, lng: marker.lng }}
          onClick={() => { setSelected(marker) }}
        // icon={{url:"/.svg",scaledSize: new window.google.maps.Size(30,30), origin: new window.google.maps.Point(0,0), anchor: new window.google.maps.Poing(15,15)}}
        />))}
      {selected ? (
        <InfoWindow
          position={{ lat: selected.lat, lng: selected.lng }}
          onCloseClick={() => {
            setSelected(null);
          }}
        >
          <div>
            <h2>
              Alert
            </h2>
            {/* update marker  */}
            {selected.submitted ? <>
              <p>Name: {selected.name}</p>
              <p>Location: {selected.location}</p>
              <p>date: {selected.date}</p>
              <p>details: {selected.details}</p>
              <p>created by: {selected.user}</p>
            </> : <EventForm event={selected} updateMarker={updateMarker} />}
            <p>Created: {formatRelative(selected.time, new Date())}</p>
          </div>
        </InfoWindow>
      ) : null}
    </GoogleMap>
  </div>
}


function Search({ panTo, setMarkers }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 43.6532, lng: () => -79.3832 },
      radius: 100 * 1000,
    },
  });

  return (
    <div className='search'>
      <Combobox onSelect={async (address) => {
        setValue(address, false);
        clearSuggestions();
        try {
          const results = await getGeocode({ address });
          const { lat, lng } = await getLatLng(results[0]);
          panTo({ lat, lng });
          setMarkers((current) => [
            ...current, {
              lat,
              lng,
              time: new Date(),
              submitted: false,
            }
          ])
        } catch (error) {
          console.log("😱 Error: ", error);
        }
      }}>
        <ComboboxInput value={value} onChange={(e) => {
          setValue(e.target.value)
        }} disabled={!ready} placeholder="Enter an address" />
        <ComboboxPopover>
          {status === "OK" &&
            data.map(({ id, description }) => (
              <ComboboxOption key={id} value={description} />
            ))}
        </ComboboxPopover>
      </Combobox>
    </div>)
}
