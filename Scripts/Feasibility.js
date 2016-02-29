/// <reference path="../EthicDetails.aspx" />
/// <reference path="../EthicDetails.aspx" />

$(document).ready(function () {


    ApplyScript();


});


function ApplyScript() {


    /*Script for Expand Collapse*/
    $('.frmHead').click(function () {

        if ($(".frmAddMorePIDetails").is(":visible")) {
            $(".newPI").click();
            return false;
        }

        var frmName = $(this).attr('data-frm');
        var h3Obj = $(this);
        $('.' + frmName).slideToggle("slow", function () {
            if ($(this).is(':visible')) {
                h3Obj.find('span').text('( - )');
            } else {
                h3Obj.find('span').text('( + )');
            }
        });


        if (frmName == "frmPI") {
            if ($('.frmNewPIDetails').is(':visible')) {
                $('.newPI').attr('type', '');
                $('.frmNewPIDetails').slideToggle("slow");
                $('.newPI').text('Record New PI Details');
                $('.newPI').prev("span").text("+");
            }
        }
    });

    $('.newPI').click(function () {
        var frmName = $(this).attr('data-frm');

        //Clear all the textboxes
        $(".frmNewPIDetails input[type=text]").val("");

        if ($(this).attr('type') == "addmore") {
            $('.frmPI').show();
            $('.newPI').text('Record New PI Details');
            $('.newPI').prev("span").text("+");
            $('.frmAddMorePIDetails').hide();
            $(this).attr('type', '');
            return;
        }

        if ($('.frmPI').is(':visible')) {
            $('.frmPI').slideToggle("slow");
        }


        $('.frmNewPIDetails').slideToggle("slow", "swing", function () {
            if ($('.frmNewPIDetails').is(':visible')) {
                $('.newPI').text('Cancel Recording New PI Details');
                $('.newPI').prev("span").text("-");

            } else {
                $('.newPI').text('Record New PI Details');
                $('.newPI').prev("span").text("+");
                $('.frmPI').show();
            }
        });

    });
    /*Script for Expand Collapse*/

    ApplyTableSorter();

    ApplyPaging('tblResposive', 'projectPaging', 10);

    var pagingInterval = setInterval(function () {

        if ($(".header").length > 0) {
            ReApplyPaging('tblResposive');
            clearInterval(pagingInterval);
        }
    }, 100);


    if ($(".FeasibilityContainer").is(":visible")) {

        ApplyDatePicker();

        ApplyAutoComplete();

        ApplyEvents();

        ApplyFileUpload();

    }
    else //For project grid
    {

        if ($("#tblResposive tbody tr").length == 0) {
            $('[id*=MainContent_SearchBox_txtSearch]').val('');
            $("#tblResposive tbody").html("<tr><td colspan='6' > No Records Available <td></tr>");
            $("#tblResposive thead th").css("background-image", "none");
            $("#tblResposive thead th").unbind("click");


        }
    }


}

function ApplyDatePicker() {
    /*Date picker script*/
    $(".datepicker").datepicker({
        buttonText: datePickerTitle,
        showOn: "both",
        buttonImage: "Images/icon-cal.png",
        buttonImageOnly: true,
        changeMonth: true,
        changeYear: true,
        prevText: "",
        nextText: "",
        dateFormat: 'dd-M-yy'

    });
    /*Date picker script*/


    $(".datepicker").keydown(function () {

        return false;
    });
    $(".datepicker").on("paste", function () { return false; });
    $(".datepicker").on("cut", function () { return false; });
    $(".datepicker").on("delete", function () { return false; });

}

/*Add More PI*/

function AddMorePI() {

    //Clear all the textboxes
    $(".frmAddMorePIDetails input[type=text]").val("");

    $('.newPI').attr("type", 'addmore');
    var frmName = $(this).attr('data-frm');

    if ($('.frmPI').is(':visible')) {
        $('.frmPI').slideToggle("slow");
    }


    $('.frmAddMorePIDetails').slideToggle("slow", "swing", function () {
        if ($('.frmAddMorePIDetails').is(':visible')) {
            $('.newPI').text('Cancel Adding PI Record');
            $('.newPI').prev("span").text("-");
        } else {
            $('.newPI').text('Record New PI Details');
            $('.newPI').prev("span").text("+");
        }
    });

    ClearPiDetails();

}

function AddMoreCRA() {

    //Clear all the textboxes
    $(".frmAddMorePIDetails input[type=text]").val("");

    $('.newPI').attr("type", 'addmore');
    var frmName = $(this).attr('data-frm');

    if ($('.frmPI').is(':visible')) {
        $('.frmPI').slideToggle("slow");
    }


    $('.frmAddMorePIDetails').slideToggle("slow", "swing", function () {
        if ($('.frmAddMorePIDetails').is(':visible')) {
            $('.newPI').text('Cancel Adding PI Record');
            $('.newPI').prev("span").text("-");
        } else {
            $('.newPI').text('Record New PI Details');
            $('.newPI').prev("span").text("+");
        }
    });

}

function ApplyAutoComplete() {


    var TxtNewDepartment = $("[id*=TxtNewDepartment]").attr("id"); //document.getElementById('<%=TxtNewDepartment.ClientID%>');
    var HdnNewDeptId = $("[id*=HdnNewDeptId]").attr("id");//document.getElementById('<%=HdnNewDeptId.ClientID%>');

    var TxtDepartment = $("[id*=TxtDepartment]").attr("id"); //document.getElementById('<%=TxtDepartment.ClientID%>');
    var HdnDeptId = $("[id*=HdnDeptId]").attr("id"); //document.getElementById('<%=HdnDeptId.ClientID%>');

    SearchText(TxtNewDepartment, HdnNewDeptId, 10, "Department~spAutoComplete");
    SearchText(TxtDepartment, HdnDeptId, 10, "Department~spAutoComplete",  FillPi);


    var TxtSponsor = $("[id*=txtSponsorName]").attr("id");
    var HdnSponsorID = $("[id*=hdnSponsorID]").attr("id");
    var HdnSponsorTxt = $("[id*=HdnSponsorTxt]").attr("id");
    SearchText(TxtSponsor, HdnSponsorID, 10, "Sponsor~spAutoComplete","",HdnSponsorTxt);

    var TxtCRO = $("[id*=txtCRO]").attr("id");
    var HdnCROID = $("[id*=hdnCROID]").attr("id");
    var HdnCROTxt = $("[id*=HdnCROTxt").attr("id");
    SearchText(TxtCRO, HdnCROID, 10, "CRO~spAutoComplete","", HdnCROTxt);

    //var cro

    //$("[id*=TxtDepartment]").blur(function () {

    //    FillPi(null);
    //});


    //BindCoordinator();
    //ClearAll();

}

function FillPi(result) {
    var TxtPIName = $("[id*=TxtPIName]").attr("id");
    var HdnpiId = $("[id*=HdnpiId]").attr("id");

    //var deptID = $("[id*=HdnDeptId]").attr("id");

    var DeptId = result != null ? result.split('|')[1] : result;
    SearchText(TxtPIName, HdnpiId, 10, "FillPi~spAutoComplete~" + DeptId, fillPiDetails);
    //SearchText(TxtBox, HdnId, count, Contextkey, PageName, ReturnValues)
}

function fillPiDetails(result) {
    var ID = (result != null) ? result.split('|')[1] : result;
    txtPIEmail = $("[id*=txtPIEmail]").attr("id"); //document.getElementById('<%=txtPIEmail.ClientID%>').id;
    txtPiPhoneNo = $("[id*=txtPiPhoneNo]").attr("id"); //document.getElementById('<%=txtPiPhoneNo.ClientID%>').id;
    txtPiMCRNo = $("[id*=txtPiMCRNo]").attr("id"); //document.getElementById('<%=txtPiMCRNo.ClientID%>').id;
    GetPI_MasterDetailsByID(ID, txtPIEmail, txtPiPhoneNo, txtPiMCRNo)
}

//function SearchText(TxtBox, HdnId, count, Contextkey, PageName, ReturnValues) {
//    var Txtboxvalue = document.getElementById(TxtBox);
//    var Txt = $('#' + TxtBox + '');
//    var url = PageName + ".aspx/GetText";

//    Txt.autocomplete({
//        source: function (request, response) {
//            $.ajax({
//                type: "POST",
//                contentType: "application/json; charset=utf-8",
//                url: url,
//                data: "{'Prefix':'" + Txtboxvalue.value + "','count':'" + count + "','ContextKey':'" + Contextkey + "'}",
//                dataType: "json",
//                success: function (data) {
//                    response($.map(data.d, function (item) {
//                        return {
//                            label: item.split('^')[1],
//                            val: item.split('^')[0]

//                        }
//                    }))
//                },
//                error: function (result) {
//                    alert("Error");
//                }
//            });
//        }, select: function (event, ui) {

//            Selectedvalues = ui.item.label + '|' + ui.item.val;
//            if (HdnId != null && HdnId != typeof (undefined) && HdnId != "") {
//                $('#' + HdnId + '').val(ui.item.val);
//            }
//            //Txt.blur();

//            if (ui.item == null) {
//                if (ReturnValues != null && ReturnValues != typeof (undefined) && ReturnValues != "") {
//                    ReturnValues(null);
//                }
//            }
//            else {
//                if (ReturnValues != null && ReturnValues != typeof (undefined) && ReturnValues != "") {
//                    ReturnValues(Selectedvalues);
//                }
//            }
//            return true;
//        },
//        change: function (event, ui) {
//            //if (ui.item == null) {
//            //    if (ReturnValues != null && ReturnValues != typeof (undefined) && ReturnValues != "") {
//            //        ReturnValues(null);
//            //    }
//            //}
//            //else {
//            //    if (ReturnValues != null && ReturnValues != typeof (undefined) && ReturnValues != "") {
//            //        ReturnValues(Selectedvalues);
//            //    }
//            //}
//        }


//    });

//}

function GetPI_MasterDetailsByID(ID, txtPIEmail, txtPiPhoneNo, txtPiMCRNo) {

    txtPIEmail = document.getElementById(txtPIEmail);
    txtPiPhoneNo = document.getElementById(txtPiPhoneNo);
    txtPiMCRNo = document.getElementById(txtPiMCRNo);
    var ID = (ID != null) ? ID : 0;
    if (parseInt(ID) > 0) {
        $.ajax({
            cache: false,
            async: true,
            type: "POST",
            dataType: "json",
            timeout: 1000,
            url: "../PageMethods.aspx/GetPI_MasterDetailsByID",
            data: '{ "ID": "' + ID + '" }',
            contentType: "application/json;charset=utf-8;",
            success: function (r) {
                var customers = eval(r.d);
                txtPIEmail.value = customers[0].s_Email;
                txtPiPhoneNo.value = customers[0].s_Phone_no;
                txtPiMCRNo.value = customers[0].s_MCR_No;

            },
            error: function (e) { alert(e.statusText); }
        });
    }
    else {
        txtPIEmail.value = "";
        txtPiPhoneNo.value = "";
        txtPiMCRNo.value = "";
    }
}

function SaveMorePiClick() {
    if (validate('.frmAddMorePIDetails')) {

        var flag = true;
        $("#tblPiDetail tbody tr").each(function () {

            if ($(this).attr("piid") == $("[id*=HdnpiId]").val()) {
                MessageBox("PI already added");
                flag = false;
            }
        });
        if (!flag) {
            return false;
        }

        if ($("[id*=HdnDeptId]").val() == "") {
            MessageBox("Please select Department from search result");
            return false;
        }

        if ($("[id*=HdnpiId]").val() == "") {
            MessageBox("Please select PI Name from search result");
            return false;
        }

        SaveMorePi($("[id*=TxtDepartment]").attr("id"), $("[id*=TxtPIName]").attr("id"), $("[id*=txtPIEmail]").attr("id"), $("[id*=txtPiPhoneNo]").attr("id"), $("[id*=txtPiMCRNo]").attr("id"), $("[id*=HdnpiId]").attr("id"), $("[id*=rptrPIDetails]").attr("id"))
    }
}

function SaveMorePi(TxtDepartment, TxtPIName, txtPIEmail, txtPiPhoneNo, txtPiMCRNo, hdnPiID, rptrPIDetails) {
    TxtDepartment = document.getElementById(TxtDepartment);
    TxtPIName = document.getElementById(TxtPIName);
    hdnPiID = document.getElementById(hdnPiID);
    txtPIEmail = document.getElementById(txtPIEmail);
    txtPiPhoneNo = document.getElementById(txtPiPhoneNo);
    txtPiMCRNo = document.getElementById(txtPiMCRNo);

    var Rept = $('#' + rptrPIDetails + '');
    var table = '<tr piId=' + hdnPiID.value + '><td><p>' + TxtDepartment.value + '</p></td><td><p>' + TxtPIName.value + '</p></td><td><p>' + txtPIEmail.value + '</p></td><td><p>' + txtPiPhoneNo.value + '</p></td><td><p>' + txtPiMCRNo.value + '</p></td>'
    table += '<td><p class="grid-action"><a href="#"><img title="Delete"  onclick="delPiRows(this)"  alt="" src="Images/icon-delete.png"></a></p></td></tr>'
    $('#tblPiDetail  tbody').append(table);


    $('.frmAddMorePIDetails').slideToggle("slow", "swing", function () {
        if ($('.frmAddMorePIDetails').is(':visible')) {
            $('.newPI').text('Cancel Addind New PI');
            TxtDepartment.value = "";
            TxtPIName.value = "";
            txtPIEmail.value = "";
            txtPiPhoneNo.value = "";
            txtPiMCRNo.value = "";
        } else {
            $('.newPI').text('Record New PI Details');
            $('.newPI').prev("span").text("+");
            $('.frmPI').show();
        }
    });
    $('.newPI').attr('type', '');
    MessageBox("PI added successfully");
    return false;
}

function delPiRows(Obj) {

    if ($(Obj).parents("tbody").find("tr").length > 1) {

        var pid = $(Obj).parent().parent().parent().parent().attr("piid");

        ConfirmBox("Are you sure to Delete this Record", "$('tr[piid=" + pid + "]').remove()");

    }
    else {
        MessageBox("There should be at least one PI.");
    }

}

//At Final Save Button click
function CollectPiIDs() {

    var str = "";
    $("[id*=HdnPi_ID]").val("");
    $('#tblPiDetail  tbody tr').each(function (index, item) {


        if (index != 0)
            str += ',' + $(item).attr('piId');
        else {
            str += $(item).attr('piId');
        }

    });

    $("[id*=HdnPi_ID]").val(str);
}

function UpdateClick() {

    if (!validate(".frmCurrStatus")) { return false; }
    if (!validate(".frmfeasibilitydetail")) { return false; }
    if (!validate(".frmoutcome")) { return false; }

    if ($("[id*=fuAgreementFile]").attr("disabled") != "disabled" && !($("[id*=hdnAgreementFile]").val() != "" || $("[id*=fuAgreementFile]").val() != "")) {
        MessageBox("Please provide Confidential Agreement file ");
        return false;
    }
    if ($("[id*=fuProtocolFile]").attr("disabled") != "disabled" && !($("[id*=hdnProtocolFile]").val() != "" || $("[id*=fuProtocolFile]").val() != "")) {
        MessageBox("Please provide Protocol file");
        return false;
    }

   
    /* CRO validation*/
    //$("[id*=txtCRO]").val() != "" && $("[id*=txtCRO]").val() != $("[id*=txtCRO]").attr("placeholder") && 
    if ($("[id*=hdnCROID]").val() == "" && $("[id*=txtCRO]").val() != "") {

        MessageBox("Please select CRO from search result");
        return false;

    }
    /* CRO validation*/

    /*Sponsor Name validation*/
    //$("[id*=txtSponsorName]").val() != "" && $("[id*=txtSponsorName]").val() != $("[id*=txtSponsorName]").attr("placeholder") &&
    if ($("[id*=hdnSponsorID]").val() == "" && $("[id*=txtSponsorName]").val() != "") {
        MessageBox("Please select Sponsor from search result");
        return false;

    }
    /*Sponsor Name validation*/



    //To handle the Sponsor and CRO text box clear from textbox delete icon
    //if ($.trim($("[id*=txtCRO]").val()) == "" && $("[id*=txtCRO]").val() == $("[id*=txtCRO]").attr("placeholder")) {
    //    $("[id*=hdnCROID]").val("");
    //}
    //if ($("[id*=txtSponsorName]").val() == "" && $("[id*=txtSponsorName]").val() == $("[id*=txtSponsorName]").attr("placeholder")) {
    //    $("[id*=hdnSponsorID]").val("");

    //}
    //End of To handle the Sponsor and CRO text box clear from textbox delete icon

    CollectPiIDs();
    RemoveDisable();
    return true;
}

function SaveClick() {

    if (!validate(".frmCurrStatus")) { return false; }
    if (!validate(".frmfeasibilitydetail")) { return false; }
    if (!validate(".frmoutcome")) { return false; }

    if ($("[id*=fuAgreementFile]").attr("disabled") != "disabled" && !($("[id*=hdnAgreementFile]").val() != "" || $("[id*=fuAgreementFile]").val() != "")) {
        MessageBox("Please provide Confidential Agreement file ");
        return false;
    }
    if ($("[id*=fuProtocolFile]").attr("disabled") != "disabled" && !($("[id*=hdnProtocolFile]").val() != "" || $("[id*=fuProtocolFile]").val() != "")) {
        MessageBox("Please provide Protocol file");
        return false;
    }

    ///*Sponsor Name validation*/
    //if ($("[id*=txtSponsorName]").val() != "" && $("[id*=txtSponsorName]").val() != $("[id*=txtSponsorName]").attr("placeholder") && $("[id*=hdnSponsorID]").val() == "") {
    //    MessageBox("Please select Sponsor from search result");
    //    return false;

    //}
    ///*Sponsor Name validation*/

    ///* CRO validation*/
    //if ($("[id*=txtCRO]").val() != "" && $("[id*=txtCRO]").val() != $("[id*=txtCRO]").attr("placeholder") && $("[id*=hdnCROID]").val() == "") {

    //    MessageBox("Please select CRO from search result");
    //    return false;

    //}
    /* CRO validation*/




    /* CRO validation*/
    //$("[id*=txtCRO]").val() != "" && $("[id*=txtCRO]").val() != $("[id*=txtCRO]").attr("placeholder") && 
    if ($("[id*=hdnCROID]").val() == "" && $("[id*=txtCRO]").val() != "") {
         
        MessageBox("Please select CRO from search result");
        return false;

    }
    /* CRO validation*/

    /*Sponsor Name validation*/
    //$("[id*=txtSponsorName]").val() != "" && $("[id*=txtSponsorName]").val() != $("[id*=txtSponsorName]").attr("placeholder") &&
    if ($("[id*=hdnSponsorID]").val() == "" && $("[id*=txtSponsorName]").val() != "") {
        MessageBox("Please select Sponsor from search result");
        return false;

    }
    /*Sponsor Name validation*/




    ////To handle the Sponsor and CRO text box clear from textbox delete icon
    //if ($.trim($("[id*=txtCRO]").val()) == "" && $("[id*=txtCRO]").val() == $("[id*=txtCRO]").attr("placeholder")) {
    //    $("[id*=hdnCROID]").val("");
    //}
    //if ($("[id*=txtSponsorName]").val() != "" && $("[id*=txtSponsorName]").val() != $("[id*=txtSponsorName]").attr("placeholder")) {
    //    $("[id*=hdnSponsorID]").val("");

    //}
    //End of To handle the Sponsor and CRO text box clear from textbox delete icon



    CollectPiIDs();
    RemoveDisable();
    return true;
}

function ApplyTableSorter() {

    $("#tblResposive").tablesorter();
}


function ApplyEvents() {




    /*Interest */
    $("[id*=ddlInterest]").change(function () {

        if (this.value == "0") {

            $("[id*=txtInterestComment]").addClass("Req").prev().html("Interest Comment<b> *</b>");

        }
        else {
            $("[id*=txtInterestComment]").removeClass("Req").prev().html("Interest Comment");
        }
    });

    if ($("[id*=ddlInterest]")[0].value != 0) {

        $("[id*=txtInterestComment]").removeClass("Req").prev().html("Interest Comment");
    }
    /*Interest */

    /*Confidential Agreement */
    $("[id*=ddlConfidentialAgreement]").change(function () {

        if (this.value == "1") {

            $("[id*=fuAgreementFile]").removeAttr("disabled").prev().html("Confidential Agreement file<b> *</b>");

            $("[id*=txtAgreementFile]").removeAttr("disabled").next().removeAttr("disabled").addClass("action").css("color", "white");

            $("[id*=fuAgreementFile]").parent("span").removeClass("disable");

            $("[id*=hdnAgreementFileEnabled]").val("Yes");

        }
        else {
            $("[id*=fuAgreementFile]").attr("disabled", "disabled").prev().html("Confidential Agreement file");

            $("[id*=txtAgreementFile]").attr("disabled", "disabled").next().attr("disabled", "disabled").css("color", "grey").removeClass("action");

            $("[id*=fuAgreementFile]").parent("span").addClass("disable");

            $("[id*=hdnAgreementFileEnabled]").val("No");
        }
    });

    if ($("[id*=ddlConfidentialAgreement]")[0].value != 1) {

        $("[id*=fuAgreementFile]").attr("disabled", "disabled").prev().html("Confidential Agreement file");

        $("[id*=txtAgreementFile]").attr("disabled", "disabled").next().attr("disabled", "disabled").css("color", "grey").removeClass("action");

        $("[id*=fuAgreementFile]").parent("span").addClass("disable");

        $("[id*=hdnAgreementFileEnabled]").val("No");

    }
    /*Confidential Agreement */

    /*Protocol number*/
    $("[id*=txtProtocolNumber]").change(function () {

        if ($.trim($(this).val()) != "") {

            $("[id*=fuProtocolFile]").removeAttr("disabled").prev().html("Protocol file<b> *</b>");

            $("[id*=txtProtocolFile]").removeAttr("disabled").next().removeAttr("disabled").addClass("action").css("color", "white");

            $("[id*=fuProtocolFile]").parent("span").removeClass("disable");

            $("[id*=hdnProtocolFileEnabled]").val("Yes");

        }
        else {
            $("[id*=fuProtocolFile]").attr("disabled", "disabled").prev().html("Protocol file");

            $("[id*=txtProtocolFile]").attr("disabled", "disabled").next().attr("disabled", "disabled").css("color", "grey").removeClass("action");

            $("[id*=fuProtocolFile]").parent("span").addClass("disable");

            $("[id*=hdnProtocolFileEnabled]").val("No");
        }
    });

    if ($.trim($("[id*=txtProtocolNumber]").val()) == "") {

        $("[id*=fuProtocolFile]").attr("disabled", "disabled").prev().html("Protocol file");

        $("[id*=txtProtocolFile]").attr("disabled", "disabled").next().attr("disabled", "disabled").css("color", "grey").removeClass("action");

        $("[id*=fuProtocolFile]").parent("span").addClass("disable");

        $("[id*=hdnProtocolFileEnabled]").val("No");
    }
    /*Protocol number*/

    //To check for the wrong text in Auto Complete
    $(".autoComp").keyup(function (e) {

        if (e.keyCode == 13 || e.keyChar == 13)
            return false;

        var id = $(this).attr("hdnparam");
        $("[id*=" + id + "]").val("");

        if ($(this).attr("id").indexOf("TxtDepartment") != -1)
            items();
        else if ($(this).attr("id").indexOf("TxtPIName") != -1)
            items('TxtPIName');
    });



    /*To trim the uploaded file name and show the full name on hover */
    var agreementText = $("[id*=DownAgreementFile]").text();
    $("[id*=DownAgreementFile]").attr("title", agreementText);
    $("[id*=DownAgreementFile]").text(trimText(agreementText, 40));

    var protocolFileText = $("[id*=DownProtocolFile]").text();
    $("[id*=DownProtocolFile]").attr("title", protocolFileText);
    $("[id*=DownProtocolFile]").text(trimText(protocolFileText, 40));

    var ChecklistFileText = $("[id*=DownChecklist]").text();
    $("[id*=DownChecklist]").attr("title", ChecklistFileText);
    $("[id*=DownChecklist]").text(trimText(ChecklistFileText, 40));

    var QuestFileText = $("[id*=DownQuestFile]").text();
    $("[id*=DownQuestFile]").attr("title", QuestFileText);
    $("[id*=DownQuestFile]").text(trimText(QuestFileText, 40));


    //To ask for overwriting the file
    $(".btnUpload").click(function () {

        var fuID = $(this).prev().prev().attr("id");
        var hdnId = $(this).attr("hdnparam");
        if ($("[id*=" + hdnId + "]").val() != "") {
            ConfirmBox("Are you sure to overwrite existing file?", "$('#" + fuID + "').click();");
        }
        else {
            $("#" + fuID).trigger("click");
        }
    });

    //To clear all the controls on Department change
    $("[id*=TxtDepartment]").change(function () {
        items();
    });

    //To disable the cal icon of start date
    if ($("[id*=txtFeasibilityStartDate").is(":disabled")) {
        var interval = setTimeout(function () {
            if ($("[id*=txtFeasibilityStartDate").next('img').length > 0) {
                $("[id*=txtFeasibilityStartDate").next('img').attr("disabled", "disabled").css("opacity", "0.5");
                clearInterval(interval);
            }
        }, 100);
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

function ClearAll(mode) {
    var elements = document.getElementsByTagName("input");
    var ddl = document.getElementsByTagName("select");
    var txtArea = document.getElementsByTagName("textarea");

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
        for (var ii = 0; ii < txtArea.length; ii++) {

            txtArea[ii].disabled = false;
            txtArea[ii].value = "";

        }
    }
    else if (mode.toString().toLowerCase() == 'delete' || mode.toString().toLowerCase() == 'view') {

        for (var ii = 0; ii < elements.length; ii++) {
            if (elements[ii].type == "text") {
                elements[ii].disabled = true;
            }
        }
        for (var i = 0; i < ddl.length; i++) {
            ddl[i].disabled = true;

        }
    }


}

function ClearMorePi() {
    $(".frmAddMorePIDetails input[type=text]").val("");
    //$(".newPI").click();
   // $('.newPI').attr('type', '');
}

function ClearNewPi() {
    $(".frmNewPIDetails input[type=text]").val("");
    //$(".newPI").click(); 
   // $('.newPI').attr('type', '');

}

function FlashMessage(msg) {
    var markup = '<div id="infoBox">' +
    '<span style="font-size: 16px;">Project Created Successfullly.</span>' +
    '</div>';

    $('body').append(markup);

    $("#infoBox").css({
        "display": "block",
        "position": "absolute",
        "top": "144px",
        "right": "0px",
        "background-color": "white",
        "color": "#394243",
        "width": "300px",
        "height": "32px",
        "border-left": "1px solid #04b9ca",
        "border-right": "2px solid #04b9ca",
        "border-top": "2px solid #04b9ca",
        "border-bottom": "1px solid #04b9ca",
        "padding": "5px 10px 5px 10px",
        "font-family": "sans-serif",
        "font-size": "16px",
        "font-weight": "300",
        "line-height": "1.25",

    });
}

function RemoveDisable() {
    $("[disabled=disabled]").removeAttr("disabled");
}

function DisableAllControl() {
    //To disable all textboxes
    $("input[type=text]").attr("disabled", "disabled");

    //To disable all datepicker icon
    $(".ui-datepicker-trigger").removeAttr("disabled");
    var interval = setInterval(function () {

        if ($(".ui-datepicker-trigger").length > 0) {
            $(".ui-datepicker-trigger").attr("disabled", "disabled").css("opacity", "0.5");
            clearInterval(interval);
        }

    }, 100);

    //To disable Add New PI link
    $(".newPI").parent("p").remove();

    //To remove Add more PI link
    $(".frmPI").find("p.align-right").remove();

    //To hide the buttons
    $("input[type=button]").remove();
    $("input[type=submit]").not("[value=Cancel]").not("[id*=btnLogout]").remove();

    //To disable all drop down
    $("select").attr("disabled", "disabled");

    //To disable all textarea
    $("textarea").attr("disabled", "disabled");

    //To disable all file picker
    $("input[type=file]").attr("disabled", "disabled");


    //To hide the Action column from PI table
    $("#tblPiDetail thead tr th:last-child").css("display", "none");
    $("#tblPiDetail tbody tr td:last-child").css("display", "none");

    //To hide Add New link from Sponsor and CRO
    $("[id*=txtCRO]").next("label").hide();
    $("[id*=txtSponsorName]").next("label").hide();

    $(".btn").addClass("disable1").removeClass("action");
    //$(".btn").css("padding-top", "4px");
    //$(".btn").css("padding-bottom", "4px");


}

function isFileSelected(fileContrl) {
    if ($("[id*=" + fileContrl + "]").val() == "") {
        MessageBox("Please choose file to upload");

        return false;
    }
    else {
        var hdnId = fileContrl.replace("fu", "hdn");
        if ($("[id*=" + hdnId + "]").val() != "") {
            var res = prompt("Do you want to overwrite it with existing file");
            if (res) {
                RemoveDisable();
                return true;
            }
            else { return false; }
        }

    }
    RemoveDisable();
    return true;

}

function trimText(str, len) {
    if (str.length > len)
        return str.slice(0, len) + "...";
    else
        return str;
}

function PerformCancel() {
    $("[id*=btnCancelFeasibility]").click();
}

function CancelSponsor() {
    $("[id*=txtNewSponsorName]").val("");
    $(".frmaddsponsor").hide();

}

function SaveSponsor() {
    if ($.trim($("[id*=txtNewSponsorName]").val()) == "") {
        MessageBox("Please provide sponsor name.");
        return false;

    }
    //var regExp = /^[A-Za-z ]+$/;
    //if (!regExp.test($("[id*=txtNewSponsorName]").val())) {
    //    MessageBox("Only alphabets are allowed in Sponsor Name.");
    //    return false;
    //}

    return true;

}

function CancelCRO() {
    $("[id*=txtNewCRO]").val("");
    $(".frmaddCRO").hide();

}

function SaveCRO() {
    if ($.trim($("[id*=txtNewCRO]").val()) == "") {
        MessageBox("Please provide CRO name.");
        return false;

    }

    return true;

}

function SaveNewPI() {
    if (!validate('.frmNewPIDetails')) { return false; }

    if (!CheckAutoComp('.frmNewPIDetails')) { return false; }

    //RemoveDisable();

    return true;

}

function CheckAutoComp(container) {
    flag = true;
    $(container + " .autoComp").each(function () {
        if ($(this).val() != "" && $(this) != $(this).attr("placeholder") && $("[id*=" + $(this).attr('hdnparam') + "]").val() == "") {
            MessageBox("Please select " + $(this).attr("title") + " from search result");
            flag = false;
            return false;
        }
    });

    return flag;
}

function ClearPiDetails() {
    $("[id*=TxtDepartment]").bind("mouseup", function (e) {
        var $input = $(this),
         oldValue = $input.val();

        if (oldValue == "") return;

        // When this event is fired after clicking on the clear button
        // the value is not cleared yet. We have to wait for it.
        setTimeout(function () {
            var newValue = $input.val();

            if (newValue == "") {
                items();
                $input.trigger("cleared");
            }
        }, 1);
    });

    $("[id*=TxtPIName]").bind("mouseup", function (e) {
        var $input = $(this),
         oldValue = $input.val();

        if (oldValue == "") return;

        // When this event is fired after clicking on the clear button
        // the value is not cleared yet. We have to wait for it.
        setTimeout(function () {
            var newValue = $input.val();

            if (newValue == "") {
                items();
                $input.trigger("cleared");
            }
        }, 1);
    });
}

function items(type) {


    if (type != "TxtPIName") {
        $("[id*=TxtPIName]").val('');
    }
    $("[id*=txtPIEmail]").val('');
    $("[id*=txtPiPhoneNo]").val('');

    $("[id*=HdnpiId]").val('');
    $("[id*=txtPiMCRNo]").val('');
}

function ApplyFileUpload() {
    $("input[type=file]").change(function () {

        $(this).parent().prev("input").val($(this).val().split('\\')[$(this).val().split('\\').length - 1]);

    });
}

function AddNewProject() {
    window.open('frmProject_Master.aspx?NewPage=1', '_blank');
}


function CheckCTConBlur(obj) {
    var HdnDeptTxt = $('[id*=HdnCROTxt]').val();
    if (HdnDeptTxt != "") {
        if (obj.value.toLowerCase() != HdnDeptTxt.toLowerCase()) {
            MessageBox("Please select Proper CTC");

            $("[id*=hdnCROID]").val('');
            return false;

        }
    }

}


function CheckSponsorBlur(obj) {
    var HdnDeptTxt = $('[id*=HdnSponsorTxt]').val();
    if (HdnDeptTxt != "") {
        if (obj.value.toLowerCase() != HdnDeptTxt.toLowerCase()) {
            MessageBox("Please select Proper Sponsor");
            $("[id*=hdnSponsorID]").val('');
            return false;

        }
    }
}



