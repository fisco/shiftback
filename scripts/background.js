/*global $*/
/*global console*/
/*global document*/
/*global window*/

(function () {
    'use strict';

    var shiftBackRequested = false,
        shiftKeyUps = 0,
        topPosition = null;
    
    $('body').append('<div id="active-shiftback-fisco" title="Click to cancel ShiftBack"></div>');

    function setTopPosition(event) {
        if (shiftBackRequested && (topPosition === null)) {
            // topPosition = document.body.scrollTop;
            topPosition = event.currentTarget.document.body.scrollTop;
            $(window).off('scroll', setTopPosition);
            $('#active-shiftback-fisco').show();
            // window.onscroll = {};
        }
    }
    
    function cancelShiftBackRequest() {
        shiftBackRequested = false;
        shiftKeyUps = 0;
        topPosition = null;
        $('#active-shiftback-fisco').hide();
    }
    
    $('#active-shiftback-fisco').on('click', function () {
        cancelShiftBackRequest();
    });

    $(window).on('keyup', function (event) {
        if (event.keyCode === 16) {
            if (event.ctrlKey) {
                cancelShiftBackRequest();
            } else {
                if ((topPosition !== null) && shiftBackRequested) {
                    // $(window).scrollTop(topPosition);
                    $("html, body").animate({ 'scrollTop': topPosition }, 800);
                    $('#active-shiftback-fisco').hide();
                    shiftKeyUps = 0;
                } else {
                    shiftKeyUps = shiftKeyUps + 1;
                }
            }
            shiftBackRequested = false;
            topPosition = null;
            $(window).on('scroll', setTopPosition);
        } else {
            shiftKeyUps = 0;
        }
        if (shiftKeyUps === 3) {
            shiftBackRequested = true;
            $('#active-shiftback-fisco').show();
            shiftKeyUps = 0;
        }
    });

    $(window).on('keydown', function (event) {
        if (event.keyCode === 16) {
            shiftBackRequested = true;
        }
    });

    $(window).on('scroll', setTopPosition);
}());