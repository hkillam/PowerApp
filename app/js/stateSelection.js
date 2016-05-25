$(document).ready(function () {

    var stateCookie = $.cookie("GeographicLocation");

    console.log('load page cookie ' + stateCookie);

    $.removeCookie("GeographicLocation", {path: '/'});
    $.cookie("GeographicLocation", stateCookie, {expires: 365, path: '/', domain: '.xcelenergy.com'});

    if (stateCookie != null) {
        $("#stateList").val(stateCookie);

        //var stateValue = "Colorado";
        var stateValue = stateCookie.replace("/Geographic Location/", "");
        console.log('state is ' + stateValue);
        $("#statename").text(stateValue);
        $("#statename1").text(stateValue);
    }

    $(".state-grid__state").click(function () {
        $('#state-select-modal').hide();
        var stateVal = "/Geographic Location/" + $(this).attr("state");

        setStateLocation(stateVal);
    });

    $(function () {
        var loginvalue = $.cookie('MyAccountLogin');
        console.log("myaccount " + loginvalue);
        if ($.cookie('MyAccountLogin') == 'true') {
            $('#signoutdiv').removeClass('hidden');
            $('#submenu').removeClass('hidden');

            $('#pageheader').addClass('is-logged-in');
        }
    });

    $('#loginbutton').click(function () {
        $('#loginform').submit()
    });

    //for news index page
    $('#news_filter').click(function () {
        $('.filter-header form').submit()
    });

    $('input[name = j_password]').keypress(function (e) {
        var key = e.which;
        if (key == 13)  // the enter key code
        {
            $('#loginbutton').click();
            return false;
        }
    });

    var alertCookie = $.cookie("hideAlerts");
    if (alertCookie == 'true')
        $('#outage-alert').removeClass('is-open');
    else
        $('#outage-alert').addClass('is-open');

    $('#outage-alert .alert__toggle').click(function () {
        if ($('#outage-alert').hasClass('is-open'))
            $.cookie("hideAlerts", "false", {expires: 1, path: "/", domain: '.xcelenergy.com'});
        else
            $.cookie("hideAlerts", "true", {expires: 1, path: "/", domain: '.xcelenergy.com'});
    });
});

function setStateLocation(chosenState) {
    console.log('setStateLocation set cookie ' + chosenState);
    $.cookie("GeographicLocation", chosenState, {expires: 365, path: '/', domain: '.xcelenergy.com'});

    console.log('page url ' + window.location.href);
    if (window.location.href.indexOf("stateselector") > -1)
        console.log('stateselector page');
    else
        window.location.reload(true);
}

function setQuovaStateLocation(choosenState) {
    if (choosenState == "co") {
        choosenState = "/Geographic Location/Colorado";
    } else if (choosenState == "mi") {
        choosenState = "/Geographic Location/Michigan";
    } else if (choosenState == "mn") {
        choosenState = "/Geographic Location/Minnesota";
    } else if (choosenState == "nm") {
        choosenState = "/Geographic Location/New Mexico";
    } else if (choosenState == "nd") {
        choosenState = "/Geographic Location/North Dakota";
    } else if (choosenState == "sd") {
        choosenState = "/Geographic Location/South Dakota";
    } else if (choosenState == "tx") {
        choosenState = "/Geographic Location/Texas";
    } else if (choosenState == "wi") {
        choosenState = "/Geographic Location/Wisconsin";
    } else {
        choosenState = "";
    }

    // only set the cookie and redirect if there is a valid value
    if (choosenState != "") {
        $.cookie("GeographicLocation", choosenState, {expires: 365, path: "/", domain: '.xcelenergy.com'});
        window.location.href = "/";
    }
}

function setZipCodeCookie(zipcode) {
    $.cookie("zipcode", zipcode, {expires: 365, path: "/"});
}

function redirectStateSelection() {
    window.location.href = "/stateselector?stateSelected=true&goto=/";
}

function getCookieVal(offset) {
    var endstr = document.cookie.indexOf(";", offset);
    if (endstr == -1) {
        endstr = document.cookie.length;
    }
    return unescape(document.cookie.substring(offset, endstr));
}

function GetCookie(name) {
    var arg = name + "=";
    var alen = arg.length;
    var clen = document.cookie.length;
    var i = 0;
    while (i < clen) {
        var j = i + alen;
        if (document.cookie.substring(i, j) == arg) {
            return getCookieVal(j);
        }
        i = document.cookie.indexOf(" ", i) + 1;
        if (i == 0) break;
    }

    return null;
}
