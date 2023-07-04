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
            if (req.session.user.email) {
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
                                connection.query('SELECT * FROM property', (err, properties) => {

                                    if (err) {
                                        connection.release();
                                        throw err;
                                    } else {
                                        data.properties = properties;
                                        res.render('pages/admin-dashboard', { data });

                                    }
                                })

                            }

                        })
                    }

                })
                // const data = {};
                // connection.query('SELECT * FROM client', (err, clients) => {
                //     if (err) {
                //         connection.release();
                //         throw err;
                //     } else {
                //         data.clients = clients;
                //         connection.query('SELECT * FROM landlord', (err, landlords) => {
                //             if (err) {
                //                 connection.release();
                //                 throw err;
                //             } else {
                //                 data.landlords = landlords;
                //                 connection.query
                //             }

                //             res.render('pages/admin-dashboard', { data });
                //         })
                //     }

                // })
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
            connection.query('INSERT INTO user SET uid = ?, email = ?, password = ?, role = ?', [guid, email, password, 'Admin'], (err) => {
                if (!err) {
                    connection.query('INSERT INTO admin SET aid = ?, uid = ?', [gaid, guid], (err) => {
                        if (!err) {
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
                                            connection.query('SELECT * FROM property', (err, properties) => {

                                                if (err) {
                                                    connection.release();
                                                    throw err;
                                                } else {
                                                    data.properties = properties;
                                                    res.render('pages/admin-dashboard', { data });

                                                }
                                            })

                                        }

                                    })
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
        } else {
            throw err;
        }

    })
}
exports.viewRequests = (req, res) => {
    pool.getConnection((err, connection) => {
        if (!err) {
            connection.query('SELECT * FROM property WHERE status = ?',['pending'], (err, requests) => {
                connection.release();
                if (!err) {
                    res.render('pages/admin-requests', { requests });
                } else {
                    throw err;
                }
            })  
        } else {
            throw err;
        }
    })
}
exports.approveProperty = (req, res) => {
    const targetId = req.params.id;
    pool.getConnection((err, connection) => {
        if (!err) {
            connection.query('UPDATE property SET status = ? WHERE pid = ?',['approved', targetId], (err) => {
                connection.release();
                if (!err) {
                    res.redirect('/admin/requests');
                } else {
                    throw err;
                }
            })  
        } else {
            throw err;
        }
    })
}
exports.rejectProperty = (req, res) => {
    const targetId = req.params.id;
    pool.getConnection((err, connection) => {
        if (!err) {
            connection.query('UPDATE property SET status = ? WHERE pid = ?',['rejected', targetId], (err) => {
                connection.release();
                if (!err) {
                    res.redirect('/admin/requests');
                } else {
                    throw err;
                }
            })  
        } else {
            throw err;
        }
    })
}
exports.reviewProperty = (req, res) => {
    const targetId = req.params.id;
    pool.getConnection((err, connection) => {
        if (!err) {
            connection.query('SELECT * FROM property WHERE pid = ?',[targetId], (err, property) => {
                connection.release();
                if (!err) {
                    res.render('pages/admin-review-property', { property });
                } else {
                    throw err;
                }
            })  
        } else {
            throw err;
        }
    })
}



exports.viewClients = (req, res) => {
    pool.getConnection((err, connection) => {
        if (!err) {
            connection.query('SELECT * FROM client', (err, clients) => {
                connection.release();
                if (!err) {
                    res.render('pages/admin-clients', { clients });
                } else {
                    throw err;
                }
            })
            
        } else {
            throw err;
        }
    })
}

exports.viewTenants = (req, res) => {
    res.render('pages/admin-tenants');
}

exports.viewLandlords = (req, res) => {
    pool.getConnection((err, connection) => {
        if (!err) {
            connection.query('SELECT * FROM landlord', (err, landlords) => {
                connection.release();
                if (!err) {
                    res.render('pages/admin-landlords', { landlords });
                } else {
                    throw err;
                }
            })  
        } else {
            throw err;
        }
    })
}
exports.viewProperty = (req, res) => {
    pool.getConnection((err, connection) => {
        if (!err) {
            connection.query('SELECT * FROM property', (err, properties) => {
                connection.release();
                if (!err) {
                    res.render('pages/admin-property', { properties });
                } else {
                    throw err;
                }
            })  
        } else {
            throw err;
        }
    })
}