
function CallAutocomplete() {
    ApplyPaging('tblResposive', 'Paging', 10);
    ApplyToggle();
    CallNewPi();
    $("#tblResposive").tablesorter();
    Changeevents();
    $('.s_Old_Application_ID').attr('disabled', !($('.i_SubmissionStatus').find('option:selected').text().toLowerCase() == "Re-Submission".toLowerCase()));
    $('#' + getclientId('txtReviewersComments')).attr('disabled', !($('.i_Outcome').find('option:selected').text().toLowerCase() == "Not-Successful".trim().toLowerCase()));
    //$('.dt_AwardDate').attr('disabled', !($('.i_Outcome').find('option:selected').text().toLowerCase() == "Successful".toLowerCase()));
    SetAwardDatePicker();
    ClearPiDetails();


}
//Function FOr SHowing No records
function ShowNoRecords() {
    if ($("#tblResposive tbody tr").length == 0) {

        $("#tblResposive tbody").html("<tr><td colspan='7' > No Records Available <td></tr>");
        $("#projectPaging").hide();
        $("#tblResposive").addClass("removeHover");

        $("#tblResposive thead th").css("background-image", "none");
        $("#tblResposive thead th").unbind("click");
        $('#Paging').hide();
    }
    $("#tblResposive").tablesorter();
}
//Set Date PIcker Enable Disable On Change Of Dropdown Outcome
function SetAwardDatePicker() {
    var ddlOutCome = $('[id*=ddlOutCome] option:selected').text().toLowerCase();
    var TxtAwardLetter = $('[id*=TxtAwardLetter]');
    var isUpdateMode = $('#' + getclientId('HdnUpdateMode')).val();
    if (ddlOutCome == "--select--") {
        TxtAwardLetter.attr('disabled', true).next('img').attr('disabled',true).css("opacity", "0.5");
    }
    if (ddlOutCome == "successful") {
        if(isUpdateMode==0)
            TxtAwardLetter.val('');
        TxtAwardLetter.removeAttr('disabled').next('img').removeAttr('disabled').css("opacity", "2.5");
        if ($('#' + getclientId('hidAwardLetter')).val() != "") {
            TxtAwardLetter.val($('#' + getclientId('hidAwardLetter')).val());
            $('#' + getclientId('hidAwardLetter')).val('');
        }
    }
    else {
        TxtAwardLetter.attr('disabled', true).next('img').attr('disabled', true).css("opacity", "0.5");
    }
    $('[id*=commentsasterik').hide();
   if (ddlOutCome == "not-successful") 
       {
           $('[id*=commentsasterik').show();
       }

       $('#' + getclientId('txtReviewersComments')).attr('disabled', false);
    //}
    //else {
    //    $('#' + getclientId('txtReviewersComments')).attr('disabled', true);
    //}
    if (isUpdateMode == 0) {
        TxtAwardLetter.val('');
        //$('#' + getclientId('txtReviewersComments')).val('');
    }
}
//CHange Events For Dropdown
function Changeevents() {
    $('.i_SubmissionStatus').unbind('change').change(function () {
        var i_SubmissionStatus = $('.i_SubmissionStatus option:selected').text().toLowerCase();
        if (i_SubmissionStatus == "re-submission") {
            $('.s_Old_Application_ID').attr('disabled', true).val($('.s_Application_ID').val());
            if ($('.s_Application_ID').val() == "" || $('.s_Application_ID').val() == undefined) {
                MessageBox('Enter Application Id');
                $('.s_Application_ID').focus();
                $(".i_SubmissionStatus").val(1);
            }
        }
        else {
            $('.s_Old_Application_ID').attr('disabled', true).val('');
        }
        //$('.s_Old_Application_ID').attr('disabled', !($('.i_SubmissionStatus').find('option:selected').text().toLowerCase() == "Re-Submission".toLowerCase())).val('');
    });
$('.i_Outcome').unbind('change').change(function () {
   // SetAwardDate();
    SetAwardDatePicker();
});
}
function SetAwardDate() {
    //$('#' + getclientId('txtReviewersComments')).attr('disabled', !($('.i_Outcome').find('option:selected').text().toLowerCase() == "Not-Successful".trim().toLowerCase()));
    //$('.AwardLetter').find('img').css("opacity", "0.5");
    //$('.dt_AwardDate').attr('disabled', !($('.i_Outcome').find('option:selected').text().toLowerCase() == "Successful".toLowerCase()));
    //if ($('.i_Outcome').find('option:selected').text().toLowerCase() == "Successful".toLowerCase()) {
    //    $('.dt_AwardDate').val('');
    //    $('.AwardLetter').find('img').css("opacity", "1");
    //}
}
//Used to get the client id of the control
function getclientId(controlid) {
    return $('[id$=' + controlid + ']').attr('id');
}


function ResetAll() {
    $('#' + getclientId('DispProjectId')).val('');
    $('#' + getclientId('HdnProjectId')).val('');
    $('#' + getclientId('HdnMode')).val('');
    $('#' + getclientId('HdnGrantId')).val('');
    $('#' + getclientId('HidenGrantMaster')).val('');
    $('.frmGrant').find('input:text,textarea').val('');
    $('.frmGrant').find('.ctlselect').val(0);
}

function ClearOnblur(obj) {
    var HdnDeptTxt = $('#'+getclientId('HdnDeptTxt')).val();
    if (obj.value.trim() != "") {
        if (HdnDeptTxt != "") {
            if (obj.value.toLowerCase() != HdnDeptTxt.toLowerCase()) {
                MessageBox("Please select Proper Department");
                items('');
                obj.value = "";
                $('#'+getclientId('HdnDeptId')).val('');
                return false;
            }
        }
    }
}

function CheckPiOnBlur(obj) {
    if (obj.value == "") {
        items();
    }
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

//To clear all the controls on Department change
$("[id*=TxtDepartment]").change(function () {
    items();
});
function DoPostBack() {
    return true;
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
function AddNewPI() {
    
}
//Function For Applying Toggle
function ApplyToggle() {
    $('.frmHead').unbind('click').click(function () {
        var frmName = $(this).attr('data-frm');
        var h3Obj = $(this);
        $('.' + frmName).slideToggle("slow", function () {
            if ($(this).is(':visible')) {
                h3Obj.find('span').text('( - )');
            } else {
                h3Obj.find('span').text('( + )');
            }
        });

        console.log(frmName);

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

    $('.newPI').unbind('click').click(function () {
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
//Used For Setting The MOdel Parameters
function SetModelParameters() {
    var grant_master = {};
    var sep="";
    try {
        if (ValidateSave()) {
            grant_master['i_Project_ID'] = $('#' + getclientId('HdnProjectId')).val();
            grant_master['s_Application_ID'] = $('.s_Application_ID').val();
            grant_master['i_GrantType_ID'] = $('.i_GrantType_ID').val();
            grant_master['i_SubmissionStatus'] = $('.i_SubmissionStatus').val();

            if ($('.i_SubmissionStatus').find('option:selected').text().toLowerCase() == "Re-Submission".toLowerCase()) {
                grant_master['s_Old_Application_ID'] = $('.s_Old_Application_ID').val();
            }
            else {
                grant_master['s_Old_Application_ID'] ='';
            }
            grant_master['i_Amount_Requested'] = $('.i_Amount_Requested').val();
            grant_master['dt_Closing_Date'] = $('.dt_Closing_Date').val();
            grant_master['s_Duration'] = $('.s_Duration').val();

            grant_master['s_Mentor'] = $('.s_Mentor').val();
            grant_master['i_Outcome'] = $('.i_Outcome').val();
            grant_master['s_Reviewers_Comments'] = $('.s_Reviewers_Comments').val();
            grant_master['i_AwardOrganization'] = $('.i_AwardOrganization').val();
            if ($('.i_Outcome').find('option:selected').text().toLowerCase() == "Successful".toLowerCase())
                grant_master['dt_AwardDate'] = $('.dt_AwardDate').val();
            else
                grant_master['dt_AwardDate'] = '';
            grant_master['dt_Closing_Date'] = $('.dt_Closing_Date').val();
            grant_master['dt_ApplicationDate'] = $('.dt_ApplicationDate').val();
            grant_master['i_Grant_SubType_ID'] = $('.i_Grant_SubType_ID').val();
            grant_master['i_AwardOrganization'] = $('.i_AwardOrganization').val();
            if ($('.i_Grant_Sub_Sub_SubType_ID > option').length > 1)
                grant_master['i_Grant_Sub_Sub_SubType_ID'] = $('.i_Grant_Sub_Sub_SubType_ID').val();
            grant_master['i_Grant_Sub_SubType_ID'] = $('.i_Grant_Sub_SubType_ID').val();
            grant_master['s_Grant_Name'] = $('.s_Grant_Name').val();
            grant_master['i_AwardCountryID'] = $('#' + getclientId('HdnCountryId')).val(); //$('.i_AwardCountryID').val();

            if ($('.i_FTE').val() != "")
                grant_master['i_FTE'] = $('.i_FTE').val();
            $('#' + getclientId('HidenGrantMaster')).val(JSON.stringify(grant_master).toString());
            $('#' + getclientId('HdnPi_ID')).val('');
            $('#tblPiDetail  tbody tr').each(function (index, item) {
                $('#' + getclientId('HdnPi_ID')).val($(item).attr('piId') + sep + $('#' + getclientId('HdnPi_ID')).val());
                sep = ",";
                //  HdnPi_ID.value += ',' + $(item).attr('piId');
            });
            if ($('#' + getclientId('HdnPi_ID')).val() == "" || $('#' + getclientId('HdnPi_ID')).val() == undefined || $('#' + getclientId('HdnPi_ID')).val() == null) {
                MessageBox('No PI Details have being found.');
                return false;
            }
            return true;
        }
        else {
            return false;
        }
    }
    catch (err) {
    }
}

//Validate Save
function ValidateSave() {
    try{
        if ($('.s_Application_ID').val() == "" || $('.s_Application_ID').val() == undefined) {
            MessageBox('Application Id is necessary');
            $('.s_Application_ID').focus();
            return false;
        }
        if ($('.i_GrantType_ID').val() == "" || $('.i_GrantType_ID').val() == undefined || $('.i_GrantType_ID').val() == 0) {
            MessageBox('Select Grant Type is necessary');
            $('.i_GrantType_ID').focus();
            return false;
        }
        if ($('.i_Grant_SubType_ID').val() == "" || $('.i_Grant_SubType_ID').val() == undefined || $('.i_Grant_SubType_ID').val() == 0) {
            MessageBox('Select Grant Sub Type.');
            $('.i_Grant_SubType_ID').focus();
            return false;
        }
        //iF rESUBMISSION 
        if ($('.i_SubmissionStatus').find('option:selected').text().toLowerCase() == "Re-Submission".toLowerCase())
        {
            if ($('.s_Old_Application_ID').val() == "" || $('.s_Old_Application_ID').val() == undefined || $('.s_Old_Application_ID').val() == "") {
                MessageBox('Enter Old  Grant Application Id');
                $('.s_Old_Application_ID').focus();
                return false;
            }

        }

        if ($('.i_Grant_Sub_SubType_ID').val() == "" || $('.i_Grant_Sub_SubType_ID').val() == undefined || $('.i_Grant_Sub_SubType_ID').val() == 0) {
            MessageBox('Select Grant Sub Sub Type.');
            $('.i_Grant_Sub_SubType_ID').focus();
            return false;
        }
        if ($('.i_Grant_Sub_Sub_SubType_ID > option').length > 1) {
            if ($('.i_Grant_Sub_Sub_SubType_ID').val() == "" || $('.i_Grant_Sub_Sub_SubType_ID').val() == undefined || $('.i_Grant_Sub_Sub_SubType_ID').val() == 0) {
                MessageBox('Select Grant Sub Sub Sub-Type.');
                $('.i_Grant_Sub_Sub_SubType_ID').focus();
                return false;
            }
        }
        if ($('.dt_ApplicationDate').val() == "" || $('.dt_ApplicationDate').val() == undefined) {
            MessageBox('Select Grant Application Date');
            $('.dt_ApplicationDate').focus();
            return false;
        }
        //If Outcome Is Successfull
        if ($('.i_Outcome').find('option:selected').text().toLowerCase() == "Successful".toLowerCase()) {
            if ($('.dt_AwardDate').val() == "" || $('.dt_AwardDate').val() == undefined) {
                MessageBox('Select Grant Award Date');
                $('.dt_AwardDate').focus();
                return false;
            }
        }
        if ($('#tblPiDetail  tbody tr').length == 0) {
            MessageBox('One Pi is necessaru for the Project');
            return false;
        }
        if (($('#' + getclientId('HdnCountryId')).val() == "" || $('#' + getclientId('HdnCountryId')).val() == undefined || $('#' + getclientId('HdnCountryId')).val() == 0)
            ||( $('#' + getclientId('txtCountryName')).val() == ""||$('#' + getclientId('txtCountryName')).val() == undefined)) {
            MessageBox('Select Award Country .');
            $('.i_AwardCountryID').focus();
            return false;
        }
        //reviewers Comment If Not Successfull
        if ($('.i_Outcome').find('option:selected').text().toLowerCase() == "not-successful".toLowerCase()) {
            if ($('.s_Reviewers_Comments').val() == "" || $('.s_Reviewers_Comments').val() == undefined) {
                MessageBox('Enter Reviewers Comment .');
                $('.s_Reviewers_Comments').focus();
                return false;
            }
        }
        //If Old Application and New Application Id are Same
        if ($('.s_Application_ID').val() == $('.s_Old_Application_ID').val() && $('.i_SubmissionStatus').find('option:selected').text().toLowerCase() == "Re-Submission".toLowerCase()) {
            MessageBox('Old Application Id and New Application Id Cannot Be Same .');
            $('.s_Application_ID').focus();
            return false;
        }
        //Validation For Duration
        if ($('.s_Duration').val() == "" || $('.s_Duration').val() == undefined || parseInt($('.s_Duration').val()) <= 0) {
            MessageBox('Select Project Duration.');
            $('.s_Duration').focus();
            return false;
        }
        if (parseInt( $('#' + getclientId('HdnParentProjectDurId')).val()) > 0 && parseInt($('.s_Duration').val()) > parseInt($('#' + getclientId('HdnParentProjectDurId')).val())) {
            MessageBox('Child Project Duration Cannot be more then Parent Project Duration');
            $('.s_Duration').focus();
            return false;
        }
        //Validation Regrading Child Duration
        //If Child Duration is More Then Parent Duration
        if (parseInt($('#' + getclientId('HdnMaxChildDurationId')).val()) > 0 && parseInt($('#' + getclientId('HdnMaxChildDurationId')).val()) >parseInt($('.s_Duration').val())) {
            MessageBox('Parent Project Duration Cannot be more then Child Project Duration '+$('#'+getclientId('HdnMaxChildduration')).val());
            $('.s_Duration').focus();
            return false;
        }
        //Validation For Amount
        if ($('.i_Amount_Requested').val() == "" || $('.i_Amount_Requested').val() == undefined ||parseFloat($('.i_Amount_Requested').val() <= 0 )) {
            MessageBox('Enter Amount Requested for the project.');
            $('.i_Amount_Requested').focus();
            return false;
        }
        if (parseFloat($('#'+getclientId('txtRemainingAmount')).val()) > 0 && parseFloat($('.i_Amount_Requested').val()) > parseFloat($('#'+getclientId('txtRemainingAmount')).val())) {
            MessageBox('Child Project Amount cannot be more then Parent Project Amount.');
            $('.i_Amount_Requested').focus();
            return false;
        }
        //Validation Regarding Parent Amount Parent Project Amount > =Total Child Project Amount
        if(parseFloat($('#'+getclientId('HdnParentProjectAmount')).val())>0  &&  parseFloat($('#'+getclientId('HdnParentProjectAmount')).val()) >parseFloat( $('.i_Amount_Requested').val())){
            MessageBox('Total Child Project Amount exceeds Parent Project Amount.');
            $('.i_Amount_Requested').focus();
            return false;
        }
        //Validation Regarding FTE
        if ($('.i_FTE').val() != "" && $('.i_FTE').val() != undefined) {
            if (parseFloat($('.i_FTE').val()) > 1) {
                MessageBox('Projected Timeline Should be less then or equal to 1.0.');
                $('.i_FTE').focus();
                return false;
            }
        }
        return true;
    }
    catch (err) {
        return false;
    }
}

//Set Controls as Date Picker After Dropdown Index Changed
    function ApplyReDatePicker() {
        $(".datepicker").datepicker({
            buttonText: datePickerTitle,
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
        ApplyToggle();
    }

    //Allow Only Numbers 
    function isNumberKey(evt, obj) {

        var charCode = (evt.which) ? evt.which : event.keyCode
        var value = obj.value;
        var dotcontains = value.indexOf(".") != -1;
        if (dotcontains) {
            if (charCode == 46) return false;
            if (obj.value.split('.')[1].length >= 2)
                return false;
        }
        if (charCode == 46) return true;
        if (charCode > 31 && (charCode < 48 || charCode > 57))
            return false;
        return true;
    }

    //Allow Only Numbers 
    function isNumberKeyWithMax(evt, obj,max) {

        var charCode = (evt.which) ? evt.which : event.keyCode
        var value = obj.value;
        var dotcontains = value.indexOf(".") != -1;
        if (dotcontains) {
            if (charCode == 46) return false;
            if (obj.value.split('.')[1].length >= 2)
                return false;
        }
        if (charCode == 46) return true;
        if (charCode > 31 && (charCode < 48 || charCode > 57))
            return false;
        if (value > max)
            return false;
        return true;
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



    function ClearCloseMorePiSection() {

        $("[id*=TxtDepartment]").val('');
        $("[id*=TxtPIName]").val('');
        $("[id*=txtPIEmail]").val('');
        $("[id*=txtPiPhoneNo]").val('');
        $("[id*=txtPiMCRNo]").val('');
        return false;
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
        table += '<td style="width: 45px; text-align: right"><p  class="grid-action"><a><img title="Delete Pi Detail" alt="" onclick=delPiRows(this) return false; src="../Images/icon-delete.png"></a></p></td></tr>'
        $('#tblPiDetail  tbody').append(table);

        MessageBox('Pi added Successfully..!!')
        $('.frmAddMorePIDetails').slideToggle("slow", "swing", function () {
            if ($('.frmAddMorePIDetails').is(':visible')) {
                $('.newPI').text('Cancel Addind New PI');

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
            MessageBox("Please Enter  PIMCR No");
            txtPIMCR_NO.focus();
            return false;
        }
        return true;
    }
    

    //Fill Pi Details
    function FillPi(result) {
        var TxtPIName = $('[id*=TxtPIName]').attr('id');
        var HdnpiId = $('[id*=HdnpiId]').attr('id');
        var HdnPITxt = $('[id*=HdnPITxt]').attr('id');
        var DeptId = result != null ? result.split('|')[1] : result;
        SearchText(TxtPIName, HdnpiId, 10, "FillPi~spAutoComplete~" + DeptId, fillPiDetails, HdnPITxt);
    }

    function fillPiDetails(result) {
        var ID = (result != null) ? result.split('|')[1] : result;
        var txtPIEmail = $('[id$=txtPIEmail]').attr('id');
        var txtPiPhoneNo = $('[id*=txtPiPhoneNo]').attr('id');
        var txtPiMCRNo = $('[id*=txtPiMCRNo]').attr('id');
        GetPI_MasterDetailsByID(ID, txtPIEmail, txtPiPhoneNo, txtPiMCRNo)
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
                    if (customers.length > 0) {
                        txtPIEmail.value = customers[0].s_Email;
                        txtPiPhoneNo.value = customers[0].s_Phone_no;
                        txtPiMCRNo.value = customers[0].s_MCR_No;

                    }

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

//Delete Pi Row 
    function delPiRows(Obj) {
        var mode = $("[id*=HdnMode]");
        if (mode.val().trim().toLowerCase() == "view") {
            return false;
        }
            if ($(Obj).parents("tbody").find("tr").length == 1) {
                MessageBox("There should be at least one PI  Required.");
                return false;
            }
        if ($(Obj).parents("tbody").find("tr").length > 1) {

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



    function CallDelete(Id) {
        var HdnId = $('[id*=HdnGrantId]');
        HdnId.val(Id);
        $('#' + getclientId('HdnMode')).val('delete');
        $('[id*=btnSave]').click();
    }

    function ConfirmDelete(id) {


        return ConfirmBox('Are you sure to delete this Record..!!', 'CallDelete(' + id + ')');

    }


