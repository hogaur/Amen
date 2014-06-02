'use strict';

// Comments controller
angular.module('comments').controller('CommentsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Comments',
	function($scope, $stateParams, $location, Authentication, Comments ) {
		$scope.authentication = Authentication;

		// Create new Comment
		$scope.create = function() {
			// Create new Comment object
			var comment = new Comments ({
				commentbody: this.commentbody,
				blog: this.blogId
			});

			// Redirect after save
			comment.$save(function(response) {
				$location.path('articles/'+ response.blog);

			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			// Clear form fields
			$scope.$apply();
				
			this.commentbody = '';
		};

		// Remove existing Comment
		$scope.remove = function( comment ) {
			var blogId = this.article._id;
			if ( comment ) { comment.$remove();

				for (var i in $scope.comments ) {
					if ($scope.comments [i] === comment ) {
						$scope.comments.splice(i, 1);
					}
				}
			} else {
				$scope.comment.$remove(function() {
					$location.path('articles/'+blogId);
				});
			}
		};

		// Update existing Comment
		$scope.update = function() {
			var comment = $scope.comment ;

			comment.$update(function() {
				$location.path('comments/' + comment._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Comments
		$scope.find = function() {
			$scope.comments = Comments.query();
		};
		// Find a list of comments on a particular blog
		$scope.findByBlogId = function(){
			$scope.comments = Comments.get({
				blog : this.blogId
			});
		};
		// Find existing Comment
		$scope.findOne = function() {
			$scope.comment = Comments.get({ 
				commentId: $stateParams.commentId
			});
		};
	}
]);