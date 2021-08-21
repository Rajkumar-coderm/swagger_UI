const express = require('express');
const knex = require('../databases/db')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../swager.json')
const app = express.Router()
app.use(express.json())


const swaggerOptions = {
    swaggerOptions: {
        validatorUrl: null
    }
    , customCss: '.swagger-ui .topbar { display: none }'
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));


// get by id
app.get('/:id', (req, res) => {
    knex.select('*')
    .from('users')
    .where('id', req.params.id)
    .then((data) => {
        res.send(data)
    }).catch((err) => {
        res.send(err)
    })
})


// post user data
app.post('/post', (req, res) => {
    knex('users')
    .insert({ 
        name: req.query.name,
        email: req.query.email,
        password: req.query.password 
        })
        .then((data) => {
            res.json({ meaasage: "success" })
    }).catch((err) => {
        res.send({ massage: 'failed' })
    })
});


// update user data
app.put('/put/:id',(req,res)=>{
    knex('users')
    .where('id',req.params.id)
    .update({
        name:req.query.name,
        email:req.query.email,
        password:req.query.password
    })
    .then((data)=>{
        res.send({message:"successfully update.."})
    }).catch((err)=>{
        res.send(err)
    })
})


// delete by user_id
app.delete('/delete/:id',(req,res)=>{
    knex('users').where('id',req.params.id).del().then((data)=>{
        res.send({message:"successfully update"})
    }).catch((err)=>{
        res.send(err)
    })
});


// getAll user data
app.get('/users',(req,res)=>{
    knex.select('*').from('users').then((data)=>{
        res.json({user:data})
        console.log(data);
    }).catch((err)=>{
        res.send(err)
    })
})
module.exports = app;