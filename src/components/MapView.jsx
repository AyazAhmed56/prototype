// MapView.jsx
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

// Example groundwater data per state
const groundwaterData = {
  Maharashtra: {
    status: "Critical",
    waterLevel: "12.5m",
    recharge: "60mm",
    extraction: "120%",
    rainfall: "900mm",
    trend: "declining",
    quality: "poor",
    salinity: "1500 mg/L",
  },
  Gujarat: {
    status: "Safe",
    waterLevel: "20m",
    recharge: "80mm",
    extraction: "60%",
    rainfall: "1100mm",
    trend: "stable",
    quality: "good",
    salinity: "900 mg/L",
  },
  Rajasthan: {
    status: "Over-exploited",
    waterLevel: "15.2m",
    recharge: "50mm",
    extraction: "140%",
    rainfall: "400mm",
    trend: "rapid decline",
    quality: "poor",
    salinity: "1800 mg/L",
  },
  Karnataka: {
    status: "Semi-critical",
    waterLevel: "18.3m",
    recharge: "75mm",
    extraction: "90%",
    rainfall: "950mm",
    trend: "slightly declining",
    quality: "moderate",
    salinity: "1200 mg/L",
  },
};

const getColor = (status) => {
  switch (status) {
    case "Over-exploited":
      return "#8e44ad"; // purple
    case "Critical":
      return "#e74c3c"; // red
    case "Semi-critical":
      return "#f39c12"; // orange
    case "Safe":
      return "#27ae60"; // green
    default:
      return "#95a5a6"; // gray
  }
};

export default function MapView() {
  const [indiaGeoJson, setIndiaGeoJson] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/geohacker/india/master/state/india_telengana.geojson"
    )
      .then((res) => res.json())
      .then((data) => setIndiaGeoJson(data));
  }, []);

  const styleFeature = () => ({
    fillColor: "#ffffff",
    weight: 1,
    color: "#1565C0",
    fillOpacity: 0.4,
  });

  const onEachFeature = (feature, layer) => {
    const stateName = feature.properties.NAME_1;

    layer.on({
      click: () => {
        if (groundwaterData[stateName]) {
          setSelectedState({ name: stateName, ...groundwaterData[stateName] });
        } else {
          setSelectedState({ name: stateName, status: "Unknown" });
        }
      },
      mouseover: (e) => {
        e.target.setStyle({ weight: 2, color: "#0288D1" });
      },
      mouseout: (e) => {
        e.target.setStyle(styleFeature());
      },
    });
  };

  return (
    <div className="relative h-screen">
      {/* Indicator Panel */}
      {selectedState && (
        <div className="absolute bottom-4 left-4 z-[1000] bg-white shadow-lg p-4 rounded-xl w-96">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-lg">{selectedState.name}</h3>
            <button
              onClick={() => setSelectedState(null)}
              className="text-gray-400 hover:text-gray-700"
            >
              ✖
            </button>
          </div>
          <span
            className="inline-block mt-2 px-2 py-1 rounded text-white font-semibold"
            style={{ backgroundColor: getColor(selectedState.status) }}
          >
            {selectedState.status}
          </span>

          {selectedState.waterLevel && (
            <div className="mt-4 grid grid-cols-2 gap-2 text-center text-sm">
              <div className="p-2 bg-gray-50 rounded shadow">
                <div className="font-bold text-blue-700">
                  {selectedState.waterLevel}
                </div>
                <div>Water Level</div>
              </div>
              <div className="p-2 bg-gray-50 rounded shadow">
                <div className="font-bold text-green-700">
                  {selectedState.recharge}
                </div>
                <div>Recharge</div>
              </div>
              <div className="p-2 bg-gray-50 rounded shadow">
                <div className="font-bold text-red-700">
                  {selectedState.extraction}
                </div>
                <div>Extraction</div>
              </div>
              <div className="p-2 bg-gray-50 rounded shadow">
                <div className="font-bold text-purple-700">
                  {selectedState.rainfall}
                </div>
                <div>Rainfall</div>
              </div>
            </div>
          )}

          {selectedState.trend && (
            <p className="mt-3 text-xs text-gray-600">
              <strong>Trend:</strong> {selectedState.trend} •{" "}
              <strong>Quality:</strong> {selectedState.quality} •{" "}
              <strong>Salinity:</strong> {selectedState.salinity}
            </p>
          )}
        </div>
      )}

      {/* Map */}
      <MapContainer
        style={{ height: "100%", width: "100%" }}
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
