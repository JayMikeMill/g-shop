// shared/utils/PriceUtils.ts

// -------------------------
// price utility functions
// -------------------------

export const toMajorUnit = (minorUnits: number) => {
  return minorUnits / 100;
};

export const toMinorUnit = (majorUnits: number) => {
  return Math.round(majorUnits * 100);
};
