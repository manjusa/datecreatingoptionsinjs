function createDateFromDateAndTime(date, time, dateSplitter, timeSplitter) {
    var fd = $("#" + date).val().split(dateSplitter);
    var ft=[];
    if ($("#" + time).val().length == 0) {
        ft[0] = "00";
        ft[1] = "00";
    }
    else {
        ft= $("#" + time).val().split(timeSplitter);
    }
    var date = new Date(+fd[2], fd[1] - 1, +fd[0], ft[0], ft[1]);// PFM-1877-MS  creates date in DD/MM/YYYY format
    return date;
}
function IsStartDateGreaterThanEndDate(sdt, edt) {
    if (sdt > edt)
        return true;
    else
        return false;
}
function isDateValid(dateVal) {
    if (dateVal.length == 10 || dateVal.length == 9) {       
        var expectedDateFormat = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
        if (dateVal.match(expectedDateFormat)) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }

}

function isTimeValid(timeVal) {     
    var timeMask = '^(0[0-9]|1[0-9]|2[0-3])[:]([0-5][0-9])$';
    if (timeVal.match(timeMask)) {
        return true;
    }
    else {
        return false;
    }
}

function blankOutEndDateOrEndTimeField() {
    var startDateLen = $("#startdateinputid").val().toString().length;
    var endDateLen = $("#enddateinputid").val().toString().length;
    var startTimeLen = $("#starttimeid").val().toString().length;
    var endTimeLen = $("#endtimeid").val().toString().length;
    var flag = false;   
    if ((startDateLen == 10 || startDateLen == 9) && (endDateLen == 10 || endDateLen == 9) && startTimeLen == 5 && endTimeLen >=0 ) {
        var startDateTime = createDateFromDateAndTime('startdateinputid', 'starttimeid', '/', ':');
        var endDateTime = createDateFromDateAndTime('enddateinputid', 'endtimeid', '/', ':');
        flag = IsStartDateGreaterThanEndDate(startDateTime, endDateTime);
        if ($("#startdateinputid").val().toString() != $("#enddateinputid").val().toString()) {//state date and end date are different
            if (flag) {
                $("#enddateinputid").val("");
            }
        }
        else {//state date and end date are same.Same Day
            if (flag) {
                if (endTimeLen == 5)//Also, ET length checking 5 to see if it matches 12:12 format
                    $("#endtimeid").val("");
            }
        }       

    }
}

function enableDisableRelatedFields(curr,fields) {
    var validValue = false;      
    for (var i = curr; i < fields.length; i++) {
        validValue = false;
        var val = $("#" + fields[i]).val().toString().trim();
        if (fields[i] == "startdateinputid" || fields[i] == "enddateinputid") {
            if (isFilled(val) && isDateValid(val)) {
                validValue = true;
            }
        }
        if (fields[i] == "starttimeid" || fields[i] == "endtimeid") {
            if (isFilled(val) && isTimeValid(val)) {
                validValue = true;
            }
        }
        if (validValue) {
            $("#" + fields[i + 1]).attr("disabled", false);
        }
        else {
            for (var k = i + 1; k < fields.length; k++) {
                $("#" + fields[k]).attr("disabled", true);
            }
            break;
        }
    }  
    var isDisabled = $('#enddateinputid').prop('disabled');
    var isETDisabled = $('#endtimeid').prop('disabled');
    if (isDisabled) {
        $('#enddateinputid').parent().children('span').css("pointer-events", "none");
    }
    else {
        $('#enddateinputid').parent().children('span').css("pointer-events", "auto");
    }

    if(isETDisabled){
        $("#save").attr("disabled",true);
    }
    else{
        var endTimeVal=$('#endtimeid').val().toString();
        if(endTimeVal.toString().length==5 && isTimeValid(endTimeVal)){
            $("#save").attr("disabled",false);
        }
        else{
            $("#save").attr("disabled",true);
        }
    }
}            

function isFilled(x){
    if(x.trim().length>0){
        return true;
    }
    else{
        return false;
    }
}

