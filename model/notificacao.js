'use strict';

let monk = require('monk')
import config from '../config';
import { NegocioException } from '../erro.js';


let db = monk(config.DATABASE_MONGODB)

let collection = db.get('notificacao')
 

module.exports = {

	detail: async function ( id ) {
		return await collection.findOne({}, { _id : monk.id( id ) })
	},

	register: async function (obj) {
		return await collection.insert(obj)
	},
	
	list: async function ( tag ) {
		return await collection.find({ tag: tag });
	}    
 
}