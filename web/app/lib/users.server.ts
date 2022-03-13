import prisma from "./prisma";
import { createHash } from "crypto";
import moment from "moment";

function hashCode(code: string) {
  const sha256 = createHash("sha256");

  return sha256.update(code).digest("hex");
}

async function getUserFromCode(code: string) {
  const codeHash = hashCode(code);

  const user = await prisma.user.findFirst({
    where: {
      secretCodeHash: codeHash,
    },
  });

  return user;
}

export async function registerUser(
  secretCode: string,
  dateOfBirth: Date,
  address: string
) {
  const user = await getUserFromCode(secretCode);

  if (user == null || user.address != null) {
    console.error(
      "Failed to register user, code is either invalid or user is already registred"
    );
    throw new Error("Unable to register user");
  }

  const userBirthDate = moment(user.dateOfBirth);
  const claimedBirthDate = moment(dateOfBirth);

  // Not giving any precise info for security
  if (!userBirthDate.isSame(claimedBirthDate, "day")) {
    console.error(
      "Failed to register user, claimed birth date does not match actual"
    );
    throw new Error("Unable to register user");
  }

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      address: address,
    },
  });

  return updatedUser;
}

export async function getUserFromAddress(address: string) {
  return prisma.user.findFirst({ where: { address: address } });
}
