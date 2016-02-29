$(document).ready(function () {
    
    ApplyDOScript();
    //validateDOobjects();
});

function ApplyDOScript() {

    ApplyDOEvents();

}


function validateDOobjects() {
    
    //$('input[id$="btnSave"]').click(function () {
       
        

        if ($("[id*=HdnMode]").val().trim().toLowerCase() != "delete") {
            if ($('select[id$="ddlDO_Ethics"]').prop("disabled") == false && $('select[id$="ddlDO_Ethics"]').val() == "0") {
                MessageBox('Please Select Ethics Project Data Owner'); $('select[id$="ddlDO_Ethics"]').focus(); return false;
            }
            if ($('select[id$="ddlDO_Feasibility"]').prop("disabled") == false && $('select[id$="ddlDO_Feasibility"]').val() == "0") {
                MessageBox('Please Select Feasibility Project Data Owner'); $('select[id$="ddlDO_Feasibility"]').focus(); return false;
            }
            if ($('select[id$="ddlDO_Selected"]').prop("disabled") == false && $('select[id$="ddlDO_Selected"]').val() == "0") {
                MessageBox('Please Select Selected Project Data Owner'); $('select[id$="ddlDO_Selected"]').focus(); return false;
            }
            if ($('select[id$="ddlDO_Contract"]').prop("disabled") == false && $('select[id$="ddlDO_Contract"]').val() == "0") {
                MessageBox('Please Select Contract Project Data Owner'); $('select[id$="ddlDO_Contract"]').focus(); return false;
            }
            if ($('select[id$="ddlDO_Regulatory"]').prop("disabled") == false && $('select[id$="ddlDO_Regulatory"]').val() == "0") {
                MessageBox('Please Select Regulatory Project Data Owner'); $('select[id$="ddlDO_Regulatory"]').focus(); return false;
            }
            if ($('select[id$="ddlDO_Grant"]').prop("disabled") == false && $('select[id$="ddlDO_Grant"]').val() == "0") {
                MessageBox('Please Select Grant Project Data Owner'); $('select[id$="ddlDO_Grant"]').focus(); return false;
            }
            return true;
        }
   // });
}

function ApplyDOEvents() {
    $('select[id$="ddlEthicsNeeded"]').change(function () {/*Ethics*/
        if ($('select[id$="ddlEthicsNeeded"]').val() == "1") {
            $('select[id$="ddlDO_Ethics"]').prop("disabled", false);

            if ($('select[id$="ddlDO_Ethics"]').siblings("label").html().indexOf('*') == -1) {
                $('select[id$="ddlDO_Ethics"]').siblings("label").append("<b> *</b>")
            }
        }
        else {
            $('select[id$="ddlDO_Ethics"]').val("0");
            $('select[id$="ddlDO_Ethics"]').prop("disabled", true);

            $('select[id$="ddlDO_Ethics"]').siblings("label").find('b').remove();
        }
    });
    
    $('select[id$="ddlProjCategory"]').change(function () {/*Contract*/
        if ($('select[id$="ddlCollbrationInv"]').val() == "1") {
            $('select[id$="ddlDO_Contract"]').prop("disabled", false);

            if ($('select[id$="ddlDO_Contract"]').siblings("label").html().indexOf('*') == -1) {
                $('select[id$="ddlDO_Contract"]').siblings("label").append("<b> *</b>")
            }

        }
        else {
            $('select[id$="ddlDO_Contract"]').val("0");
            $('select[id$="ddlDO_Contract"]').prop("disabled", true);

            $('select[id$="ddlDO_Contract"]').siblings("label").find('b').remove();
        }
    });

        $('select[id$="ddlselectedproject"]').change(function () {/*Selected Project*/
            if ($('select[id$="ddlselectedproject"]').val() == "1") {
            $('select[id$="ddlDO_Selected"]').prop("disabled", false);
            if ($('select[id$="ddlDO_Selected"]').siblings("label").html().indexOf('*') == -1)
            {
                $('select[id$="ddlDO_Selected"]').siblings("label").append("<b> *</b>")
            }
        }
        else {
            $('select[id$="ddlDO_Selected"]').val("0");
            $('select[id$="ddlDO_Selected"]').prop("disabled", true);
            $('select[id$="ddlDO_Selected"]').siblings("label").find('b').remove();
        }
    });

    $('select[id$="ddlFeasibilityStatus"]').change(function () {/*feasibility*/
        if ($('select[id$="ddlFeasibilityStatus"]').val() == "1" || $('select[id$="ddlFeasibilityStatus"]').val() == "2") {
            $('select[id$="ddlDO_Feasibility"]').prop("disabled", false);

            if ($('select[id$="ddlDO_Feasibility"]').siblings("label").html().indexOf('*') == -1) {
                $('select[id$="ddlDO_Feasibility"]').siblings("label").append("<b> *</b>")
            }

        }
        else {
            $('select[id$="ddlDO_Feasibility"]').val("0");
            $('select[id$="ddlDO_Feasibility"]').prop("disabled", true);

            $('select[id$="ddlDO_Feasibility"]').siblings("label").find('b').remove();
        }
    });

    $('select[id$="ddlProjCategory"]').change(function () {/*regulatory*/
        if ($('select[id$="ddlProjCategory"]').val() == "2" && $('select[id$="ddlProjType"]').val() == "1") {
            $('select[id$="ddlDO_Regulatory"]').prop("disabled", false);

            if ($('select[id$="ddlDO_Regulatory"]').siblings("label").html().indexOf('*') == -1) {
                $('select[id$="ddlDO_Regulatory"]').siblings("label").append("<b> *</b>")
            }

        }
        else {
            $('select[id$="ddlDO_Regulatory"]').val("0");
            $('select[id$="ddlDO_Regulatory"]').prop("disabled", true);

            $('select[id$="ddlDO_Regulatory"]').siblings("label").find('b').remove();
        }

        //-----------Added by Atul
        if ($('select[id$="ddlCollbrationInv"]').val() == "1") {
            $('select[id$="ddlDO_Contract"]').prop("disabled", false);

            if ($('select[id$="ddlDO_Contract"]').siblings("label").html().indexOf('*') == -1) {
                $('select[id$="ddlDO_Contract"]').siblings("label").append("<b> *</b>")
            }

        }
        else {
            $('select[id$="ddlDO_Contract"]').val("0");
            $('select[id$="ddlDO_Contract"]').prop("disabled", true);

            $('select[id$="ddlDO_Contract"]').siblings("label").find('b').remove();
        }
        //---------- END
    });

    $('select[id$="ddlProjType"]').change(function () {/*regulatory*/
        if ($('select[id$="ddlProjCategory"]').val() == "2" && $('select[id$="ddlProjType"]').val() == "1") {
            $('select[id$="ddlDO_Regulatory"]').prop("disabled", false);

            if ($('select[id$="ddlDO_Regulatory"]').siblings("label").html().indexOf('*') == -1) {
                $('select[id$="ddlDO_Regulatory"]').siblings("label").append("<b> *</b>")
            }

        }
        else {
            $('select[id$="ddlDO_Regulatory"]').val("0");
            $('select[id$="ddlDO_Regulatory"]').prop("disabled", true);

            $('select[id$="ddlDO_Regulatory"]').siblings("label").find('b').remove();
        }

        //-----------Added by Atul
        if ($('select[id$="ddlCollbrationInv"]').val() == "1") {
            $('select[id$="ddlDO_Contract"]').prop("disabled", false);

            if ($('select[id$="ddlDO_Contract"]').siblings("label").html().indexOf('*') == -1) {
                $('select[id$="ddlDO_Contract"]').siblings("label").append("<b> *</b>")
            }

        }
        else {
            $('select[id$="ddlDO_Contract"]').val("0");
            $('select[id$="ddlDO_Contract"]').prop("disabled", true);

            $('select[id$="ddlDO_Contract"]').siblings("label").find('b').remove();
        }
        //---------- END
    });

    $('select[id$="ddlProjCategory"]').change(function () {/*Grant*/
        if ($('select[id$="ddlProjCategory"]').val() == "2" && $('select[id$="ddlfundingReq"]').val() == "1" && $('select[id$="ddlstartbyTTSH"]').val() == "1") {
            $('select[id$="ddlDO_Grant"]').prop("disabled", false);

            if ($('select[id$="ddlDO_Grant"]').siblings("label").html().indexOf('*') == -1) {
                $('select[id$="ddlDO_Grant"]').siblings("label").append("<b> *</b>")
            }

        }
        else {
            $('select[id$="ddlDO_Grant"]').val("0");
            $('select[id$="ddlDO_Grant"]').prop("disabled", true);

            $('select[id$="ddlDO_Grant"]').siblings("label").find('b').remove();
        }

        //-----------Added by Atul
        if ($('select[id$="ddlCollbrationInv"]').val() == "1") {
            $('select[id$="ddlDO_Contract"]').prop("disabled", false);

            if ($('select[id$="ddlDO_Contract"]').siblings("label").html().indexOf('*') == -1) {
                $('select[id$="ddlDO_Contract"]').siblings("label").append("<b> *</b>")
            }

        }
        else {
            $('select[id$="ddlDO_Contract"]').val("0");
            $('select[id$="ddlDO_Contract"]').prop("disabled", true);

            $('select[id$="ddlDO_Contract"]').siblings("label").find('b').remove();
        }
        //---------- END
    });

    $('select[id$="ddlstartbyTTSH"]').change(function () {/*Grant*/
        if ($('select[id$="ddlProjCategory"]').val() == "2" && $('select[id$="ddlfundingReq"]').val() == "1" && $('select[id$="ddlstartbyTTSH"]').val() == "1") {
            $('select[id$="ddlDO_Grant"]').prop("disabled", false);

            if ($('select[id$="ddlDO_Grant"]').siblings("label").html().indexOf('*') == -1) {
                $('select[id$="ddlDO_Grant"]').siblings("label").append("<b> *</b>")
            }
        }
        else {
            $('select[id$="ddlDO_Grant"]').val("0");
            $('select[id$="ddlDO_Grant"]').prop("disabled", true);

            $('select[id$="ddlDO_Grant"]').siblings("label").find('b').remove();
        }
    });

    $('select[id$="ddlfundingReq"]').change(function () {/*Grant*/
        if ($('select[id$="ddlProjCategory"]').val() == "2" && $('select[id$="ddlfundingReq"]').val() == "1" && $('select[id$="ddlstartbyTTSH"]').val() == "1") {
            $('select[id$="ddlDO_Grant"]').prop("disabled", false);

            if ($('select[id$="ddlDO_Grant"]').siblings("label").html().indexOf('*') == -1) {
                $('select[id$="ddlDO_Grant"]').siblings("label").append("<b> *</b>")
            }

        }
        else {
            $('select[id$="ddlDO_Grant"]').val("0");
            $('select[id$="ddlDO_Grant"]').prop("disabled", true);

            $('select[id$="ddlDO_Grant"]').siblings("label").find('b').remove();
        }
    });

    $('select[id$="ddlCollbrationInv"]').change(function () {/*Contract*/
        if ($('select[id$="ddlCollbrationInv"]').val() == "1") {
            $('select[id$="ddlDO_Contract"]').prop("disabled", false);

            if ($('select[id$="ddlDO_Contract"]').siblings("label").html().indexOf('*') == -1) {
                $('select[id$="ddlDO_Contract"]').siblings("label").append("<b> *</b>")
            }

        }
        else {
            $('select[id$="ddlDO_Contract"]').val("0");
            $('select[id$="ddlDO_Contract"]').prop("disabled", true);

            $('select[id$="ddlDO_Contract"]').siblings("label").find('b').remove();
        }
    });

}

