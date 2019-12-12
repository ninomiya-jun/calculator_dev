var num_1; // 数字１
var num_2; //　数字２
var math; //　演算子
var total; //　結果
var flag = 0; //　数字を決定するフラグ
var flag_num = 0; //数字を切り替える

// 計算機能
function calc(num_1, num_2) {

    function　result(num_1, num_2){
        switch (math) {
            case '+':
                return num_1 + num_2;
            case '-':
                return num_1 - num_2;
            case '×':
                return num_1 * num_2;
            case '÷':
                return num_1 / num_2;
        }
    }
    total = result(num_1, num_2);
    if (num_1 !== undefined && num_2 !== undefined) {
        $('.text2').text(Math.round(total * 1000000) / 1000000); //答えがおかしくなるため実装
    } else if (num_1 !== undefined && num_2 === undefined) {
        $('.text2').text(num_1);
        flag_num = 1;　//前の数字が重複しないように
    }
}

// 押された数字を表示
function screen1(clicknum){
    if (flag == 0) {
        var enternum = $('.text2').text();
        $('.text2').text(enternum + clicknum);
        num_1 = Number($('.text2').text());
        num_2 = undefined; //flag = 0 は最初の計算、イコール、ACを押したときのみ
    } else if (flag == 1) {
        var enternum = $('.text2').text();
        $('.text2').text(enternum + clicknum);
        num_2 = Number($('.text2').text());
    }
}

//　押した数字ボタンの処理
$('.num').click(function () {
    if (flag_num == 0) {
        var moji = $(this).text();
        screen1(moji);
    } else if (flag_num == 1) {
        $('.text2').text("");
        var moji = $(this).text();
        screen1(moji);
        flag_num = 0;　//前の数字が重複しないように
    }
});

// 押された演算子を表示
function screen2(math){
    if (flag == 0) {
        $('.text1').text(math);
        num_2 = undefined;　//flag = 0 は最初の計算、イコール、ACを押したときのみ
    } else if (flag == 1) {
        $('.text1').text(math);
    }
}

//　押した演算子を押したときの処理
$('.symbol').click(function () {
    if ($('.text1').text() == "" && $('.text2').text() == "") {
        var air = ""
        screen1(air);
    } else {
        $('.text2').text('');
        var moji = $(this).text();
        screen2(moji);
        math = $('.text1').text();
        calc(num_1, num_2);
        num_1 = Number($('.text2').text());
        flag = 1;
        flag_num = 1;
    }
});

//　小数点ボタンを押したときの処理
$('#ten').click(function () {
    var text = $('.text2').text();
    if ($('.text2').text() == "") {
        var zero = $(this).text();
        screen1( 0 + zero );
    } else if (text.indexOf('.') !== -1) {
        var air = ""
        screen1(air);
    } else {
        var moji = $(this).text();
        screen1(moji);
    }
});

//　イコールボタンを押したときの処理
$('.equal').click(function () {
    calc(num_1, num_2);
    $('.text1').text('');
    num_1 = Number($('.text2').text());
    flag = 0; 　//イコールを押したあとは最初の状態に戻すためにフラグを０に
    flag_num = 1;
});

//　ACボタンを押したときの処理
$('#ac').click(function () {
    num_1 = undefined;
    num_2 = undefined;
    math = undefined;
    total = undefined; //変数の中身を空にするため
    $('.text1').text('');
    $('.text2').text('');
    flag = 0;　//最初の状態に戻すためにフラグ０
});