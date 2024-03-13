const express = require('express');
require('dotenv').config();
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const port = 8000;
const connectDB = require("./config/db")
const colors = require('colors');
const cors = require('cors')

const app = express();

connectDB();

app.use(cors())
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);


app.listen(port, console.log(`The app is runnig in port ${port}`))