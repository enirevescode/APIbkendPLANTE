/****IMPORT DES MODULES NECESSAIRES */

const { DataTypes} = require('sequelize')
const DB = require('../db.config')

/****DEFINITION DU MODELE Produit */

    const Produit = DB.define('Produit', {
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
    prix: {
        type: DataTypes.NUMBER,
        defaultValue: '',
        allowNull: false,
    },
}, { paranoid:true }) //ici pour faire du softDelete

module.exports = Produit