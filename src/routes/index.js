import  {Router}  from 'express';
var router = Router();
import collectionRoutes from '../modules/collection/collection_route.js'
import NftRoutes from '../modules/nft/nft-route.js'

/* GET home page. */
router.use('/get', async (req, res, next) => {
    res.status(200).send('W E L C O M E')
  });

  router.use('/collection',collectionRoutes) 
  router.use('/Nft',NftRoutes) 


export default router