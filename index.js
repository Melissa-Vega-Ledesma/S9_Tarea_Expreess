const { response } = require('express')
const express = require('express')
const app = express()

app.request(express.json())

let notes = [
  {
    "id": 3,
    "content": "Repasar los retos de JS",
    "date": "2019-05-30T19:20:14.298Z",
    "importante": true
  },
  {
    "id": 1,
    "content": "Me tengo que suscribir",
    "date": "2019-05-30T17:30:31.098Z",
    "important": true
  },
  {
    "id": 2,
    "content": "Tengo que estudiar las clases de FullStack Bootcamp",
    "date": "2019-05-30T18:39:34.091Z",
    "important": true
  },
]
// const app = http.createServer((request, response) =>{
//   response.writeHead(200, {'Content-Type': 'aplication/json'})
//   response.end(JSON.stringify(notes))
// })

app.get('/', (request, response) => {
  response.send('<h1>Hello World</h1>')
})

app.get('/api/notes',(request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id == id)
    
    if (note) {
      response.json(note)
    } else {
      response.status(404).end()
    }
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id != id)
  response.status(204).end()
})

app.post('/api/notes', (request, response) => {
  const note = request.body

  if (!note || !note.content){
   return response.status(400).json({
     error: 'note.conten is missing'
   }) 
  }
  
  const ids = notes.map(note => note.id)
  const maxID = Math.max(...ids)

  const newNote = {
    id: maxID + 1,
    content: note.content,
    important: typeof note.important != 'undefined' ? note.important : false,
    date: new Date().toISOString()
  }
  //notes = [...notes, newNote]
  notes = notes.concat(newNote)

  response.status(201).json(newNote)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})