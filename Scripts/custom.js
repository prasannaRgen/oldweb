
$(document).ready(function () { 


    ApplyScript();


});


function ApplyScript()
{


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


        if (frmName == "frmPI") {
            if ($('.frmNewPIDetails').is(':visible')) {
                $('.frmNewPIDetails').slideToggle("slow");
                $('.newPI').text('Record New PI Details');
            }
        }
    });

    $('.newPI').click(function () {
        var frmName = $(this).attr('data-frm');

        if ($(this).attr('type') == "addmore")
        {
            $('.frmPI').show();
            $('.newPI').text('Record New PI Details');
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
            } else {
                $('.newPI').text('Record New PI Details');
                $('.frmPI').show();
            }
        });




        

    });
    /*Script for Expand Collapse*/

    /*Date picker script*/
    $(".datepicker").datepicker({
        buttonText: datePickerTitle,
        showOn: "both",
        buttonImage: "../Images/icon-cal.png",
        buttonImageOnly: true,
        changeMonth: true,
        changeYear: true,
        prevText: "",
        nextText: "",
        disabled:false,
        dateFormat: 'dd-M-yy'

    });
    /*Date picker script*/

}

/*Add More PI*/



function AddMorePI() {

    $('.newPI').attr("type", 'addmore');
    var frmName = $(this).attr('data-frm');

    if ($('.frmPI').is(':visible')) {
        $('.frmPI').slideToggle("slow");
    }


    $('.frmAddMorePIDetails').slideToggle("slow", "swing", function () {
        if ($('.frmAddMorePIDetails').is(':visible')) {
            $('.newPI').text('Cancel Adding More PI');
        } else {
            $('.newPI').text('Record New PI Details');
        }
    });

}


