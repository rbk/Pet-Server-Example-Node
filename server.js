const express = require('express');
const bodyParser = require('body-parser');
const port = 5000;
const cors = require('cors')
const app = express();
app.use(bodyParser.json())
app.use(cors())

let pets = [
  {
    id: 0,
    name: 'Mali',
    age: 3,
    species: 'Cat'
  },
  {
    id: 1,
    name: 'Jack Jack',
    age: 4,
    species: 'Cat'
  },
  {
    id: 2,
    name: 'Barney',
    age: 6,
    species: 'Dog'
  },
  {
    id: 3,
    name: 'Kee Kee',
    age: 2,
    species: 'Cat'
  },
  {
    id: 4,
    name: 'Pillar',
    age: 4,
    species: 'Snake'
  }
];

app.get('/api/pets/get', (req, res) => {
  res.send(pets);
});

app.post('/api/pets/create', (req, res) => {
  let id = pets.length + 1
  console.log(req.body)
  const { name, age, species } = req.body;
  const myPet = { id, name, age, species };
  pets.push(myPet);
  res.send(pets);
});

app.put('/api/pets/update', (req, res) => {
  const { id, name, age, species } = req.body;
  const updatePet = { id, name, age, species };
  const newpets = pets.map(pet => {
    if(pet.id == id) {
      return updatePet
    } else {
      return pet
    }
  });
  pets = newpets;
  res.send(pets);
});

app.delete('/api/pets/delete', (req, res) => {
  const id = req.body.id;
  const newpets = pets.filter(pet => {
    return id !== pet.id;
  });
  pets = newpets;
  res.send(pets);
});

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});