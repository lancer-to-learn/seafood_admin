import React, { useState, useEffect } from "react";
import CardFilter from "../Card/CardFilter";
import NewsPostItem from "./NewsPostItem";
import "./news.css";

function News() {
  const [news, setNews] = useState([]);
  const [filter, setFilter] = useState("Today");
  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  const fetchData = () => {
    fetch("http://localhost:4000/news")
      .then((response) => response.json())
      .then((data) => setNews(data))
      .catch((error) => console.log(error.message));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="card">
      <CardFilter filterChange={handleFilterChange} />
      <div className="card-body pb-0">
        <h5 className="card-title">
          News &amp; Update <span>| {filter}</span>
        </h5>
        <div className="news">
          {news &&
            news.length > 0 &&
            news.map((item) => (
              <NewsPostItem key={item._id} item={item} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default News;
