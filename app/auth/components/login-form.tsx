"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PhoneLoginSchema } from "@/app/auth/schemas";
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
import { login } from "@/app/auth/actions/login";

type LoginFormValues = z.infer<typeof PhoneLoginSchema>;

const OTPSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
});

type OTPFormValues = z.infer<typeof OTPSchema>;

const LoginForm = () => {
  const router = useRouter();
  const [showOTP, setShowOTP] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [loginData, setLoginData] = useState<LoginFormValues | null>(null);
  const [otpValue, setOtpValue] = useState("");

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(PhoneLoginSchema),
    defaultValues: {
      phone_number: "",
      password: "",
    },
  });

  const otpForm = useForm<OTPFormValues>({
    resolver: zodResolver(OTPSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onLoginSubmit = (values: LoginFormValues) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      login(values, callbackUrl)
        .then((data) => {
          if (data?.error) {
            loginForm.reset();
            setError(data.error);
            return;
          }

          if (data?.requireOTP) {
            setLoginData(values);
            setOtpValue("");
            otpForm.reset();
            setShowOTP(true);
            setSuccess("OTP sent to your phone");
          }
        })
        .catch(() => setError("Something went wrong"));
    });
  };

  const onOTPSubmit = (values: OTPFormValues) => {
    setError("");
    setSuccess("");

    if (!loginData) {
      setError("Login data not found");
      return;
    }

    startTransition(() => {
      const loginPayload: LoginFormValues = {
        phone_number: loginData.phone_number,
        password: loginData.password,
        otp: otpValue,
      };

      login(loginPayload, callbackUrl)
        .then((data) => {
          if (data?.error) {
            setOtpValue("");
            otpForm.reset();
            setError(data.error);
            return;
          }

          if (data?.success) {
            setSuccess("Logging in...");
            
            // Handle redirection
            if (data.redirectTo) {
              router.push(data.redirectTo);
            }
          }
        })
        .catch((error) => {
          console.error("Login error:", error);
          setError("Something went wrong during login");
          setOtpValue("");
          otpForm.reset();
        });
    });
  };

  const handleOTPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setOtpValue(value);
    otpForm.setValue("otp", value);
  };

  const handleBackToLogin = () => {
    setShowOTP(false);
    setError("");
    setSuccess("");
    setOtpValue("");
    otpForm.reset();
    setLoginData(null);
  };

  return (
    <CardWrapper
      headerLabel={showOTP ? "Enter OTP" : "Welcome back"}
      backButtonLabel="Don't have an account? Sign up"
      backButtonHref="/auth/register"
      showSocial={false}
    >
      {showOTP ? (
        <Form {...otpForm}>
          <form onSubmit={otpForm.handleSubmit(onOTPSubmit)} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Enter the 6-digit code sent to your phone
                </p>
                <p className="text-sm font-medium">
                  Phone: {loginData?.phone_number}
                </p>
              </div>
              <FormField
                control={otpForm.control}
                name="otp"
                render={() => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={6}
                        placeholder="000000"
                        disabled={isPending}
                        className="text-center text-xl tracking-[1em] font-mono"
                        onChange={handleOTPChange}
                        value={otpValue}
                        autoComplete="off"
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
                onClick={handleBackToLogin}
                className="w-full"
              >
                Back to Login
              </Button>
            </div>
          </form>
        </Form>
      ) : (
        <Form {...loginForm}>
          <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={loginForm.control}
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
              <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="******"
                        type="password"
                        autoComplete="current-password"
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
              Login
            </Button>
          </form>
        </Form>
      )}
    </CardWrapper>
  );
};
export default LoginForm;

