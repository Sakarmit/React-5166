import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart } from "@mui/x-charts/PieChart";
import { useNavigate } from "react-router-dom";
import { logoutUser } from '../Helpers/userManager';

function SummaryPage({ setIsLoggedIn }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const handleLogout = () => {
    setIsLoggedIn(false);
    logoutUser();
    navigate('/login');
  }

  useEffect(() => {
    const API_URL = process.env.REACT_APP_API_LOCATION;
    const token = localStorage.getItem("token");
    if (token) {
      axios
      .get(`${API_URL}/energySources`, {
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
          setError("There was an error fetching the data!");
          console.error("There was an error fetching the data!", error);
        }
      })
      .finally(() => {
        setLoading(false);
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <p>Loading Data...</p>;
  }

  if (error) {
    return <p role="alert">{error}</p>;
  }

  return (
    <main>
      <div className="chart" role="img"
        aria-label="Pie Chart showing sources of electricity generation worldiwde">
        {data && (
          <PieChart
            width={700}
            height={500}
            series={[
              {
                data: data.map((item, index) => {
                  return { id: index, label: item.source, value: item.value };
                }),
                valueFormatter: (val) => {
                  return `${val.value}%`;
                },
                borderColor: "black",
                innerRadius: "50%",
                paddingAngle: 0.3,
                highlightScope: { fade: "global", highlight: "item" },
              },
            ]}
            margin={{bottom: 70, left: 50, right:50 }}
            slotProps={{
              legend: {
                direction: 'row',
                position: { vertical: 'bottom', horizontal: 'middle' },
                padding: 0,
              },
            }}
          />
        )}
      </div>
      <p>
        The data from&nbsp;
        <a href="https://ourworldindata.org/grapher/share-elec-by-source?time=latest&v=1&csvType=filtered&useColumnShortNames=false">
          Our World in Data
        </a>
        &nbsp;highlights the sources of energy used for electricity generation
        worldwide. Coal remains the largest contributor at 35.51%, followed by
        gas at 22.47% and hydro at 14.28%. Nuclear energy accounts for 9.11% of
        the total, while wind and solar contribute 7.82% and 5.53%,
        respectively. Oil and bioenergy have smaller shares, at 2.67% and 2.30%,
        with other renewables making up the smallest portion at 0.30%.
      </p>
    </main>
  );
}

export default SummaryPage;
