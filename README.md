# Employee List Management Application


![Employees managment](/employee_client/src/assets/images/screenshot.png)



## Description

This project is a web application built to manage employee lists for organizations. It allows users to view, add, edit, and delete employee information. The application consists of a front-end built with Angular 17 and Angular Material design libraries, and a back-end built with .NET 6.

## Tech Stack

- Angular 17
- Angular Material design libraries
- .NET 6

## Design

The user interface of the application includes a table displaying employee details such as first name, last name, ID, and start date. Users can add, edit, and delete employees directly from the table. Additionally, the application provides options for adding additional information such as date of birth, gender, and roles dynamically. 

## Features

- View employee list
- Add new employee
- Edit employee details
- Delete employee
- Search functionality
- Export employee list to Excel

## How to Run the Project

### Front-end (Angular)

1. Clone the repository.
2. Navigate to the `client` directory.
3. Run `npm install` to install dependencies.
4. Run `ng serve` to start the Angular development server.
5. Access the application at `http://localhost:4200`.

### Back-end (.NET)

1. Navigate to the `server` directory.
2. Open the solution in Visual Studio or any other preferred IDE.
3. Ensure you have SQL Server installed and running.
4. Run `update-database` command in the Package Manager Console to apply migrations and update the database schema.
5. Run the application using IIS Express or any other preferred method.
6. The API endpoints will be accessible at the specified routes.

### Database

To run the database migration, use the following command:

**Note:** Ensure that you have appropriate permissions to run database migrations.

## Deployment

The application should be deployed to a cloud platform for accessibility. You can use platforms like Azure, AWS, or Heroku for deployment. Make sure to configure the deployment settings according to the platform requirements.

## Additional Notes

- Input integrity validations have been implemented to ensure data consistency and accuracy.
- Logical deletion is performed for deleted employees, and they will not appear in the main employee list.
- Emphasis has been placed on effective division of layers and writing clean, maintainable code.
- The design of the application has been made user-friendly and visually appealing.


## Contributions

Contributions to the project are welcome. If you encounter any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License
© 2024 Miri Krausz All rights reserved. mk6764576@gmail.com
