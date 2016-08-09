/**
 * @fileoverview Definition of explore () and main object exposing module API
 * @author Raghav Dua <duaraghav8@gmail.com>
 */

'use strict';

var eye = require ('sol-eye'),
	fs = require ('fs'),
	path = require ('path');
var CWD = process.cwd ();

function getSourceCode (filename) {

	var sourceCode;

	if (!(filename && typeof filename === 'string')) {
		throw new Error ('A valid file name was not provided');
	}

	try {
		sourceCode = fs.readFileSync (filename, 'utf8');
	} catch (e) {
		throw new Error (
			'An error occured while trying to read ' + filename + ':\n' + e
		);
	}

	return sourceCode;

}

function traverse (code, repr, currentFile, visited) {

	eye.findImports (code).forEach (function (filename) {

		var basename = path.basename (filename),
			subRepr = {};

		if (!path.isAbsolute (filename)) {
			filename = path.join (CWD, filename);
		}

		//avoid getting into infinite loops in case of circular dependencies
		if (!visited [filename]) {
			visited [filename] = true;

			subRepr [basename] = [];
			traverse (getSourceCode (filename), subRepr, basename, visited);

			repr [currentFile].push (subRepr);
		}

	});

}

module.exports = {

	version: require ('./package.json').version,

	explore: function (filename) {

		var representation = {}, sourceCode, visited = {};
		var basename = path.basename (filename);

		if (!path.isAbsolute (filename)) {
			filename = path.join (CWD, filename);
		}

		sourceCode = getSourceCode (filename);
		visited [filename] = true;
		representation [basename] = [];
		traverse (sourceCode, representation, basename, visited);

		return representation;
	}

};