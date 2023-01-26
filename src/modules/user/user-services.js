
import { User } from '../user/user-model.js';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';



   const signup = async (req, res) => {
        try {
            const {username, email} = req.body
            let newUserName = username.toLowerCase().replace(/ /g, '')

            const user_name = await User.findOne({username: newUserName})
            if(user_name) return res.status(400).json({msg: "This user name already exists."})

            const user_email = await User.findOne({email})
            if(user_email) return res.status(400).json({msg: "This email already exists."})

            const userPassword = Math.random().toString(36).slice(-8);

            const passwordHash = await bcrypt.hash(userPassword, 12)  

            const newUser = new User({
                username: newUserName,
                email,
                password: passwordHash,
               })       
            await newUser.save()


            let transporter = nodemailer.createTransport({
                   host: 'smtp.gmail.com',
                   secure:false,
                   port: 587,
                   auth: {
                       user: "zainengr00@gmail.com",
                       pass: "zmtbnbahxulpekgd"
                   }
           })
    
         const mailOptions = {
            from: "zainengr00@gmail.com",
            to: email,
            text: `Welcome ${username}! Your password is ${userPassword} and your Token.`,
            html: `<p>Welcome <b>${User.name}</b>! Your password is <b>${userPassword}</b>.</p>`
          };
       transporter.sendMail(mailOptions, function(err, info) {
            if (err) {
              console.log(err)
            } else {
              console.log(info);
            }
        });
            
         
            return res.status(200).json({
                msg:"User was registered successfully! Please check your email",
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    };


    const login = async (req, res) => {
        try {
            const {email, password } = req.body
            console.log("email",email)
            const user = await User.findOne({email:email})
            if(!user) return res.status(400).json({msg: "This email does not exist"})

            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) return res.status(400).json({msg: "Password is incorrect"})

            const access_token = createAccessToken({id: user._id})
            console.log(access_token)

            res.json({
                msg: 'Login Success!',
                access_token
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    };


   const logout =  async (req, res) => {
        try {
            res.clearCookie('refreshtoken', {path: '/api'})
            return res.json({msg: "Logged out!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    };

    const generateAccessToken = async (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken
            if(!rf_token) return res.status(400).json({msg: "Please login now."})

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, async(err, result) => {
                if(err) return res.status(400).json({msg: "Please login now."})
                const access_token = createAccessToken({id: result.id})

                res.json({
                    access_token,
                })
            })
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }


const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'})
}

export{signup,login,logout}