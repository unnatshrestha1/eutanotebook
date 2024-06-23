const connectToMongo=require('./db');
const express = require('express');
var cors = require('cors')

//index.js chai express-server vayeko chha
//models folder bhitra mongoose ko models banaune ho
//express ko website bata lyaeko boiler plate

connectToMongo();
const app = express()
const port = 5000

app.use(cors())
app.use(express.json()) //middleware ho yo cuz undefined vanera aairathyo when doing req.body ma json content euta with header of content type application/json....req.body use garne vaye yo middleware use garnu parcha

//Available Routes
app.use('/api/auth',require('./routes/auth.js'))
app.use('/api/notes',require('./routes/notes.js'))

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
