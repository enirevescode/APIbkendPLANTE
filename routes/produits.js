// import des modules necessaires (express, le modèle, bcrypt)
const express = require('express')
const checkTokenMiddleware = require('../jsonwebtoken/check')
const produitCtrl = require('../controllers/produit')


// Récupération du routeur d'express
let router = express.Router()

// Middleware pour logger dates de requêtes du fichier
router.use( (req, res, next) => {
    const event = new Date()
    console.log('Produit Time:', event.toString())
    next()
})

//Routage de la ressource Produit
router.get('', produitCtrl.getAllProduits)

router.get('/:id', produitCtrl.getProduit)

router.put('', produitCtrl.addProduit)

router.patch('/:id', produitCtrl.updateProduit)

router.post('/untrash/:id', produitCtrl.untrashProduit)

router.delete('/trash/:id', produitCtrl.trashProduit)

router.delete('/:id', produitCtrl.deleteProduit)

module.exports = router