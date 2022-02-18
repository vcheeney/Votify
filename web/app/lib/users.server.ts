import prisma from "./prisma";
import { createHash } from "crypto";
import invariant from "tiny-invariant";
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

  invariant(user, "Invalid code");
  invariant(!user.address, "User already registered");

  const userBirthDate = moment(user.dateOfBirth);
  const claimedBirthDate = moment(dateOfBirth);

  // Not giving any precise info for security
  invariant(userBirthDate.isSame(claimedBirthDate, "day"), "Invalid code");

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
