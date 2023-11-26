import { useMap } from "react-leaflet";

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position); //used for set the map view
  return null;
}

export default ChangeCenter;
