const dragItems = document.querySelectorAll('.dragItem');
const dropArea = document.getElementById('dropArea');
const deleteBtn = document.getElementById('deleteBtn');
let selectedImage = null;
// 各ドラッグアイテムにドラッグイベントを設定
dragItems.forEach(item => {
      item.addEventListener('dragstart', (event) => {
            event.target.style.opacity = '0.5';
            event.dataTransfer.setData('text', event.target.id);
      });
      item.addEventListener('dragend', (event) => {
            event.target.style.opacity = '1';
      });
});
// ドロップエリアにドロップを許可
dropArea.addEventListener('dragover', (event) => {
      event.preventDefault();
});
// アイテムをドロップした時
dropArea.addEventListener('drop', (event) => {
      event.preventDefault();
      const data = event.dataTransfer.getData('text');
      const droppedItem = document.getElementById(data);
      // ドロップエリア内に画像を配置
      if (droppedItem && !droppedItem.classList.contains('droppedImage')) {
            const rect = dropArea.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            // グリッドのセルに合わせた位置に配置
            const gridX = Math.floor(x / (rect.width / 3)); // 3列
            const gridY = Math.floor(y / (rect.height / 3)); // 3行
            // ドロップした画像をドロップ位置に配置
            droppedItem.classList.add('droppedImage');
            droppedItem.style.gridColumnStart = gridX + 1;
            droppedItem.style.gridRowStart = gridY + 1;
            // ドロップした画像を選択可能に
            droppedItem.addEventListener('click', () => {
                  if (selectedImage) {
                        selectedImage.classList.remove('selected');
                  }
                  selectedImage = droppedItem;
                  selectedImage.classList.add('selected');
            });
      }
});
// 削除ボタンの処理
deleteBtn.addEventListener('click', () => {
      if (selectedImage) {
            selectedImage.remove();
            selectedImage = null;
      }
});

let search = document.getElementById('search');
search.addEventListener('click', () => {

      let api = 'https://zipcloud.ibsnet.co.jp/api/search?zipcode=';
      let error = document.getElementById('error');
      let input = document.getElementById('input');
      let address1 = document.getElementById('address1');
      let address2 = document.getElementById('address2');
      let address3 = document.getElementById('address3');
      let param = input.value.replace("-", ""); //入力された郵便番号から「-」を削除
      let url = api + param;

      fetchJsonp(url, {
            timeout: 10000, //タイムアウト時間
      })
            .then((response) => {
                  error.textContent = ''; //HTML側のエラーメッセージ初期化
                  return response.json();
            })
            .then((data) => {
                  if (data.status === 400) { //エラー時
                        error.textContent = data.message;
                  } else if (data.results === null) {
                        error.textContent = '郵便番号から住所が見つかりませんでした。';
                  } else {
                        address1.value = data.results[0].address1;
                        address2.value = data.results[0].address2;
                        address3.value = data.results[0].address3;
                  }
            })
            .catch((ex) => { //例外処理
                  console.log(ex);
            });
}, false);