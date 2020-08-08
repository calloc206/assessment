(function(){
    'use strict';
    const userNameInput    = document.getElementById('user-name');
    const assessmentButton = document.getElementById('assessment');
    const resultDevided    = document.getElementById('result-area');
    const tweetDevided     = document.getElementById('tweet-area');

    assessmentButton.onclick=() => {
        const userName = userNameInput.value;
        if(userName.length===0){
            return;     //名前が空の場合は処理を終了する
        }

        // 診断結果表示エリアの作成
        while(resultDevided.firstChild){
            resultDevided.removeChild(resultDevided.firstChild);
        }
        const header = document.createElement('h3');
        header.innerText='診断結果';
        resultDevided.appendChild(header);

        const paragraph = document.createElement('p');
        const result=assessment(userName);
        paragraph.innerText=result;
        resultDevided.appendChild(paragraph);

        // ツイートエリアの作成
        removeAllChildren(tweetDevided);
        const anchor = document.createElement('a');
        const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag=あなたのいいところ&ref_src=twsrc%5Etfw';
        anchor.setAttribute('href', hrefValue);
        anchor.className='twitter-hashtag-button';
        anchor.innerText='Tweet #あなたのいいところ';
        tweetDevided.appendChild(anchor);
        twttr.widgets.load();
    };
    function removeAllChildren(element)
    {
        while(element.firstChild){
            element.removeChild(element.firstChild);
        }
    }
    const answers=[
        '{userName}のいいところは声です。{userName}の特徴的な声は皆を引き付け、心に残ります。',
        '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方ないでしょう。',
        '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
        '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
        '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
        '{userName}のいいところはユニークさです。{userName}だけの特徴が皆を楽しくさせます。',
        '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
        '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が惹かれます。',
        '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
        '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
        '{userName}のいいところは感受性です。{userName}が感じたことに皆が感謝し、わかりあえることができます。',
        '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
        '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
        '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
        '{userName}のいいところは全てです。ありのままの{userName}自身がいいところなのです。',
        '{userName}のいいところは自制心です。まずいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。',
        '{userName}のいいところは優しさです。{userName}の優しい雰囲気や立ち振る舞いに多くの人が癒されています。！'
    ];
    /**
     * 名前の文字列を渡すと診断結果を返す
     * @param {string} userName　ユーザの名前
     * @return {string} 診断結果
     */
    function assessment(userName){
        //全文字のコード番号を取得して合計する
        let sumOfCharCode=0;
        for(let i=0; i<userName.length; i++){
            sumOfCharCode+=userName.charCodeAt(i);
        }
        //文字コード番号合計を回答の数で割って、添え字の数字を決定する
        const index = sumOfCharCode % answers.length;

        //TODO{userName}をユーザの名前に置き換える
        let result = answers[index];
        result = result.replace(/{userName}/g, userName);
        return result;
    }
    console.assert(
        assessment('太郎') === '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
        '診断結果の文言を特定の部分を名前に置き換える処理が正しくありません。'
    );
    console.assert(
        assessment('太郎') === assessment('太郎'),
        '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
    );
})();
