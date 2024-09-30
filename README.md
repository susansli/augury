# augury.ai
Augury is a web application that uses AI to help users decide which stocks to buy. In addition, it displays data pertaining to the portfolios the user has saved, such as current valuation of all stocks held.

## Team
Susan Li (A01067674)

Dakaro Mueller (A01294207)

Bertram Nocon (A00971990)

Crystal Giesbrecht (A01326101)

Emma Meredith-Black (A01329913)

## Starting the Project Locally
1. `cd` into the root directory
2. Open up a terminal window and run `pnpm run-dev`
3. Alternatively, run `npx nx run augury-backend:start-nodemon` to start the backend only
4. Or run `npx nx serve augury` to start the frontend only

## Starting Docker
1. `cd` into the root directory
2. Open up a terminal window and run `docker-compose up --build`

Note: Due to Windows limitations (e.g. how Docker is needs run via WSL2), you will not be able to access hot reloading via Nodemon in the way you could if you run it locally. Docker is there for our CI/CD pipeline when we deploy the application since we can easily just push a Docker image with our `docker-compose`.
