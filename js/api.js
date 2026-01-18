import { getHex } from './utils.js'; // Đã sửa đường dẫn

export const fetchDataFromGithub = async () => {
  try {
    const [dbResponse, onkunResponse] = await Promise.all([
      fetch('./data/kanji_db.json'),
      fetch('./data/onkun.json')
    ]);

    // Giữ lại logic cảnh báo từ bản gốc để dễ debug
    let kanjiDb = null;
    let onkunDb = null;

    if (dbResponse.ok) kanjiDb = await dbResponse.json();
    else console.warn("Không tải được kanji_db.json");

    if (onkunResponse.ok) onkunDb = await onkunResponse.json();
    else console.warn("Không tải được onkun.json");

    return { ...kanjiDb, ONKUN_DB: onkunDb }; 
  } catch (error) {
    console.error("Lỗi tải dữ liệu:", error);
    return null;
  }
};

export const fetchKanjiData = async (char) => {
    const hex = getHex(char);
    const sources = [
      `./data/svg/${hex}.svg`,
      `https://cdn.jsdelivr.net/gh/KanjiVG/kanjivg@master/kanji/${hex}.svg`,
      `https://cdn.jsdelivr.net/gh/KanjiVG/kanjivg@master/kanji/${hex}-Kaisho.svg`, // Khôi phục từ bản gốc
      `https://cdn.jsdelivr.net/gh/parsimonhi/animCJK@master/svgsKana/${hex}.svg`,
      `https://cdn.jsdelivr.net/gh/parsimonhi/animCJK@master/svgsJa/${hex}.svg`      // Khôi phục từ bản gốc
    ];
    for (const url of sources) {
      try {
        const res = await fetch(url);
        if (res.ok) {
            const text = await res.text();
            if (text.includes('<svg')) return { success: true, svg: text, source: url };
        }
      } catch (e) { continue; }
    }
    return { success: false };
};
