// church numerals

type CNat  = <X> (f : (x: X) => X) => (x: X) => X

const zero  : CNat = f => x => x
const one   : CNat = f => x => f(x)
const two   : CNat = f => x => f(f(x))
const three : CNat = f => x => f(f(f(x)))

type NonZero<T extends number> = T extends 0 ? never : number extends T ? never : T

const do_n_times: <N extends number> (n : NonZero<N>) => CNat =
    n => f => x =>
        Array(n - 1).fill(0).reduce((p, c) => f(p) ,f(x))


const S = (x: number) : number => x + 1
const Z = 0

console.log("CNAT")
console.log(zero(S)(Z))
console.log(one(S)(Z))
console.log(do_n_times(1)(S)(Z))

const plus : (n : CNat) => (m : CNat) => CNat = n => m => f => x =>
    m(f)(n(f)(x))

console.log("plus")
console.log("1 + 2 =", plus(one)(two)(S)(Z))

const mult : (n : CNat) => (m : CNat) => CNat = n => m => f =>
    n(m(f))

console.log("mult")
console.log("10 * 10 =", mult(do_n_times(10))(do_n_times(10))(S)(Z))
console.log("100 * 0 =", mult(do_n_times(100))(zero)(S)(Z))

const exp : (n : CNat) => (m : CNat) => CNat = n => m =>
    m(n)

console.log("exp")
console.log("2^3 =", exp(two)(three)(S)(Z))
console.log("3^0 =", exp(three)(zero)(S)(Z))
console.log("3^2 =", exp(three)(two)(S)(Z))

const pred : (n : CNat) => CNat = n => f => x =>
    n<(h: typeof f) => ReturnType<typeof f>>(g => h => h(g(f)))(u => x)(u => u)

console.log("pred")
console.log("pred(0) =", pred(zero)(S)(Z))
console.log("pred(1) =", pred(one)(S)(Z))
console.log("pred(100) =", pred(do_n_times(100))(S)(Z))

const minus = (n : CNat) => (m : CNat) =>
    m<CNat>(pred)(n)

console.log("minus")
console.log("3 - 1 =",  minus(three)(one)(S)(Z))
console.log("2 - 1 =",  minus(two)(one)(S)(Z))
console.log("10 - 5 =", minus(do_n_times(10))(do_n_times(5))(S)(Z))
console.log("2 - 3 =",  minus(two)(three)(S)(Z))