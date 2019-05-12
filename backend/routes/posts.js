const Post =require('../models/posts');
const express =require('express');
const Router=express.Router();
const checkAuth=require('../middleware/check-auth');
const multer=require('multer');

const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg"
  };
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const isValid = MIME_TYPE_MAP[file.mimetype];
      let error = new Error("Invalid mime type");
      if (isValid) {
        error = null;
      }
      cb(error, "backend/images");
    },
    filename: (req, file, cb) => {
      const name = file.originalname
        .toLowerCase()
        .split(" ")
        .join("-");
      const ext = MIME_TYPE_MAP[file.mimetype];

      cb(null, name + "-" + Date.now() + "." + ext);
    }
  });

Router.post("",checkAuth,multer({storage:storage}).single("image"),(req,res,next)=>{
    const url = req.protocol + "://" + req.get("host");
   const post =new Post({
    title:req.body.title,
    content:req.body.content,
    imagePath: url + "/images/" + req.file.filename
                                                    });
    post.save().then(createdPost=>

   {console.log("yes data saved");
    res.status(201).json({message:"posted successfully" });

                            });
                            });

Router.get("",(req,res,next)=>{
Post.find().then(data=>{
    fetchedPosts=data;

res.status(201).json({message:"successfull",
posts:fetchedPosts});
}).catch(err=>{
    res.status(404).json({message:"Could not fecth posts"});
})
})

Router.delete("/:id",checkAuth,(req,res,next)=>{
    Post.deleteOne({ _id:req.params.id}).then(result=>
        {
            console.log(result);
            res.status(200).json({message:"postDeleted"});
        });
    })
 
     Router.get("/:id",checkAuth,(req,res,next)=>{
         Post.findById(req.params.id).then(post=>{
           if(post){
            res.status(200).json(post);
  
           }
           else {
               res.status(404).json({message:"post not found"});
           }
         })
     })
     

     Router.put("/:id", checkAuth,multer({storage:storage}).single('image'),(req,res,next)=>{
        let imagePath = req.body.imagePath;
        if (req.file) {
          const url = req.protocol + "://" + req.get("host");
          imagePath = url + "/images/" + req.file.filename;
        }
         const post=new Post({
            _id: req.body.id,
            title:req.body.title,
            content:req.body.content,
            imagePath: imagePath

         });
         Post.updateOne({_id:req.params.id},post).then(result=>{
             console.log("updated");
             res.status(201).json({message:"Post updated"});
         })
     })


module.exports=Router;