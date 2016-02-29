"use strict;"


function GetId(_ModuleName, _A, _B, _C, _D, RetValue) {
    var url = "../PageMethods.aspx/GetValidate";
    $.ajax({
        type: "POST",
        url: url,
        data: '{ "_ModuleName": "' + _ModuleName + '","_A" :"' + _A + '","_B" :"' + _B + '","_C" :"' + _C + '","_D":"' + _D + '" }',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            RetValue(result.d);
        },
        error: function (result) {
            MessageBox("error " + result);
        }
    });

}
function RetValue(values) {
    return values;
}



function SearchText(TxtBox, HdnId, count, Contextkey, ReturnValues, HdnTxt) {
    var Txtboxvalue = document.getElementById(TxtBox);
    var Txt = $('#' + TxtBox + '');
    var url = "../PageMethods.aspx/GetText";
    Txt.autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: url,
                data: "{'Prefix':'" + Txtboxvalue.value + "','count':'" + count + "','ContextKey':'" + Contextkey + "'}",
                dataType: "json",
                success: function (data) {

                    response($.map(data.d, function (item) {
                        return {
                            label: item.split('^')[1],
                            val: item.split('^')[0]

                        }
                    }))

                    var width = Txt.css("width");
                    var interval = setInterval(function () {
                        if ($(".ui-autocomplete").length > 0) {
                            $(".ui-autocomplete").css("width", width);
                            clearInterval(interval);
                        }
                    }, 100);
                },
                error: function (result) {
                    MessageBox("Something went Wrong..!!");
                }
            });
        }, select: function (event, ui) {
            if (HdnTxt != null && HdnTxt != undefined && HdnTxt != "") {
                $('#' + HdnTxt + '').val(ui.item.label);
            }
            Selectedvalues = ui.item.label + '|' + ui.item.val;
            if (HdnId != null && HdnId != typeof (undefined) && HdnId != "") {
                $('#' + HdnId + '').val(ui.item.val);
            }
            if (ui.item == null) {
                if (ReturnValues != null && ReturnValues != typeof (undefined) && ReturnValues != "") {
                    ReturnValues(null);
                    // $(this).blur();
                }
            }
            else {
                if (ReturnValues != null && ReturnValues != typeof (undefined) && ReturnValues != "") {
                    ReturnValues(Selectedvalues);
                    //  $(this).blur();
                }
            }
            return true;
        }

    });

}



function GetValidatefrmDB(HdnfldId, _ModuleName, _A, _B, _C, _D) {
    var HdnfldId = (HdnfldId != null) ? document.getElementById(HdnfldId) : null;
    var msg = "";
    _ModuleName = (_ModuleName == null) ? "" : _ModuleName;
    var ControlId = document.getElementById(_A);
    if (ControlId != null) {
        if (ControlId.value == "") {
            //MessageBox("Value could not be Blank..!!");
            //ControlId.focus();
            return false;
        }
        _A = ControlId.value;
    }
    else {
        _A = (_A == null) ? "" : _A;
    }
    _B = (_B == null) ? "" : _B;
    _C = (_C == null) ? "" : _C;
    _D = (_D == null) ? "" : _D;
    if (HdnfldId != null)
        HdnfldId.value = '';
    var url = "../PageMethods.aspx/GetValidate";

    $.ajax({
        type: 'POST',
        url: url,
        data: '{ "_ModuleName": "' + _ModuleName + '","_A" :"' + _A + '","_B" :"' + _B + '","_C" :"' + _C + '","_D":"' + _D + '" }',
        async: false,
        contentType: "application/json; charset=utf-8",
        cache: false,
        dataType: 'json',
        success: function (response) {
            if (response.d == '#Error') {
                MessageBox('Exception occured while fetching record..!!');
                if (HdnfldId != null)
                    HdnfldId.value = "#Error";
                return false;
            }
            else {
                if (response.d != '') {
                    if (response.d.toString().indexOf('|') > -1) {
                        if (response.d.toString().split('|').length == 2) {
                            MessageBox(response.d.toString().split('|')[0] + '\n' + response.d.toString().split('|')[1]);
                            msg = response.d.toString().split('|')[0] + '\n' + response.d.toString().split('|')[1];
                            return false; // (ControlId != null) ? ControlId.focus() : "";
                        }
                        else if (response.d.toString().split('|').length == 3) {
                            MessageBox(response.d.toString().split('|')[0] + '\n' + response.d.toString().split('|')[1] + '\n' + response.d.toString().split('|')[2]);
                            msg = response.d.toString().split('|')[0] + '\n' + response.d.toString().split('|')[1] + '\n' + response.d.toString().split('|')[2]
                            return false;// (ControlId != null) ? ControlId.focus() : "";
                        }
                        else if (response.d.toString().split('|').length == 4) {
                            MessageBox(response.d.toString().split('|')[0] + '\n' + response.d.toString().split('|')[1] + '\n' + response.d.toString().split('|')[2] + '\n' + response.d.toString().split('|')[3]);
                            msg = response.d.toString().split('|')[0] + '\n' + response.d.toString().split('|')[1] + '\n' + response.d.toString().split('|')[2] + '\n' + response.d.toString().split('|')[3]
                            return false;// (ControlId != null) ? ControlId.focus() : "";
                        }
                        else {
                            MessageBox(response.d);
                            msg = response.d;
                            return false;
                            //(ControlId != null) ? ControlId.focus() : "";
                        }
                    }
                    else {
                        MessageBox(response.d);
                        msg = response.d;
                        return false;
                        if (HdnfldId != null)
                            HdnfldId.value = "#Error";
                        //(ControlId != null) ? ControlId.focus() : "";
                    }
                }
            }
        },
        error: function (e) {
            MessageBox('Exception occured while cheching record..!!');
            if (HdnfldId != null)
                HdnfldId.value = "#Error";
            return false;
        }
    });
    return msg;
}


function Callhandler(url, path) {
    
   
    var downloadpath = url + '?fileName=' + path;
    window.location = downloadpath;
   setTimeout('hideLoading()', 100);
    return false;
}