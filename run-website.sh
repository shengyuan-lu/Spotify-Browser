#!/bin/bash

# Check if the current directory is "webserver"
if [ "$(basename "$PWD")" != "webserver" ]; then
    # If not, navigate to the "webserver" directory
    cd webserver || exit 1
fi

# Run npm start in the "webserver" directory
npm start &

# Navigate back to the previous directory
cd - || exit 1

# Check if the current directory is "client"
if [ "$(basename "$PWD")" != "client" ]; then
    # If not, navigate to the "client" directory
    cd client || exit 1
fi

# Run ng serve --open in the "client" directory
ng serve --open
