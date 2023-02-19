// import des modules necessaires (express, le modèle, bcrypt)

const Plante = require('../models/plante')
const { RequestError, PlanteError } = require('../error/customError')

//Routage de la ressource Plante

exports.getAllPlantes = (req, res, next) =>{
    Plante.findAll()
        .then( plantes => res.json({ date: plantes}))
        .catch(err => next(err))
}

exports.getPlante = async (req, res, next) =>{
    try {
        let planteId = parseInt(req.params.id)

        // Vérif si le champs id est présent et cohérent
        if(!planteId){
            //return res.json(400).json({ message: 'Missing Parameter'})
            throw new RequestError('Missing parameter')
        }

        //Récupération du produit
        let plante = await Plante.findOne({ where: {id: planteId}, raw: true})
    
        //test si résultat
        if(plante === null){
            throw new PlanteError(`This product doesn't exist !`, 0)
            }
        
        //Renvoi du Produit trouvé
        return res.json({data: plante})
    } catch (err){
        next(err)
    }
}

// Ajouter 1 produit
exports.addPlante = async (req, res, next) => {
      try{
        const {user_id, nom, description, recette} = req.body

        //validation des données reçues
        if(!user_id || !nom || !description || !recette){
            throw new RequestError(`Missing parameter`)
        }
        // Vérif si le produit existe
        let plante = await Plante.findOne({ where: {nom: nom}, raw: true})
        if( plante !== null){
            throw new RequestError( `This product ${nom} already exists !`)//TODO internationalizer +vite
    }

        // Création du produit
        plante = await Plante.create(req.body)

        // Réponse du produit créé
        return res.json({ message: 'product created', data:plante})
    } catch(err){
        next(err)
    }
}

exports.updatePlante = async (req, res, next) =>{
    try{
        let planteId = parseInt(req.params.id)

        //Vérification si le champs id est présent et cohérent
        if (!planteId) {
            throw new RequestError(`Missing parameter`)
        }
            //Recherche du produit
            let plante = await Plante.findOne({ where: {id: planteId}, raw: true})
            
            //Vérifier si le produit existe
            if(plante === null){
                throw new PlanteError( 'This product doesnot exist !', 0)
            }

            //Mise à jour du produit
            await Plante.update(req.body, { where: {id: planteId}})

            // Réponse de la mise à jour
            return res.json({ message: 'product updated'})
        }catch(err){
            next(err)
            }
} //on modifie / on update

exports.untrashPlante = async(req, res, next) =>{
    try {
        let planteId = parseInt(req.params.id)

        //Vérification si le champs id est présent et cohérent
        if(!planteId){
            throw new RequestError('Missing parameter')
        }

        await Plante.restore({ where: {id: planteId}})

        // Réponse de sortie de poubelle
            return res.status(204).json({})
        }catch(err) {
            next(err)
        }
}//pr le untrash car put et patch pas le meilleur choix

exports.trashPlante = async(req, res, next) => {
    
    try{
        let planteId = parseInt(req.params.id)
        //Vérification si le champs id est présent et cohérent
        if(!planteId){
            throw new RequestError('Missing parameter')
        }

        //Suppression de l'utilisateur (soft delete - ya pas force:true)
        await Plante.destroy({ where: {id:planteId}})

        // Réponse de la mise en poubelle
        return res.status(204).json({})
    } catch (err) {
        next(err)
        }
}
exports.deletePlante = async(req, res, next) => {

    try{
    let planteId = parseInt(req.params.id)

    //Vérification si le champs id est présent et cohérent
    if(!planteId) {
        throw new RequestError('Missing parameter')
    }

    //Suppression de l'utilisateur (hard delete)
    await Plante.destroy({ where: {id:planteId}, force: true})

    // Réponse de la suppression
    return res.status(204).json({})
    }catch(err) {
        next(err)
    }
}