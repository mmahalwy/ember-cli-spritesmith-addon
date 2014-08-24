'use strict';

var SpritesmithCompile = require('broccoli-spritesmith'),
	removeFile = require('broccoli-file-remover'),
	mergeTrees = require('broccoli-merge-trees'),
	path = require('path'),
	defaults = require('lodash-node/modern/objects/defaults');


function EmberCLISpritesmith(project) {
	this.project = project;
	this.name = 'Ember CLI Spritesmith Addon';
}

EmberCLISpritesmith.prototype.included = function included(app) {
	this.app = app;

	this.options = defaults(app.options.spritesmith || {}, {
		
	});

	this.spritesPath = this.options.spritesPath || 'public/assets/sprites';
};

EmberCLISpritesmith.prototype.treeFor = function treeFor(type){
	// var treePath =  path.join('node_modules', 'ember-cli-super-number', name + '-addon');

	if (type === 'styles') {
		return SpritesmithCompile(this.spritesPath, { output: 'scss'});	
	}
	
};

EmberCLISpritesmith.prototype.postprocessTree = function postprocessTree(type, workingTree) {

	var removeSpriteFile = removeFile(workingTree, {
		path: 'assets/sprites'
	});

	return mergeTrees([removeSpriteFile, SpritesmithCompile(this.spritesPath, { output: 'image' })]);
};

module.exports = EmberCLISpritesmith;
