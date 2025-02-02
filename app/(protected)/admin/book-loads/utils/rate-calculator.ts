export const calculateDiscountedRate = (originalRate: number): number => {
  // Apply a 10% discount for admin book loads
  return originalRate * 0.9;
};
