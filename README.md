# capstone-project-3900-w11a-beltd

This is a web book recommendation system which consists of a microservices backend and ReactJS frontend.

## Microservices

### Identity Service

Description: Authenticate users and handles user book collections, reading goals and reviews.

Dev Port: 8001

### Collection Service

Description: Communicates with third party APIs and store book information into databases.

Dev Port: 8002

### UI

Description: Serves the React user interface.

Dev Port: 3000

## Development Installation

### 1. Install Dependencies

- git
- node version 16+ (use [node version manager](https://github.com/nvm-sh/nvm) to install and use node versions)

### 2. Clone/Download Repository

```
git clone https://github.com/unsw-cse-comp3900-9900-22T1/capstone-project-3900-w11a-beltd.git
cd capstone-project-3900-w11a-beltd
```

or

- Click `Download ZIP` in the green `Code` drop-down button
- In the terminal, go to the directory where the zip file is located.
- Run `unzip capstone-project-3900-w11a-beltd-main.zip`. This unzips the zip file downloaded.

### 3. Install Dependencies

**_!!! For each new terminal window you have opened, check if the node version is 16 or above_**

In the project root directory, run:

```
./scripts/init.sh
```

or

```
bash ./scripts/init.sh
```

## Usage

### Running the entire system

The entire system can be started by running the microservices backend and ui in separate terminals.

**_!!! For each new terminal window you have opened, check if the node version is 16 or above_**

**_Please keep a stable internet connection while running the system since the backend services are connecting to a MongoDB cluster_**

1. Start a new terminal
2. `cd identity_service`
3. `npm run start:dev`
4. Start a new terminal
5. `cd collection_service`
6. `npm run start:dev`
7. Start a new terminal
8. `cd Front\ End/`
9. `npm start`
10. Open a web browser of your choice and go to http://localhost:3000/
