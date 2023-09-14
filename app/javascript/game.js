function generateRandomHiragana() {
  const hiraganaCharacters = ["あ", "り"];
  // const hiraganaCharacters = ["あ", "い", "う", "え", "お", "か", "き", "く", "け", "こ", "さ", "し", "す", "せ", "そ", "た", "ち", "つ", "て", "と", "な", "に", "ぬ", "ね", "の", "は", "ひ", "ふ", "へ", "ほ", "ま", "み", "む", "め", "も", "や", "ゆ", "よ", "ら", "り", "る", "れ", "ろ", "わ"];
  return hiraganaCharacters[Math.floor(Math.random() * hiraganaCharacters.length)];
}

function game() {
  const currentCharacter = generateRandomHiragana();
  const currentWordElement = document.getElementById("currentWord");
  currentWordElement.textContent = currentCharacter;

  async function getUnselectedImages() {
    const response = await fetch('/games/get_unselected_images', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Failed to fetch unselected images.');
    }
  }

  async function displayUnselectedImages() {
    const unselectedImages = await getUnselectedImages();

    const wordList = document.getElementById('wordList');
    wordList.innerHTML = '';

    unselectedImages.forEach((image) => {
      const wordItem = document.createElement('div');
      wordItem.className = 'wordItem';
      const imageElement = document.createElement('img');
      imageElement.src = image.image_url; // 画像のURLを設定
      wordItem.appendChild(imageElement);
      wordList.appendChild(wordItem);
    });
  }

  // ページ読み込み時に未選択の画像を表示
  document.addEventListener('DOMContentLoaded', displayUnselectedImages);

  // 画像要素を取得
  const wordList = document.getElementById("wordList");
  const shuffleButton = document.getElementById("shuffleButton");
  // 画像要素を取得
  const wordItems = wordList.querySelectorAll(".wordItem");

  //以下、追記した箇所

  // 画像をクリックしたときのハンドラを追加
  wordItems.forEach((item) => {
    item.addEventListener("click", () => {
      console.log("イベント発火"); // コンソールにメッセージを表示
    });
  });
}

document.addEventListener('turbo:load', game);