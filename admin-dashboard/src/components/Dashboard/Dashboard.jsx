import React, { useState, useEffect } from "react";
import Card from "../Card/Card";
import "./dashboard.css";
import Report from "../Report/Report";
import RecentSales from "../RecentSales/RecentSales";
import TopSelling from "../TopSelling/TopSelling";
import RecentActivity from "../RecentActivity/RecentActivity";
import BudgetReport from "../BudgetReport/BudgetReport";
import WebTraffic from "../WebTraffic/WebTraffic";
import News from "../News/News";

function Dashboard() {
  const [cards, setCards] = useState([]);

  const fetchData = () => {
    fetch("http://localhost:4000/cards")
      .then((response) => response.json())
      .then((data) => setCards(data))
      .catch((error) => console.log(error.message));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="dashboard section">
      <div className="row">
        <div className="col-lg-8">
          <div className="row">
            {
                cards && cards.length > 0 &&
                cards.map(card => 
                    <Card key={card.id} card={card} />
                )
            }
            <div className="col-12">
              <Report />
            </div>
            <div className="col-12">
              <RecentSales />
            </div>
            <div className="col-12">
              <TopSelling />
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <RecentActivity />
          <BudgetReport />
          <WebTraffic />
          <News />
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
