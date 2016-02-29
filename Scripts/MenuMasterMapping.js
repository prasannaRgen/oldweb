//$(document).ready(function () {
var count = 0;
var menuaccess = '';
function OnCheckBoxCheckChanged(evt) {
    var src = window.event != window.undefined ? window.event.srcElement : evt.target;
    var isChkBoxClick = (src.tagName.toLowerCase() == "input" && src.type == "checkbox");

    var x = $(src).closest('.user-access');
    //if (isChkBoxClick) {
        
        var y = x[0].children[0];
       y.children[0].checked = true;

    //}
    if (src.checked == false) {
        $('#' + getclientId('chkall')).attr('checked', false);
        y.children[0].checked = $(src).closest('.user-access').find('input[type=checkbox][class!=parentcheckbox]:checked').length >= 1;
       
    } else {
        var totalchecked;
        y.children[0].checked = true;
      
        totalchecked = $('input[type=checkbox]:checked').length;
        $('#' + getclientId('chkall')).attr('checked', $('input[type=checkbox]').length - 2 == totalchecked - 1);
    }
    }

function resetfields() {

    document.getElementById('ContentPlaceHolder1_ddlRoles').selectedIndex = 0;
    document.getElementById('ContentPlaceHolder1_ddlGroup').selectedIndex = 0;
    var treeView = document.getElementById("ContentPlaceHolder1_tvAccess");
    var checkBoxes = treeView.getElementsByTagName("input");

    for (var i = 0; i < checkBoxes.length; i++) {
        if (checkBoxes[i].checked) {
            checkBoxes[i].checked = false;
        }
    }


}

function CheckUncheckChildren(childContainer, check) {
    var childChkBoxes = childContainer.getElementsByTagName("input");
    var childChkBoxCount = childChkBoxes.length;

    for (var i = 0; i < childChkBoxCount; i++) {
        childChkBoxes[i].checked = check;
    }
}

function CheckUncheckParents(srcChild, check) {
    var parentDiv = GetParentByTagName("div", srcChild);
    var parentNodeTable = parentDiv.previousSibling;

    if (parentNodeTable) {
        var checkUncheckSwitch;

        if (check) //checkbox checked
        {
            var isAllSiblingsChecked = AreAllSiblingsChecked(srcChild);
            if (isAllSiblingsChecked)
                checkUncheckSwitch = true;
            else
                return; //do not need to check parent if any(one or more) child not checked
        }
        else //checkbox unchecked
        {
            //checkUncheckSwitch = false;
            var isAllSiblingsChecked = AreAllSiblingsChecked(srcChild);
            if (isAllSiblingsChecked)
                checkUncheckSwitch = true;
            else
                checkUncheckSwitch = false;
        }

        var inpElemsInParentTable = parentNodeTable.getElementsByTagName("input");
        if (inpElemsInParentTable.length > 0) {
            var parentNodeChkBox = inpElemsInParentTable[0];
            if (parentNodeChkBox.id != "MainContent_chkAll")
                parentNodeChkBox.checked = checkUncheckSwitch;
            //do the same recursively
            CheckUncheckParents(parentNodeChkBox, checkUncheckSwitch);
        }
    }
}

function AreAllSiblingsChecked(chkBox) {
    var parentDiv = GetParentByTagName("div", chkBox);
    var childCount = parentDiv.childNodes.length;
    var flag = false;
    for (var i = 0; i < childCount; i++) {
        if (parentDiv.childNodes[i].nodeType == 1) //check if the child node is an element node
        {
            if (parentDiv.childNodes[i].tagName.toLowerCase() == "table") {
                var prevChkBox = parentDiv.childNodes[i].getElementsByTagName("input")[0];
                //if any of sibling nodes are not checked, return false
                if (prevChkBox.checked) {
                    flag = true;
                }
            }
        }
    }
    return flag;
}

//utility function to get the container of an element by tagname
function GetParentByTagName(parentTagName, childElementObj) {
    var parent = childElementObj.parentNode;
    while (parent.tagName.toLowerCase() != parentTagName.toLowerCase()) {
        parent = parent.parentNode;
    }
    return parent;
}




function ValidateAccessrights() {
   
    var checkedCount = $('input[type=checkbox]:checked').length;
    if (checkedCount > 0) {
        return true;
    }
    else {
        MessageBox('Select Atleast One Access Right.');
        return false;
    }
}
function FinalValidation(sender, args) {
    try {
        var src = window.event != window.undefined ? window.event.srcElement : evt.target;
        if (src != null) {
            console.log(src.id);
            if (src.id == $('[id*=btnSave]').attr('id')) {
                if (!(dropdownvalidation($('[id*=ddlGroupName]').attr('id')))) {
                    return false;
                }
                if (ValidateAccessrights() == false) {
                    return false;
                }
                SetMenuAccessRights();
            }
           
            SetScroll();

            return true;
        }
    }
    catch (err) {
    }
}
function dropdownvalidation(x) {
    try {
        if ($('#' + x + ' option:selected').val() > 0)
            return true;
        else {
            MessageBox('Select Group.');
            $('#' + x + ' option:selected').focus();
            return false;
        }
    }
    catch (err) {
        MessageBox('Select Group.');
        $('#' + x + ' option:selected').focus();
        return false;
    }
}
function BindParentCheck(parentChk) {
   
    if ($(parentChk).is(':checked')) {
        var totalchecked;
        $(parentChk).closest('.user-access').find('input[type=checkbox]').attr('checked', true);
        totalchecked = $('input[type=checkbox]:checked').length;
        $('#' + getclientId('chkall')).attr('checked', $('input[type=checkbox]').length - 2 == totalchecked - 1);
    }
    else {
        $(parentChk).closest('.user-access').find('input[type=checkbox]').attr('checked', false);
        $('#' + getclientId('chkall')).attr('checked', false);
    }

    
}
function SetMenuAccessRights() {
    count = 0; menuaccess = '';
    var sep = '';
    $('.user-access input[type=checkbox]').each(function () {

        if ($(this).is(":checked")) {
            count++;
            menuaccess += sep + $(this).attr("value");
            sep = ",";
        }

    });
    $('#' + getclientId('HidMenuAccess')).val('');
    $('#' + getclientId('HidMenuAccess')).val(menuaccess);
    console.log(count);
    console.log(menuaccess);
}
//Get Client Id Of The Asp Control
function getclientId(controlid) {
    return $('[id$=' + controlid + ']').attr('id');
}
function CheckUncheckAll() {
    $('input[type=checkbox]').attr('checked', $('#' + getclientId('chkall')).is(':checked'));
    $('.user-access:first').find('input:checkbox').attr('checked', true);
    return false;
}
function SetScroll() {
    $(".user-access").each(function (index, item) {
        if ($(".user-access")[index].offsetHeight < $(".user-access")[index].scrollHeight) {
      //      console.log('Over Flow Occurs');
            var h3style = $('.user-access h3')[index];
            h3style.style.width = "88%";
        }

    });

}
//To Check The CheckBoxes & Disabled The Dashboard div
function DisableDashBoard() {
    try{
        //var dashboard = $(".user-access:contains('Dashboard'):first");//$(".user-access")[0];
        //$(dashboard).find("input:checkbox").attr('checked', true);
        //$(dashboard).find('input:checkbox').attr('disabled', true);
        $(".user-access").each(function (index, item) {
            var divaccess = $(".user-access")[index];
            if($(divaccess).text().toLowerCase().indexOf("dashboard")>-1){
                $(divaccess).find("input:checkbox").attr('checked', true);
                $(divaccess).find('input:checkbox').attr('disabled', true);
            }
        });
    }
    catch (err) {
    }
}