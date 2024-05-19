## ERD
https://lucid.app/lucidchart/2cb45fd9-fe04-4aff-b9a8-e4908bd9bd19/edit?viewport_loc=-1674%2C-491%2C2448%2C1244%2C0_0&invitationId=inv_8e49b016-c05e-4071-8154-0c1dbc144796

## Dev usage
To : 
- build: npm run build;
- use knex-cli: npm run knex {knex-cli commands}

## /API Endpoints

#### /CARS
- GET /
returns a list of non-deleted Cars
- GET /:carId
returns the queried Car
- POST /
returns the newly created Car
- PATCH /:carId
returns the newly patched Car
- DELETE /:carId
returns nothing

#### /USERS
- GET /
returns a list of non-deleted Users
- GET /:userId
returns the queried User
- POST /
returns the newly created User
- PATCH /:userId
returns the newly patched User
- DELETE /:userId
returns nothing

#### /RENTALS
- GET /:userId
returns a list of Rentals by the specified User
- GET /:userId/:rentalId
returns the queried Rental 
- POST /:userId
returns the newly created Rental by the specified User
- PATCH /:userId/:rentalId
returns the newly patched Rental

#### /UPLOADS
##### /IMAGES/CARS
- GET /:carId
returns a list of Images of the specified Car
- POST /:carId
returns the newly uploaded Image of the specified Car
- DELETE /:carId/:imageId
returns nothing