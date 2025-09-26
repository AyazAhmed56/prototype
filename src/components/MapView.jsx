import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Tooltip,
  Popup,
} from "react-leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

// Dummy groundwater status data (replace with real DB/INGRES data)
const groundwaterStatus = {
  Maharashtra: "Critical",
  Gujarat: "Safe",
  Rajasthan: "Over-exploited",
  Karnataka: "Semi-critical",
  UttarPradesh: "Critical",
};

// 🌊 Groundwater-themed color palette
const getColor = (status) => {
  switch (status) {
    case "Over-exploited":
      return "#B71C1C"; // deep red
    case "Critical":
      return "#FF6F00"; // dark orange
    case "Semi-critical":
      return "#FFD600"; // warm yellow
    case "Safe":
      return "#2E7D32"; // deep green
    default:
      return "#90A4AE"; // gray for unknown
  }
};

export default function MapView() {
  const [indiaGeoJson, setIndiaGeoJson] = useState(null);
  const [activeLayer, setActiveLayer] = useState("Groundwater");

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/geohacker/india/master/state/india_telengana.geojson"
    )
      .then((res) => res.json())
      .then((data) => setIndiaGeoJson(data));
  }, []);

  const styleFeature = (feature) => {
    const stateName = feature.properties.NAME_1;
    const status = groundwaterStatus[stateName] || "Unknown";
    return {
      fillColor: getColor(status),
      weight: 1,
      opacity: 1,
      color: "#1565C0", // water blue borders
      fillOpacity: 0.65,
    };
  };

  const onEachFeature = (feature, layer) => {
    const stateName = feature.properties.NAME_1;
    const status = groundwaterStatus[stateName] || "Unknown";

    layer.bindTooltip(`${stateName}`, {
      direction: "center",
      className: "bg-blue-50 text-blue-900 p-1 rounded-md shadow-md",
    });

    layer.bindPopup(`<b>${stateName}</b><br/>Status: <b>${status}</b>`);

    layer.on({
      click: (e) => {
        e.target.setStyle({
          weight: 3,
          color: "#0D47A1",
          fillOpacity: 0.8,
        });
      },
      mouseover: (e) => {
        e.target.setStyle({
          weight: 2,
          color: "#0288D1",
        });
      },
      mouseout: (e) => {
        e.target.setStyle(styleFeature(feature));
      },
    });
  };

  return (
    <div className="relative">
      {/* 🌊 Layer Toggle Buttons */}
      <div className="absolute top-4 left-4 z-[1000] bg-white shadow-lg p-3 rounded-xl">
        <p className="font-semibold text-blue-900">Layers</p>
        {["Groundwater", "Rainfall", "Salinity", "Extraction"].map((layer) => (
          <button
            key={layer}
            onClick={() => setActiveLayer(layer)}
            className={`block w-full text-left px-3 py-1 rounded-md my-1 ${
              activeLayer === layer
                ? "bg-blue-600 text-white"
                : "bg-blue-50 text-blue-700 hover:bg-blue-100"
            }`}
          >
            {layer}
          </button>
        ))}
      </div>

      {/* 🌍 Map */}
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
    </div>
  );
}
