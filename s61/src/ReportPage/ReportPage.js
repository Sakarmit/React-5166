import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart } from "@mui/x-charts/BarChart";
import { useNavigate } from "react-router-dom";
import { logoutUser } from '../Helpers/userManager';

function ReportPage({ setIsLoggedIn }) {
  const [data, setData] = useState(null);

  const navigate = useNavigate();
  const handleLogout = () => {
    setIsLoggedIn(false);
    logoutUser();
    navigate('/login');
  }

  useEffect(() => {
    const API_URL = process.env.API_LOCATION;
    const token = localStorage.getItem("token");
    
    if (token) {
      axios
      .get(`${API_URL}/energyUse`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          console.log("Token expired. Logging out...");
          handleLogout();
        } else {
          console.error("There was an error fetching the data!", error);
        }
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main>
      <div className="chart">
        {data && (
          <BarChart
            width={500}
            height={500}
            series={[
              {
                data: data.map((item) => item.totalEnergyUse),
                valueFormatter: (val) => {
                  return `${val} TWh`;
                },
              },
            ]}
            xAxis={[
              {
                data: data.map((item) => item.year),
                label: "World Electricity Demand (TWh)",
                scaleType: "band",
              },
            ]}
          />
        )}
      </div>
      <p>
        The chart illustrates the yearly world electricity demand from 2000 to
        2022, measured in terawatt-hours (TWh). The data, sourced from
        <a href="https://ember-energy.org/data/yearly-electricity-data/">
          Ember's Yearly Electricity Data
        </a>
        , shows a consistent upward trend in global electricity consumption over
        the 22-year period. This significant rise highlights the growing global
        reliance on electricity. The chart underscores the importance of
        sustainable energy solutions to meet the escalating demand while
        addressing environmental concerns.
      </p>
    </main>
  );
}

export default ReportPage;
