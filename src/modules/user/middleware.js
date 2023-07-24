import { User } from './user-model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const validateUserRegistration = async (req, res, next) => {
  const { method } = req.body;
  if (!method) {
    return res
      .status(400)
      .json({ msg: 'Please select a valid method (Using Metamask or using Email address) for SignUp' });
  }
  if (method === 'email') {
    return validateEmailRegistration(req, res, next);
  } else {
    return validateAddressRegistration(req, res, next);
  }
};

// Middleware to validate user registration using email
const validateEmailRegistration = async (req, res, next) => {
  const { username, email } = req.body;
  if (!username) {
    return res.status(400).json({ msg: 'Please provide a valid username' });
  } else if (!email) {
    return res.status(400).json({ msg: 'Please provide a valid email' });
  }
  try {
    // Check if username already exists in the database
    const userByUsername = await User.findOne({ username });
    if (userByUsername) {
      return res.status(400).json({ msg: 'Failed! Username is already in use!' });
    }

  // Check if email already exists in the database
    const userByEmail = await User.findOne({ email: email });
    if (userByEmail) {
      return res.status(400).json({ msg: 'Failed! Email is already in use!' });
    }
  } catch (err) {
    return res.status(500).json({ msg: 'Internal server error' });
  }

  next();
};

const validateAddressRegistration = async (req, res, next) => {
  const { address } = req.body;

  if (!address) {
    return res.status(400).json({ msg: 'Please provide a valid address' });
  }

  try {
    // Check if address already exists in the database
    const userByAddress = await User.findOne({ address: address });
    if (userByAddress) {
      return res.status(400).json({ msg: 'Failed! This user address already exists!' });
    }
  } catch (err) {
    return res.status(500).json({ msg: 'Internal server error' });
  }
  next();
};



const logInValidations = async (req, res, next) => {
  const { method } = req.body;
  if (method === 'email') {
    return validateEmailLogin(req, res, next);
  } else {
    return validateAddressLogin(req, res, next);
  }
};

// Middleware to validate login using email
const validateEmailLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(400).json({ msg: 'This email does not exist' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ msg: 'Password is incorrect' });
  }

  next();
};

// Middleware to validate login using address
const validateAddressLogin = async (req, res, next) => {
  const { address } = req.body;
  if (!address) {
    return res.status(400).json({ msg: 'Please provide address' });
  }

  const user = await User.findOne({ address: address });
  if (!user) {
    return res.status(400).json({ msg: 'user Not Found! Please sign up First' });
  }

  next();
};

// const userAuth = async (req, res, next) => {
//   try {
//     const token = req.header('Authorization');
//     if (!token) return res.status(400).json({ msg: 'Invalid Authentication.' });
//     const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//     if (!decoded) return res.status(400).json({ msg: 'Invalid Authentication.' });
//     const user = await User.findOne({ _id: decoded.id });
//     req.user = user;
//     next();
//   } catch (err) {
//     return res.status(500).json({ msg: err.message });
//   }
// };

export { validateUserRegistration, logInValidations };
