"use strict;"

///-----------------'Load Event'
$(function () {

    ApplyPaging('tblResposive', 'Paging', 10);
    $('#tblResposive').tablesorter();
    ApplyScript();

    if ($("#tblResposive tbody tr").length == 0) {
        $('[id*=MainContent_SearchBox_txtSearch]').val('');
        $("#tblResposive tbody").html("<tr><td colspan='6' > No Records Available <td></tr>");
        $("#projectPaging").hide();
        $("#tblResposive thead th").css("background-image", "none");
        $("#tblResposive thead th").unbind("click");
    }

    if ($("#tblPiDetail tbody tr").length == 0) {

        $("#tblPiDetail tbody").html("<tr><td colspan='5' > No Records Available <td></tr>");
        $("#projectPaging").hide();
        $("#tblPiDetail thead th").css("background-image", "none");
        $("#tblPiDetail thead th").unbind("click");
    }
    var pagingInterval = setInterval(function () {

        if ($(".header").length > 0) {
            ReApplyPaging('tblResposive');
            clearInterval(pagingInterval);
        }
    }, 100);
    TrimParentProject();
    EnableProjectEndDate();



});
//-------------------
function EnableProjectEndDate() {
    var mode = $("[id*=HdnMode]");
    if (mode.val().toLowerCase() != 'view') {
        $('[id*=TxtProjectEndDate]').removeAttr('disabled').next('img').removeAttr('disabled').css('opacity', '2.5');
    }
    if (mode.val().toLowerCase()!='insert') {
        
        $('[id*=TxtstartDate]').attr('disabled',true).next('img').attr('disabled',true).css('opacity', '0.5');
    }
    if (mode.val().toLowerCase()=='view' || mode.val().toLowerCase()=='delete') {
        $('.frmDetails img').attr('disabled', true).css('opacity', '0.5');
    }
    $('[id*=TxtDispProjId]').attr('disabled', true);
}


function LoadFunc() {
    ApplyPaging('tblResposive', 'Paging', 10);
    $('#tblResposive').tablesorter();
    ApplyScript();

    if ($("#tblResposive tbody tr").length == 0) {
        $('[id*=MainContent_SearchBox_txtSearch]').val('');
        $("#tblResposive tbody").html("<tr><td colspan='6' > No Records Available <td></tr>");
        $("#projectPaging").hide();
        $("#tblResposive thead th").css("background-image", "none");
        $("#tblResposive thead th").unbind("click");
    }

    if ($("#tblPiDetail tbody tr").length == 0) {

        $("#tblPiDetail tbody").html("<tr><td colspan='6' > No Records Available <td></tr>");
        $("#projectPaging").hide();
        $("#tblPiDetail thead th").css("background-image", "none");
        $("#tblPiDetail thead th").unbind("click");
    }
    var pagingInterval = setInterval(function () {

        if ($(".header").length > 0) {
            ReApplyPaging('tblResposive');
            clearInterval(pagingInterval);
        }
    }, 100);
    TrimParentProject();
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
                customers.s_Email
                txtPIEmail.value = customers.s_Email; //customers[0].s_Email;
                txtPiPhoneNo.value = customers.s_Phone_no;// customers[0].s_Phone_no;
                txtPiMCRNo.value = customers.s_MCR_No;//customers[0].s_MCR_No;
                
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


function ClearCloseMorePiSection() {

    $("[id*=TxtDepartment]").val('');
    $("[id*=TxtPIName]").val('');
    $("[id*=txtPIEmail]").val('');
    $("[id*=txtPiPhoneNo]").val('');
    $("[id*=txtPiMCRNo]").val('');
    return false;
}

function ClearCloseNewPiSection() {

    $("[id*=TxtNewDepartment]").val('');
    $("[id*=txtPIEmailAddress]").val('');
    $("[id*=txtPiPhNo]").val('');
    $("[id*=txtPiFirstName]").val('');
    $("[id*=txtPiLastName]").val('');
    $("[id*=txtPIMCR_NO]").val('');


    return false;
}


function SaveMorePi(TxtDepartment, TxtPIName, txtPIEmail, txtPiPhoneNo, txtPiMCRNo, hdnPiID, rptrPIDetails) {
    TxtDepartment = document.getElementById(TxtDepartment);
    TxtPIName = document.getElementById(TxtPIName);
    hdnPiID = document.getElementById(hdnPiID);
    txtPIEmail = document.getElementById(txtPIEmail);
    txtPiPhoneNo = document.getElementById(txtPiPhoneNo);
    txtPiMCRNo = document.getElementById(txtPiMCRNo);
    var DeptId = $("[id*=HdnDeptId]");

    if (TxtDepartment.value.trim() == "") {
        MessageBox("Please select Department");
        TxtDepartment.focus();
        return false;
    }
    if (DeptId.val().trim() == "") {
        MessageBox("Please select Department Search Result");
        return false;
    }

    if (TxtPIName.value.trim() == "") {
        MessageBox("Please select PI");
        TxtPIName.focus();
        return false;
    }
    if (hdnPiID.value.trim() == "") {
        MessageBox("Please select PI Search Result");
        return false;
    }
    $("#tblPiDetail tbody tr td:contains('No Records Available')").each(function () {
        $("#tblPiDetail tbody tr").remove();
    });


    var flag = true;
    $("#tblPiDetail tbody tr").each(function () {

        if ($(this).attr("piid") == hdnPiID.value) {
            MessageBox("PI already added");
            flag = false;
        }
    });
    if (!flag) {
        return false;
    }


    var table = '<tr piId=' + hdnPiID.value + '><td><p>' + TxtDepartment.value + '</p></td><td><p>' + TxtPIName.value + '</p></td><td><p>' + txtPIEmail.value + '</p></td><td><p>' + txtPiPhoneNo.value + '</p></td><td><p>' + txtPiMCRNo.value + '</p></td>'
    table += '<td style="width: 45px;"><p  class="grid-action"><a><img title="Delete Pi Detail" alt="" onclick=delPiRows(this) return false; src="../Images/icon-delete.png"></a></p></td></tr>'
    $('#tblPiDetail  tbody').append(table);

    MessageBox('PI added Successfully..!!')
    $('.frmAddMorePIDetails').slideToggle("slow", "swing", function () {
        if ($('.frmAddMorePIDetails').is(':visible')) {
            $('.newPI').text('Cancel Adding New PI');

        } else {
            $('.newPI').text('Record New PI Details');
            $('.newPI').prev("span").text("+");
            TxtDepartment.value = "";
            TxtPIName.value = "";
            txtPIEmail.value = "";
            txtPiPhoneNo.value = "";
            txtPiMCRNo.value = "";
            $('.frmPI').show();
        }
    });
    $('.newPI').attr('type', '');
    return false;
}

function delPiRows(Obj) {
    var mode = $("[id*=HdnMode]");
    if (mode.val().trim().toLowerCase() == "update") {
        if ($(Obj).parents("tbody").find("tr").length == 1) {
            MessageBox("There should be at least one PI Required.");
            return false;
        }
    }
    if ($(Obj).parents("tbody").find("tr").length >= 1) {

        //var id = $(Obj).parent().parent().parent().parent().attr('piId');
        if ($(Obj).parent().parent().parent().parent().attr('piId') == undefined) {
            id = $(Obj).parent().parent().parent().attr('piId')
        }
        else {
            id = $(Obj).parent().parent().parent().parent().attr('piId')
        }

        return ConfirmBox('Are you sure to Delete this Record..??', "$('#tblPiDetail  tbody tr[piId =" + id + "]').remove();CallNoRecord();");

    }





    return false;
}

function CallNoRecord() {
    if ($("#tblPiDetail tbody tr").length == 0) {

        $("#tblPiDetail tbody").html("<tr><td colspan='5' > No Records Available <td></tr>");
        $("#projectPaging").hide();
        $("#tblPiDetail thead th").css("background-image", "none");
        $("#tblPiDetail thead th").unbind("click");
    }
}

//At Final Save Button click
function IsValidate(HdnPi_ID, Chklst, TxtDispProjId, TxtprojTitle, TxtstartDate, ddlProjCategory,
	ddlProjSubType, ddlProjType, ddlFeasibilityStatus, ddlCollbrationInv, ddlfundingReq, ddlParentProjName,
	ddlstartbyTTSH, ddlChildParent, txtParentProjId
, HdnCoordinatorId, HdnCoordinatorText, HdnMode) {

    HdnMode = document.getElementById(HdnMode);
    TxtDispProjId = document.getElementById(TxtDispProjId);
    TxtprojTitle = document.getElementById(TxtprojTitle);
    TxtstartDate = document.getElementById(TxtstartDate);
    ddlProjCategory = document.getElementById(ddlProjCategory);
    ddlProjSubType = document.getElementById(ddlProjSubType);
    ddlProjType = document.getElementById(ddlProjType);
    ddlFeasibilityStatus = document.getElementById(ddlFeasibilityStatus);
    ddlCollbrationInv = document.getElementById(ddlCollbrationInv);
    ddlfundingReq = document.getElementById(ddlfundingReq);
    ddlParentProjName = document.getElementById(ddlParentProjName);
    ddlstartbyTTSH = document.getElementById(ddlstartbyTTSH);
    ddlChildParent = document.getElementById(ddlChildParent);
    txtParentProjId = document.getElementById(txtParentProjId);
    HdnPi_ID = document.getElementById(HdnPi_ID);
    var HdnId = HdnCoordinatorId;
    var HdnTxt = HdnCoordinatorText;
    HdnCoordinatorId = document.getElementById(HdnCoordinatorId);
    HdnCoordinatorText = document.getElementById(HdnCoordinatorText);
    var ddlselectedproject = document.getElementById($("[id*=ddlselectedproject]").attr('id'));
    HdnPi_ID.value = "";

    //-----------Newly Added----------------
    var ddlProjectStatus = $('[id*=ddlProjectStatus] option:selected');
    var TxtProjectEndDate = $('[id*=TxtProjectEndDate]');
    var ddlEthicsNeeded = $('[id*=ddlEthicsNeeded] option:selected');
    //---------------END

    $('#tblPiDetail  tbody tr').each(function (index, item) {
        HdnPi_ID.value += ',' + $(item).attr('piId');
    });
    if (HdnMode.value.trim().toLowerCase() != 'delete') {
        if (Chklst != null) {
            GetCheckList(Chklst, HdnId, HdnTxt);
        }

        if (TxtDispProjId.value.trim() == "") {
            MessageBox("Please Enter Project Id");
            TxtDispProjId.focus();
            return false;
        }
        if (HdnMode.value.trim().toLowerCase() == 'insert') {
            var r = GetValidatefrmDB(null, 'ValidateDispID', TxtDispProjId.id, $("[id*=HdnId]").val())
            if (r != undefined & r != "") {
                MessageBox(r); return false;
            }
        }
        if (TxtprojTitle.value.trim() == "") {
            MessageBox("Please Enter Project Title");
            TxtprojTitle.focus();
            return false;
        }
        if (TxtstartDate.value.trim() == "") {
            MessageBox("Please Select Project Start Date");
            TxtstartDate.focus();
            return false;
        }
        if (ddlProjectStatus.text().toLowerCase() == '--select--') {
            MessageBox("Please Select Project Status");
            ddlProjectStatus.focus();
            return false;
        }
        if (TxtProjectEndDate.val().trim() == '') {
            MessageBox("Please Select Project End Date");
            TxtProjectEndDate.focus();
            return false;
        }
        if (!ProjDtMax(TxtstartDate.value, TxtProjectEndDate.val())) {
            MessageBox("Project End Date Should be Greater than Project Start Date");
            TxtProjectEndDate.focus();
            return false;
        }
        if (ddlProjCategory.options[ddlProjCategory.selectedIndex].text.toLowerCase() == "--select--") {
            MessageBox("Please Select Project Category");
            ddlProjCategory.focus();
            return false;
        }
        else if (ddlProjCategory.options[ddlProjCategory.selectedIndex].text.toLowerCase() == "pharma") {
            ddlCollbrationInv.selectedIndex = 1;
            //	ddlFeasibilityStatus.selectedIndex = 1;
        }
        if (ddlProjType.options[ddlProjType.selectedIndex].text.toLowerCase() == "--select--") {
            MessageBox("Please Select Project Type");
            ddlProjType.focus();
            return false;
        }
        if (ddlProjSubType.options[ddlProjSubType.selectedIndex].text.toLowerCase() == "--select--") {
            MessageBox("Please Select Project Sub Type");
            ddlProjSubType.focus();
            return false;
        }
        if (ddlEthicsNeeded.text().toLowerCase() == '--select--') {
            MessageBox("Please Select Ethics Needed");
            ddlEthicsNeeded.focus();
            return false;
        }
        if (ddlFeasibilityStatus.options[ddlFeasibilityStatus.selectedIndex].text.toLowerCase() == "--select--") {
            MessageBox("Please Select Feasibility Check Status");
            ddlFeasibilityStatus.focus();
            return false;
        }
        if (ddlselectedproject.options[ddlselectedproject.selectedIndex].text.toLowerCase() == "--select--") {
            MessageBox("Please Select Selected Project");
            ddlselectedproject.focus();
            return false;
        }
        if (ddlCollbrationInv.options[ddlCollbrationInv.selectedIndex].text.toLowerCase() == "--select--") {
            MessageBox("Please Select Collaboration Involved");
            ddlCollbrationInv.focus();
            return false;
        }
        if (ddlstartbyTTSH.options[ddlstartbyTTSH.selectedIndex].text.toLowerCase() == "--select--") {
            MessageBox("Please Select StartBy TTSH");
            ddlstartbyTTSH.focus();
            return false;
        }
        if (ddlfundingReq.options[ddlfundingReq.selectedIndex].text.toLowerCase() == "--select--") {
            MessageBox("Please Select Funding Required");
            ddlfundingReq.focus();
            return false;
        }
        if (ddlChildParent.options[ddlChildParent.selectedIndex].text.toLowerCase() == "--select--") {
            MessageBox("Please Select Child/Parent");
            ddlChildParent.focus();
            return false;
        }
        if (ddlChildParent.options[ddlChildParent.selectedIndex].text.toLowerCase() == "child") {
            if (ddlParentProjName.options[ddlParentProjName.selectedIndex].text.toLowerCase() == "--select--") {
                MessageBox("Please Select Parent Project");
                ddlParentProjName.focus();
                return false;
            }
        }
        if ($("#tblPiDetail tbody tr td").html().toLowerCase().trim().replace(/ +/g, "") == "norecordsavailable") {
            MessageBox("Enter Atleast  One PI Detail"); return false;
        };
        if (HdnPi_ID.value.trim() == "") {
            MessageBox("Please Enter Atleast One PI Detail ");
            return false;
        }
        //if (HdnCoordinatorId.value.trim() == "" || HdnCoordinatorId.value == "-1") {
        //    MessageBox("Please Enter Atleast One Co-Ordinator ");
        //    return false;
        //}
        var returnVal = validateDOobjects();
        if (returnVal === false) {
            return false;
        }
    }


    $("[disabled=disabled]").removeAttr("disabled");
    return true;
}


function ValidateNewPi(TxtNewDepartment, txtPiFirstName, txtPIEmailAddress, txtPiLastName, txtPIMCR_NO) {
    TxtNewDepartment = document.getElementById(TxtNewDepartment);
    txtPiFirstName = document.getElementById(txtPiFirstName);
    txtPIEmailAddress = document.getElementById(txtPIEmailAddress);
    txtPiLastName = document.getElementById(txtPiLastName);
    txtPIMCR_NO = document.getElementById(txtPIMCR_NO);
    var Hndid = $("[id*=HdnNewDeptId]");

    if (TxtNewDepartment.value.trim() == "") {
        MessageBox("Please select Department");
        TxtNewDepartment.focus();
        return false;
    }
    if (Hndid.val().trim() == "") {
        MessageBox("Please select Department Search Result");
        return false;
    }
    if (txtPiFirstName.value.trim() == "") {
        MessageBox("Please Enter FirstName");
        txtPiFirstName.focus();
        return false;
    }
    if (txtPIEmailAddress.value.trim() == "") {
        MessageBox("Please Enter Valid Email-Id");
        txtPIEmailAddress.focus();
        return false;
    }
    if (txtPiLastName.value.trim() == "") {
        MessageBox("Please Enter  LastName");
        txtPiLastName.focus();
        return false;
    }
    if (txtPIMCR_NO.value.trim() == "") {
        MessageBox("Please Enter PI MCR No");
        txtPIMCR_NO.focus();
        return false;
    }
    return true;
}


function DisableControl(txtPIEmail, txtPiMCRNo, txtPiPhoneNo, ddlParentProjName, txtParentProjId) {
    txtPIEmail = document.getElementById(txtPIEmail);
    txtPiMCRNo = document.getElementById(txtPiMCRNo);
    txtPiPhoneNo = document.getElementById(txtPiPhoneNo);
    ddlParentProjName = document.getElementById(ddlParentProjName);
    txtParentProjId = document.getElementById(txtParentProjId);
    //ddlParentProjName.disabled = true;
    //txtParentProjId.disabled = true;
    txtPIEmail.disabled = true;
    txtPiMCRNo.disabled = true;
    txtPiPhoneNo.disabled = true;
}



function EnableParentControls(Obj, txtParentProjId, ddlParentProjName) {
    txtParentProjId = document.getElementById(txtParentProjId);
    ddlParentProjName = document.getElementById(ddlParentProjName);
    var Child = document.getElementById(Obj);
    if (Child != null || Child != undefined) {
        if (Child.options[Child.selectedIndex].text.toLowerCase() == "child") {
            txtParentProjId.disabled = true;
            ddlParentProjName.disabled = false;
            ddlParentProjName.focus();
        }
        else {
            ddlParentProjName.selectedIndex = 0;
            txtParentProjId.value = "";
            txtParentProjId.disabled = true;
            ddlParentProjName.disabled = true;
        }
    }
    else {
        if (Obj != 'MainContent_ddlChildParent') {
            if (Obj.options[Obj.selectedIndex].text.toLowerCase() == "child") {
                txtParentProjId.disabled = true;
                ddlParentProjName.disabled = false;
                ddlParentProjName.focus();
            }
            else {
                ddlParentProjName.selectedIndex = 0;
                txtParentProjId.value = "";
                txtParentProjId.disabled = true;
                ddlParentProjName.disabled = true;
            }
        }



    }



}

function SetCollaboratorOnProjectCategory() {
    var ddlProjCategory = $('[id*=ddlProjCategory] option:selected').text().toLowerCase();
    var HdnMode = $('[id*=HdnMode]').val().toLowerCase();
    var HdnFeasibilityStatus = $('[id*=HdnFeasibilityStatus]').val();
    var ddlCollbrationInv = $('[id*=ddlCollbrationInv]');
    var ddlFeasibilityStatus = $('[id*=ddlFeasibilityStatus]');
    ddlCollbrationInv.removeAttr('disabled');
    ddlFeasibilityStatus.removeAttr('disabled');
    ddlFeasibilityStatus.val(0);
    ddlFeasibilityStatus.attr('title', 'Feasibility Check Status');
    if (HdnMode == 'update') {
        ddlFeasibilityStatus.val(HdnFeasibilityStatus);
    }
    //ddlFeasibilityStatus.disabled = false;
    if (ddlProjCategory == "pharma") {
        ddlCollbrationInv[0].selectedIndex = 1;
        //ddlFeasibilityStatus.selectedIndex = 1;
        //	ddlFeasibilityStatus.disabled = true;
        ddlCollbrationInv.attr('disabled', true);
    }
    else {
        ddlCollbrationInv[0].selectedIndex = 0;
        //ddlFeasibilityStatus.selectedIndex = 0;
    }
    if (ddlProjCategory == 'pi initiated') {
        ddlFeasibilityStatus.val(3);
        ddlFeasibilityStatus.attr('disabled', true);
        ddlFeasibilityStatus.attr('title', 'PI Initiated Project is not applicable for Feasibility');
    }
    if (ddlProjCategory == '--select--') {
        ddlCollbrationInv[0].selectedIndex = 0;
        ddlCollbrationInv.removeAttr('disabled');
        ddlFeasibilityStatus.removeAttr('disabled');
        ddlFeasibilityStatus.val(0);
        ddlFeasibilityStatus.attr('title', 'Feasibility Check Status');
    }
}




function ApplyScript() {

    if ($("[id*=HdnMode]").val().trim().toLowerCase() != "update") {
        $('select[id$="ddlDO_Selected"]').prop("disabled", true);
        $('select[id$="ddlDO_Ethics"]').prop("disabled", true);
        $('select[id$="ddlDO_Grant"]').prop("disabled", true);
        $('select[id$="ddlDO_Feasibility"]').prop("disabled", true);
        $('select[id$="ddlDO_Contract"]').prop("disabled", true);
        $('select[id$="ddlDO_Regulatory"]').prop("disabled", true);
    }
    /*Script for Expand Collapse*/
    //$('.frm:first').slideToggle("slow");
    $('.frmHead').click(function () {
        var frmName = $(this).attr('data-frm');
        var h3Obj = $(this);
        $('.' + frmName).slideToggle("slow", function () {
            if ($(this).is(':visible')) {
                h3Obj.find('span').text('( - )');
            } else {
                h3Obj.find('span').text('( + )');
            }
        });



        //------------------For Top head click hide add or more region
        if (frmName == "frmPI") {

            if ($('.frmAddMorePIDetails').is(':visible')) {
                //$('.frmAddMorePIDetails').slideToggle("slow", function () {
                $('.newPI').text('Record New PI Details');
                ClearCloseNewPiSection();
                $('.newPI').attr('type', '');
                $('.frmAddMorePIDetails').slideToggle("slow");
                $('.newPI').prev("span").text("+");
                //});
            }

            if ($('.frmNewPIDetails').is(':visible')) {
                $('.newPI').prev("span").text("+");
                ClearCloseMorePiSection();
                $('.frmNewPIDetails').slideToggle("slow");
                $('.newPI').text('Record New PI Details');
            }
        }
    });

    $('.newPI').click(function () {
        var frmName = $(this).attr('data-frm');
        $(".frmNewPIDetails input[type=text]").val("");
        if ($(this).attr('type') == "addmore") {
            $('.frmPI').show();
            $('.newPI').text('Record New PI Details');
            $('.newPI').prev("span").text("+");
            $('.frmAddMorePIDetails').slideToggle("slow").hide();
            $(this).attr('type', '');
            return;
        }

        if ($('.frmPI').is(':visible')) {
            $('.frmPI').slideToggle("slow");
        }


        $('.frmNewPIDetails').slideToggle("slow", "swing", function () {
            if ($('.frmNewPIDetails').is(':visible')) {
                ClearCloseNewPiSection();
                $('.newPI').text('Cancel Recording New PI Details');
                $('.newPI').prev("span").text("-");
            } else {
                $('.newPI').text('Record New PI Details');
                $('.newPI').prev("span").text("+");
                $('.frmPI').show();
            }
        });






    });



}





function AddMorePI() {
    $(".frmAddMorePIDetails input[type=text]").val("");

    $('.newPI').attr("type", 'addmore');
    var frmName = $(this).attr('data-frm');

    if ($('.frmPI').is(':visible')) {
        $('.frmPI').slideToggle("slow");
    }


    $('.frmAddMorePIDetails').slideToggle("slow", "swing", function () {
        if ($('.frmAddMorePIDetails').is(':visible')) {
            $('.newPI').text('Cancel Adding  PI');
            $('.newPI').prev("span").text("-");
        } else {
            $('.newPI').text('Record New PI Details');
            $('.newPI').prev("span").text("+");
        }
    });

}





function CallDelete(Id) {
    var HdnId = $('[id*=HdnId]');
    HdnId.val(Id);
    $('[id*=delete]').click();
}

function ConfirmDelete(id) {

   // var msg = GetValidatefrmDB(null, 'RistrictProjectDelete', id, '', '', '');
    //if (msg != '') {
    //    MessageBox(msg);
    //    return false;
    //}

    return ConfirmBox('Are you sure to delete this Record..!!', 'CallDelete(' + id + ')')

}

function TrimParentProject() {
    $('[id*=ddlParentProjName] option').each(function (index, item) {


        $(item).attr('title', $(item).text().trim());
        $(item).text(Trim($(item).text().trim(), 40));

    });

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
