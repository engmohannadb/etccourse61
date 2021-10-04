var CurrentQuestion = 0,
QNode = {},
CurrentQuestionsID = -1;

var NavLocked = false;

function InitQuestions(NumberInContent)
{
    if (Content[NumberInContent].q) {
        QNode = Content[NumberInContent].q;
        NavLocked = QNode.lockViewerNxtNPrev ? true : false;
        CurrentQuestionsID = QNode.ID;

        if (Content[NumberInContent].q.qs.length > 1)
            ShowIntro();
        else {
            QReset();
            GoToQuestion(1);
        }
        Animate();
        Resized();

    }
}
function GoToQuestion(n)
{
    var DragNDrop = false;
    if (n > 0 && n <= QNode.qs.length) {
        CurrentQuestion = n;
        q = QNode.qs[n - 1];
        //check if is already answerd
        if (q.State && QNode.qs.length > 1) {
            SetContent(q.State);
            if (q.type == 1) {
                CEvents();
                RadioEvents();
            }
            else if (q.type == 2) {
                MCEvents();

            }
            else if (q.type == 3) {
                TNFEvents();
            }
            else if (q.type == 4) {
                DragNDrop = true;
                DragReset(n);
            }
        }
        else {
            if (q.type == 1) {
                SetContent(GetC(n));
                CEvents();
                RadioEvents();
            }
            else if (q.type == 2) {
                SetContent(GetMC(n));
                MCEvents();
            }
            else if (q.type == 3) {
                SetContent(GetTnF(n));
                TNFEvents();
            }
            else if (q.type == 4) {
                SetContent(GetDragUI(n));
                DragNDrop = true;
                DragReset(n);
            }
        }
        VdSndLink(n)
        // UpdateGuideText();
    }
    else if ((n - 1) == QNode.qs.length) {
        //show Report
        ShowReport();
        VdUnlink();
        Resized();
        return;
    }
    if (!DragNDrop) {

        SetCaption(GetQNum2Txt(n));
        SubmitEvent();
        //code for PhotoG
        jQuery('.PhotoG').fancybox({ openEffect: 'elastic', closeEffect: 'elastic', });

    }
    //next and previouse events
    $('#QRgt').unbind(); $('#QLft').unbind();
    $('#QRgt').on('click', function () { PreviousQ(); });
    $('#QLft').on('click', function () { NextQ(); });
    if (QNode.qs.length == 1) {
        $('#QNavRow').addClass('hidden');
    }

    UpdateGuideText();
    Resized();
    CheckLength();
}
function GetQNum2Txt(number)
{
    if (QNode.qs.length == 1) {
        return "اختبر معلوماتك";
    }
    a = "السؤال "
    switch (number) {
        case 1:
            return a + "الأول"
        case 2:
            return a + "الثاني"
        case 3:
            return a + "الثالث"
        case 4:
            return a + "الرابع"
        case 5:
            return a + "الخامس"
        case 6:
            return a + "السادس"
        case 7:
            return a + "السابع"


    }
}
function AnswerClicked()
{

}
function NextQ()
{
    if (QNode.qs.length == 1) {
        NavLocked = false;

        QNode.qs[CurrentQuestion - 1].State = '';
        QNode.qs[CurrentQuestion - 1].Result = null;
        LoadPage(CurrentPage + 1);
        return;
    }
    QNode.qs[CurrentQuestion - 1].State = $('#MainArea').html();
    GoToQuestion(CurrentQuestion + 1);
}
function PreviousQ()
{
    GoToQuestion(CurrentQuestion - 1);
}
function ShowReport()
{
    if (CountAnswered() != QNode.qs.length) return;
    var count = 0;
    for (var i = 0; i < QNode.qs.length; i++) {
        if (QNode.qs[i].Result == true) {
            count++;
        }
    }
    var Precentage = Math.ceil(count / QNode.qs.length * 100);

    r = "<div id='Temp036' class='MainBg' data-appear-animation='fadeIn' data-appear-animation-delay='100'><div class='wrapper'><div class='Title2' data-appear-animation='fadeInDown' data-appear-animation-delay='200'><div class='table TitleBox2'><div class='table-row'><div class='table-cell td01'></div>        <div class='table-cell td06'><div class='table TitleBox2-main'><div class='table-row'><div class='table-cell right-s'></div><div class='table-cell'><div class='table TitleBox3-main'><div class='table-row'><div class='table-cell td-tr'></div><div class='table-cell td-tm'><span>" +
  QNode.RT +
  "</span></div><div class='table-cell td-tl'></div></div><div class='table-row'><div class='table-cell td-br'></div><div class='table-cell td-bm'></div><div class='table-cell td-bl'></div></div></div></div><div class='table-cell left-s'></div></div> </div></div><div class='table-cell td07'></div></div></div></div><div class='cleaner'></div><div class='table MainScr' data-appear-animation='bounceIn' data-appear-animation-delay='800'><div class='table-row'><div class='table-cell MainScr_top_right'></div><div class='table-cell MainScr_top_med'></div><div class='table-cell MainScr_top_left'></div></div><div class='table-row'><div class='table-cell MainScr_med_right'></div><div class='table-cell MainScr_med_med'><div class='data_Wrapper' data-appear-animation='bounceIn' data-appear-animation-delay='1800'>" +
  "<div class='ResultComment " + (Precentage < QNode.SP ? "hidden" : "") + " '>" +
  QNode.RS +
  "</div><div class='ResultComment failed " + (Precentage >= QNode.SP ? "hidden" : "") + "'>" +
    QNode.RF +
  "</div><div class='cleaner'></div><div class='BadgeWrapper'>" +
  "<img src='assets/images/Templates/Temp036/Badge.png'" +

  "class='Badge' width='320' height='226' alt='' /><div class='StarsWrapper'>" +
  "<img class='strR " + (Precentage < 20 ? "Off" : "") + "' src='assets/images/Templates/Temp036/Star.png' width='26' height='26' alt='' />" +
  "<img class='strR " + (Precentage < 40 ? "Off" : "") + "' src='assets/images/Templates/Temp036/Star.png' width='26' height='26' alt='' />" +
  "<img class='strR " + (Precentage < 60 ? "Off" : "") + "' src='assets/images/Templates/Temp036/Star.png' width='26' height='26' alt='' />" +
  "<img class='strR " + (Precentage < 80 ? "Off" : "") + "'  src='assets/images/Templates/Temp036/Star.png' width='26' height='26' alt='' />" +
  "<img class='strR " + (Precentage < 100 ? "Off" : "") + "'  src='assets/images/Templates/Temp036/Star.png' width='26' height='26' alt='' /></div><span class='Percentage'>" +
   Precentage + "%</span></div><div class='cleaner'></div><div class='ButtonsWrapper'><a href='' class='back' id='RBack'></a><a href='#' class='again' id='RAgain'></a><a href='#' class='print' id='RPrint'></a></div><div class='cleaner'></div></div></div><div class='table-cell MainScr_med_left'></div></div><div class='table-row'><div class='table-cell MainScr_bot_right'></div><div class='table-cell MainScr_bot_med'></div><div class='table-cell MainScr_bot_left'></div></div><div class='FloatIcon' data-appear-animation='bounceIn' data-appear-animation-delay='100'><img src='assets/images/Templates/Temp036/icon2.png' width='37' height='33' alt='' /></div></div><div class='cleaner'></div><!--audio-- controls autoplay><source src='assets/Temp/Temp002/Sound_Temp002.mp3' type='audio/mpeg' /></audio--></div></div>";

    SetContent(r);
    //unlink sign lang video
    //VdUnlink();
    AccessBtn.active = true;
    AccessVideo.find('video').html("");
    ToggleAccess();
    //
    Animate();
    RemoveGuideText();
    SetCaption("نتيجة الاختبار");
    $('#RBack').unbind();
    $('#RAgain').unbind();
    $('#RPrint').unbind();
    $('#RBack').on('click', function (e)
    {
        e.preventDefault();
        GoToQuestion(QNode.qs.length);
    });
    $('#RAgain').on('click', function ()
    {
        QReset();
        ShowIntro();
        Animate();
    });
    $('#RPrint').on('click', function ()
    {

    });

}
function QReset()
{
    //resetting all questions
    for (var i = 0; i < QNode.qs.length; i++) {
        QNode.qs[i].Result = QNode.qs[i].State = null;
        QNode.qs[i].userAnswers = [];
    }
    CurrentQuestion = -1;
}
function ShowIntro()
{
    QReset();
    SetTitle(QNode.il);
    SetCaption(QNode.it);

    m = GetIntro(QNode.il, QNode.ii, QNode.is, QNode.it);
    SetContent(m);
    $('#QStart').on('click', function () { GoToQuestion(1); });
    // RemoveGuideText();
    $('#goal_chr').attr('src', $('#goal_chr').attr('src') + '?' + Math.random());
    UpdateGuideText("للبدء، انقر على زر ابدأ.");
    Resized();
}
function RemoveRadiosCheck()
{
    $('input[type=radio]').each(function ()
    {
        $(this).prop('checked', false);
    });
}
function RadioEvents()
{
    $('input[type=radio]').unbind('click', radioevent);
    $('input[type=radio]').bind('click', radioevent);
}
var radioevent = function ()
{
    RemoveRadiosCheck();
    $(this).prop('checked', true);
    var q = QNode.qs[CurrentQuestion - 1];
    q.userAnswers = [$(this).attr('dnum')];
};
function CountAnswered()
{
    var count = 0;
    for (var i = 0; i < QNode.qs.length; i++) {
        if (QNode.qs[i].Result == false || QNode.qs[i].Result == true)
            count++;
    }
    return count;
}
function CheckLength()
{
    if (QNode.qs.length == 1)
        $('.numb').parent().addClass('hidden');

}
function GetIntro(Title, Img, Audio, Txt)
{
    var c = "";
    var d = "";
    if ($('body').hasClass('brown_theme')) {
        c = "_Brown";
        d = "_brown";
    }
    else if ($('body').hasClass('green_theme')) {
        c = "_Green";
        d = "_green";
    }

    return "<div id='Temp035' class='MainBg appear-animation fadeIn appear-animation-visible' data-appear-animation='fadeIn' data-appear-animation-delay='100' style='animation-delay: 100ms;'><div class='wrapper'><div class='Title2 appear-animation fadeInDown appear-animation-visible' data-appear-animation='fadeInDown' data-appear-animation-delay='100' style='animation-delay: 100ms;'> <div class='table TitleBox2'> <div class='table-row'><div class='table-cell td01'></div><div class='table-cell td06'><div class='table TitleBox2-main'> <div class='table-row'><div class='table-cell right-s'> </div> <div class='table-cell'> <div class='table TitleBox3-main'> <div class='table-row'><div class='table-cell td-tr'></div><div class='table-cell td-tm'><span>" +
         Title + "</span></div><div class='table-cell td-tl'></div></div><div class='table-row'><div class='table-cell td-br'></div><div class='table-cell td-bm'></div><div class='table-cell td-bl'></div></div> </div> </div> <div class='table-cell left-s'> </div></div> </div></div><div class='table-cell td07'></div></div> </div></div><div class='cleaner'></div> <div class='table MainScr appear-animation fadeInDown appear-animation-visible' data-appear-animation='fadeInDown' data-appear-animation-delay='100' style='animation-delay: 100ms;'><div class='table-row'><div class='table-cell MainScr_top_right'></div><div class='table-cell MainScr_top_med'></div><div class='table-cell MainScr_top_left'></div></div><div class='table-row'><div class='table-cell MainScr_med_right'></div><div class='table-cell MainScr_med_med'> <div class='table content'><div class='table-row'><div class='table-cell PicArea appear-animation bounceIn appear-animation-visible' data-appear-animation='bounceIn' data-appear-animation-delay='100' style='animation-delay: 100ms;'>" +
     "<img class='Pic01 flip' id='goal_chr' src='assets/images/Templates/Temp-General/Character" + c + ".gif' alt=''>" +
     "</div> <div class='clearfix ClearLine'></div><div class='table-cell DataArea appear-animation bounceIn appear-animation-visible' data-appear-animation='bounceIn' data-appear-animation-delay='2900' style='animation-delay: 2900ms;'><div class='data'> <div class='data-box'> <div class='data-inner content-rd'>" +
    Txt +
    "</div> <div class='Vline' src='assets/images/Templates/Temp035/Line_brown.png'></div><div class='Hline'></div> <a href='#' id='QStart' class='R-btn appear-animation bounceIn appear-animation-visible' data-appear-animation='bounceIn' data-appear-animation-delay='2900' style='animation-delay: 2900ms;'>ابدأ</a> </div> </div></div></div></div></div><div class='table-cell MainScr_med_left'></div></div><div class='table-row'><div class='table-cell MainScr_bot_right'></div><div class='table-cell MainScr_bot_med'></div><div class='table-cell MainScr_bot_left'></div></div><div class='FloatIcon appear-animation bounceIn appear-animation-visible' data-appear-animation='bounceIn' data-appear-animation-delay='3500' style='animation-delay: 3500ms;'><img src='assets/images/Templates/Temp035/bot-icon.png' width='37' height='33' alt=''></div></div><div class='cleaner'></div>" + (Audio.length > 5 ? "<audio controls='' autoplay> <source src='" + Audio + "' type='audio/mpeg'> </audio>" : "") + "</div></div>";
    //QStart is the id of the start button
}
function GetTnF(QNumber)
{
    var qs = QNode.qs[QNumber - 1];

    var r = "<div id='Temp034' class='MainBg QuizTemp' data-appear-animation='fadeIn' data-appear-animation-delay='100' ><div class='wrapper'><div class='Title' data-appear-animation='fadeInDown' data-appear-animation-delay='500'><div class='icon'></div><div class='table TitleBox' ><div class='table-row'><div class='table-cell Title_top_right'></div><div class='table-cell Title_top_center'></div><div class='table-cell Title_top_left'></div></div><div class='table-row'><div class='table-cell Title_med_right'></div><div class='table-cell Title_med_center'>" +
  (qs.t == "TNF" ? "<span>إضغط علامة (<i class='fa fa-check' aria-hidden='true'></i>) للعبارة الصحيحة، وعلامة (<i class='fa fa-times' aria-hidden='true'></i>) للعبارة الخاطئة:</span>" : "<span>" + qs.t + "</span>")
  + "</div><div class='table-cell Title_med_left'></div></div><div class='table-row'><div class='table-cell Title_bot_right'></div><div class='table-cell Title_bot_center'></div><div class='table-cell Title_bot_left'></div></div></div></div><div class='cleaner'></div>" +
  "<div class='table Line' data-appear-animation='fadeInDown' data-appear-animation-delay='1200'><div class='table-row'><div class='table-cell R-P'></div><div class='table-cell L2bg'><div class='table Dots' data-appear-animation='fadeInDown' data-appear-animation-delay='1200'>" +
  "<div class='table-row'>";
    //all before are visited
    for (var i = 1; i < QNumber; i++) {
        r += "<div class='table-cell'><a class='visited' href='#'></a></div>";
    }
    r += "<div class='table-cell'><a class='current' href='#'></a></div>";
    for (var i = QNumber; i < QNode.qs.length; i++) {
        r += "<div class='table-cell'><a href='#'></a></div>";
    }
    //"<div class='table-cell'><a class='current' href='#'></a></div><div class='table-cell'><a href='#'></a></div><div class='table-cell'><a href='#'></a></div><div class='table-cell'><a href='#'></a></div>"

    r += "</div></div></div><div class='table-cell L-P'></div></div></div><div class='cleaner'></div><div class='table MainScr' data-appear-animation='bounceIn' data-appear-animation-delay='2000'><div class='table-row'><div class='table-cell MainScr_top_right'></div><div class='table-cell MainScr_top_med'></div><div class='table-cell MainScr_top_left'></div></div><div class='table-row'><div class='table-cell MainScr_med_right'></div><div class='table-cell MainScr_med_med pd0'><div class='row pd0'><div class='col-md-5 col-md-push-7'><a data-appear-animation='bounceIn' data-appear-animation-delay='3000' class='PhotoG'" +
    "href='" + qs.i + "' ><img class='flex01'  src='" +
    qs.i + "' alt=''/><!--span>أضغط لتكبير الصورة</span--></a></div><div class='col-md-7 col-md-pull-5'><div data-appear-animation='bounceIn' data-appear-animation-delay='3000'><div class='table Question01'><div class='table-row'><div class='table-cell'><span class='numb'>" +
                        QNumber + "</span></div><div class='table-cell'><span class='Q01'>" +
                              qs.q + "</span></div></div></div><div class='TF'><div class='td01'><a href='#' class='true'><i class='fa fa-check' aria-hidden='true'></i></a></div><div class='td02'><a href='#' class='false'><i class='fa fa-times' aria-hidden='true'></i></a></div></div></div></div></div><div class='clearfix'></div><div class='SubmitArea' data-appear-animation='bounceIn' data-appear-animation-delay='3000'><a class='Submit'>إدخال</a></div><div class='CommentArea wrong hidden'>" +
                              qs.wf + "</div><div class='CommentArea Right hidden'>" +
                              qs.cf + "</div><div class='clearfix'></div></div><div class='table-cell MainScr_med_left'></div></div><div class='table-row'><div class='table-cell MainScr_bot_right'></div><div class='table-cell MainScr_bot_med'></div><div class='table-cell MainScr_bot_left'></div></div><div class='FloatIcon' data-appear-animation='bounceIn' data-appear-animation-delay='3500'><img src='assets/images/Templates/Temp-General/bot-icon_Q.png' width='37' height='33' alt=''/></div><div class='pager' data-appear-animation='bounceIn' data-appear-animation-delay='3500'><div class='table' id='QNavRow'><div class='table-row'><div class='table-cell'><a id='QRgt' href='#' class='r-arrow'></a></div><div class='table-cell'><div class='state'><span>" +
                              QNumber + "</span><span class='sep'>/</span><span>" +
                              QNode.qs.length + "</span></div></div><div class='table-cell'><a id='QLft' href='#' class='l-arrow'></a></div></div></div></div></div><div class='cleaner'></div>" + (qs.s.length > 5 ? "<audio  controls autoplay><source src='" + qs.s + "' type='audio/mpeg' /></audio>" : "") + "</div></div>";

    return r;
}
function GetC(QNumber)
{
    var qs = QNode.qs[QNumber - 1];
    var r = "<div id='Temp032' class='MainBg QuizTemp' data-appear-animation='fadeIn' data-appear-animation-delay='100' >    <div class='wrapper'><div class='Title' data-appear-animation='fadeInDown' data-appear-animation-delay='500'><div class='icon'></div><div class='table TitleBox' ><div class='table-row'><div class='table-cell Title_top_right'></div><div class='table-cell Title_top_center'></div><div class='table-cell Title_top_left'></div></div><div class='table-row'><div class='table-cell Title_med_right'></div><div class='table-cell Title_med_center'><span>" +
      qs.t + "</span></div><div class='table-cell Title_med_left'></div></div><div class='table-row'><div class='table-cell Title_bot_right'></div><div class='table-cell Title_bot_center'></div><div class='table-cell Title_bot_left'></div></div></div></div><div class='cleaner'></div><div class='table Line' data-appear-animation='fadeInDown' data-appear-animation-delay='1200'><div class='table-row'><div class='table-cell R-P'></div><div class='table-cell L2bg'><div class='table Dots' data-appear-animation='fadeInDown' data-appear-animation-delay='1200'><div class='table-row'>"
    for (var i = 1; i < QNumber; i++) {
        r += "<div class='table-cell'><a class='visited' href='#'></a></div>";
    }
    r += "<div class='table-cell'><a class='current' href='#'></a></div>";
    for (var i = QNumber; i < QNode.qs.length; i++) {
        r += "<div class='table-cell'><a href='#'></a></div>";
    }
    r += "</div> </div></div><div class='table-cell L-P'></div></div></div><div class='cleaner'></div><div class='table MainScr' data-appear-animation='bounceIn' data-appear-animation-delay='2000'><div class='table-row'><div class='table-cell MainScr_top_right'></div><div class='table-cell MainScr_top_med'></div><div class='table-cell MainScr_top_left'></div></div><div class='table-row'><div class='table-cell MainScr_med_right'></div><div class='table-cell MainScr_med_med pd0'><div class='row pd0'><div class='col-md-5 col-md-push-7'><a data-appear-animation='bounceIn' data-appear-animation-delay='3000' class='PhotoG'href='" +
    qs.i + "' ><img class='flex01'  src='" +
    qs.i + "' alt=''/><!--span>أضغط لتكبير الصورة</span--></a></div><div class='col-md-7 col-md-pull-5'><div data-appear-animation='bounceIn' data-appear-animation-delay='3000'><div class='table Question01'><div class='table-row'><div class='table-cell'><span class='numb'>" +
    QNumber + "</span></div><div class='table-cell'><span class='Q01'>" +
    qs.q + "</span></div></div></div>" +

    "<div class='radio-container'>";

    for (var i = 0; i < qs.a.length; i++) {
        r += "<label class='control control--radio'>" + qs.a[i] +
            "<input type='radio' " + "value='" + i + "' dnum='" + i + "'/> <div class='control__indicator'></div></label>";

        /** r += "<div class='radio'><label><input type='radio' " +
             "id='"+i+"'*"value='" + i + "' dnum='" + i + "'>" + qs.a[i] + "</label></div>";*/
    }
    r += "</div></div></div></div><div class='clearfix'></div><div class='SubmitArea' data-appear-animation='bounceIn' data-appear-animation-delay='3500'><a class='Submit'>إدخال</a></div><div class='CommentArea wrong hidden'>" +
    qs.wf + "</div><div class='CommentArea Right hidden'>" +
    qs.cf + "</div><div class='clearfix'></div></div><div class='table-cell MainScr_med_left'></div></div><div class='table-row'><div class='table-cell MainScr_bot_right'></div><div class='table-cell MainScr_bot_med'></div><div class='table-cell MainScr_bot_left'></div></div><div class='FloatIcon' data-appear-animation='bounceIn' data-appear-animation-delay='3500'><img src='assets/images/Templates/Temp-General/bot-icon_Q.png' width='37' height='33' alt=''/></div><div class='pager' data-appear-animation='bounceIn' data-appear-animation-delay='3500'><div class='table' id='QNavRow'><div class='table-row'><div class='table-cell'><a id='QRgt' href='#' class='r-arrow'></a></div><div class='table-cell'><div class='state'><span>" +
    QNumber + "</span><span class='sep'>/</span><span>" +
    QNode.qs.length + "</span></div></div><div class='table-cell'><a id='QLft' href='#' class='l-arrow'></a></div></div></div></div></div><div class='cleaner'></div>" + (qs.s.length > 5 ? "<audio  controls autoplay><source src='" + qs.s + "' type='audio/mpeg' /></audio>" : "") + "</div> </div>";
    return r;
}
function GetMC(QNumber)
{
    var qs = QNode.qs[QNumber - 1];
    var r = "<div id='Temp033' class='MainBg QuizTemp' data-appear-animation='fadeIn' data-appear-animation-delay='100' ><div class='wrapper'><div class='Title' data-appear-animation='fadeInDown' data-appear-animation-delay='500'><div class='icon'></div><div class='table TitleBox' ><div class='table-row'><div class='table-cell Title_top_right'></div><div class='table-cell Title_top_center'></div><div class='table-cell Title_top_left'></div></div><div class='table-row'><div class='table-cell Title_med_right'></div><div class='table-cell Title_med_center'><span>" +
  qs.t + "</span></div><div class='table-cell Title_med_left'></div></div>  <div class='table-row'><div class='table-cell Title_bot_right'></div><div class='table-cell Title_bot_center'></div><div class='table-cell Title_bot_left'></div></div></div></div><div class='cleaner'></div><div class='table Line' data-appear-animation='fadeInDown' data-appear-animation-delay='1200'><div class='table-row'><div class='table-cell R-P'></div><div class='table-cell L2bg'><div class='table Dots' data-appear-animation='fadeInDown' data-appear-animation-delay='1200'>" +
  "<div class='table-row'>";
    //all before are visited
    for (var i = 1; i < QNumber; i++) {
        r += "<div class='table-cell'><a class='visited' href='#'></a></div>";
    }
    r += "<div class='table-cell'><a class='current' href='#'></a></div>";
    for (var i = QNumber; i < QNode.qs.length; i++) {
        r += "<div class='table-cell'><a href='#'></a></div>";
    }

    r += "</div></div></div><div class='table-cell L-P'></div></div></div><div class='cleaner'></div><div class='table MainScr' data-appear-animation='bounceIn' data-appear-animation-delay='2000'><div class='table-row'><div class='table-cell MainScr_top_right'></div><div class='table-cell MainScr_top_med'></div><div class='table-cell MainScr_top_left'></div></div><div class='table-row'><div class='table-cell MainScr_med_right'></div><div class='table-cell MainScr_med_med pd0'><div class='row pd0'><div class='col-md-5 col-md-push-7'><a data-appear-animation='bounceIn' data-appear-animation-delay='3000' class='PhotoG' href='" +
    qs.i + "' ><img class='flex01' src='" +
    qs.i + "' alt=''/><!--span>أضغط لتكبير الصورة</span--></a></div><div class='col-md-7 col-md-pull-5'><div data-appear-animation='bounceIn' data-appear-animation-delay='3000'><div class='table Question01'><div class='table-row'><div class='table-cell'><span class='numb'>" +
    QNumber + "</span></div><div class='table-cell'><span class='Q01'>" +
    qs.q + "</span></div></div></div>" +
    "<div class='checkbox_wrapper'>";

    /*    <div class='checkbox_wrapper'>
                                                                
                                                                <div class='checkbox_div'>
                                                                    <input type='checkbox' id='test1' />
                                                                    <label for='test1'>الإجابة الأولي المقترحة</label>
  																</div>*/
    for (var i = 0; i < qs.a.length; i++) {
        var id = "Answer" + i;
        r += "<div class='checkbox_div'><input type='checkbox' DNum='" + i + "' value='' id='" + id + "'><label for='" +
            id + "'>" + qs.a[i] + "</label></div>";


        /*  r += "<div class='checkbox'><label><input type='checkbox' DNum='" + i + "' value=''>" +
        qs.a[i] + "</label></div>";*/
    }
    r += "</div></div></div></div><div class='clearfix'></div><div class='SubmitArea' data-appear-animation='bounceIn' data-appear-animation-delay='3000'><a class='Submit'>إدخال</a></div><div class='CommentArea wrong hidden'>" +
    qs.wf + "</div><div class='CommentArea Right hidden'>" +
    qs.cf + "</div><div class='clearfix'></div></div><div class='table-cell MainScr_med_left'></div></div><div class='table-row'><div class='table-cell MainScr_bot_right'></div><div class='table-cell MainScr_bot_med'></div><div class='table-cell MainScr_bot_left'></div></div><div class='FloatIcon' data-appear-animation='bounceIn' data-appear-animation-delay='3500'><img src='assets/images/Templates/Temp-General/bot-icon_Q.png' width='37' height='33' alt=''/></div><div class='pager' data-appear-animation='bounceIn' data-appear-animation-delay='3500'><div class='table' id='QNavRow'><div class='table-row'><div class='table-cell'><a href='#' id='QRgt' class='r-arrow'></a></div><div class='table-cell'><div class='state'><span>" +
    QNumber + "</span><span class='sep'>/</span><span>" +
    QNode.qs.length + "</span></div></div><div class='table-cell'><a href='#' id='QLft' class='l-arrow'></a></div></div></div></div></div><div class='cleaner'></div>" + (qs.s.length > 5 ? "<audio  controls autoplay><source src='" + qs.s + "' type='audio/mpeg' /></audio>" : "") + "</div></div>";
    return r;
}
function l(t)
{
    console.log(t);
}

/////////button functions

function TNFEvents()
{
    var trueBtn = $('a.true');
    var falseBtn = $('a.false')
    trueBtn.unbind();
    falseBtn.unbind();
    trueBtn.on('click', function ()
    {

        var q = QNode.qs[CurrentQuestion - 1];
        if (q.Result == true || q.Result == false) return;
        falseBtn.removeClass('selected not-selected');
        trueBtn.removeClass('selected not-selected');
        trueBtn.addClass('selected');
        falseBtn.addClass('not-selected');

        q.userAnswers = [1];
    });
    falseBtn.on('click', function ()
    {
        var q = QNode.qs[CurrentQuestion - 1];
        if (q.Result == true || q.Result == false) return;
        trueBtn.removeClass('selected not-selected');
        falseBtn.removeClass('selected not-selected');
        falseBtn.addClass('selected');
        trueBtn.addClass('not-selected');
        q.userAnswers = [0];
    });
}
function MCEvents()
{
    var Answers = $("input[type='checkbox']");
    Answers.unbind();
    Answers.on('click', function ()
    {

        //  console.log("1:"+index);
        var a = $(this);
        var index = FoundInAnswers(CurrentQuestion, a.attr('dnum'));
        l("index=" + index);
        var q = QNode.qs[CurrentQuestion - 1];
        if (q.Result == true || q.Result == false) return;
        if (a.prop('checked')) {

            console.log("checked");
            if (index == -1) {
                q.userAnswers[q.userAnswers.length] = a.attr('dnum');
                console.log("added");
                l(q.userAnswers);

            }
        }
        else {
            console.log("not checked");
            if (index != -1) {
                console.log("FOUNDED:" + index);
                q.userAnswers.splice(index, 1);
            }
        }
    });
}
function CEvents()
{
    var Answers = $("input[type='radio']");
    Answers.unbind();
    Answers.on('click', function ()
    {

        var a = $(this);
        var index = FoundInAnswers(CurrentQuestion, a.attr('dnum'))
        var q = QNode.qs[CurrentQuestion - 1];
        console.log("Founded:" + index);
        if (q.Result == true || q.Result == false) return;
        /*if (a.prop('checked'))
        {
           if(index==-1)
           {
  
                q.userAnswers=[a.attr('dnum')];
           }
        }*/
    });
}
function SubmitEvent()
{
    $('a.Submit').unbind();
    $('a.Submit').on('click', function ()
    {
        var q = QNode.qs[CurrentQuestion - 1];
        if (q.userAnswers.length > 0) {
            var WrongFB = $('.CommentArea.wrong');
            var RightFB = $('.CommentArea.Right');
            q.Result = CheckAnswer(CurrentQuestion);
            //Hide Submit Button
            $(this).parent().addClass('hidden');

            if (QNode.ShowFeedBack) {

                if (q.Result) {
                    RightFB.removeClass('hidden');
                    WrongFB.addClass('hidden');
                    PlayFeedBack(true, q);
                }
                else {
                    RightFB.addClass('hidden');
                    WrongFB.removeClass('hidden');
                    PlayFeedBack(false, q);
                }
            }
            q.State = $('#MainArea').html();
            /* l("ANSWERD:" + AnswerdQuestion);
             if (QNode.qs.length == AnswerdQuestion)
             {
                 ShowReport();
             }
            else */if (QNode.AutoNext) {
               NextQ();
           }
            if (CountAnswered() == QNode.qs.length && QNode.qs.length > 1) {
                ShowReport();
            }
            Resized();
        }
    });
}
function PlayFeedBack(TrueAnswer, Question)
{
    StopAllSounds();
    if (TrueAnswer && Question.cfs && Question.cfs.length > 0)
    {
        VdSndLink(1);
        window.audio = $("#MainArea").find("audio").get(0);
        window.audio.src = Question.cfs;
        window.audio.play();
        
    }
    else if (!TrueAnswer && Question.wfs && Question.wfs.length > 0)
    {
       
        VdSndLink(2);
        window.audio =$("#MainArea").find("audio").get(0);
        window.audio.src = Question.wfs;
        window.audio.play();
     
    }
}

function FoundInAnswers(qNumber, answerNumber)
{
    var qs = QNode.qs[qNumber - 1];
    for (var i = 0; i < qs.userAnswers.length; i++) {
        if (qs.userAnswers[i] == answerNumber) {
            return i;
        }
    }
    return -1;
}
function CheckAnswer(QNmber)
{
    var qs = QNode.qs[QNmber - 1];
    //check that all correct items in the user selected answers
    for (var i = 0; i < qs.ca.length; i++) {
        if (!IsInUserSelected(QNmber, qs.ca[i])) {
            return false;
        }
    }
    for (var i = 0; i < qs.userAnswers.length; i++) {
        if (!IsInCorrectAnswers(QNmber, qs.ca[i])) {
            return false;
        }
    }
    return true;
}
function IsInCorrectAnswers(QNumber, AValue)
{
    var qs = QNode.qs[QNumber - 1];
    for (var i = 0; i < qs.ca.length; i++) {
        if (qs.ca[i] == AValue) {
            return true;
        }
    }
    return false;
}
function IsInUserSelected(QNumber, AValue)
{
    var qs = QNode.qs[QNumber - 1];
    for (var i = 0; i < qs.userAnswers.length; i++) {
        if (qs.userAnswers[i] == AValue) {
            return true;
        }
    }
    return false;
}
var Col1, Col2, Col3, EnterBtn, ResetBtn;
function DragReset(QNumber)
{
    //.gUpdateGuideText();
    var qs = QNode.qs[QNumber - 1];


    if (qs.n.length == 2) {
        Col1 = $('#DCol1');
        Col2 = $('#DCol3');
        Col1.html(q.n[0]);
        Col2.html(q.n[1]);
        $('.Basket-03').css("width", "50%");
        $('.Basket-01').css("width", "50%");
        $('.Basket-02').remove();
        Col1.rows = 0;
        Col2.rows = 0;
        Col1.parent().find("> .body").html('');
        Col2.parent().find("> .body").html('');
        Col3 = null;
    }
    else {
        Col1 = $('#DCol1');
        Col2 = $('#DCol2');
        Col3 = $('#DCol3');
        Col1.html(q.n[0]);
        Col2.html(q.n[1]);
        Col3.html(q.n[2]);

        Col1.rows = 0;
        Col2.rows = 0;
        Col3.rows = 0;

        Col1.parent().find("> .body").html('');
        Col2.parent().find("> .body").html('');
        Col3.parent().find("> .body").html('');
    }



    EnterBtn = $('#Enter');
    ResetBtn = $('#Reset');
    ResetBtn.off();
    EnterBtn.off();
    ResetBtn.on('click', function () { DragReset(CurrentQuestion); });
    EnterBtn.on('click', DragEnter);
    try {
        $('.DragSlider').removeClass('slick-initialized').removeClass('slick-slider');
        $('.DragSlider').slick('unslick');
    }
    catch (e) {

    }
    $('.DragSlider').children().remove();
    AddDragItems(QNumber);
    UpdateItemsSlider();
    DragDropEventInit();
    SetCaption(GetQNum2Txt(QNumber));// Content[CurrentPage - 1].g);

}
function HideAllOutItems()
{
    var average_width = 100;
    var width = $('.DragArea').width();
    var start = $('.DragArea').offset().left - average_width;
    var end = start + width;

    $('.DragItem').each(function (i, obj)
    {
        obj = $(obj);
        var position = obj.offset();
        if (position.left > end || position.left < start) {

            obj.css("visibility", "hidden");
        }
        /* else
         {
             l(i + "-left:" + position.left + ", html:" + obj.html());
         }*/
    });
}
function ShowAllItems()
{
    $('.DragItem').each(function (i, obj)
    {
        $(obj).css("visibility", "visible");
    });
}
function UpdateItemsSlider()
{
    try {
        //  $('.DragSlider')[0].slick.refresh();
    } catch (e) {
    }
    //updating the slider
    $(".slider").not('.slick-initialized').slick();
    $(".DragSlider").not('.slick-initialized')./*slick()
    $('.DragSlider').*/slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        rtl: true,
        adaptiveHeight: true,
        draggable: false,
        dots: false,
        arrows: true,
        infinite: false,
        responsive: [
          {
              breakpoint: 991,
              settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,

              }
          },

          {
              breakpoint: 601,
              settings: {
                  dots: false,
                  arrows: true,
                  draggable: false,
                  slidesToShow: 2,
                  slidesToScroll: 1,

              }
          },

          {
              breakpoint: 360,
              settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  draggable: false,
              }
          },


        ]
    });

}
function shuffle(array)
{
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
var Etrateb = true;
function AddDragItems(QNumber)
{
    var Dragger = $('.DragSlider');
    var qs = QNode.qs[QNumber - 1];
    DragItemsData = qs.ditms;
    $('.DragSlider').html('');
    //check column replaced
    Ma3kos = false;
    for (var i = 0; i < DragItemsData.length; i++) {
        if (DragItemsData[i].c > 2) {
            Ma3kos = true;
            Etrateb = false;
            break;
        }
    }
    for (var i = 0; i < DragItemsData.length; i++) {
        if (Etrateb) break;
        var temp = DragItemsData[i].c;
        DragItemsData[i].c = DragItemsData[i].r;
        DragItemsData[i].r = temp;

    }
    Etrateb = true;
    DragItemsData = shuffle(DragItemsData);
    for (var i = 0; i < DragItemsData.length; i++) {
        item = $("<div i='" + i + "' c='" + DragItemsData[i].c + "' r='" + DragItemsData[i].r + "'  class='DragItem'><span></span>" + DragItemsData[i].n + "</div>");
        Dragger.append(item);
        Col1.rows += DragItemsData[i].c == 0 ? 1 : 0;
        Col2.rows += DragItemsData[i].c == 1 ? 1 : 0;
        if (Col3 != null)
            Col3.rows += DragItemsData[i].c == 2 ? 1 : 0;
    }
    var max = Col1.rows;
    max = Col2.rows > Col1.rows ? Col2.rows : max;
    if (Col3)
        max = Col3.rows > Col2.rows ? Col3.rows : max;
    //l("MAX:" + max);
    for (var i = 0; i < max; i++) {
        item1 = $('<div c="0" r="' + i + '" class="item"><span></span></div>');
        item2 = $('<div c="1" r="' + i + '" class="item"><span></span></div>');
        item3 = $('<div c="2" r="' + i + '" class="item"><span></span></div>');
        item1.droppable(
            {
                activeClass: "ui-state-hover",
                drop: function (ev, ui)
                {
                    /*$(this).addClass("ui-state-highlight");*/
                    Dropped(ev, ui, 0, this);
                }
            });
        item2.droppable(
            {
                activeClass: "ui-state-hover",
                drop: function (ev, ui)
                {
                    /*$(this).addClass("ui-state-highlight");*/ Dropped(ev, ui, 1, this);
                }
            });
        item3.droppable(
            {
                activeClass: "ui-state-hover",
                drop: function (ev, ui)
                {
                    /*$(this).addClass("ui-state-highlight");*/ Dropped(ev, ui, 2, this);
                }
            });



        Col1.parent().find("> .body").append(item1);
        Col2.parent().find("> .body").append(item2);
        if (Col3 != null)
            Col3.parent().find("> .body").append(item3);
    }
}
function Dropped(ev, ui, CheckFor, o)
{
    //$('.DragSlider')[0].slick.refresh();
    if (!$(o).get(0).haveOne) {
        // if ($(ui.draggable.get(0)).attr('c') == CheckFor) 
        {
            ui.draggable.addClass("ui-state-highlight")
            $(ui.draggable).detach().css({ top: 0, left: 0 }).appendTo(o);
            $(o).get(0).haveOne = true;
            ui.draggable.attr('crow', $($(o).get(0)).attr('r'));
            ui.draggable.attr('ccol', $($(o).get(0)).attr('c'));
            ui.draggable.draggable('disable');
            ui.draggable.removeClass('ui-state-disabled');
            ui.draggable.attr("class", "DragItem");
            $(o).droppable({ activeClass: "" });
            $('.DragSlider').slick('slickRemove', $($(o).get(0)).attr('i'));
            return;
        }
    }
    ui.draggable.animate(ui.draggable.data().origPosition, "slow");
    setTimeout(function (a) { a.css('background', a.attr('tembb')); }, 500, $(ui.draggable));

}
function DragEnter()
{
    QNode.qs[CurrentQuestion - 1].Result = true;
    if ($('.DragSlider').slick("getSlick").slideCount == 0) 
    {
        //Validate answers
        $('.DragItem').each(function (i, obj)
        {
            // check for column first
            if ($(this).attr('ccol') == $(this).attr('c'))
            {
               
                //if c==0 mark item as correct
                if ($(this).attr('c') == 0 || $(this).attr('r') == -1)
                {
                    $(this).parent().removeClass('item');
                    $(this).addClass('item').addClass('True');
                }
                else
                {
                    //check if the item is beside it's right item= has the same row number and col=0
                    if (GetMyItemCurrentRow($(this).attr('r')) == $(this).attr('crow'))
                    {
                        $(this).parent().removeClass('item');
                        $(this).addClass('item').addClass('True');
                    }
                    else
                        DragDropError($(this));
                }
            }
            else
                DragDropError($(this));
        });
        if (CountAnswered() == QNode.qs.length && QNode.qs.length > 1) {
            ShowReport();
        }
    }
}
function DragDropError(item)
{
    item.parent().removeClass('item');
    item.addClass('item').addClass('Wrong');
    QNode.qs[CurrentQuestion - 1].Result = false;
}
function GetMyItemCurrentRow(rowNumber)
{
    var items=$('.DragItem');

    for (var i = 0; i < items.length; i++) {

        v = $(items[i]);
        if (v.attr('c') == 0)
        {
            if (v.attr('r') == rowNumber)
            {
                return v.attr('crow');
            }
        }
    }

}
function DragDropEventInit()
{
    $('.DragItem').off();
    $('.DragItem').draggable(
        {
            //appendTo: '#DragSliderHelper',
            // helper: 'clone',
            revert: function (me)
            {
                if (!me) {
                    setTimeout(function (a) { a.css('background', a.attr('tembb')); }, 500, $(this));
                }
                return true;
            },
            start: function (event, ui)
            {
                $(this).attr('tembb', $(this).css('background'));
                $('.slick-list').css({ overflow: 'visible' });
                $(this).css({
                    background: 'none',
                });
                HideAllOutItems();
            },
            stop: function (event, ui)
            {
                $('.slick-list').css('overflow', 'hidden');
                ShowAllItems();
            },
            drag: function (event, ui)
            {
                // $('.DragArea').css('overflowX', 'hidden');
            }
        });
}
// قم بسحب الفعل الناسخ واسمه وخبره من جانب الكلمات وإفلاتهم في المكان المخصص:
function GetDragUI(QNumber)
{
    var qs = QNode.qs[QNumber - 1];
    var r = "<div id='Temp029' class='MainBg QuizTemp' data-appear-animation='fadeIn' data-appear-animation-delay='100'><div class='wrapper'><div class='Title' data-appear-animation='fadeInDown' data-appear-animation-delay='500'><div class='icon'></div><div class='table TitleBox'><div class='table-row'><div class='table-cell Title_top_right'></div><div class='table-cell Title_top_center'></div><div class='table-cell Title_top_left'></div></div><div class='table-row'><div class='table-cell Title_med_right'></div><div class='table-cell Title_med_center'>" +
    "<span>" + qs.qst + "</span></div><div class='table-cell Title_med_left'></div></div><div class='table-row'><div class='table-cell Title_bot_right'></div><div class='table-cell Title_bot_center'></div><div class='table-cell Title_bot_left'></div></div></div></div><div class='cleaner'></div><div class='table Line' data-appear-animation='fadeInDown' data-appear-animation-delay='1200'><div class='table-row'><div class='table-cell R-P'></div><div class='table-cell L2bg'><div class='table Dots' data-appear-animation='fadeInDown' data-appear-animation-delay='1200'>" +
    "<div class='table-row'>";
    //<div class='table-cell'><a class='visited' href='#'></a></div><div class='table-cell'><a class='visited' href='#'></a></div><div class='table-cell'><a class='current' href='#'></a></div><div class='table-cell'><a href='#'></a></div><div class='table-cell'><a href='#'></a></div><div class='table-cell'><a href='#'></a></div><div class='table-cell'><a href='#'></a></div><div class='table-cell'><a href='#'></a></div>
    //all before are visited
    for (var i = 1; i < QNumber; i++) {
        r += "<div class='table-cell'><a class='visited' href='#'></a></div>";
    }
    r += "<div class='table-cell'><a class='current' href='#'></a></div>";
    for (var i = QNumber; i < QNode.qs.length; i++) {
        r += "<div class='table-cell'><a href='#'></a></div>";
    }

    r += "</div></div></div><div class='table-cell L-P'></div></div></div><div class='cleaner'></div><div class='DropArea' data-appear-animation='fadeInDown' data-appear-animation-delay='1400'><div class='Basket-01'><div class='table BoxWrapper'><div class='table-row'><div class='table-cell box01-r01-right'></div><div class='table-cell box01-r01-med'></div><div class='table-cell box01-r01-left'></div></div><div class='table-row'><div class='table-cell box01-r02-right'></div><div class='table-cell box01-r02-med'><div class='box'><div id='DCol1' class='head'>الفعل</div><div class='body'></div></div></div><div class='table-cell box01-r02-left'></div></div><div class='table-row'><div class='table-cell box01-r03-right'></div><div class='table-cell box01-r03-med'></div><div class='table-cell box01-r03-left'></div></div><div class='table-row'><div class='table-cell box01-r04-right'></div><div class='table-cell box01-r04-med'></div><div class='table-cell box01-r04-left'></div></div></div></div><div class='Basket-02'><div class='table BoxWrapper'><div class='table-row'><div class='table-cell box01-r01-right'></div><div class='table-cell box01-r01-med'></div><div class='table-cell box01-r01-left'></div></div><div class='table-row'><div class='table-cell box01-r02-right'></div><div class='table-cell box01-r02-med'><div class='box'><div id='DCol2' class='head'>أسمه</div><div class='body'></div></div></div><div class='table-cell box01-r02-left'></div></div><div class='table-row'><div class='table-cell box01-r03-right'></div><div class='table-cell box01-r03-med'></div><div class='table-cell box01-r03-left'></div></div><div class='table-row'><div class='table-cell box01-r04-right'></div><div class='table-cell box01-r04-med'></div><div class='table-cell box01-r04-left'></div></div></div></div><div class='Basket-03'><div class='table BoxWrapper'><div class='table-row'><div class='table-cell box01-r01-right'></div><div class='table-cell box01-r01-med'></div><div class='table-cell box01-r01-left'></div></div><div class='table-row'><div class='table-cell box01-r02-right'></div><div class='table-cell box01-r02-med'><div class='box'><div id='DCol3' class='head'>خبره</div><div class='body'></div></div></div><div class='table-cell box01-r02-left'></div></div><div class='table-row'><div class='table-cell box01-r03-right'></div><div class='table-cell box01-r03-med'></div><div class='table-cell box01-r03-left'></div></div><div class='table-row'><div class='table-cell box01-r04-right'></div><div class='table-cell box01-r04-med'></div><div class='table-cell box01-r04-left'></div></div></div></div></div><div class='cleaner'></div><div class='DragArea' data-appear-animation='fadeInDown' data-appear-animation-delay='1600'><div class='DragSlider'></div><div class='DragSliderHelper' style='position:relative'></div></div><div class='cleaner'></div><div class='SubmitArea' data-appear-animation='bounceIn' data-appear-animation-delay='1800'><a id='Enter' class='Submit'>إدخال</a><a id='Reset' class='Submit'>إعادة</a></div><!--<div class='cleaner'></div><div class='CommentArea wrong hidden'>نأسف، إجابتك غير دقيقة، والصواب هو : 125</div><div class='cleaner'></div><div class='CommentArea Right hidden'>أحسنت، إجابتك صحيحة</div>-->" +
                            "<div class='cleaner'></div><div class='PagerWrapper" + (QNode.qs.length > 1 ? "" : " hidden") + "' data-appear-animation='bounceIn' data-appear-animation-delay='1800'><div class='pager' data-appear-animation='bounceIn' data-appear-animation-delay='3500'><div class='table' id='QNavRow'><div class='table-row'><div class='table-cell'><a id='QRgt' href='#' class='r-arrow'></a></div><div class='table-cell'><div class='state'><span>" +
                              QNumber + "</span><span class='sep'>/</span><span>" +
                              QNode.qs.length + "</span></div></div><div class='table-cell'><a id='QLft' href='#' class='l-arrow'></a></div></div></div></div></div><div class='cleaner'></div>" + (qs.s.length > 5 ? "<audio  controls autoplay><source src='" + qs.s + "' type='audio/mpeg' /></audio>" : "") + "</div></div>";
    return r;
}
