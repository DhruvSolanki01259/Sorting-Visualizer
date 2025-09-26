import React from "react";

export default function Controls({
  size,
  setSize,
  speed,
  setSpeed,
  algorithm,
  setAlgorithm,
  onGenerate,
  onSort,
  onPauseResume,
  onStop,
  isRunning,
  isPaused,
  onCustomArray,
  darkMode,
  toggleTheme,
}) {
  const [customInput, setCustomInput] = React.useState("");

  function handleCustomArray() {
    const numbers = customInput
      .split(",")
      .map((num) => parseInt(num.trim(), 10))
      .filter((num) => !isNaN(num));
    if (numbers.length > 0) onCustomArray(numbers);
  }

  const buttonStyle = {
    padding: "8px 14px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontWeight: "500",
    transition: "0.2s",
    minWidth: "110px",
  };

  const sliderStyle = {
    width: "120px",
    cursor: "pointer",
    accentColor: darkMode ? "#3b82f6" : "#2563eb",
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "12px",
        alignItems: "center",
        justifyContent: "center",
        padding: "12px",
        background: darkMode ? "#1e293b" : "#e2e8f0",
        borderRadius: "10px",
      }}>
      {/* Generate & Sort Buttons */}
      <button
        onClick={onGenerate}
        disabled={isRunning}
        style={{
          ...buttonStyle,
          background: darkMode ? "#3b82f6" : "#2563eb",
          color: "#fff",
        }}>
        Generate New Array
      </button>

      <button
        onClick={onSort}
        disabled={isRunning}
        style={{
          ...buttonStyle,
          background: darkMode ? "#10b981" : "#059669",
          color: "#fff",
        }}>
        Sort
      </button>

      <button
        onClick={onPauseResume}
        disabled={!isRunning}
        style={{
          ...buttonStyle,
          background: darkMode ? "#facc15" : "#eab308",
          color: "#000",
        }}>
        {isPaused ? "Resume" : "Pause"}
      </button>

      <button
        onClick={onStop}
        disabled={!isRunning}
        style={{
          ...buttonStyle,
          background: darkMode ? "#ef4444" : "#dc2626",
          color: "#fff",
        }}>
        Stop
      </button>

      {/* Algorithm Selector */}
      <label
        style={{ display: "flex", flexDirection: "column", minWidth: "140px" }}>
        Algorithm:
        <select
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
          disabled={isRunning}
          style={{
            padding: "6px",
            borderRadius: "6px",
            border: "1px solid #94a3b8",
            background: darkMode ? "#0f172a" : "#fff",
            color: darkMode ? "#f9fafb" : "#000",
          }}>
          <option value='bubble'>Bubble Sort</option>
          <option value='selection'>Selection Sort</option>
          <option value='insertion'>Insertion Sort</option>
          <option value='merge'>Merge Sort</option>
          <option value='quick'>Quick Sort</option>
          <option value='heap'>Heap Sort</option>
        </select>
      </label>

      {/* Size Slider */}
      <label
        style={{ display: "flex", flexDirection: "column", minWidth: "120px" }}>
        Size: {size}
        <input
          type='range'
          min='5'
          max='100'
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
          disabled={isRunning}
          style={sliderStyle}
        />
      </label>

      {/* Speed Slider */}
      <label
        style={{ display: "flex", flexDirection: "column", minWidth: "140px" }}>
        Speed (ms): {speed}
        <input
          type='range'
          min='5'
          max='500'
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          style={sliderStyle}
        />
      </label>

      {/* Custom Array Input */}
      <div
        style={{
          display: "flex",
          gap: "6px",
          flexWrap: "wrap",
          alignItems: "center",
        }}>
        <input
          type='text'
          placeholder='Enter numbers e.g. 5,2,9'
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          disabled={isRunning}
          style={{
            padding: "6px 10px",
            borderRadius: "6px",
            border: "1px solid #94a3b8",
            minWidth: "150px",
            background: darkMode ? "#0f172a" : "#fff",
            color: darkMode ? "#f9fafb" : "#000",
          }}
        />
        <button
          onClick={handleCustomArray}
          disabled={isRunning}
          style={{
            ...buttonStyle,
            background: darkMode ? "#3b82f6" : "#2563eb",
            color: "#fff",
          }}>
          Set Custom Array
        </button>
      </div>

      {/* Dark/Light Mode */}
      <button
        onClick={toggleTheme}
        style={{
          ...buttonStyle,
          background: darkMode ? "#6366f1" : "#4ade80",
          color: darkMode ? "#fff" : "#000",
        }}>
        {darkMode ? "🌙 Dark" : "☀️ Light"}
      </button>
    </div>
  );
}
