// let getNod = function (a,b){
//     let tmp=0;
//     while (a!==0 && b !==0){
//         a%=b;
//         tmp=a;
//         a=b;
//         b=tmp}
//     return a+b;
// }
let arrResults =[]

//console.log (getNod(10,6));
let change = function (a,b,c,result) {
    let end = Math.max(a,b,c,);
    for (let i=0; i<=end; i++){
        for (let j=0; j<=end; j++){

            if (a*i+b*j==c){


                result.push ([i,j]);

            }
        }
    }
    return result;
}


let res= {
    x: 0,
    y:0,
    ost:0
};
let count = function (a,b,c,obj) {
    if (a > c && b > c) {
        obj.x = 0;
        obj.y = 0;
        obj.ost = c;
        return obj;
    } else {
        let nod = getNod(a, b);
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
}


let test = count (5,10,131,res);
console.log(test);

let percents = test.map(function(val){
    return (val[0]/(val[0]+val[1])).toFixed(2);
});

let perx=0.2;
const closest=Math.max (...percents.filter(function (val)  { return val < perx}));
let m=percents.indexOf(closest.toString());
if (m>=0) {
    console.log(m);
    console.log(test[m]);

} else {
    console.log (test);
}
if (test.ost) console.log (test.ost);
// console.log(test.x);
// console.log(test.y);
// console.log(test.ost);