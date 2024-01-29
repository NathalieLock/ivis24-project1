import * as d3 from "d3";
import { AxisLeft } from "./AxisLeft";
import { AxisBottom } from "./AxisBottom";
import { useState } from "react";
import { Tooltip } from "./Tooltip";
import Legend from "./Legend";

const MARGIN = { top: 160, right: 160, bottom: 60, left: 60 };

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

  const [hovered, setHovered] = useState(null);

  // Scales
  const yScale = d3.scaleLinear().domain([0, 10]).range([boundsHeight, 0]);
  const xScale = d3.scaleLinear().domain([0, 10]).range([0, boundsWidth]);

  // Color scale based on groups
  const colorScale = d3
    .scaleOrdinal()
    .domain(groups)
    .range(["#e0ac2b", "#e85252", "#6689c6", "#9a6fb0", "#01A368"]);

  // Build the shapes
  const allShapes = data.map((d, i) => {
    return (
      <circle
        key={i}
        r={8}
        cx={xScale(d.programming)}
        cy={yScale(d.statistics)}
        stroke={colorScale(d.major)}
        fill={colorScale(d.major)}
        fillOpacity={0.7}
        onMouseEnter={() =>
          setHovered({
            xPos: xScale(d.programming),
            yPos: yScale(d.statistics),
            name: d.alias,
            group: d.major,
            hobbies: d.hobbies,
          })
        }
        onMouseLeave={() => setHovered(null)}
      />
    );
  });

  return (
    <div style={{ position: "relative" }}>
      <svg width={width} height={height}>
        <g
          width={boundsWidth}
          height={boundsHeight}
          transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
        >
          {/* Y axis */}
          <AxisLeft yScale={yScale} pixelsPerTick={40} width={boundsWidth} />

          {/* Y-axis label */}
          <text
            transform={`translate(-40,${boundsHeight / 2})rotate(-90)`}
            textAnchor="middle"
            fontSize="14"
            fill="white"
          >
            Statistical skills
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
              transform={`translate(${boundsWidth / 2},40)`}
              textAnchor="middle"
              fontSize="14"
              fill="white"
            >
              Programming skills
            </text>
          </g>

          {/* Circles */}
          {allShapes}

          {/* Legend */}
          <Legend
            colorScale={colorScale}
            groups={groups}
            marginLeft={boundsWidth + 30}
            marginTop={-MARGIN.top + 160}
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
      {/* Sidebar Section */}
      <div className="max-w-[500px] bg-blue text-white">
        <h3 className="text-2xl">Additional information</h3>
        {hovered && (
          <>
            <div>
              <strong>Name:</strong> {hovered.name}
            </div>
            <div>
              <strong>Hobbies:</strong> {hovered.hobbies}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
