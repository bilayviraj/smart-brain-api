const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');
const profile = require('./controllers/profile');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'test',
      database : 'smart-brain'
    }
  });

const app = express();

app.use(bodyParser.json());
app.use(cors());


app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt))

app.get('/', (req, res) => {
    res.send(database.users);
})


app.post('/signin', signin.handleSignin(db, bcrypt))

app.put('/image', (req, res) => image.handleImage(req, res, db))

app.get('/profile/:id', (req, res) => profile.handleProfile(req, res, db))

app.post('/imageurl', (req, res) => image.handleApiCall(req, res))


app.listen(3000, () => {
    console.log('app is running on port 3000')
})



// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });



/*

/signin --> POST = success/fail
/register --> POST = user
/profile/:userid --> GET = user
/image --> PUT = user

*/