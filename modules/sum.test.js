const {add , sub , mul , div} = require('./cal');

// test('adds 1 + 2 to equal 3', () => {
//     expect(add(1, 2)).toBe(3);
// });

test('Adding two numbers', async () => {
    expect(add(5, 5)).toStrictEqual(10)
    console.log("add")
    expect(add(100, 200)).toStrictEqual(300)
});

test('1 - 4 to equal -3', () => {
    expect(sub(1, 4)).toBe(-3);
});

test('' , () => {

});

