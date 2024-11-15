# Magic Transporters

## Overview
Magic Transporters is a project designed to manage and operate magical movers for transporting items based on specific weight limits and missions.

## Features
- **Add Magic Mover:** Create a magical mover with a specified weight limit.
- **Add Magic Item:** Register a magic item with a name and weight.
- **Load Items:** Load items onto a specific magic mover.
- **Start Mission:** Initiate a mission for a magic mover.
- **End Mission:** Conclude a mission for a magic mover.
- **Mission Statistics:** Retrieve a list of movers sorted by the number of completed missions in descending order.

## Installation
To set up the project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yazan-alshabki/Magic-Transporters.git
2. **Install dependencies:**
   ```bash
   npm install
3. **Create a .env file with the following variables:**
      - PORT=your_port_number
      - LOCAL_DB="your_mongoDB_link"
      - HOST_FOR_SWAGGER="localhost:your_port_number"
   
## Runing the project
**Start the application:** npm run start-dev
**Run the Swagger documentation:** npm run start-swagger
**Build the TypeScript files:** npm run build
**Test** npm run test




