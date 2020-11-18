const express = require('express')
const path = require('path')
const app = express()
const db = require('./config/database')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
const passportSetup = require('./config/passport-setup')

// bring template ejs
app.set('view engine', 'ejs')
app.set('views', 'views')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// bring static 
app.use(express.static(path.join(__dirname, 'assets')))
app.use(express.static(path.join(__dirname, 'upload')))
app.use(express.static(path.join(__dirname, 'node_modules')))

// session and flash config 
app.use(session({
  secret: 'MOHAMeD SALEh MOHAMed',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 * 15 }
}))
app.use(flash())

// bring passport 
app.use(passport.initialize())
app.use(passport.session())

// store user object 
app.get('*', (req, res, next) => {
  res.locals.user = req.user || null
  next()
})

// 
app.get('/', (req, res) => {
  res.redirect('/events')
})

// bring events router
const events = require('./routes/event.route')
app.use('/events', events)

// bring users router
const users = require('./routes/user.route')
const { use } = require('passport')
app.use('/users', users)

//
app.listen(3000, () => {
  console.log('app its working on 3000');
})

