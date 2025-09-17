import { MapContainer, TileLayer, GeoJSON, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

// Groundwater status data (dummy, replace with real data)
const groundwaterStatus = {
  Maharashtra: "Critical",
  Gujarat: "Safe",
  Rajasthan: "Over-exploited",
  Karnataka: "Semi-critical",
  UttarPradesh: "Critical",
};

// Color scheme
const getColor = (status) => {
  switch (status) {
    case "Over-exploited":
      return "red";
    case "Critical":
      return "orange";
    case "Semi-critical":
      return "yellow";
    case "Safe":
      return "green";
    default:
      return "gray";
  }
};

export default function MapView() {
  const [indiaGeoJson, setIndiaGeoJson] = useState(null);

  useEffect(() => {
    // Fetch GeoJSON for India states
    fetch(
      "https://raw.githubusercontent.com/geohacker/india/master/state/india_telengana.geojson"
    )
      .then((res) => res.json())
      .then((data) => setIndiaGeoJson(data));
  }, []);

  // Style for each state
  const styleFeature = (feature) => {
    const stateName = feature.properties.NAME_1; // Name from geojson
    const status = groundwaterStatus[stateName] || "Unknown";
    return {
      fillColor: getColor(status),
      weight: 1,
      opacity: 1,
      color: "black",
      fillOpacity: 0.6,
    };
  };

  // Interaction (click → highlight + popup)
  const onEachFeature = (feature, layer) => {
    const stateName = feature.properties.NAME_1;
    const status = groundwaterStatus[stateName] || "Unknown";
    layer.bindPopup(
      `<b>${stateName}</b><br/>Groundwater Status: <b>${status}</b>`
    );
    layer.on({
      click: (e) => {
        e.target.setStyle({
          weight: 2,
          color: "blue",
          fillOpacity: 0.8,
        });
      },
    });
  };

  return (
    <MapContainer
      style={{ height: "100vh", width: "100%" }}
      center={[22.9734, 78.6569]}
      zoom={5}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />
      {indiaGeoJson && (
        <GeoJSON
          data={indiaGeoJson}
          style={styleFeature}
          onEachFeature={onEachFeature}
        />
      )}
    </MapContainer>
  );
}
