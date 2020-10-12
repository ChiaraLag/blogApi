'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PostSchema = new Schema({
  title: {
    type: String,
    required: 'Kindly enter the title of the post'
  },
  body: {
    type: String,
    required: 'Kindly enter the body of the post'
  },
  public: {
    type: [{
      type: String,
      enum: ['public', 'draft']
    }],
    default: ['public']
  },
  featured: {
    type: [{
      type: String,
      enum: ['featured', 'notFeatured']
    }],
    default: ['notFeatured']
  }
});

module.exports = mongoose.model('Posts', PostSchema);