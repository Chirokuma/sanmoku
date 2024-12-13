document.addEventListener("DOMContentLoaded", function () {
    const dragItems = document.querySelectorAll(".dragItem");
    const dropCells = document.querySelectorAll(".dropCell");
    const combinedImageSrc = "path/to/your/combined-box-image.png";  // 合体後の重箱画像のパス
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
            alert("？！！お惣菜たちが・・・キングサイズになってしまった！"); // ドラクエ風のセリフ
            // 画像をぴかっと光らせる
            glowAndEnlarge(cells);
        }
    }

    // 画像が選択された時に大きくし、光らせる関数
    function enlargeAndGlow(image) {
        image.style.transform = "scale(1.2)";  // 画像を大きくする
        image.style.transition = "transform 0.3s ease"; // スムーズに拡大
        image.style.boxShadow = "0 0 15px 5px rgba(255, 255, 0, 0.8)";  // ぴかっと光らせる

        // 光るエフェクトの解除（数秒後に元に戻す）
        setTimeout(() => {
            image.style.transform = "scale(1)"; // 元の大きさに戻す
            image.style.boxShadow = "";  // 光を消す
        }, 1000); // 1秒後に元に戻す
    }

    // 同じ画像が9つ揃った時に、全ての画像をぴかっと光らせるエフェクト
    function glowAndEnlarge(cells) {
        // すべてのセルにドロップされた画像が同じかチェック
        const sameImage = cells[0].querySelector(".droppedImage").src;

        // 9つの画像を全て拡大＆光らせる
        cells.forEach(cell => {
            const image = cell.querySelector(".droppedImage");
            if (image && image.src === sameImage) {
                image.style.transform = "scale(1.2)";  // 画像を大きくする
                image.style.transition = "transform 0.3s ease"; // スムーズに拡大
                image.style.boxShadow = "0 0 15px 5px rgba(255, 255, 0, 0.8)";  // ぴかっと光らせる
            }
        });

        // 画像が合体して、重箱画像に変わるアニメーション
        setTimeout(() => {
            combineImagesAndTransform(cells);  // 9つを合体させる
        }, 1000); // 光るエフェクトが終わった後に合体させる
    }

    // 9つの画像を合体させ、重箱画像に変える関数
    function combineImagesAndTransform(cells) {
        // すべてのセルをクリア
        cells.forEach(cell => {
            const image = cell.querySelector(".droppedImage");
            if (image) {
                image.remove();  // 既存の画像を削除
            }
        });

        // 新しい重箱の画像を各セルに追加
        cells.forEach(cell => {
            const combinedImage = document.createElement("img");
            combinedImage.src = combinedImageSrc;  // 合体した重箱画像
            combinedImage.classList.add("combinedImage");
            cell.appendChild(combinedImage);

            // 重箱画像を中心にアニメーションで表示
            combinedImage.style.transform = "scale(0)";
            combinedImage.style.transition = "transform 0.5s ease";
            setTimeout(() => {
                combinedImage.style.transform = "scale(1)";
            }, 10);
        });

        // 重箱画像が完成したら、アニメーションを終わらせる
        setTimeout(() => {
            cells.forEach(cell => {
                const combinedImage = cell.querySelector(".combinedImage");
                if (combinedImage) {
                    combinedImage.style.transition = "none";  // アニメーション終了後は変化しないようにする
                }
            });
        }, 1500);
    }

    // 削除ボタンの処理
    const deleteBtn = document.getElementById("deleteBtn");
    deleteBtn.addEventListener("click", () => {
        dropCells.forEach(cell => {
            const image = cell.querySelector(".droppedImage");
            if (image) {
                image.remove();  // 画像を削除
            }
        });
    });
});
