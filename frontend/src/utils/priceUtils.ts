// -------------------------
// Product utility functions
// -------------------------

export const priceToFloat = (cents: number) => {
  return cents / 100;
};

export const floatToPrice = (price: number) => {
  return Math.round(price * 100);
};
