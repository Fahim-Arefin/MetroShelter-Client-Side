// Import necessary libraries and components
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
import "./Map.module.css"; //because there is only global css only

// Create the Map component
const MultipleMapShow = ({ data }) => {
  return (
    <div className="relative w-full h-[300px] md:h-[500px]">
      <MapContainer
        center={[data[0].lat, data[0].lng]}
        zoom={6}
        className={`h-[100%] z-20`}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {data.map((property) => (
          <Marker key={property._id} position={[property.lat, property.lng]}>
            <Popup>
              {/* when we click on the map marker then pop up text will show */}
              {property.cityName}, {property.country}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

// Export the Map component
export default MultipleMapShow;
