import express from 'express'
import jwt from 'jsonwebtoken'
import {NegocioException} from '../erro'

import Devices from '../resources/device-resource'
import Notificacao from '../resources/notificacao-resource'





const router = express.Router();

router.route('/device').post( Devices.register )
router.route('/device/:imei').put( Devices.update )
router.route('/device/:tag').get( Devices.detail )
router.route('/devices').get( Devices.list )


router.route('/notificacao').post( Notificacao.register )
router.route('/notificacao/:id').get( Notificacao.detail )
router.route('/notificacao/lista/:tag').get( Notificacao.list )


export default router
