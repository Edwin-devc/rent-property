const pool = require('../../connection');

exports.view = (req, res) => {
    if (req.session.user.email && req.session.user.uid) {
        pool.getConnection((err, connection) => {
            if (err) {
                throw err;
            } else {
                connection.query('SELECT * FROM property WHERE lid IN (SELECT lid FROM landlord WHERE uid = ?)', [req.session.user.uid], (err, properties) => {
                    connection.release();
                    if (!err) {
                        res.render('pages/landlord-homepage', { properties });
                    } else {
                        throw err;
                    }
                })
            }
        })
        
    } else {
        res.redirect('/');
    }
}

exports.addProperty = (req, res) => {
    const generateID = (firstCharacter) => {
        let gid = firstCharacter;
        const sampleSpace = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        for (let i = 0; i < 5; i++) {
            gid += sampleSpace[Math.floor(Math.random() * sampleSpace.length)];
        }
        return gid;
    }

    const prop_id = generateID('P');
    const { property_name, property_description, property_type, location_name, bedrooms, cost, bathrooms } = req.body;
    pool.getConnection((err, connection) => {
        if (err) {
            throw err;
        } else {
            connection.query('SELECT * FROM landlord WHERE uid = ?', [req.session.user.uid], (err, row) => {
                if (err) {
                    throw err;
                } else {
                    const newLid = row[0].lid;
                    connection.query('INSERT INTO property SET pid = ?, name = ?, type = ?, location = ?, description = ?, bedrooms = ?, bathrooms = ?, cost = ?, lid = ?, photo = ?', [prop_id, property_name, property_type, location_name, property_description, bedrooms, bathrooms, cost, newLid, req.file.filename], (err) => {
                        connection.release();
                        if (!err) {
                            res.redirect('/landlord');
                        } else {
                            throw err;
                        }
                    })
                }
            })
            
        }
    })
}

exports.viewProperty = (req, res) => {
    const searchId = req.params.id;
    pool.getConnection((err, connection) => {
        if(!err) {
            connection.query('SELECT * FROM property WHERE pid = ?', [searchId], (err, properties) => {
                if(!err) {
                    connection.query('SELECT comment FROM comment WHERE pid = ?', [searchId], (err, comments) => {
                        connection.release();
                        if(!err) {
                            res.render('pages/view-property', { properties, comments });
                        } else {
                            console.log(err);
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

exports.editProperty = (req, res) => {
    const searchId = req.params.id;
    pool.getConnection((err, connection) => {
        if(!err) {
            connection.query('SELECT * FROM property WHERE pid = ?', [searchId], (err, properties) => {
                connection.release();
                if(!err) {
                    res.render('pages/edit-property', { properties });
                } else {
                    throw err;
                }
            })
        } else {
            throw err;
        }
    }) 
}

exports.updateProperty = (req, res) => {
    const searchId = req.params.id;
    const { property_name, property_description, property_type, location_name, bedrooms, cost, bathrooms } = req.body;
    pool.getConnection((err, connection) => {
        if(!err) {

            connection.query('UPDATE property SET name = ?, type = ?, location = ?, description = ?, bedrooms = ?, bathrooms = ?, cost = ? WHERE pid = ?', [property_name, property_type, location_name, property_description, bedrooms, bathrooms, cost, searchId], (err) => {
                connection.release();
                if(!err) {
                    res.redirect('/landlord');
                } else {
                    throw err;
                }
            })
        } else {
            throw err;
        }
    }) 
}
exports.deleteProperty = (req, res) => {
    const searchId = req.params.id;
    pool.getConnection((err, connection) => {
        if(!err) {
            connection.query('DELETE FROM property WHERE pid = ?', [searchId], (err) => {
                connection.release();
                if(!err) {
                    res.redirect('/landlord');
                } else {
                    throw err;
                }
            })
        } else {
            throw err;
        }
    }) 
}

exports.viewLandlordRequests = (req, res) => {
    res.render('pages/landlord-requests');
}