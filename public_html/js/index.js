/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

var jpdbBaseURL="http://api.login2explore.com:5577";
var jpdbIRL="/api/irl";
var jpdbIML="/api/iml";
var stdDBName="STD-DB";
var stdRelationName="StdData";
var connToken="90931970|-31949224639664290|90962494"; //change token id

$('#stdrollno').focus();

function saveRecNo2LS(jsonObj){
    var lvData=JSON.parse(jsonObj.data);
    localStorage.setItem("recno",lvData.rec_no);
}
function geStdRollNoAsJsonObj(){
    var stdrollno=$("#stdrollno").val();
    var jsonStr={
        id:stdrollno
    };
    return JSON.stringify(jsonStr);
}
function fillData(jsonObj){
    saveRecNo2LS(jsonObj);
    var record =JSON.parse(jsonObj.data).record;
    $("#stdname").val(record.name);
    $("#stdclass").val(record.class);
    $("#stdbirthdate").val(record.birthdate);
    $("#stdaddress").val(record.address);
    $("#stdenrollmentdate").val(record.stdenrollmentdate);
}
function resetForm(){
    $('#stdrollno').val("");
    $('#stdname').val("");
    $('#stdclass').val("");
    $('#stdbirthdate').val("");
    $('#stdaddress').val("");
    $('#stdenrollmentdate').val("");
    $("#stdrollno").prop("disabled",false);
    $("#save").prop("disabled",true);
    $("#change").prop("disabled",true);
    $("#reset").prop("disabled",true);
    $("stdrollno").focus();
}
function validateData(){
    var stdrollno,stdname,stdclass,stdbirthdate,stdaddress,stdenrollmentdate;
    stdrollno= $('#stdrollno').val();
    stdname=$("#stdname").val();
    stdclass=$("#stdclass").val();
    stdbirthdate=$("#stdbirthdate").val();
    stdaddress=$("#stdaddress").val();
    stdenrollmentdate=$("#stdenrollmentdate").val();
    if(stdrollno===" "){
        alert("Student RollNo missing");
         $("#stdrollno").focus();
         return " ";
    }
    if(stdname===""){
        alert("Student Name missing");
         $("#stdname").focus();
         return " ";
    }
    if(stdclass===""){
        alert("Student Class missing");
        $("#stdclass").focus();
        return " ";
    }
    if(stdbirthdate===""){
        alert("Student Birth Date missing");
        $("#stdbirthdate").focus();
        return " ";
    }
    if(stdaddress===""){
        alert("Student Address missing");
        $("#stdaddress").focus();
        return " ";
    }
    if(stdenrollmentdate===""){
        alert("Student Enrollment Date missing");
        $("#stdenrollmentdate").focus();
        return " ";
    }
    var jsonStrObj={
        rollno:stdrollno,
        name:stdname,
        class:stdclass,
        birthdate:stdbirthdate,
        address:stdaddress,
        enrollmentdate:stdenrollmentdate
      };
      return JSON.stringify(jsonStrObj);
}
function getStd(){
    var stdRollNoJsonObj=getEmpIdAsjsonObj();
    var getRequest=createGET_BY_KEYRequest(connToken,stdDBName,stdRelationName,stdRollNoJsonObj);
    jQuery.ajaxSetup({async:false});
    var resJsonObj=executeCommandAtGivenBaseUrl(getRequest,jpdbBaseURL,jpdbIRL);
    jQuery.ajaxSetup({async:true});
    if(resJsonObj.status===400){
        $("#save").prop("disabled",false);
        $("#reset").prop("disabled",false);
        $("#stdname").focus();
    } else if(resJsonObj.status===200){
        $("stdrollno").prop("disabled",true);
        fillData(resJsonObj);
        
        $("#change").prop("disabled",false);
        $("#reset").prop("disabled",false);
        $("#stdname").focus();
    }
}
function saveData(){
    var jsonStrObj=validateData();
    if(jsonStrObj===""){
        return"";
    }
    var putRequest=createPUTRequest(connToken,jsonStrObj,stdDBName,stdRelationName);
    jQuery.ajaxSetup({async:false});
    var resJsonObj= executeCommandAtGivenBaseUrl(putRequest,jpdbBaseURL,jpdbIML);
    jQuery.ajaxSetup({async:true});
    resestForm();
    $("#stdrollno").focus();
}
function ChangeData(){
    $("#change").prop("disabled",true);
    jsonChg = validateData();
    var updateRequest= createUPDATERecordRequest(connToken,jsonChg,stdDBName,stdRelationName,localStorage.getItem("recno"));
    jQuery.ajaxSetup({async:false});
    var resJsonObj=executeCommandAtGivenBaseUrl(updateRequest,jpdbBaseURL,jpdbIML);
    jQuery.ajaxSetup({async:true});
    console.log(resJsonObj);
    resetForm();
    $("#stdrollno").focus();
}




