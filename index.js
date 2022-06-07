// creating data to store the object
let restaurantArray = [];

//define a constructor to create restaurant object
let RestaurantObject = function (pName, pCity, pState, pURL, pCuisine, pPrice) {
    this.Name = pName;
    this.City = pCity;
    this.State = pState;
    this.URL = pURL;
    this.Cuisine = pCuisine;
    this.Price = pPrice;
    this.ID = Math.random().toString(16).slice(5);
    // this.ID = restaurantArray.length +1;
}

restaurantArray.push(new RestaurantObject("Cuidad", "Georgetown", "WA", "http://www.ciudadseattle.com/", "Mediteranian", "$$"));
restaurantArray.push(new RestaurantObject("Pomodoro", "Seattle", "WA", "https://pomodoro.net/", "Italian", "$$"));
restaurantArray.push(new RestaurantObject("Asadero Sinaloa", "Kent", "WA", "https://asaderoprime.come/", "Other", "$$$"));
console.log(restaurantArray);

let selectedCuisine = "not selected";
let selectedPrice = "not selected";

document.addEventListener("DOMContentLoaded", function () {
    //createList();

    //add button events 
    //Add Restaurant info
    document.getElementById("buttonAdd").addEventListener("click", function () {
        restaurantArray.push(new RestaurantObject(document.getElementById("name").value),
        document.getElementById("city").value, 
        document.getElementById("state".value),
        document.getElementById("URL").value),
        selectedCuisine;
        selectedPrice;
        document.location.href= "index.html#ListAll";
    });

    //clear button
    document.getElementById("buttonClear").addEventListener("click", function () {
        document.getElementById("name").value = "";
        document.getElementById("city").value = "";
        document.getElementById("state").value = "";
        document.getElementById("URL").value = "";
    }); 

// ////code using jQuery
//     $(document).bind("change", "#select-cuisine", function (event, ui) {
//         selectedCuisine = $('#select-cuisine').val();
//     });

//     $(document).bind("change", "#select-priceRange", function (event, ui) {
//         selectedPrice = $('#select-priceRange').val();
//     });

////code that does the same thing but not using jQuery
    document.getElementById("select-cuisine").addEventListener("change", function () {
        selectedCuisine = $("#select-cuisine").val();
    });

    document.getElementById("select-priceRange").addEventListener("change", function () {
        selectedPrice = $("#select-priceRange").val();
    });

///sort by name
    document.getElementById("buttonSortName").addEventListener("click", function () {
        restaurantArray.sort(dynamicSort("Name"));
        createList();
        document.location.href = "index.html#ListAll";
    });

////sort by price range
    document.getElementById("buttonSortPriceRange").addEventListener("click", function () {
        restaurantArray.sort(dynamicSort("Price"));
        createList();
        document.location.href = "index.html#ListAll";
    });


//// button for the website on DETAILS PAGE
    document.getElementById("URL").addEventListener("click", function () {
        window.open(document.getElementById("oneURL").innerHTML);
    });
    //////end of events button


    // PAGE BEFORE SHOW   *************************************************************************
    $(document).on("pagebeforeshow", "#ListAll", function (event) {   // have to use jQuery 
        createList();
    });


    // need one for our details page to fill in the info based on the passed in ID
    $(document).on("pagebeforeshow", "#details", function (event) {   
        let localID = localStorage.getItem('parm');  // get the unique key back from the dictionary
        document.getElementById("someID").innerHTML = localID;

    restaurantArray = JSON.parse(localStorage.getItem("restaurantArray"));  
   
    document.getElementById("oneName").innerHTML = "Restaurant Name: " + restaurantArray[localID - 1].Name;
    document.getElementById("oneCity").innerHTML = "City: " + restaurantArray[localID - 1].City;
    document.getElementById("oneState").innerHTML = "State: " + restaurantArray[localID - 1].State;
    document.getElementById("oneWeb").innerHTML = "Website: " + restaurantArray[localID - 1].URL;
    document.getElementById("oneCuisine").innerHTML = "Cuisine: " + restaurantArray[localID - 1].Cuisine;
    document.getElementById("onePrice").innerHTML = restaurantArray[localID - 1].Price;
    });
 
// END OF PAGE BEFORE SHOW CODE *************************************************************************

});  
// end of wait until document has loaded event  *************************************************************************


function createList() {
    //clear prior data entered
    let theList = document.getElementById("myul");
    theList.innerHTML = "";
    
    restaurantArray.forEach(function (oneRestaurant, i) {
        let myLi = document.createElement("li");
        myLi.classList.add("oneRestaurant");
        myLi.innerHTML = oneRestaurant.Name + "\t " + oneRestaurant.Cuisine + "\t " + oneRestaurant.Price + "\t ";

        // use the html5 "data-parm" to store the ID of this particular restaurant object 
        myLi.setAttribute("data-parm", oneRestaurant.ID);
        theList.appendChild(myLi);
    });
    //mustVisitList.appendChild(myUl)

    // now we have the HTML done to display out list, 
    // next we make them active buttons
    // set up an event for each new li item
    let liList = document.getElementsByClassName("oneRestaurant");

    ////create an array of elements from thee "List", array supports forEach, HTMLCollection doesnt
    let newRestaurantArray = Array.from(liList);

    //add event method for each "li"
    newRestaurantArray.forEach(function (element, i) {
        element.addEventListener("click", function() {
            let parm = this.getAttribute("data-parm");
            localStorage.setItem("parm", parm);
            
            //convert array to "string"
            let stringRestaurantArray = JSON.stringify(restaurantArray);
            localStorage.setItem("restaurantArray", stringRestaurantArray);

            //will jump to page that will use on item
            document.location.href = "index.html#details";
        });
    });
};

function dynamicSort(property) {
    return function (a,b) {
        return a[property].localeCompare(b[property]);
        }
};
