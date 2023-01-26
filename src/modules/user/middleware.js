
import { User } from "./user-model.js";

 const checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    username: req.body.username
     }).exec((err, user) => {
      if (err) {
      res.status(500).send({ msg: err });
      return;
      }

    if (user) {
      res.status(400).send({ msg: "Failed! Username is already in use!" });
      return;
    }

    // Email
    User.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ msg: err });
        return;
      }

      if (user) {
        res.status(400).send({ msg: "Failed! Email is already in use!" });
        return;
      }

      next();
    });
  });
};

const userAuth = async (req, res, next) => {
  try {
      const token = req.header("Authorization")

      if(!token) return res.status(400).json({msg: "Invalid Authentication."})

      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
      if(!decoded) return res.status(400).json({msg: "Invalid Authentication."})

      const user = await User.findOne({_id: decoded.id})
      req.user = user
      next()
  } catch (err) {
      return res.status(500).json({msg: err.message})
  }
}
export{checkDuplicateUsernameOrEmail,userAuth}