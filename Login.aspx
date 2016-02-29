<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Login.aspx.cs" Inherits="_Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>Tan Tock Seng Hospital - A Community of Care</title>
    <meta name="description" content="" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <link rel="apple-touch-icon" href="apple-touch-icon.png" />
    <!-- Place favicon.ico in the root directory -->

    <link rel="stylesheet" href="css/normalize.css" />
    <link rel="stylesheet" href="css/base.css" />
    <link rel="stylesheet" href="css/custom.css" />
    <script src="js/vendor/modernizr-2.8.3.min.js"></script>
</head>
<body>
    <form id="form1" runat="server">
        <!--[if lt IE 8]>
            <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->


        <div style="background-color: #333333; padding: 0px; height: 5px;"></div>

        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <a class="logo-head img-responsive" href="#">
                        <img src="Images/TanTockSeng-Hospital-Logo.jpg" alt="Clinical Research &amp; Innovation (CRIO)"/></a>
                </div>
                <%--<div class="col-md-6">
                <p class="top-search">
                <input type="text"><img src="Images/icon-search.jpg">
                </p>    
				<a class="adapNav" href="#"><img src="Images/icon-dashboard.png" alt="Microsoft Service Center Menu"></a>                
            </div>--%>
            </div>
        </div>

        <div class="nav-container">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <h2 class="welcome-note">( CRIO ) Database System</h2>
                    </div>
                </div>
            </div>
        </div>

        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <h1>Sign In <spanSecured login area for CRIO users </span></h1>

                    <div class="msc-frm">
                        <div class="login" style="width:70%;border-right:none;" >
                            <p>
                                <asp:TextBox runat="server" ID="txtUserName" placeholder="Login Name" />
                                <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" ControlToValidate="txtUserName" CssClass="field-validation-error" ErrorMessage="Please enter login name." ForeColor="Red"/>
                            </p>
                            <p>
                                <asp:TextBox runat="server" ID="txtPassword" TextMode="Password" placeholder="Password" />
                                <asp:RequiredFieldValidator ID="RequiredFieldValidator2" runat="server" ControlToValidate="txtPassword" CssClass="field-validation-error" ErrorMessage="Please enter password." ForeColor="Red"/>
                            </p>
                            <p>
                            <asp:Button runat="server" Text="Login" CssClass="action" ID="btnLogin" OnClick="btnLogin_Click" />
                            </p>
                            <p style="color:red;">

                                <asp:Literal runat="server" ID="FailureText" />
                            </p>
                        </div>
                    
                    </div>
                   
                    <p>&nbsp;</p>

                    <h2>Clinical Research and Innovation Officee<span>Clinical Research Unit</span></h2>
                    <p>Clinical Research and Innovation Office (CRIO) aims to lead, promote and coordinate research culture and activities to support the development of TTSH into a reputable world-class research centre. CRIO aligns its mission with Singapore’s emphasis on life science biomedical research. It supports the research endeavours of all the staff in TTSH.<a href="https://www.ttsh.com.sg/clinical-research-unit/">read more</a></p>

                </div>
                <div class="col-md-6">
                    <img src="Images/login-filler.jpg" alt=""></img>
                </div>
            </div>
        </div>

        <div class="footer-container">
            <div class="container">
                <div class="row">
                    <div class="col-md-6">
                        <h4>Clinical Research &amp; Innovation (CRIO) Database System</h4>
                        <p>Website: http://www.ttsh.com.sg  Phone: (65) 6357 8898/9  Fax: (65) 6251 4095</p>
                        <p>11 Jalan Tan Tock Seng, Singapore 308433</p>
                    </div>
                    <div class="col-md-6 align-right">
                        <h4>A Product of Tan Tock Seng Hospital</h4>
                        <p>Copyright &copy; 2014 Tan Tock Seng Hospital, Singapore</p>
                    </div>
                </div>
            </div>
        </div>

        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.11.2.min.js"><\/script>')</script>
        <script src="js/plugins.js"></script>
        <script src="js/main.js"></script>
    </form>
</body>
</html>
