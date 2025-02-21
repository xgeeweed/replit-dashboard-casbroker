import { Poppins } from "next/font/google";
import LoginForm from "@/app/auth/components/login-form";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center">
      <LoginForm />
    </main>
  );
}
