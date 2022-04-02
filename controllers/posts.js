const Post = require('../models/post')
const User = require('../models/user')

module.exports = {
    create,
    getAll,
    postForUsers,
    deleteOne
}

async function create(req, res) {
    try {
        const post = await Post.create({
            id: req.body.id,
            title: req.body.title,
            description: req.body.description,
            categories: req.body.categories,
            user: req.user._id,
            firstname: req.body.firstname,

        });
        console.log(post)
        console.log("this is the req.user", req.user)
        console.log("this is id", req.user._id)

        User.findById(req.user._id, function (err, user) {
            user.posts.push(post);
            user.save();
            console.log("this is req.user", User.posts)
        })
        res.status(200).json('post made in the database')
    } catch (err) {
        res.json(err);
    }
}

async function getAll(req, res) {
    try {
        let posts = await Post.find({})

        res.status(200).json(posts)
    } catch (err) {
        res.json(err);
    }
}

async function postForUsers(req,res){
    try{
        const post = await Post.find({user: req.user._id})
        .populate('user')
        .exec();
        console.log("this is the", post)
        console.log("this is users id:", req.user._id)
        res.status(200).json(post);
        
        
    } catch(err){
        console.log(err);
    }
}

async function deleteOne(req, res){
    try{
        let post = await Post.findByIdAndDelete({_id: req.params.id})
        
        console.log("this is req.params", req.params.id)
        console.log("this is the post", post)
        let newpostlist = await Post.find({user: req.user._id})
        console.log("this is the new", newpostlist)
        res.status(200).json(newpostlist)
        

    } catch(err){
        console.log(err)
    }
}


// module.exports = {
//     create,
//     update, 
//     deletePost,
//     GetPost
// }

// // async function create(req, res){
    
// //         const newPost = new Post(req.body);
// //         try{
// //             const savedPost = await newPost.save();
// //             res.status(200).json(savedPost)
        
// //         }catch(err){
// //             res.status(500).json(err)
    
// //         }
   
// // }

// async function create(req, res){
//     try {
//        const newPost = await PostModel.create({post: req.body.post})
//        const savedPost = await newPost.save();
//            res.status(200).json(savedPost)
//     }catch(err){
//          res.status(500).json(err)
//         }
// }

// async function update(req, res){
//     try{
//         const post = await Post.findById(req.params.id);
//         const updatedPost = await Post.findByIdAndUpdate(
//             req.params.id, {
//                 $set: req.body,
//             },
//             {new: true}
//         );

//         res.status(200).json(updatedPost);

//     }catch(err){
//         res.status(500).json(err)
//     }
// }

// async function deletePost(req, res){
//     try {
//         const post = await Post.findById(req.params.id);
//         await post.delete()
//         res.status(200).json("post has been deleted");

//     } catch(err){
//         res.status(500).json(err)

//     }
// }

// async function GetPost(req, res){
//     try{
//         const post = await Post.findById(req.params.id);
//         res.status(200).json(post);
//     } catch(err){
//         res.status(500).json(err);
//     }
// }