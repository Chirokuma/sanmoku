// const A = document.querySelector('#A')

let count = 0

const masu = document.querySelectorAll('.board div');
console.log(masu);

masu[0].addEventListener('click', () => {
    count++;
    if (count % 2 !== 0) {
        masu[0].textContent = '🐶';
    } else {
        masu[0].textContent = '🐱';
    }
})

// A.addEventListener('click', () => {
//     count++;
//     if (count % 2 !== 0) {
//         A.textContent = '🐶';
//     } else {
//         A.textContent = '🐱';
//     }
// })
// B.addEventListener('click', () => {
//     count++;
//     if (count % 2 !== 0) {
//         B.textContent = '🐶';
//     } else {
//         B.textContent = '🐱';
//     }
// })
// C.addEventListener('click', () => {
//     count++;
//     if (count % 2 !== 0) {
//         C.textContent = '🐶';
//     } else {
//         C.textContent = '🐱';
//     }
// })
// D.addEventListener('click', () => {
//     count++;
//     if (count % 2 !== 0) {
//         D.textContent = '🐶';
//     } else {
//         D.textContent = '🐱';
//     }
// })
// E.addEventListener('click', () => {
//     count++;
//     if (count % 2 !== 0) {
//         E.textContent = '🐶';
//     } else {
//         E.textContent = '🐱';
//     }
// })
// F.addEventListener('click', () => {
//     count++;
//     if (count % 2 !== 0) {
//         F.textContent = '🐶';
//     } else {
//         F.textContent = '🐱';
//     }
// })
// G.addEventListener('click', () => {
//     count++;
//     if (count % 2 !== 0) {
//         G.textContent = '🐶';
//     } else {
//         G.textContent = '🐱';
//     }
// })
// H.addEventListener('click', () => {
//     count++;
//     if (count % 2 !== 0) {
//         H.textContent = '🐶';
//     } else {
//         H.textContent = '🐱';
//     }
// })
// I.addEventListener('click', () => {
//     count++;
//     if (count % 2 !== 0) {
//         I.textContent = '🐶';
//     } else {
//         I.textContent = '🐱';
//     }
// })
