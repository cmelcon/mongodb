// import
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose');
const connection = mongoose.connection
const Schema = mongoose.Schema
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// db configuration
mongoose.connect('mongodb://localhost/sandbox');
mongoose.Promise = global.Promise


connection.on('error', function(){
    console.log("can't connect to DB!");
})

connection.once('open', function(){
    console.log('Connected to DB!');
})

// set up middle ware
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

// compile my model
const bookSchema = new Schema({
  title: String,
  author: String,
  category: String
})

const Book = mongoose.model('Book', bookSchema)


// create routes
app.post('/books', (req, res) => {
  const newBook = new Book(req.body)
  newBook.save()
    .then(savedBook => {
      res.json(savedBook)
      console.log(`Saved ${savedBook.title}`)
    })
    .catch(e => console.log(e.message))
})


app.get('/books/:_id', (req, res) => {
  Book.findById(req.params._id)
  .then(book => res.json(book))
  .catch(e => console.log(e.message))
})


app.get('/books', (req, res) => {
  Book.find(req.params)
  .then(book => res.json(book))
  .catch(e => console.log(e.message))
})


app.delete('/books/:_id', (req, res) => {
  Book.findByIdAndRemove(req.params._id)
  .then(removedbook => res.json(removedbook))
  .catch(e => console.log(e.message))
})

app.put('/books/:_id', (req, res) => {
  Book.findById(req.params._id)
  .then(bookFromDb => {
    console.log(bookFromDb)
    Object.assign(bookFromDb, req.body)
    console.log(bookFromDb)
  bookFromDb.save()
    .then(updatedBook => res.json(updatedBook))
    .catch(e => console.log(e.message))
  })
})

app.listen(3000, ()=> console.log('Connecting.....'))



















// // Third example
// const personSchema = new Schema({
//   _id: Number,
//   name: String,
//   age: Number,
//   stories: [{type: Number, ref: 'Story'}]
// })
//
// const storySchema = new Schema({
//   title: String,
//   creator: {type: Number, ref: 'Person'},
//   fans: [{type: Number, ref: 'Person'}]
// })
//
// const Story = mongoose.model('Story', storySchema)
// const Person = mongoose.model('Person', personSchema)
//
// const manolo = new Person({
//   _id: 0,
//   name: 'Manolo Perez',
//   age: 90
// })
//
// const toribio = new Person({
//   _id: 1,
//   name: 'Toribio Gonzalez',
//   age: 12
// })
//
// const anacleto = new Person({
//   _id: 2,
//   name: 'Anacleto Sanchez',
//   age: 24
// })
//
// const manoloStory = new Story({
//   title: 'Los tres cerditos',
//   creator: manolo._id
// })
// const manoloStory2 = new Story({
//   title: 'Pototo',
//   creator: manolo._id,
//   fans: [anacleto._id, toribio._id]
// })
//
// const anacletoStory = new Story({
//   title: 'The lion king',
//   creator: anacleto._id,
//   fans: [manolo._id, toribio._id]
// })
//
// // anacleto.save()
// //   .then(saved => console.log(saved))
// //
// // toribio.save()
// //     .then(saved => console.log(saved))
// //
// // manolo.save()
// //       .then(saved => console.log(saved))
// //
// // manoloStory2.save()
// //   .then(saved => console.log(saved))
//
// Story.find({title: 'Pototo'})
//   .populate('creator fans')
//   .then(story => console.log(story.toString()))
//
//   Story.find({title: 'The lion king'})
//     .populate('creator fans')
//     .then(story => console.log(story.toString()))




// Second example
// const kittySchema = new Schema({
//     name: String
// })
//
// kittySchema.methods = {
//   speak: function(){
//     var greeting = this.name
//     ? "Meow name is " + this.name : "I don't have a name";
//     console.log(greeting);
//   }
// }
//
// const Kitten = mongoose.model('Kitten', kittySchema)
//
// const silence = Kitten({
//   name: 'Silence'
// });
//
// const fluffy = Kitten({
//   name: 'Fluffy'
// });
//
// silence.save()
//   .then(savedKitten=> console.log(silence.name))
//   .catch(e=>console.log(e.message))
//
// fluffy.save()
//   .then(savedKitten=> console.log(fluffy.name))
//   .catch(e=>console.log(e.message))
//
// fluffy.speak()
// silence.speak()
//
// Kitten.find()
//   .then(allKittens => console.log(allKittens))
//   .catch(e => console.log(e.message))





// First example
// const userSchema= new Schema({
//     name: String,
//     username: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     password: {
//       type: String,
//       require: true
//     },
//     admin: Boolean,
//     created_at: {
//       type: Date,
//       default: Date.now
//     },
//     updated_at: Date
// })
//
//
//
// userSchema.methods={
//   encryptPassword: function(){
//       this.password = bcrypt.hashSync(this.password, 10)
//       return this.password
//   },
//   authenticate: function(plainPass){
//     return bcrypt.compareSync(plainPass, this.password)
//   }
// }
//
// userSchema.pre('save', function(next){
//
//
//   console.log(this.password, '-----BEFORE')
//   this.encryptPassword()
//   console.log(this.password, '------ AFTER')
//
//   next()
// })
//
// const User = mongoose.model('User', userSchema)
//
// const joe = User({
//   name: 'Joe',
//   username: 'wordyallen',
//   password: 'joespass',
//   admin: false,
// })
//
//
// const victor = User({
//   name: 'Victor',
//   username: 'swolebrain',
//   password: 'victorpass',
//   admin: true,
// })
//
//
// // joe.save()
// //   .then(savedUser=> console.log(`User ${savedUser.name} saved!`))
// //   .catch(e=>console.log(e.message))
// //
// // console.log(joe.authenticate('joespass')) //check if authenticated
// //
// // victor.save()
// //     .then(savedUser=> console.log(`User ${savedUser.name} saved!`))
// //     .catch(e=>console.log(e.message))
// //
// // console.log(victor.authenticate('victorpass'))
// //
// // User.find()
// //   .then(allUsers=>console.log(allUsers))
// //   .catch(e=>console.log(e.message))
// //
// //   // User.findByIdAndRemove('57b3a29c09ca7fb40e49ed45')
// //   //   .then(deletedUser => console.log(`You have deleted: ${deletedUser.name}`))
// //   //   .catch(e => console.log(e.message))
//
//     User.findById('57b3a29c09ca7fb40e49ed46')
//       .then(userFromDB =>{
//         Object.assign(userFromDB, {name: 'Bob'})
//         userFromDB.save()
//           .then(updatedUser => console.log(`The user's name is now ${updatedUser.name}`))
//           .catch(e => console.log(e.message))
//       }).catch(e => console.log(e.message))
