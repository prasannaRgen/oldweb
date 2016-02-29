"use strict;"

///-----------------'Load Event'
var modes;
$(function () {
    var modes = $('[id*=HdnContractMode]').val().toLowerCase();
    pageLoadFunc();
    DisableClausControls();
    TrimFilesName();

    SetMultiFilesTrim();
    $('.frmProject input,textarea[id=MainContent_TxtProjTitle]').attr('disabled', 'disabled')
    if (modes == 'update') {
        //  var TxtContractId = $('[id*=TxtContractId]');
        // TxtContractId.attr('disabled', 'disabled');
        DisableOnCompletedStatus();

        var ddlAmendments = $('[id*=ddlAmendments] option:selected');

        if (ddlAmendments.text().toLowerCase() == '--select--') {
            DisableContractControlOnAmendmentChange(false);
        }
    }
    DisableAllFormControls();
    MakeAmendMendDisableAfterYes();
    //TrimGridProjectName();
    DisableContractId();
    DIsableAllCTCControlsAtTerminated();
});

function pageLoadFunc() {
    modes = $('[id*=HdnContractMode]').val().toLowerCase();
    PagingandSpan();
    Autocomplete();
    var mode = $('[id*=HdnContractMode]').val().toLowerCase();
    if (mode == 'insert') {
        SetDisableControl(false);
    }
    else {
        $("[disabled=disabled]").removeAttr("disabled");
    }
    EnableControlOnContractStatus();
}

function PagingandSpan() {
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


        if (frmName.toLowerCase() == 'frmprocat') {
            if ($('.frmNewPIDetails').is(":visible")) {
                $('.frmNewPIDetails').slideToggle("slow").hide();
                $('.newPI').text('Create New Contract');

                $('.newPI').prev("span").text("+");
            }

        }


    });


    if (modes == 'insert') {
        NewContractLink();
    }


    ApplyPaging('tblResposive', 'Paging', 10);
    $('#tblResposive').tablesorter();
    if ($("#tblResposive tbody tr").length == 0) {
        $('[id*=MainContent_SearchBox_txtSearch]').val('');
        $("#tblResposive tbody").html("<tr><td colspan='7' > No Records Available <td></tr>");
        $("#projectPaging").hide();
        $("#tblResposive thead th").css("background-image", "none");
        $("#tblResposive thead th").unbind("click");



    }
    var pagingInterval = setInterval(function () {

        if ($(".header").length > 0) {
            ReApplyPaging('tblResposive');
            clearInterval(pagingInterval);
        }
    }, 100);
    //*************Contract List ********* ( If No project Found)
    if ($("#tblContract tbody tr").length == 0) {

        $("#tblContract tbody").html("<tr><td colspan='6' > No Records Available <td></tr>");
        $("#tblContract thead th").css("background-image", "none");
        $("#tblContract thead th").unbind("click");
    }

    //******Select Clause************

    if ($("#tblClauseDetail tbody tr").length == 0) {

        $("#tblClauseDetail tbody").html("<tr><td colspan='3' > No Records Available <td></tr>");
        $("#tblContract thead th").css("background-image", "none");
        $("#tblClauseDetail thead th").unbind("click");
    }
}


function HideCollapseAtEdit() {

    $('.newPI').text('Cancel Adding New Contract');
    $('.newPI').prev("span").text("-");
    $('.frmNewPIDetails').slideToggle("slow").show();
    $('.frmProCat').slideToggle("slow").hide();
    NewContractLink();
}

function AfterSave() {

    $('.newPI').text('Create New Contract ');
    $('.newPI').prev("span").text("+");
    $('.frmProCat').slideToggle("slow").show();
    $('.frmProCat').slideToggle("slow", function () {
        if ($(this).is(':visible')) {

        } else {

        }
    });
    // NewContractLink();
}


function Open() {
    $('.newPI').click(function () {
        var frmName = $(this).attr('data-frm');
        var mode = $('[id*=HdnContractMode]').val().toLowerCase();
        var sign = $('.newPI').prev("span").text();


        if ($('.frmProCat').is(':visible')) {
            $('.frmProCat').slideToggle("slow");
        }




        $('.frmNewPIDetails').slideToggle("slow", "swing", function () {

            if ($('.frmNewPIDetails').is(':visible')) {
                $('.newPI').text('Cancel Adding New Contract');
                $('.newPI').prev("span").text("-");

                $('.frmProCat').slideToggle("slow").hide();
            } else {
                $('.frmNewPIDetails').show();
                $('.newPI').prev("span").text("+");
                $('.frmProCat').show();

            }

        });


    });
}



function NewContractLink() {
    $('.newPI').click(function () {
        var frmName = $(this).attr('data-frm');
        var mode = $('[id*=HdnContractMode]').val().toLowerCase();
        var sign = $('.newPI').prev("span").text();


        if ($('.frmProCat').is(':visible')) {
            $('.frmProCat').slideToggle("slow");
        }




        $('.frmNewPIDetails').slideToggle("slow", "swing", function () {

            if ($('.frmNewPIDetails').is(':visible')) {
                $('.newPI').text('Cancel Adding New Contract');
                $('.newPI').prev("span").text("-");

                $('.frmProCat').slideToggle("slow").hide();
            } else {
                $('.newPI').text('Create New Contract ');
                $('.newPI').prev("span").text("+");
                $('.frmProCat').show();

            }

        });

        if (sign == '-') {
            callReset();
        }
    });
}




//-------------------
var arr = new Array();

function PushValues(Inputvalues) {

    for (var i = 0; i < Inputvalues.split(',').length; i++) {
        arr.push(parseInt(Inputvalues.split(',')[i]));
    }



}

function onClauseChange(chkClause) {
    var tr = '';
    var value = ''; var text = '';
    var uncheck = new Array();
    $('#' + chkClause.id + ' input:checked').each(function (index, item) {

        text = $(this).closest('td').find('label').html();
        value = $(this).val();
        uncheck.push(parseInt(value));
        tr = '<tr clauseId=' + value + '>' +
			'<td data-th="Clauses">' +
				'<p><span id="lblClause">' + text + '</span></p>' +
			'</td>' +
			 '<td data-th="Status">' +
				 '<p>' +
					'<select  id="ddlStatus" onchange="EnableDisableClauseControls(this);" >' +
					 '<option value="1">Compliant</option>' +
					 '<option value="2">Non Compliant</option>' +
					 '<option value="3">Acceptable</option>' +
					 '</select>' +
				'</p>' +
			'</td>' +
			'<td data-th="Comments">' +
				'<p>' +
					'<textarea  id="TxtComments" onkeypress="return BlockComma();" onpaste="return BlockComma();" disabled="disabled" style="width: 300px;" rows="2" cols="20">' +
					'</textarea>' +
				'</p>' +
			'</td>' +
			'<td data-th="Proposed Changes">' +
				'<p>' +
				'<textarea  id="TxtProposedChanges" onkeypress="return BlockComma();" onpaste="return BlockComma();" disabled="disabled" style="width: 300px;" rows="2" cols="20">' +
				'</textarea>' +
				'</p>' +
			'</td>' +
		'</tr>'

        if ($.inArray(parseInt(value), arr) == -1) {
            arr.push(parseInt(value));
            $("#tblClauseDetail tbody tr td:contains('No Records Available')").each(function () {
                $("#tblClauseDetail tbody tr").remove();
            });
            $('#tblClauseDetail tbody').append(tr);
        }

    });
    for (var i = 0; i < arr.length; i++) {
        if ($.inArray(parseInt(arr[i]), uncheck) == -1) {
            $('#tblClauseDetail tbody tr[clauseId =' + parseInt(arr[i]) + ']').remove();
            if ($("#tblClauseDetail tbody tr").length == 0) {

                $("#tblClauseDetail tbody").html("<tr><td colspan='3' > No Records Available <td></tr>");
                $("#tblContract thead th").css("background-image", "none");
                $("#tblClauseDetail thead th").unbind("click");
            }
            var index = arr.indexOf(arr[i]);
            arr.splice(index, 1);


        }
    }

    return true;
}

function EnableDisableClauseControls(obj) {
    var svalue = $(obj).val();
    if (svalue > 1) {
        $(obj).parent().parent().parent('tr').find('td:eq(2)').find('textarea').removeAttr("disabled");
        $(obj).parent().parent().parent('tr').find('td:eq(3)').find('textarea').removeAttr("disabled");
    }
    else {
        $(obj).parent().parent().parent('tr').find('td:eq(2)').find('textarea').text('');
        $(obj).parent().parent().parent('tr').find('td:eq(3)').find('textarea').text('');
        $(obj).parent().parent().parent('tr').find('td:eq(2)').find('textarea').attr("disabled", "disabled");
        $(obj).parent().parent().parent('tr').find('td:eq(3)').find('textarea').attr("disabled", "disabled");
    }
}


function getValuesfromClause() {
    HdnClauseValues = document.getElementById($("[id*=HdnClauseValues]").attr('id'));
    HdnMode = document.getElementById($("[id*=HdnMode]").attr('id'));
    HdnContractFiles = document.getElementById($("[id*=HdnContractFiles]").attr('id'));
    HdnContractFiles.value = "";
    HdnClauseValues.value = "";
    var clauseId = "";
    var ddlStatusclause = "";
    var ddlstatuscluseId = "";
    var comments = "";
    var proposedChange = "";
    if (HdnMode.value.toString().toLowerCase() != 'delete' && HdnMode.value.toString().toLowerCase() != 'view') {
        $('#tblClauseDetail tbody tr').each(function (index, item) {
            clauseId = $(item).attr('clauseId');
            ddlStatusclause = $(item).closest('tr').find('td').find('option:selected').text();
            ddlstatuscluseId = $(item).closest('tr').find('td').find('option:selected').val();
            comments = $(item).closest('tr').find('td:eq(2)').find('textarea').val().replace(/\|/gmi, '').replace(/\~/gmi, '')

            proposedChange = $(item).closest('tr').find('td:eq(3)').find('textarea').val().replace(/\|/gmi, '').replace(/\~/gmi, '')

            HdnClauseValues.value += clauseId + "|" + ddlStatusclause + "|" + ddlstatuscluseId + "|" + comments + "|" + proposedChange + "~"
        });
        $('.MultiFile-list input').each(function (index, item) {
            HdnContractFiles.value += ($(item).val()) + ","

        });
    }


}

function OnCancel() {
    $('.frmNewPIDetails').slideToggle("slow", "swing", function () {
        var sign = $('.newPI').prev("span").text();
        if ($('.frmNewPIDetails').is(':visible')) {
            $('.newPI').text('Cancel Adding New Contract');
            $('.newPI').prev("span").text("-");

            $('.frmProCat').slideToggle("slow").hide();
        } else {
            $('.newPI').text('Create New Contract ');
            $('.newPI').prev("span").text("+");
            $('.frmProCat').show();

        }
    });
    callReset();
    return false;
}

function ValidateContract() {

    chkCollaboratorList = document.getElementById($("[id*=chkCollaboratorList]").attr('id'));
    TxtContractName = document.getElementById($("[id*=TxtContractName]").attr('id'));
    ddlContractCategory = document.getElementById($("[id*=ddlContractCategory]").attr('id'));
    TxtContractId = document.getElementById($("[id*=TxtContractId]").attr('id'));
    TxtGovCountry = document.getElementById($("[id*=TxtGovCountry]").attr('id'));
    ddlContractStatus = document.getElementById($("[id*=ddlContractStatus]").attr('id'));
    if ($("#tblClauseDetail tbody tr td").html().toLowerCase().trim().replace(/ +/g, "") != "norecordsavailable") {
        getValuesfromClause();
    }
    
    HdnMode = document.getElementById($("[id*=HdnMode]").attr('id'));
    var HdnContractMode = $("[id*=HdnContractMode]");
    chkClause = document.getElementById($("[id*=chkClause]").attr('id'));
    var TxtContStartDate = $('[id*=TxtContStartDate]');
    var ProjId = $('[id*=HdnProjectId]');
    var ContId = $('[id*=HdnContractId]');
    var TxtDateofLast = $('[id*=TxtDateofLast]');
    var TxtEffectiveDate = $('[id*=TxtEffectiveDate]');
    var TxtContractExpDate = $('[id*=TxtContractExpDate]');
    if (HdnMode.value.toString().toLowerCase() == 'insert' || HdnMode.value.toString().toLowerCase() == 'update') {
        if (HdnContractMode.val().toLowerCase() == "insert" || HdnContractMode.val().toLowerCase() == "update") {


            var counter = 0;
            if (chkCollaboratorList == null) {
                MessageBox("No Collaborator Remain to Create Contract..!!");
                return false;
            }
            else {
                var collabInput = chkCollaboratorList.getElementsByTagName("input");
                for (var i = 0; i < collabInput.length; i++) {
                    if (collabInput[i].checked)
                        counter++;
                }
                if (counter <= 0) {
                    MessageBox("Please select Atleast one collaborator");
                    chkCollaboratorList.focus();
                    return false;
                }
            }
        }
        if (TxtContractName.value.trim() == '') {
            MessageBox("Please Enter Contract Name");
            TxtContractName.focus();
            return false;
        }
        if (ddlContractCategory.options[ddlContractCategory.selectedIndex].text.toLowerCase() == "--select--") {
            MessageBox("Please Select Contract Category");
            ddlContractCategory.focus();
            return false;
        }
        if (TxtContractId.value.trim() == "") {
            MessageBox("Please Enter Contract Id");
            TxtContractId.focus();
            return false;
        }
       
        if (HdnMode.value.toString().toLowerCase() == 'insert') {
            var checkId = GetValidatefrmDB(null, 'CheckContract', ProjId.val(), ContId.val(), TxtContractName.value, TxtContractId.value);
            if (checkId != "") {
                MessageBox(checkId);
                return false;
            }
        }

     
        counter = 0;
        var clauseInput = chkClause.getElementsByTagName("input");
        for (var i = 0; i < clauseInput.length; i++) {
            if (clauseInput[i].checked)
                counter++;
        }
        if (counter <= 0) {
            MessageBox("Please select Atleast one Clause");
            chkClause.focus();
            return false;
        }

        if (TxtGovCountry.value.trim() == "") {
            MessageBox("Please Select Governing Law country");
            TxtGovCountry.focus();
            return false;
        }
        if (ddlContractStatus.options[ddlContractStatus.selectedIndex].text.toLowerCase() == "--select--") {
            MessageBox("Please Select Contract Status");
            ddlContractStatus.focus();
            return false;
        }
        if (TxtContStartDate.val().trim() == "") {
            MessageBox("Please Select Contract Status Date");
            TxtContStartDate.focus();
            return false;
        }
        if (ddlContractStatus.options[ddlContractStatus.selectedIndex].text.toLowerCase() == "completed") {
            if (TxtDateofLast.val().trim() == "") {
                MessageBox("Please Select Date of Last Signed");
                TxtDateofLast.focus();
                return false;
            }
            if (TxtEffectiveDate.val().trim() == "") {
                MessageBox("Please Select Effective Date (Study Start Date)");
                TxtEffectiveDate.focus();
                return false;
            }
            var r = CheckmaxDate(TxtEffectiveDate.val(), TxtDateofLast.val())
            if (r == false) {
                MessageBox("Effective Date (Study Start Date) should be less than or Equal to  Date of Last Signed");
                TxtEffectiveDate.focus();
                return false;
            }

            if (TxtContractExpDate.val().trim() == "") {
                MessageBox("Please Select Contract Expiry Date");
                TxtContractExpDate.focus();
                return false;
            }
            var dates = new Array();
            dates.push(TxtContractExpDate.val());
            var CTCExp = GetMaxDate(dates);
            var DtLast = ConvertDatetoMDY(TxtDateofLast.val());
            var rrs = CheckMaxdt(CTCExp, DtLast);



            var DtEffect = ConvertDatetoMDY(TxtEffectiveDate.val());
            var r2 = CheckMaxdt(CTCExp, DtEffect);

            if (r2 == false) {
                MessageBox("Contract Expiry Date should be Greater than  Effective Date (Study Start Date) ");
                TxtContractExpDate.focus();
                return false;
            }

            if (rrs == false) {
                MessageBox("Contract Expiry Date should be Greater than  Date of Last Signed");
                TxtContractExpDate.focus();
                return false;
            }
        }
        var ddlAmendments = $('[id*=ddlAmendments] option:selected').text().toLowerCase();

        if (ddlAmendments == "yes") {
            var TxtNContractExpiryDate = $('[id*=TxtNContractExpiryDate]');
            if (TxtNContractExpiryDate.val().trim() != "") {
                var NewExpDt = ConvertDatetoMDY(TxtNContractExpiryDate.val());
                var dates = new Array();
                dates.push(TxtContractExpDate.val());
                var CTCExp = GetMaxDate(dates);
                var r11 = CheckMaxdt(NewExpDt, CTCExp);

                if (r11 == false) {
                    MessageBox("New Contract Expiry Date should be Greater than  Contract Expiry Date");
                    TxtNContractExpiryDate.focus();
                    return false;
                }
            }

        }

    }
    $("[disabled=disabled]").removeAttr("disabled");
    return true;
}



function CheckMaxdt(dat1, dat2) {
    var cfd = Date.parse(dat1);
    var ctd = Date.parse(dat2);

    var date1 = new Date(cfd);
    var date2 = new Date(ctd);

    if (date1 > date2) {
        return true;
    }
    else {
        return false;
    }

}


function ValidateFinalSave() {
    TxtProjTitle = document.getElementById($("[id*=TxtProjTitle]").attr('id'));// document.getElementById(TxtProjTitle);
    HdnMode = document.getElementById($("[id*=HdnMode]").attr('id')); //document.getElementById(HdnMode);
    if (HdnMode.value.toString().toLowerCase() != 'delete' && HdnMode.value.toString().toLowerCase() != 'view') {
        if (TxtProjTitle.value == "") {
            MessageBox("Please Select or Enter Valid Project Detail");
            TxtProjTitle.focus();
            return false;
        }
        if ($('[id*=RptContract').find('tr:gt(0)').length < 0) {
            MessageBox("Please Add Atleast single contract");
            $('#' + RptContract + '').focus();
            return false;
        }
    }
    return true;
}


//--------------------------------- Contract Budget Cash--------------------------------

function CalculateProjectBudgetCash() {
    TxtprocedureCost = document.getElementById($("[id*=TxtprocedureCost]").attr('id'));// $get('<%= TxtprocedureCost.ClientID%>');
    TxtInvestigatorFees = document.getElementById($("[id*=TxtInvestigatorFees]").attr('id')); //$get('<%= TxtInvestigatorFees.ClientID%>');
    TxtCoOrdinatorFess = document.getElementById($("[id*=TxtCoOrdinatorFess]").attr('id'));// $get('<%= TxtCoOrdinatorFess.ClientID%>');
    TxtProjectBudgetCash = document.getElementById($("[id*=TxtProjectBudgetCash]").attr('id')); //$get('<%= TxtProjectBudgetCash.ClientID%>');
    var x1 = parseInt(TxtprocedureCost.value == "" ? 0 : (TxtprocedureCost.value));
    var x2 = parseInt(TxtInvestigatorFees.value == "" ? 0 : parseInt(TxtInvestigatorFees.value));
    var x3 = parseInt(TxtCoOrdinatorFess.value == "" ? 0 : parseInt(TxtCoOrdinatorFess.value));
    TxtProjectBudgetCash.value = parseInt(x1 + x2 + x3) == 0 ? "" : parseInt(x1 + x2 + x3);
}

$(function () {
    $('[id*=TxtprocedureCost]').bind("mouseup", function (e) {
        var $input = $(this),
            oldValue = $input.val();

        if (oldValue == "") return;

        // When this event is fired after clicking on the clear button
        // the value is not cleared yet. We have to wait for it.
        setTimeout(function () {
            var newValue = $input.val();

            if (newValue == "") {
                CalculateProjectBudgetCash();
                $input.trigger("cleared");
            }
        }, 1); OnCancel
    });

    $('[id*=TxtInvestigatorFees]').bind("mouseup", function (e) {
        var $input = $(this),
            oldValue = $input.val();

        if (oldValue == "") return;

        // When this event is fired after clicking on the clear button
        // the value is not cleared yet. We have to wait for it.
        setTimeout(function () {
            var newValue = $input.val();

            if (newValue == "") {
                CalculateProjectBudgetCash();
                $input.trigger("cleared");
            }
        }, 1);
    });

    $('[id*=TxtCoOrdinatorFess]').bind("mouseup", function (e) {
        var $input = $(this),
            oldValue = $input.val();

        if (oldValue == "") return;

        // When this event is fired after clicking on the clear button
        // the value is not cleared yet. We have to wait for it.
        setTimeout(function () {
            var newValue = $input.val();

            if (newValue == "") {
                CalculateProjectBudgetCash();
                $input.trigger("cleared");
            }
        }, 1);
    });
    $('[id*=TxtProjectBudgetCash]').attr('readonly', true);
    $('[id*=TxtProjectBudgetCash]').bind("mouseup", function (e) {
        var $input = $(this),
            oldValue = $input.val();

        if (oldValue == "") return;

        // When this event is fired after clicking on the clear button
        // the value is not cleared yet. We have to wait for it.
        setTimeout(function () {
            var newValue = $input.val();

            if (newValue == "") {
                return false;
                $input.trigger("cleared");
            }
        }, 1);
    });

});


//----------------------------------END

function performCancel() {
    $("[id*=btnContractCancel]").click();
}


function RemoveDownloadFile(obj) {
    var hdnIndex = 'hdn' + $(obj).attr('id').split('a~')[1];
    $('#' + hdnIndex).remove();
    $(obj).parent().remove();
    return false;
}

function Autocomplete() {
    var TxtGovCountry = $('[id*=TxtGovCountry]').attr('id');
    var HdnGovCountry = $('[id*=HdnGovCountry]').attr('id');
    SearchText(TxtGovCountry, HdnGovCountry, 10, "Country~spAutoComplete");
    var HdnContractMode = $("[id*=HdnContractMode]").val().toLowerCase();
    if (HdnContractMode == 'insert') {
        $('[id*=TxtGovCountry]').val('Singapore');
        $('[id*=HdnGovCountry]').val('117');
    }

}


//------------Contract Status Region
function SetDisableControl(IsEnable) {
    var HdnContExpDate = $('[id*=HdnContExpDate]');
    var ddlContractStatus = $('[id*=ddlContractStatus] option:selected').text().trim().toLowerCase();
    if ($('[id*=HdnContExpDate]').val().trim() != '') {



        $('[id*=fldContractFile]').attr('disabled', 'disabled')
        $('[id*=TxtContractExpDate]').attr('disabled', 'disabled').next("img").attr("disabled", "disabled").css("opacity", "0.5");
        $('[id*=TxtEffectiveDate]').attr('disabled', 'disabled').next("img").attr("disabled", "disabled").css("opacity", "0.5");
        $('[id*=TxtDateofLast]').attr('disabled', 'disabled').next("img").attr("disabled", "disabled").css("opacity", "0.5");
        $('[id*=TxtContractFinalizeDate]').attr('disabled', 'disabled').next("img").attr("disabled", "disabled").css("opacity", "0.5");


        if (ddlContractStatus != 'completed') {
            $('[id*=fldAmendmentFile]').attr('disabled', 'disabled');
            $('[id*=TxtNContractExpiryDate]').attr('disabled', 'disabled').next("img").attr("disabled", "disabled").css("opacity", "0.5");;
        }
        else {
            $('[id*=fldContractFile]').removeAttr('disabled')
            $('[id*=fldAmendmentFile]').removeAttr('disabled');
            $('[id*=TxtNContractExpiryDate]').removeAttr('disabled').next("img").attr("disabled", "disabled").css("opacity", "2.5");;
        }
    }




    if (IsEnable == true) {

        if (modes == 'insert') {
            $('[id*=fldContractFile]').removeAttr('disabled');
            $('[id*=TxtContractExpDate]').removeAttr('disabled');
            $('[id*=TxtEffectiveDate]').removeAttr('disabled');
            $('[id*=TxtDateofLast]').removeAttr('disabled');
            $('[id*=TxtContractFinalizeDate]').removeAttr('disabled');



            $('[id*=TxtContractExpDate]').next("img").removeAttr("disabled").css("opacity", "2.5");
            $('[id*=TxtEffectiveDate]').next("img").removeAttr("disabled").css("opacity", "2.5");
            $('[id*=TxtDateofLast]').next("img").removeAttr("disabled").css("opacity", "2.5");
            $('[id*=TxtContractFinalizeDate]').next("img").removeAttr("disabled").css("opacity", "2.5");
        }
        else if (modes == 'update' && $('[id*=HdnContExpDate]').val().trim() == '') {
            $('[id*=TxtContractExpDate]').val('');
            $('.MultiFile-list').html('');
            $('[id*=TxtEffectiveDate]').val('');
            $('[id*=TxtDateofLast]').val('');
            $('[id*=TxtContractFinalizeDate]').val('');
            $('[id*=fldContractFile]').removeAttr('disabled');
            $('[id*=TxtContractExpDate]').removeAttr('disabled').next("img").removeAttr("disabled").css("opacity", "2.5");
            $('[id*=TxtEffectiveDate]').removeAttr('disabled').next("img").removeAttr("disabled").css("opacity", "2.5");
            $('[id*=TxtDateofLast]').removeAttr('disabled').next("img").removeAttr("disabled").css("opacity", "2.5");
            $('[id*=TxtContractFinalizeDate]').removeAttr('disabled').next("img").removeAttr("disabled").css("opacity", "2.5");
        }


    }

    if (modes == 'insert' && $('[id*=HdnContExpDate]').val().trim() == '') {

        if (ddlContractStatus != 'completed') {
            $('[id*=TxtContractExpDate]').val('');
            $('.MultiFile-list').html('');
            $('[id*=TxtEffectiveDate]').val('');
            $('[id*=TxtDateofLast]').val('');
            $('[id*=TxtContractFinalizeDate]').val('');
            $('[id*=fldContractFile]').attr('disabled', 'disabled')
            $('[id*=TxtContractExpDate]').attr('disabled', 'disabled').next("img").attr("disabled", "disabled").css("opacity", "0.5");
            $('[id*=TxtEffectiveDate]').attr('disabled', 'disabled').next("img").attr("disabled", "disabled").css("opacity", "0.5");
            $('[id*=TxtDateofLast]').attr('disabled', 'disabled').next("img").attr("disabled", "disabled").css("opacity", "0.5");
            $('[id*=TxtContractFinalizeDate]').attr('disabled', 'disabled').next("img").attr("disabled", "disabled").css("opacity", "0.5");
        }
        else {
            $('[id*=TxtContractExpDate]').val('');
            $('.MultiFile-list').html('');
            $('[id*=TxtEffectiveDate]').val('');
            $('[id*=TxtDateofLast]').val('');
            $('[id*=TxtContractFinalizeDate]').val('');
            $('[id*=fldContractFile]').removeAttr('disabled');
            $('[id*=TxtContractExpDate]').removeAttr('disabled').next("img").removeAttr("disabled").css("opacity", "2.5");
            $('[id*=TxtEffectiveDate]').removeAttr('disabled').next("img").removeAttr("disabled").css("opacity", "2.5");
            $('[id*=TxtDateofLast]').removeAttr('disabled').next("img").removeAttr("disabled").css("opacity", "2.5");
            $('[id*=TxtContractFinalizeDate]').removeAttr('disabled').next("img").removeAttr("disabled").css("opacity", "2.5");
        }
    }

    if (modes != 'update') {

        $('[id*=ddlAmendments]').val(-1);
        $('[id*=ddlAmendments]').attr('disabled', 'disabled');

        var ddlAmendments = $('[id*=ddlAmendments] option:selected');
        if (ddlAmendments.text().toLowerCase() == '--select--') {
            $('[id*=fldAmendmentFile]').attr('disabled', 'disabled');
            $('[id*=TxtNContractExpiryDate]').attr('disabled', 'disabled').next("img").attr("disabled", "disabled").css("opacity", "0.5");;
        }

    }
    var ddlAmendments = $('[id*=ddlAmendments] option:selected');
    if (ddlAmendments.text().toLowerCase() == '--select--' && modes == 'update') {
        $('[id*=fldAmendmentFile]').attr('disabled', 'disabled');
        $('[id*=TxtNContractExpiryDate]').attr('disabled', 'disabled').next("img").attr("disabled", "disabled").css("opacity", "0.5");;
    }








}

function EnableControlOnContractStatus() {
    var modes = $('[id*=HdnContractMode]').val().toLowerCase();
    var ddlContractStatus = $('[id*=ddlContractStatus] option:selected').text().trim().toLowerCase();

    if (ddlContractStatus == "completed") {
        SetDisableControl(true);
    }
    else {
        SetDisableControl(false);
        if (modes == 'insert') {
            $('.MultiFile-list').html('');
        }

    }


    forContractStatusDate();

}


function forContractStatusDate() {
    var ddlContractStatus = $('[id*=ddlContractStatus] option:selected').text().trim().toLowerCase();
    var value = $('[id*=ddlContractStatus] option:selected').val();
    var HdnContractId = $('[id*=HdnContractId]').val();
    GetId('getContractStatusDate', HdnContractId, value, '', '', SetContractDate);
    var spanContStatusDate = $('[id*=spanContStatusDate]');
    if (ddlContractStatus != "--select--") {
        spanContStatusDate.text($('[id*=ddlContractStatus] option:selected').text() + ' Date');
    }
    else {
        spanContStatusDate.text('Contract Status Date');
    }

}

function SetContractDate(date) {
    var TxtContStartDate = $('[id*=TxtContStartDate]');
    if (date != "") {
        TxtContStartDate.val(date);
    }
    else {
        TxtContStartDate.val(GetDate('-'));
    }

}

function EnableOnAmendments() {
    var ddlAmendments = $('[id*=ddlAmendments] option:selected').text().trim().toLowerCase();
    if (ddlAmendments == 'yes') {
        SetAmendmentControlEnable(true);
        DisableContractControlOnAmendmentChange(false);
    }
    else {
        SetAmendmentControlEnable(false);
        DisableContractControlOnAmendmentChange(true);
    }

    if (ddlAmendments == '--select--') {
        DisableContractControlOnAmendmentChange(false);
    }
    var modes = $('[id*=HdnContractMode]').val().toLowerCase();
    if (modes == 'update') {
        if (ddlAmendments == 'no') {
            $('#MainContent_multilistdiv a.MultiFile-remove').show()
        }
        else {
            $('#MainContent_multilistdiv a.MultiFile-remove').hide()
        }

    }

}


function SetAmendmentControlEnable(IsEnable) {
    var HdnAmendPath = $('[id*=HdnAmendPath]');
    if (modes == 'update') {
        if (HdnAmendPath.val().trim() == '') {
            $('[id*=fldAmendmentFile]').attr('disabled', 'disabled');
            $('[id*=TxtNContractExpiryDate]').attr('disabled', 'disabled').next("img").attr("disabled", "disabled").css("opacity", "0.5");;
            $('[id*=fldAmendmentFile]').val(''); $('[id*=fldAmendmentFile]').val(null); $('[id*=TxtNContractExpiryDate]').val('');
        }
    }


    if (IsEnable == true) {
        $('[id*=fldAmendmentFile]').removeAttr('disabled');
        $('[id*=TxtNContractExpiryDate]').removeAttr('disabled').next("img").removeAttr("disabled").css("opacity", "2.5");;
    }
}


function HideActionButton(mode) {
    $("#tblContract tbody tr").each(function () {
        switch (mode.toLowerCase()) {
            case 'update':
                $(this).find('td:last-child .grid-action a:eq(1)').css('display', 'none')
                $(this).find('td:last-child .grid-action a:eq(2)').css('display', 'none')
                break;
            case 'delete':
                $(this).find('td:last-child .grid-action a:eq(0)').css('display', 'none')
                $(this).find('td:last-child .grid-action a:eq(2)').css('display', 'none')
                break;
            case 'view':
                $(this).find('td:last-child .grid-action a:eq(0)').css('display', 'none')
                $(this).find('td:last-child .grid-action a:eq(1)').css('display', 'none')
                break;

        }

    });
}




function Retfalse() {
    return false;
}



function ValidateFinalSave() {
    var modes = $('[id*=HdnContractMode]').val().toLowerCase();
    var mode = $('[id*=HdnContractMode]').val().toLowerCase();
    var sign = $('.newPI').prev("span").text();
    if ($("#tblContract tbody tr td").html().toLowerCase().trim().replace(/ +/g, "") == "norecordsavailable") {
        if (mode == 'insert') {
            MessageBoxEvent('Save Atleast One Contrat Detail', "Retfalse();")
            return false;
        }
    }
    if (mode == 'insert' && sign == '-') {
        MessageBoxEvent('Save Contract Detail first', "Retfalse();")
        return false;
    }
    if (mode == 'update' && sign == '-') {
        MessageBoxEvent('Update Contract Detail first', "Retfalse();")
        return false;
    }
    if (mode == 'delete' && sign == '-') {
        MessageBoxEvent('Delete Contract Detail first', "Retfalse();")
        return false;
    }
    else {
        eval("GoToSave();");
    }
}


function GoToSave() {
    $('[id*=btnSave]').click();
}


var ContractIds = '';
function DeleteContract(Obj) {
    var ContractIds = $(Obj).parent().parent().parent().attr('ContractId')
    ConfirmBox('Are you sure to delete this Contract..!!', 'DeleteRows(' + ContractIds + ');');
    return false;
}

function DeleteRows(ids) {
    if (ids != undefined) {
        GetId('DeleteContract', '1', 'abc', ids, '', 'CallDelete');
    }




}

function CallDelete(result) {
    if (result != '') {
        $('#tblContract  tbody tr[ContractId =' + ContractIds + ']').remove()
        MessageBox('Contract Details Delete Sucessfully..!!');
        return false;
    }

}

function FuncDelete() {
    $('[id*=delcont]').click();
}


function DisableClausControls() {

    $('#tblClauseDetail tbody tr').each(function (index, item) {

        var items = $(item);
        var dropdown = $(item).find('td>p>select>option:selected').text().toLowerCase();
        var textarea = $(item).find('td>p>textarea');
        if (dropdown == 'compliant') {
            textarea.attr('disabled', 'disabled');
        }
        else {
            textarea.removeAttr('disabled');
        }

    });

}



function Trim(str, len) {
    if (str.length > len)
        return str.slice(0, len) + "...";
    else
        return str;
}


function TrimFilesName() {
    var lnkDwnldAmendment = $('[id*=lnkDwnldAmendment]');
    var lnkDwnldCorespondace = $('[id*=lnkDwnldCorespondace]');
    lnkDwnldAmendment.attr('title', lnkDwnldAmendment.text());
    lnkDwnldCorespondace.attr('title', lnkDwnldCorespondace.text());
    var length1 = (lnkDwnldAmendment.text().length >= 50) ? 40 : lnkDwnldAmendment.text().length;
    var length2 = (lnkDwnldCorespondace.text().length >= 50) ? 40 : lnkDwnldCorespondace.text().length;
    lnkDwnldAmendment.text(Trim(lnkDwnldAmendment.text(), length1));
    lnkDwnldCorespondace.text(Trim(lnkDwnldCorespondace.text(), length2));
}

function SetMultiFilesTrim() {
    $('#MainContent_multilistdiv .MultiFile-label').each(function (index, item) {
        var filename = $(item).find('.MultiFile-title');
        filename.attr('title', filename.text());
        var length = (filename.text().length >= 50) ? 40 : filename.text().length;
        filename.text(Trim(filename.text(), length));
    });
}


function SetFixHeader() {
    $('#tblClauseDetail').gridviewScroll({
        width: 660,
        height: 200
    });

}


function DisableOnCompletedStatus() {

    // $('[id*=TxtContractExpDate]').attr('disabled', 'disabled').next("img").attr("disabled", "disabled").css("opacity", "0.5");
    var HdnContractMode = $("[id*=HdnContractMode]");
    if (HdnContractMode.length > 0) {

        if (HdnContractMode.val().toLowerCase() == 'update') {
            var TxtContractExpDate = $('[id*=TxtContractExpDate]')
            if (TxtContractExpDate.val().trim() != '') {
                $('[id*=ddlAmendments]').removeAttr('disabled');

            }
            else {
                $('[id*=ddlAmendments]').attr('disabled', true);
            }

        }
    }


}



function CheckmaxDate(lowDate, MaxDate) {
    var check = true;
    var dates = new Array();
    dates.push(lowDate);
    var LDate = GetMaxDate(dates);
    var MDate = ConvertDatetoMDY(MaxDate);
    var r = CalGreaterDate(LDate, MDate);
    if (r == false) {
        check = false;
    }
    return check;
}

function AfterDelete() {
    $('.newPI').text('Create New Contract ');
    $('.newPI').prev("span").text("+");
    $('.frmProCat').slideToggle("slow").show();
    $('.frmProCat').slideToggle("slow", function () {
        if ($(this).is(':visible')) {

        } else {

        }
    });

    return false;
}

function DisableAllFormControls() {
    var HdnContractMode = $("[id*=HdnContractMode]").val().toLowerCase();
    if (HdnContractMode == 'view' || HdnContractMode == 'delete') {

        $('body input[type=file]').attr('disabled', true)
        $('#divCollaborator table tbody tr input').attr('disabled', true)
        $('body input[type=text]').attr('disabled', true)
        $('body textarea').attr('disabled', true)
        $('body select').attr('disabled', true)
        $('#divClause table tbody tr input').attr('disabled', true)
        $('[id*=lnkDwnldCorespondace]').attr('disabled', true);
        $('.ui-datepicker-trigger').css("opacity", "0.5");

        $('[id*=multilistdiv] a').attr('disabled', true);
    }
    if (HdnContractMode != 'insert') {
        $('#tblClauseDetail tbody tr').each(function (index, item) {

            var items = $(item);
            var dropdown = $(item).find('td>p>select>option:selected').text().toLowerCase();
            var textarea = $(item).find('td>p>textarea');
            if (dropdown == 'compliant') {
                textarea.attr('disabled', 'disabled');
                textarea.val('');
            }
        });

    }

}

function DisableContractControlOnAmendmentChange(isEnable) {
    $('[id*=fldContractFile]').attr('disabled', 'disabled');
    //  $('[id*=multilistdiv] a').attr('disabled', true)
    $('[id*=TxtContractExpDate]').attr('disabled', 'disabled').next("img").attr("disabled", "disabled").css("opacity", "0.5");
    $('[id*=TxtEffectiveDate]').attr('disabled', 'disabled').next("img").attr("disabled", "disabled").css("opacity", "0.5");
    $('[id*=TxtDateofLast]').attr('disabled', 'disabled').next("img").attr("disabled", "disabled").css("opacity", "0.5");
    $('[id*=TxtContractFinalizeDate]').attr('disabled', 'disabled').next("img").attr("disabled", "disabled").css("opacity", "0.5");
    if (isEnable == true) {
        $('[id*=fldContractFile]').removeAttr('disabled');
        // $('[id*=multilistdiv] a').removeAttr('disabled');
        $('[id*=TxtContractExpDate]').removeAttr('disabled').next("img").removeAttr("disabled").css("opacity", "2.5");
        $('[id*=TxtEffectiveDate]').removeAttr('disabled').next("img").removeAttr("disabled").css("opacity", "2.5");
        $('[id*=TxtDateofLast]').removeAttr('disabled').next("img").removeAttr("disabled").css("opacity", "2.5");
        $('[id*=TxtContractFinalizeDate]').removeAttr('disabled').next("img").removeAttr("disabled").css("opacity", "2.5");
    }
}


function MakeAmendMendDisableAfterYes() {
    var modes = $('[id*=HdnContractMode]').val().toLowerCase();
    var ddlAmendments = $('[id*=ddlAmendments] option:selected').text().trim().toLowerCase();
    if (modes == 'update') {
        if (ddlAmendments == 'yes') {
            $('[id*=ddlAmendments]').attr('disabled', true);
            //  $('[id*=fldAmendmentFile]').attr('disabled', true);
            //  $('[id*=TxtNContractExpiryDate]').attr('disabled', true).next("img").attr("disabled", "disabled").css("opacity", "0.5");
            // $('[id*=lnkDwnldAmendment]').attr('disabled', true);
        }
        if (ddlAmendments == '--select--' || ddlAmendments == 'yes') {
            $('#MainContent_multilistdiv a.MultiFile-remove').hide();

        }
    }

}


function BlockComma() {
    var t = event.srcElement.type;
    var kc = event.keyCode;
    if (kc == 124 || kc == 126) {
        return false;
    }
    return true;
}

function Trim(str, len) {
    if (str.length > len)
        return str.slice(0, len) + "...";
    else
        return str;
}


function TrimGridProjectName() {
    $('#tblResposive tbody tr').each(function (index, item) {
        var length = $(item).find('td:eq(1)').text().length;
        if (length >= 100) {
            $(item).find('td:eq(1)').attr('title', $(item).find('td:eq(1)').text().trim());
            $(item).find('td:eq(1)').text(Trim($(item).find('td:eq(1)').text().trim(), 50));

            $(item).find('td:eq(4)').attr('title', $(item).find('td:eq(4)').text().trim());
            $(item).find('td:eq(4)').text(Trim($(item).find('td:eq(4)').text().trim(), 10));

        }
    });
}


function DisableContractId() {

    var HdnContractMode = $("[id*=HdnContractMode]");
    if (HdnContractMode.length > 0) {

        if (HdnContractMode.val().toLowerCase() == 'update') {
            var TxtContractId = $('[id*=TxtContractId]');
            TxtContractId.attr('disabled', true);
        }
    }
}


function DIsableAllCTCControlsAtTerminated() {
    var modes = $('[id*=HdnContractMode]').val().toLowerCase();
    if (modes == 'update') {
        var ddlContractStatus = $('[id*=ddlContractStatus] option:selected').text().trim().toLowerCase();
        if (ddlContractStatus == 'terminated') {
            $('.frmStatusFile input').attr('disabled', true).next().find('img').attr('disabled', true).css('opacity', '0.5')

            $('[id*=ddlAmendments]').attr('disabled', true);
        }
    }
}