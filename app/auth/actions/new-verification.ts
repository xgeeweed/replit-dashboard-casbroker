"use server";

import { db } from "@/app/auth/lib/db";
import { getUserByEmail } from "@/app/auth/data/user";
import { getVerificationTokenByToken } from "@/app/auth/data/verification-token";

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return { error: "Token does not exist!" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "Email does not exist" };
  }

  await db.user
    .update({
      where: { id: existingUser.id },
      data: {
        emailVerified: new Date(),
        email: existingToken.email,
      },
    })
    .then(() => {
      db.verificationToken.delete({
        where: { id: existingToken.id },
      });
    });

  // await

  return { success: "Email verified!" };
};
