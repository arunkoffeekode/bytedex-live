export function sortArrayByKey(arr, key, asc) {
  if (arr) {
    const sorted = arr.sort((a, b) => {
      if (a[key] < b[key]) {
        return asc ? 1 : -1;
      }
      if (a[key] > b[key]) {
        return asc ? -1 : 1;
      }
      return 0;
    });

    return sorted;
  } else {
    return [];
  }
}
