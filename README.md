# Finance-API

The Finance-API is a backend service designed to support web applications and mobile apps for personal finance management. It offers a range of features for tracking and organizing your finances, including account management, transaction logging, budgeting, and financial reporting.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need Node.js and npm installed on your machine. This project was built using Node.js version v20.11.0.

```bash
# Install Node.js and npm if you haven't already
# For Node.js, we recommend using nvm: https://github.com/nvm-sh/nvm
```

### Installing

A step-by-step series of examples that tell you how to get a development environment running.


#### Clone the repository:

```bash
git clone https://github.com/fmotamedeiros/finance-api.git
cd finance-api
```

#### Install NPM packages:

```bash
npm install
```

#### Environment Variables

Set up your environment variables by creating a .env file at the root directory, based on the .env.example provided.

```bash
NODE_ENV=development
SERVER_PORT=3000
DB_HOST=your_host
DB_NAME=your_name
DB_USER=your_user
DB_PASSWORD=your_password
DB_DIALECT=postgres
DB_PORT=5432
JWT_SECRET=your_secret
```

#### Start the server:

```bash
npm start
```

This runs the server using nodemon, automatically restarting the server whenever changes are detected.

### Running the Tests

```bash
npm test
```

### Deployment
Add additional notes about how to deploy this on a live system.

Built With:

- Express - The web framework used.  
- Sequelize - Promise-based Node.js ORM.  
- bcryptjs, jsonwebtoken - For authentication and security.  
- pg, sqlite3 - The database clients.

### Contributing
Please read CONTRIBUTING.md for details on our code of conduct, and the process for submitting pull requests to us.

### Authors
Flávio Medeiros - Initial work - fmotamedeiros

### License
This project is licensed under the MIT License - see the [MIT License](LICENSE) file for details.