const db = require('../config/database.js');
const bcrypt = require('bcrypt');

exports.getSiteList = async()=>{
    // try{
        const getSitesQuery = "SELECT distinct site from admin";
        
        return new Promise((resolve, reject) => {
            db.query(getSitesQuery, (err, result) => {
            if (err) {
                throw(err);
            } else {
                resolve(result[0]);
            }
            });
        });
 
    // }catch(error){
    //     throw error
    // }
}