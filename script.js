// HTMLの要素を取得
const numberInput = document.getElementById('number-input');
const calculateButton = document.getElementById('calculate-button');
const resultText = document.getElementById('result-text');

/**
 * 素因数分解を行う関数 (Devide.swiftのロジックに相当)
 * @param {number} num - 素因数分解する整数
 * @returns {string} - 分解結果の文字列
 */
function primeFactorize(num) {
    const factors = [];
    let divisor = 2;
    let n = num;

    // 2で割り切れるだけ割る
    while (n % 2 === 0) {
        factors.push(2);
        n /= 2;
    }

    // 3以上の奇数で割っていく
    divisor = 3;
    // 割る数の2乗がnを超えるまで調べればOK (sqrt(n)までと同じ意味)
    while (divisor * divisor <= n) {
        if (n % divisor === 0) {
            factors.push(divisor);
            n /= divisor;
        } else {
            divisor += 2; // 次の奇数へ
        }
    }

    // 最後にnが1より大きい場合、残ったnは素数
    if (n > 1) {
        factors.push(n);
    }
    
    // 配列の要素を ' × ' で連結して文字列にする
    return factors.join(' × ');
}


// ボタンがクリックされたときの処理
calculateButton.addEventListener('click', () => {
    // 入力値を取得し、整数に変換
    const inputValue = parseInt(numberInput.value, 10);

    // Swiftコードのバリデーションに相当
    if (isNaN(inputValue) || inputValue < 2) {
        resultText.textContent = '2以上の整数を入れてね';
    } else if (inputValue >= 1000000000000) {
        // Swiftの制限と同じ値に設定
        resultText.textContent = 'でかすぎ';
    } else {
        // 素因数分解を実行して結果を表示
        const result = primeFactorize(inputValue);
        resultText.textContent = `${inputValue} = ${result}`;
    }
});