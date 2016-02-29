/// <reference path="../EthicDetails.aspx" />
/// <reference path="../EthicDetails.aspx" />

$(document).ready(function () {


    ApplyScript();


});


function ApplyScript() {

    
    /*Script for Add Remove Column*/
    AddRemoveFileds();

    /*Script for Add Remove Column*/

 
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


function ApplyAutoComplete() {


    var TxtNewDepartment = $("[id*=TxtNewDepartment]").attr("id"); //document.getElementById('<%=TxtNewDepartment.ClientID%>');
    var HdnNewDeptId = $("[id*=HdnNewDeptId]").attr("id");//document.getElementById('<%=HdnNewDeptId.ClientID%>');

    var TxtDepartment = $("[id*=TxtDepartment]").attr("id"); //document.getElementById('<%=TxtDepartment.ClientID%>');
    var HdnDeptId = $("[id*=HdnDeptId]").attr("id"); //document.getElementById('<%=HdnDeptId.ClientID%>');

    SearchText(TxtNewDepartment, HdnNewDeptId, 10, "Department~spAutoComplete", "EthicDetails");
    SearchText(TxtDepartment, HdnDeptId, 10, "Department~spAutoComplete", "EthicDetails", FillPi);

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
    SearchText(TxtPIName, HdnpiId, 10, "FillPi~spAutoComplete~" + DeptId, "EthicDetails", fillPiDetails);
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
    if (!validate(".frmDetails")) { return false; }
    if (!validate(".frmIRB")) { return false; }
    if (!validate(".frmSub")) { return false; }
    if (!validate(".frmtrial")) { return false; }
    if (!validate(".frmcrio")) { return false; }
    if (!validate(".frmother")) { return false; }

    if ($("[id*=fuIRBFile]").attr("disabled") != "disabled" && !($("[id*=hdnIRBFile]").val() != "" || $("[id*=fuIRBFile]").val() != "")) {
        MessageBox("Please provide DSRB/IRB file");
        return false;
    }
    if ($("[id*=fuInsuranceFile]").attr("disabled") != "disabled" && !($("[id*=hdnInsuranceFile]").val() != "" || $("[id*=fuInsuranceFile]").val() != "")) {
        MessageBox("Please provide Clinical trial Insurance file");
        return false;
    }

    CollectPiIDs();
    RemoveDisable();

    return true;
}

function SaveClick() {

    if (!validate(".frmDetails")) { return false; }
    if (!validate(".frmIRB")) { return false; }
    if (!validate(".frmSub")) { return false; }
    if (!validate(".frmtrial")) { return false; }
    if (!validate(".frmcrio")) { return false; }
    if (!validate(".frmother")) { return false; }

    if ($("[id*=fuIRBFile]").attr("disabled") != "disabled" && !($("[id*=hdnIRBFile]").val() != "" || $("[id*=fuIRBFile]").val() != "")) {
        MessageBox("Please provide DSRB/IRB file");
        return false;
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


function ApplyPaging(tableName, pagingDivId, rowsShown) {

    //Set the filter first column (ID) 
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

    $("#" + pagingDivId + " .page-info p a").eq(0).click(function () {
        $("#" + pagingDivId + " .pages a:first-child").click();
    });

    $("#" + pagingDivId + " .page-info p a").eq(1).click(function () {
        $("#" + pagingDivId + " .pages a:last-child").click();
    });

    if (rowsTotal <= rowsShown) {
        $(".page-info .link").css("color", "grey").attr("disabled", true);

        $("#" + pagingDivId + " p").css("display", "none");
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

function ClearNewPi() {
    $(".frmNewPIDetails input[type=text]").val("");
    //$(".newPI").click();

}
function AddRemoveFileds()
{
    $('#btnAdd').click(function () {
       
        $('#MainContent_listSelectFrom option:selected').each(function () {
            $('#MainContent_listSelectTo').append('<option "' + $(this).val() + '">' + $(this).text() + '</option>');
            $(this).remove();
        });
    });
    $('#btnRemove').click(function () {
        $('#MainContent_listSelectTo option:selected').each(function () {
            $('#MainContent_listSelectFrom').append('<option "' + $(this).val() + '">' + $(this).text() + '</option>');
            $(this).remove();
        });
    });
}





