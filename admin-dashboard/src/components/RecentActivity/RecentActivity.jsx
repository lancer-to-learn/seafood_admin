import React, {useState, useEffect} from "react";
import RecentActivityItem from "./RecentActivityItem";
import CardFilter from "../Card/CardFilter";
import "./recentActivity.css";

function RecentActivity() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("Today");
  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  const fetchData = () => {
    fetch("http://localhost:4000/recentactivity")
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.log(error.message));
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="card">
      <CardFilter filterChange={handleFilterChange} />
      <div className="card-body">
        <h5 className="card-title">
          Recent Activity <span>| {filter}</span>
        </h5>
        <div className="activity">
          {items &&
            items.length > 0 &&
            items.map((item) => (
              <RecentActivityItem key={item._id} item={item} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default RecentActivity;
