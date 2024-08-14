// import { MapContainer, TileLayer } from "react-leaflet";
// import "./map.scss";
// import 'leaflet/dist/leaflet.css';
// import Pin from "../pin/Pin";

// function Map({items}) {
//     const position = [24.937436, 67.104319]

//   return (
//     <MapContainer center={items[0].length === 1 ? [items[0].latitude, items[0].longitude]:position} zoom={7} scrollWheelZoom={false} className="map">
//       <TileLayer
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />
//       {items.map(item=>(
//         <Pin item={item} key={item.id}/>
//       ))}
//     </MapContainer>
//   );
// }

// export default Map;

import { MapContainer, TileLayer } from "react-leaflet";
import "./map.scss";
import 'leaflet/dist/leaflet.css';
import Pin from "../pin/Pin";

function Map({ items }) {
  const defaultPosition = [24.937436, 67.104319];

  // Check if items array is defined and has at least one item
  const hasItems = Array.isArray(items) && items.length > 0;
  const centerPosition = hasItems ? [items[0].latitude, items[0].longitude] : defaultPosition;

  return (
    <MapContainer center={centerPosition} zoom={7} scrollWheelZoom={false} className="map">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {hasItems && items.map(item => (
        <Pin item={item} key={item.id} />
      ))}
    </MapContainer>
  );
}

export default Map;

