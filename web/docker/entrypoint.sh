#!/bin/sh

# Change to the correct directory
cd /usr/server/app

# Run the migration
# (Will retry every X seconds until it succeeds or Y attempts are made)
# See the X and Y values in the script itself
sh docker/run-migration.sh

# Run the seed
# (Will retry every X seconds until it succeeds or Y attempts are made)
# See the X and Y values in the script itself
sh docker/run-seed.sh

# Run the web app
npm start