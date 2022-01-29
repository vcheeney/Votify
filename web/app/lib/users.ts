import prisma from "./prisma";

// Query users from the database
export async function getUsers() {
  const users = await prisma.user.findMany();

  // Transform data if needed
  return users;
}

export async function createUser(userId: number) {
  const user = await prisma.user.create({ data: { id: userId } });

  return user;
}
