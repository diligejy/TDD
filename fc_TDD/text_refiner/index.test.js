const faker = require('faker');
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
    ${"hello     world"} | ${"hello world"}
    ${"hello      world"} | ${"hello world"}
    ${"hello       world"} | ${"hello world"}
`('sut transforms "$source" to "$expected"', ({ source, expected }) => {
    const actual = sut(source);
    expect(actual).toBe(expected);
})

test.each`
    source | expected 
    ${"hello\t world"} | ${"hello world"}
    ${"hello \tworld"} | ${"hello world"}
`('sut transforms "$source" that contains tab character to "$expected"', ({ source, expected }) => {
    const actual = sut(source);
    expect(actual).toBe(expected);
})

test.each`
    source | bannedWords | expected 
    ${"hello mockist"} | ${["mockist", "purist"]} |${"hello *******"}  
    ${"hello purist"} | ${["mockist", "purist"]} |${"hello ******"}  
`('sut transforms "$source" that contains bannedWords to "$expected"', ({ source, bannedWords, expected }) => {
    const actual = sut(source, { bannedWords });
    expect(actual).toBe(expected);
})

describe('given banned word', () => {
    const bannedWord = faker.lorem.word();
    const source = "hello " + bannedWord;
    const expected = "hello " + "*".repeat(bannedWord.length);

    test(`${bannedWord} when invoke sut then it returns ${expected}`, () => {
        const actual = sut(source, { bannedWords: [bannedWord] })
        expect(actual).toBe(expected)
    })
})

test.each`
    source | expected
    ${" hello world"}  | ${"hello world"}
`('sut correctly trims whitespaces', ({ source, expected }) => {
    const actual = sut(source);
    expect(actual).toBe(expected);
})