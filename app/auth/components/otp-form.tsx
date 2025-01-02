"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginOTPSchema } from "@/app/auth/schemas";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CardWrapper from "@/app/auth/components/card-wrapper";
import { FormError } from "@/app/auth/components/form-error";
import { FormSucess } from "@/app/auth/components/form-sucesss";
import { PhoneInput } from "@/components/ui/phone-input";

// Simulated sendOTP function
const sendOTP = (phoneNumber: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 1) {
        console.log(`OTP sent to ${phoneNumber}`);
        resolve();
      } else {
        reject(new Error("Failed to send OTP"));
      }
    }, 1000);
  });
};

// Simulated verifyOTP function
const verifyOTP = (phoneNumber: string, code: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 1) {
        console.log(`OTP verified for ${phoneNumber}`);
        resolve();
      } else {
        reject(new Error("Invalid OTP"));
      }
    }, 1000);
  });
};

const OTPForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [isOTPSent, setIsOTPSent] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked" ? "Email already in use with different Provider!" : "";

  const form = useForm<z.infer<typeof LoginOTPSchema>>({
    resolver: zodResolver(LoginOTPSchema),
    defaultValues: {
      phoneNumber: "",
      code: "",
    },
  });

  const onSendOTP = () => {
    setIsOTPSent(true);
    setError("");
    setSuccess("");
    const phoneNumber = form.getValues("phoneNumber");
    
    startTransition(() => {
      sendOTP(phoneNumber)
        .then(() => {
          setSuccess("OTP sent successfully!");
        })
        .catch((error) => setError(error.message || "Failed to send OTP. Please try again."));
    });
  };

  const onVerifyOTP = (values: z.infer<typeof LoginOTPSchema>) => {
    setError("");
    setSuccess("");
    
    startTransition(() => {
      verifyOTP(values.phoneNumber, values.code)
        .then(() => {
          router.push("/dashboard");
        })
        .catch((error) => setError(error.message || "Invalid OTP. Please try again."));
    });
  };

  return (
    <CardWrapper
      headerLabel="to continue to Dashboard"
      // backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onVerifyOTP)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile Number</FormLabel>
                  <FormControl>
                    <PhoneInput {...field} disabled={isPending || isOTPSent} defaultCountry="GH"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {!isOTPSent && (
              <Button 
                onClick={onSendOTP} 
                disabled={isPending || !form.getValues("phoneNumber")} 
                type="button" 
                className="w-full"
              >
                Send OTP
              </Button>
            )}
            {isOTPSent && (
              <>
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Code</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={isPending} placeholder="123456" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button disabled={isPending} type="submit" className="w-full">
                  Verify
                </Button>
              </>
            )}
          </div>
          <FormError message={error || urlError} />
          <FormSucess message={success} />
        </form>
      </Form>
    </CardWrapper>
  );
};

export default OTPForm;