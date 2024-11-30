import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart } from "@mui/x-charts/BarChart";

function ReportPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:3000/api/energyUse", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
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
