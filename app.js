const  express  = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const layout = require('./views/layout')
const models = require('./models');

// db.authenticate().
// then(() => {
//   console.log('connected to the database');
// })

const app=express();

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));


app.get('/', (req, res, next)=>{
  res.send(layout())
})



const PORT =  1337;

const init = async ()=>{
  await models.db.sync({force: true});

  app.listen(PORT,()=>{
    console.log(`App listening in port ${PORT}`);
  });
}

init();
