// creating data to store the object
let restaurantArray = [];

//define a constructor to create restaurant object
let RestaurantObject = function (pID, pName, pCity, pState, pURL, pCuisine, pPrice) {
    this.ID = pID;
    this.Name = pName;
    this.City = pCity;
    this.State = pState;
    this.URL = pURL;
    this.Cuisine = pCuisine;
    this.Price = pPrice;
    this.ID = Math.random().toString(16).slice(5);
}

restaurantArray.push(new RestaurantObject(1, "Cuidad", "Georgetown", "WA", "http://www.ciudadseattle.com/", "Mediteranian", "$$"));
restaurantArray.push(new RestaurantObject(2, "Pomodoro", "Seattle", "WA", "https://pomodoro.net/", "Italian", "$$"));
restaurantArray.push(new RestaurantObject(3, "Asadero Sinaloa", "Kent", "WA", "https://asaderoprime.come/", "Other", "$$$"));
console.log(restaurantArray);

let selectedCuisine = "not selected";
let selectedPrice = "not selected";

document.addEventListener("DOMContentLoaded", function () {
    createList();

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

    document.getElementById("buttonClear").addEventListener("click", function () {
        document.getElementById("name").value = "";
        document.getElementById("city").value = "";
        document.getElementById("state").value = "";
        document.getElementById("URL").value = "";
    }); 
// ////code using jQuery
    $(document).bind("change", "#select-cuisine", function (event, ui) {
        selectedCuisine = $('#select-cuisine').val();
    });

    $(document).bind("change", "#select-priceRange", function (event, ui) {
        selectedPrice = $('#select-priceRange').val();
    });

//// code that does the same thing but not using jQuery
   
    // document.getElementById("selected-cuisine").addEventListener("change", function () {
    //     selectedCuisine = $("selected-cuisine").val();
    // });

    // document.getElementById("select-cuisine").addEventListener("change", function () {
    // selectedCuisine = $("selected-cuisine").val();
    // });

    
    // document.getElementById("select-priceRange").addEventListener("change", function () {
    //     selectedPrice = $("selected-priceRange").val();
    // });

///sort by name
    document.getElementById("buttonSortName").addEventListener("click", function () {
        restaurantArray.sort(dynamicSort("name"));
        createList();
        document.location.href = "index.html#ListAll";
    });

////sort by price range
    document.getElementById("buttonSortPriceRange").addEventListener("click", function () {
        restaurantArray.sort(dynamicSort("price"));
        createList();
        document.location.href = "index.html#ListAll";
    });

    // button on details page to view restaurant's website
    document.getElementById("URL").addEventListener("click", function () {
        window.open(document.getElementById("oneURL").innerHTML);
    });
    //////end of events button


    // page before show code *************************************************************************
        // page before show code *************************************************************************
    $(document).on("pagebeforeshow", "#ListAll", function (event) {   // have to use jQuery 
        createList();
    });


    // need one for our details page to fill in the info based on the passed in ID
    $(document).on("pagebeforeshow", "#details", function (event) {   
        let restaurantID = localStorage.getItem('parm');  // get the unique key back from the dictionary
        document.getElementById("someID").innerHTML = restaurantID;


    restaurantArray = JSON.parse(localStorage.getItem('restaurantArray'));  
   
    document.getElementById("oneName").innerHTML = "Restaurant Name: " + restaurantArray[localID - 1].Name;
    document.getElementById("oneCity").innerHTML = "City: " + restaurantArray[localID - 1].City;
    document.getElementById("oneState").innerHTML = "State: " + restaurantArray[localID - 1].State;
    document.getElementById("oneWeb").innerHTML = "Website: " + restaurantArray[localID - 1].URL;
    document.getElementById("oneCuisine").innerHTML = "Cuisine: " + restaurantArray[localID - 1].Cuisine;
    document.getElementById("onePrice").innerHTML = restaurantArray[localID - 1].Price;
    
    });
 
// end of page before show code *************************************************************************

});  
// end of wait until document has loaded event  *************************************************************************


function createList() {
    //clear prior data entered
    let theList = document.getElementById("myul");
    theList.innerHTML = "";
    while (theList.firstChild) {    // remove any old data so don't get duplicates
        divMovieList.removeChild(theList.firstChild);

    
    let myUl = document.createElement('ul');

    restaurantArray.forEach(function (element, i) {
        let myLi = document.createElement("li");
        myLi.classList.add("oneRestaurant");
        myLi.innerHTML = element.ID + ":\t" + element.Name + "\t" + element.Cuisine + "\t" + element.Price + "\t";
        // use the html5 "data-parm" to store the ID of this particular restaurant object 
        myLi.setAttribute("data-parm", element.ID);
        myLi.innerHTML = oneRestaurant.ID + ":  " + oneRestaurant.Name + "  " + oneRestaurant.Price;
        myUl.appendChild(myLi);
        theList.appendChild(myLi);
    });
    theList.appendChild(myUl)

    // now we have the HTML done to display out list, 
    // next we make them active buttons
    // set up an event for each new li item
    let liList = document.getElementsByClassName("oneRestaurant");
    let newRestaurantArray = Array.from(liList);

    newRestaurantArray.forEach(function (element, i) {
        element.addEventListener("click", function() {
            let parm = this.getAttribute("data-parm");
            localStorage.setItem("parm", parm);

        // current movie array and save it to localStorage as well.
        let stringMovieArray = JSON.stringify(restaurantArray); // convert array to "string"
        localStorage.setItem('restaurantArray', stringRestaurantArray);
        document.location.href = "index.html#details";
        });
    });
};

function dynamicSort(property) {
    let sortOrder = 1;

    if (property[0] == "-") {
        sortOrder = -1;
        property = property.substr(1);
    }

    return function (a,b) {
        if (sortOrder ==-1) {
            return b[property].localeCompare(a[property]);
        } else {
            return a[property].localeCompare(b[property]);
        }
    }
}
};
