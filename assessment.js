'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

// assessmentButton.onclick = function(){
//     console.log('ボタンが押されました');
// };
assessmentButton.onclick = () => { //無名関数はアロー関数で書けます
    //診断結果エリアの削除
    console.log('resultArea削除');
    removeAllChildren(resultDivided);
    console.log('tweetArea削除');
    removeAllChildren(tweetDivided);

    const userName = userNameInput.value;
    if (userName.length == 0) { //空の時は処理を終了する
        return;
    }

    const header = document.createElement('h3');
    header.innerText = '診断結果';
    resultDivided.appendChild(header);

    const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);

    const anchor = document.createElement('a');
    const hrefValue = "https://twitter.com/intent/tweet?button_hashtag=" +
        encodeURIComponent('HTML勉強') +
        "&ref_src=twsrc%5Etfw";

    anchor.setAttribute('href', hrefValue);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweet #HTML勉強';

    const script = document.createElement('script');
    script.setAttribute('src','https://platform.twitter.com/widgets.js' );

    tweetDivided.appendChild(anchor);
    tweetDivided.appendChild(script);

    /**<
    a href = "https://twitter.com/intent/tweet?button_hashtag=HTML勉強&ref_src=twsrc%5Etfw"
    class = "twitter-hashtag-button"
    data - text = "診断内容"
    data - show - count = "false" > Tweet #HTML勉強 < /a>
    <script async src="https://platform.twitter.com/widgets.js" charset="
    utf - 8 "></script>
    **/

};

// アロー演算子　引数　=> {}
userNameInput.onkeydown = event => {
    if(event.key === 'Enter'){
        assessmentButton.onclick();
    }
};

const answers = [
    '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
    '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
    '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
    '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
    '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
    '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
    '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
    '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
    '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
    '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
    '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
    '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
    '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
    '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
    '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。'
];

/** 名前を渡すと結果を返す関数
    @param{string} userName
    @return{string} 診断結果

**/
function assessment(userName) {
    let sumOfCharCode = 0;
    for (let i = 0; i < userName.length; i++) {
        sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
    }
    const index = sumOfCharCode % answers.length;
    let result = answers[index];
    result = result.replace(/\{userName\}/g, userName);
    return result;
}


// 指定した要素の子供をすべて削除する
// @param {HTMLElement} element HTMLの要素
function removeAllChildren(element) {
    while (element.firstChild) {
        console.log('element.firstChildの中身⇒' + element.firstChild);
        //子供要素がある限り削除
        element.removeChild(element.firstChild);
    }

}


console.log(assessment('aaaa'));
console.log(assessment('bbbb'));
console.log(assessment('aaaa'));

console.assert(assessment('aaaa') === assessment('aaaa'), '一致しません');
