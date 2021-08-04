import React from 'react';
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
const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
}
const center = {
  lat: 43.653225,
  lng: -79.383186,
}
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
}
export default function App() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries
  });
  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);

  const onMapClick = React.useCallback((event) => {
    setMarkers((current) => [
      ...current, {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        time: new Date(),
      }
    ])
  }, []);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, [])
  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, [])



  if (loadError) return "Error loading map;";
  if (!isLoaded) return "Loading Maps";

  return <div>


    <Search panTo={panTo} onMapClick={onMapClick} />

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
              <EventForm />           </h2>
            <p>Time:{formatRelative(selected.time, new Date())}</p>
          </div>
        </InfoWindow>
      ) : null}
    </GoogleMap>
  </div>
}


function Search({ panTo }) {
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
          <Marker position={panTo.lat, panTo.lng} />
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
