// const A = document.querySelector('#A')
// const B = document.querySelector('#B')
// const C = document.querySelector('#C')

// let count = 0

// A.addEventListener('click', () => {
//     count++;
//     // 奇数偶数の判定
//     if (count%2===1){
//         A.textContent = '🐶'
//     } else {
//         A.textContent = '🐱'
//     }
// })

// B.addEventListener('click', () => {
//     count++;
//     // 奇数偶数の判定
//     if (count%2===1){
//         B.textContent = '🐶'
//     } else {
//         B.textContent = '🐱'
//     }
// })

// C.addEventListener('click', () => {
//     count++;
//     // 奇数偶数の判定
//     if (count%2===1){
//         C.textContent = '🐶'
//     } else {
//         C.textContent = '🐱'
//     }
// })

// これは配列が入る
const masu = document.querySelectorAll('.board div');
console.log(masu);

let count = 0

for (let i = 0; i < 9; i++) {
    masu[i].addEventListener('click', () => {
        count++;

        // 奇数偶数の判定
        if (count % 2 === 1) {
            masu[i].textContent = '🐶'
            masu[i].classList.add('maru');
        } else {
            masu[i].textContent = '🐱'
            masu[i].classList.add('batu');
        }

        if (masu[0].textContent === '🐶' &&
            masu[1].textContent === '🐶' &&
            masu[2].textContent === '🐶'
        ){
            console.log(masu[0].textContent)
            console.log('🐶の勝ち！')
        }
    })
}

// イベントの外は読み込んだ瞬間に実行される
// if (masu[0].textContent === '🐶'){
//     console.log(masu[0].textContent)
//     console.log('🐶の勝ち！')
// }