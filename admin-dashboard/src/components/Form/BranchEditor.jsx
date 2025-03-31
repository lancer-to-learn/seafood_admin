import React, { useState, useEffect } from "react";
import "./branchEditor.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import axios from "axios";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import { getAdminAccounts } from "../../services/accountService.js";

function BranchEditor({ onClose, onSave, branch }) {
  const customIcon = new L.Icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    address: "",
    manager: "",
  });
  const [name, setName] = useState(branch?.name || "");
  const [address, setAddress] = useState(branch?.address || "");
  const [city, setCity] = useState(branch?.city || "");
  const [latitude, setLatitude] = useState(branch?.latitude || 10.7769);
  const [longitude, setLongitude] = useState(branch?.longitude || 106.7009);
  const [manager, setManager] = useState(branch?.manager || "");
  const [managers, setManagers] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (address.length > 2) {
      axios
        .get(`https://nominatim.openstreetmap.org/search`, {
          params: {
            q: address,
            format: "json",
            addressdetails: 1,
            limit: 5,
            "accept-language": "vi",
            countrycodes: "VN",
          },
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
    getAdminAccounts()
      .then((res) => setManagers(res))
      .catch((err) => console.error(err));
  }, []);

  function LocationMarker({
    latitude,
    longitude,
    setLatitude,
    setLongitude,
    setAddress,
  }) {
    const map = useMap();

    useEffect(() => {
      if (latitude && longitude) {
        map.setView([latitude, longitude], 13);
      }
    }, [latitude, longitude, map]);

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
              const cityName =
                res.data.address?.city ||
                res.data.address?.town ||
                res.data.address?.village ||
                "";
              setCity(cityName);
            }
          })
          .catch((err) => console.error(err));
      },
    });

    return latitude && longitude ? (
      <Marker position={[latitude, longitude]} icon={customIcon} />
    ) : null;
  }

  useEffect(() => {
    if (branch) {
      setFormData(branch);
    } else {
      setFormData({ id: null, name: "", address: "", manager: "" });
    }
  }, [branch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const branchData = {
      id: branch?.id,
      name,
      address,
      latitude,
      longitude,
      city,
      manager: manager ? parseInt(manager) : null,
    };
    onSave(branchData);
  };

  const handleSelectAddress = (place) => {
    setAddress(place.display_name);
    setLatitude(parseFloat(place.lat));
    setLongitude(parseFloat(place.lon));
    const cityName =
      place.address?.city ||
      place.address?.town ||
      place.address?.village ||
      "";
    setCity(cityName);
    setSuggestions([]);
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h4 className="text-center mb-4">
          {branch ? "Chỉnh Sửa Chi Nhánh" : "Thêm Chi Nhánh"}
        </h4>
        <div className="form-group">
          <label>
            <i className="bx bx-building-house"></i> Tên Chi Nhánh
          </label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>
            <i className="bx bx-user"></i> Quản lý
          </label>
          <select
            className="form-control"
            value={manager}
            onChange={(e) => setManager(e.target.value)}
          >
            <option value="">Chọn quản lý</option>
            {managers.map((mgr) => (
              <option key={mgr.id} value={mgr.id}>
                {mgr.username}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>
            <i className="bx bx-map-pin"></i> Thành phố
          </label>
          <input type="text" className="form-control" value={city} readOnly />
        </div>
        <div
          className="autocomplete-container form-group"
          style={{ position: "relative" }}
        >
          <label>
            <i className="bx bx-map"></i> Địa chỉ
          </label>
          <input
            type="text"
            className="form-control"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          {suggestions.length > 0 && (
            <ul
              className="autocomplete-dropdown"
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                width: "100%",
                background: "white",
                border: "1px solid #ccc",
                zIndex: 9999,
                maxHeight: "200px",
                overflowY: "auto",
              }}
            >
              {suggestions.map((place) => (
                <li
                  key={place.place_id}
                  onClick={() => handleSelectAddress(place)}
                  style={{
                    padding: "8px",
                    cursor: "pointer",
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  {place.display_name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="map-container">
          <MapContainer
            center={[latitude, longitude]}
            zoom={13}
            style={{ height: "300px", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <LocationMarker
              latitude={latitude}
              longitude={longitude}
              setLatitude={setLatitude}
              setLongitude={setLongitude}
              setAddress={setAddress}
              setCity={setCity}
            />
          </MapContainer>
        </div>
        <div className="d-flex justify-content-between mt-4">
          <button className="btn btn-secondary" onClick={onClose}>
            Đóng
          </button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            {branch ? "Cập Nhật" : "Thêm"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default BranchEditor;
