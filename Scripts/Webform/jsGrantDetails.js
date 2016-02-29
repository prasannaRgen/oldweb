"use Strict;"

//*********************** Page Load Event *************************
$(function () {
    ApplyScript();
    CallAutocomplete();
    ClearPiDetails();
    PagingGrantDetail();
    SetNoRecord();
});

//************************* END **********************************




//**********************  Toggle and Load Fucntion***********************
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



        //------------------For Top head click hide add or more region
        if (frmName == "frmPI") {

            if ($('.frmAddMorePIDetails').is(':visible')) {
                $('.newPI').text('Record New PI Details');
                ClearCloseNewPiSection();
                $('.newPI').attr('type', '');
                $('.frmAddMorePIDetails').slideToggle("slow");
                $('.newPI').prev("span").text("+");

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
//************************* END *******************************************


//********************* Other Function*************************************
function ClearCloseMorePiSection() {

    $("[id*=TxtDepartment]").val(''); $("[id*=TxtDepartment]").focus();
    $("[id*=TxtPIName]").val(''); $('[id*=HdnDeptId]').val('');
    $("[id*=txtPIEmail]").val('');
    $("[id*=txtPiPhoneNo]").val('');
    $("[id*=txtPiMCRNo]").val('');
    return false;
}

function ClearCloseNewPiSection() {
    CallAutocomplete();
    $("[id*=TxtNewDepartment]").val(''); $("[id*=TxtNewDepartment]").focus();
    $("[id*=txtPIEmailAddress]").val(''); $('[id*=HdnNewDeptId]').val('');
    $("[id*=txtPiPhNo]").val('');
    $("[id*=txtPiFirstName]").val('');
    $("[id*=txtPiLastName]").val('');
    $("[id*=txtPIMCR_NO]").val('');


    return false;
}

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


function ClearOnblur(obj) {
    var HdnDeptTxt = $('[id*=HdnDeptTxt]').val();
    if (obj.value.trim() != "") {
        if (HdnDeptTxt != "") {
            if (obj.value.toLowerCase() != HdnDeptTxt.toLowerCase()) {
                MessageBox("Please select Proper Department");
                items('');
                obj.value = "";
                $("[id*=HdnDeptId]").val('');
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

function ClearPiDetails() {
    $('[id*=TxtDepartment]').bind("mouseup", function (e) {
        var $input = $(this),
            oldValue = $input.val();

        if (oldValue == "") return;
        setTimeout(function () {
            var newValue = $input.val();

            if (newValue == "") {
                items('');
                $input.trigger("cleared");
            }
        }, 1);
    });

    $('[id*=TxtPIName]').bind("mouseup", function (e) {
        var $input = $(this),
            oldValue = $input.val();
        if (oldValue == "") return;
        setTimeout(function () {
            var newValue = $input.val();

            if (newValue == "") {
                items('');
                $input.trigger("cleared");
            }
        }, 1);
    });
}

function items(pi) {

    var TxtPIName = $('[id*=TxtPIName]').val().trim();
    var HdnPITxt = $('[id*=HdnPITxt]').val().trim();
    if (TxtPIName != HdnPITxt) {
        $("[id*=txtPIEmail]").val('');
        $("[id*=txtPiPhoneNo]").val('');
        if (pi == "") {
            $("[id*=TxtPIName]").val('');
        }
        $("[id*=HdnpiId]").val('');
        $("[id*=txtPiMCRNo]").val('');
    }
    else if (TxtPIName == '') {
        $("[id*=txtPIEmail]").val('');
        $("[id*=txtPiPhoneNo]").val('');
        if (pi == "") {
            $("[id*=TxtPIName]").val('');
        }
        $("[id*=HdnpiId]").val('');
        $("[id*=txtPiMCRNo]").val('');
    }
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

        $("#tblPiDetail tbody").html("<tr><td colspan='5' > No Records Available <td></tr>");
        $("#tblPiDetail thead th").css("background-image", "none");
        $("#tblPiDetail thead th").unbind("click");
    }

    
}

function PagingGrantDetail() {
    ApplyPaging('tblResposive', 'Paging', 10);
    $('#tblResposive').tablesorter();
    var pagingInterval = setInterval(function () {

        if ($(".header").length > 0) {
            ReApplyPaging('tblResposive');
            clearInterval(pagingInterval);
        }
    }, 100);

}

function ResetAll() {
    $('.frmDetails input[type=text]').val("");
    $('.frmSingleProject  select').val(-1);
    $('.frmSingleProject input[type=text]').val("");
    SetNoRecord();
}

function DoPostBack() {
    return true;
}
//********************* END*************************************************


//****************** Auto Complete *******************************************
function CallAutocomplete() {
    var TxtNewDepartment = $('[id*=TxtNewDepartment]').attr('id');
    var HdnNewDeptId = $('[id*=HdnNewDeptId]').attr('id');
    SearchText(TxtNewDepartment, HdnNewDeptId, 10, "Department~spAutoComplete");
    var TxtDepartment = $('[id*=TxtDepartment]').attr('id');
    var HdnDeptId = $('[id*=HdnDeptId]').attr('id');
    var HdnDeptTxt = $('[id*=HdnDeptTxt]').attr('id');
    SearchText(TxtDepartment, HdnDeptId, 10, "Department~spAutoComplete", FillPi, HdnDeptTxt);
}
//********************** END **************************************************