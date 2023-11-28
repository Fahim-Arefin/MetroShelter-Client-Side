// Import necessary libraries and components
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
import "./Map.module.css"; //because there is only global css only

// Create the Map component
const MapShow = ({ data }) => {
  return (
    <div className="relative w-full h-[300px] md:h-[500px]">
      <MapContainer
        center={[data.lat, data.lng]}
        zoom={10}
        className={`h-[100%] z-20`}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <Marker key={1} position={[data.lat, data.lng]}>
          <Popup className="">
            <span className="">
              {data.cityName}, {data.country}
            </span>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

// Export the Map component
export default MapShow;
