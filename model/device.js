'use strict';

let monk = require('monk')
import config from '../config';
import { NegocioException } from '../erro';


let db = monk(config.DATABASE_MONGODB)

let collection = db.get('devices')
 

module.exports = {
	detail: async function ( tag ) {
		return await collection.findOne({ tag: tag } );
	},
	 
	register: async function (obj) {
        let imei = obj.imei 
        let resposta = await collection.findOne( { imei: imei } )
        if ( resposta ) {
            throw new NegocioException('GATEWAY_PUSH_ERROR_DEVICE_IMEI_REGISTRED ' + imei)
        }

		return await collection.insert( obj );
    },
    
    update : async function ( imei, device ) {
        let resposta =  await collection.findOne( { imei : imei }  )  
        if ( !resposta ) {
            return null 
        }

        resposta.token = device.token 
        resposta.tag = device.tag 
        if ( device.isNotification !== null || typeof(some_variable) != 'undefined' ) {
            resposta.isNotification = device.isNotification 
        }

        let isSave = await collection.update( { _id : resposta._id } , resposta )
        if ( !isSave.ok ) {
            throw new NegocioException('GATEWAY_PUSH_ERROR_UPDATE_MONGODB_SAVE') 
        }

        return resposta
    },
    list: async function( ) {
		return await collection.find({});
    }
 
}