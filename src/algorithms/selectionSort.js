export function selectionSort(input) {
  const a = [...input];
  const steps = [];
  const n = a.length;
  for (let i = 0; i < n; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      steps.push({ type: "compare", indices: [minIdx, j] });
      if (a[j] < a[minIdx]) minIdx = j;
    }
    if (minIdx !== i) {
      [a[i], a[minIdx]] = [a[minIdx], a[i]];
      steps.push({ type: "swap", indices: [i, minIdx], array: a.slice() });
    }
  }
  return steps;
}
