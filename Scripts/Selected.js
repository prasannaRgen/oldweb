/// <reference path="../EthicDetails.aspx" />
/// <reference path="../EthicDetails.aspx" />

$(document).ready(function () {


    ApplyScript();


});


function ApplyScript() {



    /*Script for Expand Collapse*/
    //$('.frm:first').slideToggle("slow");
    $('.frmHead').unbind("click").click(function () {

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
                $('.frmNewPIDetails').slideToggle("slow");
                $('.newPI').text('Record New PI Details');
                $('.newPI').prev("span").text("+");
            }
        }
    });

    $('.newPI').unbind("click").click(function () {
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

    //CRO 
    $('.newCRO').unbind("click").click(function () {
        var frmName = $(this).attr('data-frm');

        //Clear all the textboxes
        $(".frmNewCRODetails input[type=text]").val("");

        if ($(this).attr('type') == "addmore") {
            $('.frmCRO').show();
            $('.newCRO').text('Record New CRO Details');
            $('.newCRO').prev("span").text("+");
            $('.frmAddMoreCRODetails').hide();
            $(this).attr('type', '');
            return;
        }

        if ($('.frmCRO').is(':visible')) {
            $('.frmCRO').slideToggle("slow");
        }


        $('.frmNewCRODetails').slideToggle("slow", "swing", function () {
            if ($('.frmNewCRODetails').is(':visible')) {
                $('.newCRO').text('Cancel Recording New CRO Details');
                $('.newCRO').prev("span").text("-");

            } else {
                $('.newCRO').text('Record New CRO Details');
                $('.newCRO').prev("span").text("+");
                $('.frmCRO').show();
            }
        });

    });

    $('.frmHeadCRO').click(function () {

        if ($(".frmAddMoreCRODetails").is(":visible")) {
            $(".newCRO").click();
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


        if (frmName == "frmCRO") {
            if ($('.frmNewCRODetails').is(':visible')) {
                $('.frmNewCRODetails').slideToggle("slow");
                $('.newCRO').text('Record New CRO Details');
                $('.newCRO').prev("span").text("+");
            }
        }
    });
    //CRO

    SortingPaging();

    if ($(".SelectedContainer").is(":visible")) {

        ApplyDatePicker();

        ApplyAutoComplete();

        ApplyEvents();

        ApplyFileUpload();

    }
    else //For project grid
    {

        if ($("#tblResposive tbody tr").length == 0) {

            $("#tblResposive tbody").html("<tr><td colspan='6' > No Records Available <td></tr>");
            $("#tblResposive thead th").css("background-image", "none");
            $("#tblResposive thead th").unbind("click");
        }

        $("[disabled]").removeAttr("disabled");
    }

    $('.MonlyStatusRpt').unbind("click").click(function () {
        // ResetfrmMonthlyStatusReport();
        $('.frmMonthlyStatusReport').slideToggle("slow", "swing", function () {
            if ($('.frmMonthlyStatusReport').is(':visible')) {
                clearAddBudgetFile();
                $('.MonlyStatusRpt').text('Cancel Adding Budget Document');
                $('.MonlyStatusRpt').prev("span").text("-");
                $('.frmStatusReportFile').slideToggle('slow').hide();

            } else {
                $('.MonlyStatusRpt').text('Add Budget Document');
                $('.MonlyStatusRpt').prev("span").text("+");
                $('.frmStatusReportFile').slideToggle('slow').show()
                $('.MonlyStatusRpt').show();
            }
        });
    });

    if ($("[id*=hdnDisplayMode]").val() == "View")
        DisableAllControl(1);


}
function clearAddBudgetFile() {

    var fileMarkup = '<p>' +
                            '<label>Study Budget Document <b>*</b></label>' +
                            '<input class="txtUpload Req" type="text" readonly="true">' +
                            '<span class="btn btn-default btn-file action">Browse...' +
                                '<input title="Study Budget Document" onchange="FloadChange(this)" class="action" type="file">' +
                            '</span>' +
                        '</p>';

    $(".BudgetFile").html(fileMarkup);

    var commentMarkup = '<p>' +
                            '<label>Comments for Budget</label>' +
                            '<input title="Comments for Budget" class="ctlinput" type="text">' +
                        '</p>'

    $(".BudgetComment").html(commentMarkup);

    ApplyFileUpload();

    ApplyBudgetFileEvents();




}

function SortingPaging() {
    ApplyTableSorter();

    ApplyPaging('tblResposive', 'projectPaging', 10);

    var pagingInterval = setInterval(function () {

        if ($(".header").length > 0) {
            ReApplyPaging('tblResposive');
            clearInterval(pagingInterval);
        }
    }, 100);
}

function ApplyDatePicker() {
    /*Date picker script*/
    $(".datepicker").datepicker({
        buttonText: datePickerTitle,//$(this).attr('title')
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

function AddMoreCRO() {

    //Clear all the textboxes
    $(".frmAddMoreCRODetails input[type=text]").val("");

    $('.newCRO').attr("type", 'addmore');
    var frmName = $(this).attr('data-frm');

    if ($('.frmCRO').is(':visible')) {
        $('.frmCRO').slideToggle("slow");
    }


    $('.frmAddMoreCRODetails').slideToggle("slow", "swing", function () {
        if ($('.frmAddMoreCRODetails').is(':visible')) {
            $('.newCRO').text('Cancel Adding CRO Record');
            $('.newCRO').prev("span").text("-");
        } else {
            $('.newCRO').text('Record New CRO Details');
            $('.newCRO').prev("span").text("+");
        }
    });

    //ClearPiDetails();

}


function ApplyAutoComplete() {


    var TxtNewDepartment = $("[id*=TxtNewDepartment]").attr("id");
    var HdnNewDeptId = $("[id*=HdnNewDeptId]").attr("id");

    var TxtDepartment = $("[id*=TxtDepartment]").attr("id");
    var HdnDeptId = $("[id*=HdnDeptId]").attr("id");

    SearchText(TxtNewDepartment, HdnNewDeptId, 10, "Department~spAutoComplete", "PageMethods");
    SearchText(TxtDepartment, HdnDeptId, 10, "Department~spAutoComplete", "PageMethods", FillPi);


    var TxtNewCRO = $("[id*=txtCROSearch]").attr("id");
    var HdnNewCROId = $("[id*=HdnCROId]").attr("id");

    SearchText(TxtNewCRO, HdnNewCROId, 10, "CRO~spAutoComplete", "PageMethods");


}

function FillPi(result) {
    var TxtPIName = $("[id*=TxtPIName]").attr("id");
    var HdnpiId = $("[id*=HdnpiId]").attr("id");

    //var deptID = $("[id*=HdnDeptId]").attr("id");

    var DeptId = result != null ? result.split('|')[1] : result;
    SearchText(TxtPIName, HdnpiId, 10, "FillPi~spAutoComplete~" + DeptId, "EthicDetails", fillPiDetails);
}

function fillPiDetails(result) {
    var ID = (result != null) ? result.split('|')[1] : result;
    txtPIEmail = $("[id*=txtPIEmail]").attr("id"); //document.getElementById('<%=txtPIEmail.ClientID%>').id;
    txtPiPhoneNo = $("[id*=txtPiPhoneNo]").attr("id"); //document.getElementById('<%=txtPiPhoneNo.ClientID%>').id;
    txtPiMCRNo = $("[id*=txtPiMCRNo]").attr("id"); //document.getElementById('<%=txtPiMCRNo.ClientID%>').id;
    GetPI_MasterDetailsByID(ID, txtPIEmail, txtPiPhoneNo, txtPiMCRNo)
}

function SearchText(TxtBox, HdnId, count, Contextkey, PageName, ReturnValues) {
    var Txtboxvalue = document.getElementById(TxtBox);
    var Txt = $('#' + TxtBox + '');
    var url = PageName + ".aspx/GetText";

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
                },
                error: function (result) {
                    MessageBox("Error");
                }
            });
        }, select: function (event, ui) {

            Selectedvalues = ui.item.label + '|' + ui.item.val;
            if (HdnId != null && HdnId != typeof (undefined) && HdnId != "") {
                $('#' + HdnId + '').val(ui.item.val);
            }
            Txt.blur();
            return true;
        },
        change: function (event, ui) {
            if (ui.item == null) {
                if (ReturnValues != null && ReturnValues != typeof (undefined) && ReturnValues != "") {
                    ReturnValues(null);
                }
            }
            else {
                if (ReturnValues != null && ReturnValues != typeof (undefined) && ReturnValues != "") {
                    ReturnValues(Selectedvalues);
                }
            }
        }


    });

}

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
            error: function (e) { MessageBox(e.statusText); }
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

        SaveMorePi($("[id*=TxtDepartment]").attr("id"), $("[id*=TxtPIName]").attr("id"), $("[id*=txtPIEmail]").attr("id"), $("[id*=txtPiPhoneNo]").attr("id"), $("[id*=txtPiMCRNo]").attr("id"), $("[id*=HdnpiId]").attr("id"), $("[id*=rptrPIDetails]").attr("id"))
    }
}

function SaveMoreCROClick() {

    if (!validate('.frmAddMoreCRODetails')) return false;

    var CRO = $("[id*=txtCROSearch]").val();
    var CRA = $("[id*=txtCRAEmail]").val();

    var flag = true;

    $("#tblCRODetail tbody tr").each(function () {

        if ($(this).children("td:eq(0)").text() == CRO && $(this).children("td:eq(2)").text() == CRA && $(this).children("td:eq(2)").text() != "")
        {
            MessageBox("CRO with same CRA email address already added.");
            flag = false;
            return;
        }
    });

    if ( $("[id*=HdnCROId]").val() == "" )
    {
        MessageBox("Please select CRO from Search result.");
        flag = false;
    }

    return flag;




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

function delCRORows(Obj) {

    if ($(Obj).parents("tbody").find("tr").length > 1) {

        var craid = $(Obj).parent().parent().parent().parent().attr("craid");

        ConfirmBox("Are you sure to Delete this Record", "$('tr[craid=" + craid + "]').remove()");

    }
    else {
        MessageBox("There should be at least one CRO.");
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

    if (!validate(".frmcoordinator")) { return false; }
    if (!validate(".frmsae")) { return false; }
    if (!validate(".frmstudy")) { return false; }
    if ($("[id*=ddlStudyStatus]").val() == "3") {
        if (!validate(".frmarchiving")) { return false; }
    }
    if (!validate(".frmother")) { return false; }
    if (!validate(".frmcupblinded")) { return false; }
    if (!validate(".frmdrugloc")) { return false; }
    if (!validate(".frmcupunblinded")) { return false; }
    if (!validate(".frmprojrequirement")) { return false; }


    if ($("[id*=txtEntryMonth]").val() == "") {
        MessageBox("Please fill all the required fields.");
        return false;
    }

    if ($("[id*=ddlTeamNeeded] option:selected").val() == "1") {
        if ($("[id*=SearchBlinded]").val() == "" || $("[id*=SearchUnBlinded]").val() == "") {
            MessageBox("Please fill all the required fields.");
            return false;
        }

    }
    if ($("[id*=ddlTeamNeeded] option:selected").val() == "0") {
        if ($("[id*=ddlBlindedCordinator]").val() == "-1" && $("[id*=ddlUnBlindedCordinator]").val() == "-1") {
            MessageBox("Please select either Blinded or UnBlinded Co-Ordinator.");
            return false;
        }

    }

    //validate CRO CRA details (At least one CRO is required)
    if ($("#tblCRODetail #NoCRO").length > 0) {
        MessageBox("Selection of at least one CRO is mandatory.");
        return false;
    }

    //If Approved budget status is yes than at least one budget file is required
    if ($("[id*=ddlApprovedStudyBugdet]").val() == "1" && $("[id*=tblStatusMontly] #NoCRO").length == 1) {
        MessageBox("Study Budget Document is mandatory.");
        return false;

    }

    



    //if ($("[id*=fuIRBFile]").attr("disabled") != "disabled" && !($("[id*=hdnIRBFile]").val() != "" || $("[id*=fuIRBFile]").val() != "")) {
    //    MessageBox("Please provide DSRB/IRB file");
    //    return false;
    //}
    //if ($("[id*=fuInsuranceFile]").attr("disabled") != "disabled" && !($("[id*=hdnInsuranceFile]").val() != "" || $("[id*=fuInsuranceFile]").val() != "")) {
    //    MessageBox("Please provide Clinical trial Insurance file");
    //    return false;
    //}

    CollectBudgetFiles();
    CollectPiIDs();
    CollectCRA();
    CollectBackup_Co_Ordinators();
    RemoveDisable();
    return true;
}

function SaveClick() {

    if (!validate(".frmcoordinator")) { return false; }
    if (!validate(".frmsae")) { return false; }
    if (!validate(".frmstudy")) { return false; }
    if (!validate(".frmarchiving")) { return false; }
    if (!validate(".frmother")) { return false; }
    if (!validate(".frmcupblinded")) { return false; }
    if (!validate(".frmdrugloc")) { return false; }
    if (!validate(".frmcupunblinded")) { return false; }

    if ($("[id*=ddlTeamNeeded] option:selected").val() == "1") {
        if ($("[id*=SearchBlinded]").val() == "" || $("[id*=SearchUnBlinded]").val() == "") {
            MessageBox("Please fill all the required fields.");
            return false;
        }

    }
    if ($("[id*=ddlTeamNeeded] option:selected").val() == "0") {
        if ($("[id*=ddlBlindedCordinator]").val() == "-1" && $("[id*=ddlUnBlindedCordinator]").val() == "-1") {
            MessageBox("Please select either Blinded or UnBlinded Co-Ordinator.");
            return false;
        }

    }

    //if ($("[id*=fuIRBFile]").attr("disabled") != "disabled" && !($("[id*=hdnIRBFile]").val() != "" || $("[id*=fuIRBFile]").val() != "")) {
    //    MessageBox("Please provide DSRB/IRB file");
    //    return false;
    //}
    //if ($("[id*=fuInsuranceFile]").attr("disabled") != "disabled" && !($("[id*=hdnInsuranceFile]").val() != "" || $("[id*=fuInsuranceFile]").val() != "")) {
    //    MessageBox("Please provide Clinical trial Insurance file");
    //    return false;
    //}

    CollectPiIDs();
    CollectCRA();
    CollectBackup_Co_Ordinators();
    RemoveDisable();
    return true;
}

function CollectBackup_Co_Ordinators() {

    var blindedIDs = "";
    $("[id*=chkboxlistBlinded] :checked").each(function (ind, itm) {
        if (ind == 0)
            blindedIDs += itm.value
        else
            blindedIDs += "," + itm.value;
    });
    $("[id*=HdnCoordinatorIdBlinded]").val(blindedIDs);

    var unBlindedIDs = "";
    $("[id*=chkboxlistUnBlinded] :checked").each(function (ind, itm) {
        if (ind == 0)
            unBlindedIDs += itm.value
        else
            unBlindedIDs += "," + itm.value;
    });
    $("[id*=HdnCoordinatorIdUnBlinded]").val(unBlindedIDs);
}

function CollectCRA() {
    var str = "";
    $("#tblCRODetail tbody tr").each(function (ind) {

        if (ind == 0)
            str += $(this).attr('croid') + "|" + $(this).attr('craid');
        else
            str += "," + $(this).attr('croid') + "|" + $(this).attr('craid');

    });

    $("[id*=hdnCROCRAIDs]").val(str);
}

function CollectBudgetFiles() {
    var savedFiles = "";

    var unSavedFiles = "";

    var savedComments = "";

    var unSavedComments = "";

    var unSavedFiles = "";
    var savedFiles = "";
    if ($("#tblStatusMontly #NoCRO").length != 1) {
        $("#tblStatusMontly tbody tr").each(function () {
            if ($(this).attr("new") == "yes") {
                if (unSavedFiles == "") {
                    unSavedFiles += $(this).attr("filepath");
                    unSavedComments += $(this).find(".fileComment").text();
                }
                else {
                    unSavedFiles += "," + $(this).attr("filepath");
                    unSavedComments += "," + $(this).find(".fileComment").text();
                }
            }
            else {
                if (savedFiles == "") {
                    savedFiles += $(this).attr("filepath");
                    savedComments += $(this).find(".fileComment").text();
                }
                else {
                    savedFiles += "," + $(this).attr("filepath");
                    savedComments += "," + $(this).find(".fileComment").text();
                }
            }
        });
    }

    $("[id*=hdnBudgetFileNotSaved]").val(unSavedFiles);

    $("[id*=hdnBudgetFiles]").val(savedFiles);

    $("[id*=hdnSavedComments]").val(savedComments);

    $("[id*=hdnUnSavedComments]").val(unSavedComments);

}

function ApplyTableSorter() {

    $("#tblResposive").tablesorter();
}

function ApplyEvents() {


    //To check for the wrong text in Auto Complete
    $(".autoComp").keypress(function (e) {

        if (e.keyCode == 13 || e.keyChar == 13)
            return false;

        var id = $(this).attr("hdnparam");
        $("[id*=" + id + "]").val("");

        if ($(this).attr("id").indexOf("TxtDepartment") != -1)
            items();
        else if ($(this).attr("id").indexOf("TxtPIName") != -1)
            items('TxtPIName');

    });

    //To clear all the controls on Department change
    $("[id*=TxtDepartment]").change(function () {
        items();
    });

    //Team Needed
    $("[id*=ddlTeamNeeded]").change(function () {

        if ($("[id*=ddlTeamNeeded] option:selected").val() != "1") {
            $("[id*=ddlBlindedCordinator]").removeClass("Req");
            $("[id*=ddlUnBlindedCordinator]").removeClass("Req");

            //Remove the * mark
            $("[id*=ddlBlindedCordinator]").siblings("label").html("Blinded Co-Ordinator");
            $("[id*=ddlUnBlindedCordinator]").siblings("label").html("UnBlinded Co-Ordinator");
            $("[id*=SearchBlinded]").siblings("label").html("Back Up Co-Ordinators (Blinded)");
            $("[id*=SearchUnBlinded]").siblings("label").html("Back Up Co-Ordinators (UnBlinded)");
        }
        else {
            $("[id*=ddlBlindedCordinator]").addClass("Req");
            $("[id*=ddlUnBlindedCordinator]").addClass("Req");

            //Add the * mark
            $("[id*=ddlBlindedCordinator]").siblings("label").html("Blinded Co-Ordinator <b>*<b>");
            $("[id*=ddlUnBlindedCordinator]").siblings("label").html("UnBlinded Co-Ordinator <b>*<b>");
            $("[id*=SearchBlinded]").siblings("label").html("Back Up Co-Ordinators (Blinded) <b>*<b>");
            $("[id*=SearchUnBlinded]").siblings("label").html("Back Up Co-Ordinators (UnBlinded) <b>*<b>");
        }
    });

    if ($("[id*=ddlTeamNeeded] option:selected").val() != "1") {
        $("[id*=ddlBlindedCordinator]").removeClass("Req");
        $("[id*=ddlUnBlindedCordinator]").removeClass("Req");

        //Remove the * mark
        $("[id*=ddlBlindedCordinator]").siblings("label").html("Blinded Co-Ordinator");
        $("[id*=ddlUnBlindedCordinator]").siblings("label").html("UnBlinded Co-Ordinator");
        $("[id*=SearchBlinded]").siblings("label").html("Back Up Co-Ordinators (Blinded)");
        $("[id*=SearchUnBlinded]").siblings("label").html("Back Up Co-Ordinators (UnBlinded)");
    }

    $("[id*=chkboxlistBlinded]").unbind("click").click(function () {

        SetChkFilterforALLkWithCount(this, $("[id*=SearchBlinded]").attr("id"));
    });

    $("[id*=chkboxlistUnBlinded]").unbind("click").click(function () {

        SetChkFilterforALLkWithCount(this, $("[id*=SearchUnBlinded]").attr("id"));
    });

    //To show no records available when CRO grid is blank

    if ($("#tblCRODetail tbody tr").length < 1) {
        $("#tblCRODetail tbody").html("<tr id='NoCRO' ><td colspan='4' > No Records Available <td></tr>");
        $("#tblCRODetail").addClass("removeHover");
    }

    if ($("#tblStatusMontly tbody tr").length < 1) {
        $("#tblStatusMontly tbody").html("<tr id='NoCRO' ><td colspan='2' > No Records Available <td></tr>");
        $("#tblStatusMontly").addClass("removeHover");
    }


    //To show Team Needed as default 'Yes'
    if ($("[id*=txtSelectedStartDate]").val() == "")
        $("[id*=ddlTeamNeeded] option")[1].selected = true;

    if ($.trim($("[id*=txtPatientStudyNo]").val()) == "") {
        //$("select").val("-1");
    }

    //To fix the year in Entry for month field as per selected year drop down
    var selectedYear = $("[id*=ddlYear]").val();
    $(".datepickerMonth").datepicker({
        buttonText: "Select date",
        showOn: "both",
        buttonImage: "../Images/icon-cal.png",
        buttonImageOnly: true,
        changeMonth: true,
        changeYear: true,
        prevText: "",
        nextText: "",
        minDate: new Date("01/01/" + $("[id*=ddlYear]").val()),
        maxDate: new Date("12/31/" + $("[id*=ddlYear]").val()),
        //yearRange: selectedYear+":"+selectedYear,
        disabled: false,
        dateFormat: 'dd-M-yy'
    });

    //To show recent tab as selected
    //if ($(".filler").length > 0) {
    //    $(".filler").prev().addClass("selected");
    //}

    //$("[id*=monthButton_Container] input").click(function () {
    //    $("[id*=monthButton_Container] input").removeClass("selected");
    //    $(this).addClass("selected");
    //});
    if ($("[id*=monthButton_Container] .selected1").length == 0)
        $("[id*=monthButton_Container] a:last-child").addClass("selected1");

    //validation code 
    if ($("[id*=BlindedContainer]").length != 0) {
        /*Patient Study Number */
        $("[id*=ddlSAEStatus]").change(function () {

            if (this.value == "1") {

                $("[id*=txtPatientStudyNo]").addClass("Req").prev().html("Patient Study No <b> *</b>");

            }
            else {
                $("[id*=txtPatientStudyNo]").removeClass("Req").prev().html("Patient Study No");
            }
        });

        if ($("[id*=ddlSAEStatus]").val() != "1") {

            $("[id*=txtPatientStudyNo]").removeClass("Req").prev().html("Patient Study No");
        }
        /*Patient Study Number */

        /*CTM Expiry Date */
        $("[id*=ddlCTMStatus]").change(function () {

            if (this.value == "1") {

                $("[id*=txtCTMExpiryDate]").addClass("Req").prev().html("CTM Expiry Date <b> *</b>");

            }
            else {
                $("[id*=txtCTMExpiryDate]").removeClass("Req").prev().html("CTM Expiry Date");
            }
        });

        if ($("[id*=ddlCTMStatus]").val() != "1") {

            $("[id*=txtCTMExpiryDate]").removeClass("Req").prev().html("CTM Expiry Date");
        }
        /*CTM Expiry Date */

        /*Awaiting Archiving section */
        $("[id*=ddlStudyStatus]").change(function () {

            if (this.value == "3") {


                $(".archivingSection").show();

            }
            else {
                $(".archivingSection").hide();
            }
        });

        if ($("[id*=ddlStudyStatus]").val() != "3") {

            $(".archivingSection").hide();
        }
        /*Awaiting Archiving section */

        /*Awaiting Archiving */
        $("[id*=ddlAwaitingArchiving]").change(function () {

            if (this.value == "1") {

                $("[id*=txtEndDateArchiving]").addClass("Req").removeAttr("disabled").next().removeAttr("disabled").css("opacity", "1");
                $("[id*=txtDateSentForArchiving]").addClass("Req").removeAttr("disabled").next().removeAttr("disabled").css("opacity", "1");
                $("[id*=txtOffSiteCompany]").addClass("Req").removeAttr("disabled");

                //-----------------
                $("[id*=txtAgreementNumber]").removeAttr("disabled");
                $("[id*=txtNumberOfBoxes]").removeAttr("disabled");
                $("[id*=txtAmount]").removeAttr("disabled");
                $("[id*=ddlApprovedStudyBugdet]").removeAttr("disabled");

                $("[id*=fuIRBFile]").removeAttr("disabled");

                $("[id*=btnIRBFile]").removeAttr("disabled").removeClass("disable");

                $("[id*=fuIRBFile]").parent("span").removeClass("disable");

                $("[id*=txtIRBFile]").removeAttr("disabled").next().removeAttr("disabled").addClass("action").css("color", "white");
                //-----------------

                $("[id*=txtReason]").removeClass("Req").attr("disabled", true);

            }
            else {
                $("[id*=txtReason]").addClass("Req").removeAttr("disabled");

                $("[id*=txtEndDateArchiving]").removeClass("Req").attr("disabled", true).next().attr("disabled", true).css("opacity", "0.5");
                $("[id*=txtDateSentForArchiving]").removeClass("Req").attr("disabled", true).next().attr("disabled", true).css("opacity", "0.5");

                $("[id*=txtOffSiteCompany]").removeClass("Req").attr("disabled", true);

                //--------------------------

                $("[id*=txtAgreementNumber]").attr("disabled", "disabled");
                $("[id*=txtNumberOfBoxes]").attr("disabled", "disabled");
                $("[id*=txtAmount]").attr("disabled", "disabled");
                $("[id*=ddlApprovedStudyBugdet]").attr("disabled", "disabled");

                $("[id*=fuIRBFile]").attr("disabled", "disabled").removeClass("Req");

                $("[id*=fuIRBFile]").parent("span").addClass("disable");

                $("[id*=txtIRBFile]").attr("disabled", "disabled").next().attr("disabled", "disabled").css("color", "grey").removeClass("action");
                //----------------------------
            }
        });

        if ($("[id*=ddlAwaitingArchiving]").val() == "1") {

            $("[id*=txtEndDateArchiving]").addClass("Req").removeAttr("disabled").next().removeAttr("disabled").css("opacity", "1");
            $("[id*=txtDateSentForArchiving]").addClass("Req").removeAttr("disabled").next().removeAttr("disabled").css("opacity", "1");

            $("[id*=txtOffSiteCompany]").addClass("Req").removeAttr("disabled");

            $("[id*=txtReason]").removeClass("Req").attr("disabled", true);

            //-----------------
            $("[id*=txtAgreementNumber]").removeAttr("disabled");
            $("[id*=txtNumberOfBoxes]").removeAttr("disabled");
            $("[id*=txtAmount]").removeAttr("disabled");
            $("[id*=ddlApprovedStudyBugdet]").removeAttr("disabled");

            $("[id*=fuIRBFile]").removeAttr("disabled");

            $("[id*=btnIRBFile]").removeAttr("disabled").removeClass("disable");

            $("[id*=fuIRBFile]").parent("span").removeClass("disable");

            $("[id*=txtIRBFile]").removeAttr("disabled").next().removeAttr("disabled").addClass("action").css("color", "white");
            //-----------------
        }
        else if ($("[id*=ddlAwaitingArchiving]").val() == "0") {
            $("[id*=txtReason]").addClass("Req").removeAttr("disabled");

            $("[id*=txtEndDateArchiving]").removeClass("Req").attr("disabled", true);
            $("[id*=txtDateSentForArchiving]").removeClass("Req").attr("disabled", true);
            $("[id*=txtOffSiteCompany]").removeClass("Req").attr("disabled", true);

            //--------------------------

            $("[id*=txtAgreementNumber]").attr("disabled", "disabled");
            $("[id*=txtNumberOfBoxes]").attr("disabled", "disabled");
            $("[id*=txtAmount]").attr("disabled", "disabled");
            $("[id*=ddlApprovedStudyBugdet]").attr("disabled", "disabled");

            $("[id*=fuIRBFile]").attr("disabled", "disabled").removeClass("Req");

            $("[id*=fuIRBFile]").parent("span").addClass("disable");

            $("[id*=txtIRBFile]").attr("disabled", "disabled").next().attr("disabled", "disabled").css("color", "grey").removeClass("action");
            //----------------------------
        }
        /*Awaiting Archiving */


        //Restrict Past date on CTM Expiry date
        $("[id*=txtCTMExpiryDate]").datepicker({
            buttonText: $(this).attr('title'),
            showOn: "both",
            buttonImage: "Images/icon-cal.png",
            buttonImageOnly: true,
            changeMonth: true,
            changeYear: true,
            prevText: "",
            nextText: "",
            //minDate: 0,
            dateFormat: 'dd-M-yy'

        });

        //Recruitment start date and End date should be proper

        $("[id*=txtRecruitEndDate]").change(function () {

            var start = $("[id*=txtRecruitStartDate]").val();

            if (start == "") {
                MessageBox("Please select Recruitment Start Date first");
                $(this).val("");
            }
            else {
                var start1 = new Date(ConvertMonthNameToNumeric(start.split("-")[1]) + "/" + start.split("-")[0] + "/" + start.split("-")[2]);
                var end = new Date(ConvertMonthNameToNumeric($(this).val().split("-")[1]) + "/" + $(this).val().split("-")[0] + "/" + $(this).val().split("-")[2]);
                if (end < start1) {
                    MessageBox("Recruitment End Date should be greater than or equal to Recruitment Start Date");
                    $(this).val("");
                }
            }
        });
        //End of Recruitment start date and End date should be proper

        //End of validation code 

        //Set default values for new Blinded entries
        if ($("[id*=txtDischargeDate]").val() == "") {

            //Set CTM status to 'Applicable'
            $("[id*=ddlCTMStatus]").val("1");

            //Set target for TTSH as 1
            $("[id*=txtTargetforTTSH]").val("1");

            //Set drop downs to 'Select'

            $("[id*=ddlAwaitingArchiving]").val("-1");

            $("[id*=ddlSAEStatus]").val("-1");

            $("[id*=ddlReadmission]").val("-1");

            $("[id*=txtEndDateArchiving]").next().attr("disabled", true).css("opacity", "0.5");

            $("[id*=txtReason]").removeClass("Req").attr("disabled", true);


            //Set Approved Study Status to 'Yes'
            $("[id*=ddlApprovedStudyBugdet]").val("1");




        }
    }

    //To show the button text as "Save" if blinded and un blinded details are empty

    //var blinded = true;
    //var unblinded = true;
    //if ($("[id*=BlindedContainer]").length != 0 && $("[id*=txtDischargeDate]").val() != "") {
    //    blinded = false;
    //}

    //if ($("[id*=UnBlindedContainer]").length != 0 && $("[id*=txtDrugName]").val() != "") {
    //    unblinded = false;
    //}

    //if (blinded && unblinded) {
    //    $("[id*=btnUpdateSelected]").val("Save details");
    //}




    //CRO validation
    $("[id*=txtCROSearch]").keypress(function () {
        $("[id*=HdnCROId]").val("");
    }).on("paste",function () {
        $("[id*=HdnCROId]").val("");
    });

    //Set the Save button text to Edit/Save as per condition
    var isSave = true;
    if ($("[id*=hdnDisplayMode]").val().toLowerCase() == "edit") {

        //For Selected user
        if ($("[id*=txtSelectedStartDate]").is(":visible") && $("[id*=txtSelectedStartDate]").val() != "") {
            $("[id*=btnUpdateSelected]").val("Update Details");
            isSave = false;
        }

        //For Blinded user
        if ($("[id*=txtReadmissionDate]").is(":visible") && $("[id*=txtReadmissionDate]").val() != "") {
            $("[id*=btnUpdateSelected]").val("Update Details");
            isSave = false;
        }

        //For Un Blinded user
        if ($("[id*=txtDrugName]").is(":visible") && $("[id*=txtDrugName]").val() != "") {
            $("[id*=btnUpdateSelected]").val("Update Details");
            isSave = false;
        }

        if (isSave) {
            $("[id*=btnUpdateSelected]").val("Save Details");
            $("[id*=hdnUpdateBtnText]").val("save");

        } else {
            $("[id*=hdnUpdateBtnText]").val("update");
        }
    }

    //Set the Save button text to Edit





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

}

function ClearMoreCRO() {
    $(".frmAddMoreCRODetails input[type=text]").val("");
    //$(".newPI").click();

}

function ClearNewPi() {
    $(".frmNewPIDetails input[type=text]").val("");
    //$(".newPI").click();

}

function ClearNewCRO() {
    $(".frmNewCRODetails input[type=text]").val("");
    $(".newCRO").click();
    ApplyAutoComplete();


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

function DisableAllControl(str) {
    //To disable all textboxes
    $("input[type=text]").not("[id*=txtSearch]").attr("disabled", "disabled");

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
    //$(".action").not("[type=file]").remove();
    $("input[type=button]").not(".month1").remove();
    $("input[type=submit]").not("[value=Cancel]").not("[id*=btnMonthTrigger]").not("[id*=btnLogout]").remove();

    //To disable all drop down
    $("select").not("[id*=ddlYear]").attr("disabled", "disabled");

    //To disable all textarea
    $("textarea").attr("disabled", "disabled");

    //To disable all file picker
    $("input[type=file]").attr("disabled", "disabled");


    //To hide the Action column from PI table
    $("#tblPiDetail thead tr th:last-child").css("display", "none");
    $("#tblPiDetail tbody tr td:last-child").css("display", "none");

    $(".btn").addClass("disable1").removeClass("action");

    if (str == 1) {
        $(".SelectedContainer").attr("mode", "edit");
    }

    $("#hdnDisplayMode").val("");


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
    $("[id*=btnCancelEthics]").click();
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

function SaveNewPI() {
    if (!validate('.frmNewPIDetails')) { return false; }

    if (!CheckAutoComp('.frmNewPIDetails')) { return false; }

    //RemoveDisable();

    return true;

}

function SaveNewCRO() {

    if ($.trim($("[id*=txtCROName]").val()) == "") {
        MessageBox("Please enter CRO Name.");
        return false;
    }

    return true;

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

function DisableProjectDetails() {
    $(".frmDetails input").not(":disabled").attr("disabled", true);

    //To disable Add New PI link
    $(".newPI").parent("p").remove();

    //To remove Add more PI link
    $(".frmPI").find("p.align-right").remove();

    //To hide the Action column from PI table
    $("#tblPiDetail thead tr th:last-child").css("display", "none");
    $("#tblPiDetail tbody tr td:last-child").css("display", "none");

}

function CRASaved(str) {
    var CRAId = "";
    var CROId = "";

    if (str != "" && str != undefined) {
        CROId = str.split(",")[0];
        CRAId = str.split(",")[1];

    }

    var table = '<tr croid="' + CROId + '" craid="' + CRAId + '" ><td><p>' + $("[id*=txtCROSearch]").val() + '</p></td><td><p>' + $("[id*=TxtCRAName]").val() + '</p></td><td><p>' + $("[id*=txtCRAEmail]").val() + '</p></td><td><p>' + $("[id*=txtCRAPhoneNo]").val() + '</p></td>'
    table += '<td><p class="grid-action"><a ><img title="Delete"  onclick="delCRORows(this)"  alt="" src="Images/icon-delete.png"></a></p></td></tr>';

    if ($('#tblCRODetail  tbody tr:eq(0)').attr("id") == "NoCRO") {
        $('#tblCRODetail  tbody').html(table);
    }
    else {
        $('#tblCRODetail  tbody').append(table);
    }
    $(".newCRO").click();

    MessageBox("Saved Successfully");

}

function triggerMonth(month) {
    $("[id*=hdnCurrMonth]").val(month);
    $("[id*=btnMonthTrigger]").click();

    var interval = setInterval(function () {

        if ($("[id*=ddlSAEStatus]").length > 0 || $("[id*=txtDrugName]").length > 0) {
            $(".selected1").removeAttr("process");
            $("[id*=monthButton_Container] a").removeClass("selected1");
            $("a[month=" + month + "]").addClass("selected1");

            clearInterval(interval);
        }
    }, 100);

    var interval1 = setInterval(function () {

        if ($(".selected1").attr("process") == "1") {

            if ($("a[month=" + month + "]").next("a").length != 0) {
                $("[id*=BlindedContainer] input,[id*=BlindedContainer] select,[id*=BlindedContainer] img").attr("disabled", true);
                $("[id*=BlindedContainer] .ui-datepicker-trigger").css("opacity", 0.5);
                $("[id*=txtEntryMonth]").parent().hide();
                $(".MonlyStatusRpt").parent().hide();
                $(".newCRO").parent().hide();
                $(".frmCRO .link").hide();

                if ($("#tblCRODetail #NoCRO").length != 1) {
                    $("#tblCRODetail tbody td:last-child").remove();
                    $("#tblCRODetail thead th:last-child").remove();
                }

                if ($("#tblStatusMontly #NoCRO").length != 1) {
                    $("#tblStatusMontly tbody td:last-child").remove();
                    $("#tblStatusMontly thead th:last-child").remove();
                }
            }
            else {

                if ($(".SelectedContainer").attr("mode") != "edit") {
                    $("[id*=BlindedContainer] input,[id*=BlindedContainer] select,[id*=BlindedContainer] img").removeAttr("disabled", true);
                    $("[id*=BlindedContainer] .ui-datepicker-trigger").css("opacity", 1);
                    $("[id*=txtEntryMonth]").parent().show();
                    $(".MonlyStatusRpt").parent().show();
                    $(".newCRO").parent().show();
                    $(".frmCRO .link").show();

                    $("[id$=txtIRB]").attr("disabled", true);
                    $("[id$=txtCTCExpiryDate]").attr("disabled", true);
                    $("[id$=txtUpdatedByUnblinded]").attr("disabled", true);
                    $("[id$=txtLastUpdatedUnBlinded]").attr("disabled", true);
                     
                }
                else {
                    $("[id*=BlindedContainer] input,[id*=BlindedContainer] select,[id*=BlindedContainer] img").attr("disabled", true);
                    $("[id*=BlindedContainer] .ui-datepicker-trigger").css("opacity", 0.5);
                    $("[id*=txtEntryMonth]").parent().hide();
                    $(".MonlyStatusRpt").parent().hide();
                    $(".newCRO").parent().hide();
                    $(".frmCRO .link").hide();

                    if ($("#tblCRODetail #NoCRO").length != 1) {
                        $("#tblCRODetail tbody td:last-child").remove();
                        $("#tblCRODetail thead th:last-child").remove();
                    }

                    if ($("#tblStatusMontly #NoCRO").length != 1) {
                        $("#tblStatusMontly tbody td:last-child").remove();
                        $("#tblStatusMontly thead th:last-child").remove();
                    }
                }
            }

            clearInterval(interval1);
        }

    }, 100);



}
function monthClickProcessed() {

    var a = "";
    var intervalselected = setInterval(function () {
        if ($('.selected1').length > 0) {
            $('.selected1').attr('process', '1');
            clearInterval(intervalselected);
        }
    });



}

function temp() {
    triggerMonth("feb");
}

function AddMoreBudgetFile() {
    var fileMarkup = "";

    var randomNum = "bfile" + Math.random().toString().slice(2, 6);

    fileMarkup += '<p class="' + randomNum + '">' +
        '<label>Study Budget Document <b>*</b></label>' +
        '<input class="txtUpload Req"  type="text" readonly="true">' +
        '<span class="btn btn-default btn-file action">Browse...' +
            '<input title="Study Budget Document" class="action" onchange="FloadChange(this)" type="file">' +
        '</span>' +
    '</p>';

    commentMarkup = "";

    commentMarkup += '<p class="' + randomNum + ' grid-action" >' +
                        '<label>Comments for Budget</label>' +
                        '<input title="Comments for Budget" class="ctlinput" type="text">' +


                    '<a   onclick="deleteBudgetRow(\'' + randomNum + '\')" class="link" style="margin-left:5px;">   Remove' +
                        //'<img title="Delete" alt="" style="margin-left:10px;margin-top:-5px;background-color:grey;" src="../Images/icon-delete.png">' +
                    '</a>'
    ' </p>';

    $(".BudgetFile").append(fileMarkup);
    $(".BudgetComment").append(commentMarkup);

    ApplyFileUpload();
    ApplyBudgetFileEvents();


}
function ApplyBudgetFileEvents() {

    $(".txtUpload").change(function () {

        var filename = $(this).val();

        var arr = new Array();

        $(".BudgetFile p input[type=text]").each(function () {

            var file = $(this).val();
            arr.push(file);

        });

        $("#tblStatusMontly tbody tr td:first-child").each(function () {

            alert($(this).val())
        });

    });
}

function deleteBudgetRow(className) {
    $("." + className).remove();
}

function SaveBudgetFile() {

    var markup = "";

    var flag = "";

    var count = $(".BudgetFile p").length;

    for (var i = 0; i < count; i++) {
        markup = "";
        $(".BudgetFile p").each(function () {

            if ($(this).find("input[type=text]").val() == "") {
                MessageBox("Please select Study Budget Document");
                flag = true;

            }
        });

        if (flag == true) {
            return false;
        }


        var filePath = $(".BudgetFile p:eq(" + i + ")").attr("filepath");
        var fileName = $(".BudgetFile p:eq(" + i + ")").attr("filename");
        var comment = $(".BudgetComment p:eq(" + i + ")").find('input[type=text]').val();

        var randomId = Math.random().toString().slice(2, 6);

        markup += '<tr trid="trBudget' + randomId + '" filepath="' + filePath + '">' +
                     '<td class="fileName">' + fileName + '</td>' +
                     '<td class="fileComment">' + comment + '</td>' +
                     '<td><p class="grid-action">' +
        '<a>' +
        '<img title="Delete" onclick="delBudgetFile(this)" alt="" src="Images/icon-delete.png">' +
        '</a>' +
        '</p></td>' +
'</tr>';
        if ($("#tblStatusMontly #NoCRO").length == 1)
            $("#tblStatusMontly tbody").html(markup);
        else
            $("#tblStatusMontly tbody").append(markup);

    }

    $('.MonlyStatusRpt').click();

    return false;
}

function ResetBudgetFile() {
    $('.MonlyStatusRpt').click();
    return false;
}

function delBudgetFile(obj) {

    if ($("#tblStatusMontly tbody tr").length == 1) {

        MessageBox("At least one Budget file is required");

        return false;
    }



    //ConfirmBox("Are you sure to delete?", '$("tr[trid= ' + className + ' ]").remove();');
    //ConfirmBox("Are you sure to delete?", '$(' + obj + ').parent().parent().parent().remove();');
    $(".removeBudgetRow").removeClass("removeBudgetRow");
    $(obj).parent().parent().parent().parent().addClass("removeBudgetRow");
    ConfirmBox("Are you sure to delete?", '$(".removeBudgetRow").remove();');

}

function DownloadBudgetFile(obj) {
    var file = $(obj).parent().parent().parent().attr("filepath");
    var url = "/DownloadHandler.ashx";
    Callhandler(url, file);
}

function DownloadAgreementFile(obj) {
    var file = $(obj).attr("filepath");
    var url = "/DownloadHandler.ashx";
    Callhandler(url, file);
}

function Callhandler(url, path) {
    var downloadpath = url + '?fileName=' + path;
    window.location = downloadpath;
    return false;
}

function FloadChange(obj) {

    if (obj.value != "") {
        var uploadfiles = $(obj).get(0);

        var uploadedfiles = uploadfiles.files;

        var fromdata = new FormData();

        for (var i = 0; i < uploadedfiles.length; i++) {

            fromdata.append(uploadedfiles[i].name, uploadedfiles[i]);

        }


        var choice = {};

        choice.url = "UploadBudgetFile.ashx";

        choice.type = "POST";

        choice.data = fromdata;

        choice.contentType = false;

        choice.processData = false;

        choice.success = function (result) {
            if (result != null) {
                //$('[id*=HdnGlobPath]').val(result); return false;

                var filePath = result.split("|")[0];
                var fileName = result.split("|")[1];
                $(obj).parent().parent().attr("filepath", filePath);
                $(obj).parent().parent().attr("filename", fileName);
                return false;
            }
        };

        choice.error = function (err) { alert(err.statusText); };

        $.ajax(choice);

    }
    return true;


}






