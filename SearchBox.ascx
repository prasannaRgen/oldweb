<%@ Control Language="C#" AutoEventWireup="true" CodeFile="SearchBox.ascx.cs" Inherits="TTSHMasterPage_SearchBox" %>
<style type="text/css">
    .tableSearch {
        border:none;
        max-width:350px;
    }
    .searchImg {
        background-color:#888;
        cursor:pointer;
        border:0;
    }
    .searchImg:hover {
        background-color:#333;
    }
    .SearchButtons {
        background-color:transparent;
        color:#0b82ba;
        height:18px;
        border:none;
        text-decoration:none;
        font-family:Verdana, Geneva, sans-serif;
        font-size:11px;
    }
    .tSearch {width:300px;height:29px;padding:0;text-align :right;border:none;font-family:"Verdana","Arial","sans-serif";font-size:11px}
    .tdBorder {border:solid 1px #ccc;padding:0px 0px 0px 5px;float:right;margin:0;}
    .tdSearchButtons {text-align:right;}
    .labelError {font-family:Verdana, Geneva, sans-serif; height:18px;border:none; font-size:11px;color:red;max-width :280px;overflow:hidden }
    .watermark { width:300px;height:29px;padding:0;text-align :right;border:none;font-family:"Verdana","Arial","sans-serif";font-size:11px;color:#888  }
</style>
<table class="tableSearch">
    <tr>
        <td>
            <asp:Label ID="lblErr" runat="server" CssClass="labelError" Text=""></asp:Label>
        </td>
    </tr>
        <tr>
            <td class="tdBorder" >
                <asp:TextBox ID="txtSearch" runat="server" AutoPostBack="false" CssClass="tSearch"  onblur="Blur(this)" onfocus="Focus(this)"  AutoCompleteType="Disabled"></asp:TextBox>
                <asp:ImageButton ID="btnSearch" OnClientClick="return validateSearch();" runat="server" ImageUrl="~/Images/search.png" CssClass="searchImg" ImageAlign="AbsMiddle" AlternateText="Search" OnClick="btnSearch_Click" />    
                <input type="hidden" id="hidCnt" runat="server"/>
            </td>
        </tr>
        <tr>
            <td class="tdSearchButtons">
                <asp:LinkButton ID="btnClear" runat="server" Text="Clear Search" OnClick="btnClear_Click" CssClass="SearchButtons"/> 
                <%--<asp:LinkButton ID="btnExport" runat="server" Text="Export To Excel" Visible="false" OnClick="btnExport_Click" CssClass="SearchButtons"/>--%>
            </td>
        </tr>
</table>

<script type="text/javascript">
    var watermarkText = "Search Project By Title, PI Name, IRB Number"
    window.onload = windowOnload;

    function windowOnload() {
        if (document.getElementById('<%=txtSearch.ClientID%>').value == '') {

            document.getElementById('<%=txtSearch.ClientID%>').value = watermarkText;
            document.getElementById('<%=txtSearch.ClientID%>').className = 'watermark';


        }
    }



    function validateSearch() {
        var inputVal = document.getElementById('<%=txtSearch.ClientID%>').value;
        if (inputVal.trim() == '') {
            document.getElementById('<%=lblErr.ClientID%>').innerHTML = "Please Enter Search Text";
            return false;
        }

        if (inputVal == watermarkText) {
            document.getElementById('<%=lblErr.ClientID%>').innerHTML = "Please Enter Search Text";
            return false;
        }

        var cnt = inputVal.split(',').length;
        if (cnt > 3) {
            document.getElementById('<%=lblErr.ClientID%>').innerHTML = "Please Enter Max. 3 values for search";
            return false;
        }

        var flag = 0;
        var inArr = inputVal.split(',');
        for (var i = 0; i < inArr.length; i++) {
            if (inArr[i].trim() == '') {
                flag = 1;
            }
        }

        if (flag == 1) {
            document.getElementById('<%=lblErr.ClientID%>').innerHTML = "Please Enter Proper Input for Search";
            return false;
        }


    
    }

    function blockSpecialChar(e) {
        //onkeypress = "return blockSpecialChar(event)"
        //if ($.browser.mozilla != /firefox/.test(navigator.userAgent.toLowerCase())) {
            var k = e.which || e.keyCode;
            return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || (k >= 44 && k <= 46) || k == 95 || k == 35 || k == 32 || k == 34 || k == 39 || (k >= 48 && k <= 57));
    }


    function Focus(ob) {
        var val = ob.value;
        if (val == watermarkText) {
            ob.value = '';
            ob.className = 'tSearch';
        }
    }

    function Blur(ob) {
        if (ob.value == '') {
            ob.value = watermarkText;
            ob.className = 'watermark';
        }
        else {
            ob.className = 'tSearch';
        }
    }




</script>