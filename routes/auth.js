// import des modules necessaires (express, le modèle, bcrypt)
const express = require('express')

const authCtrl = require('../controllers/auth')

// Récupération du routeur d'express
let router = express.Router()

// Middleware pour logger dates de requêtes(sur tte les routes d'1 fichier)
router.use( (req, res, next) => {
    const event = new Date()
    console.log('AUTH Time:', event.toString())
    next()
})

//Routage de la ressource Auth
// c'est pas 1 put ni 1 patch donc c'est 1 post car envoie de formulaire d'authentification
router.post('/login', authCtrl.login)

module.exports = router