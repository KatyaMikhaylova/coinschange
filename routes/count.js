const express = require('express');
const router = express.Router();

//include models
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
        //get data from form
        let data = new Data(Number(req.body.sum), Number(req.body.acoin), Number(req.body.percent), Number(req.body.bcoin));
        let resObj = new Result(0, 0, 0);
//main function
        let finalResult = final(data, resObj);
//render results
        res.render('index', {
            view: 'result',
            answer: finalResult,
            startdata: data
        });
    }
});

//function processes results and chooses the closest to the percentage chosen by user
let final = function (data, obj) {
    if (data.a > data.s && data.b > data.s) {
        obj.x = 0;
        obj.y = 0;
        obj.ost = data.s;
        return obj;
    } else {
        let test = count(data.a, data.b, data.s, data.getNod());
        console.log(test);
        let perx = data.percent / 100;
        let percents = test.map(function (val) {
            return (val[0] / (val[0] + val[1])).toFixed(3);
        });
        console.log(percents);
        const closest1 = Math.min(...percents.filter(function (val) {
            return val > perx
        }));
        const closest2 = Math.max(...percents.filter(function (val) {
            return val < perx
        }));
        const closest = Math.abs(perx - closest1) < Math.abs(perx - closest2) ? closest1 : closest2;
        console.log(closest.toFixed(3));
        let m = percents.indexOf(closest.toFixed(3).toString());
        console.log(m);
        if (m >= 0) {
            obj.x = test[m][0];
            obj.y = test[m][1];
            obj.ost = test.ost ? test.ost : 0;
            console.log(obj.ost);
            return obj;

        } else {
            obj.x = test[0];
            obj.y = test[1];
            obj.ost = test.ost ? test.ost : 0;
            return obj;
        }
    }
}


//function calls change function with arguments, depenting on incoming data
//considering excess after finding GCD and some exceptions
let count = function (a, b, c, gnod) {
    let arrResults = [];
    let nod = gnod;
    if (c % nod == 0) {
        if (nod == 1 && c % a !== 0 && c % b !== 0) {
            let answer = change(a, b, c - 1, arrResults);
            answer.ost = 1;
            return answer;
        }
        else {
        let answer = change(a, b, c, arrResults);
        return answer;
         }
    }
    else {
    let d = (c - c % nod);
    let answer = change(a, b, d, arrResults);
    answer.ost = c % nod;
    return answer;
    }
}
//function counts all possible combinations and returns them as an array
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
module.exports = router;