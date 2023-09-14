const hiraganaCharacters = ["ま"];
// const hiraganaCharacters = ["あ", "い", "う", "え", "お", "か", "き", "く", "け", "こ", "さ", "し", "す", "せ", "そ", "た", "ち", "つ", "て", "と", "な", "に", "ぬ", "ね", "の", "は", "ひ", "ふ", "へ", "ほ", "ま", "み", "む", "め", "も", "や", "ゆ", "よ", "ら", "り", "る", "れ", "ろ", "わ"];

function generateRandomHiragana() {
  return hiraganaCharacters[Math.floor(Math.random() * hiraganaCharacters.length)];
}

function game() {
  const currentCharacter = generateRandomHiragana();
  const currentWordElement = document.getElementById("currentWord");
  currentWordElement.textContent = currentCharacter;

  // 画像要素を取得
  const wordItems = wordList.querySelectorAll(".wordItem");

  /// カタカナをひらがなに変換し、記号を除外する関数
  function katakanaToHiraganaAndRemoveSymbols(text) {
    // カタカナをひらがなに変換し、全角記号を削除
    return text.replace(/[\u30a1-\u30f6、。，．！？]/g, (match) => {
      const offset = match.charCodeAt(0) - 0x30a1;
      return String.fromCharCode(0x3041 + offset);
    }).replace(/[、。，．！？]/g, '');
  }

  // 画像をクリックしたときのハンドラを追加
  wordItems.forEach((item) => {
    item.addEventListener("click", () => {
      // クリックされた要素からデータを取得
      const name = item.dataset.name;
      const backName1 = item.dataset.backName1;
      const backName2 = item.dataset.backName2;
      const backName3 = item.dataset.backName3;

      // データをコンソールに表示
      console.log("name:", name);
      console.log("back_name1:", backName1);
      console.log("back_name2:", backName2);
      console.log("back_name3:", backName3);

      // カタカナをひらがなに変換し、記号を除外
      const hiraganaName = katakanaToHiraganaAndRemoveSymbols(name);
      const hiraganaBackName1 = katakanaToHiraganaAndRemoveSymbols(backName1);
      const hiraganaBackName2 = katakanaToHiraganaAndRemoveSymbols(backName2);
      const hiraganaBackName3 = katakanaToHiraganaAndRemoveSymbols(backName3);

      // 関数を使って頭文字を取得し、比較
      const checkFirstCharacter = (data) => {
        const firstCharacter = data.charAt(0);
        return hiraganaCharacters.includes(firstCharacter);
      };

      // 各データ属性の頭文字を比較
      const isNameMatch = checkFirstCharacter(hiraganaName);
      const isBackName1Match = checkFirstCharacter(hiraganaBackName1);
      const isBackName2Match = checkFirstCharacter(hiraganaBackName2);
      const isBackName3Match = checkFirstCharacter(hiraganaBackName3);

      // 結果をコンソールに表示
      console.log(`nameの頭文字一致: ${isNameMatch}`);
      console.log(`back_name1の頭文字一致: ${isBackName1Match}`);
      console.log(`back_name2の頭文字一致: ${isBackName2Match}`);
      console.log(`back_name3の頭文字一致: ${isBackName3Match}`);
    });
  });
}

document.addEventListener('turbo:load', game);