<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="Login.ascx.cs" Inherits="ShootR.Login" %>

<link href="Styles/bootstrap.min.css" rel="stylesheet" />

<script src="Scripts/jquery-1.9.1.js" type="text/javascript"></script>
<script src="Scripts/bootstrap.min.js" type="text/javascript"></script>
<script src="Scripts/jquery.cookie.js" type="text/javascript"></script>

<div class="container">
    <div class="row">
        <div class="span6">
            <h1>ShootR</h1>
            <p>Powered by <a href="http://signalr.net/" target="_blank">SignalR</a> and <a href="http://endgate.net" target="_blank">EndGate</a>.</p>
        </div>
    </div>

    <div class="row" style="width: 625px;">
        <style>
            #loginHolder .btn-inverse {
                color: #ffffff;
                text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
                background-color: #0f3253;
                *background-color: #0F3243;
                background-image: -moz-linear-gradient(top, #033c73, #0F3243);
                background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#033c73), to(#0F3243));
                background-image: -webkit-linear-gradient(top, #033c73, #0F3243);
                background-image: -o-linear-gradient(top, #033c73, #0F3243);
                background-image: linear-gradient(to bottom, #033c73, #0F3243);
                background-repeat: repeat-x;
                border-color: #222222 #222222 #000000;
                border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);
                filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff033c73', endColorstr='#ff0F3243', GradientType=0);
                filter: progid:DXImageTransform.Microsoft.gradient(enabled=false);
            }

                #loginHolder .btn-inverse:hover,
                #loginHolder .btn-inverse:focus,
                #loginHolder .btn-inverse:active,
                #loginHolder .btn-inverse.active,
                #loginHolder .btn-inverse.disabled,
                #loginHolder .btn-inverse[disabled] {
                    color: #ffffff;
                    background-color: #0F3243;
                    *background-color: #151515;
                }

                #loginHolder .btn-inverse:active,
                #loginHolder .btn-inverse.active {
                    background-color: #080808 \9;
                }
        </style>
        <div id="loginHolder" class="well" style="height: 158px;">
            <div class="span3">
                <p>
                    <a class="btn btn-success btn-large" href="#" id="GuestLogin">Login as Guest</a>
                </p>
                <p>
                    <a class="btn btn-default btn-large" href="https://github.com/ntaylormullen/shootr" target="_blank">ShootR Source</a>
                </p>
                <p>
                    <a class="btn btn-default btn-large" href="https://github.com/signalr/signalr" target="_blank">SignalR Source</a>
                </p>
            </div>
            <h2>Or</h2>
            <div class="span3">
                <p>
                    <asp:Button ID="FacebookLoginButton" Text="Facebook" OnClick="FacebookLoginButton_Click" runat="server" CssClass="btn btn-inverse btn-large" Width="100%" />
                </p>
                <p>
                    <asp:Button ID="GoogleLoginButton" Text="Google" OnClick="GoogleLoginButton_Click" runat="server" CssClass="btn btn-danger btn-large" Width="100%" />
                </p>
                <p>
                    <asp:Button ID="TwitterLoginButton" Text="Twitter" OnClick="TwitterLoginButton_Click" runat="server" CssClass="btn btn-info btn-large" Width="100%" />
                </p>
            </div>
        </div>
    </div>

    <script type="text/javascript">
        $("body").removeClass("space");

        $("#GuestLogin").click(function () {
            var stateCookie = {
                DisplayName: "",
                Identity: "Guest",
                Photo: "",
                RegistrationID: ""
            };
            $.cookie('shootr.state', JSON.stringify(stateCookie), { path: '/', expires: 30 });
            $("form").submit();
        });
    </script>
</div>