import { NegocioException } from '../erro.js';
import CryptoUtils from '../util/crypto-util';
import HttpUtils from '../util/http-util';
import config from '../config';
import Device from '../model/device';

export default (function () {
    return {

        register: async function (req, res, next) {
            try {

                let device = req.body
                if (!device) {
                    return next(new NegocioException('GATEWAY_ERROR_PARAMS_EMPTY'))
                }

                device.dataCreated = new Date().getTime().toString();
                device.isNotification = true 

                let resposta = await Device.register(device);

                if (!resposta) {
                    return next(new NegocioException('GATEWAY_ERROR_MONGO_REGISTER'))
                }

                return res.status(201).send(resposta)


            } catch (error) {
                return next(new NegocioException(error.message))
            }
        },
        update: async function (req, res, next) {
            try {

                let device = req.body
                let imei = req.params.imei
                if (!device || !imei) {
                    return next(new NegocioException('GATEWAY_ERROR_PARAMS_EMPTY'))
                }

                let resposta = await Device.update(imei, device);
                if (!resposta) {
                    return next(new NegocioException('GATEWAY_ERROR_MONGO_REGISTER'))
                }

                return res.status(201).send(resposta)


            } catch (error) {
                return next(new NegocioException(error.message))
            }
        },
        detail: async function (req, res, next) {
            try {
                let tag = req.params.tag
                if (!tag) {
                    return next(new NegocioException(error.message))

                }
                let lista = await Device.detail(tag);

                return res.status(201).send(lista)


            } catch (error) {
                return next(new NegocioException(error.message))
            }
        },
        list: async function (req, res, next) {
            try {

                let lista = await Device.list();

                return res.status(201).send(lista)


            } catch (error) {
                return next(new NegocioException(error.message))
            }
        }



    }
})();
