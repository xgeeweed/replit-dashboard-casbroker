
export const calculateRateWithRole = (rate: number, userRole: string | null = null) => {
  if (userRole === "DRIVER") {
    return rate * 0.9; // 10% deduction for drivers
  }
  return rate;
};
