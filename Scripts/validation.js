
//Generic validation Function : Ejaz Waquif 29-Jun-2015
//To apply the generic validation:
//Apply the following class name to the field where you want to apply validation:
//Class name - "Req" :- for Required field
//Class name - "Num" :- for Numeric field
//Class name - "AlphaNum" :- for Alpha Numeric field
//Class name - "Email" :- for Email field
//Class name - "Phone" :- for Phone number field
//Class name - "len250" :- for character limit where 250 is the number of character to limit

function validate(container) {

    var seperator = ", ";

    /*Require field validation*/
    var flag = true;

    $(container + ' .Req').each(function (ind, itm) {

        var title = itm.title;
        var value = itm.value;
        var placeHolder = $(itm).attr("placeholder");

        if ($.trim(value) == "" || value == "-1" || $.trim(value) == placeHolder) {
            flag = false;
            $(itm).focus();
            return false;
        }

    });

    if (!flag) {
        MessageBox("Please fill all the required fields.");
        return flag;
    }
    /*End of Require field validation*/

    /*Email Validation*/
    $(container + ' .Email').each(function (ind, itm) {

        var title = itm.title;
        var email = itm.value;

        if ($.trim(email) == "") { return; }

        //var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        var filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

        if (!filter.test(email)) {
            flag = false;
            $(itm).focus();
            return false;
        }
    });
    if (!flag) {
        MessageBox("Please provide valid email address.");
        return flag;
    }
    /*End of Email Validation*/


    /*Numeric field validation*/
    var fieldName = "";
    var c = 0;
    $(container + ' .Num').each(function (ind, itm) {

        var title = itm.title;
        var value = itm.value;

        if ($.trim(value) == "") { return; }

        var regex = /^[0-9\b]+$/;
        if (!regex.test(value)) {
            flag = false;
            $(itm).focus();
            fieldName = title;
            return false;
            //if (c == 0)
            //    fieldName += title
            //else
            //    fieldName += seperator + title;

            //c++;
        }
    });
    if (!flag) {
        MessageBox("Please provide numeric value in " + fieldName + ".");
        return flag;
    }
    /*End of Numeric field validation*/

    /*Phone Number validation*/
    $(container + ' .Phone').each(function (ind, itm) {

        var title = itm.title;
        var value = itm.value;

        if ($.trim(value) == "") { return; }

        var regex = new RegExp(/^\+?[0-9(),.-]+$/);

        if (!value.match(regex)) {
            flag = false;
            $(itm).focus();
            return false;

        }
    });
    if (!flag) {
        MessageBox("Please provide valid Phone number.");
        return flag;
    }
    /*End of Phone Number validation*/

    /*Alpha Numeric validation*/
    var fieldName = "";
    var c = 0;
    $(container + ' .AlphaNum').each(function (ind, itm) {

        var title = itm.title;
        var value = itm.value;

        if ($.trim(value) == "") { return; }

        //var regx = /^[A-Za-z0-9 #_.-]+$/;
        var regx = /^[A-Za-z]+[A-Za-z0-9 ,#'@$_.-]+$/;

        if (!regx.test(value)) {
            flag = false;

            $(itm).focus();
            fieldName = title;
            return false;

            //if (c == 0)
            //    fieldName += title
            //else
            //    fieldName += seperator + title;

            //c++;
        }
    });

    if (!flag) {
        MessageBox("Please provide alpha numeric value in " + fieldName + ". Also it should start with a letter.");
        return flag;
    }
    /*End of Alpha Numeric validation*/

    /*Alpha validation*/
    var fieldName = "";
    var c = 0;
    $(container + ' .Alpha').each(function (ind, itm) {

        var title = itm.title;
        var value = itm.value;

        if ($.trim(value) == "") { return; }

        //var regx = /^[A-Za-z0-9 #_.-]+$/;
        //var regx = /^[A-Za-z ,#'@$_.-]+$/;
        //var regx = /^[A-Za-z]+[A-Za-z ,#'@$_.-]+$/;

        if (value.match(/\d+/) != null) { //!regx.test(value)
            flag = false;

            $(itm).focus();
            fieldName = title;
            return false;

            //if (c == 0)
            //    fieldName += title
            //else
            //    fieldName += seperator + title;

            //c++;
        }
    });

    if (!flag) {
        MessageBox("Numbers are not allowed in " + fieldName + ".");
        return flag;
    }
    /*End of Alpha validation*/



    return flag;
    //return false;


}

//Function to limit the number of characters : Add Class name as len10 where 10 is character limit :Ejaz Waquif 29-Jun-2015
$(document).ready(function () {

    validateOnEvents();

});
//End of Function to limit the number of characters : Add Class name as len10 where 10 is character limit :Ejaz Waquif 29-Jun-2015

function validateOnEvents() {
    $("[class*=len]").keypress(function () {

        var lenLimit = 0;

        for (var i = 0; i < $(this)[0].classList.length; i++) {
            if ($(this)[0].classList[i].indexOf("len") != -1) {
                lenLimit = $(this)[0].classList[i].replace("len", "");
            }

        }

        var currLen = $(this).val().length;
        var fieldName = $(this).attr("title");

        if (currLen > parseInt(lenLimit) - 1) {
            MessageBox("Only " + lenLimit + " characters are allowed in " + fieldName)
            return false;
        }

    });

    $("[class*=len]").on("paste", function () {

        var oldText = $(this).val();
        var elem = $(this);
        setTimeout(function () {
            var lenLimit = 0;

            for (var i = 0; i < $(elem)[0].classList.length; i++) {
                if ($(elem)[0].classList[i].indexOf("len") != -1) {
                    lenLimit = $(elem)[0].classList[i].replace("len", "");
                }

            }

            var currLen = $(elem).val().length;
            var fieldName = $(elem).attr("title");

            if (currLen > parseInt(lenLimit)) {
                MessageBox("Only " + lenLimit + " characters are allowed in " + fieldName);
                $(elem).val(oldText);

                return false;
            }
        });

    });

    $(".Email").blur(function (ind, itm) {

        var title = $(this).attr("title");
        var email = $(this).val();

        if ($.trim(email) == "") { return; }

        //var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        var filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

        if (!filter.test(email)) {
            flag = false;
            $(itm).focus();
            MessageBox("Please provide valid email address.");
            return false;
        }
    });

    $("[class*=Range]").keyup(function () {

        if ($.trim($(this).val()) == "")
            return false;



        var range = "";
        var currValue = parseInt($(this).val());

        for (var i = 0; i < $(this)[0].classList.length; i++) {
            if ($(this)[0].classList[i].indexOf("Range") != -1) {
                range = $(this)[0].classList[i].replace("Range", "");
            }
        }

        var rangeStart = parseInt(range.split("-")[0]);
        var rangeEnd = parseInt(range.split("-")[1]);

        var regex = /^[0-9\b]+$/;
        if (!regex.test($(this).val())) {
            $(this).val("");
            MessageBox("Please enter the number between " + rangeStart + " and " + rangeEnd);

            return;
        }

        if (!(currValue >= rangeStart && currValue <= rangeEnd)) {
            $(this).val("");
            MessageBox("Please enter the number between " + rangeStart + " and " + rangeEnd);

            return;
        }

    });

    $("[class*=Range]").blur(function () {

        if ($.trim($(this).val()) == "")
            return false;



        var range = "";
        var currValue = parseInt($(this).val());

        for (var i = 0; i < $(this)[0].classList.length; i++) {
            if ($(this)[0].classList[i].indexOf("Range") != -1) {
                range = $(this)[0].classList[i].replace("Range", "");
            }
        }

        var rangeStart = parseInt(range.split("-")[0]);
        var rangeEnd = parseInt(range.split("-")[1]);

        var regex = /^[0-9\b]+$/;
        if (!regex.test($(this).val())) {
            $(this).val("");
            MessageBox("Please enter the number between " + rangeStart + " and " + rangeEnd);

            return;
        }

        if (!(currValue >= rangeStart && currValue <= rangeEnd)) {
            $(this).val("");
            MessageBox("Please enter the number between " + rangeStart + " and " + rangeEnd);

            return;
        }

    });
}