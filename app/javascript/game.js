function game() {
  // DOM要素を取得
  const wordList = document.getElementById("wordList");
  const shuffleButton = document.getElementById("shuffleButton");

  // 画像要素を取得
  const wordItems = wordList.querySelectorAll(".wordItem");

  // シャッフルボタンがクリックされたときの処理
  shuffleButton.addEventListener("click", () => {
    // 画像要素をシャッフル
    const shuffledItems = Array.from(wordItems).sort(() => Math.random() - 0.5);

    // シャッフルされた画像を表示領域に追加
    wordList.innerHTML = '';
    shuffledItems.forEach((item) => {
      wordList.appendChild(item);
    });
  });
};

document.addEventListener('turbo:load', game);