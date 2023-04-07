/***** IMPORT DES MODULES NECESSAIRES*/
const express = require('express')
const cors = require('cors')
//const checkTokenMiddleware = require('./jsonwebtoken/check')
const errorHandler = require('./error/errorHandler')

/******IMPORT DE LA CONNECTION A LA DB */
let DB = require('./db.config')

/******INITIALISATION Du serveur*/
const app = express()

/* Les middleware */
app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: "Origin, X-Requested-With, x-access-token, role, Content, Accept, Content-Type, Authorization"
}))

app.use(express.json())/*Pour parler en json*/
app.use(express.urlencoded({ extended: true }))

/*****IMPORT DES MODULES DE ROUTAGE */
const user_router = require('./routes/users')
const produit_router = require('./routes/produits')

const auth_router = require('./routes/auth')

/*****MISE EN PLACE DU ROUTAGE */
app.get('/', (req, res) => res.send(`I'm online. TUTTI IS OKAY !`))//route/défaut idem L37

app.use('/users', user_router)
app.use('/produits', produit_router)

app.use('/auth', auth_router)

app.get('*', (req, res) => res.status(501).send(`hey ! La ressource n'existe pas (la fonctionnalité réclamée n’est pas supportée par le serveur)!`))

app.use(errorHandler)

/******START SERVEUR avec test de la bdd DB*/
DB.authenticate()
    .then(() => console.log('Database connection is OK'))
    .then(() => {
        app.listen(process.env.SERVER_PORT, () => {
        console.log(`This serveur is running on port ${process.env.SERVER_PORT}. Have fun !`)
    })
})
    .catch(err => console.log('Database Error', err))
