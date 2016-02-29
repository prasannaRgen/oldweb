"use strict"

$(function () {
    SetCDate();
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

        if ($('.frmNewPIDetails').is(":visible")) {
            $('.frmNewPIDetails').slideToggle("slow").hide();
            $('.newPI').text('Record New Collaborator Details');
            $('.newPI').prev("span").text("+");
        }

        if ($('.frmAddMorePIDetails').is(':visible')) {
            $('.newPI').attr('type', '');
            $('.frmAddMorePIDetails').slideToggle("slow").hide();
            $('.newPI').text('Record New Collaborator Details');
            $('.newPI').prev("span").text("+");
        }


    });

    $('.newPI').click(function () {
        var frmName = $(this).attr('data-frm');

        if ($(this).attr('type') == "addmore") {
            $('.frmPI').show();
            $('.newPI').text('Record New Collaborator Details');
            ClearCloseMoreCollabortorControls();
            $('.frmAddMorePIDetails').slideToggle("slow").hide();
            $('.newPI').prev("span").text("+");

            $(this).attr('type', '');
            return;
        }

        if ($('.frmPI').is(':visible')) {
            $('.frmPI').slideToggle("slow");
        }


        $('.frmNewPIDetails').slideToggle("slow", "swing", function () {
            if ($('.frmNewPIDetails').is(':visible')) {
                $('.newPI').text('Cancel Recording New Collaborator Details');
                $('.newPI').prev("span").text("-");
            } else {
                $('.newPI').text('Record New Collaborator Details');

                ClearCloseNewCollaboratorControls();
                $('.newPI').prev("span").text("+");
                $('.frmPI').show();
            }
        });
    });

    //MakeStaticHeader('tblCollaboratorDetail', 250, 1119, 40, false);

});
function AddMorePI() {

    $('.newPI').attr("type", 'addmore');
    var frmName = $(this).attr('data-frm');

    if ($('.frmPI').is(':visible')) {
        $('.frmPI').slideToggle("slow");
    }


    $('.frmAddMorePIDetails').slideToggle("slow", "swing", function () {
        if ($('.frmAddMorePIDetails').is(':visible')) {
            $('.newPI').text('Cancel Adding New Collaborator');

            $('.newPI').prev("span").text("-");

        } else {
            $('.newPI').text('Record New Collaborator Details');

            $('.newPI').prev("span").text("+");
        }
    });

}
function FillCollaboratorDetail(ID, TxtEmailAdd1, TxtEmailAdd2, TxtInstitution, TxtPhNo, TxtCountry) {

    TxtEmailAdd1 = document.getElementById(TxtEmailAdd1);
    TxtEmailAdd2 = document.getElementById(TxtEmailAdd2);
    TxtInstitution = document.getElementById(TxtInstitution);
    TxtPhNo = document.getElementById(TxtPhNo);
    TxtCountry = document.getElementById(TxtCountry);

    var ID = (ID != null) ? ID : 0;

    if (parseInt(ID) > 0) {
        $.ajax({
            cache: false,
            async: true,
            type: "POST",
            dataType: "json",
            timeout: 1000,
            url: "../PageMethods.aspx/GetCollobrator_MasterDetailByID",
            data: '{ "ID": "' + ID + '" }',
            contentType: "application/json;charset=utf-8;",
            success: function (r) {
                var customers = eval(r.d);
                if (customers.length > 0) {
                    TxtEmailAdd1.value = customers[0].s_Email1;
                    TxtEmailAdd2.value = customers[0].s_Email2;
                    TxtInstitution.value = customers[0].s_Institution;
                    TxtPhNo.value = customers[0].s_PhoNo;
                    TxtCountry.value = customers[0].Country_Name;
                }
              
            },
            error: function (e) { MessageBox(e.statusText); }
        });
    }
    else {
        TxtEmailAdd1.value = "";
        TxtEmailAdd2.value = "";
        TxtInstitution.value = "";
        TxtPhNo.value = "";
        TxtCountry.value = "";
    }
}

function ClearCloseMoreCollabortorControls() {

    $("[id*=TxtMCollaborator]").val('');
    $("[id*=TxtMInstitution]").val('');
    $("[id*=TxtMPhNo]").val('');
    $("[id*=TxtContractId]").val('');
    $("[id*=TxtMEmailAdd1]").val('');
    $("[id*=TxtMEmailAdd2]").val('');
    $("[id*=TxtMCountry]").val('');
    $("[id*=TxtContractReqDate]").val(GetDate('-'));
    return false;
}

function ClearCloseNewCollaboratorControls() {

    $("[id*=TxtNCollabator]").val('');
    $("[id*=TxtNEmail1]").val('');
    $("[id*=TxtNInstitution]").val('');
    $("[id*=TxtNCountry]").val('');
    $("[id*=TxtNEmail2]").val('');
    $("[id*=TxtNPhNo]").val('');

    CallAutocomplete();
    return false;
}




function DisableMoreCollaboratorControls(TxtMInstitution, TxtMPhNo, TxtMEmailAdd1, TxtMEmailAdd2, TxtMCountry) {

    TxtMInstitution = document.getElementById(TxtMInstitution);
    TxtMPhNo = document.getElementById(TxtMPhNo);
    TxtMEmailAdd1 = document.getElementById(TxtMEmailAdd1);
    TxtMEmailAdd2 = document.getElementById(TxtMEmailAdd2);
    TxtMCountry = document.getElementById(TxtMCountry);
    TxtMInstitution.disabled = true;
    TxtMPhNo.disabled = true;
    TxtMEmailAdd1.disabled = true;
    TxtMEmailAdd2.disabled = true;
    TxtMCountry.disabled = true;


}

function DisableProjectControls(TxtProjTitle, TxtAlias1, TxtShortTitle, TxtprojCategory, TxtAlias2, TxtIrbNo) {
    TxtProjTitle = document.getElementById(TxtProjTitle);
    TxtAlias1 = document.getElementById(TxtAlias1);
    TxtShortTitle = document.getElementById(TxtShortTitle);
    TxtprojCategory = document.getElementById(TxtprojCategory);
    TxtAlias2 = document.getElementById(TxtAlias2);
    TxtIrbNo = document.getElementById(TxtIrbNo);
    TxtProjTitle.disabled = true;
    TxtprojCategory.disabled = true;
}

$(function () {
    ApplyPaging('tblResposive', 'Paging', 10);
    $('#tblResposive').tablesorter();


    if ($("#tblResposive tbody tr").length == 0) {
        $('[id*=MainContent_SearchBox_txtSearch]').val('');
        $("#tblResposive tbody").html("<tr><td colspan='7' > No Records Available <td></tr>");
        $("#projectPaging").hide();
        $("#tblResposive thead th").css("background-image", "none");
        $("#tblResposive thead th").unbind("click");



    }
    if ($("#tblCollaboratorDetail tbody tr").length == 0) {

        $("#tblCollaboratorDetail tbody").html("<tr><td colspan='6' > No Records Available <td></tr>");
        $("#projectPaging").hide();
        $("#tblCollaboratorDetail thead th").css("background-image", "none");
        $("#tblCollaboratorDetail thead th").unbind("click");

    }
    var pagingInterval = setInterval(function () {

        if ($(".header").length > 0) {
            ReApplyPaging('tblResposive');
            clearInterval(pagingInterval);
        }
    }, 100);

});

//-----------------------------------------------------Start-------------------------------------------
function SaveMoreCollabortor(TxtMCollaborator, HdnMCollaboratorId, TxtMInstitution, TxtMPhNo, TxtContractId, TxtMEmailAdd1, TxtMEmailAdd2, TxtMCountry, TxtContractReqDate) {
    TxtMCollaborator = document.getElementById(TxtMCollaborator);
    TxtMInstitution = document.getElementById(TxtMInstitution);
    TxtMPhNo = document.getElementById(TxtMPhNo);
    TxtContractId = document.getElementById(TxtContractId);
    TxtMEmailAdd1 = document.getElementById(TxtMEmailAdd1);
    TxtMEmailAdd2 = document.getElementById(TxtMEmailAdd2);
    TxtMCountry = document.getElementById(TxtMCountry);
    TxtContractReqDate = document.getElementById(TxtContractReqDate);
    HdnMCollaboratorId = document.getElementById(HdnMCollaboratorId);
    var colaboratorId = $("[id*=HdnMCollaboratorId]");
    //var TxtContractId = $("[id*=TxtContractId]");
    if (TxtMCollaborator.value.trim() == "") {
        MessageBox("Please Select Collaborator");
        TxtMCollaborator.focus();
        return false;
    }
    if (colaboratorId.val().trim() == "") {
        MessageBox("Please Select Collaborator Search Result");
        TxtMCollaborator.focus();
        return false;
    }

    //if (TxtMInstitution.value.trim() == "") {
    //	MessageBox("Please Enter Institution");
    //	TxtMInstitution.focus();
    //	return false;
    //}
    //if (TxtContractId.val().trim()=="") {
    //	MessageBox("Please Enter Contract Id");
    //	TxtContractId.focus();
    //	return false;
    //}
    if (TxtContractReqDate.value.trim() == "") {
        MessageBox("Please Select Proper Request Date");
        TxtContractReqDate.focus();
        return false;
    }


    $("#tblCollaboratorDetail tbody tr td:contains('No Records Available')").each(function () {
        $("#tblCollaboratorDetail tbody tr").remove();
    });

    var flag = true;
    $("#tblCollaboratorDetail tbody tr").each(function () {

        if ($(this).attr("ColaborId").replace("^", "") == HdnMCollaboratorId.value) {
            MessageBox("Collaborator already added");
            flag = false;
        }
    });
    if (!flag) {
        return false;
    }


    var table = '<tr ColaborId=' + HdnMCollaboratorId.value + '^ iniContractId=' + TxtContractId.value + '^ ContractReqDate=' + TxtContractReqDate.value + '  >' +
				'<td style="width: 200px"><p>' + TxtMCollaborator.value + '</p></td>' +
				'<td><p>' + TxtMEmailAdd1.value + '</p></td>' +
				  '<td><p>' + TxtMPhNo.value + '</p></td>' +
				'<td style="width: 150px"><p>' + TxtMInstitution.value + '</p></td>' +

				'<td><p>' + TxtMCountry.value + '</p></td>' +

				//'<td><p>' + TxtMEmailAdd2.value + '</p></td>' +
				//'<td><p>' + TxtContractId.value + '</p></td>' +
				'<td><p>' + TxtContractReqDate.value + '</p></td>'
    table += '<td style="width: 45px;"><p  class="grid-action"><a><img title="Delete Collaborator Details" alt="" onclick="return delCollaboratorRows(this);" src="../Images/icon-delete.png"></a></p></td></tr>'
    $('#tblCollaboratorDetail  tbody').append(table);

    MessageBox('Collaborator added Successfully..!!')
    $('.frmAddMorePIDetails').slideToggle("slow", "swing", function () {
        if ($('.frmAddMorePIDetails').is(':visible')) {
            $('.newPI').text('Cancel Addind New Collaborator');

        } else {
            $('.newPI').text('Record New Collaborator Details');
            $('.newPI').prev("span").text("+");
            TxtMCollaborator.value = "";
            TxtMCollaborator.value = "";
            TxtMInstitution.value = "";
            TxtMPhNo.value = "";
            TxtContractId.value = "";
            TxtMEmailAdd1.value = "";
            TxtMEmailAdd2.value = "";
            TxtMCountry.value = "";
            TxtContractReqDate.value = GetDate('-');
            $('.newPI').attr('type', '');
            $('.frmPI').show();
        }
    });
    return false;

}
function delCollaboratorRows(Obj) {

    var id = "";
    var mode = $("[id*=HdnMode]");
    if (mode.val().toLowerCase() == 'insert') {
        if ($(Obj).parents("tbody").find("tr").length >= 1) {


            if ($(Obj).parent().parent().parent().parent().attr('ColaborId') == undefined) {
                id = $(Obj).parent().parent().parent().attr('ColaborId').replace("^", "")
            }
            else {
                id = $(Obj).parent().parent().parent().parent().attr('ColaborId').replace("^", "")
            }





            return ConfirmBox('Are you sure to Delete this Record..??', "$('#tblCollaboratorDetail  tbody tr[ColaborId^=" + id + "]').remove();CallNorecord();");
        }
    }
    if (mode.val().toLowerCase() == 'update') {
        var CollabId = $(Obj).parent().parent().attr('Id');
        if (CollabId == 0 || CollabId == undefined) {
            if (mode.val().trim().toLowerCase() == "update") {
                if ($(Obj).parents("tbody").find("tr").length == 1) {
                    MessageBox("There should be at least one Colalborator  Required.");
                    return false;
                }
            }
            if ($(Obj).parents("tbody").find("tr").length >= 1) {


                if ($(Obj).parent().parent().parent().parent().attr('ColaborId') == undefined) {
                    id = $(Obj).parent().parent().parent().attr('ColaborId').replace("^", "")
                }
                else {
                    id = $(Obj).parent().parent().parent().parent().attr('ColaborId').replace("^", "")
                }





                return ConfirmBox('Are you sure to Delete this Record..??', "$('#tblCollaboratorDetail  tbody tr[ColaborId^=" + id + "]').remove();CallNorecord();");
            }
        }
        else {
            MessageBox("Contract Created with this Colalborator Cannot be Deleted");
            return false;
        }
    }





    return true;
}
//-----------------------------------------------------------------------------End------------------------------------

function CallNorecord() {
    if ($("#tblCollaboratorDetail tbody tr").length == 0) {

        $("#tblCollaboratorDetail tbody").html("<tr><td colspan='6' > No Records Available <td></tr>");
        $("#projectPaging").hide();
        $("#tblCollaboratorDetail thead th").css("background-image", "none");
        $("#tblCollaboratorDetail thead th").unbind("click");

    }
}

function IsValidate(HdnMode, HdnProject_Id, HdnContract_Collaborator_Details, DdlReviewedBy, TxtContAssignDate, HdnContractReqDate) {
    HdnMode = document.getElementById(HdnMode);
    HdnProject_Id = document.getElementById(HdnProject_Id);
    HdnContract_Collaborator_Details = document.getElementById(HdnContract_Collaborator_Details);
    DdlReviewedBy = document.getElementById(DdlReviewedBy);
    TxtContAssignDate = document.getElementById(TxtContAssignDate);
    HdnContractReqDate = document.getElementById(HdnContractReqDate);
    if (HdnMode.value.toString().toLowerCase() != 'delete') {
        var id = (HdnProject_Id.value.trim() == "") ? 0 : parseInt(HdnProject_Id.value);
        if (id <= 0) {
            MessageBox("Project Details Required");
            return false;
        }
        if ($("#tblCollaboratorDetail tbody tr td").html().toLowerCase().trim().replace(/ +/g, "") == "norecordsavailable") {
            MessageBox("Enter Atleast one Collaborator Details"); return false;
        };
        HdnContract_Collaborator_Details.value = "";
        var dates = new Array();
        $('#tblCollaboratorDetail  tbody tr').each(function (index, item) {
            HdnContract_Collaborator_Details.value += $(item).attr('ColaborId') + ',' + $(item).attr('iniContractId') + ',' + $(item).attr('ContractReqDate') + '|';
            dates.push($(item).attr('ContractReqDate').replace("^", ""));
        });


        if (HdnContract_Collaborator_Details.value.trim() == "") {
            MessageBox("Enter Atleast one Collaborator Details"); return false;
        }
        if (DdlReviewedBy.selectedIndex <= 0) {
            MessageBox("Please select Reviewed By"); DdlReviewedBy.focus(); return false;
        }



        if (TxtContAssignDate.value.trim() == "") {
            MessageBox("Please Select Assign Date");
            TxtContAssignDate.focus();
            return false;
        }

        var lDate = GetMaxDate(dates);
        var mDate = ConvertDatetoMDY(TxtContAssignDate.value);
        if (ComDateWithEqual(mDate, lDate)) {
            MessageBox("Contract Assign Date should be Greater than or Equal to  Contract Request Date");
            return false;
        }
    }

    return true;
}


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

///***************END*******************************

function SetCDate() {
    $('.datepicker.Req').val(GetDate('-'));
    
}