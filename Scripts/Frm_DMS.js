var divName, tablename, type, search, project, other,isaddotherrow;
project = 2;
search = 1;
other = 3;
//Used For Hiding The Div
$(document).ready(function () {
    HideDiv();
    
});
//Show No Records
ShowNoRecords();

//Hide  Div
function HideDiv() {
    try {
        type = search;
        $('.frmProjectDocs,.frmOtherDocs').hide();
        //$('#' + getclientId('canceldiv')).hide();
        $('#' + getclientId('actionbuttons')).hide();
    }
    catch (err) {
    }
}

//Show Document For Upload Section
function ShowUploadSection(project1) {
    try {

        HideDiv();
        $('#' + getclientId('DocsContainer')).hide();
        //  var frmName = window.event.srcElement.dataset.frm;
        //$('#' + getclientId('canceldiv')).show();
        $('#' + getclientId('actionbuttons')).show();
     
        $('.frmAction').show();

        //if (frmName == "ProjectDocs") {
        if (project1 == "1") {
            divName = ".frmProjectDocs";
            tablename = "#tblProjectDocDetail";
            type = project;
        }
        else {
            divName = ".frmOtherDocs";
            tablename = "#tableOtherDoc";
            type = other;
        }
        ClearAll();
        $('#'+getclientId('canceldiv')).show();
        if ($(divName).is(':visible')) {
            $(divName).slideToggle("slow");
        }
      
        $('#' + getclientId('SearchDocument')).hide();
        $(divName).slideToggle("slow", "swing", function () {
            if ($(divName).is(':visible')) {
            //    //window.event.srcElement.innerText	='-Cancel Uploading Docs';
            //    //$(divName).find('.link').prev("span").text("-");
            }
            //else {
            //    $(divName).find('.link').text(' Uploading New Docs');
            //    $(divName).find('.link').prev("span").text("-");
            //}
        });
        $(tablename).find('tr:last').find('input:text,textarea').val('');
        $(tablename).find('tr:last').find('.ctlselect').val(0);
        ApplyToggle();
    }
    catch (err) {
    }
}


//Set Project Parameter
function Setvalues(result) {
    var url = "../Frm_DMS.aspx/GetProjectDetails";
    var projectid = result.split('|')[1];
    // project_id = $(project_id).val();
    $.ajax({
        type: "POST",
        url: url,
        data: '{ "projectid": "' + projectid + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            console.log(result.d);
            var project = result.d.project[0]; //JSON.stringify(eval('result.d'));
            console.log(project);
            $('#' + getclientId('TxtProjectTitle')).val(project["s_Project_Title"]);
            $('#' + getclientId('TxtAlias1')).val(project["s_Project_Alias1"]);
            $('#' + getclientId('TxtAlias2')).val(project["s_Project_Alias2"]);
            $('#' + getclientId('TxtShortTitle')).val(project["s_Short_Title"]);
            $('#' + getclientId('TxtProjectId')).val(project["s_Display_Project_ID"]);
            $('#' + getclientId('TxtDSRVIRB')).val(project["s_IRB_No"]);
        },
        error: function (result) {
            MessageBox("error " + result);
        }
    });
}

//Show No records
function ShowNoRecords() {
    if ($("#tblResposive tbody tr").length == 0) {

        $("#tblResposive tbody").html("<tr><td colspan='4' > No Records Available <td></tr>");
        $("#projectPaging").hide();
        $("#tblResposive").addClass("removeHover");
        $("#tblResposive thead th").css("background-image", "none");
        $("#tblResposive thead th").unbind("click");
        $('#Paging').hide();
    }
    $("#tblResposive").tablesorter();
}

//Get Client Id Of The Asp Control
function getclientId(controlid) {
    return $('[id$=' + controlid + ']').attr('id');
}

function CallDelete(Id) {

}

function ConfirmDelete(id) {
    return ConfirmBox('Are you sure to delete this Record..!!', 'CallDelete(' + id + ')')
}
//Adding Row  To The Grid
function addRow() {
    try {
        var length = $(tablename).find('tbody tr').length+1;
        if ($(tablename).find('tbody tr').length > 0) {
            if ($(tablename).find('tr:eq(' + ($(tablename).find('tr').length - 1) + ')').find('input:text').val() == "" ||
                $(tablename).find('tr:eq(' + ($(tablename).find('tr').length - 1) + ')').find('input:text').val() == null ||
                $(tablename).find('tr:eq(' + ($(tablename).find('tr').length - 1) + ')').find('input:text').val() == undefined) {
                MessageBox('First Upload Documents');
                return false;
            }
        }
        $(tablename).find('tr:last').first().clone().appendTo(tablename);
        //var table = '<tr class="removeHover">' +
        //'<td data-th="DocTitle">' +
        //'<p>'
        //+ '<input name="ctl00$MainContent$rptrProjectDocDetails$ctl00$txtDocTitle" class="ctlinput doctitle" id="MainContent_rptrProjectDocDetails_txtDocTitle_0"  maxlength="100" type="text">'
        //+ '</p>'
        //+ '</td>'
        //+ '<td data-th="DocDescription">'
        //+ '<textarea name="ctl00$MainContent$rptrProjectDocDetails$ctl00$txtDocDescription" class="ctlinput docdesc" id="MainContent_rptrProjectDocDetails_txtDocDescription_0"   maxlength="200" rows="2" cols="20"></textarea>'
        //+ '</td>';
        //if (divName != ".frmOtherDocs") {
        //    table += '<td data-th="DocCategory">'
        //+ '<select name="ctl00$MainContent$rptrProjectDocDetails$ctl00$ddlDocCategory" class="ctlselect" id="MainContent_rptrProjectDocDetails_ddlDocCategory_0" onload="javascript:resizeIframe(this);">'
        //+ '<option value="0">--Select--</option>'
        //+ '<option value="1">Ethics</option>'
        //+ '<option value="2">Feasibility</option>'
        //+ '<option value="3">IsSelected Project</option>'
        //+ '<option value="4">Contract Master</option>'
        //+ '<option value="5">Contract Management</option>'
        //+ '<option value="6">Regulatory Master</option>'
        //+ '<option value="8">Grant Management</option>'
        //+ '</select>';
        //}

        //table += '</td>'
        //+ '<td data-th="FileName">'
        ////+ '<iframe  src="IFrame_FileUpload.aspx" class="iframecss" id="frame' + length + '" frameBorder="0" scrolling="no" " ></iframe>'
        //+ '<input class="txtUpload" id="txtIRBFile" type="text">'
        //+ '<input id="txtSavePath" class="txtSavePath" runat="server"  Style="visibility: hidden;width:0px;" />'
        //+ '<span class="btn btn-default btn-file action">Browse...'
        //+ '<input  title="Documents File" class="action" id="MainContent_rptrProjectDocDetails_fuIRBFile_0" onchange="return FloadChange(this);" type="file">'
        //+ '</span>'
        //+ '</td>'
        //+ '<td style="text-align: center;" data-th="Action">'
        //+ '<p class="grid-action">'
        //    + '<a><img title="delete" onclick="return DeleteRow(this);" alt="Delete" src="../Images/icon-delete.png"></a>'
        //+ '</p>'
        //+ '</td>'
        //+ '</tr>';
        //$(tablename).append(table);
        //isaddotherrow = false;
        //if (tablename == '#tableOtherDoc') {
        //    $(tablename).find('.doctitle').addClass('docOthertitle');
        //    $(tablename).find('.docdesc').addClass('docOtherdesc');
        //    $(tablename).find('.txtUpload').addClass('txtOtherUpload');
        //}
        $(tablename).find('tr:last').find('input:text,textarea').val('');
        $(tablename).find('tr:last').find('.ctlselect').val(0);
        return false;

    }
    catch (err) {
    }

}
//Set Value In Hidden Field
function SetProjectDocHiddenField() {
    var docmanglibList = new Array();
    var docmanglib;

    for (var i = 1; i < $(tablename).find('tr').length; i++) {
        docmanglib = {};
        if ($(tablename).find('tr:eq(' + i + ')').find('.doctitle').val() == "" || $(tablename).find('tr:eq(' + i + ')').find('.doctitle').val() == undefined) {
            MessageBox('Enter Document Title.');
            return false;
        }
        else {
            docmanglib['DocTitle'] = $(tablename).find('tr:eq(' + i + ')').find('.doctitle').val();
        }
        if ($(tablename).find('tr:eq(' + i + ')').find('.docdesc').val() == "" || $(tablename).find('tr:eq(' + i + ')').find('.docdesc').val() == undefined) {
            MessageBox('Enter Document Description.');
            return false;
        }
        else {
            docmanglib['DocDescription'] = $(tablename).find('tr:eq(' + i + ')').find('.docdesc').val();
        }
        if ($(tablename).find('tr:eq(' + i + ')').find('.txtSavePath').val() == "" || $(tablename).find('tr:eq(' + i + ')').find('.txtSavePath').val() == undefined) {
            MessageBox('Upload the File.');
            return false;
        }
        else {
            docmanglib['s_DMS_FileName'] = $(tablename).find('tr:eq(' + i + ')').find('.txtSavePath').val();
        }
        
        if (tablename == '#tblProjectDocDetail' &&parseInt( $(tablename).find('tr:eq(' + i + ')').find('.ctlselect').val())<=0) {
            MessageBox('Select Document Category.');
            return false;
        }
       
        
        docmanglib['DocType'] = tablename == '#tblProjectDocDetail' ? parseInt($(tablename).find('tr:eq(' + i + ')').find('.ctlselect').val()) : 7;
        docmanglib['i_Project_ID'] = tablename == '#tblProjectDocDetail' ? parseInt($('#' + getclientId('HdnNeProjectId')).val()) : 0;
      
        docmanglibList.push(docmanglib);
    }
    $('#' + getclientId('Hiddocmanlib')).val(JSON.stringify(docmanglibList).toString());
}
function resizeIframe(obj) {
   // obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px';
}
//Copy Path
function CopyPath(obj) {
    $(obj).parent().parent().find('[id*=txtIRBFile]').val(obj.value.replace(/ +/g, "*"));
    return false;
}
//Del Row From Grid
function DeleteRow(obj) {
    if ($(obj).parents("tbody").find("tr").length == 1) {
        MessageBox("There Should be atleast one record available .");
        return false;
    }
    if ($(obj).parents("tbody").find("tr").length > 1) {
        $(obj).parent().parent().parent().parent().addClass('removeStudyTeam');
        ConfirmBox('Do you want to Delete this Record..??', "$('.removeStudyTeam').remove();");
    }
}

//Clear All The Documents
function ClearAll() {
    try {
        $(divName).find("input:text").val('');
        $(tablename).find('tbody').find('input:text,textarea').val('');
        $(tablename).find('tbody').find('input[type="text"]').val('');
        //Clear Add On Rows
        if ($(tablename).parents("tbody").find("tr").length > 1) {
            $(tablename).parent().parent().parent().parent().addClass('removeStudyTeam');
            $('.removeStudyTeam').remove();
        }
        $(tablename).parents("tbody").find("tr:eq(0)").find('input:text').val('');
        $('.ctlselect').val(0);

    }
    catch (err) {
    }
}

function canceldiv() {
    try {
        HideDiv();

        $('#' + getclientId('SearchDocument')).show();
    }
    catch (err) {
    }
}
//Function For Validation Save
function ValidateSave() {
    var projectId;
    var documentValid;
    var msg = '';
    try {

        if (type == project) {
            projectId = parseInt($('#' + getclientId('HdnNeProjectId')).val()) > 0 ? parseInt($('#' + getclientId('HdnNeProjectId')).val()) : 0;
            if (projectId == 0) {
                MessageBox(msg);
                return false;
            }
            if ($(tablename).find('tr:gt(0)').find('.ctlselect').val() == "" || $(tablename).find('tr:gt(0)').find('.ctlselect').val() == undefined) {
                if (msg == '')
                    msg = 'Select Document Type';
                else
                    msg = 'Select Project and then upload document type';
                MessageBox(msg);
                return false;
            }
            $(tablename).find('.ctlselect').each(function () {
                if ($.trim($(this).val()) == '0') {
                    documentValid = false;
                    MessageBox('Select Document Type.');
                    return false;
                    //$(this).css({
                    //    "border": "1px solid red",
                    //    "background": "#FFCECE"
                    //});
                }
            });

        }//Close For Project
            $(tablename).find('.doctitle').each(function () {
                if ($.trim($(this).val()) == '') {
                    documentValid = false;
                    MessageBox('Enter Document Title.');
                    return false;
                    //$(this).css({
                    //    "border": "1px solid red",
                    //    "background": "#FFCECE"
                    //});
                }
            });

            if (documentValid == false) {
                MessageBox('Enter Document Title.');
                return false;
            }
            $(tablename).find('.docdesc').each(function () {
                if ($.trim($(this).val()) == '') {
                    documentValid = false;
                    MessageBox('Enter Document Description');
                    return false;

                }
            });
            $(tablename).find('.txtSavePath').each(function () {
                if ($.trim($(this).val()) == '') {
                    documentValid = false;
                    MessageBox('Enter Document Description');
                    return false;
                }
            });
            if ($(tablename).find('tr:gt(0)').length == 0) {
                MessageBox('No Document For Uploading');
                return false;
            }
            if ($(tablename).find('tr:gt(0)').find('.doctitle').val() == "" || $(tablename).find('tr:gt(0)').find('.doctitle').val() == undefined) {
                MessageBox('Enter Document Title');
                return false;
            }
            if ($(tablename).find('tr:gt(0)').find('.docdesc').val() == "" || $(tablename).find('tr:gt(0)').find('.docdesc').val() == undefined) {
                MessageBox('Enter Document Description');
                return false;
            }
            if ($(tablename).find('tr:gt(0)').find('.txtSavePath').val() == "" || $(tablename).find('tr:gt(0)').find('.txtSavePath').val() == undefined) {
                MessageBox('Enter the file');
                return false;
            }
            SetProjectDocHiddenField();
       
    }
    catch (err) {
        return false;
    }
}//Enter Key pressed
//$('#' + getclientId('txtDoucumentSearch')).keypress(function (e) {
function searchKeyPress(e) {
    var code = e.keyCode ? e.keyCode : e.which;
    console.log(code);
    if (code == 13) {
        console.log('Enter Key was pressed');
        $('#' + getclientId('txtSearchDoc')).click();
    }
}


//Used To Get The Saved Filed Name From IFrame
function getSavedFileName(i) {

    var childiFrame = document.getElementById("frame" + i);

    var innerDoc = childiFrame.contentDocument
            || childiFrame.contentWindow.document;

    var yourChildiFrameControl = innerDoc.getElementById("txtSavePath");
   return yourChildiFrameControl.value;
}
function ValidateSearch() {
    if ($('#' + getclientId('txtDoucumentSearch')).val() == "" || $('#' + getclientId('txtDoucumentSearch')).val() == undefined) {
        MessageBox("Type Keyword to search");
        return false;
    }
    return true;
}
function ValidateClear() {
    if (
        ($("#tblResposive tbody tr").length >0 && $.trim($("#tblResposive tbody tr:eq(0) td").html) == "No Records Available")
        && ($('#' + getclientId('txtDoucumentSearch')).val() == "" || $('#' + getclientId('txtDoucumentSearch')).val() == undefined)) {
            MessageBox("No records to Clear.");
            return false;
    }
    return true;
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

