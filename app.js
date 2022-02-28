const express = require('express');



const app = express();



app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true}))



app.set('view engine', 'ejs');

app.get('/home', (req, res) => {
    res.render('home')
})

app.listen(3000)