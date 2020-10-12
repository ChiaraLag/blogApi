'use strict';
module.exports = function(app) {
  var todoList = require('../controllers/postController');

  // todoList Routes
  app.route('/posts')
    .get(todoList.list_all_posts)
    .post(todoList.create_a_post);
    

  app.route('/posts/:postId')
    .get(todoList.read_a_post)
    .put(todoList.update_a_post)
    .delete(todoList.delete_a_post);

  
  app.route('/publicPost')
  .get(todoList.list_public_posts)
};
