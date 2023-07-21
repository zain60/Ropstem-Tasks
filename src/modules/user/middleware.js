import { User } from './user-model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const checkValidations = async (req, res, next) => {
  const { username, email, address, method } = req.body;

  if (method === 1) {
    if (!username || !email) {
      return res.status(400).json({ msg: 'Please provide valid username and email' });
    }
    try {
      const userByUsername = await User.findOne({ username: username });
      if (userByUsername) {
        return res.status(400).json({ msg: 'Failed! Username is already in use!' });
      }

      const userByEmail = await User.findOne({ email: email });
      if (userByEmail) {
        return res.status(400).json({ msg: 'Failed! Email is already in use!' });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
    next();
  } else {
    if (!address) {
      return res.status(400).json({ msg: 'Please provide a valid address' });
    }
    try {
      const userByAddress = await User.findOne({ address: address });
      if (userByAddress) {
        return res.status(400).json({ msg: 'Failed! This user address already exists!' });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }

    next();
  }
};

const logInValidations = async (req, res, next) => {
  const { email, password, method, address } = req.body;
  if (method == 1) {
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: 'This email does not exist' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Password is incorrect' });
  } else {
    if (!address) {
      return res.status(400).json({ msg: 'Please provide address' });
    }
    let user = await User.findOne({ address: address });
    if (!user) return res.status(400).json({ msg: 'user Not Found.! Please sigup First' });
  }
  next();
};

const userAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization');

    if (!token) return res.status(400).json({ msg: 'Invalid Authentication.' });

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!decoded) return res.status(400).json({ msg: 'Invalid Authentication.' });

    const user = await User.findOne({ _id: decoded.id });
    req.user = user;
    next();
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

export { checkValidations, userAuth, logInValidations };
