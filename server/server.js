const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3333;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// statically serve the dist and client folder
app.use(express.static(path.join(__dirname, '../dist')));
app.use(express.static(path.join(__dirname, '../client')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

//route error handler
app.use((req, res) =>
  res.status(404).send('Error, not the page you are looking for')
);

// global error handler to handle erros within middleware
app.use((err, req, res, next) => {
  //Define a default error object
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occured' },
  };
  // define an errorObj to combine new errors
  const errObj = Object.assign(defaultErr, err);
  console.log('Error: ', errObj.log);
  // return to the client the status and error message
  return res.status(errObj.status || 500).send(errObj.message);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));

module.exports = app;
