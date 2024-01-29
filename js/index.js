
/*
class test {
   
    constructor(){
       this. start()    
    }
    async start(){
        let api='https://www.themealdb.com/api/json/v1/1/categories.php';
        let data=await this.fetchData(api)
        console.log(data);
    }
    async fetchData(api){
        let respo=await fetch(api);
        respo= await respo.json();     
        return respo.categories;
    }
}

let y=new test();

  
  */

async function displayByName(temp) {
    closeNav ()
    $('.test').html("");
    loadSmall()

    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${temp}`)
    data = await data.json()


    if (data.meals) {
        displayMyMeals(data.meals) ;
    }
    else{
    displayMyMeals([]);
    }
    

 }
 async function displayByFirLet(temp){

    closeNav ()
    $('.test').html("");
    $('.contact-us').html("")
    loadSmall()

    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${temp}`)
    data = await data.json()

    if (data.meals) {
        displayMyMeals(data.meals) ;
    }
    else{
    displayMyMeals([]);
    }
 }


 function displayMyMeals(array) {
    let container=``;
    for (let i = 0; i < array.length; i++) {
        container+=`
        <div class="col-md-3 mt-4">
        <div onclick="getMealDetail('${array[i].idMeal}')" class="my-pics position-relative overflow-hidden">
            <img class="w-100" src="${array[i].strMealThumb}" alt="${array[1].strMeal}">
            <div class="my-imgCover position-absolute d-flex align-items-center justify-content-center">
                <h3 class="text-center">${array[i].strMeal}</h3>              
            </div>
        </div>
    </div>
        `       
    }
    $('.test').html(container)
 }
 async function getMealDetail(id) {
    
    $('.test').html("");
    closeNav();


    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        data = await data.json();

    displayMealDetails(data.meals[0])
    loadSmall();

}

function displayMealDetails(mealDetail) {
    
    $('.test').html("");


    let concatIngredents = ``

    /**
     * strIngredient{i}
     * strIngredient{i+1}
     * strIngredient{i+2}
     * ......
     */
    for (let i = 1; i <= 9; i++) {
        if (mealDetail[`strIngredient${i}`]) {
            concatIngredents += `<li class="concated-colors alert ">${mealDetail[`strMeasure${i}`]} ${mealDetail[`strIngredient${i}`]}</li>`
        }
    }

    let concatTag = mealDetail.strTags?.split(",")
    
    if (!concatTag) concatTag = []

    let tagsStr = ''
    for (let i = 0; i < concatTag.length; i++) {
        tagsStr += `
        <li class="red-txt alert alert-danger m-2 p-1">${concatTag[i]}</li>`
    }



    let container = `
    <div class="col-md-4 whi-color">
                <img class="w-100 rounded-2" src="${mealDetail.strMealThumb}"
                    alt="${mealDetail.strMeal}">
                    <h2 class="mt-3 text-center">${mealDetail.strMeal}</h2>
            </div>
            <div class="col-md-8 whi-color">
                <h2>Instructions</h2>
                <p>${mealDetail.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${mealDetail.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${mealDetail.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class=" d-flex  flex-wrap">
                    ${concatIngredents}
                </ul>

                <h3 class="whi-color">Tags :</h3>
                <ul class=" d-flex  flex-wrap justify-content-start ">
                    ${tagsStr}
                </ul >
                <div class="ms-4 whi-color">
                <a target="_blank" href="${mealDetail.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${mealDetail.strYoutube}" class="btn btn-danger">Youtube</a>
                </div>

            </div>`

            $('.test').html(container)
}

async function getCatogery() {
    $('.test').html("");
    $('.my-search').html("");

     let data = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    data = await data.json();

    displayCatogery(data.categories)
    loadSmall();


}

function displayCatogery(catogData) {
    let strCategoryDescription;
    let container=``;
    for (let i = 0; i < catogData.length; i++) {
        strCategoryDescription=catogData[i].strCategoryDescription.split(" ").slice(0,20).join(" ")
        container+=`
        <div class="col-md-3 mt-4">
        <div onclick="getCatogeryMeals('${catogData[i].strCategory}')" class="my-pics position-relative overflow-hidden">
            <img class="w-100" src="${catogData[i].strCategoryThumb}" alt="${catogData[i].strCategory}">
            <div class="my-imgCover position-absolute flex-wrap d-flex align-items-center justify-content-center text-center">
                <h3 class="text-center">${catogData[i].strCategory}</h3>
                <p>${strCategoryDescription}<\p>
            </div>
        </div>
    </div>
        `       
    }
    $('.test').html(container)
}

async function getCatogeryMeals(catogName) {
    $('.test').html("");
    $('.my-search').html("");
    $('.contact-us').html("")

     let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${catogName}`);
    data = await data.json();

    console.log(data);
    displayMyMeals(data.meals)
    loadSmall();

}


async function getAreas() {
    $('.test').html("");
    $('.my-search').html("");

     let data = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    data = await data.json();

    displayAreas(data.meals)
    loadSmall();
}
   function displayAreas(arrayAreas){ 
    let container=``;
    for (let i = 0; i < arrayAreas.length; i++) {
        container+=`
        <div class="col-md-3 mt-4">
        <div onclick="getAreaMeals('${arrayAreas[i].strArea}')" class="my-areas my-pics position-relative overflow-hidden text-center">
            <i class="fa-solid fa-house-laptop fa-4x"></i>
                <h3 class="text-center">${arrayAreas[i].strArea}</h3>
        </div>
    </div>
        `       
    }
    $('.test').html(container)
    } 

   async function getAreaMeals(areaName) {
        $('.test').html("");
        $('.my-search').html("");
        $('.contact-us').html("")
    
         let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`);
        data = await data.json();
    
        displayMyMeals(data.meals)
        loadSmall();   
    }



    async function getIngredients() {
    $('.test').html("");
    $('.my-search').html("");

     let data = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    data = await data.json();

    displayIngredients(data.meals)
    loadSmall();
    }
    function displayIngredients(arrayIngredients){
        let strDescription;
        let container=``;
        for (let i = 0; i < arrayIngredients.length; i++) {
            /**chech if data = null >>> cause error */
            if(arrayIngredients[i].strDescription){
                strDescription=arrayIngredients[i].strDescription.split(" ").slice(0,20).join(" ");
            }
            else{
                strDescription="";
            }
            container+=`
            <div class="col-md-3 mt-4">
            <div onclick="getIngredientsMeals('${arrayIngredients[i].strIngredient}')" class="my-areas my-pics position-relative overflow-hidden text-center">
                    <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                    <h3 class="text-center">${arrayIngredients[i].strIngredient}</h3>
                    <p>${strDescription}<\p>
            </div>
        </div>
            `    
            
        }
        $('.test').html(container)
        
    }
    async function getIngredientsMeals(IngredientName){
        $('.test').html("");
        $('.my-search').html("");
        $('.contact-us').html("")
    
         let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${IngredientName}`);
        data = await data.json();
    
        displayMyMeals(data.meals)
        loadSmall();   
    }



    function showSearchInput() {
        $('.test').html(' ');
        $('.my-search').html("");
        $('.contact-us').html("")
        

        $('.my-search').html(`
        <div class="row py-3">
        <div class="col-md-6">
            <input onkeyup="displayByName(this.value)"  type="text" id="Search-Name" class="form-control my-input" placeholder="Search By Name" aria-label="First name">
        </div>
        <div class="col-md-6">
            <input onkeyup="displayByFirLet(this.value)" type="text" id="Search-Letter" class="form-control my-input" placeholder="Search By First Letter" aria-label="First name">
        </div>
    </div>
    `)
    }

    /**
     *small loading screen
     */
    $('.search-li').click(function () {
        showSearchInput();
        closeNav();
    })
    $('.categories-li').click(function () {
        getCatogery();
        closeNav();

    })
    $('.area-li').click(function () {
        getAreas();
        closeNav();

    })
    $('.ingredients-li').click(function () {
        getIngredients();
        closeNav();

    })
    $('.contact-li').click(function () {
        showContactInput();
        closeNav();

    })


    function loadSmall() {
        $('.loading').css('z-index' ,'2005');
        $('.loading').fadeIn(300);      
        $('.loading').fadeOut(300);
        $('.loading').css('z-index' ,'2000')
    }



 
    /*! main loading screen */
    $(document).ready(function () {
        displayByName("")
        $('.loading').fadeOut(500);
        $('body').css('overflow','visible')

    });
    function openNav () { 
        $('.main-nav').css('z-index' ,'999999999999999999');
    $('.main-nav').animate({ left:'0px'},500)
    $(".open-close-icon").removeClass("fa-align-justify");
    $(".open-close-icon").addClass("fa-x");
    let counter=500;
    for (let i = 0; i < 5; i++) {
        /**
         * eq(0)===>1
         * eq(1)===>2
         * eq(2)===>3
         * eq(3)===>4
         * eq(4)===>5
        */
        $(".my-list li").eq(i).animate({
            top: 0
        }, counter)
        counter+=100;
    }
    }

    function closeNav () {
        /*????
        //let leftnav=$('.left-nav').outerWidth()
        // console.log(leftnav);
        //leftnav ?>>> 256.562 px;
        */
         $('.main-nav').animate({ left:'-256.562px'},500)
         $(".open-close-icon").removeClass("fa-x");
         $(".open-close-icon").addClass("fa-align-justify");
         $(".my-list li").animate({
            top: 300
        }, 500)
    }
    $('.main-ico').click(function () {
        if ($(".main-nav").css("left") == "0px") {
        closeNav();
        }
        else{
            openNav();
        }
      })


      function showContactInput() {
        $('.test').html(' ');
        $('.my-search').html("");
        document.querySelector('.mohab').classList.add('hh-100' );
        $('.contact-us').html(`
        <div class="col-md-6 mb-4">
        <input id="name" oninput="myValidatin()" placeholder="Enter Your Name" class="form-control my-inputt" type="text">
        <p class="name-err d-block p-3 w-100 error-inputt mt-2 rounded-2 text-center">Special characters and numbers not allowed</p>
    </div>
    <div class="col-md-6 mb-4">
        <input id="email"oninput="myValidatin()" placeholder="Enter Your Email" class="form-control my-inputt" type="email">
        <p class="email-err d-block p-3 w-100 error-inputt mt-2 rounded-2 text-center">Email not valid *exemple@yyy.zzz</p>
    </div>
    <div class="col-md-6 mb-4">
        <input id="phone" oninput="myValidatin()" placeholder="Enter Your Phone" class="form-control my-inputt" type="text">
        <p class="phone-err d-block p-3 w-100 error-inputt mt-2 rounded-2 text-center">Enter valid Phone Number</p>
    </div>
    <div class="col-md-6 mb-4">
        <input id="age" oninput="myValidatin()" placeholder="Enter Your Age" class="form-control my-inputt" type="number">
        <p class="age-err d-block p-3 w-100 error-inputt mt-2 rounded-2 text-center">Enter valid age</p>
    </div>
    <div class="col-md-6 mb-4">
        <input id="password" oninput="myValidatin()" placeholder="Enter Your Password" class="form-control my-inputt" type="password">
        <p class="password-err d-block p-3 w-100 error-inputt mt-2 rounded-2 text-center">Enter valid password *Minimum eight characters, at least one letter and one number:*</p>
    </div>
    <div class="col-md-6 mb-4">
        <input id="repassword" oninput="myValidatin()" placeholder="Repassword" class="form-control my-inputt" type="password"> 
        <p class="repassword-err d-block p-3 w-100 error-inputt mt-2 rounded-2 text-center">Enter valid repassword</p>
    </div>
    <div class="col-md-12 mb-4 d-flex justify-content-center">
        <button id="special-btn" type="button" class="btn btn-outline-danger disabled">Submit</button>
    </div>
    `)
    }


  function myValidatin() {

    if (validateName()) {
        document.querySelector(".name-err").classList.replace("d-block", "d-none"); 
    }
    else{
        document.querySelector(".name-err").classList.replace("d-none","d-block" ) ;  
    }


    if (validateEmail()) {
        document.querySelector(".email-err").classList.replace("d-block", "d-none");  
    }
    else{
        document.querySelector(".email-err").classList.replace("d-none","d-block" ) ;  
    }


    if (validatePhone()) {
        document.querySelector(".phone-err").classList.replace("d-block", "d-none");
    }
    else{
        document.querySelector(".phone-err").classList.replace("d-none","d-block" ) ;   
    }


    if (validatePassword()) {
        document.querySelector(".password-err").classList.replace("d-block", "d-none");  
    }
    else{
        document.querySelector(".password-err").classList.replace("d-none","d-block" ) ;  
    }


    if (validateRePassword()) {
        document.querySelector(".repassword-err").classList.replace("d-block", "d-none");  
    }
    else{
        document.querySelector(".repassword-err").classList.replace("d-none","d-block" ) ;  
    }
    if (validateAge()) {
        document.querySelector(".age-err").classList.replace("d-block", "d-none"); 
    }
    else{
        document.querySelector(".age-err").classList.replace("d-none","d-block" ) ;  
    }

    if (
        validateName()
        &&validateEmail()
        &&validatePhone()
        &&validatePassword()
        &&validateRePassword()
        &&validateAge()
    ) {
        document.querySelector("#special-btn").classList.remove("disabled"); 
        
    }
    else{
        document.querySelector("#special-btn").classList.add("disabled");
    }
    
  }


function validateName() {
    
    let nVal=$('#name').val();
    let nregex=/^[A-z]{3,}$/
    if (nregex.test(nVal)) {
         
        return true;
    }
    else{

        return false;
    }  
}
function validateEmail() {
    let eVal=$('#email').val();
    let eregex=/^[A-z]\w{4,15}@[A-z]{3,7}(\.)[A-z]{2,5}$/;
    if (eregex.test(eVal)) {
        return true;
    }
    else{
        return false;
    }  
}

function validatePhone() {
    let phoVal=$('#phone').val();
    console.log(phoVal);
    let phoregex=/^(\+2|2)?0[125][0-9]{9}$/;
    if (phoregex.test(phoVal)) {
        return true;
    }
    else{
        return false;
    }  
}
function validatePassword() {
    let PasswordVal=$('#password').val();
    let Passwordregex=/^\w{8,20}$/;
    if (Passwordregex.test(PasswordVal)) {
        return true;
        
    }
    else{
        return false;
    }  
    
    
}
function validateRePassword() {
    if ($('#password').val()===$('#repassword').val()) {

        return true; 
    }
    else{

        return false;
    }
}

function validateAge() {
    let age=$('#age').val()
    if(age>5&&age<100){
        return true;
    }
    else{
        return false;
    }
}















