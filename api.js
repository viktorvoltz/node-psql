const Pool = require('pg').Pool

const pool = new Pool({
    user: 'moviefan',
    host: 'localhost',
    database: 'movies',
    port: 5432
});

const inMemoryHorrors = [
    {
      name: 'The Hills Have Eyes',
      rating: 7.8
    },
    {
      name: 'Night of the Living Dead',
      rating: 9.0
    },
    {
      name: 'Scream',
      rating: 7.2
    }
  ];

  const getAllHorrors = async (request, response) => {
      if (request.treatment == 'on'){
          pool.query('SELECT * FROM horrors ORDER BY rating ASC', (error, results) => {
            response.status(200).json(inMemoryHorrors);
          });
      } else {
          response.status(200).json(inMemoryHorrors);
      }
      
  };

  const getHorrorById = (request, response) => {
      const id = parseInt(request.params.id);
      if (request.treatment == 'on') {
        pool.query('SELECT * FROM horrors WHERE id = $1', [id], (error, results) => {
            response.status(200).json(results.rows);
        });
    } else {
      response.status(200).json(inMemoryHorrors[0]);
    }
  }

  const addHorror = async (request, response) => {
    const { name, rating } = request.body;
    inMemoryHorrors.push({ name, rating });
    response.status(201).send(`Horror added successfully.`);
  };
  
  const updateHorror = (request, response) => {
    const { name, rating } = request.body;
    inMemoryHorrors[0] = { name, rating };
    response.status(200).send(`First horror in list is updated.`);
  };
  
  const deleteHorror = (request, response) => {
    inMemoryHorrors.shift();
    response.status(200).send(`First horror in list is deleted.`);
  };

  module.exports = {
      getAllHorrors,
      getHorrorById,
      addHorror,
      updateHorror,
      deleteHorror
  };

