//load node modules
const express = require('express');
const mysql = require('mysql');
const ejs = require('ejs');

//initialize Express
const app = express();

//render the static files
app.use(express.static('public'));
//set the view to EJS engine
app.set('view engine', 'ejs');
app.set('partials', 'views/partials')

// let connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'property_management'
// });
//
// connection.connect((err) => {
//     if(err) {
//         throw err;
//     } else {
//         console.log('Connected');
//         connection.query('SELECT * FROM client_details', (err, result) => {
//             if(err) throw err;
//             console.log(result);
//         })
//     }
// })


//app runs on port 5000
app.listen(5000);


//root route
app.get('/', (request, response) => {
    const name = 'Edwin'
    response.render('pages/index', {
        name:name
    });
})
