const sortProductsByPrice = (products = [], options = {}) => {
  let lowest = [null];
  let highest = [null];
  const { size = 5 } = options;

  if (products.modified) {
    const sorted = [...products].sort((a, b) => {
      return a.price - b.price;
    });
    
    if (products.length >= size) {
      highest = sorted.splice(-size);
      if (sorted.length > 0) {
        lowest = sorted.splice(0, size);
      }
    }
  }

  return {
    lowest,
    highest,
  }
}

const observer = {
  set: (t) => {
    t.modified = true;
    return true
  }
};

module.exports = {
  observer,
  sortProductsByPrice,
};
