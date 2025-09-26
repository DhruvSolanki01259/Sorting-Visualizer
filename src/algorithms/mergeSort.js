export function mergeSort(input) {
  const a = [...input];
  const steps = [];

  function merge(l, m, r) {
    let left = a.slice(l, m + 1);
    let right = a.slice(m + 1, r + 1);
    let i = 0,
      j = 0,
      k = l;
    while (i < left.length && j < right.length) {
      steps.push({ type: "compare", indices: [l + i, m + 1 + j] });
      if (left[i] <= right[j]) {
        a[k++] = left[i++];
      } else {
        a[k++] = right[j++];
      }
      steps.push({ type: "overwrite", indices: [k - 1], array: a.slice() });
    }
    while (i < left.length) {
      a[k++] = left[i++];
      steps.push({ type: "overwrite", indices: [k - 1], array: a.slice() });
    }
    while (j < right.length) {
      a[k++] = right[j++];
      steps.push({ type: "overwrite", indices: [k - 1], array: a.slice() });
    }
  }

  function mergeHelper(l, r) {
    if (l >= r) return;
    const m = Math.floor((l + r) / 2);
    mergeHelper(l, m);
    mergeHelper(m + 1, r);
    merge(l, m, r);
  }

  mergeHelper(0, a.length - 1);
  return steps;
}
