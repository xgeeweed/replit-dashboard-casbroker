import { toast } from "sonner";

// Basic Error Toast
export const basicErrorToast = () =>
  toast.error("Uh oh! Something went wrong.", {
    description: "Kindly try again or refresh.",
  });
