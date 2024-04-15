## -- Daigaku --

### Project Description
+ The application follows the university application statuses of high school students and handles complex student-mentor relationships.
+ Upon registering, users with ``student`` access are able to join an institution (i.e. their school) and have a ``mentor`` user assigned to them who reviews their applications.
+ Users with ``institution admin`` permissions handle admin stuff for their institutions (e.g. accept incoming student registration requests or access reports), while ``system admins`` have application-wide rights and overview.


### Techstack
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
![login_page](./repo-assets/login_page.png)

![applications_table_modal](./repo-assets/applications_table_modal.png)

![application_form](./repo-assets/application_form.png)


### Running the application
+ 