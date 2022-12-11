
import {Post} from '../posts/posts-model.js';
import { comment } from './comment-model.js';

   const  createComment =  async (req, res) => {
        try {
            const { postId, content, tag, reply, postUserId } = req.body

            const post = await Post.findById(postId)
            if(!post) return res.status(400).json({msg: "This post does not exist."})

            if(reply){
                const cm = await comment.findById(reply)
                if(!cm) return res.status(400).json({msg: "This comment does not exist."})
            }

            const newComment = new comment({
                user: req.user._id, content, tag, reply, postUserId, postId
            })

            await Post.findOneAndUpdate({_id: postId}, {
                $push: {comments: newComment._id}
            }, {new: true})

            await newComment.save()

            res.json({newComment})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    };


  const  updateComment =  async (req, res) => {
        try {
            const { content } = req.body
            
            await comment.findOneAndUpdate({
                _id: req.params.id, user: req.user._id
            }, {content})

            res.json({msg: 'Update Success!'})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    };

   const likeComment = async (req, res) => {
        try {
            const commt = await comment.find({_id: req.params.id, likes: req.user._id})
            if(commt.length > 0) return res.status(400).json({msg: "You liked this post."})

            await comment.findOneAndUpdate({_id: req.params.id}, {
                $push: {likes: req.user._id}
            }, {new: true})

            res.json({msg: 'Liked Comment!'})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    };

   const  unLikeComment =  async (req, res) => {
        try {

            await comment.findOneAndUpdate({_id: req.params.id}, {
                $pull: {likes: req.user._id}
            }, {new: true})

            res.json({msg: 'UnLiked Comment!'})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    };

   const deleteComment =  async (req, res) => {
        try {
            const commet = await comment.findOneAndDelete({
                _id: req.params.id,
                $or: [
                    {user: req.user._id},
                    {postUserId: req.user._id}
                ]
            })

            await Post.findOneAndUpdate({_id: comment.postId}, {
                $pull: {comments: req.params.id}
            })

            res.json({msg: 'Deleted Comment!'})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    };


export{createComment,updateComment,likeComment,unLikeComment,deleteComment}
