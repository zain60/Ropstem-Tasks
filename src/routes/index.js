import  {Router}  from 'express';
var router = Router();
// import contractRoutes from '../modules/smartcontract/contract-route.js';
// import metadataRoutes from '../modules/metaData/metadata-route.js'
import collectionRoutes from '../modules/collection/collection_route.js'

/* GET home page. */
router.use('/get', async (req, res, next) => {
    res.status(200).send('W E L C O M E')
  });

//   router.use('/contract',contractRoutes);

//   router.use('/uploadMetadata',metadataRoutes) 

  router.use('/collection',collectionRoutes) 

  // router.use('/uploadNfts', async (req, res, next) => {
  //   res.status(200).send('uploadNfts')
  // });

export default router