"use server";

import * as z from "zod";
import bcrypt from "bcrypt";

import { RegisterSchema } from "@/app/auth/schemas";
import { db } from "@/app/auth/lib/db";
import { getUserByEmail } from "@/app/auth/data/user";
import { generateVerificationToken } from "@/app/auth/lib/tokens";
import { sendVerificationEmail } from "@/app/auth/lib/mail";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, name, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { sucess: "Confirmation email sent!" };
};
