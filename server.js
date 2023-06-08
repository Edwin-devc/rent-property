const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const pool = require('./connection.js');

const app = express();

const port = process.env.PORT || 5000;

app.use(express.static('public'));

//set the view to EJS engine
app.set('view engine', 'ejs');
app.set('partials', 'views/partials')


app.use(bodyParser.urlencoded({ extended: false}));

app.listen(port, () => console.log(`Running on port ${port}`));

app.get('/', (req, res) => {

    res.render('pages/index');
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