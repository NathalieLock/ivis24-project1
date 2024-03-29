// The Scatterplot code is taken from https://www.react-graph-gallery.com/scatter-plot and then refractored some

import * as d3 from "d3";
import { AxisLeft } from "./AxisLeft";
import { AxisBottom } from "./AxisBottom";
import { useState, useEffect } from "react";
import { Tooltip } from "./Tooltip";
import Legend from "./Legend";

const MARGIN = { top: 30, right: 220, bottom: 250, left: 60 };

export const Scatterplot = ({ width, height, data }) => {
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  // Define the groups based on major
  const groups = [
    "Computer Science",
    "Media Technology",
    "Machine Learning",
    "Human-Computer Interaction",
    "Other",
  ];

  // Color scale based on groups
  const colorScale = d3
    .scaleOrdinal()
    .domain(groups)
    .range(["#e0ac2b", "#e85252", "#6689c6", "#9a6fb0", "#01A368"]);

  const [hovered, setHovered] = useState(null);
  const [xAxisAttribute, setXAxisAttribute] = useState("programming");
  const [yAxisAttribute, setYAxisAttribute] = useState("statistics");
  const [allShapes, setAllShapes] = useState([]);

  // Scales
  const yScale = d3.scaleLinear().domain([0, 10]).range([boundsHeight, 0]);
  const xScale = d3.scaleLinear().domain([0, 10]).range([0, boundsWidth]);

  const updateScales = () => {
    // Update xScale and yScale based on the selected axes
    xScale.domain([0, 10]).range([0, boundsWidth]);
    yScale.domain([0, 10]).range([boundsHeight, 0]);
  };

  // Update scales when axes change
  useEffect(() => {
    updateScales();
  }, [xAxisAttribute, yAxisAttribute]);

  useEffect(() => {
    // Rebuild shapes when data changes
    const updatedShapes = data.map((d, i) => {
      return (
        <circle
          key={i}
          r={8}
          cx={xScale(d[xAxisAttribute])}
          cy={yScale(d[yAxisAttribute])}
          stroke={colorScale(d.major)}
          fill={colorScale(d.major)}
          fillOpacity={0.7}
          onMouseEnter={() =>
            setHovered({
              xPos: xScale(d[xAxisAttribute]),
              yPos: yScale(d[yAxisAttribute]),
              name: d.alias,
              group: d.major,
              hobbies: d.hobbies,
              major: d.major,
            })
          }
          onMouseLeave={() => setHovered(null)}
        />
      );
    });

    // Update the state directly
    setAllShapes(updatedShapes);
  }, [xAxisAttribute, yAxisAttribute, data]);

  return (
    <div>
      <div className="mt-[60px] ml-[180px] text-white">
        <h3 className="text-xl">What skills are you looking for?</h3>
      </div>

      {/* Axis Controls */}
      <div className="flex mt-4 ml-[180px] gap-x-10">
        <label className="mr-4">
          <select
            value={yAxisAttribute}
            onChange={(e) => setYAxisAttribute(e.target.value)}
          >
            <option value="statistics">Statistics</option>
            <option value="programming">Programming</option>
            <option value="ux">UX</option>
          </select>
        </label>
        <label className="mr-4">
          <select
            value={xAxisAttribute}
            onChange={(e) => setXAxisAttribute(e.target.value)}
          >
            <option value="statistics">Statistics</option>
            <option value="programming">Programming</option>
            <option value="ux">UX</option>
          </select>
        </label>
      </div>
      <div className="w-full flex grid-cols-2 gap-x-28 justify-items-center justify-center">
        <div>
          <div style={{ position: "relative" }}>
            <svg width={width} height={height}>
              <g
                width={boundsWidth}
                height={boundsHeight}
                transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
              >
                {/* Y axis */}
                <AxisLeft
                  yScale={yScale}
                  pixelsPerTick={40}
                  width={boundsWidth}
                />

                {/* Y-axis label */}
                <text
                  transform={`translate(-50,${boundsHeight / 2})rotate(-90)`}
                  textAnchor="middle"
                  fontSize="16"
                  fill="white"
                >
                  {yAxisAttribute}
                </text>

                {/* X axis, use an additional translation to appear at the bottom */}
                <g transform={`translate(0, ${boundsHeight})`}>
                  <AxisBottom
                    xScale={xScale}
                    pixelsPerTick={40}
                    height={boundsHeight}
                  />

                  {/* X-axis label */}
                  <text
                    transform={`translate(${boundsWidth / 2},50)`}
                    textAnchor="middle"
                    fontSize="16"
                    fill="white"
                  >
                    {xAxisAttribute}
                  </text>
                </g>

                {/* Circles */}
                {allShapes}

                {/* Legend */}
                <Legend
                  colorScale={colorScale}
                  groups={groups}
                  marginLeft={boundsWidth + 30}
                  marginTop={-MARGIN.top + 40}
                />
              </g>
            </svg>

            {/* Tooltip */}
            <div
              style={{
                width: boundsWidth,
                height: boundsHeight,
                position: "absolute",
                top: 0,
                left: 0,
                pointerEvents: "none",
                marginLeft: MARGIN.left,
                marginTop: MARGIN.top,
              }}
            >
              <Tooltip interactionData={hovered} />
            </div>
          </div>
        </div>
        {/* Sidebar Section */}
        <div className="w-[35%] bg-blue text-black">
          <div className="flex text-white">
            <h3 className="text-xl "> Do they sound interesting?</h3>
            <h1 className="text-s mt-1 ml-2">(Choose a point to find out)</h1>
          </div>

          <div className="w-[500px] h-[400px] bg-slate-100 border border-gray-600 p-4 mt-2">
            <div className="mb-6">
              <strong>Name:</strong> {hovered ? hovered.name : ""}
            </div>
            <div className="mb-6">
              <strong>Major:</strong> {hovered ? hovered.major : ""}
            </div>
            <div>
              <strong>Hobbies & interests:</strong>{" "}
              {hovered ? hovered.hobbies : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
