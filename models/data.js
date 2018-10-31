function Data (s, a, percent, b) {
    this.s = s;
    this.a = a;
    this.percent = percent;
    this.b = b
    this.getNod = function (){
        let tmp=0;
        while (a!==0 && b !==0){
            a%=b;
            tmp=a;
            a=b;
            b=tmp}
        return a+b;
    }
}

module.exports = Data;