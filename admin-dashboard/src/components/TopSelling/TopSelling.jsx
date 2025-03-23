import React, { useState, useEffect } from "react";
import "./topSelling.css";
import CardFilter from "../Card/CardFilter";
import TopSellingItem from "./TopSellingItem";

function TopSelling() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("Today");
  const handleFilterChange = (filter) => {
    setFilter(filter);
  };
  const fetchData = () => {
    fetch("http://localhost:4000/topselling")
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.log(error.message));
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="card top-selling overflow-auto">
      <CardFilter filterChange={handleFilterChange} />
      <div className="card-body">
        <h5 className="card-title">
          Top Selling <span>| {filter}</span>
        </h5>
        <table className="table table-borderless datatable">
          <thead className="table-light">
            <tr>
              <th scope="col">Preview</th>
              <th scope="col">Product</th>
              <th scope="col">Price</th>
              <th scope="col">Sold</th>
              <th scope="col">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {items &&
              items.length > 0 &&
              items.map((item) => (
                <TopSellingItem key={item._id} item={item} />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TopSelling;
