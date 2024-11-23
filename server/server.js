const express = require('express');
const app = express();
const PORT = 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const jwt = require('jsonwebtoken');
const {expressjwt} = require('express-jwt')
const secretKey = "A totally very secret key";
const jwtMW = expressjwt({
    secret: secretKey,
    algorithms: ['HS256'],
});

const mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'sql5.freemysqlhosting.net',
    user: 'sql5746782',
    password : 'q2MVwhfSBH',
    database: 'sql5746782'
});
connection.connect((err) => {
    if (err) {
      console.error(err);
    }
});

let users = [
    {
        id: 1,
        username: 'smit',
        password: 'smit'
    }
];

app.post('/api/login', (req, res) => {
    const {username, password} = req.body;
    
    let user = users.find((usr) => {
        return (usr.username == username
             && usr.password == password);
    });

    if (user) {
        res.json({
           token: jwt.sign({id: user.id, username: user.username},
            secretKey, {expiresIn: '1h`'}),
           err: null
        });
    } else {
        res.status(401).json({
            token: null,
            err: 'Username or Password Incorrect'
        });
    }
});

app.get('/api/validate', jwtMW, (req, res) => {
    res.json({
        content: "Token valid"
    });
});

app.get('/api/energyUse', jwtMW, (req, res) => {
    connection.query('SELECT * FROM EnergyUse', function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
});

app.get('/api/energySources', jwtMW, (req, res) => {
    connection.query('SELECT * FROM EnergySource23', function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
});

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({
            error: "Invalid token"
        });
    } else {
        res.status(401).json({
            error: err
        });
    };
});

app.listen(PORT, () => {
    console.log(`API running on port ${PORT}`);
});