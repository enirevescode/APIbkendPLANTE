/****IMPORT DES MODULES NECESSAIRES */

const { DataTypes} = require('sequelize')
const DB = require('../db.config')

/****DEFINITION DU MODELE PLANTE */
const Plante = DB.define('Plante', {
    id: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER(10),
        allowNull: false 
    },
    nom: {
        type: DataTypes.STRING(100),
        DefaultValue: '',
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        defaultValue: '',
        allowNull: false,
    },
    recette: {
        type: DataTypes.TEXT,
        defaultValue: '',
        allowNull: false,
    },
}, { paranoid:true }) //ici pour faire du softDelete

/***SYNCHRONISATION Du MODELE plante */
 //Plante.sync()
// Plante.sync({force: true})
// Plante.sync({alter: true})

module.exports = Plante