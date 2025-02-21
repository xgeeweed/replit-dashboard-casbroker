"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PhoneInput } from "@/components/ui/phone-input";
import CardWrapper from "@/app/auth/components/card-wrapper";
import { FormError } from "@/app/auth/components/form-error";
import { FormSucess } from "@/app/auth/components/form-sucesss";

// Step 1: Phone Verification Schema
const PhoneVerificationSchema = z.object({
  phone_number: z.string().min(1, "Phone number is required"),
});

// Step 2: Identity Confirmation Schema
const IdentityConfirmationSchema = z.object({
  japtu_id: z.string(),
  full_name: z.string(),
  dob: z.string(),
  drivers_license_last4: z.string(),
  national_id_last6: z.string(),
});

// Step 3: OTP Verification Schema
const OTPVerificationSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
});

// Step 4: Password Creation Schema
const PasswordCreationSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

// Helper function to format phone number for Twilio
const formatPhoneNumber = (phone: string) => {
  // Remove all non-digit characters
  let cleaned = phone.replace(/\D/g, '');
  
  // If number starts with 0, remove it
  if (cleaned.startsWith('0')) {
    cleaned = cleaned.substring(1);
  }
  
  // If number starts with 233, remove it
  if (cleaned.startsWith('233')) {
    cleaned = cleaned.substring(3);
  }
  
  // Ensure the number has 9 digits (Ghana numbers)
  if (cleaned.length !== 9) {
    console.warn('Invalid phone number length:', cleaned.length);
  }
  
  // Add +233 prefix
  return `+233${cleaned}`;
};

const DriverSignupForm = () => {
  const [step, setStep] = useState(1);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [driverData, setDriverData] = useState<any>(null);
  const router = useRouter();

  // Phone Verification Form
  const phoneForm = useForm<z.infer<typeof PhoneVerificationSchema>>({
    resolver: zodResolver(PhoneVerificationSchema),
    defaultValues: {
      phone_number: "",
    },
  });

  // Identity Confirmation Form (read-only)
  const identityForm = useForm<z.infer<typeof IdentityConfirmationSchema>>({
    resolver: zodResolver(IdentityConfirmationSchema),
  });

  // OTP Verification Form
  const otpForm = useForm<z.infer<typeof OTPVerificationSchema>>({
    resolver: zodResolver(OTPVerificationSchema),
    defaultValues: {
      otp: "",
    },
  });

  // Password Creation Form
  const passwordForm = useForm<z.infer<typeof PasswordCreationSchema>>({
    resolver: zodResolver(PasswordCreationSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  // Handle phone verification
  const onPhoneSubmit = async (values: z.infer<typeof PhoneVerificationSchema>) => {
    setError("");
    setSuccess("");

    try {
      const formattedPhone = formatPhoneNumber(values.phone_number);
      console.log('Submitting phone number:', formattedPhone); // Debug log

      const response = await fetch("/api/driver/verify-phone", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          phone_number: formattedPhone,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error('API error response:', errorData);
        throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('API response:', data); // Debug log

      if (!data.success) {
        setError(data.message || "Verification failed");
        return;
      }

      if (!data.exists) {
        setError("No driver found with this phone number");
        return;
      }

      setDriverData(data.driver);
      identityForm.reset(data.driver);
      setStep(2);
    } catch (error) {
      console.error('Error during phone verification:', error);
      setError(error instanceof Error ? error.message : "Something went wrong");
    }
  };

  // Handle identity confirmation
  const onIdentityConfirm = async () => {
    setError("");
    setSuccess("");

    try {
      const formattedPhone = formatPhoneNumber(phoneForm.getValues("phone_number"));
      console.log('Confirming identity with:', {
        japtu_id: driverData.japtu_id,
        phone_number: formattedPhone
      });

      const response = await fetch("/api/driver/confirm-identity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          japtu_id: driverData.japtu_id,
          phone_number: formattedPhone,
        }),
      });

      const data = await response.json();
      console.log('Identity confirmation response:', data);

      if (!data.success) {
        setError(data.message || "Failed to confirm identity");
        return;
      }

      setSuccess("OTP sent to your phone");
      setStep(3);
    } catch (error) {
      console.error('Error during identity confirmation:', error);
      setError("Something went wrong");
    }
  };

  // Handle OTP verification
  const onOTPSubmit = async (values: z.infer<typeof OTPVerificationSchema>) => {
    setError("");
    setSuccess("");

    try {
      const formattedPhone = formatPhoneNumber(phoneForm.getValues("phone_number"));
      console.log('Submitting OTP verification with phone:', formattedPhone); // Debug log

      const response = await fetch("/api/driver/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone_number: formattedPhone,
          otp: values.otp,
        }),
      });

      const data = await response.json();
      console.log('OTP verification response:', data); // Debug log

      if (!data.success) {
        setError(data.message);
        return;
      }

      setStep(4);
    } catch (error) {
      console.error('Error during OTP verification:', error); // Debug log
      setError("Something went wrong");
    }
  };

  // Handle password creation and complete signup
  const onPasswordSubmit = async (values: z.infer<typeof PasswordCreationSchema>) => {
    setError("");
    setSuccess("");

    try {
      const formattedPhone = formatPhoneNumber(phoneForm.getValues("phone_number"));
      console.log('Completing signup with:', {
        japtu_id: driverData.japtu_id,
        phone_number: formattedPhone
      });

      const response = await fetch("/api/driver/complete-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          japtu_id: driverData.japtu_id,
          phone_number: formattedPhone,
          password: values.password,
        }),
      });

      const data = await response.json();
      console.log('Complete signup response:', data);

      if (!data.success) {
        setError(data.message);
        return;
      }

      setSuccess("Signup successful! Redirecting to driver dashboard...");
      setTimeout(() => {
        router.push("/dashboard/driver-dashboard");
      }, 2000);
    } catch (error) {
      console.error('Error completing signup:', error);
      setError("Something went wrong");
    }
  };

  return (
    <CardWrapper
      headerLabel={
        step === 1 ? "Verify Phone Number" :
        step === 2 ? "Confirm Identity" :
        step === 3 ? "Enter OTP" :
        "Create Password"
      }
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
      showSocial={false}
    >
      {step === 1 && (
        <Form {...phoneForm}>
          <form onSubmit={phoneForm.handleSubmit(onPhoneSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={phoneForm.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <PhoneInput
                        {...field}
                        disabled={isPending}
                        defaultCountry="GH"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <FormSucess message={success} />
            <Button disabled={isPending} type="submit" className="w-full">
              Verify Phone Number
            </Button>
          </form>
        </Form>
      )}

      {step === 2 && driverData && (
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">Please confirm your identity:</h3>
              <div className="text-sm space-y-2">
                <p>Full Name: {driverData.full_name}</p>
                <p>JAPTU ID: {driverData.japtu_id}</p>
                <p>Date of Birth: {new Date(driverData.dob).toLocaleDateString()}</p>
                <p>Driver's License: ****{driverData.drivers_license_last4}</p>
                <p>National ID: ******{driverData.national_id_last6}</p>
              </div>
            </div>
          </div>
          <FormError message={error} />
          <FormSucess message={success} />
          <Button
            onClick={onIdentityConfirm}
            disabled={isPending}
            className="w-full"
          >
            Confirm Identity & Send OTP
          </Button>
        </div>
      )}

      {step === 3 && (
        <Form {...otpForm}>
          <form onSubmit={otpForm.handleSubmit(onOTPSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={otpForm.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter OTP</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Enter 6-digit OTP"
                        maxLength={6}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <FormSucess message={success} />
            <Button disabled={isPending} type="submit" className="w-full">
              Verify OTP
            </Button>
          </form>
        </Form>
      )}

      {step === 4 && (
        <Form {...passwordForm}>
          <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={passwordForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        type="password"
                        placeholder="******"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={passwordForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        type="password"
                        placeholder="******"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <FormSucess message={success} />
            <Button disabled={isPending} type="submit" className="w-full">
              Complete Signup
            </Button>
          </form>
        </Form>
      )}
    </CardWrapper>
  );
};

export default DriverSignupForm; 