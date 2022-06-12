

## Description

For the simplicity of demonstration, DB is hosted on RDS and the app is hosted on EC2.
App can be accessed at http://3.71.82.164:3000/
I recommend checking out documentation first at /api to familiarize yourself with APIs available.
For testing purposes 2 accounts have been created:
- Admin account -> username: AdminDemo, password: admin
- User account -> username: UserDemo, password: user


## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

Current version has no test coverage


## additions required:
- A lot of edge cases have to be covered, like for example delete book route returns success even if book with that id doesnt exist - doesnt delete anything, or so that currentlyRented cant be higher than totalAmountAvailable at any point.
- Validation schemas exist just for demonstration purposes, they do not cover all endpoint and they are very basic
- deleting a book that's rented or user who rented the book should be considered from business perspective and implemented accordingly
- Error handling is very basic
- Logger should be added
- Endpoints missing: user settings (get, update, delete), return a book, cart...
- Search functionality to /gallery endpoint
- Registration is too basic ( at least password confirmation should be added)
- Payment integration




