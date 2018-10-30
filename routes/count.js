const express = require('express');
const router = express.Router();


let Data = require('../models/data');

router.get('/',  function (req, res) {
    res.render('index', {

        view: 'result'
    });
});

router.post('/', function (req, res) {
    req.checkBody('sum', 'Поле "Сумма для размена" должно быть заполнено').notEmpty();
    req.checkBody('acoin', 'Поле "Номинал первого вида монет" должно быть заполнено').notEmpty();
    req.checkBody('percent', 'Поле "Процент монет первого номинала (%)" должно быть заполнено').notEmpty();
    req.checkBody('bcoin', 'Поле "Номинал второго вида монет" должно быть заполнено').notEmpty();


    // Get Errors
    let errors = req.validationErrors();

    if (errors) {
        res.render('index', {

            errors: errors,

        });
    } else {

        let data = new Data(Number(req.body.sum), Number(req.body.acoin), Number(req.body.percent), Number(req.body.bcoin));
        console.log(data);
        let y = toSt(data);

        res.render('index', {

            view: 'result',
            answer: y
        });
    }
});
function toSt(x){
    return(x.s-x.a);
}

module.exports = router;