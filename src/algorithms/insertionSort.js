export function insertionSort(input) {
  const a = [...input];
  const steps = [];
  const n = a.length;
  for (let i = 1; i < n; i++) {
    let key = a[i];
    let j = i - 1;
    while (j >= 0 && a[j] > key) {
      steps.push({ type: "compare", indices: [j, j + 1] });
      a[j + 1] = a[j];
      steps.push({ type: "overwrite", indices: [j + 1], array: a.slice() });
      j--;
    }
    a[j + 1] = key;
    steps.push({ type: "overwrite", indices: [j + 1], array: a.slice() });
  }
  return steps;
}
