function doTimer() {
    if (!timer_is_on) {
        timer_is_on = 1;
        timedCount();
    }
}

function setCookies(C_name, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays == null) ? "" : ";expires=" + exdate.toUTCString());
    document.cookie = C_name + "=" + c_value;
}

function getCookie(C_name) {
    var i, x, y, ARRCookies = document.cookie.split(";");
    for (i = 0; i < ARRCookies.length; i++) {
        x = ARRCookies[i].substr(0, ARRCookies[i].indexOf("="));
        y = ARRCookies[i].substr(ARRCookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x == C_name) {
            return unescape(y);
        }
    }
}

function timedCount() {
    var lbltime = document.getElementById('lblTime');
    if (lbltime != null) {
        var duration = parseFloat(getCookie("duration"));
        if (isNaN(duration)) {
            duration = 0;
        }
        setCookies("duration", duration + 1);
        cCurrDate = new Date();
        lbltime.innerHTML = cCurrDate.toDateString() + '' + cCurrDate.toTimeString().substring(0, 8);
        var UserId = parseFloat(getCookie("UserId"));
        timercontrol = setTimeout("timedCount()", 1000);
        if (UserId > 0) {
            if (duration >= 3600) {
                ////Call function here
                setCookies("duration", 0);
            }
        }
    }
}

