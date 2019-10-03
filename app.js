const express = require('express');
const exphbs = require('express-handlebars');
const router = require('./routes/api/members');
const members = require('./Members');
const logger = require('./middleware/logger');

const app = express();

// Use body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Use handlebars template engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(logger);

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Member App',
    members
  })
});

// Use router
app.use('/api/members', router);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`App is listening on port ${port}`));