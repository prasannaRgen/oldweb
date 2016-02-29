"use strict"

//****************** Load Event***************

$(function () {
    ApplyScript();
    SetNoRecord();
    DisableCTCControls();
    SetIPStorageDisable();
    PagingRegulatory();
    SetOtherSponsorDesable();

    TrimFName();
    HideActionColumn();
    DisablePrismControl();
    HidePTag();
    //  TrimGridProjectName();
    $('[id*=ddlPrismStatus]').on('change', function () {
        DisablePrismControl();
    });



    DisableAllFormControls();
    DisableCTCApprandCTCExp();
});

function LoadFunc() {
    ApplyScript();
    SetNoRecord();
    DisableCTCControls();
    SetIPStorageDisable();
    PagingRegulatory();
    SetOtherSponsorDesable();
    DisableAllFormControls();
    TrimFName();
    HideActionColumn();
    DisablePrismControl();
    $('[id*=ddlPrismStatus]').on('change', function () {
        DisablePrismControl();
    });
}
//*******************END***********************



//*****************Save Region**************************
function SaveStudyTeamMember() {
    var TxtFirstname = $('[id*=TxtFirstname]');
    var TxtLastName = $('[id*=TxtLastName]');
    var TxtEmailId = $('[id*=TxtEmailId]');
    if (TxtFirstname.val().trim() == "") {
        MessageBox("Please Enter First Name");
        TxtFirstname.focus();
        return false;
    }
    if (TxtLastName.val().trim() == "") {
        MessageBox("Please Enter Last Name");
        TxtLastName.focus();
        return false;
    }
    if (TxtEmailId.val().trim() == "") {
        MessageBox("Please Enter Email Id");
        TxtEmailId.focus();
        return false;
    }



    $("#tlbStudyMember tbody tr td:contains('No Records Available')").each(function () {
        $("#tlbStudyMember tbody tr").remove();
    });
    var check = true;
    if ($("#tlbStudyMember tbody tr").length >= 1) {
        $('#tlbStudyMember tbody tr').each(function (index, item) {
            var EmailId = $(item).closest('tr').find('td:eq(2)').find('p').text().trim().toLowerCase();
            if (EmailId == TxtEmailId.val().trim().toLowerCase()) {
                check = false;
            }
        });
    }
    if (check == false) {
        MessageBox("Team Member with given Email Id already exists.");
        return false;
    }
    else if (CheckEmailExistsfromDB(TxtEmailId.val()) == false) {
        MessageBox("Team Member with given Email Id already exists.");
        return false;
    }
    else {
        var table = '<tr>' +
                       '<td style="width: 500px"><p>' + TxtFirstname.val() + '</p></td>' +
                       '<td><p>' + TxtLastName.val() + '</p></td>' +
                      '<td><p>' + TxtEmailId.val() + '</p></td>'
        table += '<td style="width: 45px;"><p  class="grid-action"><a><img title="delete" alt="Delete" onclick="return delStudyTeamRows(this);"  src="../Images/icon-delete.png"></a></p></td></tr>'
        $('#tlbStudyMember  tbody').append(table);
        MessageBox("StudyTeam Member Added Successfully..!!");
        TxtFirstname.focus();
        $('.MoreTeamMember').click();
    }


    return false;
}
function delStudyTeamRows(Obj) {
    var id = "";
    var mode = $("[id*=HdnMode]");
    if (mode.val().trim().toLowerCase() == "update") {
        if ($(Obj).parents("tbody").find("tr").length == 1) {
            MessageBox("There should be at least one StudyMember  Required.");
            return false;
        }
    }
    if ($(Obj).parents("tbody").find("tr").length >= 1) {
        $(Obj).parent().parent().parent().parent().addClass('removeStudyTeam');
        ConfirmBox('Are you sure to Delete this Record..??', "$('.removeStudyTeam').remove();CallNoRecord_StudyTeam();");
    }

    return true;
}
function CallNoRecord_StudyTeam() {
    if ($("#tlbStudyMember tbody tr").length == 0) {

        $("#tlbStudyMember tbody").html("<tr><td colspan='3' > No Records Available <td></tr>");
        $("#tlbStudyMember thead th").css("background-image", "none");
        $("#tlbStudyMember thead th").unbind("click");
    }
    return false;
}

function FunctionPISDetail() {
    var TxtPISversionNo = $('[id*=TxtPISversionNo]');
    var TxtPISDate = $('[id*=TxtPISDate]');
    if (TxtPISversionNo.val().trim() == "") {
        MessageBox("Please Enter PIS Version No");
        TxtPISversionNo.focus();
        return false;
    }
    if (TxtPISDate.val().trim() == "") {
        MessageBox("Please Select PIS Version Date");
        TxtPISDate.focus();
        return false;
    }
    $("#tlbPIS tbody tr td:contains('No Records Available')").each(function () {
        $("#tlbPIS tbody tr").remove();
    });
    var table = '<tr>' +
				'<td style="width: 500px"><p>' + TxtPISversionNo.val() + '</p></td>' +
				'<td><p>' + TxtPISDate.val() + '</p></td>'
    table += '<td style="width: 45px;"><p  class="grid-action"><a><img title="delete" alt="Delete" onclick="return delPISRows(this);"  src="../Images/icon-delete.png"></a></p></td></tr>'
    $('#tlbPIS  tbody').append(table);
    MessageBox("PIS Detail Added Successfully..!!");
    TxtPISversionNo.focus();
    $('.MorePIS').click();
    return false;
}
function delPISRows(Obj) {
    var id = "";
    var mode = $("[id*=HdnMode]");
    //if (mode.val().trim().toLowerCase() == "update") {
    //    if ($(Obj).parents("tbody").find("tr").length == 1) {
    //        MessageBox("There should be at least one PIS/ICF Details  Required.");
    //        return false;
    //    }
    //}
    if ($(Obj).parents("tbody").find("tr").length >= 1) {
        $(Obj).parent().parent().parent().parent().addClass('removePIS');
        ConfirmBox('Are you sure to Delete this Record..??', "$('.removePIS').remove();CallNoRecord_PIS();");
    }


    return true;
}
function CallNoRecord_PIS() {
    if ($("#tlbPIS tbody tr").length == 0) {

        $("#tlbPIS tbody").html("<tr><td colspan='2' > No Records Available <td></tr>");
        $("#tlbPIS thead th").css("background-image", "none");
        $("#tlbPIS thead th").unbind("click");
    }
    return false;
}

function SaveStatusReportSubmissionFile() {
    var ddlStatusRptmonth = $('[id*=ddlStatusRptmonth] option:selected');
    var TxtStatusRptTitle = $('[id*=TxtStatusRptTitle]');
    var fldStatusRptFile = $('[id*=fldStatusRptFile]');
    if (ddlStatusRptmonth.text().toLowerCase() == '--select--') {
        MessageBox("Please Select Proper Month Interval!!");
        ddlStatusRptmonth.focus();
        return false;
    }
    if (TxtStatusRptTitle.val().trim() == '') {
        MessageBox("Please Enter File Title !!");
        TxtStatusRptTitle.focus();
        return false;
    }
    if (fldStatusRptFile.val().trim() == '') {
        MessageBox("Please Upload File.. !!");
        fldStatusRptFile.focus();
        return false;
    }

    var path = $('[id*=HdnGlobPath]').val();
    var filepath = $('[id*=HdnGlobPath]').val().trim() == "" ? ' ' : path.split('|')[0].replace(/ +/g, "*");
    var fileName = $('[id*=HdnGlobPath]').val().trim() == "" ? ' ' : path.split('|')[1];
    $("#tblStatusMontly tbody tr td:contains('No Records Available')").each(function () {
        $("#tblStatusMontly tbody tr").remove();
    });
    var table = '<tr filepath="' + filepath + '" IntervalId="' + ddlStatusRptmonth.val() + '" >' +
				'<td style="width: 250px"><p>' + ddlStatusRptmonth.text() + '</p></td>' +
				'<td style="width: 500px"><p>' + TxtStatusRptTitle.val() + '</p></td>' +
                '<td style="width: 230px"><p>' + fileName + '</p></td>'
    table += '<td style="width: 45px;text-align:right"><p  class="grid-action"><a><img title="delete" alt="Delete" onclick="return delStatusSubFileRows(this);"  src="../Images/icon-delete.png"></a></p></td></tr>'
    $('#tblStatusMontly  tbody').append(table);
    MessageBox("Status Report SubmissionFile Added Successfully..!!");
    ddlStatusRptmonth.focus();
    $('[id*=HdnGlobPath]').val('');
    $('.MonlyStatusRpt').click();
    return false;
}



function delStatusSubFileRows(Obj) {
    var id = "";
    var mode = $("[id*=HdnMode]");
    //if (mode.val().trim().toLowerCase() == "update") {
    //    if ($(Obj).parents("tbody").find("tr").length == 1) {
    //        MessageBox("There should be at least one Status Report Submission File  Required.");
    //        return false;
    //    }
    //}
    if ($(Obj).parents("tbody").find("tr").length >= 1) {
        $(Obj).parent().parent().parent().parent().addClass('removeStatusSubFile');
        ConfirmBox('Are you sure to Delete this Record..??', "$('.removeStatusSubFile').remove();CallNoRecord_StatusSubFile();");
    }


    return true;
}
function CallNoRecord_StatusSubFile() {
    if ($("#tblStatusMontly tbody tr").length == 0) {

        $("#tblStatusMontly tbody").html("<tr><td colspan='3' > No Records Available <td></tr>");
        $("#tblStatusMontly thead th").css("background-image", "none");
        $("#tblStatusMontly thead th").unbind("click");
    }
    return false;
}

function SaveAmendmentsDetails() {
    var TxtAmendmentSubDate = $('[id*=TxtAmendmentSubDate]');
    var fldAmendmentLetter = $('[id*=fldAmendmentLetter]');
    if (TxtAmendmentSubDate.val().trim() == "") {
        MessageBox("Please Select Amendment Submission Date.. !!");
        TxtAmendmentSubDate.focus();
        return false;
    }
    if (fldAmendmentLetter.val().trim() == '') {
        MessageBox("Please Upload Amendment Approval Letter.. !!");
        fldAmendmentLetter.focus();
        return false;
    }

    var path = $('[id*=HdnGlobPath]').val();
    var filepath = $('[id*=HdnGlobPath]').val().trim() == "" ? ' ' : path.split('|')[0].replace(/ +/g, "*");
    var fileName = $('[id*=HdnGlobPath]').val().trim() == "" ? ' ' : path.split('|')[1];

    $("#tblAmendmentDetails tbody tr td:contains('No Records Available')").each(function () {
        $("#tblAmendmentDetails tbody tr").remove();
    });
    var table = '<tr filepath="' + filepath + '" >' +
				'<td style="width: 200px"><p>' + TxtAmendmentSubDate.val() + '</p></td>' +
				'<td style="width: 170px"><p>' + fileName + '</p></td>'
    table += '<td  style="width: 45px;text-align:right"><p  class="grid-action"><a><img title="delete" alt="Delete" onclick="return delAmendmentsDetailRows(this);"  src="../Images/icon-delete.png"></a></p></td></tr>'
    $('#tblAmendmentDetails  tbody').append(table);
    MessageBox("Amendment Details Added Successfully..!!");
    $('[id*=HdnGlobPath]').val('');
    $('.AmentDetails').click();
    return false;
}
function delAmendmentsDetailRows(Obj) {
    var id = "";
    var mode = $("[id*=HdnMode]");
    //if (mode.val().trim().toLowerCase() == "update") {
    //    if ($(Obj).parents("tbody").find("tr").length == 1) {
    //        MessageBox("There should be at least one Amendments Details  Required.");
    //        return false;
    //    }
    //}
    if ($(Obj).parents("tbody").find("tr").length >= 1) {
        $(Obj).parent().parent().parent().parent().addClass('removeAmendment');
        ConfirmBox('Are you sure to Delete this Record..??', "$('.removeAmendment').remove();CallNoRecord_AmendmentDetail();");
    }


}
function CallNoRecord_AmendmentDetail() {
    if ($("#tblAmendmentDetails tbody tr").length == 0) {

        $("#tblAmendmentDetails tbody").html("<tr><td colspan='2' > No Records Available <td></tr>");
        $("#tblAmendmentDetails thead th").css("background-image", "none");
        $("#tblAmendmentDetails thead th").unbind("click");
    }
    return false;
}

function SaveOtherDetails() {
    var TxtInvestigationalProduct = $('[id*=TxtInvestigationalProduct]');
    var ddlIp = $('[id*=ddlIp] option:selected');
    var TxtIPLocation = $('[id*=TxtIPLocation]');
    if (TxtInvestigationalProduct.val().trim() == '') {
        MessageBox("Please Enter Investigational Product.. !!");
        TxtInvestigationalProduct.focus();
        return false;
    }
    if (ddlIp.text().toLowerCase() == '--select--') {
        MessageBox("Please Select Management of IP (storage and dispensing).. !!");
        ddlIp.focus();
        return false;

    }
    else if (ddlIp.text().toLowerCase() == 'others') {
        if (TxtIPLocation.val().trim() == '') {
            MessageBox("Please Enter IP Storage Location.. !!");
            TxtIPLocation.focus();
            return false;

        }
    }

    $("#tblOther tbody tr td:contains('No Records Available')").each(function () {
        $("#tblOther tbody tr").remove();
    });
    var table = '<tr IpId=' + ddlIp.val() + ' >' +
				'<td style="width: 280px"><p>' + TxtInvestigationalProduct.val() + '</p></td>' +
				'<td style="width:540px"><p>' + ddlIp.text() + '</p></td>' +
                '<td style="width:250px"><p>' + TxtIPLocation.val() + '</p></td>'
    table += '<td style="width: 45px; text-align: right"><p  class="grid-action"><a><img title="delete" alt="Delete" onclick="return delInvestProductRows(this);"  src="../Images/icon-delete.png"></a></p></td></tr>'
    $('#tblOther  tbody').append(table);
    MessageBox(" Investigational Product  Added Successfully..!!");
    TxtInvestigationalProduct.focus();
    $('.Others').click();

    return false;
}
function delInvestProductRows(Obj) {
    var id = "";
    var mode = $("[id*=HdnMode]");
    //if (mode.val().trim().toLowerCase() == "update") {
    //    if ($(Obj).parents("tbody").find("tr").length == 1) {
    //        MessageBox("There should be at least one Investigational Product  Details  Required.");
    //        return false;
    //    }
    //}
    if ($(Obj).parents("tbody").find("tr").length >= 1) {
        $(Obj).parent().parent().parent().parent().addClass('removeInvestproduct');
        ConfirmBox('Are you sure to Delete this Record..??', "$('.removeInvestproduct').remove();CallNoRecord_InvestProductRows();");
    }
}
function CallNoRecord_InvestProductRows() {

    if ($("#tblOther tbody tr").length == 0) {

        $("#tblOther tbody").html("<tr><td colspan='3' > No Records Available <td></tr>");
        $("#tblOther thead th").css("background-image", "none");
        $("#tblOther thead th").unbind("click");
    }
    return false;
}
//******************END*********************************



//*************Reset Controls****************************
function ResetfrmOtherDetails() {
    var modess = $('[id*=HdnMode]').val().toLowerCase();
    $(".frmOtherDetails input[type=text]").val("");
    $(".frmOtherDetails select").val(0);
    if (modess == 'insert') {
        //$('.datepicker.Req').val(GetDate('-'));
    }
    $('.frmOtherDetails input[type=file]').val('')
    return false;
}
function ResetfrmAmendmentDetails() {
    var modess = $('[id*=HdnMode]').val().toLowerCase();
    $(".frmAmendmentDetails input[type=text]").val("");
    $(".frmAmendmentDetails select").val(-1);
    if (modess == 'insert') {
        //$('.datepicker.Req').val(GetDate('-'));
    }
    $('[id*=HdnGlobPath]').val('');
    $('.frmAmendmentDetails input[type=file]').val('')
    return false;
}
function ResetfrmMonthlyStatusReport() {
    var modess = $('[id*=HdnMode]').val().toLowerCase();
    $(".frmMonthlyStatusReport input[type=text]").val("");
    $(".frmMonthlyStatusReport select").val(0);
    $('[id*=HdnGlobPath]').val('');
    if (modess == 'insert') {
        //$('.datepicker.Req').val(GetDate('-'));
    }
    $('.frmMonthlyStatusReport input[type=file]').val('')
    return false;
}
function ResetfrmSixMonthUpdate() {
    var modess = $('[id*=HdnMode]').val().toLowerCase();
    $(".frmSixMonthUpdate input[type=text]").val("");
    $(".frmSixMonthUpdate select").val(-1);
    if (modess == 'insert') {
        //  //$('.datepicker.Req').val(GetDate('-'));
    }
    $('.frmSixMonthUpdate input[type=file]').val('')
    return false;
}
function ResetfrmAddMorePIS() {
    var modess = $('[id*=HdnMode]').val().toLowerCase();
    $(".frmAddMorePIS input[type=text]").val("");
    $(".frmAddMorePIS select").val(-1);
    if (modess == 'insert') {
        //$('.datepicker.Req').val(GetDate('-'));
    }
    $('.frmAddMorePIS input[type=file]').val('')
    return false;
}
function ResetfrmAddMoreTeamMember() {
    var modess = $('[id*=HdnMode]').val().toLowerCase();
    $(".frmAddMoreTeamMember input[type=text]").val("");
    $(".frmAddMoreTeamMember select").val(-1);

    $('.frmAddMoreTeamMember input[type=file]').val('')
    return false;
}

function ResetAll() {
    $('[id*=LnkDwnldCTCDoc]').text('');
    $('[id*=LnkDnwldNCTCEmailApprDoc]').text('');
    $('[id*=LnkDnwldCTCEmailApprDoc]').text('');
    $('[id*=LnkDwnldExtCTCEmailApprDoc]').text('');
    $('.frmProject input[type=text],textarea[id=MainContent_TxtProjTitle]').val('')
    $('.frmSponser  input[type=text]').val("");
    $('.frmSponser  select').val(-1);
    $('.frmPrism  input[type=text]').val("");
    $('.frmPrism  select').val(-1);
    $('.frmCTCDetails  input[type=text],input[type=file]').val("");
    $('.frmCTCDetails  select').val(-1);
    $('.frmProtocolDetails  input[type=text]').val("");
    $('.frmStatusSubmissionDate  input[type=text]').val("");
    $('[id*=HdnCTCDocPath]').val('');
    $('[id*=HdnCTCEmailApprDoc]').val('');
    $('[id*=HdnNCTCEmailApprDoc]').val('');
    $('[id*=HdnExtCTCEmailApprDoc]').val('');
    $('.frmLast input[type=text]').val('')
    ResetfrmOtherDetails();
    ResetfrmAmendmentDetails();
    ResetfrmMonthlyStatusReport();
    ResetfrmSixMonthUpdate();
    ResetfrmAddMorePIS();
    ResetfrmAddMoreTeamMember();


    SetNoRecord();


}

function DisableAllFormControls() {
    var mode = $('[id*=HdnMode]').val().toLowerCase();
    if (mode == 'view') {
        $('body input,textarea,select,file,img,a').not('[id*=lnkback],[id*=btnCancel]').attr('disabled', true);
        $('.ui-datepicker-trigger').css("opacity", "0.5");
        $('.tabItems a').removeAttr('disabled')
        $('[id*=DivTab] input').removeAttr('disabled').removeAttr('sel')
    }
    else if (mode == 'delete') {
        $('body input[type=text],textarea,select,file,img,a').not('[id*=lnkback]').attr('disabled', true);
        $('.ui-datepicker-trigger').css("opacity", "0.5");
        $('.tabItems a').removeAttr('disabled')
        $('[id*=DivTab] input').removeAttr('disabled').removeAttr('sel')
    }

}
//***************END**************************************



//*******************Enable Disable**********************
function EnableDatePickerWithImage() {
    var interval = setInterval(function () {

        if ($('.datepicker').next("img").length > 0) {
            $('.datepicker').removeAttr("disabled");
            $('.datepicker').next("img").removeAttr("disabled").css("opacity", "2.5");
            clearInterval(interval);
        }

    }, 100);
}
function DisableDatePickerwithImage() {
    var interval = setInterval(function () {

        if ($('.datepicker').next("img").length > 0) {
            $('.datepicker').attr("disabled", "disabled");
            $('.datepicker').next("img").attr("disabled", "disabled").css("opacity", "0.5")
            clearInterval(interval);
        }

    }, 100);
}
function DisableCTCControls() {
    var ddlCTCStatus = $('[id*=ddlCTCStatus] option:selected');
    var TxtCtcNo = $('[id*=TxtCtcNo]');
    var fldCTCdocument = $('[id*=fldCTCdocument]');
    var fldCTCEmailApprDoc = $('[id*=fldCTCEmailApprDoc]');
    var TxtCTCAppDate = $('[id*=TxtCTCAppDate]');
    var TxtCTCExpiryDate = $('[id*=TxtCTCExpiryDate]');
    var mode = $('[id*=HdnMode]').val().toLowerCase();
    var HdnCTCStatus = $('[id*=HdnCTCStatus]');


    TxtCtcNo.attr('disabled', 'disabled');
    fldCTCdocument.attr('disabled', 'disabled');
    fldCTCEmailApprDoc.attr('disabled', 'disabled');
    TxtCTCAppDate.attr('disabled', 'disabled').next("img").attr("disabled", "disabled").css("opacity", "0.5");
    TxtCTCExpiryDate.attr('disabled', 'disabled').next("img").attr("disabled", "disabled").css("opacity", "0.5");
    FuncAtCTCExtend(ddlCTCStatus.text().toLowerCase());
    DisableSixMSubFileSubDate(ddlCTCStatus.text().toLowerCase());
    if (ddlCTCStatus.text().toLowerCase() == "active") {
        TxtCtcNo.removeAttr('disabled');
        fldCTCdocument.removeAttr('disabled');
        fldCTCEmailApprDoc.removeAttr('disabled');
        TxtCTCAppDate.removeAttr('disabled').next("img").removeAttr("disabled").css("opacity", "2.5");
        TxtCTCExpiryDate.removeAttr('disabled').next("img").removeAttr("disabled").css("opacity", "2.5");

    }
    else {
        if (mode == 'insert') {
            TxtCtcNo.val('');
            fldCTCdocument.val('');
            fldCTCEmailApprDoc.val('');
            TxtCTCAppDate.val('');
            TxtCTCExpiryDate.val('');
            $('.frmStatusSubmissionDate  input[type=text]').val("");
        }
    }
    if (ddlCTCStatus.text().toLowerCase() == "active" || ddlCTCStatus.text().toLowerCase() == "extended" || ddlCTCStatus.text().toLowerCase() == "terminated") {
        SetDates();
    }
    else {
        //  $('.frmStatusSubmissionDate  input[type=text]').val("");
    }
    if (HdnCTCStatus.val().trim() == '') {
        TxtCtcNo.val('');
        fldCTCdocument.val('');
        fldCTCEmailApprDoc.val('');
        TxtCTCAppDate.val('');
        TxtCTCExpiryDate.val('');
    }
}
function FuncAtCTCExtend(status) {
    var TxtCTCExtAppDate = $('[id*=TxtCTCExtAppDate]');
    var TxtNewCTCExpiryDate = $('[id*=TxtNewCTCExpiryDate]');
    var fldNewCTCEmailApprDoc = $('[id*=fldNewCTCEmailApprDoc]');
    var fldExtCTCEmailApprDoc = $('[id*=fldExtCTCEmailApprDoc]');
    var HdnExtendedStatus = $('[id*=HdnExtendedStatus]');



    TxtCTCExtAppDate.attr('disabled', 'disabled').next("img").attr("disabled", "disabled").css("opacity", "0.5");
    TxtNewCTCExpiryDate.attr('disabled', 'disabled').next("img").attr("disabled", "disabled").css("opacity", "0.5");
    fldNewCTCEmailApprDoc.attr('disabled', 'disabled');
    fldExtCTCEmailApprDoc.attr('disabled', 'disabled');
    if (status.toLowerCase() == 'extended') {
        TxtCTCExtAppDate.removeAttr('disabled').next("img").removeAttr("disabled").css("opacity", "2.5");
        TxtNewCTCExpiryDate.removeAttr('disabled').next("img").removeAttr("disabled").css("opacity", "2.5");
        fldNewCTCEmailApprDoc.removeAttr('disabled');
        fldExtCTCEmailApprDoc.removeAttr('disabled');
    }

    if (HdnExtendedStatus.val().trim() == '') {
        TxtCTCExtAppDate.val('');
        TxtNewCTCExpiryDate.val('');
        fldNewCTCEmailApprDoc.val('');
        fldExtCTCEmailApprDoc.val('');
    }

}
function SetIPStorageDisable() {
    var ddlIp = $('[id*=ddlIp] option:selected');
    var TxtIPLocation = $('[id*=TxtIPLocation]');
    var b = $('[id*=bIpStorage]');
    TxtIPLocation.attr('disabled', 'disabled');
    TxtIPLocation.val('');
    b.hide();
    if (ddlIp.text().toLowerCase() == 'others') {
        TxtIPLocation.val('');
        b.show();
        TxtIPLocation.removeAttr('disabled');
    }



}
function DisableSixMSubFileSubDate(status) {

    $('.frmSixMonthUpdate :input').attr('disabled', 'disabled').next("img").attr("disabled", "disabled").css("opacity", "0.5");
    $('.frmSixMonthUpdate .frmAction').find('p input').attr('disabled', 'disabled');

    $('.frmStatusSubmissionDate').find('input').attr('disabled', 'disabled').next("img").attr("disabled", "disabled").css("opacity", "0.5")

    $('.row .col-md-12 p[id=MainContent_P3]>a').attr('disabled', 'disabled')
    $('.row .col-md-12 p[id=MainContent_P4]>a').attr('disabled', true);
    if (status.toLowerCase() == 'extended' || status.toLowerCase() == 'active' || status.toLowerCase() == 'completed') {
        $('.frmSixMonthUpdate :input').removeAttr('disabled').next("img").removeAttr("disabled").css("opacity", "2.5")
        $('.frmSixMonthUpdate .frmAction').find('p input').removeAttr('disabled');

        // $('.frmStatusSubmissionDate').find('input').removeAttr('disabled').next("img").removeAttr("disabled").css("opacity", "2.5")

        $('.row .col-md-12 p[id=MainContent_P3]>a').removeAttr('disabled')
        $('.row .col-md-12 p[id=MainContent_P4]>a').removeAttr('disabled')
    }
    if (status.toLowerCase() == 'terminated') {

        $('.frmSixMonthUpdate .frmAction').find('p input[type=text],select[id*=ddlInternalAudit]').attr('disabled', true);
        $('.frmSixMonthUpdate :input').attr('disabled', 'disabled').next("img").attr("disabled", "disabled").css("opacity", "0.5");
        $('.frmSixMonthUpdate table input[type=button]').removeAttr('disabled')
    }
}
function SetOtherSponsorDesable() {
    var TxtOtherLeadSpnsor = $('[id*=TxtOtherLeadSpnsor]');
    var ddlLeadSponsor = $('[id*=ddlLeadSponsor]  option:selected');
    var HdnOtherSponsor = $('[id*=HdnOtherSponsor]');
    if (HdnOtherSponsor.val().trim() == '') {
        TxtOtherLeadSpnsor.val('');
        TxtOtherLeadSpnsor.attr('disabled', 'disabled');
    }

    if (ddlLeadSponsor.text().toLowerCase() == 'other') {
        TxtOtherLeadSpnsor.removeAttr('disabled');
        TxtOtherLeadSpnsor.focus();
        if (HdnOtherSponsor.val().trim() == '') {
            TxtOtherLeadSpnsor.val('');
        }
    }
}
function DisablePrismControl() {
    var ddlPrismStatus = $('[id*=ddlPrismStatus] option:selected');
    var TxtPrimsAppNo = $('[id*=TxtPrimsAppNo]');
    var TxtPrismSubmissionDate = $('[id*=TxtPrismSubmissionDate]');
    var mode = $('[id*=HdnMode]').val().toLowerCase();
    if (ddlPrismStatus.text().toLowerCase() == '--select--' || ddlPrismStatus.text().toLowerCase() == 'no') {
        TxtPrimsAppNo.attr('disabled', true);
        TxtPrismSubmissionDate.attr('disabled', true);
        TxtPrismSubmissionDate.next("img").attr("disabled", "disabled").css("opacity", "0.5")
        if (mode == 'insert') {
            TxtPrimsAppNo.val('');
            TxtPrismSubmissionDate.val('');
        }
    }
    else {
        TxtPrimsAppNo.removeAttr('disabled');
        TxtPrismSubmissionDate.removeAttr('disabled');
        TxtPrismSubmissionDate.next("img").removeAttr("disabled").css("opacity", "2.5")
    }
}
//****************************END*************************


//********************Other Functiions********
function PagingRegulatory() {
    ApplyPaging('tblResposive', 'Paging', 10);
    $('#tblResposive').tablesorter();
    var pagingInterval = setInterval(function () {

        if ($(".header").length > 0) {
            ReApplyPaging('tblResposive');
            clearInterval(pagingInterval);
        }
    }, 100);

}
function ApplyScript() {

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



        //******************Other Region
        if ($('.frmOtherDetails').is(':visible')) {
            $('.frmOtherDetails').slideToggle().hide();
            $('.Others').text('Add More Investigational Product');
            $('.Others').prev("span").text("+");
        }
        //**************END**************

        //*****************Amendment*********
        if ($('.frmAmendmentDetails').is(':visible')) {
            $('.frmAmendmentDetails').slideToggle().hide();
            $('.AmentDetails').text('Add More Amendment File');
            $('.AmentDetails').prev("span").text("+");
        }
        //****************END****************

        //*************Monthly Status*****
        if ($('.frmMonthlyStatusReport').is(':visible')) {
            $('.frmMonthlyStatusReport').slideToggle().hide();
            $('.MonlyStatusRpt').text('Add Monthly Status Report');
            $('.MonlyStatusRpt').prev("span").text("+");
        }
        //***************END**************

        //**********More PIS**********************
        if ($('.frmAddMorePIS').is(':visible')) {
            $('.frmAddMorePIS').slideToggle().hide();
            $('.MorePIS').text('Add More PIS/ICF');
            $('.MorePIS').prev("span").text("+");
        }
        //*************END**********

        //**********More Team Member**********************
        if ($('.frmAddMoreTeamMember').is(':visible')) {
            $('.frmAddMoreTeamMember').slideToggle().hide();
            $('.MoreTeamMember').text('Add More Team Member');
            $('.MoreTeamMember').prev("span").text("+");
        }
        //*************END**********

    });

    $('.MoreTeamMember').click(function () {
        ResetfrmAddMoreTeamMember();

        if ($(this).attr('type') == "addmore") {
            $('.MoreTeamMember').show();
            $('.MoreTeamMember').text('Add More Team Member');
            $('.MoreTeamMember').prev("span").text("+");
            $('.frmAddtionalMember').slideToggle("slow").hide();
            $(this).attr('type', '');
            return;
        }

        if ($('.frmAddtionalMember').is(':visible')) {
            $('.frmAddtionalMember').slideToggle("slow");
        }

        $('.frmAddMoreTeamMember').slideToggle("slow", "swing", function () {
            if ($('.frmAddMoreTeamMember').is(':visible')) {
                $('.frmAddtionalMember').hide()
                $('.MoreTeamMember').text('Cancel Adding More Team Member');
                $('.MoreTeamMember').prev("span").text("-");

            } else {
                $('.MoreTeamMember').text('Add More Team Member');
                $('.MoreTeamMember').prev("span").text("+");
                $('.frmAddtionalMember').show()
                // $('.MoreTeamMember').show();
            }
        });
    });

    $('.MorePIS').click(function () {
        ResetfrmAddMorePIS();

        if ($(this).attr('type') == "addmore") {
            $('.MorePIS').show();
            $('.MorePIS').text('Add More PIS/ICF');
            $('.MorePIS').prev("span").text("+");
            $('.frmPISDetails').slideToggle("slow").hide();
            $(this).attr('type', '');
            return;
        }

        if ($('.frmPISDetails').is(':visible')) {
            $('.frmPISDetails').slideToggle("slow");
        }
        $('.frmAddMorePIS').slideToggle("slow", "swing", function () {
            if ($('.frmAddMorePIS').is(':visible')) {
                $('.MorePIS').text('Cancel Adding More PIS/ICF');
                $('.MorePIS').prev("span").text("-");
                $('.frmPISDetails').hide()
            } else {
                $('.MorePIS').text('Add More PIS/ICF');
                $('.MorePIS').prev("span").text("+");
                $('.frmPISDetails').show()
                // $('.MorePIS').show();
            }
        });
    });

    $('.MonlyStatusRpt').click(function () {
        ResetfrmMonthlyStatusReport();

        if ($(this).attr('type') == "addmore") {
            $('.MonlyStatusRpt').show();
            $('.MonlyStatusRpt').text('Add Monthly Status Report');
            $('.MonlyStatusRpt').prev("span").text("+");
            $('.frmStatusReportFile').slideToggle("slow").hide();
            $(this).attr('type', '');
            return;
        }

        if ($('.frmStatusReportFile').is(':visible')) {
            $('.frmStatusReportFile').slideToggle("slow");
        }
        $('.frmMonthlyStatusReport').slideToggle("slow", "swing", function () {
            if ($('.frmMonthlyStatusReport').is(':visible')) {
                $('.MonlyStatusRpt').text('Cancel Adding Monthly Status Report');
                $('.MonlyStatusRpt').prev("span").text("-");

            } else {
                $('.MonlyStatusRpt').text('Add Monthly Status Report');
                $('.MonlyStatusRpt').prev("span").text("+");
                $('.frmStatusReportFile').show()

            }
        });
    });

    $('.AmentDetails').click(function () {
        ResetfrmAmendmentDetails();

        if ($(this).attr('type') == "addmore") {
            $('.AmentDetails').show();
            $('.AmentDetails').text('Add More Amendment File');
            $('.AmentDetails').prev("span").text("+");
            $('.frmAmendment').slideToggle("slow").hide();
            $(this).attr('type', '');
            return;
        }

        if ($('.frmAmendment').is(':visible')) {
            $('.frmAmendment').slideToggle("slow");
        }
        $('.frmAmendmentDetails').slideToggle("slow", "swing", function () {
            if ($('.frmAmendmentDetails').is(':visible')) {
                $('.AmentDetails').text('Cancel Adding More Amendment File');
                $('.frmAmendment').hide()

                $('.AmentDetails').prev("span").text("-");
            } else {
                $('.AmentDetails').text('Add More Amendment File');
                $('.frmAmendment').show()
                $('.AmentDetails').prev("span").text("+");
                // $('.AmentDetails').show();
            }
        });
    });

    $('.Others').click(function () {
        ResetfrmOtherDetails();
        SetIPStorageDisable();

        if ($(this).attr('type') == "addmore") {
            $('.Others').show();
            $('.Others').text('Add More Investigational Product');
            $('.Others').prev("span").text("+");
            $('.frmLast').slideToggle("slow").hide();
            $(this).attr('type', '');
            return;
        }

        if ($('.frmLast').is(':visible')) {
            $('.frmLast').slideToggle("slow");
        }
        $('.frmOtherDetails').slideToggle("slow", "swing", function () {
            if ($('.frmOtherDetails').is(':visible')) {
                $('.Others').text('Cancel Adding More Investigational Product');
                $('.frmLast').hide()
                $('.Others').prev("span").text("-");
            } else {
                $('.Others').text('Add More Investigational Product');
                $('.frmLast').show()
                $('.Others').prev("span").text("+");
                // $('.Others').show();
            }
        });

    });
}
function SetNoRecord() {

    if ($("#tblResposive tbody tr").length == 0) {
        $('[id*=MainContent_SearchBox_txtSearch]').val('');
        $("#tblResposive tbody").html("<tr><td colspan='6' > No Records Available <td></tr>");
        $("#projectPaging").hide();
        $("#tblResposive thead th").css("background-image", "none");
        $("#tblResposive thead th").unbind("click");
    }

    if ($("#tblPiDetail tbody tr").length == 0) {

        $("#tblPiDetail tbody").html("<tr><td colspan='6' > No Records Available <td></tr>");
        $("#tblPiDetail thead th").css("background-image", "none");
        $("#tblPiDetail thead th").unbind("click");
    }

    if ($("#tlbStudyMember tbody tr").length == 0) {

        $("#tlbStudyMember tbody").html("<tr><td colspan='3' > No Records Available <td></tr>");
        $("#tlbStudyMember thead th").css("background-image", "none");
        $("#tlbStudyMember thead th").unbind("click");
    }

    if ($("#tlbPIS tbody tr").length == 0) {

        $("#tlbPIS tbody").html("<tr><td colspan='2' > No Records Available <td></tr>");
        $("#tlbPIS thead th").css("background-image", "none");
        $("#tlbPIS thead th").unbind("click");
    }


    if ($("#tblStatusMontly tbody tr").length == 0) {

        $("#tblStatusMontly tbody").html("<tr><td colspan='3' > No Records Available <td></tr>");
        $("#tblStatusMontly thead th").css("background-image", "none");
        $("#tblStatusMontly thead th").unbind("click");
    }



    if ($("#tblAmendmentDetails tbody tr").length == 0) {

        $("#tblAmendmentDetails tbody").html("<tr><td colspan='2' > No Records Available <td></tr>");
        $("#tblAmendmentDetails thead th").css("background-image", "none");
        $("#tblAmendmentDetails thead th").unbind("click");
    }

    if ($("#tblOther tbody tr").length == 0) {

        $("#tblOther tbody").html("<tr><td colspan='3' > No Records Available <td></tr>");
        $("#tblOther thead th").css("background-image", "none");
        $("#tblOther thead th").unbind("click");
    }
}
function SetNowDate() {
    //$('.datepicker.Req').val(GetDate('-'));
}
function CalculateDates(date, offset) {
    var NewDate = '';
    var dates = date.split('-');
    var dd = dates[0];
    var mm = RetMonthNoForReg(dates[1]);
    var yy = dates[2];

    var x = new XDate(yy, mm, dd);
    var newdt = x.addMonths(offset);
    var cDate = newdt.addDays(-1);
    var nd = cDate.getDate();
    var nm = cDate.getMonth();
    var ny = cDate.getFullYear();

    NewDate = nd + '-' + RetMonthNameForReg(nm) + '-' + ny;

    return NewDate;
}
Date.prototype.calcFullMonths = function (monthOffset) {
    //copy the date
    var dt = new Date(this);
    dt.setDate(-1); dt.setMonth(dt.getMonth() + monthOffset);
    return dt;
};
function SetDates() {
    var TxtCTCExtAppDate = $('[id*=TxtCTCExtAppDate]');
    var TxtCTCAppDate = $('[id*=TxtCTCAppDate]');
    var TxtCTCExpiryDate = $('[id*=TxtCTCExpiryDate]');


    var TxtSixMStateDate = $('[id*=TxtSixMStateDate]');
    var TxtTwelvMStateDate = $('[id*=TxtTwelvMStateDate]');
    var TxtEightMStateDate = $('[id*=TxtEightMStateDate]');
    var TxtTwentyOMStateDate = $('[id*=TxtTwentyOMStateDate]');
    var TxtTwentyForMStateDate = $('[id*=TxtTwentyForMStateDate]');

    var ddlCTCStatus = $('[id*=ddlCTCStatus] option:selected').text().toLowerCase();
    if (ddlCTCStatus == 'active' || (ddlCTCStatus == 'terminated' && TxtCTCExtAppDate.val().trim() == "")) {

        if (TxtCTCAppDate.val().trim() != "") {


            TxtSixMStateDate.val(CalculateDates(TxtCTCAppDate.val(), 6));
            TxtTwelvMStateDate.val(CalculateDates(TxtCTCAppDate.val(), 12));
            TxtEightMStateDate.val(CalculateDates(TxtCTCAppDate.val(), 18));
            TxtTwentyOMStateDate.val(CalculateDates(TxtCTCAppDate.val(), 21));
            TxtTwentyForMStateDate.val(CalculateDates(TxtCTCAppDate.val(), 24));
        }
    }
    else if (ddlCTCStatus == 'extended' || ddlCTCStatus == 'terminated') {
        if (TxtCTCExtAppDate.val().trim() != "") {

            var b = DtMax(TxtCTCExtAppDate.val(), TxtCTCExpiryDate.val());
            if (b == false) {
                TxtSixMStateDate.val(CalculateDates(TxtCTCExtAppDate.val(), 6));
                TxtTwelvMStateDate.val(CalculateDates(TxtCTCExtAppDate.val(), 12));
                TxtEightMStateDate.val(CalculateDates(TxtCTCExtAppDate.val(), 18));
                TxtTwentyOMStateDate.val(CalculateDates(TxtCTCExtAppDate.val(), 21));
                TxtTwentyForMStateDate.val(CalculateDates(TxtCTCExtAppDate.val(), 24));
            }
            else {
                var date = ConvertDatetoMDY(TxtCTCExpiryDate.val());
                var d = new XDate(date);
                // d = d.addDays(1);
                var dd = d.getDate();
                var mm = d.getMonth();
                var yy = d.getFullYear();
                var Ndate = dd + '-' + RetMonthNameForReg(mm) + '-' + yy;
                TxtSixMStateDate.val(CalculateDates(Ndate, 6));
                TxtTwelvMStateDate.val(CalculateDates(Ndate, 12));
                TxtEightMStateDate.val(CalculateDates(Ndate, 18));
                TxtTwentyOMStateDate.val(CalculateDates(Ndate, 21));
                TxtTwentyForMStateDate.val(CalculateDates(Ndate, 24));
            }

        }
    }




}
var check = '';
function IsValidte() {

    var mode = $("[id*=HdnMode]").val().toLowerCase();
    if (mode != 'delete') {
        var ddlLeadSponsor = $('[id*=ddlLeadSponsor] option:selected');
        var TxtOtherLeadSpnsor = $('[id*=TxtOtherLeadSpnsor]');
        var ddlPrismStatus = $('[id*=ddlPrismStatus] option:selected');
        var TxtPrismSubmissionDate = $('[id*=TxtPrismSubmissionDate]');
        var TxtPrimsAppNo = $('[id*=TxtPrimsAppNo]');
        var ddlCTCStatus = $('[id*=ddlCTCStatus] option:selected');
        var fldCTCdocument = $('[id*=fldCTCdocument]');
        var TxtCTCAppDate = $('[id*=TxtCTCAppDate]');
        var TxtCtcNo = $('[id*=TxtCtcNo]');
        var TxtCTCExpiryDate = $('[id*=TxtCTCExpiryDate]');
        var TxtCTCExtAppDate = $('[id*=TxtCTCExtAppDate]');
        var TxtPendingScreenOutcome = $('[id*=TxtPendingScreenOutcome]');
        var TxtScreened = $('[id*=TxtScreened]');
        var Txttermination = $('[id*=Txttermination]');
        var TxtoutPatient = $('[id*=TxtoutPatient]');
        var TxtSaeNo = $('[id*=TxtSaeNo]');
        var ddlInternalAudit = $('[id*=ddlInternalAudit] option:selected');
        var TxtScrenFailure = $('[id*=TxtScrenFailure]');
        var TxtRandEnrolled = $('[id*=TxtRandEnrolled]');
        var TxtReasonWithdrawn = $('[id*=TxtReasonWithdrawn]');
        var TxtCompletedNo = $('[id*=TxtCompletedNo]');
        var TxtReasonForSAE = $('[id*=TxtReasonForSAE]');
        var TxtLastUpDate = $('[id*=TxtLastUpDate]');
        var TxtTwentyForMStateDate = $('[id*=TxtTwentyForMStateDate]');
        var LnkDwnldCTCDoc = $('[id*=LnkDwnldCTCDoc]');
        var HdnCTCDocPath = $('[id*=HdnCTCDocPath]');
        if (ddlLeadSponsor.text().toLowerCase() == '--select--') {
            MessageBox('Please select Lead Sponsor..!!');
            ddlLeadSponsor.focus();
            return false;
        }
        else if (ddlLeadSponsor.text().toLowerCase() == 'no') {
            if (TxtOtherLeadSpnsor.val().trim() == '') {
                MessageBox('Please Enter Other Sponsor..!!');
                TxtOtherLeadSpnsor.focus();
                return false;
            }
        }
        if (ddlPrismStatus.text().toLowerCase() == '--select--') {
            MessageBox('Please select Prism Status..!!');
            ddlPrismStatus.focus();
            return false;
        }
        if (ddlPrismStatus.text().toLowerCase() == 'yes') {
            if (TxtPrimsAppNo.val().trim() == '') {
                MessageBox('Please Enter Prism Application No..!!');
                TxtPrimsAppNo.focus();
                return false;
            }
            if (TxtPrismSubmissionDate.val().trim() == '') {
                MessageBox('Please Select Prism Submission Date..!!');
                TxtPrismSubmissionDate.focus();
                return false;
            }
        }

        if (ddlCTCStatus.text().toLowerCase() == '--select--') {
            MessageBox('Please Select CTC Status..!!');
            ddlCTCStatus.focus();
            return false;
        }
        if (ddlCTCStatus.text().toLowerCase() == 'active') {
            if (mode == 'insert') {


                if (fldCTCdocument.val().trim() == '') {
                    MessageBox('Please Select CTC Document..!!');
                    fldCTCdocument.focus();
                    return false;
                }
            }
            if (mode == 'update') {
                if (fldCTCdocument.val().trim() != "") {
                    if (LnkDwnldCTCDoc.text().trim() != "") {
                        MessageBox('Please Select CTC Document..!!');
                        fldCTCdocument.focus();
                        return false;
                    }
                }
            }



            if (TxtCTCAppDate.val().trim() == '') {
                MessageBox('Please Select CTC Approval Date..!!');
                TxtCTCAppDate.focus();
                return false;
            }
            if (TxtCtcNo.val().trim() == '') {
                MessageBox('Please Enter CTC No..!!');
                TxtCtcNo.focus();
                return false;
            }
            if (TxtCTCExpiryDate.val().trim() == '') {
                MessageBox('Please Select CTC Expiry Date..!!');
                TxtCTCExpiryDate.focus();
                return false;
            }

            var dates = new Array();
            dates.push(TxtCTCAppDate.val());
            var CTCApp = GetMaxDate(dates);
            var CTCExp = ConvertDatetoMDY(TxtCTCExpiryDate.val());
            var result = CalGreaterDate(CTCApp, CTCExp);
            if (result == false) {
                MessageBox("CTC Expiry Date should be Greater than  CTC Approval Date");
                return false;
            }

            if (TxtLastUpDate.val().trim() != "") {
                dates = new Array();
                dates.push(TxtLastUpDate.val());
                var LDate = GetMaxDate(dates);
                var TwentyFourMDate = ConvertDatetoMDY(TxtTwentyForMStateDate.val());
                var reslt = CalGreaterDate(LDate, CTCExp);
                if (reslt == false) {
                    MessageBox("Last Updated Date should be Less than or Equal to   CTC Expiry Date..!!");
                    return false;
                }
                var rr = CalGreaterDate(CTCApp, LDate);
                if (rr == false) {
                    MessageBox("Last Updated Date should be Greater than or Equal to  CTC Approval Date");
                    return false;
                }
            }


        }
        if (ddlCTCStatus.text().toLowerCase() == 'extended') {
            if (TxtCTCExtAppDate.val().trim() == '') {
                MessageBox('Please Select  New CTC Extension Approval Date..!!');
                TxtCTCExtAppDate.focus();
                return false;

            }
            var TxtNewCTCExpiryDate = $('[id*=TxtNewCTCExpiryDate]');
            if (TxtNewCTCExpiryDate.val().trim() == '') {
                MessageBox('Please Select  New CTC Expiry Date..!!');
                TxtNewCTCExpiryDate.focus();
                return false;
            }

            if (TxtCTCAppDate.val().trim() != "") {
                dates = new Array();
                dates.push(TxtCTCAppDate.val());
                var CTCApp = GetMaxDate(dates);
                var CTCExpAppDate = ConvertDatetoMDY(TxtCTCExtAppDate.val());
                var rs = CalGreaterDate(CTCApp, CTCExpAppDate);
                if (rs == false) {
                    MessageBox("New CTC Extension Approval Date should be Greater than  CTC Approval Date");
                    return false;
                }


                //dates = new Array();
                //if (TxtLastUpDate.val().trim() != "") {
                //    dates.push(TxtLastUpDate.val());
                //    var LDate = GetMaxDate(dates);
                //    var s = CalGreaterDate(CTCExpAppDate, LDate);
                //    if (s == false) {
                //        MessageBox("Last Updated Date should be Greater than or Equal to New CTC Extension Approval Date");
                //        return false;
                //    }
                //}




                if (TxtNewCTCExpiryDate.val().trim() != "") {
                    dates = new Array();
                    dates.push(TxtCTCExpiryDate.val());
                    var CTCExp = GetMaxDate(dates);
                    var NExpDate = ConvertDatetoMDY(TxtNewCTCExpiryDate.val());
                    var rrs = CalGreaterDate(CTCExp, NExpDate);
                    if (rrs == false) {
                        MessageBox("New CTC Expiry Date  should be Greater than  CTC Expiry Date");
                        return false;
                    }
                }


            }
        }
        if ($("#tlbStudyMember tbody tr td").html().toLowerCase().trim().replace(/ +/g, "") == "norecordsavailable") {
            MessageBox("Enter Atleast one Additional Study Team Members  Details"); return false;
        };


        if (ValidateForCTCstatus(ddlCTCStatus.text()).trim().length != 0) {
            MessageBox('6 Months Update Details are Required..!!');
            return false;
        }


        GetValuesIntoHDN();
    }
    $("[disabled=disabled]").removeAttr("disabled");
    return true;
}

function ValidateForCTCstatus(status) {
    check = '';
    if (status.toLowerCase() == 'active' || status.toLowerCase() == 'extended') {

        if ($('.frmSixMonthUpdate input[type=text]').each(function (index, item) {
           if ($(item).val().trim() == '') {
            check = 'error';
        }
        }));




        if ($('.frmSixMonthUpdate select>option:selected').text().toLowerCase() == '--select--') {

            check = 'error';
        }
    }
    return check;
}


function GetStudyTeamMembersDetails() {
    var HdnStudyTeamMembersDetails = $('[id*=HdnStudyTeamMembersDetails]');
    HdnStudyTeamMembersDetails.val('');
    var CompleteValue = '';
    if ($("#tlbStudyMember tbody tr td").html().toLowerCase().trim().replace(/ +/g, "") != "norecordsavailable") {
        $('#tlbStudyMember  tbody tr').each(function (index, item) {
            var FName = $(item).closest('tr').find('td:eq(0)').find('p').text();
            var LName = $(item).closest('tr').find('td:eq(1)').find('p').text();
            var EmailId = $(item).closest('tr').find('td:eq(2)').find('p').text();

            CompleteValue += FName + ',' + LName + ',' + EmailId + '|'

        });
    }
    HdnStudyTeamMembersDetails.val(CompleteValue);
}

function GetPISDetails() {
    var HdnPISDetails = $('[id*=HdnPISDetails]');
    var values = '';
    HdnPISDetails.val('');
    if ($("#tlbPIS tbody tr td").html().toLowerCase().trim().replace(/ +/g, "") != "norecordsavailable") {
        $('#tlbPIS  tbody tr').each(function (index, item) {
            var VerNo = $(item).closest('tr').find('td:eq(0)').find('p').text();
            var PISDate = $(item).closest('tr').find('td:eq(1)').find('p').text();
            values += VerNo + ',' + PISDate + '|'
        });
    }
    HdnPISDetails.val(values);
}

function GetStatusReportSubmissionFileDetails() {
    var HdnStatusReportSubmissionFileDetails = $('[id*=HdnStatusReportSubmissionFileDetails]');
    HdnStatusReportSubmissionFileDetails.val('');
    var values = '';
    if ($("#tblStatusMontly tbody tr td").html().toLowerCase().trim().replace(/ +/g, "") == "norecordsavailable") {

    }
    else {
        $('#tblStatusMontly  tbody tr').each(function (index, item) {
            var FilePath = $(item).attr('filepath');
            var IntervalId = $(item).attr('IntervalId');
            var Title = $(item).closest('tr').find('td:eq(1)').find('p').text();
            values += FilePath.replace(/\*+/gmi, " ") + ',' + IntervalId + ',' + Title + '|'
        });
        HdnStatusReportSubmissionFileDetails.val(values);
    }

}

function GetAmendmentsDetails() {
    var HdnAmendmentsDetails = $('[id*=HdnAmendmentsDetails]');
    HdnAmendmentsDetails.val('');
    var values = '';
    if ($("#tblAmendmentDetails tbody tr td").html().toLowerCase().trim().replace(/ +/g, "") == "norecordsavailable") {

    }
    else {
        $('#tblAmendmentDetails  tbody tr').each(function (index, item) {
            var FilePath = $(item).attr('filepath');
            var AmendmentDate = $(item).closest('tr').find('td:eq(0)').find('p').text();
            values += FilePath.replace(/\*+/gmi, " ") + ',' + AmendmentDate + '|'
        });
        HdnAmendmentsDetails.val(values);
    }
}

function GetOtherDetails() {
    var HdnOtherDetails = $('[id*=HdnOtherDetails]');
    HdnOtherDetails.val('');
    var values = '';
    if ($("#tblOther tbody tr td").html().toLowerCase().trim().replace(/ +/g, "") != "norecordsavailable") {
        $('#tblOther  tbody tr').each(function (index, item) {
            var IpId = $(item).attr('IpId');
            var td0 = $(item).closest('tr').find('td:eq(0)').find('p').text();
            var td1 = $(item).closest('tr').find('td:eq(1)').find('p').text();
            var td2 = $(item).closest('tr').find('td:eq(2)').find('p').text();
            values += IpId + ',' + td0 + ',' + td1 + ',' + td2 + '|'
        });
    }
    HdnOtherDetails.val(values);
}
function GetValuesIntoHDN() {
    GetStudyTeamMembersDetails();
    GetPISDetails();
    GetStatusReportSubmissionFileDetails();
    GetAmendmentsDetails();
    GetOtherDetails();
}

function DoPostBack() {
    return true;
}

function TrimFName() {
    var LnkDwnldCTCDoc = $('[id*=LnkDwnldCTCDoc]');
    var LnkDnwldNCTCEmailApprDoc = $('[id*=LnkDnwldNCTCEmailApprDoc]');
    var LnkDnwldCTCEmailApprDoc = $('[id*=LnkDnwldCTCEmailApprDoc]');
    var LnkDwnldExtCTCEmailApprDoc = $('[id*=LnkDwnldExtCTCEmailApprDoc]');


    LnkDwnldCTCDoc.attr('title', LnkDwnldCTCDoc.text());
    LnkDnwldNCTCEmailApprDoc.attr('title', LnkDnwldNCTCEmailApprDoc.text());

    LnkDnwldCTCEmailApprDoc.attr('title', LnkDnwldCTCEmailApprDoc.text());
    LnkDwnldExtCTCEmailApprDoc.attr('title', LnkDwnldExtCTCEmailApprDoc.text());

    var length1 = (LnkDwnldCTCDoc.text().length >= 50) ? 40 : LnkDwnldCTCDoc.text().length;
    var length2 = (LnkDnwldNCTCEmailApprDoc.text().length >= 50) ? 40 : LnkDnwldNCTCEmailApprDoc.text().length;

    var length3 = (LnkDnwldCTCEmailApprDoc.text().length >= 50) ? 40 : LnkDnwldCTCEmailApprDoc.text().length;
    var length4 = (LnkDwnldExtCTCEmailApprDoc.text().length >= 50) ? 40 : LnkDwnldExtCTCEmailApprDoc.text().length;


    LnkDwnldCTCDoc.text(Trim(LnkDwnldCTCDoc.text(), length1));
    LnkDnwldNCTCEmailApprDoc.text(Trim(LnkDnwldNCTCEmailApprDoc.text(), length2));

    LnkDnwldCTCEmailApprDoc.text(Trim(LnkDnwldCTCEmailApprDoc.text(), length3));
    LnkDwnldExtCTCEmailApprDoc.text(Trim(LnkDwnldExtCTCEmailApprDoc.text(), length4));
}

function Trim(str, len) {
    if (str.length > len)
        return str.slice(0, len) + "...";
    else
        return str;
}


function HideActionColumn() {
    var mode = $("[id*=HdnMode]").val().toLowerCase();
    if (mode == 'view') {
        $("#tlbStudyMember thead tr th:last-child").css("display", "none");
        $("#tlbStudyMember tbody tr td:last-child").css("display", "none");

        $("#tlbPIS thead tr th:last-child").css("display", "none");
        $("#tlbPIS tbody tr td:last-child").css("display", "none");

        $("#tblStatusMontly thead tr th:last-child").css("display", "none");
        $("#tblStatusMontly tbody tr td:last-child").css("display", "none");

        $("#tblAmendmentDetails thead tr th:last-child").css("display", "none");
        $("#tblAmendmentDetails tbody tr td:last-child").css("display", "none");

        $("#tblOther thead tr th:last-child").css("display", "none");
        $("#tblOther tbody tr td:last-child").css("display", "none");
    }

}


function CheckEmailIdExist(emailId) {
    var check = true;
    if ($("#tlbStudyMember tbody tr").length > 1) {
        $('#tlbStudyMember tbody tr').each(function (index, item) {
            var EmailId = $(item).closest('tr').find('td:eq(2)').find('p').text().trim().toLowerCase();
            if (EmailId == emailId.trim().toLowerCase()) {
                check = false;
            }
        });
    }
    return check;
}


function CheckEmailExistsfromDB(emailId) {
    var check = true;
    var RegId = $('[id*=HdnRegId]');
    var ProjectId = $('[ID*=HdnProjectId]');
    var mode = $('[id*=HdnMode]').val().toLowerCase();
    if (mode == 'insert') {
        RegId.val('0');
    }
    var exist = GetValidatefrmDB(null, 'RegulatotyStudyMember_EmailIdCheck', RegId.val(), emailId, ProjectId.val());
    if (exist != "") {
        check = false;
    }
    return check;
}



function FillControls(obj) {
    // $('[id*=DivTab] table tbody tr td input').removeClass('selected');
    //$('[id*=DivTab] table tbody tr td input').addClass('button_example')


    $('[id*=DivTab] div a').removeClass('active');
    $(obj).addClass('active');
    var count = parseInt($(obj).attr('Key'));
    var val = $(obj).find('input[type=hidden]').val().split(',');
    var attr = $(obj).attr('sel');

    var TxtPendingScreenOutcome = $('[id*=TxtPendingScreenOutcome]');
    var TxtScreened = $('[id*=TxtScreened]');
    var Txttermination = $('[id*=Txttermination]');
    var TxtoutPatient = $('[id*=TxtoutPatient]');
    var TxtSaeNo = $('[id*=TxtSaeNo]');
    var ddlInternalAudit = $('[id*=ddlInternalAudit]');
    var TxtScrenFailure = $('[id*=TxtScrenFailure]');
    var TxtRandEnrolled = $('[id*=TxtRandEnrolled]');
    var TxtReasonWithdrawn = $('[id*=TxtReasonWithdrawn]');
    var TxtCompletedNo = $('[id*=TxtCompletedNo]');
    var TxtReasonForSAE = $('[id*=TxtReasonForSAE]');
    var TxtLastUpDate = $('[id*=TxtLastUpDate]');

    TxtPendingScreenOutcome.val('');
    TxtScreened.val('');
    Txttermination.val('');
    TxtoutPatient.val('');
    TxtSaeNo.val('');
    ddlInternalAudit.val(-1);
    TxtScrenFailure.val('');
    TxtRandEnrolled.val('');
    TxtReasonWithdrawn.val('');
    TxtCompletedNo.val('');
    TxtReasonForSAE.val('');
    TxtLastUpDate.val('');


    TxtReasonWithdrawn.val(val[0]);
    TxtReasonForSAE.val(val[2]);
    Txttermination.val(val[3]);
    TxtScreened.val(val[4]);
    TxtScrenFailure.val(val[5]);
    TxtSaeNo.val(val[6]);
    TxtRandEnrolled.val(val[8]);
    TxtPendingScreenOutcome.val(val[9]);
    TxtoutPatient.val(val[10]);
    TxtCompletedNo.val(val[11]);
    TxtLastUpDate.val(val[12]);
    var ct = (val[13].toLowerCase() == "true" ? 1 : 0)
    ddlInternalAudit.val(ct);
    if (attr == undefined) {
        $('.frmSixMonthUpdate input[type=text],select[id*=ddlInternalAudit]').attr('disabled', 'disabled').next("img").attr("disabled", "disabled").css("opacity", "0.5");
    }
    else {
        $('.frmSixMonthUpdate input[type=text],select[id*=ddlInternalAudit]').removeAttr('disabled').next("img").removeAttr("disabled").css("opacity", "2.5");
    }

    if (TxtLastUpDate.val().trim() == '') {
        $(".frmSixMonthUpdate input[type=text]").val("");
    }

    var ddlCTCStatus = $('[id*=ddlCTCStatus] option:selected').text().toLowerCase();
    if (ddlCTCStatus == 'terminated') {

        $('.frmSixMonthUpdate :input').attr('disabled', 'disabled').next("img").attr("disabled", "disabled").css("opacity", "0.5");
        $('.frmSixMonthUpdate table input[type=button]').removeAttr('disabled')
    }
    var mode = $('[id*=HdnMode]').val().toLowerCase();
    if (mode == 'view' || mode == 'delete') {
        $('.frmSixMonthUpdate input[type=text],select[id*=ddlInternalAudit]').attr('disabled', 'disabled').next("img").attr("disabled", "disabled").css("opacity", "0.5");
    }

    return false;
}

function CallDelete(Id) {
    var HdnRegId = $('[id*=HdnRegId]');
    HdnRegId.val(Id);
    $('[id*=delete]').click();
}

function ConfirmDelete(id) {
    return ConfirmBox('Are you sure to delete this Record..!!', 'CallDelete(' + id + ')')

}


function CheckDateofLastOnBlur() {
    var TxtCTCExpiryDate = $('[id*=TxtCTCExpiryDate]');
    var TxtCTCExtAppDate = $('[id*=TxtCTCExtAppDate]');
    var ddlCTCStatus = $('[id*=ddlCTCStatus] option:selected').text().toLowerCase();
    var TxtLastUpDate = $('[id*=TxtLastUpDate]');
    var hdnLastUpDate = $('[id*=hdnLastUpDate]');
    var dates;
    var mode = $('[id*=HdnMode]').val().toLowerCase();
    if (mode == 'update') {

        if (ddlCTCStatus == 'active') {
            if (hdnLastUpDate.val().trim() != "") {
                dates = new Array();
                dates.push(TxtLastUpDate.val());
                var LDate = GetMaxDate(dates);
                var CTCExp = ConvertDatetoMDY(hdnLastUpDate.val());
                var reslt = CalGreaterDate(CTCExp, LDate);
                if (reslt == false) {
                    MessageBox("Last Updated Date should Not be Less than or Equal to " + hdnLastUpDate.val() + "");
                    TxtLastUpDate.val(hdnLastUpDate.val());
                    TxtLastUpDate.focus();
                    return false;
                }
            }
        }
        else if (ddlCTCStatus == 'extended') {
            //dates = new Array();
            //dates.push(TxtLastUpDate.val());
            //var LDate = GetMaxDate(dates);
            //var CTCExtAppDate = ConvertDatetoMDY(TxtCTCExtAppDate.val());
            //var reslt = CalGreaterDate(CTCExtAppDate, LDate);
            //if (reslt == false) {
            //    MessageBox("Last Updated Date should Not be Less than or Equal to New CTC Extension Approval Date");
            //    TxtCTCExtAppDate.focus();
            //    return false;
            //}
            if (hdnLastUpDate.val().trim() != "") {
                dates = new Array();
                dates.push(TxtLastUpDate.val());
                var LDate = GetMaxDate(dates);
                var CTCExp = ConvertDatetoMDY(hdnLastUpDate.val());
                var reslt = CalGreaterDate(CTCExp, LDate);
                if (reslt == false) {
                    MessageBox("Last Updated Date should Not be Less than or Equal to " + hdnLastUpDate.val() + "");
                    TxtLastUpDate.val(hdnLastUpDate.val());
                    TxtLastUpDate.focus();
                    return false;
                }
            }
        }


    }
    if (mode == 'insert') {
        if (TxtLastUpDate.val().trim() != "") {
            dates = new Array();
            dates.push(TxtLastUpDate.val());
            var LDate = GetMaxDate(dates);
            var CTCExp = ConvertDatetoMDY(TxtCTCExpiryDate.val());
            var reslt = CalGreaterDate(LDate, CTCExp);
            if (reslt == false) {
                MessageBox("Last Updated Date should Not be Less than or Equal to   CTC Expiry Date..!!");
                TxtLastUpDate.val('');
                TxtLastUpDate.focus();
                return false;
            }
        }
    }
}


function CheckNewCTCExpDateonBlur() {
    var ddlCTCStatus = $('[id*=ddlCTCStatus] option:selected');
    if (ddlCTCStatus.text().toLowerCase() == 'extended') {

        var TxtCTCExpiryDate = $('[id*=TxtCTCExpiryDate]');
        var TxtNewCTCExpiryDate = $('[id*=TxtNewCTCExpiryDate]');

        if (TxtCTCExpiryDate.val().trim() != "" && TxtNewCTCExpiryDate.val().trim() != "") {
            var dates = new Array();
            dates.push(TxtCTCExpiryDate.val());
            var LDate = GetMaxDate(dates);
            var CTCExp = ConvertDatetoMDY(TxtNewCTCExpiryDate.val());
            var reslt = CalGreaterDate(LDate, CTCExp);
            if (reslt == false) {
                MessageBox("New CTC Expiry Date should be Greater than CTC Expiry Date ");
                TxtNewCTCExpiryDate.val('');
                return false;
            }
        }


    }
    return true;
}

function HidePTag() {
    var mode = $('[id*=HdnMode]').val().toLowerCase();
    if (mode == 'update') {
        var PTag = $('[id*=PTag]');
        PTag.text('');
    }
}

function RetMonthNameForReg(count) {
    var month = new Array();
    month[0] = "Jan";
    month[1] = "Feb";
    month[2] = "Mar";
    month[3] = "Apr";
    month[4] = "May";
    month[5] = "Jun";
    month[6] = "Jul";
    month[7] = "Aug";
    month[8] = "Sep";
    month[9] = "Oct";
    month[10] = "Nov";
    month[11] = "Dec";
    for (var i = 0; i < month.length; i++) {
        if (count == i) {
            return month[i];
            break;
        }
    }

}
function RetMonthNoForReg(Monthname) {
    var monthNo;
    switch (Monthname.toString().toLowerCase()) {
        case "jan":
            monthNo = 0;
            break;
        case "feb":
            monthNo = 1;
            break;
        case "mar":
            monthNo = 2;
            break;
        case "apr":
            monthNo = 3;
            break;
        case "may":
            monthNo = 4;
            break;
        case "jun":
            monthNo = 5;
            break;
        case "jul":
            monthNo = 6;
            break;
        case "aug":
            monthNo = 7;
            break;
        case "sep":
            monthNo = 8;
            break;
        case "oct":
            monthNo = 9;
            break;
        case "nov":
            monthNo = 10;
            break;
        case "dec":
            monthNo = 11;
            break;
    }
    return monthNo;
}
function TrimGridProjectName() {
    $('#tblResposive tbody tr').each(function (index, item) {
        var length = $(item).find('td:eq(1)').text().length;
        if (length >= 100) {
            $(item).find('td:eq(1)').attr('title', $(item).find('td:eq(1)').text().trim());
            $(item).find('td:eq(1)').text(Trim($(item).find('td:eq(1)').text().trim(), 40));

            $(item).find('td:eq(5)').attr('title', $(item).find('td:eq(5)').text().trim());
            $(item).find('td:eq(5)').text(Trim($(item).find('td:eq(5)').text().trim(), 30));

        }
    });
}

function DisableCTCApprandCTCExp() {
    var mode = $("[id*=HdnMode]").val().toLowerCase();
    var HdnExtendedStatus = $("[id*=HdnExtendedStatus]").val();
    var HdnCTCStatus = $("[id*=HdnCTCStatus]").val();
    var TxtCTCAppDate = $('[id*=TxtCTCAppDate]');
    var TxtCTCExpiryDate = $('[id*=TxtCTCExpiryDate]');
    var TxtCTCExtAppDate = $('[id*=TxtCTCExtAppDate]');
    var TxtNewCTCExpiryDate = $('[id*=TxtNewCTCExpiryDate]');
    if (mode == 'update') {

        if (HdnCTCStatus != "") {
            TxtCTCAppDate.attr('disabled', true).next("img").attr("disabled", true).css("opacity", "0.5")
            TxtCTCExpiryDate.attr('disabled', true).next("img").attr("disabled", true).css("opacity", "0.5")
        }
        if (HdnExtendedStatus != "") {
            TxtCTCExtAppDate.attr('disabled', true).next("img").attr("disabled", true).css("opacity", "0.5")
            TxtNewCTCExpiryDate.attr('disabled', true).next("img").attr("disabled", true).css("opacity", "0.5")
        }

    }


}
//**************END********************


//***************Scrolling fix header Grid***********
function MakeStaticHeader(gridId, height, width, headerHeight, isFooter) {
    var tbl = document.getElementById(gridId);
    if (tbl) {
        var DivHR = document.getElementById('DivHeaderRow');
        var DivMC = document.getElementById('DivMainContent');
        var DivFR = document.getElementById('DivFooterRow');

        //*** Set divheaderRow Properties ****
        DivHR.style.height = headerHeight + 'px';
        DivHR.style.width = (parseInt(width) - 16) + 'px';
        DivHR.style.position = 'relative';
        DivHR.style.top = '0px';
        DivHR.style.zIndex = '10';
        DivHR.style.verticalAlign = 'top';

        //*** Set divMainContent Properties ****
        DivMC.style.width = width + 'px';
        DivMC.style.height = height + 'px';
        DivMC.style.position = 'relative';
        DivMC.style.top = -headerHeight + 'px';
        DivMC.style.zIndex = '1';

        //*** Set divFooterRow Properties ****
        DivFR.style.width = (parseInt(width) - 16) + 'px';
        DivFR.style.position = 'relative';
        DivFR.style.top = -headerHeight + 'px';
        DivFR.style.verticalAlign = 'top';
        DivFR.style.paddingtop = '2px';

        if (isFooter) {
            var tblfr = tbl.cloneNode(true);
            tblfr.removeChild(tblfr.getElementsByTagName('tbody')[0]);
            var tblBody = document.createElement('tbody');
            tblfr.style.width = '100%';
            tblfr.cellSpacing = "0";
            //*****In the case of Footer Row *******
            tblBody.appendChild(tbl.rows[tbl.rows.length - 1]);
            tblfr.appendChild(tblBody);
            DivFR.appendChild(tblfr);
        }
        //****Copy Header in divHeaderRow****
        DivHR.appendChild(tbl.cloneNode(true));
    }
}


function OnScrollDiv(Scrollablediv) {
    document.getElementById('DivHeaderRow').scrollLeft = Scrollablediv.scrollLeft;
    document.getElementById('DivFooterRow').scrollLeft = Scrollablediv.scrollLeft;
}



function DtMax(LeastDate, MaxDate) {

    //*********Left side date means Ldate check for > than Mdate if Ldate is Greater than or Equal to Mdate then return false else true
    var dates = new Array();
    dates.push(LeastDate);
    var LDate = GetMaxDate(dates);
    var MDate = ConvertDatetoMDY(MaxDate);
    var reslt = CalGreaterDate(LDate, MDate);
    return reslt;
}

///***************END*******************************