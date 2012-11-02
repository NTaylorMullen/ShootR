<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="admin.aspx.cs" Inherits="ShootR.admin" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Admin</title>
</head>
<body>
    <form id="form1" runat="server">
    <asp:Panel runat="server" ID="Login">
        <p>Username: <asp:TextBox ID="AdminUserName" runat="server"></asp:TextBox></p>
        <p>Password: <asp:TextBox TextMode="Password" ID="AdminPassword" runat="server"></asp:TextBox></p>
        <asp:Button runat="server" ID="btnLogin" OnClick="btnLogin_Click" Text="Login"/>
    </asp:Panel>

    <asp:Panel runat="server" ID="Config" Visible="false">
        <asp:Panel ID="Error" runat="server" Visible="false">
            <p style="color:red;">ERROR UPDATING RUNTIME</p>
        </asp:Panel>
        <p>Max Users: <asp:TextBox ID="MaxUsers" runat="server"></asp:TextBox></p>
        <p><asp:Button runat="server" ID="UpdateRuntime" Text="Update" OnClick="UpdateRuntime_Click"/></p>
        <p><asp:TextBox ID="BroadcastMessage" runat="server"></asp:TextBox> <asp:Button ID="Broadcast" Text="Broadcast" runat="server" OnClick="Broadcast_Click"/></p>
    </asp:Panel>
    </form>
</body>
</html>
