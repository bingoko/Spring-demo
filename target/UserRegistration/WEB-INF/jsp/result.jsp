<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<html>
<head>
    <title>Success</title>
</head>
<body>

<h2>Submitted User Information</h2>
   <table>
    <tr>
        <td>Username</td>
        <td>${username}</td>
    </tr>
    <tr>
        <td>Password</td>
        <td>${password}</td>
    </tr>
    <tr>
        <td>Email</td>
        <td>${email}</td>
    </tr>
</table>  
</body>
</html>