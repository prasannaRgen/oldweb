
$(document).ready(function () {
    ApplyScript();
});

function ApplyScript() {

        ApplyDatePicker();
        ApplyEvents();
        ApplyToggle();
        
}
function ApplyEvents() {
    
    $("[id*=chkCategory]").click(function () {

        SetChkFilterforALLkWithCount(this, $("[id*=txtCategory]").attr("id"));
        $("[id*=hidCategory]").val($("[id*=txtCategory]").val());
    });

    $("[id*=chkDept]").click(function () {

        SetChkFilterforALLkWithCount(this, $("[id*=txtDept]").attr("id"));
        $("[id*=hidDept]").val($("[id*=txtDept]").val());
    });

    $("[id*=chkType]").click(function () {

        SetChkFilterforALLkWithCount(this, $("[id*=txtType]").attr("id"));
        $("[id*=hidType]").val($("[id*=txtType]").val());
    });

    $("[id*=chkPI]").click(function () {

        SetChkFilterforALLkWithCount(this, $("[id*=txtPI]").attr("id"));
        $("[id*=hidPI]").val($("[id*=txtPI]").val());
    });
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

function ApplyToggle() {
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
    });
}

function validate() {
    if ($("[id*=txtStartDate]").val() == '') { MessageBox('Please Enter Start Date'); return false; }
    if ($("[id*=txtEndDate]").val() == '') { MessageBox('Please Enter End Date'); return false; }
    if ($("[id*=txtStartDate]").val() > $("[id*=txtEndDate]").val()) { MessageBox('End Date must not be smaller than Start Date'); return false; }
    if ($("[id*=chkCategory] input:checked").length == 0) { MessageBox('Please Select Category'); return false; }
    if ($("[id*=chkType] input:checked").length == 0) { MessageBox('Please Select Type'); return false; }
    if ($("[id*=chkDept] input:checked").length == 0) { MessageBox('Please Select Department'); return false; }
    if ($("[id*=chkPI] input:checked").length == 0) { MessageBox('Please Select PI Names'); return false; }
}