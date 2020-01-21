const { sortProductsByPrice, observer } = require('./sortProductsByPrice');

const lowest = [
  {id: 8, price: 0},
  {id: 3, price: 1},
  {id: 5, price: 1},
  {id: 4, price: 3},
  {id: 7, price: 3},
];
const highest = [
  {id: 6, price: 8},
  {id: 11, price: 9},
  {id: 1, price: 10},
  {id: 2, price: 11},
  {id: 12, price: 13},
];

describe('sortProductsByPrice', () => {
  var products = new Proxy([
    {id: 1, price: 10}, {id: 2, price: 11}, {id: 3, price: 1}, {id: 4,
    price: 3}, {id: 5, price: 1}, {id: 6, price: 8},
    {id: 7, price: 3}, {id: 8, price: 0}, {id: 9, price: 4}, {id: 10,
    price: 5}, {id: 11, price: 9}, {id: 12, price: 13},
  ], observer);
  beforeEach(() => {
    products = new Proxy([
      {id: 1, price: 10}, {id: 2, price: 11}, {id: 3, price: 1}, {id: 4,
      price: 3}, {id: 5, price: 1}, {id: 6, price: 8},
      {id: 7, price: 3}, {id: 8, price: 0}, {id: 9, price: 4}, {id: 10,
      price: 5}, {id: 11, price: 9}, {id: 12, price: 13},
    ], observer);
  })
  test('Should return null if the array has not been modified beforehand', () => {
    const sorted = sortProductsByPrice(products);
    expect(sorted.lowest).toEqual([null]);
    expect(sorted.highest).toEqual([null]);
  });
  test('Should return the 5 lowest prices products', () => {
    products[0] = { id: 1, price: 10 };
    const sorted = sortProductsByPrice(products);
    expect(sorted.lowest).toEqual(lowest);
  });
  test('Should return the 5 highest prices products', () => {
    products[0] = { id: 1, price: 10 };
    const sorted = sortProductsByPrice(products);
    expect(sorted.highest).toEqual(highest);
  });
  test('Should return null if size > amount of products', () => {
    products.push({ id: 13, price: 14 });
    const sorted = sortProductsByPrice(products, { size: 500 });
    expect(sorted.lowest).toEqual([null]);
    expect(sorted.highest).toEqual([null]);
  });
  test('Should return null for lowest since there aren\'t enough products in the array', () => {
    products[0] = { id: 1, price: 10 };
    const sorted = sortProductsByPrice(products, { size: 15 });
    expect(sorted.lowest).toEqual([null]);
  });
  test('Should return the 10 highest prices products and the 3 lowest when only 12 products are given and size is 10', () => {
    products.push({ id: 13, price: 13 });
    const sorted = sortProductsByPrice(products, { size: 10 });
    expect(sorted.highest.length).toEqual(10);
    expect(sorted.lowest.length).toEqual(2);
  });
});
