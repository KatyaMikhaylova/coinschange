const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

const app = express();


// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Express Validator Middleware
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        let namespace = param.split('.')
            , root    = namespace.shift()
            , formParam = root;

        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg   : msg,
            value : value
        };
    }
}));

// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.get('/',    function(req, res){
    res.render('index');
});
let count = require('./routes/count');
app.use('/count', count);

// Start Server
app.listen(process.env.PORT ||2213, function(){
    console.log('Server started on port 2213...');
});
