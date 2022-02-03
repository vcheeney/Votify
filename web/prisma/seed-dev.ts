import { PrismaClient, User } from "@prisma/client";
import { createHash } from "crypto";
import { v4 as uuidv4 } from "uuid";
import faker from "@faker-js/faker";
import chalk from "chalk";
import { prompt } from "inquirer";
import { createSpinner } from "nanospinner";
import { writeFileSync } from "fs";

const prisma = new PrismaClient();

type CodeLogs = [{ name: string; dateOfBirth: string; code: string }?];

const codes: CodeLogs = [];

function printBanner() {
  console.log(chalk.green("Votify Random Seeding"));
  console.log();
  console.log(chalk.bgRed("!!! WARNING !!!"));
  console.log(
    chalk.red(
      "This programs insert randomly generated users into the database. If you are in production, abort now."
    )
  );
}

async function promptContinue() {
  const continueProgram = await prompt([
    {
      name: "continue",
      type: "confirm",
      message: "Do you wish to continue?",
    },
  ]);

  return continueProgram["continue"];
}

async function promptCreateDefaultUsers() {
  const createDefaultUsersPrompt = await prompt([
    {
      name: "create_default_users",
      type: "confirm",
      message: "Create default users?",
    },
  ]);

  return createDefaultUsersPrompt["create_default_users"];
}

async function promptRandomUserCount() {
  const randomUserCountPrompt = await prompt({
    name: "random_user_count",
    type: "input",
    message: "Number of random users to create",
    default() {
      return 5;
    },
  });

  try {
    return parseInt(randomUserCountPrompt["random_user_count"]);
  } catch (error) {
    return 0;
  }
}

const createAndStoreCodeHash = (name: string, dateOfBirth: string) => {
  const sha256 = createHash("sha256");
  const code = uuidv4();
  codes.push({ name, dateOfBirth, code });

  return sha256.update(code).digest("hex");
};

async function isUserTableEmpty() {
  return (await prisma.user.findMany()).length === 0;
}

async function main() {
  printBanner();

  if (!(await promptContinue())) {
    console.log(chalk.yellow("Seeding aborted"));
    return;
  }

  if (!(await isUserTableEmpty())) {
    console.log(
      chalk.yellow("Warning: You already have users in your database.")
    );
    if (!(await promptContinue())) {
      return;
    }
  }

  if (await promptCreateDefaultUsers()) {
    const spinner = createSpinner("Creating default users...").start();
    await createDefaultUsers();
    spinner.stop().success();

    console.log(chalk.green("Created default users Antoine and Victor"));
  }

  const count = await promptRandomUserCount();

  const spinner = createSpinner(`Creating ${count} random users...`).start();

  await createRandomUsers(count);

  spinner.stop().success();

  const path = "./prisma/seed-users.json";

  const writeSpinner = createSpinner("Writting users code to file...").start();
  writeFileSync(path, JSON.stringify(codes, null, 2));
  writeSpinner.stop().success();

  console.log(chalk.green(`User codes have been written to ${path}`));
  console.log(chalk.green("Seeding done, go vote!"));
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
