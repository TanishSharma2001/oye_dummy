const { compareSync } = require("bcrypt");
const pool = require("../../config/db_config");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const {UserRoles} = require("./../../helper/enums");

const userRepository = require("./userRepository.js");


const loginUser = async(userData) => {
    const email = userData.email;
    const password = userData.password;
    try {       
        const isUserValid = await userRepository.getUserByEmail(email);
        if(isUserValid.rows[0]==null) {
            return {
                data: null,
                error: "Invalid user or password!"
            }
        }
        
        const isPasswordEqual = await bcrypt.compare(password, isUserValid.rows[0].password); 
        if(isPasswordEqual) {
            let userId = await userRepository.getUserIdByEmail(email);
            userId = userId.rows[0].id;
            return {
                data: userId,
                error: null
            };
        } else {
            return {
                data: null,
                error: "Invalid user or password!"
            }
        }
    } catch (err) {
        console.log("User service " + err.message);
        return {
            data: null,
            error: err.message
        }
    }
};

const registerUser = async(user) => {
    
    try {
        const userExists = await userRepository.getUserByEmail(user.email).rowCount;
        if (userExists) {
            return {
                data: null,
                error: "Email id already taken!"
            }
        }
    
        await userRepository.registerNewUser(user);
        let userId = await userRepository.getUserIdByEmail(user.email);
        userId = userId.rows[0].id;
        return {
            data: userId,
            error: null
        };
    } catch(err) {
        console.log(err.message);
        return {
            data: null,
            error: err.message
        }
    }
}

const deleteUserByAdmin = async(userData) => {
    try {
        userData.deleteUserId1 = Number(userData.deleteUserId )
        
        const {rows} = await userRepository.roleCheckHelper(userData.userId);
        
        const userToBeDeletedExists = await userRepository.getUserById(userData.deleteUserId1) != null;
       
        const isAdmin = rows[0].roles;
        
        if(!userToBeDeletedExists) {
            return {
                data: null,
                error: "User to be deleted doesn't exists!"
            };
        } else if (isAdmin!=UserRoles.ADMIN) {
            return {
                data: null,
                error: "Unauthorized access! Only admin allowed.."
            }
        } else {
            await userRepository.deleteUserById(userData.deleteUserId1);
            return {
                data: "DEL",
                error: null
            }
   
        }
    } catch (err) {
        console.log(err)
        console.log("deleteUserByAdmin service" + err.message,userData);
        return {
            data: null,
            error: err.message
        }
    }
}

module.exports = {
    loginUser,
    registerUser,
    deleteUserByAdmin
}