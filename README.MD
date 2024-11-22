# Fullstack Project Setup with TurboRepo

This guide will help you set up a fullstack project using TurboRepo, FastAPI for the backend, and a Vite-based frontend.

## Prerequisites

- Node.js (version 18 or above)
- Python 3.8 or above
- Poetry package manager
- `poethepoet` for task automation (optional)

## Setup Instructions

### 1. Clone the repository

Start by cloning the repository to your local machine:

```bash
git clone https://github.com/garryismael/viz-orbital.git
cd viz-orbital
```

#### 1. Install Backend

Navigate to the backend directory:

```bash
cd apps/backend
```

##### 1. Create and activate a virtual environment

For macOS/Linux:

```bash
python3 -m venv venv
source venv/bin/activate
```

For windows:

```bash
python -m venv venv
venv\Scripts\activate
```

##### 2. Install dependencies using Poetry

```bash
poetry install
```

##### 3. Set up environment variables

- Create a .env file in the backend directory by copying the contents of the .env.example file.
- Manually create a .env file in the apps/backend directory.
- Copy the contents of the .env.example file into the newly created .env file.
- Open the .env file and update it with your environment-specific variables (e.g., database credentials, secret keys, etc.).

#### 2. Install Frontend

Navigate to the frontend directory:

```bash
cd apps/web
```

##### 1. Install dependencies using npm

```bash
npm install
```

##### 2. Set up web environment variables

- Create a .env file in the web directory by copying the contents of the .env.example file.
- Manually create a .env file in the apps/web directory.
- Copy the contents of the .env.example file into the newly created .env file.
- Open the .env file and update it with your environment-specific variables.

## Run project

If you want to run both the backend and frontend servers simultaneously for local development, you can navigate to root the root of the project and run:

```bash
npm run dev
```
