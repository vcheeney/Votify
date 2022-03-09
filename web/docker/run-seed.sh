n=1
SLEEP=5
MAX_ATTEMPTS=10

until [ "$n" -ge $MAX_ATTEMPTS ]
do
   echo "Trying to run the seed... (Attempt $n/$MAX_ATTEMPTS)";
   exec 2> /dev/null
   npx dotenv -e .env.docker -- npx ts-node prisma/seed-dev.ts --non-interactive &&
      echo "Seed succeeded! 🎉" &&
      break;
   exec 2>&1
   n=$((n+1));
   echo "Seed failed, retrying in $SLEEP seconds...";
   sleep $SLEEP;
done