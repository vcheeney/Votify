import { PrismaClient, User } from "@prisma/client";
import { createHash } from "crypto";
import { v4 as uuidv4 } from "uuid";
import faker from "@faker-js/faker";
import chalk from "chalk";
import { prompt } from "inquirer";
import { createSpinner } from "nanospinner";

const prisma = new PrismaClient();

type CodeLogs = [{ name: string; dateOfBirth: string; code: string }?];

const codes: CodeLogs = [];

const createAndStoreCodeHash = (name: string, dateOfBirth: string) => {
  const sha256 = createHash("sha256");
  const code = uuidv4();
  codes.push({ name, dateOfBirth, code });

  return sha256.update(code).digest("hex");
};

async function main() {
  console.log(chalk.green("Votify Random Seeding"));
  console.log();
  console.log(chalk.bgRed("!!! WARNING !!!"));
  console.log(
    chalk.red(
      "This programs insert randomly generated users into the database. If you are in production, abort now."
    )
  );

  const continueProgram = await prompt([
    {
      name: "continue",
      type: "confirm",
      message: "Do you wish to continue?",
    },
  ]);

  if (!continueProgram["continue"]) {
    console.log(chalk.yellow("Seeding aborted"));
    return;
  }

  const createDefaultUsersPrompt = await prompt([
    {
      name: "create_default_users",
      type: "confirm",
      message: "Create default users?",
    },
  ]);

  if (createDefaultUsersPrompt["create_default_users"]) {
    const spinner = createSpinner("Creating default users...").start();
    await createDefaultUsers();
    spinner.stop();

    console.log(chalk.green("Created default users Antoine and Victor"));
  }

  const randomUserCountPrompt = await prompt({
    name: "random_user_count",
    type: "input",
    message: "Number of random users to create",
    default() {
      return 5;
    },
  });

  const count = parseInt(randomUserCountPrompt["random_user_count"]);

  const spinner = createSpinner("Creating random users...").start();

  await createRandomUsers(count);

  spinner.stop();

  console.log(codes);
}

async function createDefaultUsers() {
  await prisma.user.createMany({
    data: [
      {
        firstName: "Antoine",
        lastName: "Gagnon",
        dateOfBirth: new Date("1999-05-05"),
        secretCodeHash: createAndStoreCodeHash("Antoine", "1999-05-05"),
      },
      {
        firstName: "Victor",
        lastName: "Cheeney",
        dateOfBirth: new Date("1999-06-06"),
        secretCodeHash: createAndStoreCodeHash("Victor", "1999-06-06"),
      },
    ],
  });
}

async function createRandomUsers(count: number) {
  const users = [];

  for (let i = 0; i < count; i++) {
    const firstName = faker.name.firstName();
    const dateOfBirth = faker.date.between("1950-01-01", "2002-01-01");

    users.push({
      firstName: firstName,
      lastName: faker.name.lastName(),
      dateOfBirth: new Date(dateOfBirth),
      secretCodeHash: createAndStoreCodeHash(firstName, dateOfBirth.toString()),
      address: null,
    });
  }

  return prisma.user.createMany({ data: users });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
