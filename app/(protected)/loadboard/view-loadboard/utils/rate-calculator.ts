
export const calculateDisplayRate = (originalRate: number, isDriver: boolean = false) => {
  if (isDriver) {
    return originalRate * 0.9; // 10% deduction for drivers
  }
  return originalRate;
};
