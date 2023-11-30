// Import necessary libraries and components
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.module.css"; //because there is only global css only
import customMarkerIcon from "/map-marker-icon.png";
import L from "leaflet"; // Import Leaflet
// Create the Map component
const MapShow = ({ data }) => {
  const customIcon = new L.Icon({
    iconUrl: customMarkerIcon,
    iconSize: [25, 41], // Adjust the size as needed
    iconAnchor: [16, 32], // Adjust the anchor point if necessary
    popupAnchor: [-2, -30], // Adjust the popup anchor if necessary
  });
  return (
    <div className="relative w-full h-[300px] md:h-[500px]">
      <MapContainer
        center={[data.lat, data.lng]}
        zoom={10}
        className={`h-[100%] z-20`}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker key={1} position={[data.lat, data.lng]} icon={customIcon}>
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
