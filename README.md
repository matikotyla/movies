# Movies Application

Movies application where you can log in and add your favourite movies to the list

## Stack

This application was made using React and Express
Full list of tools used to make this application:

```
- React
- Express
- MongoDB
- Bootstrap
- React Router
- JWT
- Passport JS
- Validate JS
```

# Before you start
Before you run the application you got to make a .env file and add
your own secret to use JWT and path to your MongoDB directory.
For example it may look like this

```
SECRET = mysuperprivatesecret
MONGO_URL = mongodb://localhost/movies
```

# How to run this application
To run this application you gotta run this commands in your console:

```
npm run server
npm start
```

The first one start the backend server on port 7000 and provides connection your rest api server.
The second one is used to serve static html, scss files and react js files on port 3000.

# How to use this application

To use this application you have to type
```
http://localhost:3000
```
You'll be redirected to home page, where you might log in or register.

# Database

To check all existing users or movies you have to run
```
mongo
```
in your mongo db folder, next type
```
use movies
db.users.find().pretty()
db.movies.find().pretty()
```
it'll show you all existing users and movies in the database.