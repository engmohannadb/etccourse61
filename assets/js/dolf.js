MODE_ONLY_CLASS = 'mod_only';

var PDFLink = "assets/PDF.pdf";
// UI vars
var fullScreenBtn, HomeBtn, MenuBtn,
    NextBtn, PrevBtn, LastBtn, FirstBtn, CurrentPageTxt, TotalPagesTxt,
    HelpBtn, ReplayBtn, PrintBtn, GlossaryBtn, PDFBtn, SearchBtn,

    CaptionTxt, AccessVidContainer;
var CaptionBtn, AccessBtn,
    Caption, AccessVideo,
    SideArea, MainArea;

//Dev vars
var CurrentPage = 1;
var GoToPageNumber = -1;
var TotalPages = Content.length;
$(window).load(
    function ()
    {
        AdjustTopTitle();
        CaptionBtn = $('#cptnBtn');//$('a .r-ico .txt');
        Caption = $('#txt_mod');
        AccessVideo = $('#sls_mod');
        SideArea = $('#SideArea');
        AccessBtn = $('#axsBtn');//$('a .r-ico .SLS');
        MainArea = $('#MainArea');

        CaptionBtn.active = CaptionBtn.hasClass('active');

        AccessBtn.active = AccessBtn.hasClass('active');

        //assignment
        //Top Left Part
        fullScreenBtn = $('#FullSBtn');
        HomeBtn = $('#HomeBtn');
        MenuBtn = $('#MenuBtn');
        //Bottom Left Part
        NextBtn = $('#Right1Btn');
        PrevBtn = $('#Left1Btn');
        LastBtn = $('#Right2Btn');
        FirstBtn = $('#Left2Btn');
        CurrentPageTxt = $('#CurrentPageTxt');
        TotalPagesTxt = $('#TotalPagesTxt');
        //Bottom Right Part
        HelpBtn = $('#HelpBtn');
        ReplayBtn = $('#ReplayBtn');
        PrintBtn = $('#PrintBtn');
        GlossaryBtn = $('#GlossaryBtn');
        PDFBtn = $('#PDFBtn');
        SearchBtn = $('#SearchBtn');
        //Right Panel Part
        CaptionTxt = $('#CaptionText'); /*CaptionTxt.addClass('content-rd')*/; CaptionTxt.addClass('CAPTION');
        AccessVidContainer = $('#AxssVideo');
        $('#AxssVideo > video').get(0).pause();

        //data
        //CaptionTxt.empty();
        //events
        CaptionBtn.on("click", ToggleCaption);
        AccessBtn.on("click", ToggleAccess);
        fullScreenBtn.on("click", ToggleFullScreen);
        PDFBtn.on("click", function () { OpenInNewTab(PDFLink); });
        PrintBtn.on("click", Print);
        NextBtn.on("click", function () { LoadPage(CurrentPage * 1 - 1); });
        PrevBtn.on("click", function () { LoadPage(CurrentPage * 1 + 1); });
        FirstBtn.on("click", function () { if (CurrentPage != TotalPages) LoadPage(TotalPages); });
        LastBtn.on("click", function () { if (CurrentPage != 1) LoadPage(1); });
        HomeBtn.on("click", function () { ShowCourseIntro(); });

        SearchBtn.on("click", function ()
        { pushy = $('#Search'); push = $('#Search'); init(); DPush(); });

        MenuBtn.on("click", function ()
        { pushy = $('#MainMenu'); push = $('#MainMenu'); init(); DPush(); });

        /*$("li[dp] a").on('click', function ()
        {
    if ($(this).parent().attr('dp'))
    {
        LoadPage($(this).parent().attr('dp'));
        DPush();
        $("li[dp] a").removeClass('current');
        $(this).addClass('current');
    }
        });*/

        $('#SearchClose').on('click', function () { DPush(); });
        $('#MenuClose').on('click', function () { DPush(); });

        //happened after press enter
        //$('#SearchTxt').change(SearchValueChanged);
        $('#SearchTxt').on('input', SearchValueChanged);
        $('#SearchGloss').on('input', SearchGlossChanged);
        SearchValueChanged();
        SearchGlossChanged();
        //functions
        ShowCourseIntro();

        //LoadPage(1);
        ReplayBtn.on("click", function () { LoadPage(CurrentPage); });

        if (document.addEventListener) {
            document.addEventListener('webkitfullscreenchange', FullScreenExit, false);
            document.addEventListener('mozfullscreenchange', FullScreenExit, false);
            document.addEventListener('fullscreenchange', FullScreenExit, false);
            document.addEventListener('MSFullscreenChange', FullScreenExit, false);
        }

        $(window).on('resize', Resized);
        TotalPagesTxt.empty().append(TotalPages);
        Animate();
        $("li[dp] a").unbind();
        $("li[dp] a").on('click', MenuNav);
        $('#G2Pbtn').on('click', Nav);
        var onChange = function (evt)
        {
            if (this.value != undefined)
                GoToPageNumber = this.value * 1;
            else
                GoToPageNumber = -1;
            // console.info(this.value);
            // or
            // console.info(evt.target.value);
        };
        var input = document.getElementById('G2Ptxt');
        input.addEventListener('input', onChange, false);
        $('#G2Ptxt').keypress(function (event)
        {

            if (event.which == 13) {
                event.preventDefault();
                Nav();
            }
        });
        /*  $('#CurrentPageTxt').parent().on('click', function ()
          {
              $('#G2Ptxt').val(CurrentPage);
              //$('#G2Ptxt').parent().removeClass('hidden');
            //  $('#CurrentPageTxt').parent().addClass('hidden');
              $('#G2Ptxt').select();
          });*/
    }
);

var _100CurrentVid = 1, _100Count = 0;
function CheckFor100()
{
    if ($("#Temp100").length != 0) {
        _100Count = Content[CurrentPage - 1].MP4.length;
        _100CurrentVid = 1;
        jQuery(".PhotoPop").fancybox({ maxWidth: 1000, maxHeight: 700, minWidth: 200, minHeight: 200, fitToView: false, fitToView: true, autoSize: true, autoScale: true, closeClick: false, openEffect: 'fade', openSpeed: 500, closeEffect: 'fade', padding: 20, closeBtn: true });
        $(document).on('webkitfullscreenchange', function ()
        { if (document.webkitFullscreenElement !== null) { $('body').addClass('in-fullscreen'); } else { $('body').removeClass('in-fullscreen'); } });
        //Adjust Numbers and Assign Events
        $("#VidCurrentPage").html(1);

        $("#VidTotalPages").html(_100Count);
        $("#VidLeftArrow").on('click', function () { _100GoToVid(_100CurrentVid + 1); });
        //   $("#VidLeftArrow").attr("b", $("#VidLeftArrow").css("background-color"));
        $("#VidRightArrow").on('click', function () { _100GoToVid(_100CurrentVid - 1); });
        //$("#VidRightArrow").attr("b", $("#VidRightArrow").css("background-color"));
        $("#TopBullets").append("<div class='table-cell'><a class='dolfvidbullet current' dp='1'  href='#'></a></div>");
        for (var i = _100CurrentVid; i < _100Count; i++) {
            $("#TopBullets").append("<div class='table-cell'><a class='dolfvidbullet' dp='" + (i + 1) + "'  href='#'></a></div>");
        }
        $('.dolfvidbullet').on('click', function () { _100GoToVid($(this).attr('dp') * 1); });
        setTimeout(function () { _100GoToVid(1) }, 2800);
        jQuery(".PhotoPop").on('click', function ()
        {
            setTimeout(function () { $('.fancybox-skin').addClass('new-pop-01'); }, 50);
        });
    }
}
function CheckForInteractive()
{
    //remove the iframe src and store it in another attr till user open it
    if ($("#Temp101").length != 0) {
        $('iframe').attr('DSrc', $('iframe').attr("src"));
        $('iframe').attr('src', '');
        $('.InteractivePhotoPop').on('click', function () { $('iframe').attr('src', $('iframe').attr("DSrc")) });
        //fancey box on close remove iframe src
        $(".InteractivePhotoPop").fancybox({
            afterClose: function ()
            {
                $('iframe').attr('src', '');
            }
        });
    }
}
var Passive = "#979797";
function _100GoToVid(number)
{

    if (number > 0 && number <= _100Count) {
        $("#VidRightArrow").removeClass("off");
        $("#VidLeftArrow").removeClass("off");
        _100CurrentVid = number;
        if (number == _100Count) {
            $("#VidLeftArrow").addClass("off");
        }
        else if (number == 1) {
            $("#VidRightArrow").addClass("off");
        }
        number--;
        $("#VidMp4").attr('src', Content[CurrentPage - 1].MP4[number * 1]);
        $("#VidWebM").attr('src', Content[CurrentPage - 1].WebM[number * 1]);
        try {
            $("#VidMp4").parent()[0].load();
        } catch (e) {

        }
        $("#VidCurrentPage").html(_100CurrentVid);
        l($('.dolfvidbullet'));
        $('.dolfvidbullet').each(function (i)
        {
            l("I:" + i)
            $(this).removeClass('current').removeClass('visited');
            if (i == number) {
                $(this).addClass('current');
            }
            else if (i < number) {
                $(this).addClass('visited');
            }
        });
        $("#VidMp4").parent().get(0).play();
    }
}
function Nav()
{
    var number = parseInt(GoToPageNumber);
    if (number != "NaN") {
        if (number > Content.length) {
            LoadPage(Content.length);
        }
        else if (number < 0) {
            LoadPage(1);
        }
        else {
            var x = number * 1;;
            LoadPage(x);
        }
    }
};
function Resized()
{


    setTimeout(function ()
    {
        $('#Temp022 > div.Wrapper > div.slider.slider-nav.slick-initialized.slick-slider').css('height',
            $('#Temp022 > div.Wrapper > div.slider.slider-nav.slick-initialized.slick-slider > div > div > div.slick-slide.slick-current.slick-center > img').outerHeight() + 20);
        if ($(window).width() >= 1200) {
            height = !AccessBtn.active ? $('#MainArea').outerHeight() - 78 + "px" :
                $('#MainArea').outerHeight() - 78 - $('#sls_mod').outerHeight() + "px";
            $('#CaptionText').css("height", height);
        }
        else {
            $('#CaptionText').css("height", "");
        }
    }, 250);

    if ($('.slick-slider').length != 0 && $('.DropArea').length == 0 && GuidePosition == -1) {
        $('.slick-slider')[0].slick.refresh();
        if ($('.slider-for').length != 0) {
            $('.slider-for')[0].slick.refresh();
        }
    }
    //slick slider height adjust
    if ($('#Temp022 > div.Wrapper > div.slider.slider-nav.slick-initialized.slick-slider').length != 0) {
        setTimeout(function ()
        {
        }, 600);
    }
    $(".content-rd").mCustomScrollbar("update");
    $(".content-rd1").mCustomScrollbar("update");
    $(".content-rd2").mCustomScrollbar("update");
}
function escapeRegExp(str)
{
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}
function FullScreenExit()
{

    if (document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreen !== null) {
        if (document.fullscreenElement != null || document.msFullscreenElement != null ||
            document.mozFullscreenElement != null || document.webkitFullscreenElement != null) {
            FullScreened = true;
            fullScreenBtn.addClass("active");
        }
        else {
            FullScreened = false;
            fullScreenBtn.removeClass("active");
        }
    }
}
function ToggleCaption()
{

    //el 2 hay5tefo
    if (CaptionBtn.active) {
        CaptionBtn.active = false;
        CaptionBtn.removeClass('active');
        //el 2 e5tafo
        if (!AccessBtn.active) {
            Caption.css("display", "none");
            VideoFull();
        }
        else//el caption bass hwa elly hy5tefy
        {
            Caption.css("display", "none");
            AccessVideo.removeClass(MODE_ONLY_CLASS);
            AccessVideo.addClass(MODE_ONLY_CLASS);
        }
    }
    else//
    {

        CaptionBtn.active = true;
        CaptionBtn.addClass('active');
        Caption.css("display", "");
        AccessVideo.removeClass(MODE_ONLY_CLASS);
        Caption.removeClass(MODE_ONLY_CLASS);

        if (!AccessBtn.active) {
            VideoRestore();
            Caption.addClass(MODE_ONLY_CLASS);
        }

    }
    Resized();

}
function ToggleAccess()
{
    //el 2 hay5tefo
    if (AccessBtn.active) {
        AccessBtn.active = false;
        AccessBtn.removeClass('active');
        //el 2 e5tafo
        if (!CaptionBtn.active) {
            AccessVideo.css("display", "none");
            VideoFull();
        }
        else//el caption bass hwa elly hy5tefy
        {
            AccessVideo.css("display", "none");
            Caption.removeClass(MODE_ONLY_CLASS);
            Caption.addClass(MODE_ONLY_CLASS);
        }
    }
    else//
    {

        AccessBtn.active = true;
        AccessBtn.addClass('active');
        AccessVideo.css("display", "");
        AccessVideo.removeClass(MODE_ONLY_CLASS);
        Caption.removeClass(MODE_ONLY_CLASS);
        if (!CaptionBtn.active) {
            VideoRestore();
            AccessVideo.addClass(MODE_ONLY_CLASS);
        }
    }


    Resized();
}
function VideoFull()
{
    SideArea.css("display", "none");
    MainArea.parent().removeClass('col-lg-9 col-lg-push-3');
    MainArea.parent().addClass('col-lg-12');
}
function VideoRestore()
{
    SideArea.css("display", "");
    MainArea.parent().addClass('col-lg-9 col-lg-push-3');
    MainArea.parent().removeClass('col-lg-12');
}


var FullScreened = false;
function ToggleFullScreen()
{

    if (document.fullscreenElement || document.webkitFullscreenElement ||
        document.mozFullScreenElement || document.msFullscreenElement) {
        // exit full-screen

        if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
            FullScreened = false;
        }
        else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
            FullScreened = false;
        }
        else if (document.msExitFullscreen) {
            document.msExitFullscreen();
            FullScreened = false;
        }
        else if (document.exitFullscreen) {
            document.exitFullscreen();
            FullScreened = false;
        }
        if (!FullScreened) {
            fullScreenBtn.removeClass("active");
        }
    }
    else {
        //go full screen
        html = /*$('.body').get(0);*/document.getElementsByTagName("html")[0];
        if (html.requestFullscreen) {
            html.requestFullscreen();
            FullScreened = true;
        }
        else if (html.msRequestFullscreen) {
            html = document.getElementsByTagName("body")[0]
            html.msRequestFullscreen();
            FullScreened = true;
        }
        else if (html.mozRequestFullScreen) {
            html.mozRequestFullScreen();
            FullScreened = true;
        }
        else if (html.webkitRequestFullscreen) {
            html.webkitRequestFullscreen();
            FullScreened = true;
        }
        if (FullScreened) {
            fullScreenBtn.addClass("active");
        }
    }
}
function OpenInNewTab(url)
{
    var win = window.open(url, '_blank');
    win.focus();
}
function Print()
{
    /*$("#Cntnr").show();*/
    window.print();
    /* var e = $.Event('keydown');
     e.which = 80; // Character 'P'
     e.ctrlKey = true;
     $(document).trigger(e);*/
}
//=======sound==========
function StopAllSounds()
{
    if (window.audio) {
        window.audio.pause();
    }
    $('audio').each(function ()
    {
        try {
            this.pause();
        } catch (e) {

        }
    });
}
ThisMe = false;
function StopAllExceptThis(e)
{

    if (!ThisMe) {
        ThisMe = true;
        StopAllSounds();
        e.play();
        setTimeout(function () { ThisMe = false; }, 50);
    }
}
function LoadPage(PNumber)
{
    if (NavLocked) return;
    if (window.audio) {
        window.audio.pause();
        window.audio = null;
    }
    $('#G2Ptxt').val('');
    //$('#G2Ptxt').parent().addClass('hidden');
    // $('#CurrentPageTxt').parent().removeClass('hidden');

    $('#AxssVideo >video').get(0).currentTime = 0;
    $('#AxssVideo >video').get(0).play();
    if (PNumber < 1 || PNumber > TotalPages) return;

    //
    $("li[dp] a").removeClass('current');
    $("li[dp=" + PNumber + "] a").addClass('current');

    if (Content[PNumber - 1].q) {
        SetCurrentPage(PNumber);
        InitQuestions(PNumber - 1);
        AdjustScrolls();
        TitleToLesson();
    }
    else {

        P = Content[(PNumber - 1)];

        $('.screen-name').html(P.t);
        CurrentPage = PNumber;
        CurrentPageTxt.html(PNumber);
        SetCaption(P.c);
        SetContent(P.d);
        UpdateVideoEvents();
        //$(window).trigger('resize');
        if (P.a != "") {
            eval(P.a);
        };


        AdjustScrolls();
        UpdateSlider();
        UpdateGuideText();
        CheckTabs();
        CheckPDF();
        Resized();

    }

    UpdateTopTitle()
    /* MainArea.unbind();
     MainArea.load(function () { console.log("READY"); })*/
    Animate();
    CheckFor100();
    CheckForInteractive();
    LinkVideoWithCurrentSound();
}
function CheckTabs()
{
    //if current page has tab with intro page
    if ($("#Temp035").length !== 0 && $("#Temp023").length !== 0) {
        RemoveGuideText();
        $("#Temp023").addClass('hidden');
        $("#ShowTabsBtn").on('click', function ()
        {
            $("#Temp035").addClass('hidden');
            $("#Temp023").removeClass('hidden');

            Animate();
            Resized();
            var g = Content[CurrentPage - 1].g;
            if (g)
                $("#Temp024").append(GetGuide(g, null));
            StopAllSounds();
        });
    }
    else if ($("#Temp035").length !== 0 && $("#Temp024").length !== 0) {
        RemoveGuideText();
        $("#Temp024").addClass('hidden');
        $("#ShowTabsBtn").on('click', function ()
        {
            $("#Temp035").addClass('hidden');
            $("#Temp024").removeClass('hidden');


            Animate();
            Resized();
            //UpdateGuideText();
            var g = Content[CurrentPage - 1].g;
            if (g)
                $("#Temp024").append(GetGuide(g, null));
            StopAllSounds();
        });
    }

    else if ($("#Temp035").length !== 0 && $("#Temp046").length !== 0) {
        RemoveGuideText();
        if (!$("#Temp0035").hasClass("hidden")) {
            SetCaption('للبدء، انقر على زر ابدأ.');

            l("SHOWN")
        }
        $('.tabs_links').on('afterChange', NewTabsTempsChange);
        $("#Temp046").addClass('hidden');
        $("#ShowTabsBtn").on('click', function ()
        {
            $("#Temp035").addClass('hidden');
            $("#Temp046").removeClass('hidden');
            Animate();
            Resized();
            var g = Content[CurrentPage - 1].g;
            if (g) {
                $("#Temp046").append(GetGuide(g, null));
                SetCaption(g);
            }
            StopAllSounds();
            if ($('#Temp046 > div.wrapper > audio').get(0))

                $('#Temp046 > div.wrapper > audio').get(0).play();
        });
        if ($('#Temp046 > div.wrapper > audio').get(0))
            $('#Temp046 > div.wrapper > audio').get(0).pause();
    }
    else if ($("#Temp035").length !== 0 && $("#Temp062").length !== 0) {
        RemoveGuideText();
        if (!$("#Temp0035").hasClass("hidden")) {
            SetCaption('للبدء، انقر على زر ابدأ.');
            l("SHOWN")
        }
        $('.tabs_links').on('afterChange', NewTabsTempsChange);
        $("#Temp062").addClass('hidden');
        $("#ShowTabsBtn").on('click', function ()
        {
            $("#Temp035").addClass('hidden');
            $("#Temp062").removeClass('hidden');
            Animate();
            Resized();
            //UpdateGuideText();
            var g = Content[CurrentPage - 1].g;
            if (g) {
                $("#Temp062").append(GetGuide(g, null));
                SetCaption(g);
            }
            StopAllSounds();
            if ($('#Temp062 > div.wrapper > audio').get(0))
                $('#Temp062 > div.wrapper > audio').get(0).play();
        });
        if ($('#Temp062 > div.wrapper > audio').get(0))
            $('#Temp062 > div.wrapper > audio').get(0).pause();
    }

    if ($("#Temp023").length !== 0 || $("#Temp024").length !== 0 || $("#Temp046").length !== 0 || $("#Temp062").length !== 0)
        for (var i = 11; i > -1; i--) {
            {
                eval("if ($(\"a[href='#TNSI" + i + "']\").length !== 0) { $(\"a[href='#TNSI" + i + "']\").trigger('click');} ");
                eval("$(\"a[href='#TNSI" + i + "']\").on('click',Resized)");
            }
        }
    $("#Temp035").append(GetGuide('للبدء، انقر على زر ابدأ.', null));

}

function CheckPDF()
{
    /**if(!PDFBtn.hasClass('Off'))
PDFBtn.addClass('Off')
   
    if (typeof(PDF[CurrentPage]) !== "undefined" || PDF["all"])
    {
PDFBtn.unbind();
PDFBtn.removeClass('Off');
PDFBtn.on("click", function ()
{
    if (PDF[CurrentPage] !== undefined)
    {
OpenInNewTab(PDF[CurrentPage]);
    }
});
    }*/
}
function MenuNav()
{
    var r = $(this).parent().attr('dp');
    if (r) {
        LoadPage(($(this).parent().attr('dp') * 1));
        DPush();
    }
}
function DP()
{
    if ($(this).attr('DPage')) {
        $('.slider-for').slick('slickGoTo', $(this).attr('DPage'))
    }
}
function Animate()
{
    (function ($)
    {
        if ($.isFunction($.fn['themePluginAnimate'])) {

            $(function ()
            {
                $('[data-plugin-animate], [data-appear-animation]').each(function ()
                {
                    var $this = $(this),
                        opts;

                    var pluginOptions = $this.data('plugin-options');
                    if (pluginOptions)
                        opts = pluginOptions;

                    $this.themePluginAnimate(opts);
                });
            });
        }
    }).apply(this, [jQuery]);

}
function AdjustScrolls()
{
    if (CaptionHasNewScroll()) {
        CaptionTxt.removeClass("content-rd").removeClass('CAPTION');

        //return;
    }
    else
        $(".CAPTION").mCustomScrollbar({ theme: "rounded-dark", axis: "y", scrollButtons: { enable: true }, advanced: { updateOnContentResize: true } });


    CaptionTxt.mCustomScrollbar("scrollTo", "top", { scrollInertia: 0 });


    if ($("#Temp017").length !== 0) {
        /* setTimeout(function ()
         {
             $.mCustomScrollbar.defaults.scrollButtons.enable = true; //enable scrolling buttons by default
             $.mCustomScrollbar.defaults.axis = "y"; //enable 2 axis scrollbars by default
         
             $(".content-rd").mCustomScrollbar({ theme: "rounded-dark" });
         }, 4000);*/
        return;
    }


    setTimeout(function ()
    {
        $(".content-rd").mCustomScrollbar({ theme: "rounded-dark", axis: "y", scrollButtons: { enable: true }, advanced: { updateOnContentResize: true } });

        $(".content-rd1").mCustomScrollbar({ theme: "rounded-dark", axis: "x", scrollButtons: { enable: true }, advanced: { updateOnContentResize: true } });
        $(".content-rd3").mCustomScrollbar({ theme: "rounded-dark", axis: "yx", scrollButtons: { enable: true }, advanced: { updateOnContentResize: true } });
    }, 100);


}
function UpdateGuideText(passed)
{
    var r = passed ? passed : Content[CurrentPage - 1].g;
    if (r && r.length > 0) {

        if ($('.alert-dismissible').length === 0) {
            var wrapper = $('.wrapper');
            if (wrapper.length == 0) {
                wrapper = $('.Wrapper');

                if (wrapper.length > 1) {
                    wrapper = $('.Wrapper :last');
                }
            }
            else if ($('.wrapper').length > 1) {
                wrapper = $('.wrapper :last');
            }

            var a = $(GetGuide(r, null));
            if ($("#Temp000").length != 0) {
                $("#Temp000").append(a);
            }
            else
                a.insertAfter(wrapper);
            //  $("#MainArea > div").append(GetGuide(r));
        }
        else {
            var children = $('.alert-dismissible').children();
            children.remove();
            $('.alert-dismissible').html(r);
            $('.alert-dismissible').append(children);
        }
    }
}
function RemoveGuideText()
{
    $('.alert-dismissible').remove();
    AdjustScrolls();
}

function AdjustTopTitle()
{
    $('.Title01').html(Course.Name);
    $('.Title02 > .unit').html('');
    $('.Title02 > .sep').addClass('hidden');
    $('.Title02 > .lesson').html('');
}
function UpdateTopTitle()
{
    var p = Content[(CurrentPage - 1)];
    var v = $('#R02 > div > div > div > div > div > span');
    //getting unit
    var unit = p.m;
    var lesson = p.l;
    if (lesson == "L000" || v.html().indexOf("هداف الدر") != -1) {

        $('.Title02 > .unit').html(Course[unit].N);
        if (!$('.Title02 > .sep').hasClass('hidden')) {
            $('.Title02 > .sep').addClass('hidden');
            $('.Title02 > .lesson').addClass('hidden');
            $('.Title02 > .lesson').html('');
        }
    }
    else {
        $('.Title02 > .unit').html(Course[unit].N);
        $('.Title02 > .sep').removeClass('hidden');
        $('.Title02 > .lesson').removeClass('hidden');
        $('.Title02 > .lesson').html(Course[unit][lesson].N);
    }
    CheckUnit();
    CheckLesson();
}
function TitleToLesson()
{
    var p = Content[(CurrentPage - 1)];
    var unit = p.m;
    var lesson = p.l;
    var L = "";
    try {
        L = Course[unit][lesson].N;
        if (L.length > 0) {
            SetTitle(L);
        }
    } catch (e) {

    }
}
function GetGuide(g, ID)
{

    return "<div " + (ID != null ? ("ID='" + ID + "'") : "") + "class='alert alert alert-info alert-dismissible' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>×</span></button><!--strong>النص الإرشادي:</strong><br--> " + g + "</div>";;
}
function r()
{

    $.mCustomScrollbar.defaults.scrollButtons.enable = true; //enable scrolling buttons by default
    $.mCustomScrollbar.defaults.axis = "y"; //enable 2 axis scrollbars by default


    $(".content-l").mCustomScrollbar();

    $(".content-d").mCustomScrollbar({ theme: "dark" });

    $(".content-l2").mCustomScrollbar({ theme: "light-2" });

    $(".content-d2").mCustomScrollbar({ theme: "dark-2" });

    $(".content-l3").mCustomScrollbar({ theme: "light-3" });

    $(".content-d3").mCustomScrollbar({ theme: "dark-3" });

    $(".content-ltk").mCustomScrollbar({ theme: "light-thick" });

    $(".content-dtk").mCustomScrollbar({ theme: "dark-thick" });

    $(".content-ltn").mCustomScrollbar({ theme: "light-thin" });

    $(".content-dtn").mCustomScrollbar({ theme: "dark-thin" });

    $(".content-m").mCustomScrollbar({ theme: "minimal" });

    $(".content-md").mCustomScrollbar({ theme: "minimal-dark" });

    $(".content-i").mCustomScrollbar({ theme: "inset" });

    $(".content-id").mCustomScrollbar({ theme: "inset-dark" });

    $(".content-i2").mCustomScrollbar({ theme: "inset-2" });

    $(".content-i2d").mCustomScrollbar({ theme: "inset-2-dark" });

    $(".content-i3").mCustomScrollbar({ theme: "inset-3" });

    $(".content-i3d").mCustomScrollbar({ theme: "inset-3-dark" });

    $(".content-r").mCustomScrollbar({ theme: "rounded" });

    $(".content-rd").mCustomScrollbar({ theme: "rounded-dark" });

    $(".content-rds").mCustomScrollbar({ theme: "rounded-dots" });

    $(".content-rdsd").mCustomScrollbar({ theme: "rounded-dots-dark" });

    $(".content-3d").mCustomScrollbar({ theme: "3d" });

    $(".content-3dd").mCustomScrollbar({ theme: "3d-dark" });

    $(".content-3dt").mCustomScrollbar({ theme: "3d-thick" });

    $(".content-3dtd").mCustomScrollbar({ theme: "3d-thick-dark" });
    $(".all-themes-switch a").click(function (e)
    {
        e.preventDefault();
        var $this = $(this),
            rel = $this.attr("rel"),
            el = $(".content");
        switch (rel) {
            case "toggle-content":
                el.toggleClass("expanded-content");
                break;
        }
    });
}

//search part



function GetNewSearchResult(SearchResult, Word)
{
    return "<li><a DolfPage='" + SearchResult.PageNumber + "' href='#'><div class='Title'>" +
        "<span>الوحدة 1</span><span>/</span>  <span>الدرس 1</span> <span>/</span>  <span>الصفحة" + SearchResult.PageNumber + "</span></div>" +
        "<div class='Subject'> " + SearchResult.TextB + "<span class='TheWord'> " + Word + " </span>" + SearchResult.TextA + "</div></a> </li>";
}
function GetNorResultList()
{
    return "<li><div style='color:white;'> عذرا، لا توجد نتائج للبحث </div></li>";
}

//search result
//text before ,text afterm page number
DolfSearchResult = DSR = function (B, A, P)
{
    //supposed to open the caption
    this.PageNumber = P;
    this.TextA = A;
    this.TextB = B;
    this.L = this.Locate = function () { LoadPage(this.PageNumber); }
};

function SearchValueChanged()
{
    $('#SearchResults').empty();
    text = $('#SearchTxt').val();
    if (text.length < 3) {
        return;
    }
    //remove all items in search result
    //search for and get all results
    Results = Search(text);
    if (Results.length == 0) {
        $('#SearchResults').append(GetNorResultList());
    }
    else {
        for (var i = 0; i < Results.length; i++) {
            $('#SearchResults').append(GetNewSearchResult(Results[i], text));
        }
        //update events
        UpdateSearchEvents();
    }
}
function UpdateSearchEvents()
{
    $("#SearchResults > li > a").on('click', function ()
    {
        LoadPage($(this).attr('DolfPage'));
        DPush();
    });
}

function Search(TxtTSrch)
{
    SearchResults = [];
    for (var i = 0; i < Content.length; i++) {
        //search in caption
        var regexp = new RegExp(escapeRegExp(TxtTSrch), 'ig');
        // result = p[i].Cp.match(regexp);

        while ((match = regexp.exec(Content[i].c)) !== null) {
            PN = i + 1;
            string = Content[i].c;
            m = new DSR(string.substr(match.index > 10 ? match.index - 10 : 5, 9),
                string.substr(match.index + TxtTSrch.length, 4), PN);
            SearchResults.push(m);
        }
    }
    return SearchResults;
}


//glossary part

function GetOneGlossaryItem(Title, Content)
{

}

function SearchGlossChanged()
{
    //clear all
    $('#GlossaryList').empty();
    text = $('#SearchGloss').val();
    if (text.length < 1) {
        //redraw all
        for (var i = 0; i < Glossary.length; i++) {
            $('#GlossaryList').append(GetGlossItem(i));
        }
        return;
    }
    else {
        Results = SearchGloss(text);
        for (var i = 0; i < Results.length; i++) {
            $('#GlossaryList').append(GetGlossItem(Results[i]));
        }
    }
    //search
}
function SearchGloss(TxtTSrch)
{
    SearchResults = [];
    for (var i = 0; i < Glossary.length; i++) {
        //search in caption
        var regexp = new RegExp(escapeRegExp(TxtTSrch), 'ig');
        // result = p[i].Cp.match(regexp);

        while ((match = regexp.exec(Glossary[i].t)) !== null) {
            SearchResults.push(i);
        }
    }
    return SearchResults;
}
function GetGlossItem(NumberInGlossary)
{
    return "<li><div class='TermTitle'>" + Glossary[NumberInGlossary].t + "</div> <div class='TermDescription'>" + Glossary[NumberInGlossary].d + "</div></li>";
}

///video

/*  document.getElementById('myVideo').addEventListener('ended',myHandler,false);
    function myHandler(e) {
if(!e) { e = window.event; }
alert("Video Finished");
    }*/


function UpdateVideoEvents()
{
    $('#MainArea > video').on("ended", VidEnded);
    $('#MainArea > video').on("play", VidPlayed);
    $('#MainArea > video').on("pause", VidPaused);
    $('#MainArea > video').on("seeking", VidSeeking);

}
function VidEnded()
{
    VidPaused();
    $('#AxssVideo > video').get(0).currentTime = 2;
}
function VidPlayed()
{
    $('#AxssVideo > video').get(0).play();
    Resized();
}
function VidPaused()
{
    $('#AxssVideo > video').get(0).pause();

}
function VidSeeking()
{
    $('#AxssVideo > video').get(0).currentTime = $('#MainArea > video').get(0).currentTime + 2;
}


//pushy menu helper

function DPush()
{
    if (cssTransforms3d())
        togglePushy();
    else {
        if (opened) {
            closePushyFallback();
            opened = false;
        } else {
            openPushyFallback();
            opened = true;
        }
    }
}
function SetCaption(Text)
{
    //getting the firtst div if exists thats mean the scroll is enabled so try to put the text in the right place
    if (CaptionHasNewScroll()) {
        $('#CaptionText >  div:first-child >  div:first-child').html(Text);
    }
    else
        CaptionTxt.html(Text);
    AdjustScrolls();
}
function CaptionHasNewScroll()
{
    return $('#CaptionText >  div:first-child ').length > 0;
}
function SetTitle(Text)
{
    $('.screen-name').html(Text);
}
function SetContent(c)
{
    MainArea.html(c);
    AdjustScrolls();
    if ($('#Temp011').length != 0 || $('#Temp017').length != 0 || $('#Temp019').length != 0 ||
        $('#Temp022').length != 0 || $('#Temp023').length != 0 || $('#Temp024').length != 0 ||
        $('#Temp062').length != 0 || $('#Temp046').length != 0) {
        var c = Content[CurrentPage - 1].g ? Content[CurrentPage - 1].g : "";
        SetCaption(c);
    }
    /*else if (c.indexOf("class='Equation'") != -1) {
        var _CAPTION = $('.Equation').get(0).innerHTML;
        /* $('.Equation').each(function (index)
 {
     //_CAPTION += $(this).get(0).innerHTML + "<br><br><br>";
     l($(this));
 })*
        SetCaption(_CAPTION);//("<div class='Equation-Div'>" + $('.Equation').html() + "<\div>");
    }*/
}
function extractContent(s)
{
    var span = document.createElement('span');
    span.innerHTML = s;
    return /**span.textContent ||*/ span.innerText;
};
function SetCurrentPage(number)
{
    CurrentPage = number;
    CurrentPageTxt.html(number);
}

function UpdateSlider()
{
    $('#DSNav a').unbind();
    $('.slider').unbind();
    $('#DSNav a').on('click', function () { var slide = $(this).attr('dpage') * 1; $('.slider').slick('slickGoTo', slide); });
    $('.slider').on('afterChange', SlideChanged);
}
function SlideChanged(event, slick, currentSlide, nextSlide)
{
    $('#DSNav a').removeClass('current');
    $('#DSNav a:nth-child(' + (currentSlide + 1) + ')').addClass('current');

}
var GuidePosition = -1;
function ShowCourseIntro()
{
    if (typeof (intro) != "undefined") {
        HideCntrls();
        MainArea.html(GetCourseIntro());
        $(".Temp035Next").on('click', function () { $.fancybox.prev(); GuidePosition++; })
        $(".r-arrow").on('click', function () { if (!$(this).hasClass('off')) { $.fancybox.next(); GuidePosition--; } })
        $(".l-arrow").on('click', function () { if (!$(this).hasClass('off')) { $.fancybox.prev(); GuidePosition++; } })
        UpdateGuideText("للبدء فى استعراض الحقيبة الإلكترونية، قم بالضغط على زر ابدأ.");
        $('.btn').off();
        $('a.unit').off();
        $('.btn').on('click', function ()
        {
            ShowCntrls();
            LoadPage(1);
        });
        $('a.unit').on('click', function ()
        {
            ShowCntrls();
            $.fancybox.close();
            LoadPage($(this).attr('dp'));
        });
        // $('audio').on('play', function () { StopAllExceptThis(this) });
        //
        //show use guides
        jQuery(".IntroductionTempsScr").on('click', function (e)
        {
            GuidePosition = 0;
            e.preventDefault(true);
            $.fancybox([{ href: '#Temp022' }, { href: '#Temp046' }, { href: '#Temp035' }], {
                arrows: false, loop: false,
                afterClose: function ()
                {
                    GuidePosition = -1;
                },
                'beforeClose': StopAllSounds, afterShow: StopAllSounds, afterLoad: Be4Show,
                next: function () { console.log('next was called'); },
                prev: function () { console.log('prev was called'); },
                maxWidth: 1200, maxHeight: 810, fitToView: false, padding: 0, width: '98%', height: '98%', autoSize: false, closeClick: false, openEffect: 'fade', openSpeed: 500, closeEffect: 'fade', padding: 20, closeBtn: true
            })
            $.fancybox.jumpto(2);
            StopAllSounds();
        });
        jQuery(".IntroductionScr").on('click', function () { setTimeout(function () { $('.fancybox-skin').addClass('new-pop-01'); }, 50); });
        jQuery(".IntroductionScrV").on('click', function () { setTimeout(function () { $('#E-suite-intro > div > div.intro-vid > video').get(0).play(); }, 100) });
        jQuery(".PhotoPop").on('click', function () { setTimeout(function () { $('.fancybox-skin').addClass('new-pop-01'); }, 50); });
        jQuery(".PhotoG").fancybox({ openEffect: 'elastic', closeEffect: 'elastic', });
        jQuery(".PhotoG").on('click', function () { setTimeout(function () { $('.fancybox-skin').addClass('new-pop-01'); }, 50); });

        ///////////
        eval("jQuery('.IntroductionScr').fancybox({maxWidth: 700,maxHeight: 500,fitToView	: false,    width: '95%',height: '98%',autoSize	: false,closeClick	: false,openEffect	: 'fade',openSpeed 	:	500,closeEffect	: 'fade',padding: 20,closeBtn: true    });jQuery('.IntroductionScr').on('click',function (){setTimeout(function(){$('.fancybox-skin').addClass('new-pop-01');},50);});")
        $('.PhotosWrapper').slick({ infinite: true, slidesToShow: 3, slidesToScroll: 1, rtl: true, adaptiveHeight: true, dots: true, infinite: false, responsive: [{ breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 2, } }, { breakpoint: 481, settings: { slidesToShow: 1, slidesToScroll: 1, } }, ] });
        $('#grid-containter').slick({ infinite: true, slidesToShow: 3, slidesToScroll: 1, rtl: true, adaptiveHeight: true, dots: true, infinite: false, responsive: [{ breakpoint: 992, settings: { slidesToShow: 2, slidesToScroll: 2, } }, { breakpoint: 550, settings: { slidesToShow: 1, slidesToScroll: 1, } }, ] });
        $('.tabs_links').slick({ slidesToShow: 4, slidesToScroll: 4, rtl: true, adaptiveHeight: true, dots: false, infinite: false, responsive: [{ breakpoint: 1025, settings: { slidesToShow: 3, slidesToScroll: 3, } }, { breakpoint: 850, settings: { slidesToShow: 2, slidesToScroll: 2, } }, { breakpoint: 610, settings: { slidesToShow: 1, slidesToScroll: 1, } }, ] });
        $('.slider-for').slick({ arrows: false, fade: true, dots: true, adaptiveHeight: true, asNavFor: '.slider-nav', rtl: true, responsive: [{ breakpoint: 481, settings: { dots: false, } }, ] });
        $('.slider-nav').slick({ centerMode: true, centerPadding: '00px', slidesToShow: 3, slidesToScroll: 1, autoplay: false, autoplaySpeed: 2000, adaptiveHeight: true, asNavFor: '.slider-for', rtl: true, infinite: false, arrows: false, focusOnSelect: true, responsive: [{ breakpoint: 1281, settings: { slidesToShow: 3, slidesToScroll: 1, } }, { breakpoint: 769, settings: { slidesToShow: 2, slidesToScroll: 1, infinite: true, } }, ] });
        $('.HomeToolTip01').tooltipster({ animation: 'grow', delay: 10, theme: 'tooltipster-light', touchDevices: true, trigger: 'hover', maxWidth: 320, });
    }
    else
        LoadPage(1);

    $('.tabs_links').on('afterChange', TabsChanged);
    $('.tabs_links').on('beforeChange', StopAllSounds);
    $('#Temp022').find('> .Wrapper > .slider-for').on('beforeChange', StopAllSounds);
    $('#Temp022').find('> .Wrapper > .slick-slider').on('afterChange', function (event, slick, currentSlide)
    {
        StopAllSounds();
        audio = $("#Temp022 > div.Wrapper > div.slider.slider-for> div > div > div.slick-slide.slick-current> audio")[0];
        audio.currentTime = 0;
        audio.play();
    });

}
IClicked = false;
Assigned = false;
function TabsChanged(event, slick, currentSlide)
{
    if (GuidePosition == -1) return;
    Tab = $('.tabs_links_item').parent().find(">:nth-child(" + (currentSlide + 1) + ") > a");

    if (slick.Moving) return;
    slick.Moving = true;
    Tab.trigger('click');
    setTimeout(function () { slick.Moving = false; }, 10);
    if (!Assigned) {
        $('.tabs_links_item').on('click', function ()
        {
            StopAllSounds();
            audio = $('#tabsNavigation01').parent().find('> .tab-pane > audio').get($(this).index());
            audio.currentTime = 0;
            audio.play();
        });
        Assigned = true;
    }
}
var NewTabCurrent = 0;
function NewTabsTempsChange(event, slick, currentSlide)
{
    l("Tabs Changed123");
    if (NewTabCurrent == currentSlide) return;
    NewTabCurrent = currentSlide;
    Tab = $('.tabs_links_item').parent().find(">:nth-child(" + (currentSlide + 1) + ") > a");
    if (slick.Moving) return;
    slick.Moving = true;
    Tab.trigger('click');
    slick.Moving = false;
}
GuidePopupID = "G_POP_TXT";
var chrSrc = "";
var IntroPrepareDone = 0;
function UpdatePopUpGuide()
{
    g1 = "للمتابعة، قم بالضغط على زر ابدأ.";
    g2 = "أنقر على كل أداة لمعرفة المزيد عنها، أو زر التالي للمتابعة.";
    g3 = "لنستعرض معاً هيكلية عمل  بيئة الحقيبة الإلكترونية.";
    g = g1;
    if (GuidePosition == 1) {
        g = g2;

    }
    else if (GuidePosition == 2) {
        g = g3;
    }
    if (GuidePosition == 0) {
        if (chrSrc == "") {
            chrSrc = $('#goal_chr').attr('src');
            $('.tabs_links a').on('click', function ()
            {
                $(this).addClass('current_tab');
                $(this).parent().siblings().find('a').removeClass('current_tab');
            });
            // AdjustScrolls();

        }
        $('#goal_chr').attr('src', chrSrc + '?' + Math.random());
    }
    $('.fancybox-outer').append(GetGuide(g));
}
function Be4Show(current)
{
    if (current.index == 0)// == "#Temp022")
    {
        GuidePosition = 2;
        if (IntroPrepareDone < 2)
            try {
                /* $("#Temp022").find('.slider-for')[0].slick.slickGoTo(1);
                 $("#Temp022").find('.slider-nav')[0].slick.slickGoTo(0);
                 $("#Temp022").find('.slider-nav')[0].slick.refresh();
                 $("#Temp022").find('.slider-for')[0].slick.refresh();*/
                AdjustScrolls();
                IntroPrepareDone++;

            }
            catch (e) { }
    }
    else if (current.index == 1)//== "#Temp046")
    {
        GuidePosition = 1;
    }
    else if (current.index == 2) //== "#Temp035")
    {

        GuidePosition = 0;
    }
    UpdatePopUpGuide();
    $('.fancybox-skin').addClass('SupportTempsInPopup');
    Resized();
    Animate();
    var atimeout;
    setTimeout(function ()
    {

        if ($(".fancybox-inner> #Temp022").length > 0) {
            GuidePosition = 2;
        }
        else if ($(".fancybox-inner> #Temp046").length > 0) {
            GuidePosition = 1;
        }
        else if ($(".fancybox-inner> #Temp035").length > 0) {
            GuidePosition = 0;
        }
        StopAllSounds();

        if (GuidePosition == 0) {
            audio = $('#Temp035 > div.wrapper > audio')[0]
        }
        else if (GuidePosition == 1) {
            audio = $('#dolfhelp2ndbtn').get(0);/// $('#tabsNavigation01 > audio')[0];
            $('#Temp046 > div.wrapper > div.tabs > div.tabs_links').slick('slickGoTo', 0);
        }
        else if (GuidePosition == 2) {
            $('#Temp022 > div.Wrapper > div.slider').slick('refresh');
            audio = $('#Temp022 > div.Wrapper > div.slider.slider-for.slick-initialized.slick-slider.slick-dotted > div > div > div.slick-slide.slick-current.slick-active > audio')[0];
            l("audio:" + audio);
        }
        var T = GuidePosition == 0 ? 2600 : 30;
        if (audio != false) {
            l("GuidePosition:" + GuidePosition);

            audio.currentTime = 0;
            clearTimeout(atimeout);
            atimeout = setTimeout(function ()
            {
                //if (audio.curretTime != 0 )//&& GuidePosition == 0)
                {
                    audio.play();
                }
            }, T);
        }
    }, 500);

}
function GetCourseIntro()
{

    IntroPrepareDone = 0;
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
    //class='Temp035Next'
    //
    var r = "<div id='Temp000' data-appear-animation='fadeIn' data-appear-animation-delay='100' class='appear-animation fadeIn appear-animation-visible' style='animation-delay: 100ms;'><div class='wrapper'><div class='R01 appear-animation fadeInUp appear-animation-visible' data-appear-animation='fadeInUp' data-appear-animation-delay='200' style='animation-delay: 200ms;'></div><div class='R02 appear-animation bounceIn appear-animation-visible' data-appear-animation='bounceIn' data-appear-animation-delay='600' style='animation-delay: 600ms;'><div class='row'><div class='col-md-5 col-md-push-7 logo_side'><img src='assets/images/Templates/Temp000/logo.png' width='367' height='76' alt=''></div><div class='col-md-7 col-md-pull-5 title_side'>" + Course.Name + "</div></div></div><div class='R03 appear-animation bounceIn appear-animation-visible' data-appear-animation='bounceIn' data-appear-animation-delay='1000' style='animation-delay: 1000ms;'><div class='row'><div class='col-sm-4 '><a class='icon-link link01 IntroductionScr appear-animation fadeInUp appear-animation-visible' href='#E-suite-Content' data-appear-animation='fadeInUp' data-appear-animation-delay='1400' style='animation-delay: 1400ms;'>محتويات<br>الحـــقيبة</a></div><div class='col-sm-4'><a class='icon-link link02 IntroductionTempsScr' href='#Taemp035' data-appear-animation='fadeInDown' data-appear-animation-delay='1600' style='animation-delay: 1600ms;'>إرشـــــــادات<br>الاستخدام</a></div><div class='col-sm-4'><a class='icon-link link03 IntroductionScr IntroductionScrV appear-animation fadeInUp appear-animation-visible' href='#E-suite-intro' data-appear-animation='fadeInUp' data-appear-animation-delay='1800' style='animation-delay: 1800ms;'>مدخــــل<br>الحقيبة</a></div></div></div><div class='R04 appear-animation fadeInDown appear-animation-visible' data-appear-animation='fadeInDown' data-appear-animation-delay='2000' style='animation-delay: 2000ms;'><div class='table'><div class='table-row'><div class='table-cell pic_side'><img src='assets/Course/intro.png' alt=''></div><div class='table-cell icon_side'>" + "<a href='#' class='btn'>ابدأ</a></div></div></div></div><div class='R05 appear-animation bounceIn appear-animation-visible' data-appear-animation='bounceIn' data-appear-animation-delay='2100' style='animation-delay: 2100ms;'></div><div id='E-suite-Content' class='PopupPhotoDiv' style='display:none'><div class='IntroductionPopup'><div class='intro-header'><div class='intro-title'>محتويات الحقيبة</div></div><div class='intro-E-Suite'>";
    return r + GetUnits() + "</div></div></div>" +
        "<div id='E-suite-guide' class='PopupPhotoDiv' style='display:none'><div class='IntroductionPopup'>" +
        "<div id='Temp035' class='MainBg' data-appear-animation='fadeIn' data-appear-animation-delay='100' ><div class='wrapper'><div class='Title2' data-appear-animation='fadeInDown' data-appear-animation-delay='100'><div class='table TitleBox2' ><div class='table-row'><div class='table-cell td01'></div><div class='table-cell td06'><div class='table TitleBox2-main' ><div class='table-row'><div class='table-cell right-s'></div><div class='table-cell'><div class='table TitleBox3-main'><div class='table-row'><div class='table-cell td-tr'></div><div class='table-cell td-tm'><span>إرشادات الاستخدام</span></div><div class='table-cell td-tl'></div></div><div class='table-row'><div class='table-cell td-br'></div><div class='table-cell td-bm'></div><div class='table-cell td-bl'></div></div></div></div><div class='table-cell left-s'></div></div></div></div><div class='table-cell td07'></div></div></div></div><div class='cleaner'></div><div class='table MainScr' data-appear-animation='fadeInDown' data-appear-animation-delay='100'><div class='table-row'><div class='table-cell MainScr_top_right'></div><div class='table-cell MainScr_top_med'></div><div class='table-cell MainScr_top_left'></div></div><div class='table-row'><div class='table-cell MainScr_med_right'></div><div class='table-cell MainScr_med_med'><div class='table content'><div class='table-row'><div class='table-cell PicArea' data-appear-animation='bounceIn' data-appear-animation-delay='100'><img class='Pic01 flip' id='goal_chr' src='assets/images/Templates/Temp-General/Character" + d + ".gif' alt=''/></div><div class='clearfix ClearLine'></div><div class='table-cell DataArea' data-appear-animation='bounceIn' data-appear-animation-delay='2900'><div class='data'><div class='data-box'><div class='data-inner content-rd'>تم تصميم بيئة التدريب الإلكتروني الخاصة بالحقائب الإلكترونية التفاعلية لمشروع التدريب الذاتي في المؤسسة العامة للتدريب التقني والمهني والتي تشمل بعض المميزات المفيدة التي من شأنها أن تساعدك على الإستفادة من الوقت بأفضل طريقة ممكنة أثناء التعامل مع محتوى الحقيبة الإلكترونية.</div><div class='Vline'></div><div class='Hline'></div><a href='#' class='Temp035Next R-btn' data-appear-animation='bounceIn' data-appear-animation-delay='2900'>ابدأ</a></div></div></div></div></div></div><div class='table-cell MainScr_med_left'></div></div><div class='table-row'><div class='table-cell MainScr_bot_right'></div><div class='table-cell MainScr_bot_med'></div><div class='table-cell MainScr_bot_left'></div></div><div class='FloatIcon' data-appear-animation='bounceIn' data-appear-animation-delay='3500'><img src='assets/images/Templates/Temp035/bot-icon.png' width='37' height='33' alt=''/></div></div><div class='cleaner'></div><audio controls><source src='assets/audio/1.mp3' type='audio/mpeg' autoplay='true' /></audio></div><div class='cleaner'></div><div class='PagerWrapper' data-appear-animation='bounceIn' data-appear-animation-delay='500'><div class='pager' data-appear-animation='bounceIn' data-appear-animation-delay='500'><div class='table'><div class='table-row'><div class='table-cell'><a href='#' class='r-arrow off HomeToolTip01' title='لا توجد صفحة سابقة'></a></div><div class='table-cell'><div class='state'><span>1</span><span class='sep'>/</span><span>3</span></div></div><div class='table-cell'><a href='#' class='l-arrow HomeToolTip01' title='الصفحة التالية'></a></div></div></div></div></div><div class='cleaner'></div></div>" +
        "<div id='Temp046' class='hidden1' data-appear-animation='fadeIn' data-appear-animation-delay='100' ><div class='wrapper'><div class='Title2' data-appear-animation='fadeInDown' data-appear-animation-delay='100'><div class='table TitleBox2' ><div class='table-row'><div class='table-cell td01'></div><div class='table-cell td06'><div class='table TitleBox2-main' ><div class='table-row'><div class='table-cell right-s'></div><div class='table-cell'><div class='table TitleBox3-main'><div class='table-row'><div class='table-cell td-tr'></div><div class='table-cell td-tm'><span>شريط الأدوات المساعدة</span></div><div class='table-cell td-tl'></div></div><div class='table-row'><div class='table-cell td-br'></div><div class='table-cell td-bm'></div><div class='table-cell td-bl'></div></div></div></div><div class='table-cell left-s'></div></div></div></div><div class='table-cell td07'></div></div></div></div><div class='tabs'><div class='tabs_links' data-appear-animation='fadeInUp' data-appear-animation-delay='500'><div class='tabs_links_item' ><a href='#tabsNavigation01' data-toggle='tab' class='current_tab'><span class='tab_icon'><img src='assets/images/Templates/Temp000/Help/t_01" + d + ".png' alt=''/></span><span class='tab_title'>أداة البحث </span></a></div><div class='tabs_links_item' ><a href='#tabsNavigation02' data-toggle='tab'><span class='tab_icon'><img src='assets/images/Templates/Temp000/Help/t_02" + d + ".png' alt=''/></span><span class='tab_title'>أداة الكتاب الإلكتروني والمراجع</span></a></div><div class='tabs_links_item' ><a href='#tabsNavigation03' data-toggle='tab'><span class='tab_icon'><img src='assets/images/Templates/Temp000/Help/t_03" + d + ".png' alt=''/></span><span class='tab_title'>أداة قاموس المصطلحات</span></a></div><div class='tabs_links_item' ><a href='#tabsNavigation04' data-toggle='tab'><span class='tab_icon'><img src='assets/images/Templates/Temp000/Help/t_04" + d + ".png' alt=''/></span><span class='tab_title'>أداة النسخة النصية</span></a></div><div class='tabs_links_item' ><a href='#tabsNavigation05' data-toggle='tab'><span class='tab_icon'><img src='assets/images/Templates/Temp000/Help/t_05" + d + ".png' alt=''/></span><span class='tab_title'>أداة الطباعة</span></a></div><div class='tabs_links_item' ><a href='#tabsNavigation06' data-toggle='tab'><span class='tab_icon'><img src='assets/images/Templates/Temp000/Help/t_06" + d + ".png' alt=''/></span><span class='tab_title'>أداة دعم ذوي الأحتياجات الخاصة</span></a></div><div class='tabs_links_item' ><a href='#tabsNavigation07' data-toggle='tab'><span class='tab_icon'><img src='assets/images/Templates/Temp000/Help/t_07" + d + ".png' alt=''/></span><span class='tab_title'>أداة إعادة التحميل</span></a></div><div class='tabs_links_item' ><a href='#tabsNavigation08' data-toggle='tab'><span class='tab_icon'><img src='assets/images/Templates/Temp000/Help/t_08" + d + ".png' alt=''/></span><span class='tab_title'>أداة المساعدة</span></a></div><div class='tabs_links_item' ><a href='#tabsNavigation09' data-toggle='tab'><span class='tab_icon'><img src='assets/images/Templates/Temp000/Help/t_09" + d + ".png' alt=''/></span><span class='tab_title'>أداة الصفحة الرئيسية</span></a></div><div class='tabs_links_item' ><a href='#tabsNavigation10' data-toggle='tab'><span class='tab_icon'><img src='assets/images/Templates/Temp000/Help/t_10" + d + ".png' alt=''/></span><span class='tab_title'>أداة قائمة الموضوعات</span></a></div><div class='tabs_links_item' ><a href='#tabsNavigation11' data-toggle='tab'><span class='tab_icon'><img src='assets/images/Templates/Temp000/Help/t_11" + d + ".png' alt=''/></span><span class='tab_title'>أداة ملئ الشاشة</span></a></div><div class='tabs_links_item' ><a href='#tabsNavigation12' data-toggle='tab'><span class='tab_icon'><img src='assets/images/Templates/Temp000/Help/t_12" + d + ".png' alt=''/></span><span class='tab_title'>أداة وحدة التنقل بين الصفحات</span></a></div><div class='tabs_links_item' ><a href='#tabsNavigation13' data-toggle='tab'><span class='tab_icon'><img src='assets/images/Templates/Temp000/Help/t_16" + d + ".png' alt=''/></span><span class='tab_title'>أداة الشاشة الأولى</span></a></div><div class='tabs_links_item' ><a href='#tabsNavigation14' data-toggle='tab'><span class='tab_icon'><img src='assets/images/Templates/Temp000/Help/t_17" + d + ".png' alt=''/></span><span class='tab_title'>أداة السابق</span></a></div><div class='tabs_links_item' ><a href='#tabsNavigation15' data-toggle='tab'><span class='tab_icon'><img src='assets/images/Templates/Temp000/Help/t_15" + d + ".png' alt=''/></span><span class='tab_title'>أداة الإنتقال لشاشة محددة</span></a></div><div class='tabs_links_item' ><a href='#tabsNavigation16' data-toggle='tab'><span class='tab_icon'><img src='assets/images/Templates/Temp000/Help/t_13" + d + ".png' alt=''/></span><span class='tab_title'>أداة الشاشة الأخيرة</span></a></div><div class='tabs_links_item' ><a href='#tabsNavigation17' data-toggle='tab'><span class='tab_icon'><img src='assets/images/Templates/Temp000/Help/t_14" + d + ".png' alt=''/></span><span class='tab_title'>أداة التالي</span></a></div><div class='tabs_links_item' ><a href='#tabsNavigation18' data-toggle='tab'><span class='tab_icon'><img src='assets/images/Templates/Temp000/Help/t_18" + d + ".png' alt=''/></span><span class='tab_title'>أداة التشغيل</span></a></div><div class='tabs_links_item' ><a href='#tabsNavigation19' data-toggle='tab'><span class='tab_icon'><img src='assets/images/Templates/Temp000/Help/t_19" + d + ".png' alt=''/></span><span class='tab_title'>أداة الإيقاف المؤقت</span></a></div><div class='tabs_links_item' ><a href='#tabsNavigation20' data-toggle='tab'><span class='tab_icon'><img src='assets/images/Templates/Temp000/Help/t_20" + d + ".png' alt=''/></span><span class='tab_title'>أداة التحكم بالصوت</span></a></div><div class='tabs_links_item' ><a href='#tabsNavigation21' data-toggle='tab'><span class='tab_icon'><img src='assets/images/Templates/Temp000/Help/t_21" + d + ".png' alt=''/></span><span class='tab_title'>أداة ملئ الشاشة للفيديو</span></a></div></div><div class='cleaner'></div><div class='table MainScr' data-appear-animation='fadeInDown' data-appear-animation-delay='1000'><div class='table-row'><div class='table-cell MainScr_top_right'></div><div class='table-cell MainScr_top_med'></div><div class='table-cell MainScr_top_left'></div></div><div class='table-row'><div class='table-cell MainScr_med_right'></div><div class='table-cell MainScr_med_med pd001'><div class='tab-content'><div class='tab-pane active' id='tabsNavigation01'><div class='row help-box'><div class='col-sm-3 image-side'><img src='assets/images/Templates/Temp000/Help/p_01" + d + ".png' alt=''/></div><div class='col-sm-9 data-side'><div class='tab-title'>أداة البحث:</div><div class='tab-body'>تعمل هذه الأداة على تمكين المتدرب من البحث ضمن قائمة المواضيع داخل النسخة النصية للمواد العلمية المختلفة.</div></div></div><audio controls><source src='assets/audio/2/2.01.mp3' type='audio/mpeg' /></audio></div><div class='tab-pane' id='tabsNavigation02'><div class='row help-box'><div class='col-sm-3 image-side'><img src='assets/images/Templates/Temp000/Help/p_02" + d + ".png' alt=''/></div><div class='col-sm-9 data-side'><div class='tab-title'>أداة الكتاب الإلكتروني والمراجع:</div><div class='tab-body'>تعمل هذه الأداة على الربط تلقائياً مع ملف PDF لتستعرض نسخة من الكتاب الإلكتروني بالإضافة إلى المراجع الخاصة بالحقيبة الإلكترونية.</div></div></div><audio controls><source src='assets/audio/2/2.02.mp3' type='audio/mpeg' /></audio></div><div class='tab-pane' id='tabsNavigation03'><div class='row help-box'><div class='col-sm-3 image-side'><img src='assets/images/Templates/Temp000/Help/p_03" + d + ".png' alt=''/></div><div class='col-sm-9 data-side'><div class='tab-title'>أداة قاموس المصطلحات:</div><div class='tab-body'>تعرض هذه الأداة قائمة بمصطلحات الحقيبة الإلكترونية، كما تتيح للمتدرب البحث في المصطلحات.</div></div></div><audio controls><source src='assets/audio/2/2.03.mp3' type='audio/mpeg' /></audio></div><div class='tab-pane' id='tabsNavigation04'><div class='row help-box'><div class='col-sm-3 image-side'><img src='assets/images/Templates/Temp000/Help/p_04" + d + ".png' alt=''/></div><div class='col-sm-9 data-side'><div class='tab-title'>أداة النسخة النصية:</div><div class='tab-body'>تعمل هذه الأداة بفتح وحدة النسخة النصية للحقيبة الإلكترونية.</div></div></div><audio controls><source src='assets/audio/2/2.04.mp3' type='audio/mpeg' /></audio></div><div class='tab-pane' id='tabsNavigation05'><div class='row help-box'><div class='col-sm-3 image-side'><img src='assets/images/Templates/Temp000/Help/p_05" + d + ".png' alt=''/></div><div class='col-sm-9 data-side'><div class='tab-title'>أداة الطباعة:</div><div class='tab-body'>تقوم هذه الأداة بطباعة محتوى الشاشة الحالية.</div></div></div><audio controls><source src='assets/audio/2/2.05.mp3' type='audio/mpeg' /></audio></div><div class='tab-pane' id='tabsNavigation06'><div class='row help-box'><div class='col-sm-3 image-side'><img src='assets/images/Templates/Temp000/Help/p_06" + d + ".png' alt=''/></div><div class='col-sm-9 data-side'><div class='tab-title'>أداة دعم ذوي الاحتياجات الخاصة:</div><div class='tab-body'>تظهر هذه الأداة وسيلة دعم لذوي الاحتياجات الخاصة الملحقة في الحقيبة الإلكترونية.</div></div></div><audio controls><source src='assets/audio/2/2.06.mp3' type='audio/mpeg' /></audio></div><div class='tab-pane' id='tabsNavigation07'><div class='row help-box'><div class='col-sm-3 image-side'><img src='assets/images/Templates/Temp000/Help/p_07" + d + ".png' alt=''/></div><div class='col-sm-9 data-side'><div class='tab-title'>أداة إعادة التحميل:</div><div class='tab-body'>تقوم هذه الأداة بإعادة تحميل وعرض محتوى الشاشة النشطة.</div></div></div><audio controls><source src='assets/audio/2/2.07.mp3' type='audio/mpeg' /></audio></div><div class='tab-pane' id='tabsNavigation08'><div class='row help-box'><div class='col-sm-3 image-side'><img src='assets/images/Templates/Temp000/Help/p_08" + d + ".png' alt=''/></div><div class='col-sm-9 data-side'><div class='tab-title'>أداة المساعدة:</div><div class='tab-body'>تعرض هذه الأداة شاشة المساعدة والتي تقدم شرحاً مبسطاً لأهم عناصر المستعرض وكيفية التعامل معه.</div></div></div><audio controls><source src='assets/audio/2/2.08.mp3' type='audio/mpeg' /></audio></div><div class='tab-pane' id='tabsNavigation09'><div class='row help-box'><div class='col-sm-3 image-side'><img src='assets/images/Templates/Temp000/Help/p_09" + d + ".png' alt=''/></div><div class='col-sm-9 data-side'><div class='tab-title'>أداة الصفحة الرئيسية:</div><div class='tab-body'>تقوم هذه الأداة بالعودة إلى الصفحة الأولى الرئيسية في الحقيبة الإلكترونية.</div></div></div><audio controls><source src='assets/audio/2/2.09.mp3' type='audio/mpeg' /></audio></div><div class='tab-pane' id='tabsNavigation10'><div class='row help-box'><div class='col-sm-3 image-side'><img src='assets/images/Templates/Temp000/Help/p_10" + d + ".png' alt=''/></div><div class='col-sm-9 data-side'><div class='tab-title'>أداة قائمة الموضوعات:</div><div class='tab-body'>تمكّن هذه الأداة المتدرب من استعراض قائمة الموضوعات والتي تحتوي على موضوعات الدرس الحالي والدروس المتوفرة في الوحدة الحالية مفهرسة من الرئيسي للفرعي لتسهيل التصفح بين عناصر الوحدة.</div></div></div><audio controls><source src='assets/audio/2/2.10.mp3' type='audio/mpeg' /></audio></div><div class='tab-pane' id='tabsNavigation11'><div class='row help-box'><div class='col-sm-3 image-side'><img src='assets/images/Templates/Temp000/Help/p_11" + d + ".png' alt=''/></div><div class='col-sm-9 data-side'><div class='tab-title'>أداة ملئ الشاشة:</div><div class='tab-body'>تعمل هذه الأداة على الإنتقال إلى وضع الشاشة الكاملة.</div></div></div><audio controls><source src='assets/audio/2/2.11.mp3' type='audio/mpeg' /></audio></div><div class='tab-pane' id='tabsNavigation12'><div class='row help-box'><div class='col-sm-3 image-side'><img src='assets/images/Templates/Temp000/Help/p_12" + d + ".png' alt=''/></div><div class='col-sm-9 data-side'><div class='tab-title'>أداة وحدة التنقل بين الصفحات:</div><div class='tab-body'>من خلالها يمكن للمتدرب التنقل بين صفحات الدرس الحالي ومعرفة موقع الصفحة النشطة من إجمالي الصفحات.</div></div></div><audio controls><source src='assets/audio/2/2.12.mp3' type='audio/mpeg' /></audio></div><div class='tab-pane' id='tabsNavigation13'><div class='row help-box'><div class='col-sm-3 image-side'><img src='assets/images/Templates/Temp000/Help/p_16" + d + ".png' alt=''/></div><div class='col-sm-9 data-side'><div class='tab-title'>أداة الشاشة الأولى:</div><div class='tab-body'>الإنتقال إلى الشاشة الأولى من شاشات الحقيبة.</div></div></div><audio controls><source src='assets/audio/2/2.13.mp3' type='audio/mpeg' /></audio></div><div class='tab-pane' id='tabsNavigation14'><div class='row help-box'><div class='col-sm-3 image-side'><img src='assets/images/Templates/Temp000/Help/p_17" + d + ".png' alt=''/></div><div class='col-sm-9 data-side'><div class='tab-title'>أداة السابق:</div><div class='tab-body'>الرجوع إلى الخلف من شاشة لأخرى تسبقها.</div></div></div><audio controls><source src='assets/audio/2/2.14.mp3' type='audio/mpeg' /></audio></div><div class='tab-pane' id='tabsNavigation15'><div class='row help-box'><div class='col-sm-3 image-side'><img src='assets/images/Templates/Temp000/Help/p_15" + d + ".png' alt=''/></div><div class='col-sm-9 data-side'><div class='tab-title'>أداة الإنتقال لشاشة محددة:</div><div class='tab-body'>إدخال رقم الشاشة المراد الإنتقال لها.</div></div></div><audio controls><source src='assets/audio/2/2.15.mp3' type='audio/mpeg' /></audio></div><div class='tab-pane' id='tabsNavigation16'><div class='row help-box'><div class='col-sm-3 image-side'><img src='assets/images/Templates/Temp000/Help/p_13" + d + ".png' alt=''/></div><div class='col-sm-9 data-side'><div class='tab-title'>أداة الشاشة الأخيرة:</div><div class='tab-body'>الإنتقال إلى الشاشة الأخيرة من شاشات الحقيبة.</div></div></div><audio controls><source src='assets/audio/2/2.16.mp3' type='audio/mpeg' /></audio></div><div class='tab-pane' id='tabsNavigation17'><div class='row help-box'><div class='col-sm-3 image-side'><img src='assets/images/Templates/Temp000/Help/p_14" + d + ".png' alt=''/></div><div class='col-sm-9 data-side'><div class='tab-title'>أداة التالي:</div><div class='tab-body'>التقدم إلى الأمام من شاشة لأخرى تليها.</div></div></div><audio controls><source src='assets/audio/2/2.17.mp3' type='audio/mpeg' /></audio></div><div class='tab-pane' id='tabsNavigation18'><div class='row help-box'><div class='col-sm-3 image-side'><img src='assets/images/Templates/Temp000/Help/p_18" + d + ".png' alt=''/></div><div class='col-sm-9 data-side'><div class='tab-title'>أداة التشغيل:</div><div class='tab-body'>تستخدم من أجل تشغيل جزئية ومشاهدتها أو متابعة مشاهدتها في حالة الإيقاف المؤقت لها.</div></div></div><audio controls><source src='assets/audio/2/2.18.mp3' type='audio/mpeg' /></audio></div><div class='tab-pane' id='tabsNavigation19'><div class='row help-box'><div class='col-sm-3 image-side'><img src='assets/images/Templates/Temp000/Help/p_19" + d + ".png' alt=''/></div><div class='col-sm-9 data-side'><div class='tab-title'>أداة الإيقاف المؤقت:</div><div class='tab-body'>تستخدم لإيقاف جزئية أثناء تشغيلها ومشاهدتها.</div></div></div><audio controls><source src='assets/audio/2/2.19.mp3' type='audio/mpeg' /></audio></div><div class='tab-pane' id='tabsNavigation20'><div class='row help-box'><div class='col-sm-3 image-side'><img src='assets/images/Templates/Temp000/Help/p_20" + d + ".png' alt=''/></div><div class='col-sm-9 data-side'><div class='tab-title'>أداة التحكم بالصوت:</div><div class='tab-body'>من خلال هذه الأداة يتمكن المتدرب من التحكم بالصوت من حيث رفع أو خفض مستوى الصوت.</div></div></div><audio controls><source src='assets/audio/2/2.20.mp3' type='audio/mpeg' /></audio></div><div class='tab-pane' id='tabsNavigation21'><div class='row help-box'><div class='col-sm-3 image-side'><img src='assets/images/Templates/Temp000/Help/p_21" + d + ".png' alt=''/></div><div class='col-sm-9 data-side'><div class='tab-title'>أداة ملئ الشاشة للفيديو:</div><div class='tab-body'>من خلال هذه الأداة يتمكن المتدرب من الإنتقال إلى وضع ملئ الشاشة لعرض الفيديو أو الخروج من ملئ الشاشة.</div></div></div><audio controls><source src='assets/audio/2/2.21.mp3' type='audio/mpeg' /></audio></div></div></div><div class='table-cell MainScr_med_left'></div></div><div class='table-row'><div class='table-cell MainScr_bot_right'></div><div class='table-cell MainScr_bot_med'></div><div class='table-cell MainScr_bot_left'></div></div><div class='FloatIcon' data-appear-animation='bounceIn' data-appear-animation-delay='1500'><img src='assets/images/Templates/Temp003/bot-icon.png' width='37' height='33' alt=''/></div></div><audio id='dolfhelp2ndbtn' controls><source src='assets/audio/2/2.22.mp3' type='audio/mpeg' /></audio></div></div><div class='cleaner'></div><div class='PagerWrapper' data-appear-animation='bounceIn' data-appear-animation-delay='500'><div class='pager' data-appear-animation='bounceIn' data-appear-animation-delay='500'><div class='table'><div class='table-row'><div class='table-cell'><a href='#' class='r-arrow HomeToolTip01' title='السابق'></a></div><div class='table-cell'><div class='state'><span>2</span><span class='sep'>/</span><span>3</span></div></div><div class='table-cell'><a href='#' class='l-arrow HomeToolTip01' title='التالي'></a></div></div></div></div></div><div class='cleaner'></div></div>" +
        "<div id='Temp022' class='MainBg' data-appear-animation='fadeIn' data-appear-animation-delay='100' ><div class='Wrapper'><div class='Title2' data-appear-animation='fadeInDown' data-appear-animation-delay='100'><div class='table TitleBox2' ><div class='table-row'><div class='table-cell td01'></div><div class='table-cell td06'><div class='table TitleBox2-main' ><div class='table-row'><div class='table-cell right-s'></div><div class='table-cell'><div class='table TitleBox3-main'><div class='table-row'><div class='table-cell td-tr'></div><div class='table-cell td-tm'><span>مبــدأ عمل التدريب</span></div><div class='table-cell td-tl'></div></div><div class='table-row'><div class='table-cell td-br'></div><div class='table-cell td-bm'></div><div class='table-cell td-bl'></div></div></div></div><div class='table-cell left-s'></div></div></div></div><div class='table-cell td07'></div></div></div></div><div class='slider slider-nav'><div><img src='assets/images/Templates/Temp000/Help/s_01.jpg' alt=''/></div><div><img src='assets/images/Templates/Temp000/Help/s_02.jpg' alt=''/></div><div><img src='assets/images/Templates/Temp000/Help/s_03.jpg' alt=''/></div><div><img src='assets/images/Templates/Temp000/Help/s_04" + d + ".jpg' alt=''/></div><div><img src='assets/images/Templates/Temp000/Help/s_05" + d + ".jpg' alt=''/></div><div><img src='assets/images/Templates/Temp000/Help/s_06.jpg' alt=''/></div><div><img src='assets/images/Templates/Temp000/Help/s_07.jpg' alt=''/></div><div><img src='assets/images/Templates/Temp000/Help/s_08.jpg' alt=''/></div><div><img src='assets/images/Templates/Temp000/Help/s_09.jpg' alt=''/></div></div><div class='slider slider-for'><div><div class='Data content-rd'><div class='slide-title'>الشاشة الرئيسية</div><div>تتكون الشاشة الرئيسية للحقيبة الإلكترونية من شعار المؤسسة العامة للتدريب التقني والمهني، وعنوان الحقيبة الإلكترونية، بالإضافة إلى المكونات التفاعلية التالية:</div><ol><li><strong>محتويات الحقيبة:</strong> تعرض هذه الجزئية وحدات الحقيبة الإلكترونية وعناوينها مع إمكانية الإنتقال لعرض محتوى كل وحدة مباشرة.</li><li><strong>إرشادات الاستخدام:</strong> تعرض هذه الجزئية شاشة المساعدة والتي تقدم شرحاً مبسطاً لأهم عناصر المستعرض وكيفية التعامل معه.</li><li><strong>مدخل الحقيبة:</strong> تعرض هذه الجزئية فيديو تعريفي بالحقيبة الإلكترونية.</li><li><strong>زر ابدأ:</strong> يتيح هذا الزر عند نقر المتدرب عليه إمكانية استعراض محتوى الحقيبة الإلكترونية. </li></ol><div class='cleaner'></div></div><audio controls><source src='assets/audio/3/3.1.mp3' type='audio/mpeg' /></audio></div><div><div class='Data content-rd'><div class='slide-title'>شاشة مدخل الوحدة</div><div>تتكون من مجموعة من العناصر مثل الشعار، وعنوان الحقيبة الإلكترونية، وعنوان الوحدة، والأدوات المساعدة وغيرها والتي من خلال تأثيرات حركية تتم عليها يتشكل لديك مفهوماً أو تصوراً لمحتوى الحقيبة الإلكترونية.</div><div class='cleaner'></div></div><audio controls><source src='assets/audio/3/3.2.mp3' type='audio/mpeg' /></audio></div><div><div class='Data content-rd'><div class='slide-title'>شاشة أهداف الوحدة</div><div>تعرض هذه الشاشة الأهداف العامة للحقيبة الإلكترونية التي سيحققها المتدرب ويكتسبها من التدريب الذاتي.</div><div class='cleaner'></div></div><audio controls><source src='assets/audio/3/3.3.mp3' type='audio/mpeg' /></audio></div><div><div class='Data content-rd'><div class='slide-title'>شاشة أهداف الدرس</div><div>تعرض هذه الشاشة الأهداف الخاصة بالدرس المتمثلة بالمعرفة والتهيئة والمهارات التي سيحققها المتدرب ويكتسبها من التدريب الذاتي.</div><div class='cleaner'></div></div><audio controls><source src='assets/audio/3/3.4.mp3' type='audio/mpeg' /></audio></div><div><div class='Data content-rd'><div class='slide-title'>شاشة التعلم</div><div>تكون شاشات التعلم ذات بيئة تفاعلية ملفتة للنظر، بأسلوب واضح وبسيط وتخاطب المتدرب، وتعرض المعلومة مباشرة للمتدرب أو من خلال استخدام التعليم المتدرج. فيها يكون المتدرب أكثر تفاعلية مع الشاشة من خلال الكثير من العناصر القابلة للنقر عليها لتزوده بمعلومة معينة داخل بيئة شاشة التعلم ومنها على سبيل المثال لا الحصر:</div><ul><li>رسوم متحركة.</li><li>نصوص قابلة للنقر.</li><li>صور قابلة للنقر.</li><li>رموز مع نوافذ منبثقة. </li></ul><div class='cleaner'></div></div><audio controls><source src='assets/audio/3/3.5.mp3' type='audio/mpeg' /></audio></div><div><div class='Data content-rd'><div class='slide-title'>شاشة الفيديو </div><div>مجموعة من المشاهد والأحداث المتتابعة والمتمثلة بمقاطع فيديو أو مشاهد فوتوغرافية تتزامن مع تعليق صوتي مرتبطة بعرض محتوى الحقيبة الإلكترونية.</div><div class='cleaner'></div></div><audio controls><source src='assets/audio/3/3.6.mp3' type='audio/mpeg' /></audio></div><div><div class='Data content-rd'><div class='slide-title'>شاشة السيناريو </div><div>عبارة عن شاشة تحتوي على سيناريو يوضح الأهداف العامة والخاصة من الدرس، وهذه السيناريوهات مرتبطة بمحتوى الحقيبة الإلكترونية.</div><div class='cleaner'></div></div><audio controls><source src='assets/audio/3/3.7.mp3' type='audio/mpeg' /></audio></div><div><div class='Data content-rd'><div class='slide-title'>شاشة التدريب</div><div>شاشة تفاعلية تحتوي سؤال مع خيارات الإجابة وزر إدخال لتسلم المتدرب تغذية راجعة على إجابته لكل سؤال، ومن أنماط شاشات التدريب التفاعلية المستخدمة على سبيل المثال لا الحصر:</div><ul><li>صح أم خطأ.</li><li>اختيار من متعدد لإجابة صحيحة فقط.</li><li>اختيار من متعدد لأكثر من إجابة صحيحة.</li><li>السحب والإفلات. </li></ul><div class='cleaner'></div></div><audio controls><source src='assets/audio/3/3.8.mp3' type='audio/mpeg' /></audio></div><div><div class='Data content-rd'><div class='slide-title'>شاشة ملخص الوحدة</div><div>تلخّص هذه الشاشة أهم النقاط الرئيسة التي تعرّفت عليها في الوحدة الدراسية.</div><div class='cleaner'></div></div><audio controls><source src='assets/audio/3/3.9.mp3' type='audio/mpeg' /></audio></div></div><div class='cleaner'></div><div class='PagerWrapper hidden'><div class='table Lv01' ><div class='table-row'><div class='table-cell td01'></div><div class='table-cell td02'><a class='current' href='#' onClick='$('.slider-for').slick('slickGoTo', 0)'></a><a href='#' onClick='$('.slider-for').slick('slickGoTo', 1)'></a><a href='#' onClick='$('.slider-for').slick('slickGoTo', 2)'></a><a href='#' onClick='$('.slider-for').slick('slickGoTo', 3)'></a><a href='#' onClick='$('.slider-for').slick('slickGoTo', 4)'></a><a href='#' onClick='$('.slider-for').slick('slickGoTo', 5)'></a></div><div class='table-cell td03'></div></div></div></div></div><div class='cleaner'></div><div class='PagerWrapper' data-appear-animation='bounceIn' data-appear-animation-delay='500'><div class='pager' data-appear-animation='bounceIn' data-appear-animation-delay='500'><div class='table'><div class='table-row'><div class='table-cell'><a href='#' class='r-arrow HomeToolTip01' title='السابق'></a></div><div class='table-cell'><div class='state'><span>3</span><span class='sep'>/</span><span>3</span></div></div><div class='table-cell'><a href='#' class='l-arrow HomeToolTip01 off' title='لا توجد صفحة تالية'></a></div></div></div></div></div><div class='cleaner'></div></div></div>" +
        "</div><div id='E-suite-intro' class='PopupPhotoDiv' style='display:none'><div class='IntroductionPopup'><div class='intro-header'><div class='intro-title'>مدخل الحقيبة</div></div><div class='intro-vid'>" +
        "<video  width='100%' height='auto' poster='assets/images/Templates/Temp000/Videos/E-suite-intro/E-suite-intro" + d + ".png' controls='' preload='none'>" +
        "<source type='video/mp4' src='assets/Course/Intro.mp4'>" +
        "<source type='video/webm' src='assets/Course/Intro.webm'></video><div class='invisible' style='height:10px'></div></div></div></div></div></div>";
}
function GetUnits()
{
    //<a href='#' class='unit'><span class='unit-num'>الوحدة الثانية - </span><span class='unit-name'>عنوان الوحدة يأتي هنا</span></a><a href='#' class='unit'><span class='unit-num'>الوحدة الثالثة - </span><span class='unit-name'>عنوان الوحدة يأتي هنا</span></a>
    var r = "";
    for (var i = 1; i < 9; i++) {
        var founded = false;
        eval("founded= typeof(Course.M00" + i + ") !='undefined'");
        if (founded) {
            r += "<a href='#' dp='" + GetFirstPageInUnit("M00" + i) + "' class='unit'><span class='unit-num'>" + GetUnitName(i) + " - </span><span class='unit-name'>" + eval("Course.M00" + i + ".N;") + "</span></a>";
        }
        else break;
    }
    return r;
}
function GetFirstPageInUnit(unit)
{
    r = -2;
    for (var i = 0; i < Content.length; i++) {
        try {
            if (Content[i].m == unit && Content[i].l == "L000") {
                r = i;
                break;
            }
        } catch (e) {

        }
    }
    return r + 1;
}
function GetUnitName(i)
{
    switch (i) {
        case 1:
            return "الوحدة الأولى";
        case 2:
            return "الوحدة الثانية";
        case 3:
            return "الوحدة الثالثة";
        case 4:
            return "الوحدة الرابعة";
        case 5:
            return "الوحدة الخامسة";
        case 6:
            return "الوحدة السادسة";
        case 7:
            return "الوحدة السابعة";
        case 8:
            return "الوحدة الثامنة";
        case 9:
            return "الوحدة التاسعة";
    }
    return "";
}
function HideCntrls()
{
    $('#R02 >div').css('visibility', 'hidden');
    $('#R04  >div').css('visibility', 'hidden');
    $('#txt_mod').css('display', 'none');
    $('#sls_mod').css('display', 'none');
    $('#MainArea').parent().removeClass('col-lg-9').removeClass('col-lg-push-3').addClass('col-lg-12');

}
function ShowCntrls()
{
    $('#R02  >div').css('visibility', 'visible');
    $('#R04  >div').css('visibility', 'visible');
    if (AccessBtn.hasClass('active'))
        $('#sls_mod').css('display', 'block');
    if (CaptionBtn.hasClass('active'))
        $('#txt_mod').css('display', 'block');
    $('#MainArea').parent().addClass('col-lg-9').addClass('col-lg-push-3').removeClass('col-lg-12');
    if (!CaptionBtn.hasClass('active') && !AccessBtn.hasClass('active')) {
        $('#MainArea').parent().removeClass('col-lg-9').removeClass('col-lg-push-3').addClass('col-lg-12');
    }
}
function AddPoints()
{
    Points = Content[CurrentPage - 1].Points;
    for (var i = 0; i < Points.length; i++) {
        $('.image_wrapper').append("<a class='hotspot-point blink_me Point" + (i + 1) + "' style='left:" + Points[i].Left + "%;top:" + Points[i].Top + "%;'></a>");
    }

}
function InitPoints()
{
    Points = Content[CurrentPage - 1].Points;
    console.log(Points);
    for (var i = 0; i < Points.length; i++) {
        var a = ".Point" + (i + 1);
        data = "{animation: 'grow',delay: 10,theme: 'tooltipster-punk',touchDevices: true,trigger: 'click',maxWidth: 320," +
            "content: $(\"<span class='inner-tt'><span class='inner-title'>" + Points[i].Title + "</span><a class='close'></a>" + (Points[i].Image ? "<img class='inner-pic' src='" + Points[i].Image + "' />" : "") + " <span class='inner-txt'>" + Points[i].Text + "</span> </span>\")}";
        c = "$('" + a + "').tooltipster(" + data + ")";
        eval(c);
    }
}
function GetCurrentLesson()
{
    var N = "";
    try {
        unit = Content[CurrentPage - 1].m;
        lesson = Content[CurrentPage - 1].l;
        N = eval("Course." + unit + "." + lesson);
    } catch (e) {

    }
    return N;
}
function CurrentUnitNumberToArabicText()
{
    try {

        unit = Content[CurrentPage - 1].m;
        return GetUnitName(parseInt(unit.substr(2, 3)));
    } catch (e) {

    }
    return "";
}
function ChangeInsideTitle(s)
{
    //#Temp002 > div > div.Title2.appear-animation.fadeInDown.appear-animation-visible > div > div > div.table-cell.td06 > div > div > div:nth-child(2) > div > div:nth-child(1) > div.table-cell.td-tm > span
    var v = $('#Temp002 > div > div.Title2 > div > div > div.table-cell.td06 > div > div > div:nth-child(2) > div > div:nth-child(1) > div.table-cell.td-tm > span')
    v.html(s);
    l("CHANGED INSIDE TITLE:" + s);
}
function ChangeRightTitle(s)
{
    var v = $('#R02 > div > div > div > div > div > span')
    v.html(s);

}
function CheckUnit()
{
    var v = $('#R02 > div > div > div > div > div > span');
    var u = CurrentUnitNumberToArabicText();
    if (v.html().indexOf("داف الوحدة") != -1 || v.html().indexOf("داف الوحده") != -1) {
        ChangeRightTitle(u);
        ChangeInsideTitle("أهداف " + u);
    }
    else if (v.html().indexOf("مدخل الوحدة") != -1 || v.html().indexOf("مدخل الوحده") != -1) {
        ChangeRightTitle(u);
    }
    else if (v.html().indexOf("ملخص الوحدة") != -1 || v.html().indexOf("ملخص الوحده") != -1) {
        ChangeRightTitle(u);
        $('#Temp044 > div > div.Title > div.table.TitleBox > div:nth-child(2) > div.table-cell.Title_med_center > span').html("ملخص " + u);
    }
}
function CheckLesson()
{
    var p = Content[(CurrentPage - 1)];
    var v = $('#R02 > div > div > div > div > div > span');
    var unit = p.m;
    var lesson = p.l;
    if (v.html().indexOf("هداف الدر") != -1) {
        var u = Content[CurrentPage - 1].m;
        var l = Content[CurrentPage - 1].l;
        var s = "Course['" + u + "'].";
        if (lesson == "L000") {
            s += "L001.N";
            //Content[CurrentPage - 1].l
        }
        else
            s += l + ".N";

        ChangeRightTitle(eval(s));
    }
}

var CurrentSignVideo = -1;
/////////////video///////////////
function LinkVideoWithCurrentSound()
{

    CurrentSignVideo = -1;

    //all normal pages has only one sound and one video
    //check if page has only one video

    var vdz = Content[CurrentPage - 1].vdz;
    if (vdz&&vdz.length == 1) {
        VdSndLink(0);

    }
    else if (vdz&&vdz.length > 1) {
        //if there is a video and "has more sign videos"
        if ($('#MainArea').find('video').length != -1) {
            //link the first video with the video
            VdSndLink(0);
            var SignVd = AccessVideo.find('video');
            CurrentSignVideo = 0;
            SignVd.get(0).onended = function ()
            {
                CurrentSignVideo++;
                if (vdz.length < CurrentSignVideo)
                    SignVd.html("<source type=\"video/mp4\" src=\"" + result[CurrentSignVideo].src + ".mp4\"><source type=\"video/webm\" src=\"" + result[CurrentSignVideo].src + ".webm\">");
                SignVd.load();
                if ($('#MainArea').find('video').get(0).duration > 0 && !$('#MainArea').find('video').get(0).paused)
                    SignVd.get(0).play();
            };
            $('#MainArea').find('video').get(0).onseeking = function ()
            {
                var result = GetCorrectVideoAndDuration($(this).get(0).currentTime * 1);
                if (SignVd.html().indexOf(result[0]) == -1)//current video is not the correct video
                {
                    SignVd.html("<source type=\"video/mp4\" src=\"" + result[0].src + ".mp4\"><source type=\"video/webm\" src=\"" + result[0].src + ".webm\">");
                    SignVd.load();
                }
                SignVd.get(0).currentTime = result[1];
            };
            //on sign video ends get the next
        }
            //if it's a question 
        else if ($("#Temp032").length != -1 || $("#Temp033").length || $("#Temp034").length) {
            //assign and link video
            VdSndLink(0);
            //inlinking and add new video from other side q.js file when feed back is played
        }
    }
    else //no videos
    {
        AccessBtn.active = true;
        AccessVideo.find('video').html("");
        ToggleAccess();
    }
}
function VdSndLink(index)
{
    var vdz = Content[CurrentPage - 1].vdz;
    var SignVd = AccessVideo.find('video');
    AccessBtn.active = false;
    ToggleAccess();
    l(vdz);
    SignVd.html("<source type=\"video/mp4\" src=\"" + vdz[index].src + ".mp4\"><source type=\"video/webm\" src=\"" + vdz[index].src + ".webm\">");
    SignVd.load();
    //attach event to current audio
    var linkedMedia = null;
    if ($('#MainArea').find('audio').length != -1)
        linkedMedia = $('#MainArea').find('audio').get(0);
    else if ($('#MainArea').find('video').length != -1)
        linkedMedia = $('#MainArea').find('video').get(0);
    if (linkedMedia != null) {
        linkedMedia.onplay = function () { SignVd.get(0).play(); };
        linkedMedia.onpause = function () { SignVd.get(0).pause(); };
        linkedMedia.onseeking = function ()
        {
            var t = $(this).get(0).currentTime * 1;
            if (t < SignVd.get(0).duration) {
                SignVd.get(0).currentTime = t;
            }
        };
    }
}
function VdUnlink()
{
    $('#MainArea').find('audio').get(0).onplay =
    $('#MainArea').find('audio').get(0).onpause =
    $('#MainArea').find('audio').get(0).onseeking = null;
}
function GetCorrectVideoAndDuration(currentTime)
{
    var vdz = Content[CurrentPage - 1].vdz;
    var j = vdz.length - 1;
    for (var i = 0; i < vdz.length; i++) {
        if (currentTime < vdz[i].lng) {
            j = i;
            break;
        }
        currentTime -= vdz[i].lng;
    }
    return [vds[i], currentTime];
}