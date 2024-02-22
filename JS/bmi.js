$(document).ready(function() {
  $("form").submit(function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Retrieve the values of the inputs
    const imperialFt = parseFloat($("#imperial-height-ft").val());
    const imperialIn = parseFloat($("#imperial-height-in").val());
    const imperialWeight = parseFloat($("#imperial-weight-ibs").val().trim());

    console.log("imperialWeight type:", typeof imperialWeight);
    console.log("imperialFt type:", typeof imperialFt);
    console.log("imperialIn type:", typeof imperialIn);

    // Check if any input value is NaN or empty
    if (isNaN(imperialFt) || isNaN(imperialIn) || isNaN(imperialWeight)) {
      console.log("Invalid input values");
      return; // Exit the function early if any input is invalid
    }

    // Perform the BMI calculation
    const heightInInches = imperialFt * 12 + imperialIn;

    // Check if height is zero
    if (heightInInches === 0) {
      console.log("Height cannot be zero");
      return; // Exit the function early if height is zero
    }

    const bmi = calculateBMI(imperialWeight, heightInInches);

    // Set the BMI result to the input field
    $("#bmi-results").val(isNaN(bmi) ? "Invalid input" : bmi.toFixed(1)); // If BMI is NaN, set "Invalid input" to the input field
    console.log(bmi)
  
    if (bmi < 18.9){
      $("#bmi-interpretation").html("You are under weight (BMI 18.9 or less).<br> A healthy BMI is between 18.9 and 24.9 ")
    }else if(bmi > 18.9 && bmi <= 24.9){
      $("#bmi-interpretation").html("You are a healthy weight.<br> A healthy BMI is a bmi between 18.9 and 24.9")
    }else if(bmi >= 25 && bmi <= 29.9){
      $("#bmi-interpretation").html("You are a overweight (bmi between 25-29.9).<br> A health bmi is between 18.9 and 24.9")
    }else{ 
      $("#bmi-interpretation").html("You fall into the obese category (bmi or 30 or greater).<br> A healthy bmi is a bmi between 18.9 and 24.9")
    }
  });
});

// Function to calculate BMI
function calculateBMI(weight, height) {
  // BMI formula: weight (kg) / (height (m))^2
  // 1 pound = 0.453592 kg
  // 1 inch = 0.0254 meters
  const weightInKg = weight * 0.453592;
  const heightInMeters = height * 0.0254;

  // Check if weight or height is not a number or height is zero
  if (isNaN(weightInKg) || isNaN(heightInMeters) || heightInMeters === 0) {
    return NaN;
  }

  return weightInKg / (heightInMeters * heightInMeters);
}
