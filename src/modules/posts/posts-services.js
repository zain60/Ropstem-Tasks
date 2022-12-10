
import { async } from "recursive-fs/lib/copy.js";
import { Post } from "../posts/posts-model.js";
import { user } from "../user/user-model.js";

class APIfeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }

    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = (page - 1) * limit
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}


    const createPost = async(req,res) => {

        const {content,images,user} = req.body 
        
        if(images.length === 0)
            return res.status(400).json({msg: "Please add your photo."})
    
        var postObject = new Post({
            content,
            images,
            user

        })
        await Post.create(postObject).then(()=>{
            res.status(200).send("post Created")
        })
    
    };

    //  get Posts
    const getPost = async(req,res)=>{
        try {
            const features =  new APIfeatures(Post.find({
                user: [req.user]
            }), req.query).paginating()

            const posts = await features.query.sort('-createdAt')
            .populate("user likes", "avatar username fullname followers")
            .populate({
                path: "comments",
                populate: {
                    path: "user likes",
                    select: "-password"
                }
            })

            res.json({
                msg: 'Success!',
                result: posts.length,
                posts
            })

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
    // //update a post
    // const updatePost = async(req,res) => {
    //     try {
    //         const post = await Post.findById(req.params.id);
    //         if (post.userId === req.body.userId) {
    //           await post.updateOne({ $set: req.body });
    //           res.status(200).json("the post has been updated");
    //         } else {
    //           res.status(403).json("you can update only your post");
    //         }
    //       } catch (err) {
    //         res.status(500).json(err);
    //       }
    // }



    export{createPost,getPost};