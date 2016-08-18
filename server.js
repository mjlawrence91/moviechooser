// import path from 'path'
// import express from 'express'
// import bodyParser from 'body-parser'
// import serveStatic from 'serve-static'
// import jwt from 'express-jwt'
// import rsaValidation from 'auth0-api-jwt-rsa-validation'

const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const serveStatic = require('serve-static')
const jwt = require('express-jwt');
const rsaValidation = require('auth0-api-jwt-rsa-validation');

const app = express()
const port = 8000

const jwtCheck = jwt({
  secret: rsaValidation(),
  algorithms: ['RS256'],
  issuer: "https://mjl.eu.auth0.com/",
  audience: 'https://moviechooser.mjl-app.eu'
});

const staticPath = (process.env.NODE_ENV !== 'dev')
    ? path.join(__dirname, '/dist')
    : __dirname

app.use(bodyParser.json())
app.set('x-powered-by', false)
app.use(serveStatic(staticPath))
app.use(jwtCheck);

app.get('/api/movies/:id?', (req, res) => res.status(501).send('Not implemented.'))
app.post('/api/movies', (req, res) => res.status(501).send('Not implemented.'))
app.delete('/api/movies/:id', (req, res) => res.status(501).send('Not implemented.'))

app.listen(port, _ => console.log(`Server open on port ${port}`))
