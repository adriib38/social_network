const fs = require('fs');
const mongoose = require('mongoose');
const moment = require('moment');

console.log('index.js');

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
 
//model
let Post = mongoose.model('Post', postsSchema);

//Funcion add post to muro
let buscarTodos = () => {
    let listPosts = '';
    console.log('Posts: ');
    Post.find().then(resultado => {
       
        resultado.forEach(post => {
            let content = post.content;
            
            listPosts += `
                <div class="post">
                    <p>${post.content}</p>
                    <span>${moment(post.date).format('L')}</p>
                </div>
            `;
        });

        document.getElementById("muro").innerHTML = listPosts;

    }).catch(error => {
        console.log(error);
    });
}

buscarTodos();
