'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Doctor Schema
 */
var DoctorSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Doctor name',
		trim: true
	},
	location: {
		type: String,
		default: '',
		required: 'Please fill Doctor location',
		trim: true
	},
	qualification: [],
	speciality: {
		type: String,
		default: '',
		required: 'Please fill speciality',
		trim: true
	},
	description: {
		type: String,
		default: '',
		required: 'Please fill description',
		trim: true
	},
	availability: {
		type: String,
		default: '',
		required: 'Please fill availability',
		trim: true
	},
	time_zone: {
		type: String,
		default: '',
		required: 'Please fill time zone',
		trim: true
	},
	links: {
		type: String,
		default: '',
		required: 'Please fill links',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Doctor', DoctorSchema);
