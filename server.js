const express = require('express')
const app = express()
const bodyparser = require('body-parser')
 
const ObjectId = require('mongodb').ObjectID
 
const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://guilhermesoure:mongoteste2020@testecrudnew-axryn.mongodb.net/test?retryWrites=true&w=majority";

MongoClient.connect(uri, (err, client) => {
  if (err) return console.log(err)
  db = client.db('TesteCrudNew') // coloque o nome do seu DB
 
  app.listen(3000, () => {
    console.log('Server running on port 3000')
  })
})
 
app.use(bodyparser.urlencoded({ extended: true}))
 
app.set('view engine', 'ejs')
 
app.get('/', function(req, res){
    res.render('index.ejs');
});
 
app.post('/show', (req, res)=>{
    //criar a coleção “data”, que irá armazenar nossos dados
    db.collection('data').save(req.body, (err, result) => {
        if (err) return console.log(err)
     
        console.log('Salvo no Banco de Dados')
        res.redirect('/show')
      })
});

app.get('/', (req, res) => {
    var cursor = db.collection('data').find()
})
 
app.get('/show', (req, res) => {
    db.collection('data').find().toArray((err, results) => {
        if (err) return console.log(err)
        res.render('show.ejs', { data: results })
 
    })
})

app.route('/edit/:id')
.get((req, res) => {
  var id = req.params.id
 
  db.collection('data').find(ObjectId(id)).toArray((err, result) => {
    if (err) return res.send(err)
    res.render('edit.ejs', { data: result })
  })
})
.post((req, res) => {
  var id = req.params.id
  var name = req.body.name
  var surname = req.body.surname
  var datanascimento= req.body.idade
  var gender = req.body.gender
  var idade = req.body.idade
  var email= req.body.email
  var endereco= req.body.endereco
  var telefone= req.body.telefone
  var profissao= req.body.profissao
  var medidas= req.body.medidas
  var investimento= req.body.investimento
  var prevencao= req.body.prevencao
  var apoio= req.body.apoio
  var postura= req.body.postura
 
  db.collection('data').updateOne({_id: ObjectId(id)}, {
    $set: {
      name: name,
      surname: surname,
      gender: gender,
      idade: idade,
      email: email,
      endereco: endereco,
      telefone: telefone,
      profissao: profissao,
      datanascimento: datanascimento,
      medidas: medidas,
      investimento: investimento,
      prevencao: prevencao,
      apoio: apoio,
      postura: postura
    }
  }, (err, result) => {
    if (err) return res.send(err)
    res.redirect('/show')
    console.log('Atualizado no Banco de Dados')
  })
})

app.route('/delete/:id')
.get((req, res) => {
  var id = req.params.id
 
  db.collection('data').deleteOne({_id: ObjectId(id)}, (err, result) => {
    if (err) return res.send(500, err)
    console.log('Deletado do Banco de Dados!')
    res.redirect('/show')
  })
})