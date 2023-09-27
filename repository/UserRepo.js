const { DATE } = require("sequelize");
const db = require("../config/database.js");
const bcrypt = require("bcrypt");

exports.create = async (name, dob, phone, email, password, suburb, site, image) => {
try{  const encrypted_password = await bcrypt.hash(password, 10);
  const insertUserQuery =
    "INSERT INTO user (id,name, dob, phone, email , password, suburb, site,  image) VALUES (UUID(), ?, ? ,? ,? ,?,?,?,?)";
  return db.query(insertUserQuery, [
    name,
    dob,
    phone,
    email,
    encrypted_password,
    suburb,
    site, 
    image,
  ]);
}catch(error){throw error}};

exports.createAdminUser = async (
  name,dob,phone,email, password, adminType, site,  image
) => {
  try{
  const encrypted_password = await bcrypt.hash(password, 10);
  const insertUserQuery =
    "INSERT INTO admin (id,name, dob, phone, email , password, type, site, image) VALUES (UUID(), ?, ? ,? ,? ,?,?,?,?)";
  return db.query(insertUserQuery, [
    name,
    dob,
    phone,
    email,
    encrypted_password,
    adminType,
    site, 
    image
  ]);}catch(error){
    console.log(error)
    throw error}
};

exports.updateUser = async (name,dob, phone,suburb,id) => {
    const insertUserQuery = 'UPDATE user SET name=?, dob=?, phone=?, suburb=? WHERE id= ?';
    return db.query(insertUserQuery, [ name,dob, phone, suburb , id]);
};

exports.updateAdmin = async (name,dob, phone,id) => {
    const insertUserQuery = 'UPDATE admin SET name=?, dob=?, phone=? WHERE id= ?';
    return db.query(insertUserQuery, [ name,dob, phone, id]);
};

exports.findByEmailUser = (email) => {
  const checkEmailQueryUser = "SELECT email FROM user WHERE email = ?";
  return new Promise((resolve, reject) => {
    db.query(checkEmailQueryUser, [email], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.length);
      }
    });
  });
};

exports.findByEmailAdmin = (email) => {
  const checkEmailQueryAdmin = "SELECT email FROM admin WHERE email = ?";
  return new Promise((resolve, reject) => {
    db.query(checkEmailQueryAdmin, [email], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.length);
      }
    });
  });
};

exports.findByIdUser = (id) => {
  const checkEmailQueryUser = "SELECT email FROM user WHERE id = ?";
  return new Promise((resolve, reject) => {
    db.query(checkEmailQueryUser, [id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.length);
      }
    });
  });
};

exports.findByIdAdmin = (id) => {
  const checkEmailQueryAdmin = "SELECT email FROM admin WHERE id = ?";
  return new Promise((resolve, reject) => {
      db.query(checkEmailQueryAdmin, [id], (err, result) => {
          if (err) {
          reject(err);
          } else {
          resolve(result.length);
          }
      });
  });
};

exports.checkPasswordMatchUser = async (email,password) => {
  const getPasswordUser = "SELECT password FROM user WHERE email = ?";
  const passworddb =await new Promise((resolve, reject) => {
    db.query(getPasswordUser, [email], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result[0].password);
      }
    });
  });
  return new Promise((resolve, reject) =>{
      bcrypt.compare(password, passworddb, (error, isMatch) => {
          if (error) {
              reject(err);
              return;
          }
          if (isMatch) {
              resolve(true);
          } else {
              resolve(false);            }
      });
  }) 
};

exports.checkPasswordMatchAdmin = async (email, password) => {
  const getPasswordAdimin = "SELECT password,type FROM admin WHERE email = ?";
  const passworddb = await new Promise((resolve, reject) => {
    db.query(getPasswordAdimin, [email], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result[0].password);
      }
    });
  });
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, passworddb, (error, isMatch) => {
      if (error) {
        reject(err);
        return;
      }
      if (isMatch) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
};

exports.getUser = async (email) => {
  const getUser = "SELECT * FROM user WHERE email = ?";
  return await new Promise((resolve, reject) => {
    db.query(getUser, [email], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result[0]);
      }
    });
  });
};

exports.getAdmin = async (email) => {
  const getAdmin = "SELECT * FROM admin WHERE email = ?";
  return await new Promise((resolve, reject) => {
    db.query(getAdmin, [email], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result[0]);
      }
    });
  });
};
exports.getAdminId = async (id) => {
  const getAdmin = "SELECT * FROM admin WHERE id = ?";
  return await new Promise((resolve, reject) => {
    db.query(getAdmin, [id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result[0]);
      }
    });
  });
};

exports.getUserId = async (id) => {
  const getUser = "SELECT * FROM user WHERE id = ?";
  return await new Promise((resolve, reject) => {
    db.query(getUser, [id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result[0]);
      }
    });
  });
};
  
exports.deleteUser = async (id) => {
    const deleteuser = "DELETE FROM user WHERE id = ?";
    return await new Promise((resolve, reject) => {
      db.query(deleteuser, [id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result[0]);
        }
      });
    });
};

exports.deleteAdmin = async (id) => {
    const deleteadmin = "DELETE FROM admin WHERE id = ?";
    return await new Promise((resolve, reject) => {
      db.query(deleteadmin, [id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result[0]);
        }
      });
    });
};

exports.getUsers = async () => {
  const getUsersQuery = `
  SELECT id, name, dob, phone, email, password, suburb, 'user' AS type, image FROM user
  UNION ALL
  SELECT id, name, dob, phone, email, password,NULL AS suburb, 'admin' AS type, image FROM admin WHERE name <> 'superadmin'
  `;
  return await new Promise((resolve, reject) => {
    db.query(getUsersQuery, [], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
        console.log("first",result)
      }
    });
  });
};

// get users by sites
exports.sortUserbySite = async (site) => {
  const getUsers = `SELECT id, name, dob, phone, email, password,NULL AS suburb, 'admin' AS type, site, image FROM admin WHERE site LIKE ? 
  UNION 
  SELECT id, name, dob, phone, email, password, suburb, 'user' AS type, site, image FROM user WHERE site LIKE ?`;;
  const searchSite = `%${site}%`;

  return await new Promise((resolve, reject) => {
    db.query(getUsers, [searchSite,searchSite], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
// get Admin by site
exports.searchAdminbySite = async (site) => {
  const getAdmin = `SELECT id, name, dob, phone, email, password,NULL AS suburb, 'admin' AS type, site, image FROM admin WHERE site LIKE ? `;
  const searchSite = `%${site}%`;

  return await new Promise((resolve, reject) => {
    db.query(getAdmin, [searchSite], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

exports.deleteVarificationCode = async (userId) => {
  const deleteOtp = "DELETE FROM forget_password WHERE user_id = ?";
  return await new Promise((resolve, reject) => {
    db.query(deleteOtp, [userId], (err, result) => {
      if (err) {
        reject(false);
      } else {
        resolve(true);
      }
    });
  });
};

exports.addVarificationCode = async (email, userId, varificationCode) => {
  const insertOtpQuery =
    "INSERT INTO forget_password (id,user_id, email,send_date, otp) VALUES (UUID(), ?, ? ,NOW(),?)";
  return await new Promise((resolve, reject) => {
    db.query(
      insertOtpQuery,
      [userId, email, varificationCode],
      (err, result) => {
        if (err) {
          reject(false);
        } else {
          resolve(true);
        }
      }
    );
  });
};

exports.verifyCode = async (userId, verificationCode) => {
  const getVerificationCode =
    "SELECT * FROM forget_password WHERE user_id = ? AND otp = ?";
  return await new Promise((resolve, reject) => {
    db.query(getVerificationCode, [userId, verificationCode], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

exports.searchUser = async (name) => {
  const getUsers = `SELECT id, name, dob, phone, email, password,NULL AS suburb, 'admin' AS type, site, image FROM admin WHERE name LIKE ? 
  UNION 
  SELECT id, name, dob, phone, email, password, suburb, 'user' AS type, site, image FROM user WHERE name LIKE ?`;;
  const searchName = `%${name}%`;

  return await new Promise((resolve, reject) => {
    db.query(getUsers, [searchName,searchName], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

exports.updatePassword = async (userId, updatePassword) => {
  const encrypted_password = await bcrypt.hash(updatePassword, 10);
  const updatePasswordQuery = "UPDATE user SET password=? WHERE id= ?";
  return await new Promise((resolve, reject) => {
    db.query(
      updatePasswordQuery,
      [encrypted_password, userId],
      (err, result) => {
        if (err) {
          reject(false);
        } else {
          resolve(true);
        }
      }
    );
  });
};
