<%@ Page Title="" Language="C#" MasterPageFile="~/TTSHMasterPage/TTSH.master" AutoEventWireup="true" CodeFile="frmProject_Master.aspx.cs" Inherits="TTSHMasterPage_frmProject_Master" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="asp" %>
<%@ Register Src="~/SearchBox.ascx" TagPrefix="uc1" TagName="SearchBox" %>



<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
       <style type="text/css">
        .auto-style1 {
            height: 18px;
        }
    </style>

    <script src="Scripts/Webform/jsProject_Master.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            try {
                CallAutocomplete();
            }
            catch (err) { }
            Sys.WebForms.PageRequestManager.getInstance().add_pageLoaded(AfterPostBack)

        });

        function AddProjectMaster(pmm,uri1) {
            $.ajax({
                type: "POST",
                url: uri1,
                data: JSON.stringify(pmm),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data1) {
                    alert(data1.d);
                },
                error: function (request, status, errorThrown) {
                    alert(status);
                }
            });
        }
    </script>
    <script src="Scripts/DataOwner.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="FeaturedContent" Runat="Server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" Runat="Server">
    <asp:HiddenField ID="HdnMode" Value="New" runat="server" />
    <asp:HiddenField ID="HdnId" Value="0" runat="server" />
    <asp:HiddenField ID="HdnError" runat="server" />
    <asp:HiddenField ID="HdnPi_ID" runat="server" />
    <asp:HiddenField ID="HdnFeasibilityStatus" Value="0" runat="server" />



    <div class="projectGrid container" runat="server" id="DivMain">
        <div class="row">
            <div class="col-md-6 col-sm-6 paging">
                <h1>Project Master View<span>Search, Filter and Edit Project Details</span></h1>

            </div>
            <div class="col-md-6 col-sm-6 paging">
                <div class="grid-search">
                    <%--<p class="search-box">--%>
                    <%--<uc1:SearchBox runat="server" id="SearchBox" />--%>
                    <uc1:SearchBox runat="server" id="SearchBox" />
                    <%--<input type="text" placeholder="Search Project By Title,PI Name, IRB Number" />--%>
                    <%--<img alt="" src="../Images/search.png" />--%>
                    <%--</p>--%>

                    <%--<span><a href="#">Clear Search</a> | <a href="#">Export To Excel</a></span>--%>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <div class="tblResposiveWrapper">
                    <table id="tblResposive">
                        <thead>
                            <tr>
                                <th width="100">Project ID</th>
                                <th width="300">Project Title</th>
                                <th width="150">Project Category</th>
                                <th width="150">Project Status</th>
                                <th width="110">DSRB/IRB No.</th>
                                <th width="150">PI Name</th>
                                <th width="95">Action</th>

                            </tr>
                        </thead>

                        <tbody>

                            <asp:Repeater ID="rptrProjectDetail" runat="server" OnItemCommand="rptrProjectDetail_ItemCommand">
                                <ItemTemplate>
                                    <tr>
                                        <td data-th="Project ID">
                                            <p><%#Eval("s_Display_Project_ID") %></p>
                                        </td>
                                        <td data-th="Project Title">
                                            <p><%#Eval("s_Project_Title") %></p>
                                        </td>
                                        <td data-th="Project Category">
                                            <p><%#Eval("Project_Category_Name") %></p>
                                        </td>
                                        <td data-th="Project Status">
                                            <p style="text-wrap: normal"><%#Eval("S_ProjectStatus") %></p>
                                        </td>
                                        <td data-th="DSRB/IRB No.">

                                            <p><%#Eval("s_IRB_No") %></p>
                                        </td>
                                        <td data-th="PI Name">
                                            <p><%#Eval("PI_Name") %></p>
                                        </td>
                                        <td data-th="Action">
                                            <p class="grid-action">
                                                <asp:LinkButton ID="ImgEdit" runat="server" CommandArgument='<%# DataBinder.Eval(Container, "DataItem.i_ID")%>' Visible='<%# "Edit".Contains(Eval("Status").ToString()) %>' CommandName="cmdEdit">
													<img title="Edit Project Detail" alt="" src="../Images/icon-edit.png"></asp:LinkButton>
                                                <asp:LinkButton ID="ImgDelete" CommandArgument='<%# DataBinder.Eval(Container, "DataItem.i_ID")%>' Visible='<%# "Edit".Contains(Eval("Status").ToString()) %>'
                                                    OnClientClick='<%# String.Format("return ConfirmDelete(\"{0}\");",  Eval("i_ID")) %>'
                                                    CommandName="cmdDelete" runat="server">
                                                        <img title="Delete Project Detail" alt="" src="../Images/icon-delete.png">
                                                </asp:LinkButton>
                                                <asp:LinkButton ID="ImgView" CommandArgument='<%# DataBinder.Eval(Container, "DataItem.i_ID")%>' Visible='<%# "View,Edit".Contains(Eval("Status").ToString()) %>' CommandName="cmdView" runat="server">
                                                    
												<img title="View Project Detail" alt="" src="../Images/icon-view.png">
                                                </asp:LinkButton>
                                            </p>
                                        </td>
                                    </tr>
                                </ItemTemplate>

                            </asp:Repeater>

                        </tbody>
                    </table>

                    <!-- Grid View -->



                    <!-- Grid View -->
                </div>
            </div>
        </div>


        <div class="row" id="Paging">
            <div class="col-md-6 paging">
                <div class="page-info">
                    <%--<h3>Results Found : 18  </h3>--%>
                    <p>Showing Page 2 of Total 4 Pages | <a href="#">First Page</a> | <a href="#">Last Page</a></p>
                </div>
            </div>
            <div class="col-md-6 paging">
                <div class="pages">
                    <%--	<a class="current-page" href="#">1</a> <a href="#">2</a> <a href="#">3</a> <a href="#">4</a>--%>
                </div>
            </div>
        </div>
        <div class="row margin-top frmAction">
            <div class="col-md-12">
                <p style="text-align: left">



                    <asp:Button CssClass="action" ID="btnNew" title="Add New Project" runat="server" Text="Add New Project" OnClick="btnNew_Click" />

                </p>
            </div>
        </div>
    </div>



    <div class="container EthicsContainer" id="ProjectDetailContainer" runat="server">
        <span style="float: right; margin-top: 65px">
            <asp:LinkButton ID="lnkback" Text="Back to View" runat="server" OnClick="lnkback_Click"></asp:LinkButton></span>
        <div class="row">
            <div class="col-md-6 col-sm-6">
                <h1>Project Details <span>Project Entry Form <b>( Project ID:<b id="DispProjectId" runat="server"> </b>)</b></span></h1>
            </div>

        </div>
        <div class="row">
            <div class="col-md-12">
                <h3 class="frmHead" data-frm="frmDetails">Project Information <span>( - )</span></h3>
            </div>
        </div>
        <div class="frmProject">

            <div class="frm frmDetails" style="display: block;">
                <div class="row">
                    <div class="col-md-6 col-sm-6">
                        <p>
                            <label>Project Id <b>*</b></label>
                            <asp:TextBox ID="TxtDispProjId" CssClass="ctlinput" onpaste="return false;"
                                onkeyup="ChangeOnProjectId(this);" runat="server"></asp:TextBox>
                        </p>
                        <p>
                            <label>Project Title <b>*</b></label>
                            <asp:TextBox ID="TxtprojTitle" TextMode="MultiLine" CssClass="ctltext" runat="server"></asp:TextBox>
                        </p>

                        <p>
                            <label>Alias 1</label>
                            <asp:TextBox ID="TxtProjTitleAlias1" CssClass="ctlinput" runat="server"></asp:TextBox>
                        </p>
                        <p>
                            <label>Alias 2</label>
                            <asp:TextBox ID="TxtProjTitleAlias2" CssClass="ctlinput" runat="server"></asp:TextBox>
                        </p>
                        <p>
                            <label>Short Title</label>
                            <asp:TextBox ID="TxtShortTitle" CssClass="ctlinput" runat="server"></asp:TextBox>
                        </p>

                    </div>
                    <div class="col-md-6 col-sm-6">
                        <p>
                            <label>DSRB/IRB No</label>
                            <asp:TextBox ID="TxtIRBno" CssClass="ctlinput" runat="server"></asp:TextBox>

                        </p>
                        <p>
                            <label>Project Description</label>
                            <asp:TextBox ID="TxtProjDescription" TextMode="MultiLine" CssClass="ctltext" runat="server"></asp:TextBox>
                        </p>

                        <p>
                            <label>Project Start Date <b>*</b></label>


                            <asp:TextBox ID="TxtstartDate" CssClass="ctlinput ctlinput-sm datepicker" onpaste="return false;" onkeypress="return false;" runat="server" TabIndex="1"></asp:TextBox>
                        </p>


                        <p>
                            <label>Project Status <b>*</b></label>
                            <asp:DropDownList ID="ddlProjectStatus" CssClass="ctlselect" runat="server"></asp:DropDownList>

                        </p>
                        <p>
                            <label>Project End Date <b>*</b></label>


                            <asp:TextBox ID="TxtProjectEndDate" CssClass="ctlinput ctlinput-sm datepicker" onpaste="return false;" onkeypress="return false;" runat="server" TabIndex="1"></asp:TextBox>
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <h3 class="frmHead" data-frm="frmProCat">Project Category <span>( - )</span></h3>
            </div>
        </div>
        <asp:UpdatePanel ID="UpdatePanel1" UpdateMode="Conditional" runat="server">
            <ContentTemplate>
                <div class="frm frmProCat" style="display: block;">
                    <div class="row">
                        <div class="col-md-6 col-sm-6">
                            <p>
                                <label>Project Category <b>*</b></label>
                                <asp:DropDownList ID="ddlProjCategory" CssClass="ctlselect" runat="server"></asp:DropDownList>

                            </p>
                            <p>
                                <label>Project Sub Type <b>*</b></label>
                                <asp:DropDownList ID="ddlProjSubType" CssClass="ctlselect" runat="server"></asp:DropDownList>

                            </p>
                            <p>
                                <label>Selected Project<b>*</b></label>
                                <asp:DropDownList ID="ddlselectedproject" CssClass="ctlselect" runat="server">
                                    <asp:ListItem Selected="True" Value="-1">--Select--</asp:ListItem>
                                    <asp:ListItem Value="1">Yes</asp:ListItem>
                                    <asp:ListItem Value="0">No</asp:ListItem>
                                </asp:DropDownList>
                            </p>


                        </div>
                        <div class="col-md-6 col-sm-6">
                            <p>
                                <label>Project Type <b>*</b></label>

                                <asp:DropDownList ID="ddlProjType" CssClass="ctlselect" OnSelectedIndexChanged="ddlProjType_SelectedIndexChanged"
                                    runat="server" AutoPostBack="True">
                                </asp:DropDownList>



                            </p>
                            <p>
                                <label>Ethics Needed <b>*</b></label>
                                <asp:DropDownList ID="ddlEthicsNeeded" CssClass="ctlselect" runat="server">
                                    <asp:ListItem Selected="True" Value="-1">--Select--</asp:ListItem>
                                    <asp:ListItem Value="1">Yes</asp:ListItem>
                                    <asp:ListItem Value="0">No</asp:ListItem>
                                </asp:DropDownList>
                            </p>
                            <p>
                                <label>Feasibility Check Status<b>*</b></label>
                                <asp:DropDownList ID="ddlFeasibilityStatus" CssClass="ctlselect" runat="server">
                                </asp:DropDownList>

                            </p>

                        </div>
                    </div>
                </div>
            </ContentTemplate>
            <Triggers>
                <asp:AsyncPostBackTrigger ControlID="ddlProjType" EventName="SelectedIndexChanged" />

            </Triggers>
        </asp:UpdatePanel>

        <div class="row">
            <div class="col-md-12">
                <h3 class="frmHead" data-frm="frmProkeyInfo">Project Key Information <span>( - )</span></h3>
            </div>
        </div>
        <asp:UpdatePanel ID="up" UpdateMode="Conditional" runat="server">
            <ContentTemplate>
                <div class="frm frmProkeyInfo" style="display: block;">
                    <div class="row">
                        <div class="col-md-6 col-sm-6">
                            <p>
                                <label>Collaboration Involved<b>*</b></label>
                                <asp:DropDownList ID="ddlCollbrationInv" CssClass="ctlselect" runat="server">
                                    <asp:ListItem Selected="True" Value="-1">--Select--</asp:ListItem>
                                    <asp:ListItem Value="1">Yes</asp:ListItem>
                                    <asp:ListItem Value="0">No</asp:ListItem>
                                </asp:DropDownList>

                            </p>
                            <p>
                                <label>Funding Required <b>*</b></label>
                                <asp:DropDownList ID="ddlfundingReq" CssClass="ctlselect" runat="server">
                                    <asp:ListItem Selected="True" Value="-1">--Select--</asp:ListItem>
                                    <asp:ListItem Value="1">Yes</asp:ListItem>
                                    <asp:ListItem Value="0">No</asp:ListItem>
                                </asp:DropDownList>

                            </p>
                            <p>
                                <label>Parent Project Name <b>*</b></label>

                                <asp:DropDownList ID="ddlParentProjName" CssClass="ctlselect" Style="width: 431.65px" AutoPostBack="true"
                                    onchange="TrimParentProject();" OnSelectedIndexChanged="ddlParentProjName_SelectedIndexChanged" runat="server">
                                </asp:DropDownList>

                            </p>


                        </div>
                        <div class="col-md-6 col-sm-6">
                            <p>
                                <label>Start by TTSH <b>*</b></label>
                                <asp:DropDownList ID="ddlstartbyTTSH" CssClass="ctlselect" runat="server">
                                    <asp:ListItem Selected="True" Value="-1">--Select--</asp:ListItem>
                                    <asp:ListItem Value="1">Yes</asp:ListItem>
                                    <asp:ListItem Value="0">No</asp:ListItem>
                                </asp:DropDownList>

                            </p>
                            <p>
                                <label>Whether is Child/Parent<b>*</b></label>
                                <asp:DropDownList ID="ddlChildParent" CssClass="ctlselect" runat="server">
                                    <asp:ListItem Selected="True" Value="-1">--Select--</asp:ListItem>
                                    <asp:ListItem Value="1">Parent</asp:ListItem>
                                    <asp:ListItem Value="0">Child</asp:ListItem>
                                </asp:DropDownList>

                            </p>
                            <p>
                                <label>Parent Project Id<b>*</b></label>
                                <asp:TextBox ID="txtParentProjId" CssClass="ctlinput" onkeypress="return false" onpaste="return false;" onmousekeydown="return false;" runat="server"></asp:TextBox>


                            </p>

                        </div>
                    </div>
                </div>
            </ContentTemplate>
            <Triggers>
                <asp:AsyncPostBackTrigger ControlID="ddlParentProjName" EventName="SelectedIndexChanged" />
            </Triggers>
        </asp:UpdatePanel>
        <div class="row">
            <div class="col-md-12 col-sm-12">
                <h3 class="frmHead" data-frm="frmPI">Principal Investigator (PI) Details <span>( - )</span>
                </h3>
                <p runat="server" id="PMorePi"><span>+</span>  <a class="newPI link" data-frm="frmNewPIDetails">Record New PI Details</a></p>

            </div>
        </div>

        <div class="frm frmPI" style="display: block;">
            <div class="row">
                <div class="col-md-12 col-sm-12">
                    <div class="tblResposiveWrapper">
                        <table id="tblPiDetail" class="tblResposive">
                            <thead>
                                <tr>

                                    <th style="width: 450px; text-align: left">Department</th>
                                    <th style="text-align: left">PI Name</th>
                                    <th style="text-align: left">Email</th>
                                    <th style="text-align: left">Phone</th>
                                    <th style="text-align: left">PI MCR No.</th>
                                    <th style="width: 45px;">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                <asp:Repeater ID="rptrPIDetails" runat="server">
                                    <ItemTemplate>
                                        <tr data-th="Department" piid="<%# Eval("i_ID")%>">
                                            <td data-th="Department">
                                                <p><%# Eval("s_DeptName") %></p>
                                            </td>
                                            <td data-th="PI Name">
                                                <p><%# Eval("s_PIName") %></p>
                                            </td>
                                            <td data-th="Email">
                                                <p><%# Eval("s_Email") %></p>
                                            </td>
                                            <td data-th="Phone">
                                                <p><%# Eval("s_Phone_no") %></p>
                                            </td>
                                            <td data-th="PI MCR No.">
                                                <p><%# Eval("s_MCR_No") %></p>
                                            </td>
                                            <td data-th="Action">
                                                <p class="grid-action">

                                                    <asp:LinkButton ID="ImgDelete" CommandArgument='<%# DataBinder.Eval(Container, "DataItem.i_ID")%>' OnClientClick="return delPiRows(this);" CommandName="cmdDelete" runat="server">
                                                        <img title="Delete Pi Detail" alt="" src="../Images/icon-delete.png">
                                                    </asp:LinkButton>

                                                </p>
                                            </td>
                                        </tr>
                                    </ItemTemplate>
                                </asp:Repeater>




                            </tbody>
                        </table>
                    </div>
                    <p runat="server" id="Pmore" class="align-right"><a class="link" onclick="AddMorePI();">+ Add More PI</a></p>
                </div>
            </div>
        </div>

        <div class="frmNewPIDetails" style="display: none;">
            <div class="row">
                <div class="col-md-12 col-sm-12">
                    <h3 runat="server" id="hrMorePi" style="color: rgb(228, 16, 83); margin-bottom: 1em;">Record New Principal Investigator (PI) Details					                  
                    </h3>
                </div>
            </div>
            <asp:UpdatePanel runat="server" ID="UpPi">
                <ContentTemplate>
                    <div class="row">
                        <div class="col-md-6 col-sm-6">
                            <p>
                                <label>Department <b>*</b></label>
                                <asp:HiddenField ID="HdnNewDeptId" runat="server" />

                                <asp:TextBox ID="TxtNewDepartment" onpaste="return false;" placeholder="Type Keyword to search Department" CssClass="ctlinput" runat="server"></asp:TextBox>

                            </p>
                            <p>
                                <label>First / Given Name <b>*</b></label>
                                <asp:TextBox ID="txtPiFirstName" CssClass="ctlinput" onkeypress="return RestrictPower(event);" runat="server"></asp:TextBox>
                            </p>
                            <p>
                                <label>PI Email <b>*</b></label>
                                <asp:TextBox ID="txtPIEmailAddress" onblur="checkValidEmail(this);" CssClass="ctlinput" runat="server"></asp:TextBox>
                            </p>


                        </div>
                        <div class="col-md-6 col-sm-6">
                            <p>
                                <label>PI MCR No.<b>*</b></label>
                                <asp:TextBox ID="txtPIMCR_NO" CssClass="ctlinput" runat="server"></asp:TextBox>
                            </p>
                            <p>
                                <label>Last Name / Surname <b>*</b></label>
                                <asp:TextBox ID="txtPiLastName" CssClass="ctlinput" onkeypress="return RestrictPower(event);" runat="server"></asp:TextBox>
                            </p>
                            <p>
                                <label>Phone No.</label>
                                <asp:TextBox ID="txtPiPhNo" CssClass="ctlinput" onKeypress="return SingaporePhformat();" onpaste="return false" runat="server"></asp:TextBox>
                            </p>

                        </div>
                    </div>
                    <div class="row margin-top frmAction">
                        <div class="col-md-12">
                            <p style="text-align: right">


                                <asp:Button CssClass="action" ID="btnPISave" runat="server" Text="Save" OnClick="btnPISave_Click" />
                                <asp:Button CssClass="action" ID="btnPICancel" runat="server" Text="Reset" />

                            </p>
                        </div>
                    </div>
                </ContentTemplate>
            </asp:UpdatePanel>
        </div>

        <div class="frmAddMorePIDetails" style="display: none;">
            <div class="row">
                <div class="col-md-12 col-sm-12">
                    <h3 style="color: rgb(228, 16, 83); margin-bottom: 1em;">Add  Principal  Investigator (PI)					                  
                    </h3>
                </div>
            </div>

            <div class="row">
                <div class="col-md-6 col-sm-6">
                    <p>
                        <label>Department <b>*</b></label>
                        <asp:HiddenField ID="HdnDeptId" runat="server" />
                        <asp:HiddenField ID="HdnDeptTxt" runat="server" />
                        <asp:TextBox ID="TxtDepartment" onpaste="return false;" placeholder="Type Keyword to search Department" onblur="ClearOnblur(this);" onKeydown="items('');" CssClass="ctlinput" runat="server"></asp:TextBox>
                    </p>
                    <p>
                        <label>PI Email </label>
                        <asp:TextBox ID="txtPIEmail" CssClass="ctlinput" runat="server"></asp:TextBox>
                    </p>
                    <p>
                        <label>Phone No.</label>
                        <asp:TextBox ID="txtPiPhoneNo" CssClass="ctlinput" runat="server"></asp:TextBox>
                    </p>

                </div>
                <div class="col-md-6 col-sm-6">
                    <p>
                        <label>PI Name<b>*</b></label>
                        <asp:HiddenField ID="HdnpiId" runat="server" />
                        <asp:HiddenField ID="HdnPITxt" runat="server" />
                        <asp:TextBox ID="TxtPIName" onpaste="return false;" placeholder="Type Keyword to search PI" onblur="CheckPiOnBlur(this);"  CssClass="ctlinput" runat="server"></asp:TextBox>

                    </p>
                    <p>
                        <label>PI MCR No.</label>
                        <asp:TextBox ID="txtPiMCRNo" CssClass="ctlinput" runat="server"></asp:TextBox>
                    </p>
                </div>
            </div>
            <div class="row margin-top frmAction">
                <div class="col-md-12">
                    <p style="text-align: right">


                        <asp:Button CssClass="action" ID="btnMorePiSave" runat="server" Text="Save" />
                        <asp:Button CssClass="action" ID="btnMorePiCancel" runat="server" Text="Reset" />

                    </p>
                </div>
            </div>

        </div>

        <div class="row">
            <div class="col-md-12">
                <h3 class="frmHead" data-frm="frmother">Other Detail <span>( - )</span></h3>
            </div>
        </div>
        <div class="frm frmother" style="display: block;">
            <div class="row">
                <div class="col-md-6 col-sm-6">
                    <p>
                        <label>Research IO (Internal Order)</label>
                        <asp:TextBox ID="txtResearchOrder" CssClass="ctlinput" runat="server"></asp:TextBox>

                    </p>
                    <p>
                        <label>Co-Ordinators </label>
                        <asp:HiddenField runat="server" ID="HdnCoordinatorId" />
                        <asp:HiddenField ID="HdnCoordinatorText" runat="server" />

                        <asp:TextBox ID="TextSearch" CssClass="ctlinput" onKeypress="return false;" onmousedown="return false;" onkeydown="return false;" runat="server"></asp:TextBox>
                        <div runat="server" id="CheckBoxListDiv" class="CheckboxList">
                            <asp:CheckBoxList ID="chkboxlist" CssClass="ctlselect" CellPadding="0" CellSpacing="0" runat="server"></asp:CheckBoxList>
                        </div>
                        <asp:PopupControlExtender ID="Pexd" PopupControlID="CheckBoxListDiv" Position="Bottom" TargetControlID="TextSearch" runat="server"></asp:PopupControlExtender>
                    </p>


                </div>
                <div class="col-md-6 col-sm-6">
                    <p>
                        <label>Research IP (Insurance Provider)</label>

                        <asp:TextBox ID="txtReserchInsurance" CssClass="ctlinput" runat="server"></asp:TextBox>

                    </p>


                </div>
            </div>
        </div>
        <%-- <asp:UpdatePanel ID="updDO" runat="server">
            <ContentTemplate>--%>


        <div class="row" style="display:none;">
            <div class="col-md-12">
                <h3 class="frmHead" data-frm="frmDataOwner">Data Owner Details <span>( - )</span></h3>
            </div>
        </div>
        <%--<div class="frm frmDataOwner" style="display: block;">--%>
          <div class="row" style="display:none;">
            <div class="row">
                <div class="col-md-6 col-sm-6">
                    <p>
                        <label>Ethics Project Data Owner </label>
                        <asp:DropDownList ID="ddlDO_Ethics" CssClass="ctlselect" runat="server">
                        </asp:DropDownList>
                    </p>

                    <p>
                        <label>Selected Project Data Owner</label>
                        <asp:DropDownList ID="ddlDO_Selected" CssClass="ctlselect" runat="server">
                        </asp:DropDownList>
                    </p>
                    <p>
                        <label>Regulatory Project Data Owner</label>
                        <asp:DropDownList ID="ddlDO_Regulatory" CssClass="ctlselect" runat="server">
                        </asp:DropDownList>
                    </p>



                </div>
                <div class="col-md-6 col-sm-6">
                    <p>
                        <label>Feasibility Project Data Owner</label>
                        <asp:DropDownList ID="ddlDO_Feasibility" CssClass="ctlselect" runat="server">
                        </asp:DropDownList>
                    </p>

                    <p>
                        <label>Contract Data Owner</label>
                        <asp:DropDownList ID="ddlDO_Contract" CssClass="ctlselect" runat="server">
                        </asp:DropDownList>
                    </p>


                    <p>
                        <label>Grant Project Data Owner</label>
                        <asp:DropDownList ID="ddlDO_Grant" CssClass="ctlselect" runat="server">
                        </asp:DropDownList>
                    </p>


                </div>
            </div>
        </div>
        <%-- </ContentTemplate>
        </asp:UpdatePanel>--%>
        <div class="row margin-top frmAction">
            <div class="col-md-12">
                <p style="text-align: right">


                    <asp:Button CssClass="action" ID="btnSave" runat="server" Text="Save Details" OnClick="btnSave_Click" />
                    <asp:Button CssClass="action" ID="btnCancel" runat="server" Text="Cancel" OnClick="btnCancel_Click" />
                    <asp:Button ID="delete" runat="server" Style="display: none" OnClick="delete_Click" />
                </p>
            </div>
        </div>
    </div>


    <script type="text/javascript">
       <%-- function PerformCancel() {
            $('#<%=btnCancel.ClientID %>').click();
        }--%>
        $(function () {
            ClearPiDetails();
            ClearCheckboxList();
        });

        function ClearCheckboxList() {
            $('#<%=TextSearch.ClientID%>').bind("mouseup", function (e) {
                var $input = $(this),
					oldValue = $input.val();

                if (oldValue == "") return;

                // When this event is fired after clicking on the clear button
                // the value is not cleared yet. We have to wait for it.
                setTimeout(function () {
                    var newValue = $input.val();

                    if (newValue == "") {
                        var list = $get('<%=chkboxlist.ClientID%>');
                        var inputs = list.getElementsByTagName('input');
                        for (var i = 0; i < inputs.length; i++) {
                            inputs[i].checked = false;
                        }
                        $input.trigger("cleared");
                    }
                }, 1);
            });

            return false;
        }


        /*function ClearOnblur(obj) {
            var HdnDeptTxt = $('[id*=HdnDeptTxt]').val();
            if (HdnDeptTxt != "") {
                if (obj.value.toLowerCase() != HdnDeptTxt.toLowerCase()) {
                    MessageBox("Please select Proper Department");
                    items('');
                    $("[id*=HdnDeptId]").val('');
                    return false;

                }
            }

        }*/

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
                    else {
                        $("[id*=TxtPIName]").autocomplete({ disabled: false });
                    }
                }
            }
            else {
                $("[id*=TxtPIName]").autocomplete({ disabled: true });
            }
        }

        function CheckPiOnBlur(obj) {
            var HdnPITxt = $('[id*=HdnPITxt]').val();
            if (obj.value.trim() != "") {
                if (HdnPITxt != "") {
                    if (obj.value.toLowerCase() != HdnPITxt.toLowerCase()) {
                        MessageBox("Please select Proper PI");
                        items();
                        obj.value = "";
                        $("[id*=HdnpiId]").val('');
                        return false;
                    }
                   
                }
            }
            return true;
        }

        function ClearPiDetails() {
            $('#<%=TxtDepartment.ClientID%>').bind("mouseup", function (e) {
                var $input = $(this),
					oldValue = $input.val();

                if (oldValue == "") return;

                // When this event is fired after clicking on the clear button
                // the value is not cleared yet. We have to wait for it.
                setTimeout(function () {
                    var newValue = $input.val();

                    if (newValue == "") {
                        $("[id*=HdnDeptId]").val('');
                        if ($("[id*=HdnDeptId]").val().trim() == '') {
                            $("[id*=TxtPIName]").autocomplete({ disabled: true });
                        }
                        else {
                            $("[id*=TxtPIName]").autocomplete({ disabled: false });
                        }
                        items('');
                        $input.trigger("cleared");
                    }
                }, 1);
            });

            $('#<%=TxtPIName.ClientID%>').bind("mouseup", function (e) {
                var $input = $(this),
					oldValue = $input.val();

                if (oldValue == "") return;

                // When this event is fired after clicking on the clear button
                // the value is not cleared yet. We have to wait for it.
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
            else {

                $("[id*=HdnpiId]").val('');
                $("[id*=txtPiMCRNo]").val('');
                $("[id*=TxtPIName]").val('');
                $("[id*=txtPIEmail]").val('');
                $("[id*=txtPiPhoneNo]").val('');


            }
        }

        function FillPi(result) {
            var TxtPIName = document.getElementById('<%=TxtPIName.ClientID%>');
            var HdnpiId = document.getElementById('<%=HdnpiId.ClientID%>'); //--------------Set ID in hidden feild

            


            var DeptId = result != null ? result.split('|')[1] : result;
            SearchText(TxtPIName.id, HdnpiId.id, 10, "FillPi~spAutoComplete~" + DeptId, fillPiDetails, '<%=HdnPITxt.ClientID%>');
        }

        function fillPiDetails(result) {
            var ID = (result != null) ? result.split('|')[1] : result;
            GetPI_MasterDetailsByID(ID, '<%=txtPIEmail.ClientID%>', '<%=txtPiPhoneNo.ClientID%>', '<%=txtPiMCRNo.ClientID%>')
        }


        function SetProjectId() {
            GetId('SetprojectId', '', '', '', '', SetVal);
        }

        function SetVal(projid) {

            TxtDispProjId = document.getElementById('<%=TxtDispProjId.ClientID%>');
            TxtDispProjId.value = projid;
            TxtDispProjId.focus();
            //document.getElementById('<%=DispProjectId.ClientID%>').innerText = projid;
            $('[id*=DispProjectId]').text(projid);
        }

        function ChangeOnProjectId(obj) {
            $('[id*=DispProjectId]').text(obj.value);
            //document.getElementById('<%=DispProjectId.ClientID%>').innerText = obj.value;
        }


        function CallNewPi() {

            SearchText('<%=TxtNewDepartment.ClientID%>', '<%=HdnNewDeptId.ClientID%>', 10, "Department~spAutoComplete");
            SearchText('<%=TxtDepartment.ClientID%>', '<%=HdnDeptId.ClientID%>', 10, "Department~spAutoComplete", FillPi, '<%=HdnDeptTxt.ClientID%>');
            ClearCloseNewPiSection();
            $('[id*=TxtNewDepartment]').focus();
            return false;
        }
        function SetCollabProjectCategory() {
            var HdnMode = $('[id*=HdnMode]').val().toLowerCase();
            var HdnFeasibilityStatus = $('[id*=HdnFeasibilityStatus]').val();
            if (HdnMode != 'view') {
                var ddlProjCategory = $('[id*=ddlProjCategory] option:selected').text().toLowerCase();
                var ddlFeasibilityStatus = $('[id*=ddlFeasibilityStatus]');
                var ddlCollbrationInv = $('[id*=ddlCollbrationInv]');
                ddlFeasibilityStatus.removeAttr('disabled');


                ddlFeasibilityStatus.val(0);
                ddlFeasibilityStatus.attr('title', 'Feasibility Check Status');
                if (HdnMode == 'update') {
                    ddlFeasibilityStatus.val(HdnFeasibilityStatus);
                }
                ddlCollbrationInv.removeAttr('disabled');
                //ddlFeasibilityStatus.disabled = false;
                if (ddlProjCategory == "pharma") {
                    ddlCollbrationInv[0].selectedIndex = 1;
                    //ddlFeasibilityStatus.selectedIndex = 1;
                    //	ddlFeasibilityStatus.disabled = true;
                    ddlCollbrationInv.attr('disabled', true);
                }
                if (ddlProjCategory == 'pi initiated') {
                    ddlFeasibilityStatus.val(3);
                    ddlFeasibilityStatus.attr('disabled', true); ddlFeasibilityStatus.attr('title', 'PI Initiated Project is not applicable for Feasibility');
                }
                if (ddlProjCategory == '--select--') {
                    ddlCollbrationInv[0].selectedIndex = 0;
                    ddlCollbrationInv.removeAttr('disabled');
                    ddlFeasibilityStatus.removeAttr('disabled');
                    ddlFeasibilityStatus.val(0);
                    ddlFeasibilityStatus.attr('title', 'Feasibility Check Status');
                }
            }

        }
        function AfterPostBack() {

            SearchText('<%=TxtNewDepartment.ClientID%>', '<%=HdnNewDeptId.ClientID%>', 10, "Department~spAutoComplete");
            SearchText('<%=TxtDepartment.ClientID%>', '<%=HdnDeptId.ClientID%>', 10, "Department~spAutoComplete", FillPi, '<%=HdnDeptTxt.ClientID%>');
            TrimParentProject();
            SetCollabProjectCategory();
            ApplyDOScript(); ClearPiDetails();
            ClearCheckboxList();
        }

        function CallAutocomplete() {
            SearchText('<%=TxtNewDepartment.ClientID%>', '<%=HdnNewDeptId.ClientID%>', 10, "Department~spAutoComplete");
            SearchText('<%=TxtDepartment.ClientID%>', '<%=HdnDeptId.ClientID%>', 10, "Department~spAutoComplete", FillPi, '<%=HdnDeptTxt.ClientID%>');
            var mode = document.getElementById('<%=HdnMode.ClientID%>').value;

            if (mode.toLowerCase() == 'new' || mode.toLowerCase() == 'insert') {
                //SetProjectId();
            }
            else {
                $("[id*=TxtDispProjId]").attr("disabled", "disabled");
            }
            DisableControl('<%=txtPIEmail.ClientID%>', '<%=txtPiMCRNo.ClientID%>', '<%=txtPiPhoneNo.ClientID%>', '<%=ddlParentProjName.ClientID%>', '<%=txtParentProjId.ClientID%>');
        }

        function BindDoObjects() {

            /*Ethics Project*/
            if ($('select[id$="ddlEthicsNeeded"]').val() == "1") {
                $('select[id$="ddlDO_Ethics"]').prop("disabled", false);
                if ($('select[id$="ddlDO_Ethics"]').siblings("label").html().indexOf('*') <= -1) {
                    $('select[id$="ddlDO_Ethics"]').siblings("label").append("<b> *</b>")
                }
            }
            else {
                $('select[id$="ddlDO_Ethics"]').val("0");
                $('select[id$="ddlDO_Ethics"]').prop("disabled", true);
                $('select[id$="ddlDO_Ethics"]').siblings("label").find('b').remove();
            }

            /*Selected Project*/
            if ($('select[id$="ddlselectedproject"]').val() == "1") {
                $('select[id$="ddlDO_Selected"]').prop("disabled", false);
                if ($('select[id$="ddlDO_Selected"]').siblings("label").html().indexOf('*') <= -1) {
                    $('select[id$="ddlDO_Selected"]').siblings("label").append("<b> *</b>")
                }
            }
            else {
                $('select[id$="ddlDO_Selected"]').val("0");
                $('select[id$="ddlDO_Selected"]').prop("disabled", true);
                $('select[id$="ddlDO_Selected"]').siblings("label").find('b').remove();
            }


            /*feasibility*/
            if ($('select[id$="ddlFeasibilityStatus"]').val() == "1" || $('select[id$="ddlFeasibilityStatus"]').val() == "2") {
                $('select[id$="ddlDO_Feasibility"]').prop("disabled", false);

                if ($('select[id$="ddlDO_Feasibility"]').siblings("label").html().indexOf('*') <= -1) {
                    $('select[id$="ddlDO_Feasibility"]').siblings("label").append("<b> *</b>")
                }

            }
            else {
                $('select[id$="ddlDO_Feasibility"]').val("0");
                $('select[id$="ddlDO_Feasibility"]').prop("disabled", true);

                $('select[id$="ddlDO_Feasibility"]').siblings("label").find('b').remove();
            }


            /*regulatory*/
            if ($('select[id$="ddlProjCategory"]').val() == "2" && $('select[id$="ddlProjType"]').val() == "1") {
                $('select[id$="ddlDO_Regulatory"]').prop("disabled", false);

                if ($('select[id$="ddlDO_Regulatory"]').siblings("label").html().indexOf('*') <= -1) {
                    $('select[id$="ddlDO_Regulatory"]').siblings("label").append("<b> *</b>")
                }

            }
            else {
                $('select[id$="ddlDO_Regulatory"]').val("0");
                $('select[id$="ddlDO_Regulatory"]').prop("disabled", true);

                $('select[id$="ddlDO_Regulatory"]').siblings("label").find('b').remove();
            }




            /*Grant*/
            if ($('select[id$="ddlProjCategory"]').val() == "2" && $('select[id$="ddlfundingReq"]').val() == "1" && $('select[id$="ddlstartbyTTSH"]').val() == "1") {
                $('select[id$="ddlDO_Grant"]').prop("disabled", false);

                if ($('select[id$="ddlDO_Grant"]').siblings("label").html().indexOf('*') <= -1) {
                    $('select[id$="ddlDO_Grant"]').siblings("label").append("<b> *</b>")
                }

            }
            else {
                $('select[id$="ddlDO_Grant"]').val("0");
                $('select[id$="ddlDO_Grant"]').prop("disabled", true);

                $('select[id$="ddlDO_Grant"]').siblings("label").find('b').remove();
            }




            /*Contract*/
            if ($('select[id$="ddlCollbrationInv"]').val() == "1") {
                $('select[id$="ddlDO_Contract"]').prop("disabled", false);

                if ($('select[id$="ddlDO_Contract"]').siblings("label").html().indexOf('*') <= -1) {
                    $('select[id$="ddlDO_Contract"]').siblings("label").append("<b> *</b>")
                }

            }
            else {
                $('select[id$="ddlDO_Contract"]').val("0");
                $('select[id$="ddlDO_Contract"]').prop("disabled", true);

                $('select[id$="ddlDO_Contract"]').siblings("label").find('b').remove();
            }


        }
    </script>

</asp:Content>

