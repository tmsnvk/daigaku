## -- Daigaku v0.1 --

### Project Description
+ The application follows the university application statuses of students and handles complex student-mentor relationships.
+ It has three types of users: student, mentor, and admin that have different permissions set.


### Techstack
```
Frontend
    + ReactJS (Vite template)          - javascript library and build tool.
    + Typescript                       - javascript extension.
    + React Router                     - client-side routing solution.
    + React Query                      - data fetching and server state manager solution.
    + React Hook Form                  - library for managing forms.
    + Styled Components                - css-in-javascript styling solution.
    + Fontawesome                      - icon library.
    + Axios                            - http client.
```

```
Backend
    + Java Spring Boot                 - java framework.
    + Spring Data JPA / Hibernate      - persistence application layer.
    + Spring Security                  - authentication and access-control layer.
    + Spring Mail                      - email sending library.
    + JWT                              - token solution.
```

```
Database
    + PostgreSQL                       - relational database management system.
```


### Sneak peak
+ Login page
![login_page](./repo-assets/login_page.png)

+ Column selector modal on Applications' page table
![applications_table_modal](./repo-assets/applications_table_modal.png)

+ Application form
![application_form](./repo-assets/application_form.png)


### Running the application
+ A docker container is prepared with separate frontend and backend images to run the application in a local environment. 
    + Clone the repo.
    + Have the Docker application running in the local environment and run the ``docker-compose up --build`` command from the repo's root folder in a terminal panel.
    + Open ``http://localhost`` in a browser window.