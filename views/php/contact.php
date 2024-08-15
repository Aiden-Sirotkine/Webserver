<!DOCTYPE html>
<!--
Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/html.html to edit this template
-->

    <head>
        <title>Contact</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="styles.css">
    </head>
    
        <div class="header"> 
            <div class="subdir" id="home"><a class=subdirlink href = "index.html" >Home</a>  </div>
            <div class="subdir" id="about"><a class=subdirlink href = "about.html" >About</a></div>
            <div class="subdir" id="contact"><a class=subdirlink href = "contact.html" >Contact</a></div>
        </div>
        <div class="Title">Contact</div>
        <p id="emailp">Email directly at aidensiro@gmail.com or send a message</p>

        <form action="something.php" method="post">
            <label for="fname">Name:</label>
            <input type="text" id="fname" name="fname"><br><br>
            <label for="femail">Email Address:</label>
            <input type="text" id="femail" name="femail"><br><br>
            <p>Content:</p>
            <textarea id="content" name='fcontent'></textarea><br><br>
            <input type="submit" value="Submit">
        </form>

        <div class="filler"></div>
        <div class="filler"></div>
        <div class="footer">
            <p class="footertext">Aiden Sirotkine <br>aidensiro@gmail.com <br>Copywrite 2022 </p>
        </div>
        
        
        <!--this script makes the content text area auto resize.-->
        <script>
            const tx = document.getElementsByTagName("textarea");
            for (let i = 0; i < tx.length; i++) {
                tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight) + "px;overflow-y:hidden;");
                tx[i].addEventListener("input", OnInput, false);
            }

            function OnInput() {
                this.style.height = "auto";
                this.style.height = (this.scrollHeight) + "px";
            }

        </script>

        <!--this php script will email whatever the user writes to me-->
        <?php
        $name= $_POST['fname'];
        $emailaddress= $_POST['femail'];
        $content= $_POST['fontent'];
        echo "<p>Data Processed</>";
        ?>
    


