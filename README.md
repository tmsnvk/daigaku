## -- Daigaku --

### Table of Contents

- I. Project Description
- II. Tech stack
- III. Running the Application
- IV. Development Roadmap
- V. Sneak Peak

### I. Project Description

- The application follows the university application process of high school students and handles complex student-mentor-admin relationships.
- Upon registering, users with `student` access are able to join an `institution` (i.e. their current school) and have a `mentor` user assigned to them.
- Users with `mentor` permission are able to access all Application records submitted by their allocated students and perform various aggregate operations.
- Users with `institution admin` permission receive admin rights for their `institution` (e.g. accept incoming student/mentor registration requests, access detailed aggregate reports, etc.), while `system admins` have application-wide rights and data overview.
- A currently work-in-progress learning-project application with new features being continuously developed and added.

### II. Tech stack

```
Frontend
    + ReactJS (Vite template) with Typescript   - javascript library and build tool.
    + React Router                              - client-side routing solution.
    + React Query                               - data fetching and server state manager solution.
    + React Hook Form                           - form managing library.
    + Tailwind                                  - css styling solution.
    + Fontawesome                               - icon library.
    + Axios                                     - http client.
    + ESLint                                    - static code analysis tool.
    + Prettier                                  - code formatter tool.
```

```
Backend
    + Spring Boot                               - java framework.
    + Spring Security                           - authentication and access-control layer.
    + JWT                                       - authentication token solution.
    + Spring Data JPA / Hibernate ORM           - persistence application layer.
    + Jakarta Validation                        - annotation-based validation library.
    + Spring Mail                               - email sending library.
    + RabbitMQ                                  - message broker solution.
    + CheckStyle                                - static code analysis tool.
```

```
Testing
    + Playwright                                - end-to-end testing library.
    + JUnit, Mockito                            - backend testing libraries.
    + Postman                                   - api testing tool.
```

```
Database
    + PostgreSQL                                - relational database management system.
    + Redis                                     - cache storage solution.
    + AWS S3                                    - file storage solution.
```

```
DevOps
    + Docker                                    - containerisation solution.
    + Github Actions                            - automated test running tool.
```

```
Tools
    + RabbitMQ Management UI                    - management and monitoring tool.
```

### III. Running the Application

- Have [Docker](https://docs.docker.com/get-docker/) installed on your local machine.
- Clone the repository.
- In a terminal panel, stand in the project root:
  - run `bash build-env-vars.sh` to generate two blank .env files. Follow the directions in the script.
  - run `bash build-containers.sh` to build the project and set up a containarised Docker environment for each of the application's module.
  - run `http://localhost/` in a browser window.
- On the application's login page you may log in with the following credentials:
  - account with student role:
    - email - `student@test.net`;
    - password - `1`.

### IV. Development Roadmap

student user features:

- [x] submit a new application.
- [x] view aggregate application data in a table format.
- [x] edit individual applications.
- [x] request application deletion.
- [ ] set applications to private state to hide them from friends.
- [x] download application data in .pdf format.

mentor user features:

- [ ] submit application instead of an assigned student.
- [ ] view/edit assigned students' applications.
- [ ] download assigned students' applications data in .pdf format.

institution-admin user features:

- [ ] view/edit/delete all mentors within their institution.
- [ ] view/edit/delete all students within their institution.
- [ ] accept/refuse incoming institution student/mentor join requests.
- [ ] delete application requests.
- [ ] promote/demote mentors to institution-admin role.
- [ ] download institution-wide application data in .pdf format.

system-admin user features:

- [ ] view/edit/delete all institutions.
- [ ] view/edit/delete all institutions-admins.
- [ ] view/edit/delete all mentors.
- [ ] view/edit/delete all students.
- [ ] access / download global data reports.

application-wide features:

- [x] login/registration functionality.
- [x] comment section under individual applications.
- [ ] editable profile page.
- [ ] friend request/remove feature.
- [ ] user in-app messaging system.
- [ ] various system-related forms to expand functionality (feedback, university request, etc.).

testing:

- [on-going] unit tests.
- [on-going] end-to-end tests.

devops features:

- [x] docker containerisation.
- [x] github CI/CD.
- [ ] deployment.

### V. Sneak Peak

![login_page](./repo-assets/login_page.png)

![applications_table](./repo-assets/applications_table.png)

![application_form](./repo-assets/application_form.png)
