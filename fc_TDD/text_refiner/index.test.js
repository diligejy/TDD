// sut = system under test
const sut = require("./index");

// test('sut transforms "hello  world" to "hello world"', () => {
//     const actual = sut("hello  world");
//     expect(actual).toBe("hello world");
// })

// test('sut transforms "hello    world" to "hello world"', () => {
//     const actual = sut("hello    world");
//     expect(actual).toBe("hello world");
// });

// test('sut transforms "hello   world" to "hello world"', () => {
//     const actual = sut("hello   world");
//     expect(actual).toBe("hello world");
// });

// for loop 으로 비용 줄이기 => 어디서 실패하는지 나오지 않고, 실패하면 뒤에 요소는 테스트하지 않는 문제
// test('sut correctly works', () => {
//     for (const source of ['hello  world', 'hello   world', 'hello    world']) {
//         const actual = sut(source);
//         expect(actual).toBe("hello world");
//     }
// });


// parameterized test

test.each`
    source | expected
    ${"hello  world"}   | ${"hello world"}
    ${"hello   world"}  | ${"hello world"}
    ${"hello    world"} | ${"hello world"}
`('sut transforms "$source" to "$expected"', ({ source, expected }) => {
    const actual = sut(source);
    expect(actual).toBe(expected);
})

