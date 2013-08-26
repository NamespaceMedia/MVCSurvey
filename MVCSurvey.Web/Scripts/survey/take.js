﻿$(document).ready(function () {

    $("#btnSurveyCancel").click(function () {
        document.location.href = _MVCSurvey_HelperObject.referrerUrl;
    });

    var _Survey_Helper = {};

    _Survey_Helper.totalElemsInDiv = 3;
    _Survey_Helper.keyElemIndex = 0;
    _Survey_Helper.valueElemIndex = 2;

    _Survey_Helper.validateNumber = function (val, currentDiv) {
        var match = val.match(/^\d*$/);

        if (match != null) {
            return match.length > 0;
        }
        else {
            if (currentDiv && currentDiv != null) {
                var span = document.createElement("span");
                $(span).html("You answer must be a number");
                $(span).addClass("survey-error-append");
                $(currentDiv).append(span);
            }

            return false;
        }
    };

    _Survey_Helper.validateDecimal = function (val, currentDiv) {
        var match = val.match(/^\d+\.\d+$|^$/);

        if (match != null) {
            return match.length > 0;
        }
        else {
            if (currentDiv && currentDiv != null) {
                var span = document.createElement("span");
                $(span).html("You answer must be a decimal number (xx.xx)");
                $(span).addClass("survey-error-append");
                $(currentDiv).append(span);
            }

            return false;
        }
    };

    _Survey_Helper.validateCurrency = function (val, currentDiv) {
        var match = val.match(/^\$\d+\.\d{2}$|^\d+\.\d+$|^$|^\$$/);

        if (match != null) {
            return match.length > 0;
        }
        else {
            if (currentDiv && currentDiv != null) {
                var span = document.createElement("span");
                $(span).html("You answer must be a dollar value ($x.xx)");
                $(span).addClass("survey-error-append");
                $(currentDiv).append(span);
            }

            return false;
        }
    };

    //////////////////////////////////////////////////////////////////////////

    $(".currency").focus(function () {
        $(this).val("$");
    });

    $(".currency").blur(function () {
        var val = $(this).val();

        if (val.charAt(0) != "$") {
            $(this).val("$" + val);
        }
    });

    $("#btnSurveyTakeSubmit").click(function () {

        var hasError = false;
        try {

            var keyValues = [];
            var inpValue;
            var errorType;
            var currentDiv;
            $(".survey-key-value").each(function () {
                currentDiv = this;
                var children = $(this).children();

                var inpKey = children[_Survey_Helper.keyElemIndex];
                inpValue = children[_Survey_Helper.valueElemIndex];

                //error stuff
                $(inpValue).removeClass("survey-error");
                var errorSpan = children[_Survey_Helper.totalElemsInDiv];
                if (errorSpan) {
                    $(errorSpan).remove();
                }

                var question = $(inpKey).html();
                if (question.charAt(question.length - 1) == "*") {
                    question = question.substring(0, question.length - 2);
                }
                var answer = $(inpValue).val();

                var id = $(inpValue).attr("id");
                var parts = id.split("-");

                var type = parts[0];
                var indexNo = parseInt(parts[1]);
                var required = false;
                if (parts[2].toLowerCase() == "true") {
                    required = true;
                }

                var returnObj = { Key: question, Type: type };

                //"Text", "Number", "Decimal Number", "Currency", "Date", "Large Number"
                switch (type) {
                    case "Text":
                        {
                            if (answer == "" && required) {
                                errorType = "required";
                                throw new Error("Input required for: " + $(inpValue).attr("id"));
                            }

                            returnObj.StringValue = answer;
                        }
                        break;
                    case "Number":
                        {
                            var valid = _Survey_Helper.validateNumber(answer, currentDiv);

                            if (valid && answer != "") {
                                returnObj.IntValue = parseInt(answer);
                            }
                            else if (answer == "" && required) {
                                errorType = "required";
                                throw new Error("Input required for: " + $(inpValue).attr("id"));
                            }
                            else if (answer == "") {
                                returnObj.IntValue = null;
                            }
                            else {
                                throw new Error("Invalid numeric input: '" + answer + "' in " + $(inpValue).attr("id"));
                            }
                        }
                        break;
                    case "Decimal Number":
                        {
                            var valid = _Survey_Helper.validateDecimal(answer, currentDiv);

                            if (valid && answer != "") {
                                returnObj.DoubleValue = parseFloat(answer);
                            }
                            else if (answer == "" && required) {
                                errorType = "required";
                                throw new Error("Input required for: " + $(inpValue).attr("id"));
                            }
                            else if (answer == "") {
                                returnObj.DoubleValue = null;
                            }
                            else {
                                throw new Error("Invalid decimal input: '" + answer + "' in " + $(inpValue).attr("id"));
                            }
                        }
                        break;
                    case "Currency":
                        {
                            var valid = _Survey_Helper.validateCurrency(answer, currentDiv);

                            if (answer.charAt(0) == "$") {
                                answer = answer.substring(1);
                            }

                            if (valid && answer != "") {
                                returnObj.CurrencyValue = parseFloat(answer);
                            }
                            else if (answer == "" && required) {
                                errorType = "required";
                                throw new Error("Input required for: " + $(inpValue).attr("id"));
                            }
                            else if (answer == "") {
                                returnObj.CurrencyValue = null;
                            }
                            else {
                                throw new Error("Invalid currency input: '" + answer + "' in " + $(inpValue).attr("id"));
                            }
                        }
                        break;
                        //case "Large Number":
                        //    returnObj.LongValue = parseInt(answer);
                        //    break;
                    case "Date":
                        if (answer == "" && required) {
                            errorType = "required";
                            throw new Error("Input required for: " + $(inpValue).attr("id"));
                        }
                        else if (answer == "") {
                            returnObj.DateTimeValue = null;
                        }
                        else {
                            returnObj.DateTimeValue = answer;
                        }
                        break;
                        //default:
                        //    break;
                }

                keyValues.push(returnObj);
            });
        }
        catch (ex) {
            hasError = true;

            console.error(ex);
            $(inpValue).addClass("survey-error");

            if (errorType == "required") {
                var span = document.createElement("span");
                $(span).html("Required");
                $(span).addClass("survey-error-append");
                $(currentDiv).append(span);
            }

            errorType = "";
        }

        var postData = {};
        postData.keyValues = keyValues;
        postData.surveyModelId = parseInt(_MVCSurvey_HelperObject.surveyId);

        if (!hasError) {
            $.ajax({
                url: _MVCSurvey_HelperObject.postUrl,
                type: 'POST',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify(postData),

                success: function (d) {
                    document.location.href = _MVCSurvey_HelperObject.referrerUrl;
                },

                error: function (error) {
                    console.error(error);
                }
            });
        }

    });
});