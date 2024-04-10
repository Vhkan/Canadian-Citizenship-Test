const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 9000;
const userController = require('./controllers/userController');
const registerUserController = require('./controllers/registerUserController');
const testController = require('./controllers/testController');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

//Routes/Endpoints
app.use(userController);  
app.use(registerUserController);
app.use(testController);


app.get('/', (req, res) => {
  res.send("BE for Citizenship Test App works as expected.");
});



app.listen(PORT, () => {
  console.log(`BE server is running on ${PORT}`);
});
