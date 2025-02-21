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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AgentRegistrationSchema,
  AgentCompanyVerificationSchema,
  AgentReferralSchema,
  AgentOTPSchema,
} from "@/app/auth/schemas";

type RegistrationFormValues = z.infer<typeof AgentRegistrationSchema>;
type CompanyVerificationFormValues = z.infer<typeof AgentCompanyVerificationSchema>;
type ReferralFormValues = z.infer<typeof AgentReferralSchema>;
type OTPFormValues = z.infer<typeof AgentOTPSchema>;

interface CompanyContact {
  id: string;
  full_name: string;
  email: string;
  phone_number: string;
}

const AgentSignupForm = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [companyName, setCompanyName] = useState<string>("");
  const [companyContacts, setCompanyContacts] = useState<CompanyContact[]>([]);
  const [registrationData, setRegistrationData] = useState<RegistrationFormValues | null>(null);

  // Registration Form
  const registrationForm = useForm<RegistrationFormValues>({
    resolver: zodResolver(AgentRegistrationSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      mobile_number: "",
      email: "",
    },
  });

  // Company Verification Form
  const companyForm = useForm<CompanyVerificationFormValues>({
    resolver: zodResolver(AgentCompanyVerificationSchema),
    defaultValues: {
      tax_id: "",
    },
  });

  // Referral Selection Form
  const referralForm = useForm<ReferralFormValues>({
    resolver: zodResolver(AgentReferralSchema),
    defaultValues: {
      referral_id: "",
    },
  });

  // OTP Form
  const otpForm = useForm<OTPFormValues>({
    resolver: zodResolver(AgentOTPSchema),
    defaultValues: {
      otp: "",
    },
  });

  // Handle initial registration
  const onRegistrationSubmit = async (values: RegistrationFormValues) => {
    setError("");
    setSuccess("");

    try {
      // Call API to verify phone number and send OTP
      const response = await fetch("/api/auth/agent/verify-phone", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.error);
        return;
      }

      setRegistrationData(values);
      setSuccess("Please verify your phone number with the OTP sent.");
      setStep(2);
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
  };

  // Handle company verification
  const onCompanyVerify = async (values: CompanyVerificationFormValues) => {
    setError("");
    setSuccess("");

    try {
      // Call API to verify company Tax ID
      const response = await fetch("/api/auth/agent/verify-company", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.error);
        return;
      }

      setCompanyName(data.company.name);
      setCompanyContacts(data.company.contacts);
      setStep(3);
    } catch (error) {
      setError("Failed to verify company. Please try again.");
    }
  };

  // Handle referral selection
  const onReferralSubmit = async (values: ReferralFormValues) => {
    setError("");
    setSuccess("");

    try {
      // Call API to send referral confirmation
      const response = await fetch("/api/auth/agent/send-referral", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          registration_data: registrationData,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.error);
        return;
      }

      setSuccess("Referral confirmation sent. Please wait for approval.");
      setStep(4);
    } catch (error) {
      setError("Failed to send referral confirmation. Please try again.");
    }
  };

  // Handle OTP verification
  const onOTPSubmit = async (values: OTPFormValues) => {
    setError("");
    setSuccess("");

    try {
      // Call API to verify OTP
      const response = await fetch("/api/auth/agent/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          mobile_number: registrationData?.mobile_number,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.error);
        return;
      }

      setSuccess("Phone number verified successfully!");
      setStep(5);
    } catch (error) {
      setError("Failed to verify OTP. Please try again.");
    }
  };

  return (
    <CardWrapper
      headerLabel={
        step === 1 ? "Register as Agent" :
        step === 2 ? "Verify Phone Number" :
        step === 3 ? "Select Referral" :
        step === 4 ? "Awaiting Approval" :
        "Create Password"
      }
      backButtonLabel="Already have an account?"
      backButtonHref="/auth/login"
      showSocial={false}
    >
      {step === 1 && (
        <Form {...registrationForm}>
          <form onSubmit={registrationForm.handleSubmit(onRegistrationSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={registrationForm.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isPending} placeholder="John" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={registrationForm.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isPending} placeholder="Doe" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={registrationForm.control}
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
              <FormField
                control={registrationForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isPending} type="email" placeholder="john@example.com" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <FormSucess message={success} />
            <Button disabled={isPending} type="submit" className="w-full">
              Continue
            </Button>
          </form>
        </Form>
      )}

      {step === 2 && (
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
            <Button disabled={isPending} type="submit" className="w-full">
              Verify OTP
            </Button>
          </form>
        </Form>
      )}

      {step === 3 && (
        <Form {...companyForm}>
          <form onSubmit={companyForm.handleSubmit(onCompanyVerify)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={companyForm.control}
                name="tax_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Tax ID</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isPending} placeholder="Enter company tax ID" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {companyName && (
                <div className="text-sm">
                  <div className="font-medium">Company Name:</div>
                  <div className="text-muted-foreground">{companyName}</div>
                </div>
              )}
            </div>
            <FormError message={error} />
            <FormSucess message={success} />
            <Button disabled={isPending} type="submit" className="w-full">
              Verify Company
            </Button>
          </form>
        </Form>
      )}

      {step === 4 && companyContacts.length > 0 && (
        <Form {...referralForm}>
          <form onSubmit={referralForm.handleSubmit(onReferralSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={referralForm.control}
                name="referral_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Referral Contact</FormLabel>
                    <Select
                      disabled={isPending}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a contact" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {companyContacts.map((contact) => (
                          <SelectItem key={contact.id} value={contact.id}>
                            {contact.full_name} ({contact.email})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <FormSucess message={success} />
            <Button disabled={isPending} type="submit" className="w-full">
              Send Referral Request
            </Button>
          </form>
        </Form>
      )}

      {step === 5 && (
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <div className="text-xl font-semibold">Registration Complete!</div>
            <div className="text-sm text-muted-foreground">
              Your registration is pending approval from your selected referral.
              You will receive an email and SMS notification once approved.
            </div>
          </div>
          <Button
            onClick={() => router.push("/auth/login")}
            className="w-full"
          >
            Back to Login
          </Button>
        </div>
      )}
    </CardWrapper>
  );
};

export default AgentSignupForm; 