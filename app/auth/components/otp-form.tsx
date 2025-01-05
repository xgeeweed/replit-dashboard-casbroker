
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CardWrapper from "@/app/auth/components/card-wrapper";
import { FormError } from "@/app/auth/components/form-error";
import { FormSucess } from "@/app/auth/components/form-sucesss";
import { PhoneInput } from "@/components/ui/phone-input";

// Dummy data for testing
const VALID_USERS = {
  agent: {
    phone: "+233200000000",
    otp: "123456"
  },
  owner: {
    phone: "+233300000000",
    otp: "654321"
  }
};

const LoginOTPSchema = z.object({
  userType: z.string().min(1, "User type is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  code: z.string().optional()
});

const OTPForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [isOTPSent, setIsOTPSent] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof LoginOTPSchema>>({
    resolver: zodResolver(LoginOTPSchema),
    defaultValues: {
      userType: "",
      phoneNumber: "",
      code: "",
    },
  });

  const onSendOTP = () => {
    const { userType, phoneNumber } = form.getValues();
    const validUser = VALID_USERS[userType as keyof typeof VALID_USERS];

    if (!validUser) {
      setError("Invalid user type selected");
      return;
    }

    setIsOTPSent(true);
    setError("");
    setSuccess("OTP sent successfully!");
  };

  const onVerifyOTP = (values: z.infer<typeof LoginOTPSchema>) => {
    setError("");
    setSuccess("");
    
    const validUser = VALID_USERS[values.userType as keyof typeof VALID_USERS];
    
    if (validUser && values.phoneNumber === validUser.phone && values.code === validUser.otp) {
      router.push(values.userType === "agent" ? "/dashboard/agent-dashboard" : "/dashboard/driver-dashboard");
    } else {
      setError("Invalid OTP. Please try again.");
    }
  };

  return (
    <CardWrapper
      headerLabel="to continue to Dashboard"
      backButtonHref="/auth/register"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onVerifyOTP)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="userType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User Type</FormLabel>
                  <Select
                    disabled={isPending || isOTPSent}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select user type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="agent">Agent</SelectItem>
                      <SelectItem value="owner">Transport Owner</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
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
                disabled={isPending || !form.getValues("userType") || !form.getValues("phoneNumber")} 
                type="button" 
                className="w-full"
              >
                Send OTP
              </Button>
            )}

            {isOTPSent && (
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
            )}
          </div>
          <FormError message={error} />
          <FormSucess message={success} />
          {isOTPSent && (
            <Button disabled={isPending} type="submit" className="w-full">
              Verify OTP
            </Button>
          )}
        </form>
      </Form>
    </CardWrapper>
  );
};

export default OTPForm;
