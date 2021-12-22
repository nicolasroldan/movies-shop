# MoviesShop - Tumuvi Final Project Angular Course, Nicolas Roldan 

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Project Architecture

The project is organized in 6 modules:

`app.module` General module that uses lazy loading strategy to load all the other modules.
`admin` Admin module that contains the components that an admin user will see (add-edit-movie and info).
`auth` Auth module that contains the login and register components.
`client` Client module that contains the components that an admin user will see (movies-grid and cart).
`material` Material module that contains the Angular Material components.
`shared` Shared module that contains the shared components and services.

`guards` Contains the http guards (auth.guard and admin.guard).

## Admin and Client users

Client users can be created in the register view.



