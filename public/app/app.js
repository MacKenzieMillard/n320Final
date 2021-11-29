// var RECIPES = [
//     { 
//         recipeName: newRecipeName,
//         recipeItems: [
//             {
//             recipeImg: newRecipeImg,
//             recipeDescription: newRecipeDescription,
//             recipeTime: newRecipeTime,
//             recipeServings: newRecipeServings,
//             ingredients: [
//                 newRecipeIngredients
//             ],
//             instructions: [
//                 newRecipeInstructions
//             ],
//             },
//         ],
//     },
// ];

var _db = "";
var userExist = false;
var userFullName = "";
var _userProfileInfo = {};

function changeRoute() {
    let hashTag = window.location.hash;
    let pageID = hashTag.replace("#", "");
    console.log(hashTag + " " + pageID);
    
    if (pageID != "") {
        $.get(`pages/${pageID}/${pageID}.html`, function(data) {
        // console.log("data" + data);
        $("#app").html(data);
    });}
    else {
        $.get(`pages/home/home.html`, function(data) {
            // console.log("data" + data);
            $("#app").html(data);
    });}    
}

function initURLListener() {
    window.onhashchange = changeRoute;
    $(window).on("hashchange", changeRoute);
    changeRoute();
}

function addMainRecipe(){
    let newRecipeName = $("#recipeName").val();
    let newRecipeImg = $("#recipeImg").val();
    let newRecipeDescription = $("#recipeDescription").val();
    let newRecipeTime = $("#recipeTime").val();
    let newRecipeServings = $("#recipeServings").val();
    let newRecipeIngredients = $("#ingredient").val();
    let newRecipeInstructions = $("#instruction").val();
    let newRecipeObj = { 
        recipeName: newRecipeName,
        recipeItems: [
            {
            recipeImg: newRecipeImg,
            recipeDescription: newRecipeDescription,
            recipeTime: newRecipeTime,
            recipeServings: newRecipeServings,
            ingredients: [
                newRecipeIngredients
            ],
            instructions: [
                newRecipeInstructions
            ],
            },
        ],
    };

    $("#recipeImg").html(newRecipeImg);
    $("#recipeName").html(newRecipeImg);
    $("#recipeDescription").html(newRecipeDescription);
    $("#recipeTime").html(newRecipeTime);
    $("#recipeServings").html(newRecipeServings);
    $("#recipeIngredients").html(newRecipeIngredients);
    $("#recipeInstructions").html(newRecipeInstructions);

    _userProfileInfo.lists.push(newRecipeObj);
    // i don't why this isn't working it says push is undefined ?????
    updateUserInfo(_userProfileInfo);
    loadData();
    $("#recipeName").val();
}

function deleteItem(listIndex, index) {
    _userProfileInfo.lists.newRecipeObj.splice(index, 1);
    loadRecipeItems(listIndex);
}

function loadRecipeItems(listIndex) {
    let listString = `<button onclick="loadData()">BACK</button><ul>`;
    $.each(_userProfileInfo.lists[listIndex].newRecipeObj, function (index, listItem) {
        listString += `
        <li id="${index}" class="${listItem.checked ? "strike": ""}">
        <input ${listItem.checked ? (checked = "checked"): ""} type="checkbox" id="${index}" name="${listItem.name}" onclick="itemChecked(this, ${listIndex}, ${index})">
        <span>${listItem.name}</span>
        <span class="delete" onclick="deleteItem(${listIndex}, ${index})">DELETE</span> 
        </li>`;
    });
    listString += `</ul>
    <div class="addItemInput"> 
    <input id="addItem" type="text">
    <button onclick="addItem(${listIndex})">ADD ITEM</button>
    </div>`;
    $("#app").html(listString);
}

function loadData() {
    let listString = "<ul>";
    $.each(_userProfileInfo.lists, function(index, list) {
        listString += `<li id="${index}" onclick="loadRecipeItems(${index})">${list.name} 
        <span class="right">Items: ${list.newRecipeObj.length}</span>
        </li>`;
    });
    listString += "</ul>";
    $("#app").html(listString);
}

function updateUserInfo(userObj){
    let id = firebase.auth().currentUser.uid;
    _db.collection("Users").doc(id).update(userObj).then(() => {
    console.log("updated doc");
    }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("update error" + errorMessage);
      });
}

function initListeners() {
    // $("nav .links a").click(function(e){
    //     let btnID = e.currentTarget.id;
    //     // console.log("click" + btnID);
    //     // MODEL.changePageContent(btnID)
    // })

    $(".bars").click(function(e){
        $(".bars").toggleClass("active");
        $(".links").toggleClass("active");
    });

    $(".links a").click(function(e){
        $(".bars").toggleClass("active");
        $(".links").toggleClass("active");
    });

    
}

function initFirebase() {
    firebase.auth().onAuthStateChanged((user) => {
        if(user){
            _db = firebase.firestore();
            console.log("auth change logged in");
            if(user.displayName){
                $(".name").html(user.displayName);
            }
            $("#signOutBtn").prop("disabled", false);
            userExists = true;
        }else{
            _db = "";
            _userProfileInfo = {};
            $("#app").empty();
            console.log("auth change logged out");
            $(".name").html("");
            $("#signOutBtn").prop("disabled", true);
            userExists = false;
            userFullName = "";
        }
    });
}

function login() {
    let email = $("#log-email").val();
    let pass = $("#log-pw").val();

    firebase
        .auth()
        .signInWithEmailAndPassword(email, pass)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            console.log("logged in");
            $("#log-email").val("");
            $("#log-pw").val("");
            // these two make the input bars empty once logged in so the email and pass aren't just sitting there even after logging in

            _db
                .collection("Users")
                .doc(user.uid)
                .get()
                .then((doc) => {
                    _userProfileInfo = doc.data(); 
                    // stores data locally after logging in
                    loadData();
                    console.log("login userinfo ", _userProfileInfo);
                })
                .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log("logged in error " + errorMessage);
            });
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("logged in error " + errorMessage);
  });
}

function signUpAlert(){
    alert("Congrats! You've signed up!");
}

function createRecipeAlert(){
    alert("Congrats! You've made a recipe!");
}

function createAccount() {
    let fName = $("#fName").val();
    let lName = $("#lName").val();
    let email = $("#email").val();
    let pass = $("#pw").val();
    let fullName = fName + " " + lName;
    let userObj = {
        firstName: fName,
        lastName: lName,
        email: email,
        lists: [newRecipeObj],
    }

    console.log("create " + fName + " " + lName + " " + email + " " + pass);
    signUpAlert();

    firebase
        .auth()
        .createUserWithEmailAndPassword(email, pass)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            console.log("account created");
            
            firebase.auth().currentUser.updateProfile({
                displayName: fullName,
            });

            _db
                .collection("Users")
                .doc(user.uid)
                .set(userObj)
                .then((doc) => {
                console.log("doc added");
                _userProfileInfo = userObj;
                console.log("create userinfo ", _userProfileInfo)
                // grabs info from userObj/the form and stores it locally
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log("create account error " + errorMessage);
            });

            userFullName = fullName;
            $(".name").html(userFullName);
            $("#fName").val("");
            $("#lName").val("");
            $("#email").val("");
            $("#pw").val("");
            // these two make the input bars empty once logged in so the email and pass aren't just sitting there even after logging in
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("create account error " + errorMessage);
            // ..
  });

}

function signIn() {
    firebase.auth().signInAnonymously()
  .then(() => {
    console.log("Signed in");
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log("Error signing in" + errorMessage);
  });
}

function signOut() {
    firebase
        .auth()
        .signOut()
        .then(() => {
            console.log("signed out");
            $("#signOutBtn")
        })
        .catch((error) => {
            console.log("error signing out");
        });
}


$(document).ready(function() {
    try{
        let app = firebase.app();
        initFirebase();
        initListeners();
        initURLListener();
    } catch(error){
        console.log("error ", error);
    };

    // MODEL.changePageContent("home");
});