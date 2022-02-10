n=1
SLEEP=5
MAX_ATTEMPTS=10

until [ "$n" -ge $MAX_ATTEMPTS ]
do
   echo "📜 Trying to deploy the smart contract... (Attempt $n/$MAX_ATTEMPTS)";
   exec 2> /dev/null
   npm run deploy && echo "📜 Deployment succeeded! 🎉" && break;
   exec 2>&1
   n=$((n+1));
   echo "📜 Deployment failed, retrying in $SLEEP seconds...";
   sleep $SLEEP;
done