const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const members = require('./Members');
const router = require('./routes/api/members');
// const logger = require('./middleware/logger');

const app = express();
const port = process.env.PORT || 3000;
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Set a static folder
// app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Member App',
    members,
  });
})
app.use('/api/members', router);
// Init middleware
// app.use(logger);

app.listen(port,
  () => console.log(`Example app is listening on port ${port}!`)
)