const pool = require('../../connection');
exports.view = (req, res) => {
    if (req.session.user.email && req.session.user.uid) {
        pool.getConnection((err, connection) => {
            if (err) {
                throw err;
            } else {
                connection.query('SELECT * FROM property WHERE status = ?', ['approved'], (err, properties) => {
                    if (!err) {
                        connection.query('SELECT * FROM landlord', (err, landlords) => {
                            connection.release();
                            if (!err) {
                                res.render('pages/client-homepage', { properties, landlords });
                            } else {
                                throw err;
                            }
                        })
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

exports.comment = (req, res) => {
    res.render('pages/add-comment');
}

const generateID = (firstCharacter) => {
    let gid = firstCharacter;
    const sampleSpace = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let i = 0; i < 5; i++) {
        gid += sampleSpace[Math.floor(Math.random() * sampleSpace.length)];
    }
    return gid;
}

exports.addComment = (req, res) => {
    const comment = req.body.comment;
    const propid = req.params.id;
    const gkid = generateID('K');
    pool.getConnection((err, connection) => {
        if (!err) {
            connection.query('INSERT INTO comment SET kid = ?, comment = ?, pid = ?', [gkid, comment, propid], (err) => {
                connection.release();
                if (!err) {
                    res.redirect('/client');
                } else {
                    throw err;
                }
            })
        } else {
            throw err;
        }
    })
}

exports.like = (req, res) => {
    const propID = req.params.id;
    pool.getConnection((err, connection) => {
        if (err) {
            throw err;
        } else {
            connection.query('SELECT likes FROM property WHERE pid = ?', [propID], (err, prop) => {
                if (!err) {
                    let newLikes = prop[0].likes + 1;
                    connection.query('UPDATE property SET likes = ? WHERE pid = ?', [newLikes, propID], (err) => {
                        connection.release();
                        if (!err) {
                            res.redirect('/client');
                        } else {
                            throw err;
                        }
                    })
                } else {
                    console.log(err)
                }
            })
        }
    })
}
exports.dislike = (req, res) => {
    const propID = req.params.id;
    pool.getConnection((err, connection) => {
        if (err) {
            throw err;
        } else {
            connection.query('SELECT dislikes FROM property WHERE pid = ?', [propID], (err, prop) => {
                if (!err) {
                    let newDislikes = prop[0].dislikes + 1;
                    connection.query('UPDATE property SET dislikes = ? WHERE pid = ?', [newDislikes, propID], (err) => {
                        connection.release();
                        if (!err) {
                            res.redirect('/client');
                        } else {
                            throw err;
                        }
                    })
                } else {
                    console.log(err)
                }
            })
        }
    })
}

exports.viewClientRequests = (req, res) => {
    pool.getConnection((err, connection) => {
        if (!err) {
            connection.query('SELECT cid FROM client WHERE uid = ?', [req.session.user.uid], (err, client) => {
                if (err) {
                    connection.release();
                } else {
                    connection.query('SELECT status FROM clientrequest WHERE cid = ?', [client[0].cid], (err, requests) => {
                        if (!err) {
                            connection.query('SELECT * FROM property WHERE pid IN (SELECT pid FROM clientrequest WHERE cid = ?)', [client[0].cid], (err, propertyrequested) => {
                                connection.release();
                                if (!err) {
                                    res.render('pages/client-request', { requests, propertyrequested });
                                } else {
                                    console.log(err);
                                }
                            })
                        } else {
                            console.log(err);
                            connection.release();
                        }
                    })
                }
            })
        } else {
            connection.release();
        }
    })
}

exports.requestLease = (req, res) => {
    pool.getConnection((err, connection) => {
        if (!err) {
            connection.query('SELECT cid FROM client WHERE uid = ?', [req.session.user.uid], (err, client) => {
                if (!err) {
                    connection.query('INSERT INTO clientrequest SET rid = ?, cid = ?, pid = ?', [generateID('R'), client[0].cid, req.params.id]);
                    connection.release();
                    res.redirect('/client/requests');
                } else {
                    connection.release();
                    throw err;
                }
            })
        } else {
            throw err;
        }
    })
}