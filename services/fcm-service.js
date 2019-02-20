import * as admin from 'firebase-admin';
import HttpUtils from '../util/http-util';
import config from '../config';
let url = require('url');

 

class FcmService {


    static async send( notificacao) {
        try {

            let url = "https://fcm.googleapis.com/fcm/send";
            

            let option = {
                uri : url ,
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "key=" + config.FIREBASE_FCM_TOKEN,
                    
                },
                json: true,
                
                body: notificacao
            }

            const response = await HttpUtils.post(option)
            return response

        } catch (error) {
            return console.log('GATEWAY_PUSH_FCMSERVICE_ERROR_CATH ' + error.message)
        }
    }




}

module.exports = FcmService 