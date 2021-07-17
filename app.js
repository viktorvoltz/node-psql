const express = require('express');
const app = express();
const port = 5000;

app.use(express.json());

app.listen(port, () => {
    console.log('class sever-app is running on port ${port}.');
})

const api = require('./api');

app.get('/horrors/', api.getAllHorrors);
app.get('/horrors/:id', api.getHorrorById);
app.post('/horrors/', api.addHorror);
app.put('/horrors/:id', api.updateHorror);
app.delete('/horrrors/:id', api.deleteHorror);

const SplitFactory = require('@splitsoftware/splitio').SplitFactory;

const factory = SplitFactory({
    core: {
        authorizationKey: 'k91r3vp0uokiip92f8c7rmjf1pamjfnce5fg'
    }
});

const client = factory.client();

const treatmentMiddleware = function (request, response, next) {
    const userEmail = request.headers['authorization'];
    request.treatment = client.getTreatment(userEmail, 'database_split');
    next();
  };

  app.get('/horrors/', treatmentMiddleware, api.getAllHorrors);
  app.get('/horrors/:id', treatmentMiddleware, api.getHorrorById);
  app.post('/horrors/', treatmentMiddleware, api.addHorror);
  app.put('/horrors/:id', treatmentMiddleware, api.updateHorror);
  app.delete('/horrors/:id', treatmentMiddleware, api.deleteHorror);