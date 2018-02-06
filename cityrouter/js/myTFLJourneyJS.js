/* -------------------------------------------------------------------------------------

    TFL PUBLIC TRANSPORT JOURNEY PLANNER - JAVASCRIPT CODE FOR THE DEMO


------------------------------------------------------------------------------------- */

/*This is my JS for the TFL Journey Planner Practice*/

//My Variables

var getDepPC;
var getArrPC;
var myList;
var choiceOption;
var journeyDuration;
var hours;
var minutes;

//End of my Variables


document.getElementById("depPC").focus();//To give focus to an element without having to hover the mouse over, its already highlighted (departure postcode input box)

document.getElementById("googleMap").style.display = "none";//hides empty container with google maps.


//My Event Listeners

var getJourneyData = document.getElementById("mySubmit").addEventListener("click", loadMyData, false); /* When submit button is clicked loadMydata function is invoked */

var postCodeSwitch = document.getElementById("mySwitch").addEventListener("click", switchMyPostCode, false); /* When switch button is clicked switchMyPostcode function is invoked */

var routeOption1 = document.getElementById("option1").addEventListener("click", loadMyData, false); /* Default option */

var routeOption2 = document.getElementById("option2").addEventListener("click", option2Data, false);

var routeOption3 = document.getElementById("option3").addEventListener("click", option3Data, false);

//End of My Event Listenners


function loadMyData() {

    /* Goes into Dom gets input value and stores in variable */
    getDepPC = document.getElementById("depPC").value;
    getArrPC = document.getElementById("arrPC").value;
    
    /*console.log(getDepPC);*/
    //console.log(getArrPC);

    /* Ajax Request */
    var myRequest = new XMLHttpRequest(); /* Creates XMLHttpRequest object */
    
    myRequest.open("GET", "https://api.tfl.gov.uk/journey/journeyresults/" + getDepPC + "/to/" + getArrPC, true); //Prepare the request(method,url of page, true to indicate asychronous)...postcodes instead of longitude and latitude
    
    myRequest.onload = function() {
    /* When browser has received and loaded a response */
        
        if (myRequest.readyState == 4 && myRequest.status == 200) { /* If server status was ok */
            
            var myData = JSON.parse(myRequest.responseText); /* Convert JSON string data to object */
            console.log(myData);
            
            myList = document.getElementById("stepsD");
            myList.innerHTML = ""; /* Display journey summary within innerHTML */
            
            document.getElementById("messageD").innerHTML = ""; 
            
            switch(choiceOption) { //switch conditions(if its not case 1 do case 2 do case 2 if not do default)
                    
                    case(1):
                    
                    document.getElementById("startDT").innerHTML = "Date: " + myData.journeys[1].startDateTime.replace("T", " | Time: ");
                    /* Displays Departure date and time */
                     document.getElementById("arrivalDT").innerHTML = "Date: " + myData.journeys[1].arrivalDateTime.replace("T", " | Time: ");
                    /* Displays arrival date and time */
                    
                    journeyDuration = myData.journeys[1].duration;

                    journeyD(journeyDuration);
                    
                    for ( var i = 0; i < myData.journeys[1].legs.length; i++) {
                
                    myList.innerHTML += "- " + myData.journeys[1].legs[i].instruction.summary + "<br />";
                    }
                    /* Display journey summary */
                    
                    choiceOption = 0;//reset to zero- default case
                    
                    break;
                    
                    case(2):
                    
                    document.getElementById("startDT").innerHTML = "Date: " + myData.journeys[2].startDateTime.replace("T", " | Time: ");
                    /* Display departure date and time for option 2 */
                    
                    document.getElementById("arrivalDT").innerHTML = "Date: " + myData.journeys[2].arrivalDateTime.replace("T", " | Time: ");
                    /* Display arrival date and time for option 2 */
                    
                    journeyDuration = myData.journeys[2].duration;

                    journeyD(journeyDuration);
                    
                    for ( var i = 0; i < myData.journeys[2].legs.length; i++) {
                
                    myList.innerHTML += "- " + myData.journeys[2].legs[i].instruction.summary + "<br />";
                    }
                    /* Display journey summary */
                    
                    choiceOption = 0;
                    
                    break;
                    
                    
                default:
              
                    document.getElementById("startDT").innerHTML = "Date: " + myData.journeys[0].startDateTime.replace("T", " | Time: ");
                    
                    document.getElementById("arrivalDT").innerHTML = "Date: " + myData.journeys[0].arrivalDateTime.replace("T", " | Time: ");
                    
                    journeyDuration = myData.journeys[0].duration;
                    
                    journeyD(journeyDuration);

                    for ( var i = 0; i < myData.journeys[0].legs.length; i++) {
                
                    myList.innerHTML += "- " + myData.journeys[0].legs[i].instruction.summary + "<br />";
                        
                    }
                    
                    break;
            }
            
                    document.getElementById("googleMap").style.display = "block";
                    /* Google Maps */
            
                    /*document.getElementById("myGoogleMap").setAttribute("src", "https://www.google.com/maps/embed/v1/directions?key=AIzaSyDqwEMrYspWHOIjkw2EIX9vGwpb8IsL_o8&origin="+getDepPC+"&destination="+getArrPC+"&mode=driving");//enter your own api key (between key=...&)*/
			
					document.getElementById("myGoogleMap").setAttribute("src", "https://www.google.com/maps/embed/v1/directions?key=AIzaSyDqwEMrYspWHOIjkw2EIX9vGwpb8IsL_o8&origin="+getDepPC+"&destination="+getArrPC+"&mode=driving");//enter your own api key (between key=...&)

            } else if ( getDepPC === "" || getArrPC === "") {
                
                    initialS();//cleaning all containers(empty)
                
                    document.getElementById("depPC").focus();
                    document.getElementById("messageD").innerHTML = "Please enter a POSTCODE";    
                    
                    /*document.getElementById("googleMap").style.display = "none";*/
                    
                    
            } else if ( getDepPC !== "" && getArrPC !== "") {
                
                    initialS()    
                
                    document.getElementById("depPC").focus();
                    document.getElementById("messageD").innerHTML = "WRONG POSTCODE OR NOT KNOWN";  
                    
                    /*document.getElementById("googleMap").style.display = "none";*/
            }
            
        }
            
 
    myRequest.onerror = function() {
        
        document.getElementById("messageD").innerHTML = "You are not connected online and can't reach the server!";
    }
    
    myRequest.send();
    
        /*}*/
   
}

function initialS() {
    
        document.querySelectorAll("journeyD, startDT, arrivalDT, stepsD").innerHTML = "";
    
        /*document.getElementById("journeyD").innerHTML = "";
        document.getElementById("startDT").innerHTML = "";
        document.getElementById("arrivalDT").innerHTML = "";
        document.getElementById("stepsD").innerHTML = "";*/
        document.getElementById("googleMap").style.display = "none";
}

function switchMyPostCode() {
    
    //alert("Yes is working!");
    
    getDepPC = document.getElementById("depPC").value;
    getArrPC = document.getElementById("arrPC").value;
    
    document.getElementById("depPC").value = getArrPC;
    document.getElementById("arrPC").value = getDepPC;
    
    //console.log(getDepPC);
    //console.log(getArrPC);
}

function option2Data() {
    
    choiceOption = 1;
    
    loadMyData();//calling data
    
}

function option3Data() {
    
    choiceOption = 2;
    
    loadMyData();//calling data
    
}

function journeyD(journeyDuration){
  hours = Math.trunc(journeyDuration/60);
  minutes = journeyDuration % 60;//modules- reminder
  document.getElementById("journeyD").innerHTML = + hours + ":" + minutes + " h/m";
}

