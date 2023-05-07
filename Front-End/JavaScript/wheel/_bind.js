const test = {
    name: 'Li, Ke',
    sayHi: function (greeting) {
        console.log(`${this.name} say ${greeting}`);
    }
}

Function.prototype._bind = function (context, ...args) {
    return (...newArgs) => this.apply(context, [...args, ...newArgs]);
}

test.sayHi("good morning");
test.sayHi.bind({ name: 'Xiang, Cai' })("good morning");
test.sayHi._bind({ name: 'Suan, Cai' })("good morning");