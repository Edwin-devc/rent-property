//load node modules
const express = require('express');
const mysql = require('mysql');
const ejs = require('ejs');
const bodyParser = require('body-parser')

//initialize Express
const app = express();

//render the static files
app.use(express.static('public'));
//set the view to EJS engine
app.set('view engine', 'ejs');
app.set('partials', 'views/partials')

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'property_management'
});

connection.connect((err) => {
    if(err) {
        throw err;
    } else {
        console.log('Connected');
        connection.query('SELECT * FROM client_details', (err, result) => {
            if(err) throw err;
            console.log(result);
        })
    }
})

app.use(bodyParser.urlencoded({ extended: false}));

//app runs on port 5000
app.listen(5000);

//TO DO
const routes = {

}

//root route
app.get('/', (req, res) => {
    const name = 'Edwin'
    res.render('pages/index', {
        name:name
    });
})

app.post('/login', (req,res) => {
    const email = req.body.email;
    console.log(email);
    res.redirect('/admin');
})

app.get('/landlord', (req, res) => {
    res.render('pages/landlord-homepage');
})

app.get('/client', (req, res) => {
    res.render('pages/client-homepage')
})

app.get('/admin', (req, res) => {
    res.render('pages/admin-dashboard');
})

 app.get('/admin/dashboard', (req, res) => {
    res.render('pages/admin-dashboard')
 });

 app.get('/admin/requests', (req, res) => {
    res.render('pages/admin-requests');
 });

 app.get('/admin/clients', (req, res) => {
    res.render('pages/admin-clients');
 })

app.get('/admin/tenants', (req, res) => {
    res.render('pages/admin-tenants');
})

app.get('/admin/landlords', (req, res) => {
    res.render('pages/admin-landlords');
})

app.get('/admin/property', (req, res) => {
    res.render('pages/admin-property')
})