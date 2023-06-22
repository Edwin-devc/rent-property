const session = require('express-session');
const pool = require('../../connection');
const generateID = (firstCharacter) => {
    let gid = firstCharacter;
    const sampleSpace = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let i = 0; i < 5; i++) {
        gid += sampleSpace[Math.floor(Math.random() * sampleSpace.length)];
    }
    return gid;
}

exports.viewDashboard = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            throw err;
        } else {
            if (req.session.email) {
                const data = {};
                connection.query('SELECT * FROM client', (err, clients) => {
                    if (err) {
                        connection.release();
                        throw err;
                    } else {
                        data.clients = clients;
                        connection.query('SELECT * FROM landlord', (err, landlords) => {
                            if (err) {
                                connection.release();
                                throw err;
                            } else {
                                data.landlords = landlords;
                                connection.query
                            }
                           
                            res.render('pages/admin-dashboard', { data });
                        })
                    }
                    
                })
            } else {
                res.redirect('/');
            }


        }
    })
}

exports.addAdmin = (req, res) => {
    const guid = generateID('U');
    const gaid = generateID('A');
    const { email, password } = req.body;
    pool.getConnection((err, connection) => {
        if (!err) {
            connection.query('INSERT INTO user SET uid = ?, email = ?, password = ?, role = ?',[guid, email, password, 'Admin'], (err) => {
                if(!err) {
                    connection.query('INSERT INTO admin SET aid = ?, uid = ?', [gaid, guid], (err) => {
                        if (!err) {
                            const data = {};
                            connection.query('SELECT * FROM client', (err, clients) => {
                                if (err) {
                                    connection.release();
                                    throw err;
                                }
                                data.clients = clients;
                                connection.query('SELECT * FROM landlord', (err, landlords) => {
                                    connection.release();
                                    if (err) {
                                        throw err;
                                    }
                                    data.landlords = landlords;
            
                                    res.render('pages/admin-dashboard', { data });
                                })
                            })
                        } else {
                            throw err;
                        }
                    })
                } else {
                    throw err;
                }
            })
        } else {
            throw err;
        }
        
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