const port = process.env.PORT || 8081;
const host = 'RENDER' in process.env ? '0.0.0.0' : 'localhost';
const express = require('express');
const app = express();

app.use('/assets', express.static('assets'));
app.use('/views', express.static('views'));


require('./init/db.js')(app, () => {
  require('./init/middleware')(app);
  require('./init/router')(app);
  app.listen(port, host, (error) => {
    if (error) throw error;
    console.log('Your app is listening on ' + port);
  });
});
