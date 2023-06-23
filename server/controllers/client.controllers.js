const pool = require('../../connection');
exports.view =(req, res) => {
    if (req.session.email && req.session.uid) {
        pool.getConnection((err, connection) => {
            if (err) {
                throw err;
            } else {
                connection.query('SELECT * FROM property WHERE status = ?', ['approved'], (err, properties) => {
                    connection.release();
                    if (!err) {
                        res.render('pages/client-homepage', { properties });
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
        if(!err) {
            connection.query('INSERT INTO comment SET kid = ?, comment = ?, pid = ?', [gkid, comment, propid], (err) => {
                connection.release();
                if(!err) {
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
                    connection.query('UPDATE property SET likes = ? WHERE pid = ?',[newLikes, propID], (err) => {
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
                    connection.query('UPDATE property SET dislikes = ? WHERE pid = ?',[newDislikes, propID], (err) => {
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
