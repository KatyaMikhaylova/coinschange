const express = require('express');
const router = express.Router();


let Data = require('../models/data');
let Result = require('../models/result');

router.get('/', function (req, res) {
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
        let resObj = new Result(0, 0, 0);

        let finalResult = final(data, resObj);

        res.render('index', {
            view: 'result',
            answer: finalResult,
            startdata: data
        });
    }
});


let final = function (data, obj) {
    if (data.a > data.s && data.b > data.s) {
        obj.x = 0;
        obj.y = 0;
        obj.ost = data.s;
        return obj;
    } else {
        let test = count(data.a, data.b, data.s, data.getNod());
        let perx = data.percent / 100;
        let percents = test.map(function (val) {
            return (val[0] / (val[0] + val[1])).toFixed(2);
        });
        const closest = Math.max(...percents.filter(function (val) {
            return val < perx
        }));
        let m = percents.indexOf(closest.toString());
        if (m >= 0) {
            obj.x = test[m][0];
            obj.y = test[m][1];
            obj.ost = test.ost;
            return obj;

        } else {
            obj.x = test[0];
            obj.y = test[1];
            obj.ost = test.ost;
            return obj;
        }
    }
}
let change = function (a, b, c, result) {
    let end = Math.max(a, b, c,);
    for (let i = 0; i <= end; i++) {
        for (let j = 0; j <= end; j++) {
            if (a * i + b * j == c) {
                result.push([i, j]);
            }
        }
    }
    return result;
}


let count = function (a, b, c, gnod) {
    let arrResults = [];
    let nod = gnod;
    if (c % nod == 0) {
        let answer = change(a, b, c, arrResults);
        return answer;
    } else {
        let d = (c - c % nod);
        let answer = change(a, b, d, arrResults);
        answer.ost = c % nod;
        return answer;
    }

}


module.exports = router;