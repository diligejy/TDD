function refineText(source, options) {

    return [normalizeWhiteSpaces, compactWhiteSpaces, maskBannedWords].reduce((value, filter) => filter(value, options), source);



    function normalizeWhiteSpaces(source) {
        return source
            .replace("\t", " ");
    }
}

function maskBannedWords(source, options) {
    return options ? options.bannedWords.reduce(maskBannedWord, source) : source;
    if (options) {
        return options.bannedWords.reduce(maskBannedWord, source);
        // for (const bannedWord of options.bannedWords) {
        //     source = maskBannedWord(bannedWord, source);
        //     // source = source.replace(bannedWord, "*".repeat(bannedWord.length));
        // }
    }
    return source;
}

function maskBannedWord(source, bannedWord) {
    const mask = "*".repeat(bannedWord.length);
    return source.replace(bannedWord, mask);
}

function compactWhiteSpaces(source) {
    return source.indexOf("  ") < 0 ? source : compactWhiteSpaces(source.replace("  ", " "));
}

module.exports = refineText;