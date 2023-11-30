// // Import necessary libraries and components
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// // import "./Map.module.css"; //because there is only global css only
// import { useNavigate } from "react-router-dom";

// // Create the Map component
// const MultipleMapShow = ({ data }) => {
//   const navigate = useNavigate();

//   return (
//     <div className="relative w-full h-[300px] md:h-[500px]">
//       <MapContainer
//         center={[data[0].lat, data[0].lng]}
//         zoom={7}
//         className={`h-[100%] z-20`}
//         scrollWheelZoom={true}
//       >
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />

//         {data.map((property) => (
//           <Marker key={property._id} position={[property.lat, property.lng]}>
//             <Popup>
//               {/* when we click on the map marker then pop up text will show */}
//               <span
//                 className="cursor-pointer hover:underline"
//                 onClick={() => navigate(`/properties/${property._id}`)}
//               >
//                 {property.cityName}, {property.country}
//               </span>
//             </Popup>
//           </Marker>
//         ))}
//       </MapContainer>
//     </div>
//   );
// };

// // Export the Map component
// export default MultipleMapShow;
// Import necessary libraries and components
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet"; // Import Leaflet
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";
import customMarkerIcon from "/map-marker-icon.png"; // Adjust the path to your custom marker image
import "./Map.module.css"; //because there is only global css only
// Create the Map component
const MultipleMapShow = ({ data }) => {
  const navigate = useNavigate();

  // Create a custom icon
  const customIcon = new L.Icon({
    iconUrl: customMarkerIcon,
    iconSize: [25, 41], // Adjust the size as needed
    iconAnchor: [16, 32], // Adjust the anchor point if necessary
    popupAnchor: [-2, -30], // Adjust the popup anchor if necessary
  });

  return (
    <div className="relative w-full h-[300px] md:h-[500px]">
      <MapContainer
        center={[data[0].lat, data[0].lng]}
        zoom={7}
        className={`h-[100%] z-20`}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {data.map((property) => (
          <Marker
            key={property._id}
            position={[property.lat, property.lng]}
            icon={customIcon} // Use the custom icon here
          >
            <Popup>
              {/* when we click on the map marker then pop up text will show */}
              <span
                className="cursor-pointer hover:underline"
                onClick={() => navigate(`/properties/${property._id}`)}
              >
                {property.cityName}, {property.country}
              </span>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

// Export the Map component
export default MultipleMapShow;
