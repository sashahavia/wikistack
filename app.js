const  express  = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app=express();

app.use(morgan('dev'));
app.use(express.static(__dirname , '/public'));


app.get('/', (req, res, next)=>{
  console.log("<h1>hello </h1>")
})


const PORT =  1337;
app.listen(PORT,()=>{
  console.log(`App listening in port ${PORT}`);
});
