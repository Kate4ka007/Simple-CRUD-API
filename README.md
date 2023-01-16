# CRUD-API
### Setup

```bash
npm install
```

### Development with nodemon 

```bash
npm run start:dev
```

### Run without nodemon 

```bash
npm run start:prod
```

## Postman

Setup Postman to test CRUP API

## Usage

### Get all users

![Example Get all users](src/assets/get_users.JPG)

- Server should answer with status code 200 and all users records

### Post (Create) user

![Example Post (Create) new user](src/assets/post_user.JPG)

- Server should answer with status code 201 and newly created record
- Server should answer with status code 400 and corresponding message if request body does not contain required fields

### Get by Id

![Example Get by ID](src/assets/get_user_id.JPG)

- Server should answer with status code 200 and and record with id === userId if it exists
- Server should answer with status code 400 and corresponding message if userId is invalid (not uuid)
- Server should answer with status code 404 and corresponding message if record with id === userId doesn't exist

### Put (Update) user

![Example Put (Update)](src/assets/put_user.JPG)

- Server should answer with status code 200 and updated record
- Server should answer with status code 400 and corresponding message if userId is invalid (not uuid)
- Server should answer with status code 404 and corresponding message if record with id === userId doesn't exist

### Delete Record

![Example Delete](src/assets/delete_404.JPG)

- Server should answer with status code 204 if the record is found and deleted
- Server should answer with status code 400 and corresponding message if userId is invalid (not uuid)
- Server should answer with status code 404 and corresponding message if record with id === userId doesn't exist


Users are stored as objects that have following properties:
  * id — unique identifier (string, uuid) generated on server side
  * username — user's name (string, required)
  * age — user's age (number, required)
  * hobbies — user's hobbies (array of strings or empty array, required)
