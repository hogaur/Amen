'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Comment Schema
 */
var CommentSchema = new Schema({
	commentbody: {
		type: String,
		default: '',
		required: 'Please fill Comment name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	blog: {
		required: 'Please set blog id',
		type: Schema.ObjectId,
		ref: 'Article'
	},
});

mongoose.model('Comment', CommentSchema);