## -- Daigaku --

### Table of Contents
+ I. Project description
+ II. Techstack
+ III. Running the application
+ IV. Roadmap
+ V. Sneak peak


### I. Project Description
+ The application follows the university application process of high school students and handles complex student-mentor-admin relationships.
+ Upon registering, users with ``student`` access are able to join an institution (i.e. their school) and have a ``mentor`` user assigned to them who reviews their applications.
+ Users with ``mentor`` permission are able to access all applications submitted by their allocated students and perform various aggregate operations.
+ Users with ``institution admin`` permission receive admin rights for their institution (e.g. accept incoming student registration requests or access detailed aggregate reports), while ``system admins`` have application-wide rights and data overview.
+ A currently work-in-progress application with new features being continuously added.


### II. Techstack
```
Frontend
    + ReactJS (Vite template)          - javascript library and build tool.
    + Typescript                       - javascript extension.
    + React Router                     - client-side routing solution.
    + React Query                      - data fetching and server state manager solution.
    + React Hook Form                  - form managing library.
    + Styled Components                - css-in-javascript styling solution.
    + Fontawesome                      - icon library.
    + Axios                            - http client.
```

```
Backend
    + Java Spring Boot                 - java framework.
    + Spring Data JPA / Hibernate ORM  - persistence application layer.
    + Spring Security                  - authentication and access-control layer.
    + JWT                              - token solution.
    + Jakarta Validation               - annotation-based validation library.
    + Spring Mail                      - email sending library.
```

```
Database
    + PostgreSQL                       - relational database management system.
```

```
DevOps
    + Docker                           - containerisation solution.
```

```
Tools
    + Postman                           - API testing.
```

### III. Running the application
+ Have [Docker](https://docs.docker.com/get-docker/) installed on your local machine.
+ Clone the repository.
+ Fill in the necessary environment variables:
    + in a terminal panel, step into the repository's root directory, run the ``cp .env_sample .env`` command and fill in the just created ``.env`` file.
    + in a terminal panel, step into the repository's /backend directory, run the ``cp env_sample.properties env.properties`` command and fill in the just created ``env.properties`` file.
+ In a terminal panel, change directory into the repository's root folder and run the ``docker-compose -f docker-compose.prod.yml up --build`` command.
+ On the login page you may log in with the following credentials:
    + account with student role:
        + email - ``student@test.net``;
        + password - ``1``.


### IV. Roadmap
``student`` user features:
- [x] submit a new application.
- [x] view aggregate application data in a table format.
- [x] edit invidivual applications.
- [x] request application deletion.
- [ ] friend request feature to be able to see each others' applications.
- [ ] download application data in .pdf format.

``mentor`` user features:
- [ ] view/edit assigned students' applications.
- [ ] submit application instead of a student.
- [ ] download assigned students' applications data in .pdf format.

``institution-admin`` user features:
- [ ] view/edit/delete all mentors within their institution.
- [ ] view/edit/delete all students within their institution.
- [ ] accept/refuse incoming institution student/mentor join requests.
- [ ] delete applications requests.
- [ ] promote/demote mentors to institution-admin role.
- [ ] download institution-wide application data in .pdf format.

``system-admin`` user features:
- [ ] view/edit/delete all institutions.
- [ ] view/edit/delete all institutions-admins.
- [ ] view/edit/delete all mentors.
- [ ] view/edit/delete all students.
- [ ] access / download global data reports.

application-wide features:
- [x] login/registration functionality.
- [ ] editable profile page.
- [ ] comment section under individual applications.
- [ ] revamp / make the frontend design more lively.
- [ ] in-app messaging system.
- [ ] feedback form.

testing:
- [ ] unit tests.
- [ ] integration tests.

devops features:
- [x] containerisation.
- [ ] deployment.
- [ ] github CI/CD.


### V. Sneak peak
![login_page](./repo-assets/login_page)

![applications_table](./repo-assets/applications_table.png)

![application_form](./repo-assets/application_form.png)