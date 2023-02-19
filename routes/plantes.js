// import des modules necessaires (express, le modèle, bcrypt)
const express = require('express')
const checkTokenMiddleware = require('../jsonwebtoken/check')
const planteCtrl = require('../controllers/plante')


// Récupération du routeur d'express
let router = express.Router()

// Middleware pour logger dates de requêtes du fichier
router.use( (req, res, next) => {
    const event = new Date()
    console.log('Plante Time:', event.toString())
    next()
})

//Routage de la ressource Plante
router.get('', planteCtrl.getAllPlantes)

router.get('/:id', planteCtrl.getPlante)

router.put('', checkTokenMiddleware, planteCtrl.addPlante)

router.patch('/:id', checkTokenMiddleware, planteCtrl.updatePlante)

router.post('/untrash/:id', checkTokenMiddleware, planteCtrl.untrashPlante)

router.delete('/trash/:id', checkTokenMiddleware, planteCtrl.trashPlante)

router.delete('/:id', checkTokenMiddleware, planteCtrl.deletePlante)

module.exports = router