// Import necessary libraries and components
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
import "./Map.module.css"; //because there is only global css only
import { useEffect } from "react";
import useGeolocation from "../hooks/use-Geoloocation";
import Button from "./Button";
import ChangeCenter from "./ChangeCenter";
import DetectMapClick from "./DetectMapClick";

// Create the Map component
const MyMap = ({ mapPosition, setMapPosition }) => {
  const { isLoading, position, getPosition } = useGeolocation();

  useEffect(() => {
    if (position) {
      setMapPosition([position.lat, position.lng]);
    }
  }, [position, setMapPosition]);

  return (
    <div className="relative w-full h-[500px]">
      {!position && (
        <Button
          onClick={getPosition}
          primary
          //   className="absolute z-30 top-3/4 left-[40%] xl:left-[45%] rounded-lg font-bold px-4 py-2"
          className="absolute z-30 inset-x-0 bottom-12 rounded-lg font-bold px-4 py-2 w-fit mx-auto"
        >
          {isLoading ? (
            "loading..."
          ) : (
            <div className="flex space-x-2 items-center">
              <div className="w-4 h-4">
                <img
                  className="w-full h-full"
                  src="https://img.icons8.com/ios-filled/50/address--v1.png"
                  alt="address--v1"
                />
              </div>
              <span>Use your location</span>
            </div>
          )}
        </Button>
      )}
      <MapContainer center={mapPosition} zoom={8} className={`h-[100%] z-20`}>
        {/* Add a TileLayer for the map */}
        {/* <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.carto.com/attributions">CARTO</a>'
        /> */}

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker key={1} position={mapPosition}>
          <Popup>
            Add your location
            {/* {city.emoji} {city.cityName} */}
          </Popup>
        </Marker>

        {/* this is a component which is used for change the center of the map each render */}
        <ChangeCenter position={mapPosition} />
        {/* Add Markers for each location */}

        {/*in this below component defines click events on the map  */}
        <DetectMapClick setMapPosition={setMapPosition} />
      </MapContainer>
    </div>
  );
};

// Export the Map component
export default MyMap;
