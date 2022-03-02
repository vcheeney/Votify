set -e # stop the script if any command returns an error

echo "🚦 Starting automated installation of the project..."

echo "⌨  $ cd hardhat"
cd hardhat

echo "⌨  $ npm install"
npm install

echo "⌨  $ npx hardhat compile"
npx hardhat compile

echo "⌨  $ cd ../database"
cd ../database

echo "⌨  $ cp database.env.template database.env"
cp database.env.template database.env

echo "⌨  $ cd ../web"
cd ../web

echo "⌨  $ npm install"
npm install

echo "⌨  $ cp .env.example .env"
cp .env.example .env

echo "⌨  $ npm run syncContract"
npm run syncContract

echo "⌨  $ npm run build"
npm run build

echo "🏁 Finished installation of the project!"