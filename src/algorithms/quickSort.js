export function quickSort(input) {
  const a = [...input];
  const steps = [];

  function partition(l, r) {
    const pivot = a[r];
    let i = l;
    for (let j = l; j < r; j++) {
      steps.push({ type: "compare", indices: [j, r] });
      if (a[j] < pivot) {
        [a[i], a[j]] = [a[j], a[i]];
        steps.push({ type: "swap", indices: [i, j], array: a.slice() });
        i++;
      }
    }
    [a[i], a[r]] = [a[r], a[i]];
    steps.push({ type: "swap", indices: [i, r], array: a.slice() });
    return i;
  }

  function quick(l, r) {
    if (l >= r) return;
    const p = partition(l, r);
    quick(l, p - 1);
    quick(p + 1, r);
  }

  quick(0, a.length - 1);
  return steps;
}
