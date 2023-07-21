import jwt from 'jsonwebtoken';

const authUser = (req, res, next) => {
  const rf_token = req.headers.authorization.split(' ')[1];
  jwt.verify(rf_token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(400).json({ msg: 'you are not authorized.' });
    req.user = decoded;
    next();
  });
};

export { authUser };
