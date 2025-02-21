"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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

// Login Schema
const AgentLoginSchema = z.object({
  mobile_number: z.string().min(1, "Mobile number is required"),
});

const AgentLoginOTPSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
});

type LoginFormValues = z.infer<typeof AgentLoginSchema>;
type OTPFormValues = z.infer<typeof AgentLoginOTPSchema>;

const AgentLoginForm = () => {
  const router = useRouter();
  const [showOTP, setShowOTP] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [loginData, setLoginData] = useState<LoginFormValues | null>(null);

  // Login Form
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(AgentLoginSchema),
    defaultValues: {
      mobile_number: "",
    },
  });

  // OTP Form
  const otpForm = useForm<OTPFormValues>({
    resolver: zodResolver(AgentLoginOTPSchema),
    defaultValues: {
      otp: "",
    },
  });

  // Handle login request
  const onLoginSubmit = async (values: LoginFormValues) => {
    setError("");
    setSuccess("");

    try {
      // Call API to send OTP
      const response = await fetch("/api/auth/agent/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.error);
        return;
      }

      setLoginData(values);
      setSuccess("OTP sent to your mobile number");
      setShowOTP(true);
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
  };

  // Handle OTP verification
  const onOTPSubmit = async (values: OTPFormValues) => {
    setError("");
    setSuccess("");

    try {
      // Call API to verify OTP and login
      const response = await fetch("/api/auth/agent/verify-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          mobile_number: loginData?.mobile_number,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.error);
        return;
      }

      setSuccess("Login successful! Redirecting...");
      router.push("/dashboard/agent-dashboard");
    } catch (error) {
      setError("Failed to verify OTP. Please try again.");
    }
  };

  return (
    <CardWrapper
      headerLabel="Agent Login"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial={false}
    >
      {!showOTP ? (
        <Form {...loginForm}>
          <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={loginForm.control}
                name="mobile_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile Number</FormLabel>
                    <FormControl>
                      <PhoneInput {...field} disabled={isPending} defaultCountry="GH" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <FormSucess message={success} />
            <Button disabled={isPending} type="submit" className="w-full">
              Send OTP
            </Button>
          </form>
        </Form>
      ) : (
        <Form {...otpForm}>
          <form onSubmit={otpForm.handleSubmit(onOTPSubmit)} className="space-y-6">
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">
                Please enter the 6-digit code sent to your mobile number
              </div>
              <FormField
                control={otpForm.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="000000"
                        maxLength={6}
                        className="text-center text-xl tracking-[1em] font-mono"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <FormSucess message={success} />
            <div className="space-y-4">
              <Button disabled={isPending} type="submit" className="w-full">
                Verify OTP
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowOTP(false);
                  setError("");
                  setSuccess("");
                  otpForm.reset();
                }}
                className="w-full"
              >
                Back to Login
              </Button>
            </div>
          </form>
        </Form>
      )}
    </CardWrapper>
  );
};

export default AgentLoginForm; 