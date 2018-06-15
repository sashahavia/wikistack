const  express  = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const layout = require('./views/layout')
const models = require('./models');
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');
// db.authenticate().
// then(() => {
//   console.log('connected to the database');
// })

const app = express();

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/wiki', wikiRouter);
app.use('/user', userRouter);


app.get('/', (req, res, next) => {
  res.redirect('/wiki');
});

const PORT =  1337;

const init = async ()=>{
  await models.db.sync({force: true});

  app.listen(PORT,()=>{
    console.log(`App listening in port ${PORT}`);
  });
}

init();
