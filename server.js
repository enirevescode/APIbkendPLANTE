/***** IMPORT DES MODULES NECESSAIRES*/
const express = require('express')
const cors = require('cors')
const checkTokenMiddleware = require('./jsonwebtoken/check')
const errorHandler = require('./error/errorHandler')

/******IMPORT DE LA CONNECTION A LA DB */
let DB = require('./db.config')

/******INITIALISATION DE L API */
const app = express()

app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: "Origin, X-Requested-With, x-access-token, role, Content, Accept, Content-Type, Authorization"
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/*****IMPORT DES MODULES DE ROUTAGE */
const user_router = require('./routes/users')
const plante_router = require('./routes/plantes')

const auth_router = require('./routes/auth')

/*****MISE EN PLACE DU ROUTAGE */
app.get('/', (req, res) => res.send(`I'm online. TUTTI IS OKAY !`))

app.use('/users', checkTokenMiddleware, user_router)
app.use('/plantes', plante_router)

app.use('/auth', auth_router)

app.get('*', (req, res) => res.status(501).send(`hey ! cela n'existe pas !`))

app.use(errorHandler)

/******START SERVEUR avec test DB*/
DB.authenticate()
    .then(() => console.log('Database connection is OK'))
    .then(() => {
        app.listen(process.env.SERVER_PORT, () => {
        console.log(`This serveur is running on port ${process.env.SERVER_PORT}. Have fun !`)
    })
})
    .catch(err => console.log('Database Error', err))
