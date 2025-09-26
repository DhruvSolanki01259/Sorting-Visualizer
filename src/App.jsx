import React, { useEffect, useRef, useState } from "react";
import SortingVisualizer from "./components/SortingVisualizer";
import Controls from "./components/Controls";
import { bubbleSort } from "./algorithms/bubbleSort";
import { selectionSort } from "./algorithms/selectionSort";
import { insertionSort } from "./algorithms/insertionSort";
import { mergeSort } from "./algorithms/mergeSort";
import { quickSort } from "./algorithms/quickSort";
import { heapSort } from "./algorithms/heapSort";

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

function App() {
  const [array, setArray] = useState([]);
  const [size, setSize] = useState(40);
  const [speed, setSpeed] = useState(50);
  const [algorithm, setAlgorithm] = useState("bubble");

  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [highlight, setHighlight] = useState({ type: null, indices: [] });

  const [darkMode, setDarkMode] = useState(true); // Dark mode default

  const stepsRef = useRef([]);
  const stopRef = useRef(false);
  const pauseRef = useRef(false);

  useEffect(() => {
    generateArray(size);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    generateArray(size);
    // eslint-disable-next-line
  }, [size]);

  function generateArray(sz = size) {
    stopRef.current = true;
    pauseRef.current = false;
    setIsRunning(false);
    setIsPaused(false);
    const newArr = Array.from(
      { length: sz },
      () => Math.floor(Math.random() * 400) + 20
    );
    setArray(newArr);
    setHighlight({ type: null, indices: [] });
  }

  function handleCustomArray(customArr) {
    stopRef.current = true;
    pauseRef.current = false;
    setIsRunning(false);
    setIsPaused(false);
    setArray(customArr);
    setHighlight({ type: null, indices: [] });
  }

  function toggleTheme() {
    setDarkMode((prev) => !prev);
  }

  function getStepsForAlgorithm(algo, arr) {
    switch (algo) {
      case "bubble":
        return bubbleSort(arr);
      case "selection":
        return selectionSort(arr);
      case "insertion":
        return insertionSort(arr);
      case "merge":
        return mergeSort(arr);
      case "quick":
        return quickSort(arr);
      case "heap":
        return heapSort(arr);
      default:
        return bubbleSort(arr);
    }
  }

  async function playSteps(steps) {
    setIsRunning(true);
    stopRef.current = false;
    pauseRef.current = false;

    for (let i = 0; i < steps.length; i++) {
      if (stopRef.current) break;
      while (pauseRef.current) {
        await sleep(50);
        if (stopRef.current) break;
      }
      const step = steps[i];
      if (!step) continue;
      if (step.type === "compare") {
        setHighlight({ type: "compare", indices: step.indices });
      } else if (step.type === "swap" || step.type === "overwrite") {
        setArray(step.array);
        setHighlight({ type: step.type, indices: step.indices });
      }
      await sleep(speed);
    }

    if (!stopRef.current) {
      setHighlight({ type: "done", indices: [] });
    }
    setIsRunning(false);
    setIsPaused(false);
  }

  function handleSort() {
    if (isRunning) return;
    const steps = getStepsForAlgorithm(algorithm, array);
    stepsRef.current = steps;
    playSteps(steps);
  }

  function handlePauseResume() {
    if (!isRunning) return;
    pauseRef.current = !pauseRef.current;
    setIsPaused(pauseRef.current);
  }

  function handleStop() {
    if (!isRunning) return;
    stopRef.current = true;
    pauseRef.current = false;
    setIsRunning(false);
    setIsPaused(false);
    setHighlight({ type: null, indices: [] });
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: darkMode ? "#0f172a" : "#f3f4f6",
        color: darkMode ? "#f9fafb" : "#1f2937",
        transition: "all 0.3s ease",
        display: "flex",
        flexDirection: "column",
      }}>
      {/* Header */}
      <header
        style={{
          padding: "16px",
          fontSize: "1.8rem",
          fontWeight: "600",
          textAlign: "center",
          background: darkMode ? "#1e293b" : "#e2e8f0",
        }}>
        Sorting Visualizer
      </header>

      {/* Controls */}
      <div style={{ padding: "16px" }}>
        <Controls
          size={size}
          setSize={setSize}
          speed={speed}
          setSpeed={setSpeed}
          algorithm={algorithm}
          setAlgorithm={setAlgorithm}
          onGenerate={() => generateArray(size)}
          onSort={handleSort}
          onPauseResume={handlePauseResume}
          onStop={handleStop}
          isRunning={isRunning}
          isPaused={isPaused}
          onCustomArray={handleCustomArray}
          darkMode={darkMode}
          toggleTheme={toggleTheme}
        />
      </div>

      {/* Visualizer */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "16px",
        }}>
        <SortingVisualizer
          array={array}
          highlight={highlight}
          darkMode={darkMode}
        />
      </div>

      {/* Status */}
      <footer
        style={{
          padding: "12px",
          textAlign: "center",
          fontSize: "0.9rem",
          background: darkMode ? "#1e293b" : "#e5e7eb",
        }}>
        Algorithm: {algorithm} —{" "}
        {isRunning ? (isPaused ? "Paused" : "Running") : "Idle"}
      </footer>
    </div>
  );
}

export default App;
