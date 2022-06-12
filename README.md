

## Description

Book renter app.

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
- Validation schemas exist just for demonstration purposes, they do not cover all endpoints, nor they are very useful
- return a book endpoint is missing, which should also consider quantity (E.G. user can borrow 5 copies but return only 3 at some point)
- deleting a book that's rented or user who rented the book should be considered from business perspective and implemented accordingly




