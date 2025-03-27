import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import axios from "axios";
import "./branchEditor.css";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const BranchEditor = ({ branch, onSave, onClose }) => {
  const [name, setName] = useState(branch?.name || "");
  const [address, setAddress] = useState(branch?.address || "");
  const [latitude, setLatitude] = useState(branch?.latitude || 10.7769);
  const [longitude, setLongitude] = useState(branch?.longitude || 106.7009);
  const [manager, setManager] = useState(branch?.manager || "");
  const [suggestions, setSuggestions] = useState([]);
  const [managers, setManagers] = useState([]);

  const customIcon = new L.Icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  useEffect(() => {
    if (address.length > 2) {
      axios
        .get(`https://nominatim.openstreetmap.org/search`, {
          params: { q: address, format: "json", addressdetails: 1, limit: 5, "accept-language": "vi", countrycodes: "VN" },
        })
        .then((res) => {
          setSuggestions(res.data);
        })
        .catch((err) => console.error(err));
    } else {
      setSuggestions([]);
    }
  }, [address]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/managers")
      .then((res) => setManagers(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleSelectAddress = (place) => {
    setAddress(place.display_name);
    setLatitude(parseFloat(place.lat));
    setLongitude(parseFloat(place.lon));
    setSuggestions([]);
  };

  function LocationMarker() {
    useMapEvents({
      click(e) {
        setLatitude(e.latlng.lat);
        setLongitude(e.latlng.lng);
  
        // Lấy địa chỉ từ tọa độ mới
        axios
          .get("https://nominatim.openstreetmap.org/reverse", {
            params: {
              lat: e.latlng.lat,
              lon: e.latlng.lng,
              format: "json",
              "accept-language": "vi",
            },
          })
          .then((res) => {
            if (res.data && res.data.display_name) {
              setAddress(res.data.display_name);
            }
          })
          .catch((err) => console.error(err));
      },
    });
  
    return latitude && longitude ? (
      <Marker position={[latitude, longitude]} icon={customIcon} />
    ) : null;
  }
  

  const handleSubmit = () => {
    onSave({ ...branch, name, address, latitude, longitude, manager });
    onClose();
  };

  return (
    <div className="branch-editor-overlay">
      <div className="branch-editor-popup">
        <h3>{branch ? "Chỉnh sửa chi nhánh" : "Thêm chi nhánh mới"}</h3>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Tên chi nhánh" />
        <div className="autocomplete-container">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Địa chỉ"
          />
          {suggestions.length > 0 && (
            <ul className="autocomplete-dropdown">
              {suggestions.map((place) => (
                <li key={place.place_id} onClick={() => handleSelectAddress(place)}>
                  {place.display_name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <label>Quản lý:</label>
        <select value={manager} onChange={(e) => setManager(e.target.value)}>
          <option value="">Chọn quản lý</option>
          {managers.map((mgr) => (
            <option key={mgr.id} value={mgr.id}>
              {mgr.name}
            </option>
          ))}
        </select>
        <MapContainer center={[latitude, longitude]} zoom={13} style={{ height: "300px", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <LocationMarker />
        </MapContainer>
        <div className="button-group">
          <button className="btn-save" onClick={handleSubmit}>Lưu</button>
          <button className="btn-cancel" onClick={onClose}>Hủy</button>
        </div>
      </div>
    </div>
  );
};

export default BranchEditor;
