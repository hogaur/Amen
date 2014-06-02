'use strict';

// Configuring the Articles module
angular.module('comments').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		// Menus.addMenuItem('Comments', 'Comments', 'comments', 'dropdown', '/comments(/create)?');
		// Menus.addSubMenuItem('Comments', 'comments', 'List Comments', 'comments');
		// Menus.addSubMenuItem('Comments', 'comments', 'New Comment', 'comments/create');
	}
]);