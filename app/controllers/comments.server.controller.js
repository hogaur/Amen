'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Comment = mongoose.model('Comment'),
	_ = require('lodash');

/**
 * Get the error message from error object
 */
var getErrorMessage = function(err) {
	var message = '';

	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Comment already exists';
				break;
			default:
				message = 'Something went wrong';
		}
	} else {
		for (var errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}

	return message;
};

/**
 * Create a Comment
 */
exports.create = function(req, res) {
	var comment = new Comment(req.body);
	// console.log(req.body);
	comment.user = req.user;
	// comment.blog = req.
	// console.log(comment);
	comment.save(function(err) {
		if (err) {

			console.log(getErrorMessage(err));
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			console.log(comment);
			res.jsonp(comment);
		}
	});
};

/**
 * Show the current Comment
 */
exports.read = function(req, res) {
	res.jsonp(req.comment);
};

/**
 * Update a Comment
 */
exports.update = function(req, res) {
	var comment = req.comment ;

	comment = _.extend(comment , req.body);

	comment.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(comment);
		}
	});
};

/**
 * Delete an Comment
 */
exports.delete = function(req, res) {
	var comment = req.comment ;

	comment.remove(function(err) {
		console.log(getErrorMessage(err));
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(comment);
		}
	});
};

/**
 * List of Comments
 */
exports.list = function(req, res) { Comment.find().sort('-created').populate('user', 'displayName').exec(function(err, comments) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(comments);
		}
	});
};

//List of Comments of a blog
exports.findByBlogId = function(req,res, next, id){
	Comment.find({blog: id},{},{},{}).sort('-created').populate('user','displayName').exec(function(err, comments) {
		if(err){
			console.log('comments of a blog you wanna see');
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(comments);
		}
	});
};
/**
 * Comment middleware
 */
exports.commentByID = function(req, res, next, id) { Comment.findById(id).populate('user', 'displayName').populate('blog','title').exec(function(err, comment) {
		if (err) return next(err);
		if (! comment) return next(new Error('Failed to load Comment ' + id));
		req.comment = comment ;
		next();
	});
};

/**
 * Comment authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.comment.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};