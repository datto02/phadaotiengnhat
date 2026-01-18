export const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D");
};

export const getHex = (char) => char.codePointAt(0).toString(16).toLowerCase().padStart(5, '0');

export const shuffleString = (str) => {
    const arr = [...str];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join('');
};

export const getUniqueChars = (str) => Array.from(new Set(str)).join('');

export const getAllowedRegexString = (options, allowLatin = false) => {
    let ranges = "\\s"; 
    if (allowLatin) ranges += "a-zA-Z";
    if (options.hiragana) ranges += "\\u3040-\\u309F";
    if (options.katakana) ranges += "\\u30A0-\\u30FF";
    if (options.kanji) ranges += "\\u4E00-\\u9FAF\\u3400-\\u4DBF\\u2E80-\\u2FDF\\uF900-\\uFAFF"; 
    return ranges;
};
