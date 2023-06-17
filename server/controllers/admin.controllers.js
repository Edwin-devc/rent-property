const pool = require('../../connection');
const generateID = (firstCharacter) => {
    let gid = firstCharacter;
    const sampleSpace = [0,1,2,3,4,5,6,7,8,9];
    for (let i = 0; i < 5; i++) {
        gid += sampleSpace[Math.floor(Math.random()*sampleSpace.length)];
    }
    return gid;
}

exports.viewDashboard = (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) {
            throw err;
        } else {
            const data = {};
            connection.query('SELECT * FROM client_details', (err, clients) => {
                if (err) {
                    connection.release();
                    throw err;
                }
                data.clients = clients;

                connection.query('SELECT * FROM landlord_details', (err, landlords) => {
                    connection.release();
                    if (err) {
                        throw err;
                    }
                    data.landlords = landlords;
                    
                    res.render('pages/admin-dashboard', { data });
                })
            })
            
            
        }
    })
}

exports.addAdmin = (req, res) => {
    const admin_id = generateID('A');
    const {email, password} = req.body;
    pool.getConnection((err, connection) => {
        connection.query('INSERT INTO admin SET id = ?, email = ?, password = ?', [admin_id, email, password], (err) => {
            connection.release();
            if(!err) {
                res.render('pages/admin-dashboard');
            } else {
                throw err;
            }
        })
    })
}
exports.viewRequests = (req, res) => {
    res.render('pages/admin-requests');
}
exports.viewClients = (req, res) => {
    res.render('pages/admin-clients');
}
exports.viewTenants = (req, res) => {
    res.render('pages/admin-tenants');
}
exports.viewLandlords = (req, res) => {
    res.render('pages/admin-landlords');
}
exports.viewProperty = (req, res) => {
    res.render('pages/admin-property');
}