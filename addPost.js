const fs = require('fs'); 
const mongoose = require('mongoose');
const moment = require('moment');

/**
 * 
 * BD
 * 
 */
 let url = 'mongodb://localhost:27017/social_network';
 let fichero = fs.readFileSync('posts.json');
 let posts = JSON.parse(fichero);
 mongoose.Promise = global.Promise;
 mongoose.connect(url, {
     useNewUrlParser: true,
     useUnifiedTopology: true
 });
 
 //schema
 let postsSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    date: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
   
 });
 
 //modelo
 let Post = mongoose.model('Post', postsSchema);
 
 //Add each post to json
 posts.forEach(postGet => {            
    let post = new Post();
    post.content = postGet.content;
    post.date = postGet.date;
    
    post.save().then(resultado => {
        console.log("Post añadido");
    }).catch(error => {
        console.log("ERROR añadiendo post");
    });
});


//Button add post
document.getElementById("addPost").addEventListener('click', () => {
    let postContent = document.getElementById("newPost").value;
    console.log(postContent);

    if (postContent != "") {
        let post = new Post({
            content: postContent,
            date: new Date,  //February 15th 2022, 12:01:41 pm
        });

        post.save().then(resultado => {
            //post added correct
            console.log("Post added")

        }).catch(error => {
            //error add post
            console.log("Post no added");
        });
    }
});
