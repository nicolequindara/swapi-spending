import { LineChart } from "@mui/x-charts";
import React, { useState } from "react";
import useFetchSpending from "../hooks/useFetchSpending";
import { calculateSpending } from "../utils";
import ContextModal from "./ContextModal";
import CircularProgress from '@mui/material/CircularProgress';

function Spending() {
  const [showModalFor, setShowModalFor] = useState(null);
  const { isLoading, apiData } = useFetchSpending();
  const spendingData = calculateSpending(apiData);

  const loading = <CircularProgress />;
  const modal = (
    <ContextModal
      onClose={() => setShowModalFor(null)}
      film={showModalFor}
      starships={apiData.starships}
    />
  );

  return isLoading
    ? loading
    : [
        modal,
        <>
          <div className="chart-title">
            <span style={{ "font-size": "x-large", "font-weight": "bold" }}>
              Galactic spending has decreased generally since 1977.
            </span>
            <span style={{"font-size": "smaller", "font-style": "italic"}}>
              Spending measured as the sum of starship cost in credits per film
            </span>
          </div>
          <LineChart
            margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
            grid={{ vertical: true }}
            xAxis={[
              {
                dataKey: "film release year",
                data: Object.keys(spendingData),
                valueFormatter: (value) => value.toString(),
                min: 1977,
                max: 2006,
              },
            ]}
            yAxis={[
              {
                id: "logAxis",
                scaleType: "log",
                zoom: true,
              },
            ]}
            series={[
              {
                data: Object.values(spendingData),
              },
            ]}
            onMarkClick={(event, d) =>
              setShowModalFor(apiData.films.filter((f) => !!f)[d.dataIndex])
            }
            width={600}
            height={400}
          />
          <div className="source">
            <span>Data is provisional and subject to change.</span>
            <span>Source: SWAPI</span>
          </div>
        </>,
      ];
}

export default Spending;
