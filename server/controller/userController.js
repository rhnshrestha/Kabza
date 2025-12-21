const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const{User} = require("../database/connect");

const registerUser = async(req, res)=>{
    try{
        const {username, email, password} = req.body;
        if(!username || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const existingUser = await User.findOne({
            where:{
                email
            }
        });

        if(existingUser){
            return res.status(400).json({
                message: "Username or email already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        });

        res.status(200).json({
            message: "User registered successfully",
            newUser
        })
    }catch(error){
        res.status(500).json({
            message: "error registering user"
        });
    }
}

const loginUser = async(req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const user = await User.findOne({
            where: {email}
        });

        if(!user){
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        isValidPassword = await bcrypt.compare(password, user.password);

        if(!isValidPassword){
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }
        
        const token = jwt.sign({
            id: user.id,
            email: user.email
        }, process.env.JWT_SECRET || "this-is-secret", {expiresIn: "1d"}
        );

        res.status(200).json({
            message: "Login Successfull",
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            },
            token
        });

    } catch (error) {
        console.log("login error" + error);
        res.status(400).json({
            message: "Server error logging in"
        })
    }
}

module.exports = {
    registerUser, loginUser
}