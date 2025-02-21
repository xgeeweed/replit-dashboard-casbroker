import { signOut } from "@/app/auth/auth";

export async function POST() {
  try {
    await signOut();
    return new Response(null, { status: 200 });
  } catch (error) {
    console.error("Error during signout:", error);
    return new Response(null, { status: 500 });
  }
} 