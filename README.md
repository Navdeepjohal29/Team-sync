# Team-Sync

Simple Application to manage Team Members.

Tech-Stack 

Frontend: Micro Frontend with React 
API: Node JS Express
Backend: PostgreSQL 

## Table of Contents
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)


## Getting Started

Explain how to get your project up and running.

### Prerequisites

List any software or dependencies that need to be installed.

- Docker: [https://docs.docker.com/get-docker/](https://docs.docker.com/get-docker/)
- docker should be started and running.
- Node should be installed


### Installation

Provide step-by-step instructions on how to install and run your project.

1. Clone the repository:
    ```bash
    git clone https://github.com/Navdeepjohal29/Team-sync.git
    cd Team-sync

    ```

2.   Shell #1
    Run the Docker container for Database. Make necessary changes to docker-compose.yaml file. If you want to change PostgreSQL user/password or port
         I have also given docker-compose.yaml and db-schema.sql to create the TABLE:
    ```bash
    cd database
    docker-compose up -d

    it will auto-matically create TABLE users.

    if you want to put dummy data in TABLE to test Application use below command
       cd database
       psql -U postgres -h localhost -d team_sync -f dummy-data.sql 

    ```

3. Shell #2
    Run the API REST server:
    ```bash
    cd apiServer; 
    npm install
    node server.js

    Check if your API server is responding. 
    curl -v 'http://localhost:3001/api/users' should return 200 OK, if you added dummy data. then it should also return that
    ```

4. Shell #3
    Run the Team Application:
    ```bash
    cd frontend; 
    npm install
    npm run start
    ```
5. Shell #4
    Run the Container Application:
    ```bash
    cd container; 
    npm install 
    npm run start
    ```

## Usage

Explain how to use your project.

- Open localhost:8080


## Contributing

Explain how others can contribute to your project. Include guidelines for submitting issues and pull requests.

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch`
3. Make your changes and commit them: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature-branch`
5. Submit a pull request.


