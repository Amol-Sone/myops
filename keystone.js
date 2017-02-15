// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
// require('dotenv').config();

// Require keystone
var keystone = require('keystone');
var cons = require('consolidate');
var nunjucks = require('nunjucks');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({
	'name': 'myops',
	'brand': 'myops',

	'sass': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': ['templates', 'templates/views'],
	'view engine': 'html',
	'custom engine': cons.nunjucks,
	'cookie secret': 'secret',
	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User',
});
// keystone.set('cloudinary config', { cloud_name: 'myops', api_key: '394617218633297', api_secret: '14KIj5gqGOVKs5gCZZuwGkw7J3g' });
// or
keystone.set('cloudinary config', 'cloudinary://394617218633297:14KIj5gqGOVKs5gCZZuwGkw7J3g@myops');

// optional, will prefix all built-in tags with 'keystone_'
keystone.set('cloudinary prefix', 'keystone');

// optional, will prefix each image public_id with [{prefix}]/{list.path}/{field.path}/
keystone.set('cloudinary folders', true);

// optional, will force cloudinary to serve images over https
keystone.set('cloudinary secure', true);
// Load your project's Models
keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set('locals', {
	_: require('lodash'),
	// env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});

// Load your project's Routes
keystone.set('routes', require('./routes'));

// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
	posts: ['posts', 'post-categories'],
	galleries: 'galleries',
	enquiries: 'enquiries',
	users: 'users',
});

// Start Keystone to connect to your database and initialise the web server

keystone.start();
