
Simple dev server for web app.

## Usage

with npm...

    cp .env.example .env
    npm install
    npm start

or with docker...

    cp .env.example .env
    docker-compose build
    docker-compose run --rm npm install
    docker-compose up server

## Upload changes to sd card

Run the upload.sh file. Requires bash, git, and curl. Or run `docker-compose run --rm upload`

