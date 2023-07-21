import dotenv from 'dotenv';
dotenv.config();

const config = {
  pinataApiKey: '2f4cc2a1d2d09211501f',
  pinataSecretApiKey: '9c0efb9a638c10d00121d7711de91608462e0e51dd5657c9b628612d40185a4c',
  mongodb: process.env.MONGO_URI,
  port: process.env.PORT,
};
export { config };
