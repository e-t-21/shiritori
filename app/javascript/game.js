// ひらがな文字列のリスト
//const hiraganaCharacters = ["あ", "い", "う", "え", "お", "か", "き", "く", "け", "こ", "さ", "し", "す", "せ", "そ", "た", "ち", "つ", "て", "と", "な", "に", "ぬ", "ね", "の", "は", "ひ", "ふ", "へ", "ほ", "ま", "み", "む", "め", "も", "や", "ゆ", "よ", "ら", "り", "る", "れ", "ろ", "わ"];
const hiraganaCharacters = ["ひ", "あ", "い", "う", "り", "お"];
let currentCharacter = "";

// ランダムなインデックスを生成
const randomIndex = Math.floor(Math.random() * hiraganaCharacters.length);

// ランダムな文字を別の変数にセット
const randomHiraganaCharacter = hiraganaCharacters[randomIndex];

console.log(randomHiraganaCharacter); // ランダムに選ばれたひらがな文字が表示されます

function generateRandomHiragana() {
  return randomHiraganaCharacter[Math.floor(Math.random() * randomHiraganaCharacter.length)];
}

function game() {
  // ランダムな文字を生成
  currentCharacter = generateRandomHiragana();
  const currentWordElement = document.getElementById("currentWord");
  currentWordElement.textContent = currentCharacter;

  // カタカナをひらがなに変換し、記号を除外する関数
  function katakanaToHiraganaAndRemoveSymbols(text) {
    // カタカナをひらがなに変換
    text = text.replace(/[\u30a1-\u30f6]/g, (match) => {
      const offset = match.charCodeAt(0) - 0x30a1;
      return String.fromCharCode(0x3041 + offset);
    });

    // 全角記号を削除
    text = text.replace(/[、。，．！？・ー]/g, '');

    // 記号「ー」などを削除
    text = text.replace(/ー/g, '');

    return text;
  }

  // 画像要素を取得
  const wordItems = wordList.querySelectorAll(".wordItem");

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
        return randomHiraganaCharacter.includes(firstCharacter);
      };

      // name、backName1、backName2、backName3 のいずれかにマッチすれば true
      const isNameMatch = hiraganaName && checkFirstCharacter(hiraganaName);
      const isBackName1Match = backName1 && checkFirstCharacter(hiraganaBackName1);
      const isBackName2Match = backName2 && checkFirstCharacter(hiraganaBackName2);
      const isBackName3Match = backName3 && checkFirstCharacter(hiraganaBackName3);

      // 語尾が「ん」かどうかをチェック
      const endsWithN = (word) => {
        return word.slice(-1) === "ん";
      };

      // いずれかの文字が一致するかチェック
      const isAnyMatch = isNameMatch || isBackName1Match || isBackName2Match || isBackName3Match;

      // 結果をコンソールに表示
      console.log(`nameの頭文字一致: ${isNameMatch}`);
      console.log(`back_name1の頭文字一致: ${isBackName1Match}`);
      console.log(`back_name2の頭文字一致: ${isBackName2Match}`);
      console.log(`back_name3の頭文字一致: ${isBackName3Match}`);

      if (isAnyMatch) {
        let currentWord = "";
        if (isNameMatch) {
          currentWord = hiraganaName;
        } else if (isBackName1Match) {
          currentWord = hiraganaBackName1;
        } else if (isBackName2Match) {
          currentWord = hiraganaBackName2;
        } else if (isBackName3Match) {
          currentWord = hiraganaBackName3;
        }

        // 語尾だけを表示
        const lastCharacter = currentWord.slice(-1);
        currentWordElement.textContent = lastCharacter;

        if (endsWithN(currentWord)) {
          console.log("ゲーム終了イベント発火");
        }
      } else {
        console.log("falseイベント発火");
      }
    });
  });
}

document.addEventListener('turbo:load', game);