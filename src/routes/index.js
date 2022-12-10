import  {Router}  from 'express';
var router = Router();
import userRoutes from '../modules/user/user-route.js'
import postRoutes from '../modules/posts/posts-route.js'

/* GET home page. */
router.use('/get', async (req, res, next) => {
    res.status(200).send('W E L C O M E')
  });

  router.use('/user',userRoutes) 
  router.use('/post',postRoutes) 


export default router