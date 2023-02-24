import { useState } from "react";
import useWindowSize from "../hooks/useWindowSize";
import "../styles/Display.css";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  Cell,
} from "recharts";

export default function Display(props) {
  const [windowHeight, windowWidth] = useWindowSize(); // height and width of viewport
  const [buttonValue, setButtonValue] = useState("default");
  // color pallette for graph colors
  const colors = [
    "red",
    "green",
    "blue",
    "orange",
    "yellow",
    "pink",
    "black",
    "gray",
    "purple",
    "brown",
  ];

  // create dataset for data visualization
  const dataSet = [];
  const createDataset = () => {
    // iterate through different parameters
    props.data?.map((d) => {
      d.coordinates[0].dates.map((date) => {
        const dataObj = {};
        dataObj["Parameter"] = d.parameter;
        dataObj["Latitude"] = d.coordinates[0].lat;
        dataObj["Longitude"] = d.coordinates[0].lon;
        // iterate through each date and get value+date
        dataObj["Date"] = date.date.slice(0, 10);
        dataObj[d.parameter] = date.value;
        dataSet.push(dataObj);
      });
    });
  };
  createDataset();

  // function for Bar Graph taken from Recharts.org example
  // Creating unique triangular shapes
  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
      x + width
    }, ${y + height}
    Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  console.log(dataSet);
  console.log(props.type);
  console.log("BV");
  console.log(buttonValue);
  console.log(...dataSet.filter((f) => f.Parameter === buttonValue));

  return (
    <div className="displayContainer">
      <h2>
        Selected Date Range: {props.date.replaceAll("-", "/")}
        {""}
        {props.endDate.length ? " - " + props.endDate.replaceAll("-", "/") : ""}
      </h2>
      <h3>Selected Time: {props.time.slice(1, 6)}</h3>
      <h3>Selected Parameters: {props.type.map((t) => t.label).join(", ")}</h3>
      <div className="buttonContainer">
        {props.type.map((t) => (
          <button
            className="toggleLabel button"
            onClick={() => setButtonValue(t.value)}
            value={t.value}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="lineChartContainer graph">
        <h3>Line Chart Display</h3>
        <LineChart
          width={
            windowWidth < 450 ? windowWidth - 50 : windowWidth - windowWidth / 4
          }
          height={windowHeight / 2}
          data={dataSet}
        >
          <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
          <XAxis dataKey="Date" />
          <YAxis />
          <Tooltip />
          <Legend />
          {props.type.map((t) => (
            <Line
              type="monotone"
              dataKey={t.value}
              name={t.label}
              stroke={colors[Math.floor(Math.random() * colors.length)]}
            />
          ))}
        </LineChart>
      </div>
      {buttonValue === "default" ? (
        <p>Try Selecting One of the Parameter Buttons to display more Data</p>
      ) : (
        <div className="barGraphContainer graph">
          <h3>Bar Chart Display</h3>
          <BarChart
            width={
              windowWidth < 450
                ? windowWidth - 50
                : windowWidth - windowWidth / 4
            }
            height={windowHeight / 2}
            data={[...dataSet.filter((f) => f.Parameter === buttonValue)]}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Date" />
            <YAxis />
            {/* <Bar dataKey={buttonValue} fill="#8884d8" /> */}
            <Bar
              dataKey={buttonValue}
              fill="#8884d8"
              shape={<TriangleBar />}
              label={{ position: "top" }}
            >
              {[...dataSet.filter((f) => f.Parameter === buttonValue)].map(
                (entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                )
              )}
            </Bar>
          </BarChart>
        </div>
      )}
    </div>
  );
}
