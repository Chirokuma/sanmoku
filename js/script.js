document.addEventListener("DOMContentLoaded", function () {
    const dragItems = document.querySelectorAll(".dragItem");
    const dropCells = document.querySelectorAll(".dropCell");
    let selectedImage = null;  // 現在選択されている画像

    // ドラッグが開始された時に、アイテムのIDを保存
    dragItems.forEach(item => {
        item.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("text", item.id);
        });
    });

    // 各ドロップセルに対してドラッグオーバーとドロップの処理
    dropCells.forEach(cell => {
        cell.addEventListener("dragover", (e) => {
            e.preventDefault();  // ドロップを許可するために必要
        });

        cell.addEventListener("drop", (e) => {
            e.preventDefault();
            const draggedItemId = e.dataTransfer.getData("text");
            const draggedItem = document.getElementById(draggedItemId);
            const draggedImageSrc = draggedItem.querySelector("img").src;

            // 既に画像が入っている場合は、入れ替え
            if (cell.querySelector(".droppedImage")) {
                const existingImage = cell.querySelector(".droppedImage");
                existingImage.src = draggedImageSrc;  // 入れ替え
            } else {
                // ドロップされた画像を新しいセルに追加
                const droppedImage = document.createElement("img");
                droppedImage.src = draggedImageSrc;
                droppedImage.classList.add("droppedImage");
                cell.appendChild(droppedImage);

                // 画像をクリックして選択できるようにする
                droppedImage.addEventListener("click", () => {
                    // 画像を選択状態にする
                    if (selectedImage) {
                        selectedImage.classList.remove("selected");
                    }
                    selectedImage = droppedImage;
                    selectedImage.classList.add("selected");
                    enlargeAndGlow(selectedImage); // 画像を大きくし、光らせる
                });
            }

            // 9マスが同じ画像で埋まったかチェック
            checkAndTransform(dropCells);
        });
    });

    // 9マスが同じ画像で埋まったかチェックする関数
    function checkAndTransform(cells) {
        // すべてのセルにドロップされた画像があるか確認
        const images = Array.from(cells).map(cell => {
            return cell.querySelector(".droppedImage") ? cell.querySelector(".droppedImage").src : null;
        });

        // すべての画像が同じかをチェック
        const allSame = images.every(img => img === images[0] && img !== null);

        if (allSame) {
            alert("な なんと…おせちの料理たちが…！！ キングサイズになってしまった！！");

            // 画像をぴかっと光らせてから合体させる
            glowAndEnlarge(cells);
        }
    }

    // 同じ画像が9つ揃った時に、全ての画像をぴかっと光らせ、巨大化する処理
    function glowAndEnlarge(cells) {
        // すべてのセルにドロップされた画像が同じかチェック
        const sameImage = cells[0].querySelector(".droppedImage").src;

        // 9つの画像を全て拡大＆光らせる
        cells.forEach(cell => {
            const image = cell.querySelector(".droppedImage");
            if (image && image.src === sameImage) {
                image.style.transform = "scale(1.5)";  // 画像を大きくする
                image.style.transition = "transform 0.3s ease"; // スムーズに拡大
                image.style.boxShadow = "0 0 15px 5px rgba(255, 255, 0, 0.8)";  // ぴかっと光らせる
            }
        });

        // 1秒後に画像を1つにまとめる
        setTimeout(() => {
            combineImagesAndTransform(cells);
        }, 1000); // 光った後に合体させる
    }

    // 9つの画像を1つの巨大な画像に変える関数
    function combineImagesAndTransform(cells) {
        // 画像のサイズを設定
        const cellWidth = cells[0].offsetWidth;  // セルの幅
        const cellHeight = cells[0].offsetHeight;  // セルの高さ
        const largeImageSize = 3 * cellWidth * 0.9;  // 9マス分の大きさに少し小さく調整（0.9倍）

        // 各セルから画像を取り出し、削除する
        const imageSrc = cells[0].querySelector(".droppedImage").src;

        // 画像を削除（9つの画像を消去）
        cells.forEach(cell => {
            const image = cell.querySelector(".droppedImage");
            if (image) {
                image.remove();  // 既存の画像を削除
            }
        });

        // 合体した画像を作成
        const combinedImage = document.createElement("img");
        combinedImage.src = imageSrc;  // 最初の画像と同じ画像を使う
        combinedImage.classList.add("combinedImage");

        // セルの中央に巨大化した画像を追加
        const centralCell = cells[4];  // セルの真ん中に追加
        centralCell.appendChild(combinedImage);

        // 合体した画像を9マス分の大きさに拡大
        combinedImage.style.width = `${largeImageSize}px`;  // 画像の幅を調整（9マス分のサイズより少し小さく）
        combinedImage.style.height = `${largeImageSize}px`;  // 画像の高さを調整
        combinedImage.style.position = "absolute";  // 画像の位置を絶対位置に設定
        combinedImage.style.left = "50%";  // セルの50%の位置に配置
        combinedImage.style.top = "48%";  // セルの50%の位置に配置
        combinedImage.style.transform = "translate(-50%, -50%)";  // 中央に配置

        combinedImage.style.transition = "width 0.5s ease, height 0.5s ease"; // スムーズに拡大

        // 画像が完成したらアニメーションを終了
        setTimeout(() => {
            combinedImage.style.transition = "none";  // アニメーション終了後は変化しないようにする
        }, 1500);
    }

    // 削除ボタンの処理
    const deleteBtn = document.getElementById("deleteBtn");
    deleteBtn.addEventListener("click", () => {
        if (selectedImage) {
            // 選択されている画像があれば、それを削除
            selectedImage.remove();
            selectedImage = null;  // 削除した後に選択を解除
        }
    });

    // 画像を選択した時に枠をつける
    droppedImage.addEventListener("click", () => {
        // 既に選択されている画像があれば、枠を取り外す
        if (selectedImage) {
            selectedImage.classList.remove("selected");
        }

        // 新しく選択された画像に枠をつける
        selectedImage = droppedImage;
        selectedImage.classList.add("selected");
        enlargeAndGlow(selectedImage);  // 画像を大きくし、光らせる
    });
    document.addEventListener("DOMContentLoaded", function () {
        const dragItems = document.querySelectorAll(".dragItem");
        const dropCells = document.querySelectorAll(".dropCell");
        let draggedImage = null;  // ドラッグ中の画像を保持

        // ドラッグが開始された時に、ドラッグ中のアイテムを保存
        dragItems.forEach(item => {
            item.addEventListener("dragstart", (e) => {
                draggedImage = item.querySelector("img");  // ドラッグした画像を保持
            });
        });

        // 各ドロップセルに対してドラッグオーバーとドロップの処理
        dropCells.forEach(cell => {
            // ドラッグオーバーを許可
            cell.addEventListener("dragover", (e) => {
                e.preventDefault();  // ドロップを許可するために必要
            });

            // ドロップ処理
            cell.addEventListener("drop", (e) => {
                e.preventDefault();

                // ドロップされたセルに画像が既にある場合、その画像を保持
                const currentImage = cell.querySelector(".droppedImage");

                if (currentImage) {
                    // 現在のセルに画像があれば、画像を入れ替える
                    cell.querySelector(".droppedImage").remove();  // 現在の画像を削除
                }

                // ドラッグした画像を現在のセルに移動
                const droppedImage = draggedImage.cloneNode();  // ドラッグ中の画像を複製
                droppedImage.classList.add("droppedImage");
                cell.appendChild(droppedImage);

                // 画像を元のセルから削除
                const originalCell = draggedImage.parentElement;
                draggedImage.remove();

                // 画像を元のセルに戻す
                originalCell.appendChild(draggedImage);

                // 画像を選択できるようにする
                droppedImage.addEventListener("click", () => {
                    if (selectedImage) {
                        selectedImage.classList.remove("selected");
                    }
                    selectedImage = droppedImage;
                    selectedImage.classList.add("selected");
                    enlargeAndGlow(selectedImage); // 画像を大きくし、光らせる
                });
            });
        });
    });
    // 巨大化した画像を選択できるようにする
    const combinedImage = document.querySelector(".combinedImage");
    if (combinedImage) {
        combinedImage.addEventListener("click", () => {
            // 既に選択されている画像があれば、枠を取り外す
            if (selectedImage) {
                selectedImage.classList.remove("selected");
            }

            // 現在クリックした巨大化した画像を選択
            selectedImage = combinedImage;
            selectedImage.classList.add("selected");
        });
    }


});



window.addEventListener('DOMContentLoaded', () => {
    // コンテナを指定
    const section = document.querySelector('.cherry-blossom-container');

    // 梅の花びらを生成する関数
    const createPetal = () => {
        const petalEl = document.createElement('span'); // 'span' 要素を新たに作成
        petalEl.className = 'petal'; // 作成した要素に 'petal' クラスを設定

        // 梅の花びらは桜よりも小さめ
        const minSize = 8;
        const maxSize = 12;
        const size = Math.random() * (maxSize + 1 - minSize) + minSize; // ランダムなサイズを計算

        petalEl.style.width = `${size}px`; // サイズを花びらの幅と高さに適用
        petalEl.style.height = `${size}px`;

        // 梅の花びらの形を丸くする
        petalEl.style.borderRadius = '50%';

        // ランダムな位置を設定（画面幅内で）
        petalEl.style.left = Math.random() * innerWidth + 'px';

        // 梅の花の色を設定（少し濃いピンクや赤）
        petalEl.style.backgroundColor = `rgb(${Math.floor(Math.random() * 50) + 180}, ${Math.floor(Math.random() * 50) + 100}, ${Math.floor(Math.random() * 50) + 100})`;

        // 'section' 要素に花びらを追加
        section.appendChild(petalEl);

        // 一定時間が経てば花びらを消す
        setTimeout(() => {
            petalEl.remove();
        }, 10000);
    }

    // 花びらを生成する間隔をミリ秒で指定
    setInterval(createPetal, 300);
});


// ---------------------------

// 開始時間
let startTime;
// 経過秒数用 タイマーID
let timer;
// カードめくり用 タイマーID(動作中はカードがめくれないように)
let backTimer;
// 1枚目かどうかのフラグ(1枚目: true 2枚目: false)
let flgFirst = true;
// 1枚目のカードを格納
let cardFirst;
// そろえた枚数(ペアができるたびに+1 10ペアで終了)
let countUnit = 0;

let img_arr = [
    "luffy", "zoro", "sanji", "nami", "usopp",
    "robin", "chopper", "franky", "brook", "luffy2"
];
let img_tag_arr = [];
for (let i = 0; i < 10; i++) {
    img_tag_arr.push("<img src='" + img_arr[i] + ".png'>")
}

window.onload = function () {
    let arr = [];
    for (let i = 0; i < 10; i++) {
        arr.push(i);
        arr.push(i);
    }  //[0,0,1,1,2,2,...........8,8,9,9] 合計20の要素

    shuffle(arr);// シャッフル [1,7,3,4,4,5......]
    let game_board = document.getElementById('game_board');

    // div要素作成(カード)
    for (i = 0; i < 20; i++) {
        let div = document.createElement('div');
        div.className = 'card back'; //カードの裏側を表示
        div.number = arr[i]; //プロパティを設定
        //console.log(Object.keys(div));
        //console.log(Object.values(div));
        div.onclick = turn;
        game_board.appendChild(div);
    }
    startTime = new Date(); // 開始時刻を取得
    startTimer(); // タイマー開始
}
//シャッフル用関数
function shuffle(arr) {
    let n = arr.length;
    while (n) { //nが0になったら終了      ここで毎回-1
        i = Math.floor(Math.random() * n--);
        [arr[n], arr[i]] = [arr[i], arr[n]]
    }
    return arr;
}
// カードクリック時の処理
function turn(e) {
    let div = e.target; //クリックしたカード
    // カードのタイマー処理が動作中は return
    if (backTimer) return; //連続で押せないように
    // 裏向きのカードをクリックした場合は画像を表示する
    if (div.innerHTML == '') {
        div.className = 'card'; //backというクラス名を取り除いた
        div.innerHTML = img_tag_arr[div.number];
    } else {
        return // 数字が表示されているカードは return
    }
    if (flgFirst) { // 1枚目の処理 一枚目ならtrue
        cardFirst = div;  //最初にクリックしたカード
        flgFirst = false; //次は２枚目だから
    } else { // ２枚目の処理
        if (cardFirst.number == div.number) {
            countUnit++; //揃ったペアの数
            backTimer = setTimeout(function () {
                div.className = 'card finish'; //0.5秒で透明
                cardFirst.className = 'card finish';
                backTimer = NaN;
                if (countUnit == 10) { //すべてカードが揃ったら
                    clearInterval(timer);  // timer終了
                    //setInterval(showSecond, 1000)
                }
            }, 500)
        } else {
            backTimer = setTimeout(function () {
                div.className = 'card back';
                div.innerHTML = ''; // カードを裏側に戻す
                cardFirst.className = 'card back';
                cardFirst.innerHTML = '';
                cardFirst = null;
                backTimer = NaN;
            }, 500);
        }
        flgFirst = true;
    }
}
// タイマー開始
function startTimer() {
    timer = setInterval(showSecond, 1000);
}
// 秒数表示
function showSecond() {
    let nowTime = new Date();
    let elapsedTime = Math.floor((nowTime - startTime) / 1000);
    let str = '経過秒数: ' + elapsedTime + '秒';
    let re = document.getElementById('result');
    re.innerHTML = str;
}

