document.getElementById("loan-form").addEventListener("submit", function(e){
    //hide results
    document.getElementById("results").style.display = "none";
    //show loader
    document.getElementById("loading").style.display = "block";
    setTimeout(calculateResults, 2000);

    e.preventDefault();
});

//calculate results
function calculateResults(){
    //UI vars
    const amount = document.querySelector("#amount");
    const interest = document.querySelector("#interest");
    const years = document.querySelector("#years");
    const monthly_payment = document.querySelector("#monthly-payment");
    const total_payment = document.querySelector("#total-payment");
    const total_interest = document.querySelector("#total-interest");

    const principle = parseFloat(amount.value);
    const calculated_interest = parseFloat(interest.value) / 100 / 12;
    const calculated_payments = parseFloat(years.value) * 12;

    //calculate monthly payment
    const x = Math.pow(1+calculated_interest, calculated_payments);
    const monthly = (principle*x*calculated_interest)/(x-1);

    if(isFinite(monthly)){
        monthly_payment.value = monthly.toFixed(2);
        total_payment.value = (monthly*calculated_payments).toFixed(2);
        total_interest.value = ((monthly*calculated_payments)-principle).toFixed(2);
        //show results
        document.getElementById("results").style.display = "block";
        //hide loader
        document.getElementById("loading").style.display = "none";
    }else{
        showError("please check your numbers");
    }

}

//show error
function showError(error){
    //hide results
    document.getElementById("results").style.display = "none";
    //hide loader
    document.getElementById("loading").style.display = "none";
    //get elements
    const card = document.querySelector(".card");
    const heading = document.querySelector(".heading");
    //create div
    const errorDiv = document.createElement("div");
    //add class
    errorDiv.className = "alert alert-danger";
    //create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));
    //insert this div above heading
    card.insertBefore(errorDiv, heading);
    //clear error after 3 sec
    setTimeout(clearError, 3000);
}

//clear error
function clearError(){
    document.querySelector(".alert").remove();
}