import React from "react";
import "./../index.css";

export default function SortingVisualizer({ array, highlight, darkMode }) {
  const barWidth = 20; // fixed width per bar

  return (
    <div
      style={{
        width: "100%",
        overflowX: array.length > 60 ? "auto" : "hidden", // show scrollbar only if array > 60
        padding: "16px",
        boxSizing: "border-box",
        background: darkMode ? "#0f172a" : "#f3f4f6",
        border: "none",
      }}>
      <div
        className={`visualizer-container ${darkMode ? "dark" : ""}`}
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: "2px",
          minWidth: array.length * (barWidth + 2), // container width grows with bars
          height: "500px",
        }}>
        {array.map((val, idx) => {
          let cls = "bar";
          if (highlight && highlight.indices.includes(idx)) {
            if (highlight.type === "compare") cls += " bar-compare";
            else if (
              highlight.type === "swap" ||
              highlight.type === "overwrite"
            )
              cls += " bar-swap";
          }

          return (
            <div
              key={idx}
              className='bar-wrapper'
              style={{ width: barWidth }}>
              <div
                className={cls}
                style={{
                  height: `${val}px`,
                  width: `${barWidth}px`,
                }}>
                <span className='bar-value'>{val}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
