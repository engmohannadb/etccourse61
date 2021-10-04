/*! Pushy - v1.0.0 - 2016-3-1
* Pushy is a responsive off-canvas navigation menu using CSS transforms & transitions.
* https://github.com/christophery/pushy/
* by Christopher Yee */
var pushy, body, push, pushyLeft, pushyOpenLeft,
    pushyOpenRight, siteOverlay, menuBtn, menuSpeed,
    menuWidth, submenuClass, submenuOpenClass,
    submenuClosedClass, submenu, Sub2Class, Sub2OpenedClass, Sub2ClosedClass;
var opened = false;
function init()
{
    // pushy = $('#Search'); //menu css class
    body = $('body');
    //container = $('#container'); //container css class
    //push = $('#Search'); //css class to add pushy capability
    pushyLeft = 'pushy-left'; //css class for left menu position
    pushyOpenLeft = 'pushy-open-left'; //css class when menu is open (left position)
    pushyOpenRight = 'pushy-open-right'; //css class when menu is open (right position)
    siteOverlay = $('.site-overlay'); //site overlay
    menuBtn = $('.menu-btn2 .pushy-link'); //css classes to toggle the menu
    menuSpeed = 200; //jQuery fallback menu speed
    menuWidth = pushy.width() + 'px'; //jQuery fallback menu width
    submenuClass = '.pushy-submenu';
    submenuOpenClass = 'pushy-submenu-open';
    submenuClosedClass = 'pushy-submenu-closed';
    Sub2Class = '.pushy-submenu2';
    Sub2OpenedClass = 'pushy-submenu2-open';
    Sub2ClosedClass = 'pushy-submenu2-closed';
    submenu = $(submenuClass);
    After();
}

function togglePushy()
{
    //add class to body based on menu position
    if (pushy.hasClass(pushyLeft))
    {
        body.toggleClass(pushyOpenLeft);
    }
    else {
        body.toggleClass(pushyOpenRight);
        if (!body.hasClass(pushyOpenRight))
        {
            setTimeout(function () { pushy.css("visibility", "hidden"); }, 200);
        }
    }
}

function openPushyFallback()
{

    //animate menu position based on CSS class
    if (pushy.hasClass(pushyLeft)) {
        body.addClass(pushyOpenLeft);
        pushy.animate({ left: "0px" }, menuSpeed);
        container.animate({ left: menuWidth }, menuSpeed);
        //css class to add pushy capability
        push.animate({ left: menuWidth }, menuSpeed);
    } else {
        body.addClass(pushyOpenRight);
        pushy.animate({ right: '0px' }, menuSpeed);
        container.animate({ right: menuWidth }, menuSpeed);
        push.animate({ right: menuWidth }, menuSpeed);
    }

}

function closePushyFallback()
{

    //animate menu position based on CSS class
    if (pushy.hasClass(pushyLeft)) {
        body.removeClass(pushyOpenLeft);
        pushy.animate({ left: "-" + menuWidth }, menuSpeed);
        container.animate({ left: "0px" }, menuSpeed);
        //css class to add pushy capability
        push.animate({ left: "0px" }, menuSpeed);
    } else {
        body.removeClass(pushyOpenRight);
        pushy.animate({ right: "-" + menuWidth }, menuSpeed);
        container.animate({ right: "0px" }, menuSpeed);
        push.animate({ right: "0px" }, menuSpeed);
    }

}

function toggleSubmenu()
{
    //hide submenu by default
    $(Sub2Class).addClass(Sub2ClosedClass);
    $(submenuClass).addClass(submenuClosedClass);
    $(submenuClass).unbind('click');
    $(submenuClass).on('click', function ()
    {
        var selected = $(this);

        if (selected.hasClass(submenuClosedClass)) {
            //hide opened submenus
            $(submenuClass).addClass(submenuClosedClass).removeClass(submenuOpenClass);
            //show submenu
            selected.removeClass(submenuClosedClass).addClass(submenuOpenClass);
        }
        else {
            //hide submenu
            selected.addClass(submenuClosedClass).removeClass(submenuOpenClass);
        }
    });

    $(Sub2Class).unbind('click');
    $(Sub2Class).on('click', function (event)
    {

        event.stopPropagation();
        var selected = $(this);

        if (selected.hasClass(Sub2ClosedClass))
        {
            //hide opened submenus
            $(Sub2Class).addClass(Sub2ClosedClass).removeClass(Sub2OpenedClass);

            //show submenu
            selected.removeClass(Sub2ClosedClass).addClass(Sub2OpenedClass);
        }
        else {
            //hide submenu
            selected.addClass(Sub2ClosedClass).removeClass(Sub2OpenedClass);
        }
    });
}

function toggleSubmenuFallback()
{
    //hide submenu by default
    $(submenuClass).addClass(submenuClosedClass);
    submenu.children('a').unbind('click');
    submenu.children('a').on('click', function (event)
    {
        event.preventDefault();
        $(this).toggleClass(submenuOpenClass)
               .next('.pushy-submenu ul').slideToggle(200)
               .end().parent(submenuClass)
               .siblings(submenuClass).children('a')
               .removeClass(submenuOpenClass)
               .next('.pushy-submenu ul').slideUp(200);
    });
}

//checks if 3d transforms are supported removing the modernizr dependency
var cssTransforms3d = (function csstransforms3d()
{
    var el = document.createElement('p'),
    supported = false,
    transforms = {
        'webkitTransform': '-webkit-transform',
        'OTransform': '-o-transform',
        'msTransform': '-ms-transform',
        'MozTransform': '-moz-transform',
        'transform': 'transform'
    };

    // Add it to the body to get the computed style
    document.body.insertBefore(el, null);

    for (var t in transforms) {
        if (el.style[t] !== undefined) {
            el.style[t] = 'translate3d(1px,1px,1px)';
            supported = window.getComputedStyle(el).getPropertyValue(transforms[t]);
        }
    }

    document.body.removeChild(el);

    return (supported !== undefined && supported.length > 0 && supported !== "none");
});

function After()
{
    if (cssTransforms3d()) {
        //make menu visible
        pushy.css({ 'visibility': 'visible' });

        //toggle submenu
        toggleSubmenu();

        //toggle menu
        menuBtn.unbind('click');
        menuBtn.on('click', function ()
        {
            togglePushy();
        });
        //close menu when clicking site overlay
        siteOverlay.unbind('click');
        siteOverlay.on('click', function ()
        {
            togglePushy();
        });
    }
    else {
        //add css class to body
        body.addClass('no-csstransforms3d');

        //hide menu by default
        if (pushy.hasClass(pushyLeft)) {
            pushy.css({ left: "-" + menuWidth });
        } else {
            pushy.css({ right: "-" + menuWidth });
        }

        //make menu visible
        pushy.css({ 'visibility': 'visible' });
        //fixes IE scrollbar issue
        container.css({ "overflow-x": "hidden" });

        //keep track of menu state (open/close)


        //toggle submenu
        toggleSubmenuFallback();

        menuBtn.unbind('click');
        //toggle menu
        menuBtn.on('click', function ()
        {
            if (opened) {
                closePushyFallback();
                opened = false;
            } else {
                openPushyFallback();
                opened = true;
            }
        });

        siteOverlay.unbind('click');
        //close menu when clicking site overlay
        siteOverlay.on('click', function ()
        {
            if (opened) {
                closePushyFallback();
                opened = false;
            } else {
                openPushyFallback();
                opened = true;
            }
        });
    }
}
$(function ()
{
   //  init();
    // After();

});
