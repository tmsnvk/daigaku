### Running the Application

- Have [Docker](https://docs.docker.com/get-docker/) installed on your local machine.
- Clone the repository.
- In a terminal panel, stand in the project root:
    - run `bash build-env-vars.sh` to generate two blank .env files. Follow the directions in the script.
    - run `bash build-containers.sh` to build the project and set up a containarised Docker environment for each of the
      application's module.
    - run `http://localhost/` in a browser window.
- On the application's login page you may log in with the following credentials:
    - account with student role:
        - email - `student@test.net`;
        - password - `1`.