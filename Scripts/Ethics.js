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
            $('.newPI').attr('type', '');
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

    SortingPaging();

    if ($(".EthicsContainer").is(":visible")) {

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

function ApplyAutoComplete() {


    var TxtNewDepartment = $("[id*=TxtNewDepartment]").attr("id");
    var HdnNewDeptId = $("[id*=HdnNewDeptId]").attr("id");

    var TxtDepartment = $("[id*=TxtDepartment]").attr("id");
    var HdnDeptId = $("[id*=HdnDeptId]").attr("id");

    SearchText(TxtNewDepartment, HdnNewDeptId, 10, "Department~spAutoComplete", "EthicDetails");
    SearchText(TxtDepartment, HdnDeptId, 10, "Department~spAutoComplete", "EthicDetails", FillPi);

}

function FillPi(result) {
    var TxtPIName = $("[id*=TxtPIName]").attr("id");

    var HdnpiId = $("[id*=HdnpiId]").attr("id");

    var DeptId = result != null ? result.split('|')[1] : result;

    SearchText(TxtPIName, HdnpiId, 10, "FillPi~spAutoComplete~" + DeptId, "EthicDetails", fillPiDetails);
}

function fillPiDetails(result) {
    var ID = (result != null) ? result.split('|')[1] : result;

    txtPIEmail = $("[id*=txtPIEmail]").attr("id");

    txtPiPhoneNo = $("[id*=txtPiPhoneNo]").attr("id");

    txtPiMCRNo = $("[id*=txtPiMCRNo]").attr("id");

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
                    alert("Error");
                }
            });
        }, select: function (event, ui) {

            Selectedvalues = ui.item.label + '|' + ui.item.val;
            if (HdnId != null && HdnId != typeof (undefined) && HdnId != "") {
                $('#' + HdnId + '').val(ui.item.val);
            }
            //Txt.blur();

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
            return true;
        },
        change: function (event, ui) {
            //if (ui.item == null) {
            //    if (ReturnValues != null && ReturnValues != typeof (undefined) && ReturnValues != "") {
            //        ReturnValues(null);
            //    }
            //}
            //else {
            //    if (ReturnValues != null && ReturnValues != typeof (undefined) && ReturnValues != "") {
            //        ReturnValues(Selectedvalues);
            //    }
            //}
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

    var flag = true;
    var txtEthicsStartDate = $('[id*=txtEthicsStartDate]');
    var dtCompleted_Withdrawn = $('[id*=dtCompleted_Withdrawn]');
    if (!ProjDtMax(txtEthicsStartDate.val(), dtCompleted_Withdrawn.val())) {
        MessageBox("Ethic End Date Should be Greater than Ethic Start Date");
        dtCompleted_Withdrawn.focus();
        return false;
    }
    if (!validate(".frmDetails")) { return false; }
  
    if (!validate(".frmIRB")) { return false; }
    if (CheckIRB() == false) {
        MessageBox("Please fill all the required fields.");
        return false;
    }
    if (!validate(".frmSub")) { return false; }
    if (!validate(".frmtrial")) { return false; }
    if (!validate(".frmcrio")) { return false; }
    if (!validate(".frmother")) { return false; }

    if ($("[id*=ddlIRBStatus]")[0].value == 2 && !($("[id*=hdnIRBFile]").val() != "" || $("[id*=fuIRBFile]").val() != "")) {
        if ($('.frmIRB b').is(':visible') == true) {
            MessageBox("Please provide DSRB/IRB file");
            return false;
        }
    }

    if ($("[id*=fuInsuranceFile]").attr("disabled") != "disabled" && !($("[id*=hdnInsuranceFile]").val() != "" || $("[id*=fuInsuranceFile]").val() != "")) {
        MessageBox("Please provide Clinical trial Insurance file");
        return false;
    }

    CollectPiIDs();
    RemoveDisable();

    return true;
}


function CheckIRB() {

    if ($('.frmIRB b').not(".bIRB").not(".bIRBStatus").is(':visible') == true) {
        var ddlIRBType = $('[id*=ddlIRBType] option:selected');
        var ddlIRBStatus = $('[id*=ddlIRBStatus] option:selected');
        var txtIRBNumber = $('[id*=txtIRBNumber]');
        var txtIRBApproveDate = $('[id*=txtIRBApproveDate]');
        var btnDownIRBFile = $('[id*=btnDownIRBFile]');
        var txtIRBApproveEndDate = $('[id*=txtIRBApproveEndDate]');
        if (ddlIRBType.text().toLowerCase() == '--select--') {
            return false;
        }
        if (ddlIRBStatus.text().toLowerCase() == '--select--') {
            return false;
        }
        if (txtIRBNumber.val().trim() == '') {
            return false;
        }
        if (txtIRBApproveDate.val().trim() == '') {
            return false;
        }
        if (txtIRBApproveEndDate.val().trim() == '') {
            return false;
        }
    }
    return true;
}

function SaveClick() {
    var txtEthicsStartDate = $('[id*=txtEthicsStartDate]');
    var dtCompleted_Withdrawn = $('[id*=dtCompleted_Withdrawn]');
    if (!ProjDtMax(txtEthicsStartDate.val(), dtCompleted_Withdrawn.val())) {
        MessageBox("Ethic End Date Should be Greater than Ethic Start Date");
        dtCompleted_Withdrawn.focus();
        return false;
    }
    if (!validate(".frmDetails")) { return false; }
    
    if (!validate(".frmIRB")) { return false; }
    if (CheckIRB() == false) {
        MessageBox("Please fill all the required fields.");
        return false;
    }
    if (!validate(".frmSub")) { return false; }
    if (!validate(".frmtrial")) { return false; }
    if (!validate(".frmcrio")) { return false; }
    if (!validate(".frmother")) { return false; }

    if ($("[id*=ddlIRBStatus]")[0].value == 2 && !($("[id*=hdnIRBFile]").val() != "" || $("[id*=fuIRBFile]").val() != "")) {
        if ($('.frmIRB b').is(':visible') == true) {
            MessageBox("Please provide DSRB/IRB file");
            return false;
        }
    }
    if ($("[id*=fuInsuranceFile]").attr("disabled") != "disabled" && !($("[id*=hdnInsuranceFile]").val() != "" || $("[id*=fuInsuranceFile]").val() != "")) {
        MessageBox("Please provide Clinical trial Insurance file");
        return false;
    }

    CollectPiIDs();
    RemoveDisable();
    return true;
}

function ApplyTableSorter() {

    $("#tblResposive").tablesorter();
}

function ApplyEvents() {


    /*IRB Status*/
    $("[id*=ddlIRBStatus]").change(function () {

        if (this.value == "2") {
            $('.frmIRB b').not(".bIRB").not(".bIRBStatus").show();

            $("[id*=txtIRBNumber]").removeAttr("disabled").addClass("Req");

            $("[id*=txtIRBApproveDate]").removeAttr("disabled").addClass("Req");

            $("[id*=txtIRBApproveEndDate]").removeAttr("disabled").addClass("Req");

            $("[id*=fuIRBFile]").removeAttr("disabled");

            $("[id*=btnIRBFile]").removeAttr("disabled").removeClass("disable");

            $("[id*=fuIRBFile]").parent("span").removeClass("disable");

            $("[id*=txtIRBApproveDate]").next("img").removeAttr("disabled").css("opacity", "1");

            $("[id*=txtIRBApproveEndDate]").next("img").removeAttr("disabled").css("opacity", "1");

            $("[id*=txtIRBFile]").removeAttr("disabled").next().removeAttr("disabled").addClass("action").css("color", "white");

            $("[id*=hdnIRBFileEnabled]").val("Yes");


        }
        else if (this.value == "-1") {
            $('.frmIRB b').not(".bIRB").not(".bIRBStatus").show();
            $("[id*=txtIRBNumber]").attr("disabled", "disabled").removeClass("Req");

            $("[id*=txtIRBApproveDate]").attr("disabled", "disabled").removeClass("Req");

            $("[id*=txtIRBApproveEndDate]").attr("disabled", "disabled").removeClass("Req");

            $("[id*=fuIRBFile]").attr("disabled", "disabled").removeClass("Req");

            $("[id*=fuIRBFile]").parent("span").addClass("disable");

            $("[id*=txtIRBApproveDate]").next("img").attr("disabled", "disabled").css("opacity", "0.5");

            $("[id*=txtIRBApproveEndDate]").next("img").attr("disabled", "disabled").css("opacity", "0.5");

            $("[id*=txtIRBFile]").attr("disabled", "disabled").next().attr("disabled", "disabled").css("color", "grey").removeClass("action");

            $("[id*=hdnIRBFileEnabled]").val("No");


        }
        else {
            $('.frmIRB b').not('.bIRB').not(".bIRBStatus").hide();
            $("[id*=txtIRBNumber]").removeAttr("disabled").removeClass("Req");

            $("[id*=txtIRBApproveDate]").removeAttr("disabled").removeClass("Req");

            $("[id*=txtIRBApproveEndDate]").removeAttr("disabled").removeClass("Req");


            $("[id*=fuIRBFile]").removeAttr("disabled");

            $("[id*=btnIRBFile]").removeAttr("disabled").removeClass("disable");

            $("[id*=fuIRBFile]").parent("span").removeClass("disable");



            $("[id*=txtIRBApproveDate]").next("img").removeAttr("disabled").css("opacity", "2.5");

            $("[id*=txtIRBApproveEndDate]").next("img").removeAttr("disabled").css("opacity", "2.5");

            $("[id*=txtIRBFile]").removeAttr("disabled").next().removeAttr("disabled").addClass("action").css("color", "white");

            $("[id*=hdnIRBFileEnabled]").val("Yes");

        }


    });

    if ($("[id*=ddlIRBStatus]")[0].value != 2) {
        $('.frmIRB b').not(".bIRB").not(".bIRBStatus").hide();
        $("[id*=txtIRBNumber]").removeClass("Req");

        $("[id*=txtIRBApproveDate]").removeClass("Req");

        $("[id*=txtIRBApproveEndDate]").removeClass("Req");

        $("[id*=fuIRBFile]").removeClass("Req");

      //  $("[id*=fuIRBFile]").parent("span").addClass("disable");

        $("[id*=txtIRBApproveDate]").next("img").removeAttr("disabled").css("opacity", "2.5");

        $("[id*=txtIRBApproveEndDate]").next("img").removeAttr("disabled").css("opacity", "2.5");

        $("[id*=txtIRBFile]").removeAttr("disabled").next().removeAttr("disabled").addClass("action").css("color", "white");

        $("[id*=hdnIRBFileEnabled]").val("Yes");

    }
     if ($("[id*=ddlIRBStatus]")[0].value == -1) {
         $('.frmIRB b').not(".bIRB").not(".bIRBStatus").show();
    }
    /*IRB Status*/

    /*Renewal*/
    $("[id*=ddlRenewal]").change(function () {

        if (this.value == "1") {

            $("[id*=txtNewStudyEndDate]").removeAttr("disabled").addClass("Req");

            $("[id*=txtNewStudyEndDate]").next("img").removeAttr("disabled").css("opacity", "1");

            $("[id*=hdnNewStudyEndDtEnabled]").val("Yes");
        }
        else {
            $("[id*=txtNewStudyEndDate]").attr("disabled", "disabled").removeClass("Req");

            $("[id*=txtNewStudyEndDate]").next("img").attr("disabled", "disabled").css("opacity", "0.5");

            $("[id*=hdnNewStudyEndDtEnabled]").val("No");
        }
    });

    if ($("[id*=ddlRenewal]")[0].value != 1) {

        $("[id*=txtNewStudyEndDate]").attr("disabled", "disabled").removeClass("Req");

        $("[id*=txtNewStudyEndDate]").next("img").attr("disabled", "disabled").css("opacity", "0.5");

        $("[id*=hdnNewStudyEndDtEnabled]").val("No");
    }
    /*Renewal*/

    /*Clinical Trial Insurance*/
    $("[id*=ddlClinicalTrialInsurance]").change(function () {

        if (this.value == "1") {

            $("[id*=ddlPeriodOfInsurance]").removeAttr("disabled");

            $("[id*=fuInsuranceFile]").removeAttr("disabled");

            $("[id*=fuInsuranceFile]").parent("span").removeClass("disable");

            $("[id*=ddlPeriodOfInsurance]").next("img").removeAttr("disabled").css("opacity", "1");

            $("[id*=txtInsuranceFile]").removeAttr("disabled").next().removeAttr("disabled").addClass("action").css("color", "white");

            $("[id*=hdnInsuranceFileEnabled]").val("Yes");

        }
        else {
            $("[id*=ddlPeriodOfInsurance]").attr("disabled", "disabled").removeClass("Req");

            $("[id*=fuInsuranceFile]").attr("disabled", "disabled").removeClass("Req");

            $("[id*=fuInsuranceFile]").parent("span").addClass("disable");

            $("[id*=ddlPeriodOfInsurance]").next("img").attr("disabled", "disabled").css("opacity", "0.5");

            $("[id*=txtInsuranceFile]").attr("disabled", "disabled").next().attr("disabled", "disabled").css("color", "grey").removeClass("action");

            $("[id*=hdnInsuranceFileEnabled]").val("No");


        }
    });

    if ($("[id*=ddlClinicalTrialInsurance]")[0].value != 1) {

        $("[id*=ddlPeriodOfInsurance]").attr("disabled", "disabled").removeClass("Req");
        $("[id*=fuInsuranceFile]").attr("disabled", "disabled").removeClass("Req");

        $("[id*=fuInsuranceFile]").parent("span").addClass("disable");

        $("[id*=ddlPeriodOfInsurance]").next("img").attr("disabled", "disabled").css("opacity", "0.5");

        $("[id*=txtInsuranceFile]").attr("disabled", "disabled").next().attr("disabled", "disabled").css("color", "grey").removeClass("action");

        $("[id*=hdnInsuranceFileEnabled]").val("No");

    }
    /*Clinical Trial Insurance*/

    /*CRIO Record Culled */
    $("[id*=ddlCRIOCulled]").change(function () {

        if (this.value == "1") {

            $("[id*=txtCRIOCulledDate]").removeAttr("disabled").addClass("Req");

            $("[id*=txtCRIOCulledDate]").next("img").removeAttr("disabled").css("opacity", "1");

            $("[id*=hdnRecordCulledEnabled]").val("Yes");
        }
        else {
            $("[id*=txtCRIOCulledDate]").attr("disabled", "disabled").removeClass("Req");

            $("[id*=txtCRIOCulledDate]").next("img").attr("disabled", "disabled").css("opacity", "0.5");

            $("[id*=hdnRecordCulledEnabled]").val("No");
        }
    });

    if ($("[id*=ddlCRIOCulled]")[0].value != 1) {

        $("[id*=txtCRIOCulledDate]").attr("disabled", "disabled").removeClass("Req");

        $("[id*=txtCRIOCulledDate]").next("img").attr("disabled", "disabled").css("opacity", "0.5");

        $("[id*=hdnRecordCulledEnabled]").val("No");
    }
    /*CRIO Record Culled */

    /*Project Status  */
    ////$("[id*=ddlProjectStatus]").change(function () {

    ////    if (this.value == "3" || this.value == "4" || this.value == "5") {

    ////        $("[id*=dtCompleted_Withdrawn]").removeAttr("disabled").addClass("Req");

    ////        $("[id*=dtCompleted_Withdrawn]").next("img").removeAttr("disabled").css("opacity", "1");

    ////        $("[id*=hdnDtTerminatedEnabled]").val("Yes");
    ////    }
    ////    else {
    ////        $("[id*=dtCompleted_Withdrawn]").attr("disabled", "disabled").removeClass("Req");

    ////        $("[id*=dtCompleted_Withdrawn]").next("img").attr("disabled", "disabled").css("opacity", "0.5");

    ////        $("[id*=hdnDtTerminatedEnabled]").val("No");
    ////    }
    ////});

    ////if ($("[id*=ddlProjectStatus]")[0].value != "3" && $("[id*=ddlProjectStatus]")[0].value != "4" && $("[id*=ddlProjectStatus]")[0].value != "5") {

    ////    $("[id*=dtCompleted_Withdrawn]").attr("disabled", "disabled").removeClass("Req");

    ////    $("[id*=dtCompleted_Withdrawn]").next("img").attr("disabled", "disabled").css("opacity", "0.5");

    ////    $("[id*=hdnDtTerminatedEnabled]").val("No");
    ////}
    /*Project Status  */


    /*File Upload */
    var insuranceFileText = $("[id*=btnDownInsuranceFile]").text();

    $("[id*=btnDownInsuranceFile]").attr("title", insuranceFileText);

    $("[id*=btnDownInsuranceFile]").text(trimText(insuranceFileText, 40));

    var IRBFileText = $("[id*=btnDownIRBFile]").text();

    $("[id*=btnDownIRBFile]").attr("title", IRBFileText);

    $("[id*=btnDownIRBFile]").text(trimText(IRBFileText, 40));

    $(".btnUpload").click(function () {

        var fuID = $(this).prev().prev().attr("id");

        var hdnId = $(this).attr("hdnparam");

        if ($("[id*=" + hdnId + "]").val() != "") {

            ConfirmBox("Are you sure to overwrite existing file?", "$('#" + fuID + "').click();");
        }
        else {
            $("#" + fuID).click();
        }
    });
    /*File Upload */

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

    //To clear all the controls on Department change
    $("[id*=TxtDepartment]").change(function () {
        items();
    });

    //To validate Approve end date should be greater or equal to start date
    $("[id*=txtIRBApproveEndDate]").change(function () {
        if ($('.frmIRB b').not(".bIRB").not(".bIRBStatus").is(':visible') == true) {
            var start = $("[id*=txtIRBApproveDate]").val();

            if (start == "") {
                MessageBox("Please select DSRB/IRB Approved Date first");
                $(this).val("");
            }
            else {
                var start1 = new Date(ConvertMonthNameToNumeric(start.split("-")[1]) + "/" + start.split("-")[0] + "/" + start.split("-")[2]);
                var end = new Date(ConvertMonthNameToNumeric($(this).val().split("-")[1]) + "/" + $(this).val().split("-")[0] + "/" + $(this).val().split("-")[2]);
                if (end < start1) {
                    MessageBox("DSRB/IRB# Approved End Date should be greater than or equal to DSRB/IRB Approved Date");
                    $(this).val("");
                }
            }
        }

    });

    //To disable the cal icon of start date
    if ($("[id*=txtEthicsStartDate").is(":disabled")) {
        var interval = setTimeout(function () {
            if ($("[id*=txtEthicsStartDate").next('img').length > 0) {
                $("[id*=txtEthicsStartDate").next('img').attr("disabled", "disabled").css("opacity", "0.5");
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
  //  $('.newPI').attr('type', '');
}

function ClearNewPi() {
    $(".frmNewPIDetails input[type=text]").val("");
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

    $(".btn").addClass("disable1").removeClass("action");

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






function ProjDtMax(LeastDate, MaxDate) {

    //*********Left side date means Ldate check for > than Mdate if Ldate is Greater than or Equal to Mdate then return false else true
    var dates = new Array();
    dates.push(LeastDate);
    var LDate = GetMaxDate(dates);
    var MDate = ConvertDatetoMDY(MaxDate);
    var reslt = CalGreaterDate(LDate, MDate);
    return reslt;
}
