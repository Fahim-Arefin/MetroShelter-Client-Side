import { useMapEvent } from "react-leaflet";

function DetectMapClick({ setMapPosition }) {
  //read doc for how to handle events on map
  useMapEvent({
    click: (e) => {
      console.log(e);
      setMapPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  return null;
}

export default DetectMapClick;
