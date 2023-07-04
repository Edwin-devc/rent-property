/*const session = require('express-session');*/
const pool = require('../../connection');

exports.mainView = (req, res) => {
    res.render('pages/index');
}

exports.authenticateUser = (req, res) => {
    pool.getConnection((err, connection) => {
        const { email_login, password_login} = req.body;
        if (err) {
            throw err;
        } else {
            connection.query('SELECT * FROM user WHERE email = ? AND password = ?', [email_login, password_login], (err, row) => {
                if(err) {
                    throw err;
                } else {
                    if(row.length != 0) {
                        const user = row[0];
                        req.session.user = user;
                        if(req.session.user.role === 'Admin') {
                            res.redirect('/admin');
                        } else if (req.session.user.role === 'Client') {
                            res.redirect('/client'); 
                        } else if (req.session.user.role === 'Landlord') {
                            res.redirect('/landlord');
                        } else if (req.session.user.role === 'Tenant') {
                            req.session.email = req.body.email_login;
                            res.redirect('/tenant');
                        }
                    } else {
                        res.redirect('/');
                    }
                    
                }
                
            })
        }       

    })


}
const generateID = (firstCharacter) => {
    let gid = firstCharacter;
    const sampleSpace = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let i = 0; i < 5; i++) {
        gid += sampleSpace[Math.floor(Math.random() * sampleSpace.length)];
    }
    return gid;
}

exports.registerUser = (req, res) => {
    const {firstname, lastname, contact, email, password, role} = req.body;
    const guid = generateID('U');
    pool.getConnection((err, connection) => {
        if(!err) {
            connection.query('INSERT INTO user SET uid = ?, email = ?, password = ?, role = ?',[guid, email, password, role],(err) => {
                if(!err) {
                    if(req.body.role === 'Client') {
                        const gcid = generateID('C');
                        connection.query('INSERT INTO client SET cid = ?, firstname = ?, lastname = ?, contact = ?, uid = ?', [gcid, firstname, lastname, contact, guid], (err) => {
                            connection.release
                            if (!err) {
                                res.redirect('/');
                            } else {
                                throw err;
                            }
                        })
                    } else {
                        const glid = generateID('L')
                        connection.query('INSERT INTO landlord SET lid = ?, firstname = ?, lastname = ?, contact = ?, uid = ?', [glid, firstname, lastname, contact, guid], (err) => {
                            connection.release
                            if (!err) {
                                res.redirect('/');
                            } else {
                                throw err;
                            }
                        })
                    }
                    
                } else {
                    throw err;
                }
            })
        }
    })
} 
