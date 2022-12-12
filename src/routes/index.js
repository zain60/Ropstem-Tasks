import  {Router}  from 'express';
var router = Router();
import userRoutes from '../modules/user/user-route.js';
import postRoutes from '../modules/posts/posts-route.js';
import RegisterLoginRoutes from '../modules/Register&Login/auth.routes.js';
import mesgRoutes from '../modules/messages/message-route.js'

  router.use('/RegisterORLoin',RegisterLoginRoutes) 
  router.use('/user',userRoutes) 
  router.use('/post',postRoutes) 
  router.use('/mesg',mesgRoutes) 


export default router