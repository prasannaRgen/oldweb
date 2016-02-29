//------------Open Modal Dialog


var Serviceurl = "";
var datePickerTitle = "Select Date";
function GetServiceUrl(url) {
    return Serviceurl = url;
}

function SingaporePhformat() {
    //----------call On Keypress
    var t = event.srcElement.type;
    var kc = event.keyCode;
    if ((kc >= 48 && kc <= 57) || (kc == 43 | kc == 45 | kc == 40 | kc == 41 | kc == 32)) {
        return true;
    }
    else {
        return false;
    }

}

function ShowModalPopup(divId) {
    $('#' + divId + '').showModal();
    return false;
}
function HideModalPopup(divId) {
    $('#' + divId + '').hideModal();
    return false
}
function chkNonCharacterKey(e) {
    var code = e;
    if (code == Sys.UI.Key.enter || code == Sys.UI.Key.esc) { // allow RETURN/ENTER and ESC keys for all browsers
        return true;
    }
    else if (Sys.Browser.agent == Sys.Browser.Safari && Sys.Browser.version < 500) {
        if (code == 8           // BACKSPACE in Safari 2
                || code == 9        // TAB in Safari 2
                || code == 63272    // DELETE in Safari 2
                || code == 63276    // PAGEUP in Safari 2
                || code == 63277    // PAGEDOWN in Safari 2
                || code == 63275    // END in Safari 2
                || code == 63273    // HOME in Safari 2
                || code == 63234    // ARROWLEFT in Safari 2
                || code == 63235    // ARROWRIGHT in Safari 2
                || (code >= 63236 && code <= 63243) // FUNCTION keys in Safari 2
                || code == 63248       // F13 key in Safari 2
            ) {
            return true;
        }
    }
    else if (Sys.Browser.agent == Sys.Browser.WebKit) {
        if (code == 8            // BACKSPACE in Safari 3
                || code == 9         // TAB in Safari 3
                || code == 19        // PAUSE BREAK Safari 3
                || code == 33        // PAGEUP in Safari 3
                || code == 34        // PAGEDOWN in Safari 3
                || code == 35        // END in Safari 3
                || code == 36        // HOME in Safari 3
                || code == 37        // ARROWLEFT in Safari 3
                || code == 39        // ARROWRIGHT in Safari 3
                || code == 45        // INSERT in Safari 3
                || code == 46        // DELETE in Safari 3
                || code == 91        // WINDOWS LEFT Safari 3
                || code == 92        // WINDOWS RIGHT Safari 3
                || code == 93        // MENU Safari 3
                || code == 113       // F2 Safari 3
                || code == 115       // F4 Safari 3
                || code == 118       // F7 Safari 3
                || code == 119       // F8 Safari 3
                || code == 120       // F9 Safari 3
                || code == 122       // F11 Safari 3
                || code == 145       // SCROLL LOCK Safari 3
            )
            return true;
    }
    else if (Sys.Browser.agent != Sys.Browser.InternetExplorer) {
        if (code == 8           // BACKSPACE in non-microsoft browsers
                || code == 9        // TAB in non-microsoft browsers
                || code == 33       // PAGEUP in non-microsoft browsers
                || code == 34       // PAGEDOWN in non-microsoft browsers
                || code == 35       // END in non-microsoft browsers
                || code == 36       // HOME in non-microsoft browsers
                || code == 37       // ARROWLEFT in non-microsoft browsers
                || code == 39       // ARROWRIGHT in non-microsoft browsers
                || code == 45       // INSERT in non-microsoft browsers
                || code == 46       // DELETE in non-microsoft browsers
            ) {
            if (!e.shiftKey)
                return true;
        }
        else if (code == 145) {
            return true;
        }
        else if (code == 19) {
            return true;
        }
        else if (Sys.Browser.agent == Sys.Browser.Opera) {
            if (code == 0       // MENU key in Opera
                    || code == 16   // SHIFT key in Opera
                    || code == 17   // CONTROL key in Opera
                ) {
                return true;
            }
        }
        else if (Sys.Browser.agent == Sys.Browser.Firefox) {
            if (code == 91      // WINDOWS LEFT key in Firefox
                    || code == 92   // WINDOWS RIGHT key in Firefox
                    || code == 93   // MENU key in Firefox
                ) {
                return true;
            }
        }
    }
    return false;
}
function chkDecimalPoint(e, obj) {
    var chrCode = (e.which) ? e.which : event.keyCode
    if (chrCode == 46) {
        if (("@" + obj.value).indexOf(".") < 0)
            return true;
        else
            return false;
    }
    return chkNumber(e, obj)
}
function chkAlphaNumeric(e, obj) {
    var key;
    if (e.keyCode) key = e.keyCode;
    else if (e.which) key = e.which;
    if (/[^A-Za-z0-9_]/.test(String.fromCharCode(key)))
        return false;
    else
        return true;
}
function chkSeparator(e, obj) {
    var key;
    if (e.keyCode) key = e.keyCode;
    else if (e.which) key = e.which;
    if (/[^A-Za-z0-9]/.test(String.fromCharCode(key)))
        return true;
    else
        return false;
}
function getCursorPos(textElement) {
    //save off the current value to restore it later, 
    var sOldText = textElement.value;
    //create a range object and save off it's text
    var objRange = document.selection.createRange();
    var sOldRange = objRange.text;
    //set this string to a small string that will not normally be encountered
    var sWeirdString = '#%~';
    //insert the weirdstring where the cursor is at
    objRange.text = sOldRange + sWeirdString; objRange.moveStart('character', (0 - sOldRange.length - sWeirdString.length));
    //save off the new string with the weirdstring in it
    var sNewText = textElement.value;
    //set the actual text value back to how it was
    objRange.text = sOldRange;
    //look through the new string we saved off and find the location of
    //the weirdstring that was inserted and return that value
    for (i = 0; i <= sNewText.length; i++) {
        var sTemp = sNewText.substring(i, i + sWeirdString.length);
        if (sTemp == sWeirdString) {
            var cursorPos = (i - sOldRange.length);
            return cursorPos;
        }
    }
}
function chkMultiDecimalPoint(e, obj) {
    var chrCode = (e.which) ? e.which : event.keyCode
    var bol = false;
    if (chrCode == 46) {
        if (obj.value.length > 0) {
            var txt = obj.value;
            var str = '';
            var k = 2;
            var i;
            for (i = 0; i <= k; i++) {
                if (txt.charAt(k - i) == '+' || txt.charAt(k - i) == '-' || txt.charAt(k - i) == '*' || txt.charAt(k - i) == '/' || txt.charAt(k - i) == '(' || txt.charAt(k - i) == ')') {
                    bol = true;
                    if (k <= txt.length) {
                        for (j = k + 1; j <= txt.length; j++) {
                            if (txt.charAt(j) == '+' || txt.charAt(j) == '-' || txt.charAt(j) == '*' || txt.charAt(j) == '/' || txt.charAt(j) == '(' || txt.charAt(j) == ')') {
                                j = txt.length;
                                i = k;
                            } else {
                                if (txt.charAt(j) == '.')
                                    return false;
                                else
                                    str = str + txt.charAt(j);
                            }
                        }
                    } else {
                        i = k;
                    }
                } else {
                    if (txt.charAt(k - i) == '.')
                        return false;
                    else
                        str = txt.charAt(k - i) + str;
                }
            }
        } else {
            if (("@" + obj.value).indexOf(".") <= 0) {
                obj.value = "0.";
                return false;
            } else
                return false;
        }
        if (k <= txt.length && bol == false) {
            for (j = k + 1; j <= txt.length; j++) {
                if (txt.charAt(j) == '+' || txt.charAt(j) == '-' || txt.charAt(j) == '*' || txt.charAt(j) == '/' || txt.charAt(j) == '(' || txt.charAt(j) == ')') {
                    j = txt.length;
                    i = k;
                } else {
                    if (txt.charAt(j) == '.')
                        return false;
                    else
                        str = str + txt.charAt(j);
                }
            }
        } else {
            i = k;
        }
        MessageBox('String : ' + str + ' ; Pointer : ' + k);
    }
}
function chkNumber(e, obj) {
    var chrCode = (e.which) ? e.which : event.keyCode
    return (chrCode > 47 && chrCode < 58)
	         || chkNonCharacterKey(e) ? true : false;
}
function CloseModelPopUp(divid) {
    var out = confirm('Are you sure ?\n You want to cancel !!.');
    if (out) {
        $('#' + divid + '').hideModal();
    }
    return false;
}
function FunKeyDown(event, obj) {
    var code = (event.which) ? event.which : event.keyCode;
    var character = String.fromCharCode(code);
    var objid = null;
    var elem1 = null;
    if (obj.tagName == "TEXTAREA") { return true; }
    if (obj.tagName == "SPAN") { objid = obj.childNodes[0].id; } else { objid = obj.id; }
    if (obj.type == 'submit') { return true; }
    if (obj.type == 'image') { return true; }
    if (code == 13) {
        var findit = false
        var elem = document.all;
        for (var i = 0; i < elem.length; i++) {
            elem1 = elem[i];
            if ((elem1.type != "hidden") && (elem1.style.display != "none")) {
                if (findit) {
                    if ((elem1.tagName == "TEXTAREA" || elem1.tagName == "INPUT" || elem1.tagName == "SELECT")) {
                        if (!elem1.isDisabled) {
                            if (elem1.tagName != "SELECT") {
                                if (elem1.readOnly == false) {
                                    if (!elem1.disabled) {
                                        elem1.focus(); break;
                                    }
                                }
                            } else {
                                if (!elem1.disabled) {
                                    elem1.focus(); break;
                                }
                            }
                        }
                        else {
                            if (elem1.isDisabled == false) {
                                elem1.focus(); break;
                            }
                        }
                    }
                }
                if (elem1.id == objid) {
                    findit = true;
                }
            }
        }
        return false;
    }
    else {
        return true;
    }
}
function IE_keydown() {
    var t = event.srcElement.type;
    var kc = event.keyCode;
    if (kc == 13)
        return FunKeyDown(event, event.srcElement);
    return ((kc != 8) || (t == 'text') || (t == 'textarea') || (t == 'submit') || (t == 'password'))
}
function Other_keypress(e) {
    var t = e.target.type;
    var kc = e.keyCode;
    if (kc == 13) {
        return FunKeyDown(e, e.target);
    }
    if ((kc != 8) || (t == 'text') ||
            (t == 'textarea') || (t == 'submit') || (t == 'password'))
        return true
    else {
        MessageBox('Sorry Backspace/Enter is not allowed here'); // Demo code
        return false
    }
}
function ValidLength(obj, Length) {
    var control = document.getElementById(obj.id);
    var Text = obj.value;
    if (Text.length > Length) {
        MessageBox("You can not enter more then " + Length + " character.\nYou already enter " + Text.length + " character");
        if (control.disabled == false) {
            control.focus();
        }
        return false;
    }
    else {
        return true;
    }
}
function limitTextarea(textarea, maxLines, maxChar) {
    var lines = textarea.value.replace(/\r/g, '').split('\n'), lines_removed, char_removed, i;
    if (maxLines && lines.length > maxLines) {
        ShowMsg('You can not enter more than ' + maxLines + ' lines');
        if (textarea.value.substr(textarea.selectionStart - 1, 1) == '\n') {
            if (textarea.selectionStart == textarea.value.length) {
                textarea.value = textarea.value.substr(0, textarea.selectionStart - 1)
            }
            else {
                textarea.value = textarea.value.substr(0, textarea.selectionStart - 1) + textarea.value.substr(textarea.selectionStart)
            }
        }
        lines = textarea.value
        //lines = lines.slice(0, maxLines);
        //lines_removed = 1
    }
    if (maxChar) {
        i = lines.length;
        while (i-- > 0) if (lines[i].length > maxChar) {
            lines[i] = lines[i].slice(0, maxChar);
            //lines[i] = lines[i].slice(0, textarea.selectionStart - ((maxChar * (i + 1)) - (i + 2))) + lines[i].slice(textarea.selectionStart - ((maxChar * (i + 1)) - (i + 2) + 1));
            char_removed = 1
        }
        if (char_removed) ShowMsg('You can not enter more than ' + maxChar + ' characters per line', "Sky™ WEB ERP");
    }
    if (char_removed || lines_removed) textarea.value = lines.join('\n')
}
//For DatePicker Control------------------------------------------------------------------------------------
function chkDateOnBlur(obj, min, max) {
    var format = "dd/MM/yyyy";
    var dtCont = obj;
    //    var min = "01/04/2011";
    //    var max = "31/03/2012";
    var dtTxt = dtCont.value;
    var sCount = 0;
    var nwTxt = '';
    var bol = false;
    if (dtTxt != "") {
        //If Only One Text Enter/------------------------------------
        if (dtTxt.split(".").length >= 3 && bol == false) {
            if (dtTxt.split(".")[0].length == 1)
                nwTxt += "0" + dtTxt.split(".")[0];
            else
                nwTxt += dtTxt.split(".")[0];
            if (dtTxt.split(".")[1].length == 1)
                nwTxt += "0" + dtTxt.split(".")[1];
            else
                nwTxt += dtTxt.split(".")[1];
            if (dtTxt.split(".").length == 3) nwTxt += dtTxt.split(".")[2];
            bol = true;
        }
        if (dtTxt.split("-").length >= 3 && bol == false) {
            if (dtTxt.split("-")[0].length == 1)
                nwTxt += "0" + dtTxt.split("-")[0];
            else
                nwTxt += dtTxt.split("-")[0];
            if (dtTxt.split("-")[1].length == 1)
                nwTxt += "0" + dtTxt.split("-")[1];
            else
                nwTxt += dtTxt.split("-")[1];
            if (dtTxt.split("-").length == 3) nwTxt += dtTxt.split("-")[2];
            bol = true;
        }
        if (dtTxt.split("/").length >= 3 && bol == false) {
            if (dtTxt.split("/")[0].length == 1)
                nwTxt += "0" + dtTxt.split("/")[0];
            else
                nwTxt += dtTxt.split("/")[0];
            if (dtTxt.split("/")[1].length == 1)
                nwTxt += "0" + dtTxt.split("/")[1];
            else
                nwTxt += dtTxt.split("/")[1];
            if (dtTxt.split("/").length == 3) nwTxt += dtTxt.split("/")[2];
            bol = true;
        }
        if (!bol) {
            if (dtTxt.split(".").length >= 2) {
                if (dtTxt.split(".")[0].toString().indexOf("/") >= 1 || dtTxt.split(".")[0].toString().indexOf("-") >= 1) {
                    if (dtTxt.split(".")[0].toString().split("-").length >= 2) {
                        if (dtTxt.split(".")[0].toString().split("-")[0].length == 1)
                            nwTxt += "0" + dtTxt.split(".")[0].toString().split("-")[0];
                        else
                            nwTxt += dtTxt.split(".")[0].toString().split("-")[0];
                    }
                    if (dtTxt.split(".")[0].toString().split("-").length >= 2) {
                        if (dtTxt.split(".")[0].toString().split("-")[1].length == 1)
                            nwTxt += "0" + dtTxt.split(".")[0].toString().split("-")[1];
                        else
                            nwTxt += dtTxt.split(".")[0].toString().split("-")[1];
                    }
                    if (dtTxt.split(".")[0].toString().split("/").length >= 2) {
                        if (dtTxt.split(".")[0].toString().split("/")[0].length == 1)
                            nwTxt += "0" + dtTxt.split(".")[0].toString().split("/")[0];
                        else
                            nwTxt += dtTxt.split(".")[0].toString().split("/")[0];
                    }
                    if (dtTxt.split(".")[0].toString().split("/").length >= 2) {
                        if (dtTxt.split(".")[0].toString().split("/")[1].length == 1)
                            nwTxt += "0" + dtTxt.split(".")[0].toString().split("/")[1];
                        else
                            nwTxt += dtTxt.split(".")[0].toString().split("/")[1];
                    }
                    if (dtTxt.split(".")[1].length == 1)
                        nwTxt += "0" + dtTxt.split(".")[1];
                    else
                        nwTxt += dtTxt.split(".")[1];
                }
                if (dtTxt.split(".")[1].toString().indexOf("/") >= 1 || dtTxt.split(".")[1].toString().indexOf("-") >= 1) {
                    if (dtTxt.split(".")[0].length == 1)
                        nwTxt += "0" + dtTxt.split(".")[0];
                    else
                        nwTxt += dtTxt.split(".")[0];
                    if (dtTxt.split(".")[1].toString().split("-").length >= 2) {
                        if (dtTxt.split(".")[1].toString().split("-")[0].length == 1)
                            nwTxt += "0" + dtTxt.split(".")[1].toString().split("-")[0];
                        else
                            nwTxt += dtTxt.split(".")[1].toString().split("-")[0];
                    }
                    if (dtTxt.split(".")[1].toString().split("-").length >= 2) {
                        if (dtTxt.split(".")[1].toString().split("-")[1].length == 1)
                            nwTxt += "0" + dtTxt.split(".")[1].toString().split("-")[1];
                        else
                            nwTxt += dtTxt.split(".")[1].toString().split("-")[1];
                    }
                    if (dtTxt.split(".")[1].toString().split("/").length >= 2) {
                        if (dtTxt.split(".")[1].toString().split("/")[0].length == 1)
                            nwTxt += "0" + dtTxt.split(".")[1].toString().split("/")[0];
                        else
                            nwTxt += dtTxt.split(".")[1].toString().split("/")[0];
                    }
                    if (dtTxt.split(".")[1].toString().split("/").length >= 2) {
                        if (dtTxt.split(".")[1].toString().split("/")[1].length == 1)
                            nwTxt += "0" + dtTxt.split(".")[1].toString().split("/")[1];
                        else
                            nwTxt += dtTxt.split(".")[1].toString().split("/")[1];
                    }
                }
                if (!(dtTxt.split(".")[1].toString().indexOf("/") >= 1 || dtTxt.split(".")[1].toString().indexOf("-") >= 1 || dtTxt.split(".")[0].toString().indexOf("/") >= 1 || dtTxt.split(".")[0].toString().indexOf("-") >= 1)) {
                    if (dtTxt.split(".")[0].length == 1)
                        nwTxt += "0" + dtTxt.split(".")[0];
                    else
                        nwTxt += dtTxt.split(".")[0];
                    if (dtTxt.split(".")[1].length == 1)
                        nwTxt += "0" + dtTxt.split(".")[1];
                    else
                        nwTxt += dtTxt.split(".")[1];
                }
            } else {
                if (dtTxt.split("/").length >= 2) {
                    if (dtTxt.split("/")[0].toString().indexOf("-") >= 1 || dtTxt.split("/")[0].toString().indexOf(".") >= 1) {
                        if (dtTxt.split("/")[0].toString().split(".").length >= 2) {
                            if (dtTxt.split("/")[0].toString().split(".")[0].length == 1)
                                nwTxt += "0" + dtTxt.split("/")[0].toString().split(".")[0];
                            else
                                nwTxt += dtTxt.split("/")[0].toString().split(".")[0];
                        }
                        if (dtTxt.split("/")[0].toString().split(".").length >= 2) {
                            if (dtTxt.split("/")[0].toString().split(".")[1].length == 1)
                                nwTxt += "0" + dtTxt.split("/")[0].toString().split(".")[1];
                            else
                                nwTxt += dtTxt.split("/")[0].toString().split(".")[1];
                        }
                        if (dtTxt.split("/")[0].toString().split("-").length >= 2) {
                            if (dtTxt.split("/")[0].toString().split("-")[0].length == 1)
                                nwTxt += "0" + dtTxt.split("/")[0].toString().split("-")[0];
                            else
                                nwTxt += dtTxt.split("/")[0].toString().split("-")[0];
                        }
                        if (dtTxt.split("/")[0].toString().split("-").length >= 2) {
                            if (dtTxt.split("/")[0].toString().split("-")[1].length == 1)
                                nwTxt += "0" + dtTxt.split("/")[0].toString().split("-")[1];
                            else
                                nwTxt += dtTxt.split("/")[0].toString().split("-")[1];
                        }
                        if (dtTxt.split("/")[1].length == 1)
                            nwTxt += "0" + dtTxt.split("/")[1];
                        else
                            nwTxt += dtTxt.split("/")[1];
                    }
                    if (dtTxt.split("/")[1].toString().indexOf("-") >= 1 || dtTxt.split("/")[1].toString().indexOf(".") >= 1) {
                        if (dtTxt.split("/")[0].length == 1)
                            nwTxt += "0" + dtTxt.split("/")[0];
                        else
                            nwTxt += dtTxt.split("/")[0];
                        if (dtTxt.split("/")[1].toString().split(".").length >= 2) {
                            if (dtTxt.split("/")[1].toString().split(".")[0].length == 1)
                                nwTxt += "0" + dtTxt.split("/")[1].toString().split(".")[0];
                            else
                                nwTxt += dtTxt.split("/")[1].toString().split(".")[0];
                        }
                        if (dtTxt.split("/")[1].toString().split(".").length >= 2) {
                            if (dtTxt.split("/")[1].toString().split(".")[1].length == 1)
                                nwTxt += "0" + dtTxt.split("/")[1].toString().split(".")[1];
                            else
                                nwTxt += dtTxt.split("/")[1].toString().split(".")[1];
                        }
                        if (dtTxt.split("/")[1].toString().split("-").length >= 2) {
                            if (dtTxt.split("/")[1].toString().split("-")[0].length == 1)
                                nwTxt += "0" + dtTxt.split("/")[1].toString().split("-")[0];
                            else
                                nwTxt += dtTxt.split("/")[1].toString().split("-")[0];
                        }
                        if (dtTxt.split("/")[1].toString().split("-").length >= 2) {
                            if (dtTxt.split("/")[1].toString().split("-")[1].length == 1)
                                nwTxt += "0" + dtTxt.split("/")[1].toString().split("-")[1];
                            else
                                nwTxt += dtTxt.split("/")[1].toString().split("-")[1];
                        }
                    }
                    if (!(dtTxt.split("/")[1].toString().indexOf("-") >= 1 || dtTxt.split("/")[1].toString().indexOf(".") >= 1 || dtTxt.split("/")[0].toString().indexOf("-") >= 1 || dtTxt.split("/")[0].toString().indexOf(".") >= 1)) {
                        if (dtTxt.split("/")[0].length == 1)
                            nwTxt += "0" + dtTxt.split("/")[0];
                        else
                            nwTxt += dtTxt.split("/")[0];
                        if (dtTxt.split("/")[1].length == 1)
                            nwTxt += "0" + dtTxt.split("/")[1];
                        else
                            nwTxt += dtTxt.split("/")[1];
                    }
                } else {
                    if (dtTxt.split("-").length >= 2) {
                        if (!(dtTxt.split("-")[1].toString().indexOf("/") >= 1 || dtTxt.split("-")[1].toString().indexOf(".") >= 1 || dtTxt.split("-")[0].toString().indexOf("/") >= 1 || dtTxt.split("-")[0].toString().indexOf(".") >= 1)) {
                            if (dtTxt.split("-")[0].length == 1)
                                nwTxt += "0" + dtTxt.split("-")[0];
                            else
                                nwTxt += dtTxt.split("-")[0];
                            if (dtTxt.split("-")[1].length == 1)
                                nwTxt += "0" + dtTxt.split("-")[1];
                            else
                                nwTxt += dtTxt.split("-")[1];
                        }
                    }
                }
            }
        }
        if (nwTxt != '')
            dtTxt = nwTxt;
        //------------------------------------
        for (i = 0; i <= dtTxt.length; i++) {
            if (dtTxt.substring(i, i + 1) == "." || dtTxt.substring(i, i + 1) == "-" || dtTxt.substring(i, i + 1) == "/") {
                sCount += 1;
            }
        }
        if (sCount > 0) {
            for (i = 0; i <= sCount - 1; i++) {
                dtTxt = dtTxt.replace('.', '');
                dtTxt = dtTxt.replace('-', '');
                dtTxt = dtTxt.replace('/', '');
            }
        }
        if (!isValidDate(dtCont, dtTxt, format, min, max)) {
            dtCont.select();
            dtCont.focus;
        }
    }
}
//For Check Valid Character On TextBox Key Press Event//---------------------------------------------
function ChkText(obj) {
    var kCode = event.keyCode
    if ((kCode >= 48 && kCode <= 57) || (kCode == 8 || kCode == 127) || (kCode == 46 || kCode == 45 || kCode == 47)) {
        if (obj.value.length >= 8) {
            var sCount = 0;
            for (i = 0; i <= obj.value.length; i++) {
                if (obj.value.substring(i, i + 1) == "." || obj.value.substring(i, i + 1) == "-" || obj.value.substring(i, i + 1) == "/") {
                    sCount += 1;
                }
            }
            if (sCount == 0) {
                return false;
            }
        }
        if (kCode == 46 || kCode == 45 || kCode == 47) {
            if (obj.value.length > 0) {
                if (obj.value.indexOf(".") > 0 || obj.value.indexOf("-") > 0 || obj.value.indexOf("/") > 0) {
                    var dLChk, mLChk, sLChk;
                    var dRChk, mRChk, sRChk;
                    dLChk = obj.value.charAt(obj.value.length - 1);
                    mLChk = obj.value.charAt(obj.value.length - 1);
                    sLChk = obj.value.charAt(obj.value.length - 1);
                    dRChk = obj.value.charAt(obj.value.length);
                    mRChk = obj.value.charAt(obj.value.length);
                    sRChk = obj.value.charAt(obj.value.length);
                    if (dLChk != '.' && mLChk != '-' && sLChk != '/' && dRChk != '.' && mRChk != '-' && sRChk != '/') {
                        var dStr, mStr, cStr;
                        var sCount = 0;
                        for (i = 0; i <= obj.value.length; i++) {
                            if (obj.value.charAt(i) == "." || obj.value.charAt(i) == "-" || obj.value.charAt(i) == "/") {
                                sCount += 1;
                                if (sCount >= 2) {
                                    return false;
                                }
                            }
                        }
                    } else {
                        return false;
                    }
                }
            } else
                return false;
        }
        return true;
    } else
        return false;
}
//End DatePicker--------------------------------------------------------------------------------------------------------------------------------------------------
function IsDecimal(e, obj) {
    var chrCode = (e.which) ? e.which : event.keyCode
    if (e.type == 'blur' && obj.value != "") {
        var exp = obj.value;
        var r = new RegExp("[0-9/]");
        if (obj.value.match(",") == ",") {
            obj.value = obj.value.replace(",", '');
        }
        if (exp.match(r) == null) {
            obj.value = ""
            return false;
        }
    }
    if (chrCode == 46) { // Check dot
        if (obj.value.indexOf(".") > 0) {
            return false;
        }
    }
    return (chrCode > 47 && chrCode < 58) ||
	         chrCode == 8 ||
	         chrCode == 46 ? true : false;
}
function IsInteger(e, Obj) {
    var chrCode = (e.which) ? e.which : event.keyCode
    return (chrCode > 47 && chrCode < 58) ||
	         chrCode == 8 ? true : false;
}
function Round(obj, RoundOf) {
    if (window.event.type == 'blur' && obj.value != "") {
        var exp = obj.value;
        var r = new RegExp("[0-9/]");
        if (obj.value.match(",") == ",") {
            obj.value = obj.value.replace(",", '');
        }
        if (exp.match(r) == null) {
            obj.value = ""
            return false;
        }
    }
    var profits = obj.value;
    if (RoundOf != undefined) {
        obj.value = Number(profits).toFixed(Number(RoundOf));
    }
    else {
        obj.value = Number(profits).toFixed(2);
    }
}
function RoundInt(obj) {
    var profits = obj.value;
    if (profits != "") {
        obj.value = Number(profits);
    }
}
function checkValidEmail(EmailId) {
    var ValEmail = EmailId.value;
    if (ValEmail.trim() != '') {
        var EmailExp = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        if (!EmailExp.test(ValEmail)) {
            MessageBox('Please Enter Valid Email')
            EmailId.value = '';
            EmailId.focus();


        }
    }
}

function returns() {
    return true;
}
function CheckValidDate(dtControl) {
    var dateStr = dtControl.value;
    if (dateStr.trim() == "") {
        return true;
    }
    var slash1 = dateStr.indexOf("/");
    if (slash1 == -1) {
        slash1 = dateStr.indexOf("-");
    }
    // if no slashes or dashes, invalid date
    if (slash1 == -1) {
        MessageBox("Please Enter Valid Date!! \n \n  Date Format Should Be [dd/MM/yyyy] !!");
        dtControl.value = "";
        dtControl.focus();
        return false;
    }
    var dateDay = dateStr.substring(0, slash1)
    var dateMonthAndYear = dateStr.substring(slash1 + 1, dateStr.length);
    var slash2 = dateMonthAndYear.indexOf("/");
    if (slash2 == -1) { slash2 = dateMonthAndYear.indexOf("-"); }
    // if not a second slash or dash, invalid date
    if (slash2 == -1) {
        MessageBox("Please Enter Valid Date!! \n \n  Date Format Should Be [dd/MM/yyyy] !!");
        dtControl.value = "";
        dtControl.focus();
        return false;
    }
    var dateMonth = dateMonthAndYear.substring(0, slash2);
    var dateYear = dateMonthAndYear.substring(slash2 + 1, dateMonthAndYear.length);
    if ((dateMonth == "") || (dateDay == "") || (dateYear == "")) {
        MessageBox("Please Enter Valid Date!! \n \n  Date Format Should Be [dd/MM/yyyy] !!");
        dtControl.value = "";
        dtControl.focus();
        return false;
    }
    // if any non-digits in the month, invalid date
    //////for (var x = 0; x < dateMonth.length; x++) {
    //////	var digit = dateMonth.substring(x, x + 1);
    //////	if ((digit < "0") || (digit > "9")) {
    //////		MessageBox("Please Enter Valid Date!! \n \n  Date Format Should Be [dd/MM/yyyy] !!");
    //////		dtControl.value = "";
    //////		dtControl.focus();
    //////		return false;
    //////	}
    //////}
    // convert the text month to a number
    var numMonth = 0;
    for (var x = 0; x < dateMonth.length; x++) {
        digit = dateMonth.substring(x, x + 1);
        numMonth *= 10;
        numMonth += parseInt(digit);
    }
    if ((numMonth <= 0) || (numMonth > 12)) {
        MessageBox("Please Enter Valid Date!! \n \n  Date Format Should Be [dd/MM/yyyy] !!");
        dtControl.value = "";
        dtControl.focus();
        return false;
    }
    // if any non-digits in the day, invalid date
    for (var x = 0; x < dateDay.length; x++) {
        digit = dateDay.substring(x, x + 1);
        if ((digit < "0") || (digit > "9")) {
            MessageBox("Please Enter Valid Date!! \n \n  Date Format Should Be [dd/MM/yyyy] !!");
            dtControl.value = "";
            dtControl.focus();
            return false;
        }
    }
    // convert the text day to a number
    var numDay = 0;
    for (var x = 0; x < dateDay.length; x++) {
        digit = dateDay.substring(x, x + 1);
        numDay *= 10;
        numDay += parseInt(digit);
    }
    if ((numDay <= 0) || (numDay > 31)) {
        MessageBox("Please Enter Valid Date!! \n \n  Date Format Should Be [dd/MM/yyyy] !!");
        dtControl.value = "";
        dtControl.focus();
        return false;
    }
    // February can't be greater than 29 (leap year calculation comes later)
    if ((numMonth == 2) && (numDay > 29)) {
        MessageBox("Please Enter Valid Date!! \n \n  Date Format Should Be [dd/MM/yyyy] !!");
        dtControl.value = "";
        dtControl.focus();
        return false;
    }
    // check for months with only 30 days
    if ((numMonth == 4) || (numMonth == 6) || (numMonth == 9) || (numMonth == 11)) {
        if (numDay > 30) {
            MessageBox("Please Enter Valid Date!! \n \n  Date Format Should Be [dd/MM/yyyy] !!");
            dtControl.value = "";
            dtControl.focus();
            return false;
        }
    }
    // if any non-digits in the year, invalid date
    for (var x = 0; x < dateYear.length; x++) {
        digit = dateYear.substring(x, x + 1);
        if ((digit < "0") || (digit > "9")) {
            MessageBox("Please Enter Valid Date!! \n \n  Date Format Should Be [dd/MM/yyyy] !!");
            dtControl.value = "";
            dtControl.focus();
            return false;
        }
    }
    // convert the text year to a number
    var numYear = 0;
    for (var x = 0; x < dateYear.length; x++) {
        digit = dateYear.substring(x, x + 1);
        numYear *= 10;
        numYear += parseInt(digit);
    }
    // Year must be a 2-digit year or a 4-digit year
    if ((dateYear.length != 2) && (dateYear.length != 4)) {
        MessageBox("Please Enter Valid Date!! \n \n  Date Format Should Be [dd/MM/yyyy] !!");
        dtControl.value = "";
        dtControl.focus();
        return false;
    }
    // if 2-digit year, use 50 as a pivot date
    if ((numYear < 50) && (dateYear.length == 2)) { numYear += 2000; }
    if ((numYear < 100) && (dateYear.length == 2)) { numYear += 1900; }
    if ((numYear <= 0) || (numYear > 9999)) {
        MessageBox("Please Enter Valid Date!! \n \n  Date Format Should Be [dd/MM/yyyy] !!");
        dtControl.value = "";
        dtControl.focus();
        return false;
    }
    // check for leap year if the month and day is Feb 29
    if ((numMonth == 2) && (numDay == 29)) {
        var div4 = numYear % 4;
        var div100 = numYear % 100;
        var div400 = numYear % 400;
        // if not divisible by 4, then not a leap year so Feb 29 is invalid
        if (div4 != 0) {
            MessageBox("Please Enter Valid Date!! \n \n  Date Format Should Be [dd/MM/yyyy] !!");
            dtControl.value = "";
            dtControl.focus();
            return false;
        }
        // at this point, year is divisible by 4. So if year is divisible by
        // 100 and not 400, then it's not a leap year so Feb 29 is invalid
        if ((div100 == 0) && (div400 != 0)) {
            MessageBox("Please Enter Valid Date!! \n \n  Date Format Should Be [dd/MM/yyyy] !!");
            dtControl.value = "";
            dtControl.focus();
            return false;
        }
    }
    // date is valid
    return true;
}
function CompareFromCurrentDate(Date1, mMsgDate) {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) { dd = '0' + dd } if (mm < 10) { mm = '0' + mm }
    var today = dd + '/' + mm + '/' + yyyy;
    if (checkDateNumber(Date1.value)) {
        if (!CheckValidDate(Date1)) {
            Date1.value = '';
            Date1.focus();
            return false;
        }
    }
    if (checkDateNumber(Date1.value) && checkDateNumber(today)) {
        if (!cmpDate(Date1.value, today)) {
            MessageBox(mMsgDate + ' should be less than or equal to Current Date !!.');
            Date1.value = '';
            Date1.focus();
            return false;
        }
    }
    return true;
}
function CompareDate(Date1, Date2, mMsgDate1, MsgDate2) {
    Date1 = document.getElementById(Date1);
    Date2 = document.getElementById(Date2);
    if (checkDateNumber(Date1.value)) {
        if (!CheckValidDate(Date1)) {
            Date1.value = '';
            Date1.focus();
            return false;
        }
    }
    if (checkDateNumber(Date2.value)) {
        if (!CheckValidDate(Date2)) {
            Date2.value = '';
            Date2.focus();
            return false;
        }
    }
    if (checkDateNumber(Date1.value) && checkDateNumber(Date2.value)) {
        if (!cmpDate(Date1.value, Date2.value)) {
            MessageBox(mMsgDate1 + ' should be less than or equal to ' + MsgDate2);
            Date1.value = '';
            Date1.focus();
            return false;
        }
    }
    return true;
}
function CompareDateWithEqual(Date1, Date2, mMsgDate1, MsgDate2) {
    Date1 = document.getElementById(Date1);
    Date2 = document.getElementById(Date2);
    if (checkDateNumber(Date1.value)) {
        if (!CheckValidDate(Date1)) {
            Date1.value = '';
            Date1.focus();
            return false;
        }
    }
    if (Date2 != null) {
        if (checkDateNumber(Date2.value)) {
            if (!CheckValidDate(Date2)) {
                Date2.value = '';
                Date2.focus();
                return false;
            }
        }
        if (checkDateNumber(Date1.value) && checkDateNumber(Date2.value)) {
            if (!ComDateWithEqual(Date1.value, Date2.value)) {
                MessageBox(mMsgDate1 + ' should be less than or equal to ' + MsgDate2);
                Date1.value = '';
                Date1.focus();
                return false;
            }
        }
    }
    return true;
}
function OpenPopUpWindow(page, id1, id2, id3, id4, id5, id6) {
    if (id1 == null) id1 = "";
    if (id2 == null) id2 = "";
    if (id3 == null) id3 = "";
    if (id4 == null) id4 = "";
    if (id5 == null) id5 = "";
    if (id6 == null) id6 = "";
    var urlname;
    var width;
    var height;
    urlname = page + ".aspx?openfrom=popup&id1=" + id1 + "&id2=" + id2 + "&id3=" + id3 + "&id4=" + id4 + "&id5=" + id5 + "&id6=" + id6;
    width = 1200;
    height = 600;
    return PopUP(urlname, width, height);
}
function GetLeapYearDate(year, month) {
    var leapYear;
    var daysInMonth;
    var Dates;
    if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) leapYear = 'Yes'; else leapYear = 'No';
    if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12)
        daysInMonth = 31;
    else if (month == 4 || month == 6 || month == 9 || month == 11)
        daysInMonth = 30;
    if (month == 2 && leapYear == 'Yes') daysInMonth = 29; else daysInMonth = 28;
    Dates = daysInMonth + '/' + month + '/' + year;
    return Dates;
}
var CLIPBOARD = "";
function ShowRightClickMenu(GVReport, MainMenus, SubMenus) {
    if (GVReport != null) {
        var RInput = GVReport.getElementsByTagName('div');
        for (var i = 0; i < RInput.length; i++) {
            var MnMenu = MainMenus.split("|");
            var SbMenu = SubMenus.split("|");
            for (var k = 0; k <= MnMenu.length - 1; k++) {
                var MainMenu = MnMenu[k];
                var SubMenu = SbMenu[k];
                if (RInput[i].id.toString().toLowerCase().indexOf(MainMenu.toLowerCase()) > 0) {
                    var ULId = RInput[i].id.split("_")[RInput[i].id.split("_").length - 2];
                    ULId = RInput[i].id.replace(ULId, SubMenu);
                    ULId = document.getElementById(ULId);
                    if (ULId != null) {
                        $("#" + RInput[i].id + "").contextmenu({
                            delegate: ".hasmenu2",
                            hide: { effect: "explode", duration: "slow" },
                            menu: "#" + ULId.id + "",
                            position: { my: "left top", at: "left bottom" },
                            position: function (event, ui) {
                                position: "absolute";
                                return { my: "left top", at: "left bottom", of: ui.target };
                            },
                            preventSelect: true,
                            show: { effect: "fold", duration: "slow" },
                            taphold: true,
                            uiMenuOptions: { // Additional options, used when UI Menu is created
                                position: { my: "left+1 top", at: "right top+22" }
                            },
                            focus: function (event, ui) {
                                var menuId = ui.item.find(">a").attr("href");
                                $("#info").text("focus " + menuId);
                                //MenuSubContent
                                console.log("focus", ui.item);
                            },
                            blur: function (event, ui) {
                                $("#info").text("");
                                console.log("blur", ui.item);
                            },
                            beforeOpen: function (event, ui) {
                                //			$("#container").contextmenu("replaceMenu", "#options2");
                                //			$("#container").contextmenu("replaceMenu", [{title: "aaa"}, {title: "bbb"}]);
                            },
                            open: function (event, ui) {
                                //          MessageBox("open on " + ui.target.text());
                            },
                            select: function (event, ui) {
                            }
                        });
                    }
                }
            }
        }
    }
}
function GetDate(splitter) {
    var d = new Date();
    var month = d.getMonth() + 1; var day = d.getDate();
    var CurrentDate = (day < 10 ? '0' : '') + day + '' + splitter + '' + RetMonthName(month) + '' + splitter + '' + d.getFullYear();
    return CurrentDate;
}

function RetMonthName(count) {
    var month = new Array();
    month[1] = "Jan";
    month[2] = "Feb";
    month[3] = "Mar";
    month[4] = "Apr";
    month[5] = "May";
    month[6] = "Jun";
    month[7] = "Jul";
    month[8] = "Aug";
    month[9] = "Sep";
    month[10] = "Oct";
    month[11] = "Nov";
    month[12] = "Dec";
    for (var i = 0; i < month.length; i++) {
        if (count == i) {
            return month[i];
            break;
        }
    }

}
function RetMonthNo(Monthname) {
    var monthNo;
    if (Monthname != undefined) {
        switch (Monthname.toString().toLowerCase()) {
            case "jan":
                monthNo = 1;
                break;
            case "feb":
                monthNo = 2;
                break;
            case "mar":
                monthNo = 3;
                break;
            case "apr":
                monthNo = 4;
                break;
            case "may":
                monthNo = 5;
                break;
            case "jun":
                monthNo = 6;
                break;
            case "jul":
                monthNo = 7;
                break;
            case "aug":
                monthNo = 8;
                break;
            case "sep":
                monthNo = 9;
                break;
            case "oct":
                monthNo = 10;
                break;
            case "nov":
                monthNo = 11;
                break;
            case "dec":
                monthNo = 12;
                break;
        }
    }

    return monthNo;
}

function SetCheckBoxFilterforALLCheck(controlId) {
    var chk = controlId.getElementsByTagName("INPUT");
    var numChecked = 0;

    for (var i = 0; i < chk.length; i++) {
        if (i != 0 && chk[i].checked) { numChecked = numChecked + 1; break; }
    }

    if (numChecked == 0)
    { chk[0].checked = true; }
    else { chk[0].checked = false; };
}

function UncheckChkList(chk, chklstId, DisplayId) {
    var chklst = document.getElementById(chklstId).getElementsByTagName("INPUT");
    var disId = document.getElementById(DisplayId);
    chk.checked = false;
    disId.value = '--ALL--';

    if (chklst[0].checked == false) {
        for (var j = 0; j < chklst.length; j++) {
            if (j == 0) { chklst[j].checked = true; } else { chklst[j].checked = false; }
        }
    }
}
function SetChkListTextFocus(chkList, Search, isNext) {
    var chk = document.getElementById(chkList);
    var txtSearch = document.getElementById(Search);

    if (txtSearch.value.trim() != '') {
        if (isNext != "Y") {
            prvPos = 0;
        }

        if (chk != null) {
            var input = chk.getElementsByTagName('input');
            var lbl = chk.getElementsByTagName('label');

            for (var i = 0; i < lbl.length; i++) {
                if (lbl[i].innerHTML.toUpperCase().indexOf(txtSearch.value.toUpperCase().toString().trim()) > -1 && i > prvPos) {
                    input[i].focus();
                    prvPos = i;
                    break;
                }
                if (i == lbl.length - 1) { prvPos = 0; }
            }
        }
    }
    return false;
}


function SetChkFilterforALLkWithCount(controlId, DisplayId) {
    var chk = controlId.getElementsByTagName("INPUT");
    var disId = document.getElementById(DisplayId);
    var numChecked = 0;
    var SelectedItem = "";
    for (var i = 0; i < chk.length; i++) {
        if (chk[i].checked) {
            SelectedItem += $(chk[i]).next('label').text() + ",";
            numChecked = numChecked + 1;
        }
    }


    SelectedItem = SelectedItem.substring(0, SelectedItem.lastIndexOf(','));
    disId.value = SelectedItem;

}

function GetCheckList(ChkList, HdnId, HdnTxt, ByText) {
    ChkList = document.getElementById(ChkList);
    HdnId = document.getElementById(HdnId);
    HdnTxt = document.getElementById(HdnTxt);
    var chk = ChkList.getElementsByTagName("INPUT");
    HdnId.value = ''; HdnTxt.value = '';
    if (chk != null) {
        for (var i = 0; i < chk.length; i++) {
            if (chk[i].checked) {
                if (ByText == null || ByText == typeof (undefined)) {
                    if (HdnId.value == '') HdnId.value = chk[i].value;
                    else HdnId.value = HdnId.value + ',' + chk[i].value;
                    if (HdnTxt.value == '') HdnTxt.value = "" + ChkList.getElementsByTagName("label")[i].innerHTML + "";
                    else HdnTxt.value = HdnTxt.value + ',' + "" + ChkList.getElementsByTagName("label")[i].innerHTML + "";
                }
                else {
                    if (HdnId.value == '') HdnId.value = "" + ChkList.getElementsByTagName("label")[i].innerHTML + "";
                    else HdnId.value = HdnId.value + ',' + "" + ChkList.getElementsByTagName("label")[i].innerHTML + "";
                }
            }
        }
    }
}

function AddOption(text, value, ddlmultiselect) {
    var option = document.createElement('option');
    option.value = value;
    option.innerHTML = text;
    ddlmultiselect.options.add(option);
}

var Selectedvalues = "";

function ClearAll(mode, control) {
    var elements = document.getElementsByTagName("input");
    var ddl = document.getElementsByTagName("select");
    var chkCollaboratorlist = $("#divCollaborator").find("INPUT[type=checkbox]");
    var chkClauselist = $("#divClause").find("INPUT[type=checkbox]");
    if (mode.toString().toLowerCase() == 'view') {
        $("#tblPiDetail thead tr th:last-child").css("display", "none");
        $("#tblPiDetail tbody tr td:last-child").css("display", "none");
        $("#tblCollaboratorDetail thead tr th:last-child").css("display", "none");
        $("#tblCollaboratorDetail tbody tr td:last-child").css("display", "none");
        $("#tblContract thead tr th:last-child").css("display", "none");
        $("#tblContract tbody tr td:last-child").css("display", "none");

    }
    if (mode.toString().toLowerCase() == 'new' || mode.toString().toLowerCase() == 'insert') {

        for (var ii = 0; ii < elements.length; ii++) {
            if (elements[ii].type == "text") {
                elements[ii].disabled = false;
                elements[ii].value = "";
            }
        }
        for (var i = 0; i < ddl.length; i++) {
            ddl[i].disabled = false;
            ddl[i].selectedIndex = 0;

        }
    }

    else if (mode.toString().toLowerCase() == 'delete' || mode.toString().toLowerCase() == 'view') {
        $(chkCollaboratorlist).each(function () {
            $(this).attr('disabled', 'disabled');
        });
        $(chkClauselist).each(function () {
            $(this).attr('disabled', 'disabled');
        });
        for (var ii = 0; ii < elements.length; ii++) {
            if (elements[ii].type == "text") {
                elements[ii].disabled = true;
            }
        }
        for (var i = 0; i < ddl.length; i++) {
            ddl[i].disabled = true;

        }
    }
    if (control != null) {
        var interval = setInterval(function () {

            if ($('#' + control + '').next("img").length > 0) {
                $('.datepicker').attr("disabled", "disabled");
                $('#' + control + '').next("img").attr("disabled", "disabled").css("opacity", "0.5")
                clearInterval(interval);
            }

        }, 100);

    }


}

function GetValues(_ModuleName, _A, _B, _C, _D, RetValue) {
    var url = Serviceurl + '/GetValidate';



    $.ajax({
        type: 'GET',
        url: url,
        data: JSON.stringify('{ "_ModuleName": "' + _ModuleName + '","_A" :"' + _A + '","_B" :"' + _B + '","_C" :"' + _C + '","_D":"' + _D + '" }'),
        async: false,
        contentType: "application/json; charset=utf-8",
        cache: false,
        crossDomain: true,
        dataType: 'json',
        success: function (response) {
            RetValue(response.d);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            RetValue(textStatus + ' :' + errorThrown);
        }
    });
}
function RetValue(values) {
    return values;
}

function FillDropDown(_ModuleName, _A, _B, _C, _D, DdlId) {
    var url = Serviceurl + '/GetValues';
    DdlId = document.getElementById(DdlId);
    $.ajax({
        type: 'GET',
        url: url,
        data: '{ "_ModuleName": "' + _ModuleName + '","_A" :"' + _A + '","_B" :"' + _B + '","_C" :"' + _C + '","_D":"' + _D + '" }',
        async: false,
        contentType: "application/json; charset=utf-8",
        cache: false,
        dataType: 'json',
        success: function (data) {
            DdlId.options.length = 0;
            AddOption("--Select--", '0', DdlId)
            var drop = data.d;
            for (var i = 0; i < drop.length; i++) {
                AddOption(drop[i].split(',')[0], drop[i].split(',')[1], DdlId)
            }
        },
        error: function (e) {
            MessageBox(e.statusText);
        }
    });
}

$(function () {
    /*Date picker script*/
    $(".datepicker").datepicker({
        buttonText: datePickerTitle,//$(this).attr('title')
        showOn: "both",
        buttonImage: "../Images/icon-cal.png",
        buttonImageOnly: true,
        changeMonth: true,
        changeYear: true,
        prevText: "",
        nextText: "",
        disabled: false,
        dateFormat: 'dd-M-yy'

    });
    /*Date picker script*/
    $(".datepicker").keydown(function () {

        return false;
    });
    $(".datepicker").on("paste", function () { return false; });
    $(".datepicker").on("cut", function () { return false; });
    $(".datepicker").on("delete", function () { return false; });
});

//function ApplyPaging(tableName, pagingDivId, PageCount) {
//    //Set the filter first column (ID) 
//    $('#' + tableName + ' thead tr th:last-child').css("background-image", "none");

//    $('#' + tableName + ' thead tr th:last-child').unbind();

//    var rowsShown = PageCount;
//    var rowsTotal = $('#' + tableName + ' tbody tr').length;
//    var numPages = rowsTotal / rowsShown;

//    var rowsCount = 0;
//    for (i = 0; i < Math.ceil(numPages) ; i++) {
//        var pageNum = i + 1;
//        if (i == 0) {
//            $('.pages').append('<a href="#" rel="' + i + '"> ι‹ </a> ');
//        }
//        if (pageNum == 1) $('.pages').append('<a href="#" rel="' + i + '"> « </a> ');

//        if (pageNum <= 5) {
//            $('.pages').append('<a href="#" rel="' + i + '">' + pageNum + '</a> ');
//        }


//        rowsCount++;


//        if (rowsCount == Math.ceil(numPages)) {
//            $('.pages').append('<a href="#" rel="' + i + '"> » </a> ');
//            $('.pages').append('<a href="#" rel="' + i + '"> ›ι </a> ');
//        }
//    }
//    $('#' + tableName + ' tbody tr').hide();
//    $('#' + tableName + ' tbody tr').slice(0, rowsShown).show();
//    $('.pages a:first').addClass('current-page');
//    $('.pages a').bind('click', function () {

//        $('.pages a').removeClass('current-page');
//        $(this).addClass('current-page');
//        var currPage = $(this).attr('rel');
//        var startItem = currPage * rowsShown;
//        var endItem = startItem + rowsShown;
//        $('#' + tableName + ' tbody tr').css('opacity', '1').hide().slice(startItem, endItem).
//							css('display', 'table-row').animate({ opacity: 1 }, 300);

//        $("#" + pagingDivId + " .page-info p label").text($(this).text());
//    });

//    //set the count values
//    var markup = '<h3>Total Records : ' + rowsTotal + '</h3>' +
//	'<p>Showing Page <label style="display:inline;s">1</label> of Total ' + rowsCount + ' Pages | <a class="link" >First Page</a> | <a class="link" >Last Page</a></p>';

//    $("#" + pagingDivId + " .page-info").html(markup);

//    $("#" + pagingDivId + " .page-info p a").eq(0).click(function () {
//        $("#" + pagingDivId + " .pages a:first-child").click();
//    });

//    $("#" + pagingDivId + " .page-info p a").eq(1).click(function () {
//        $("#" + pagingDivId + " .pages a:last-child").click();
//    });

//    if (rowsTotal < rowsShown) {
//        $("#" + pagingDivId + " p").css("display", "none");
//        $(".page-info .link").css("color", "grey").attr("disabled", true);
//    }

//}

function ApplyPaging(tableName, pagingDivId, rowsShown) {

    //Set the filter first column (ID) 
    if ($("#" + tableName + " tbody tr td").length > 0) {
        if ($("#" + tableName + " tbody tr td").html().toLowerCase().trim().replace(/ +/g, "") == "norecordsavailable") {
            $('[id*=Paging]').hide();
        }
        else {


            $('#' + tableName + ' thead tr th:last-child').css("background-image", "none");

            $('#' + tableName + ' thead tr th:last-child').unbind();

            var rowsShown = rowsShown;
            var rowsTotal = $('#' + tableName + ' tbody tr').length;
            var numPages = rowsTotal / rowsShown;

            var rowsCount = 0;
            for (i = 0; i < numPages; i++) {
                var pageNum = i + 1;
                $('.pages').append('<a href="#" rel="' + i + '">' + pageNum + '</a> ');
                rowsCount++;
            }
            $('#' + tableName + ' tbody tr').hide();
            $('#' + tableName + ' tbody tr').slice(0, rowsShown).show();
            $('.pages a:first').addClass('current-page');
            $('.pages a').bind('click', function () {

                $('.pages a').removeClass('current-page');
                $(this).addClass('current-page');
                var currPage = $(this).attr('rel');
                var startItem = currPage * rowsShown;
                var endItem = startItem + rowsShown;
                $('#' + tableName + ' tbody tr').css('opacity', '1').hide().slice(startItem, endItem).
                                    css('display', 'table-row').animate({ opacity: 1 }, 300);

                $("#" + pagingDivId + " .page-info p label").text($(this).text());
            });

            //set the count values
            var markup = '<h3> Total Records: ' + rowsTotal + ' </h3>' +
            '<p>Showing Page <label style="display:inline;s">1</label> of Total ' + rowsCount + ' Pages | <a class="link" >First Page</a> | <a class="link" >Last Page</a></p>';

            $("#" + pagingDivId + " .page-info").html(markup);

            $("#" + pagingDivId + " .page-info p a").eq(0).unbind("click").click(function () {
                //$("#" + pagingDivId + " .pages a:first-child").click();
                $(".paging .pages .prev5").next().click();

                $(".paging .pages a[class*=items]").hide();
                $(".paging .pages .items1").show();
                $(".paging .pages .prev5").addClass("nextPagingDisable");

                $(".paging .pages .next5").removeClass("nextPagingDisable");

                //if only 5 or less items are present
                if ($(".paging .pages a[class*=items]").length <= 5) {
                    $(".paging .pages .prev5").addClass("nextPagingDisable");
                    $(".paging .pages .next5").addClass("nextPagingDisable");
                }

            });

            $("#" + pagingDivId + " .page-info p a").eq(1).unbind("click").click(function () {
                //$("#" + pagingDivId + " .pages a:last-child").click();
                $(".paging .pages .next5").prev().click();
                var max = $(".paging .pages .next5").prev().attr("items");

                $(".paging .pages a[class*=items]").hide();
                $(".paging .pages .items" + max).show();
                $(".paging .pages .next5").addClass("nextPagingDisable");

                $(".paging .pages .prev5").removeClass("nextPagingDisable");

                //if only 5 or less items are present
                if ($(".paging .pages a[class*=items]").length <= 5) {
                    $(".paging .pages .prev5").addClass("nextPagingDisable");
                    $(".paging .pages .next5").addClass("nextPagingDisable");
                }
            });

            if (rowsTotal <= rowsShown) {
                $(".page-info .link").css("color", "grey").attr("disabled", true);

                $("#" + pagingDivId + " p").css("display", "none");
            }

            ApplyPagingToPaging(5);

        }
    }
    else {
        $('[id*=Paging]').hide();
    }

   
   

}

function ApplyPagingToPaging(NoOfPagesToShow) {

    var pagesShown = parseInt(NoOfPagesToShow);

    var linkCount = $(".paging .pages a").length;

    var pageClass = 1;

    //Add the class to differentiate paging items to be hide/shown
    $(".paging .pages a").each(function (ind, item) {

        var currIndex = parseInt(ind) + 1;

        $(item).addClass("items" + pageClass);

        $(item).attr("items", pageClass);

        if (currIndex % pagesShown == 0)
            pageClass++;
    });

    //Hide the extra links after initial ones
    $(".paging .pages a").not(".items1").hide();

    //Add the Next/Prev icons
    $(".paging .pages").prepend("<a class='prev5 nextprev' >ι‹</a>");
    $(".paging .pages").append("<a class='next5 nextprev' >  ›ι</a>");

    //Set the Next/Prev disable as per data
    var nextPagingDisable = "nextPagingDisable";

    $(".paging .pages .prev5").addClass(nextPagingDisable);
    if (linkCount <= pagesShown) {
        $(".paging .pages .next5").addClass(nextPagingDisable);
    }



    //Add the Events
    $(".paging .pages .prev5").click(function () {
        //var currItemNo = parseInt($(".paging .pages .current-page").attr("items"));
        var currItemNo = parseInt($(".paging .pages").find("[class*=items]:visible").attr("items"));

        if (currItemNo != 1) {
            var items = "items" + (currItemNo - 1);
            $(".paging .pages a").not(".nextprev").hide();
            $(".paging .pages ." + items).show();

            //To enable the Prev link on next click
            $(".paging .pages .next5").removeClass(nextPagingDisable);

            if (currItemNo - 2 == 0) {
                $(".paging .pages .prev5").addClass(nextPagingDisable);
            }
        }

    });

    $(".paging .pages .next5").click(function () {
        //var currItemNo = parseInt($(".paging .pages .current-page").attr("items"));
        var currItemNo = parseInt($(".paging .pages").find("[class*=items]:visible").attr("items"));

        var maxItem = parseInt($(".paging .pages .next5").prev().attr("items"));

        if (currItemNo != maxItem) {
            var items = "items" + (currItemNo + 1);
            $(".paging .pages a").not(".nextprev").hide();
            $(".paging .pages ." + items).show();

            //To enable the next link on Prev click
            $(".paging .pages .prev5").removeClass(nextPagingDisable);

            if (currItemNo + 1 == maxItem) {
                $(".paging .pages .next5").addClass(nextPagingDisable);
            }
        }
    });

}


function ReApplyPaging(tableName) {
    $('#' + tableName + ' thead tr th').click(function () {

        var currPage = $(".current-page").attr("rel");

        var oldText = $('#' + tableName + ' tbody tr').text();
        var a = setInterval(function () {

            var newText = $('#' + tableName + ' tbody tr').text();
            if (oldText != newText) {
                $("a[rel=" + currPage + "]").click();
                clearInterval(a);
            }
        }, 1);



    });
}

function Trim(str, len) {
    if (str.length > len)
        return str.slice(0, len) + "...";
    else
        return str;
}


function CheckChar(evt) {
    evt = (evt) ? evt : event;
    var charCode = (evt.charCode) ? evt.charCode : ((evt.KeyCode) ? evt.keyCode :
    ((evt.which) ? evt.which : 0));
    if (charCode > 31 && (charCode < 65 || charCode > 90 &&
    charCode < 97 && charCode > 122)) {
        return false;
    }
    return true;
}

function CheckNotInt(e) {
    isIE = document.all ? 1 : 0
    keyEntry = !isIE ? e.which : event.KeyCode;

    if (keyEntry > 47 && keyEntry <= 58) {
        MessageBox("Hello");
        return false;
    }
    else {
        return true;
    }
}

function checkDateNumber(scntrVal) {
    var Exp = '0123456789';
    for (var i = 0; i < Exp.length; i++) {
        if (scntrVal.trim().indexOf(Exp.charAt(i).trim()) > -1) {
            return true;
        }
    }
    return false;
}

function cmpDate(dat1, dat2) {
    var dtFrm = new Date(dat1.substring(6, 10), dat1.substring(3, 5), dat1.substring(0, 2));
    var dtTo = new Date(dat2.substring(6, 10), dat2.substring(3, 5), dat2.substring(0, 2));
    if (dtFrm > dtTo) {
        return false;
    }
    return true;
}

function ComDateWithEqual(dat1, dat2) {
    //var temp1 = "";
    //var temp2 = "";
    //var str1 = dat1;
    //var str2 = dat2;
    //var dt1 = str1.substring(0, 2);
    //var mon1 = str1.substring(3, 5);
    //var yr1 = str1.substring(6, 10);
    //var dt2 = str2.substring(0, 2);
    //var mon2 = str2.substring(3, 5);
    //var yr2 = str2.substring(6, 10);
    //temp1 = mon1 + "/" + dt1 + "/" + yr1;
    //temp2 = mon2 + "/" + dt2 + "/" + yr2;

    var cfd = Date.parse(dat1);
    var ctd = Date.parse(dat2);

    var date1 = new Date(cfd);
    var date2 = new Date(ctd);

    if (date1 >= date2) {
        return false;
    }

    return true;
}

function GetMaxDate(InputArr) {
    var newArr = new Array();
    var MaxDate = "";
    if (InputArr != null) {
        for (var i = 0; i < InputArr.length; i++) {
            var d = InputArr[i].split('-')[0];
            var m = InputArr[i].split('-')[1];
            var y = InputArr[i].split('-')[2];

            var NDate = RetMonthNo(m) + '/' + d + '/' + y
            newArr.push(NDate);
        }
    }
    newArr.sort().reverse();
    MaxDate = newArr[0];
    return MaxDate;
}


function ConvertDatetoMDY(inputdt) {
    var ndate = "";
    if (inputdt != null) {
        var d = inputdt.split('-')[0];
        var m = RetMonthNo(inputdt.split('-')[1]);
        var y = inputdt.split('-')[2];
        ndate = m + '/' + d + '/' + y;
    }
    return ndate;
}

function CompareDate(Date1, Date2, mMsgDate1, MsgDate2) {
    Date1 = document.getElementById(Date1);
    Date2 = document.getElementById(Date2);
    if (checkDateNumber(Date1.value)) {
        if (!CheckValidDate(Date1)) {
            Date1.value = '';
            Date1.focus();
            return false;
        }
    }
    if (checkDateNumber(Date2.value)) {
        if (!CheckValidDate(Date2)) {
            Date2.value = '';
            Date2.focus();
            return false;
        }
    }
    if (checkDateNumber(Date1.value) && checkDateNumber(Date2.value)) {
        if (!cmpDate(Date1.value, Date2.value)) {
            MessageBox(mMsgDate1 + ' should be less than or equal to ' + MsgDate2);
            Date1.value = '';
            Date1.focus();
            return false;
        }
    }
    return true;
}

function ProperSentenceInGrid(obj) {
    var StrName = obj.value.replace(/^\s+|\s+$/g, '');
    StrName = StrName.replace(StrName.substring(0, 1), StrName.substring(0, 1).toUpperCase())
    obj.value = StrName;
    return true;
}

function CheckAlphaNumericDate(date) {
    var d = date;
    var r = new RegExp("^([A-Za-z])+$");
    if (r.test(d)) {
        return false;
    }
}

function GetLeapYearDate(year, month) {
    var leapYear;
    var daysInMonth;
    var Dates;

    if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) leapYear = 'Yes'; else leapYear = 'No';
    if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12)
        daysInMonth = 31;
    else if (month == 4 || month == 6 || month == 9 || month == 11)
        daysInMonth = 30;
    if (month == 2 && leapYear == 'Yes') daysInMonth = 29; else daysInMonth = 28;
    Dates = daysInMonth + '/' + month + '/' + year;
    return Dates;
}

function GenerateNewDate(InputDate, txtSet, OutPutDate, TypeOfSet) {
    InputDate = document.getElementById(InputDate);
    txtSet = document.getElementById(txtSet);
    OutPutDate = document.getElementById(OutPutDate);
    if (InputDate.value.trim() != "") {
        if (!CheckValidDate(InputDate)) {
            InputDate.value = "";
            return false;
        }
    }
    if (InputDate.value.trim() != "" && txtSet.value.trim() != "") {
        var daysInMonth = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
        var MyDate = new Date(parseInt(InputDate.value.split('/')[2]), parseInt(InputDate.value.split('/')[1]), parseInt(InputDate.value.split('/')[0]));
        var myNewDate;
        if (TypeOfSet.trim().toLowerCase() == 'd') {
            var years = MyDate.getFullYear();
            // check for leap year (see if year divided by four leaves a remainder). If it is a leap year, add one day to February
            var remainder = years % 4;
            if (remainder == 0) {
                daysInMonth[1] = 29;
            }
            var months = MyDate.getMonth();
            var days = MyDate.getDate() + parseInt(txtSet.value);
            // check for roll over into next month, and then check that for roll into next year.        
            if (days > daysInMonth[months]) {
                days = days - daysInMonth[months];
                months++;
                if (months > 11) {
                    months = 0;
                    years++;
                }
            }
            // increment month to real month, not "Array" month
            months++;
            if (days < 10)
                days = "0" + days
            if (months < 10)
                months = "0" + months

            if (parseInt(months) <= 0) {
                months = '12';
            }
            myNewDate = days + "/" + months + "/" + years;
        }
        else if (TypeOfSet.trim().toLowerCase() == 'm') {
            var sumOfMonths = (parseInt(Number(InputDate.value.split('/')[1])) + parseInt(Number(txtSet.value)));
            var newMonth = ((sumOfMonths) % 12);
            if (newMonth <= 0)
                newMonth = 12;
            var newYear = parseInt(Number(InputDate.value.split('/')[2])) + (((sumOfMonths) - ((sumOfMonths) % 12)) / 12);
            var newDays = parseInt(Number(InputDate.value.split('/')[0]));
            if (newDays == 29 && newMonth == 2) {
                var remainder = newYear % 4;
                if (remainder != 0) {
                    newDays = 28;
                }
            }

            if (newDays < 10) {
                myNewDate = "0" + newDays + '/';
            } else {
                myNewDate = newDays + '/';
            }
            if (newMonth < 10) {
                myNewDate = myNewDate + "0" + newMonth + '/';
            } else {
                myNewDate = myNewDate + newMonth + '/';
            }

            myNewDate = myNewDate + newYear;
        }
        else if (TypeOfSet.trim().toLowerCase() == 'y') {
            var newMonth = parseInt(Number(InputDate.value.split('/')[1]));
            var newYear = (parseInt(Number(InputDate.value.split('/')[2])) + parseInt(Number(txtSet.value)));
            var newDays = parseInt(Number(InputDate.value.split('/')[0]));
            if (newDays == 29 && newMonth == 2) {
                var remainder = newYear % 4;
                if (remainder != 0) {
                    newDays = 28;
                }
            }

            if (newDays < 10) {
                myNewDate = "0" + newDays + '/';
            } else {
                myNewDate = newDays + '/';
            }
            if (newMonth < 10) {
                myNewDate = myNewDate + "0" + newMonth + '/';
            } else {
                myNewDate = myNewDate + newMonth + '/';
            }

            myNewDate = myNewDate + newYear;
        }
        var ChangeDate = new Date(parseInt(myNewDate.split('/')[2]), parseInt(myNewDate.split('/')[1]), parseInt(myNewDate.split('/')[0]));
        var changeyears = ChangeDate.getFullYear();
        // check for leap year (see if year divided by four leaves a remainder). If it is a leap year, add one day to February
        var remainder = changeyears % 4;
        if (remainder == 0) {
            daysInMonth[1] = 29;
        }
        var changeDay;
        if (parseInt(myNewDate.split('/')[0]) == 1)
            changeDay = parseInt(daysInMonth[parseInt(myNewDate.split('/')[1]) - 1]);
        else
            changeDay = parseInt(myNewDate.split('/')[0]) - 1;

        if (changeDay < 10)
            changeDay = "0" + changeDay;
        OutPutDate.value = changeDay + '/' + myNewDate.split('/')[1] + '/' + myNewDate.split('/')[2];
    }
}

function CountCheckCheckboxInGridview(controlId) {
    var inputList = controlId.getElementsByTagName("input");
    var numChecked = 0;

    for (var i = 0; i < inputList.length; i++) {
        if (inputList[i].type == "checkbox" && inputList[i].checked) {
            numChecked = numChecked + 1;
        }
    }
    return numChecked;
}

function GetTabValue(obj, Val, HdnTab, lblHeader, strHeader) {
    var OldTabName = HdnTab;
    var OldlblHeader = lblHeader;
    if (HdnTab != null) {
        var HdnTab = obj.id.split("_")[obj.id.split("_").length - 1];
        HdnTab = obj.id.replace(HdnTab, OldTabName);
        HdnTab = document.getElementById(HdnTab);
        HdnTab.value = Val;
    }

    if (lblHeader != null) {
        var lblHeader = obj.id.split("_")[obj.id.split("_").length - 1];
        lblHeader = obj.id.replace(lblHeader, OldlblHeader);
        lblHeader = document.getElementById(lblHeader);
        lblHeader.innerHTML = strHeader;
    }

    return false;
}

function GetTabValueWithShowDiv(obj, Val, HdnTab, DivName, TabName, TotalTab, gv, lblHeader, strHeader) {
    var OldHdnVal = HdnTab;
    var OldlblHeader = lblHeader;
    var OldDivName = DivName;
    var OldTabName = TabName;
    if (HdnTab != null) {
        var HdnTab = obj.id.split("_")[obj.id.split("_").length - 1];
        HdnTab = obj.id.replace(HdnTab, OldHdnVal);
        HdnTab = document.getElementById(HdnTab);
        HdnTab.value = Val;
    }

    if (lblHeader != null) {
        var lblHeader = obj.id.split("_")[obj.id.split("_").length - 1];
        lblHeader = obj.id.replace(lblHeader, OldlblHeader);
        lblHeader = document.getElementById(lblHeader);
        lblHeader.innerHTML = strHeader;
    }
    if (DivName != null) {
        for (var i = 0; i < TotalTab; i++) {

            var objName = obj.id.split("_")[obj.id.split("_").length - 1];
            objName = obj.id.replace(objName, DivName + i.toString());
            objName = document.getElementById(objName);
            objName.style.display = 'none';

            var objTab = obj.id.split("_")[obj.id.split("_").length - 1];
            objTab = obj.id.replace(objTab, TabName + i.toString());
            objTab = document.getElementById(objTab);
            if (objTab != null) {
                objTab.className = "";
                objTab.className = "TabInActive";
            }
        }
        var DivName = obj.id.split("_")[obj.id.split("_").length - 1];
        DivName = obj.id.replace(DivName, OldDivName + Val.toString());
        DivName = document.getElementById(DivName);
        DivName.style.display = 'block';

        var TabName = obj.id.split("_")[obj.id.split("_").length - 1];
        TabName = obj.id.replace(TabName, OldTabName + Val.toString());
        TabName = document.getElementById(TabName);
        if (TabName != null) {
            TabName.className = "";
            TabName.className = "TabActive";
        }
    }
    return false;
}

function RestrictPower(e) {
    var unicode = e.charCode ? e.charCode : e.keyCode
    if (unicode == 94) { //if the key isn't the backspace key (which we should allow)
        return false;
    }
}

function MessageBox(msg) {
    hideLoading();
    setTimeout(function () {
        var interval = setInterval(function () {

            if ($("#dialog-message").length >= 1) {

                $("#dialog-message").html(msg);

                $("#dialog-message").dialog({
                    modal: true,
                    resizable: false,
                    height: 180,
                    width: 380,
                    title: "Message",
                    buttons: {
                        Ok: function () {
                            $(this).dialog("close");
                        }
                    }
                });

                //clear the interval
                clearInterval(interval);

            }
        }, 100)
    }, 500);
}




//Redirect to Project Details page on Ok event of Dialog box.
function MessageBoxEvent(msg, func) {
    hideLoading();
    var interval = setInterval(function () {

        if ($("#dialog-message").length >= 1) {

            $("#dialog-message").html(msg);

            $("#dialog-message").dialog({
                modal: true,
                resizable: false,
                height: 180,
                width: 450,
                title: "Message",
                buttons: {
                    Ok: function () {
                        $(this).dialog("close");
                        eval(func);
                        // execScript(func);
                    }
                }
            });

            //clear the interval
            clearInterval(interval);

        }
    }, 100);

}

function ConfirmBox(msg, func) {
    hideLoading();
    var flag = false;
    $("#dialog-message").html(msg);

    $("#dialog-message").dialog({
        modal: true,
        resizable: false,
        height: 180,
        width: 450,
        title: "Message",
        buttons: {
            "Yes": function () {
                $(this).dialog("close");
                eval(func);
                // execScript(func);
            },
            "No": function () {
                $(this).dialog("close");
                flag = false;
            }
        }
    });

    return flag;

}

function SaveMessageBox(msg) {
    hideLoading();
    var interval = setInterval(function () {

        if ($("#dialog-message").length >= 1) {

            $("#dialog-message").html(msg);

            $("#dialog-message").dialog({
                modal: true,
                resizable: false,
                height: 180,
                width: 450,
                title: "Message",
                buttons: {
                    Ok: function () {
                        $(this).dialog("close");
                        return true;
                    }
                }
            });

            //clear the interval
            clearInterval(interval);

        }
    }, 100);

}

//To convert the month name to its numeric value | Ejaz Waquif DT:8/26/2014
function ConvertMonthNameToNumeric(name) {
    switch (name) {

        case "Jan": return 1;
            break;

        case "Feb": return 2;
            break;

        case "Mar": return 3;
            break;

        case "Apr": return 4;
            break;

        case "May": return 5;
            break;

        case "Jun": return 6;
            break;

        case "Jul": return 7;
            break;

        case "Aug": return 8;
            break;

        case "Sep": return 9;
            break;

        case "Oct": return 10;
            break;

        case "Nov": return 11;
            break;

        case "Dec": return 12;
            break;

    }
}

$(document).ready(function () {

    HighlightActiveNav();

    //To bind the original result set on search text clear
    ClearSearchOnBlank();

    setTimeout(function () {
        $("input[disabled=disabled]").next("img").attr("disabled", true).css("opacity", 0.5);
    }, 100);

    BindSignOut();
});
//Set active navigation link
function HighlightActiveNav() {
    var url = window.location.href.toLowerCase();

    if (url.indexOf('dashboard.aspx') != -1) {
        $('.msc-nav .static .static:eq(0) .dropmenudiv').css("background-color", "#0ca4b8");
    }
    else if (url.indexOf("frmproject_master.aspx") != -1 || url.indexOf("feasibilitydetails.aspx") != -1 || url.indexOf("ethicdetails.aspx") != -1 || url.indexOf("selectedproject.aspx") != -1) {
        $('.msc-nav .static .static:eq(2) .dropmenudiv').css("background-color", "#0ca4b8");
    }
    else if (url.indexOf("frmcontractmgmt_projectuser.aspx") != -1 || url.indexOf('frmcontractmgmt_contractusers.aspx') != -1) {
        $('.msc-nav .static .static:eq(4) .dropmenudiv').css("background-color", "#0ca4b8");
    }
    else if (url.indexOf("frmregulatory.aspx") != -1) {
        $('.msc-nav .static .static:eq(6) .dropmenudiv').css("background-color", "#0ca4b8");
    }
    else if (url.indexOf("frmgrant_application.aspx") != -1 || url.indexOf("frmgrantdetailsform.aspx") != -1 || url.indexOf("frmgrantseniorcscs.aspx") != -1) {
        $('.msc-nav .static .static:eq(8) .dropmenudiv').css("background-color", "#0ca4b8");
    }
    else if (url.indexOf("frm_dms.aspx") != -1) {
        $('.msc-nav .static .static:eq(10) .dropmenudiv').css("background-color", "#0ca4b8");
    }
    else if (url.indexOf("reports.aspx?report=auditreport") != -1) {
        $('.msc-nav .static .static:eq(12) .dropmenudiv').css("background-color", "#0ca4b8");
    }
    else if (url.indexOf("menumastermappping.aspx") != -1) {
        $('.msc-nav .static .static:eq(14) .dropmenudiv').css("background-color", "#0ca4b8");
    }
    else {
        $('.msc-nav .static .static:eq(16) .dropmenudiv').css("background-color", "#0ca4b8");
    }
}

//To bind the original result set on search text clear
function ClearSearchOnBlank() {
    $("[id*=txtSearch]").keyup(function () {
        if ($(this).val() == "") {
            var script = $("[id*=btnClear]").attr("href");
            setTimeout(script, 0);

        }
    });
    $("[id*=txtSearch]").bind("mouseup", function (e) {
        var $input = $(this),
         oldValue = $input.val();

        if (oldValue == "") return;

        // When this event is fired after clicking on the clear button
        // the value is not cleared yet. We have to wait for it.
        setTimeout(function () {
            var newValue = $input.val();

            if (newValue == "") {
                var script = $("[id*=btnClear]").attr("href");
                setTimeout(script, 0);
                $input.trigger("cleared");
            }
        }, 1);
    });
}

function CalGreaterDate(dat1, dat2) {
    var cfd = Date.parse(dat1);
    var ctd = Date.parse(dat2);

    var date1 = new Date(cfd);
    var date2 = new Date(ctd);

    if (Date.parse(date1) > Date.parse(date2)) {
        return false;
    }
    else if (Date.parse(date1) === Date.parse(date2)) {
        return false;
    }

    return true;
}

//Add Signout button
function BindSignOut() {

    var navInterval = setInterval(function () {

        var filler = '<li class="has-popup static" role="menuitem" aria-haspopup="UserMenu:submenu:logout" style="float: left; position: relative;"><a tabindex="-1" class="level1 dropmenudiv static parent userName"  ></a><ul class="level2 dynamic"  style="left: 0px; top: 100%; display: none; position: absolute;">'
        + '<li class="dynamic" role="menuitem" style="position: relative;"><a tabindex="-1" class="level2 msc-nav dynamic"  ></a></li>'
            + '</ul></li>';

        var markup = '<li class="has-popup static pull-right" role="menuitem" aria-haspopup="UserMenu:submenu:logout" style="float: left; position: relative;"><a tabindex="-1" class="level1 dropmenudiv static parent userName"  >' + $("[id*=hdnUserName]").val() + '</a><ul class="level2 dynamic" id="UserMenu:submenu:logout" style="left: 0px; top: 100%; display: none; position: absolute;">'
        + '<li class="dynamic" role="menuitem" style="position: relative;"><a tabindex="-1" class="level2 msc-nav dynamic" onclick="logout();" >Sign Out</a></li>'
            + '</ul></li> ';

        if ($(".msc-nav ul.level1").length > 0) {

            $(".msc-nav ul.level1").append(markup);
            //$(".nav-container").append(markup);


            $(".pull-right").unbind("mouseover", "mouseenter");

            clearInterval(navInterval);
        }

    }, 100);

    var intervalMouseOver = setInterval(function () {

        if ($(".pull-right").length > 0) {

            $(".pull-right").mouseover(function (e) {

                $("[id*='UserMenu:submenu']").hide();

                $(".hover").removeClass("hover");

                $(".highlighted").removeClass("highlighted");

                $(".pull-right").css("background-color", "#333333").find("ul").show();

                $(".pull-right").addClass("hover");

                $(".pull-right").addClass("highlighted");

            });
            $(".pull-right").mouseleave(function (e) {

                $(".pull-right").css("background-color", "#0bbed5").find("ul").hide();

                $(".pull-right").removeClass("hover");

                $(".pull-right").removeClass("highlighted");

            });
            clearInterval(intervalMouseOver);
        }

    }, 100);

}

function logout() {

    $("[id*=btnLogout]").click();
}

//Show Loading Function
function showLoading() {

    $.blockUI({
        message: '<table><tr><td>' + '<img src="../Images/ajax-loader (2).gif" style="width:auto;"/><div><h2 style="color:white;font-size:16px;margin-top:3px;">Please Wait...</h2></div></td></tr></table>',
        fadeIn: 0,
        css: {
            border: '1px solid black', //border: '1px solid #fbb600',
            padding: '5px 10px 20px 10px',
            //backgroundColor: '#000',
            backgroundColor: '#0bbed5',
            '-webkit-border-radius': '10px',
            '-moz-border-radius': '10px',
            'border-top-left-radius': '10px',
            'border-top-right-radius': '10px',
            'border-bottom-right-radius': '10px',
            'border-bottom-left-radius': '10px',
            opacity: 0.7,
            color: '#fff',
            width: '120px',
            height: '8px',
            top: ($(window).height() - 40) / 2 + 'px',
            left: ($(window).width() - 40) / 2 + 'px'
        }
    });

    $(".blockMsg").css({ "background-color": "transparent", "border-style": "none" });

}

//Hide Loading Function
function hideLoading() {
    $.unblockUI();
}

//window.onpaint = initApplication();

document.onreadystatechange = function () {
    if (document.readyState == "interactive") {
        var url = window.location.href.toLowerCase();
        if (url.indexOf("reports") != -1 || url.indexOf("selectedprojectbarchartrpt") != -1) {

        }
        else {
            initApplication(); SetTitleGlobally();
        }


    }
    else if (document.readyState == "complete") {
        Afterloaded();
    }
}
function initApplication() {
    showLoading();
}
function Afterloaded() {
    setTimeout('hideLoading()', 1000);
}

$(window).load(function () {
    var url = window.location.href.toLowerCase();
    if (url.indexOf("reports") != -1 || url.indexOf("selectedprojectbarchartrpt") != -1) {

    }
    else {
        initApplication(); SetTitleGlobally();
    }
});

$(function () {
    // var waitMsg = $("div[id$='AsyncWait_Wait']");
    // waitMsg.wrap("<div style='display:none; visibility: hidden !important'></div>");
});

function SetTitleGlobally() {
    $('body input[type=text],textarea,select').each(function (index, item) {
        $(item).attr('title', $(item).parent().find('label').text().trim().replace('*', ''));

    });

    $('body input[type=submit]').each(function (index, item) {
        $(item).attr('title', $(item).val().trim().replace('*', ''));

    });
}