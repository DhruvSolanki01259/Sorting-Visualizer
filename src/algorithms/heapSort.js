export function heapSort(input) {
  const a = [...input];
  const steps = [];
  const n = a.length;

  function heapify(n, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    if (left < n) {
      steps.push({ type: "compare", indices: [left, largest] });
      if (a[left] > a[largest]) largest = left;
    }
    if (right < n) {
      steps.push({ type: "compare", indices: [right, largest] });
      if (a[right] > a[largest]) largest = right;
    }
    if (largest !== i) {
      [a[i], a[largest]] = [a[largest], a[i]];
      steps.push({ type: "swap", indices: [i, largest], array: a.slice() });
      heapify(n, largest);
    }
  }

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(n, i);
  for (let i = n - 1; i > 0; i--) {
    [a[0], a[i]] = [a[i], a[0]];
    steps.push({ type: "swap", indices: [0, i], array: a.slice() });
    heapify(i, 0);
  }
  return steps;
}
