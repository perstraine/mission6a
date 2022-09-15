const sortNameAsc = (list) => {
  if (list.length < 2) return list;
  let pivot = list[0];
  let left = [];
  let right = [];
  for (let i = 1, total = list.length; i < total; i++) {
    if (list[i].name < pivot.name) left.push(list[i]);
    else right.push(list[i]);
  }
  return [...sortNameAsc(left), pivot, ...sortNameAsc(right)];
};

const sortNameDesc = (list) => {
  if (list.length < 2) return list;
  let pivot = list[0];
  let left = [];
  let right = [];
  for (let i = 1, total = list.length; i < total; i++) {
    if (list[i].name > pivot.name) left.push(list[i]);
    else right.push(list[i]);
  }
  return [...sortNameDesc(left), pivot, ...sortNameDesc(right)];
};

const sortQuantAsc = (list) => {
  if (list.length < 2) return list;
  let pivot = list[0];
  let left = [];
  let right = [];
  for (let i = 1, total = list.length; i < total; i++) {
    if (list[i].quantity < pivot.quantity) left.push(list[i]);
    else right.push(list[i]);
  }
  return [...sortQuantAsc(left), pivot, ...sortQuantAsc(right)];
};

const sortQuantDesc = (list) => {
  if (list.length < 2) return list;
  let pivot = list[0];
  let left = [];
  let right = [];
  for (let i = 1, total = list.length; i < total; i++) {
    if (list[i].quantity > pivot.quantity) left.push(list[i]);
    else right.push(list[i]);
  }
  return [...sortQuantDesc(left), pivot, ...sortQuantDesc(right)];
};

module.exports = { sortNameAsc, sortNameDesc, sortQuantAsc, sortQuantDesc };

// module.exports = { sortNameAsc, quickSort };
