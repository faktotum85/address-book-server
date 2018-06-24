const mongoose = require('mongoose');

// import environmental variables
require('dotenv').config();

// connect to the database and handle bad connections
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
    console.error(err.message);
});

// import models
require('./models/Person');
require('./models/User');

// Start the app
const app = require('./app');
app.set('port', process.env.PORT || 3001);

const server = app.listen(app.get('port'), () => {
    console.log(`Server running at http://${server.address().port}`);
});
