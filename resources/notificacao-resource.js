import { NegocioException } from '../erro.js';
import CryptoUtils from '../util/crypto-util';
import HttpUtils from '../util/http-util';
import config from '../config';
import Notificacao from '../model/notificacao';
import Device from '../model/device';

import FcmService from '../services/fcm-service'




export default (function () {
    return {


        register: async function (req, res, next) {
            try {
                let notificacao = req.body


                if (!notificacao) {
                    return next(new NegocioException('GATEWAY_ERRO_NOTIFICACAO_EMPTY'))
                }

                if (!notificacao.tag) {
                    return next(new NegocioException('GATEWAY_ERRO_TAG_EMPTY'))
                }

                console.info( notificacao )

                let device = await Device.detail(notificacao.tag)
                if (!device) {
                    return next(new NegocioException('GATEWAY_ERRO_DEVICE_EMPTY'))
                }

                let message = {

                    to: device.token,
                    notification: {
                        title: notificacao.titulo,
                        body: notificacao.descricao
                    },
                    data :{ message : notificacao.descricao },
                    ttl : 3600


                };
                notificacao.message = message
                let resposta = await FcmService.send(message)
                notificacao.resposta = resposta
                notificacao.dateCreated = new Date().getTime().toString()
                let isSave = await Notificacao.register(notificacao)
                if (!isSave) {
                    return next(new NegocioException('GATEWAY_ERROR_NOTIFICACAO_DB_SAVE'));
                }
                return res.status(201).send()


            } catch (error) {
                return next(new NegocioException(error.message))
            }




        },
        detail: async function (req, res, next) {
            try {
                let id = req.params.id
                if (!id) {
                    return next(new NegocioException('GATEWAY_PUSH_ERRO_TID_EMPTY'))
                }


                let lista = await Notificacao.detail(id);

                return res.status(201).send(lista)

            } catch (error) {
                return next(new NegocioException(error.message))
            }
        },
        list: async function (req, res, next) {
            try {
                let tag = req.params.tag
                if (!tag) {
                    return next(new NegocioException('GATEWAY_PUSH_ERRO_TAG_EMPTY'))
                }

                let lista = await Notificacao.list(tag);

                return res.status(201).send(lista)

            } catch (error) {
                return next(new NegocioException(error.message))
            }
        },



    }
})();
