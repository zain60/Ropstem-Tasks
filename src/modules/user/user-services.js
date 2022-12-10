
import { user } from "./user-model.js";
import bcrypt from "bcrypt";

//  === > Register OR signup New User
 
const signUp = async(req,res) => {

    const {firstName,LastName,email,password} = req.body 

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    var userObject = new User({
        userName:firstName+LastName,
        email : email,
        password:hashedPassword,
    })

    try {
        await user.create(userObject).then(()=>{
            res.status(200).send("user Registered")
        }) 
    } catch (error) {
        res.status(400).send(error)
    }
};


//  === > LOgin into  User Account

const logIn = async (req,res) => {
    const { email, password } = req.body

    try {
      let user = await user.findOne({
        email
      })
      !user&& res.status(404).json("user not found");

      const validPassword = await bcrypt.compare(password, user.password);
      !validPassword && res.status(404).json("wrong password");
       if(validPassword){
        res.status(200).json("LogedIN Successfully")

    }}
   catch(error){
     return res.status(400).json({
    message: 'Incorrect credentials '
 })

}
}

export {signUp,logIn}