/****IMPORT DES MODULES NECESSAIRES */
const { DataTypes} = require('sequelize')
const DB = require('../db.config')

/****DEFINITION DU MODELE USER */
const User = DB.define('User', {
    id: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
    },
    nom: {
        type: DataTypes.STRING(100),
        DefaultValue: '',
        allowNull: false 
    },
    prenom: {
        type: DataTypes.STRING(100),
        DefaultValue: '',
        allowNull: false
    },
    pseudo: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING, //250 caractères / défaut
        validate:{
            isEmail: true   //Ici 1 validation de données
        }
    },
    password: {
        type: DataTypes.STRING(64),
        is: /^[0-9 a-f]{64}$/i   //ici c'est 1 contrainte / regex
    },
}, { paranoid:true })   //ici pour faire du softDelete (on passe par la corbeille)

/***SYNCHRONISATION Du MODELE user */
User.sync()
// User.sync({force: true})
// User.sync({alter: true})


module.exports = User