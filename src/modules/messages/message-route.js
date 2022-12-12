import express from 'express';
const router = express.Router();
import {getMessages,createMessage,getConversations,deleteConversation,deleteMessages} from "../messages/message-services.js"


router.route('/createMessage').post(
    createMessage
);
router.route('/getConversations').get(
    getConversations
);
router.route('/getMessages').post(
    getMessages
);
router.route('/deleteMessages').get(
    deleteMessages
);
router.route('/deleteConversation').get(
    deleteConversation
);



export default router;