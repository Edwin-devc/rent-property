const pool = require('../../connection'); 

exports.view = (req, res) => {
    res.render('pages/landlord-homepage');
}
exports.addProperty =  (req, res) => {
    const generateID = (firstCharacter) => {
        let gid = firstCharacter;
        const sampleSpace = [0,1,2,3,4,5,6,7,8,9];
        for (let i = 0; i < 5; i++) {
            gid += sampleSpace[Math.floor(Math.random()*sampleSpace.length)];
        }
        return gid;
    }
    prop_id = generateID('P');
    const {property_name, property_description, property_type} = req.body;
    pool.getConnection((err, connection) => {
        if(err) {
            throw err;
        } else {
            connection.query('INSERT INTO property_details SET property_ID = ?, property_name = ?, description = ?, type = ? ',[prop_id, property_name, property_description, property_type], (err) => {
                
                if (!err) {
                    throw err;
                } else {
                    connection.query("SELECT * FROM property_details", (err, rows) => {
                        connection.release();
                        if (!err) {
                            res.render('pages/landlord-homepage', { rows });
                        } else {
                            throw err;
                        }
                    })
                }
            })
        }
    })
}