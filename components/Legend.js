import React from "react";

const Legend = ({ colorScale, groups, marginLeft, marginTop }) => {
  const circleRadius = 7;

  const legendItems = groups.map((group, index) => (
    <g key={group} transform={`translate(0, ${index * 20})`}>
      <circle
        cx={circleRadius}
        cy={circleRadius}
        r={circleRadius}
        fill={colorScale(group)}
        stroke={colorScale(group)}
        strokeWidth={2}
      />
      <text
        x={2 * circleRadius + 5}
        y={circleRadius + 5}
        fill="white"
        style={{ fontSize: "12px" }}
      >
        {group}
      </text>
    </g>
  ));

  return (
    <g transform={`translate(${marginLeft},${marginTop})`}>{legendItems}</g>
  );
};

export default Legend;
