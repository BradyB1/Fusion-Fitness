// Function to calculate BMI for imperial units
function calculateBMIImperial(weight, heightFt, heightIn) {
  // Convert height to inches
  const heightInches = heightFt * 12 + heightIn;
  // BMI formula for imperial units: (weight in pounds / (height in inches * height in inches)) * 703
  return (weight / (heightInches * heightInches)) * 703;
}

// Function to calculate BMI for metric units
function calculateBMIMetric(weight, heightCm) {
  // Convert height to meters
  const heightMeters = heightCm / 100;
  // BMI formula for metric units: weight in kilograms / (height in meters * height in meters)
  return weight / (heightMeters * heightMeters);
}

$(document).ready(function() {
  $("form").submit(function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Retrieve the values of the inputs
    const measurementSystem = $("input[name='measurement']:checked").val();
    let weight, height, bmi;

    if (measurementSystem === "imperial") {
      const imperialWeight = parseFloat($("#imperial-weight-ibs").val().trim());
      const imperialFt = parseFloat($("#imperial-height-ft").val());
      const imperialIn = parseFloat($("#imperial-height-in").val());

      // Check if any input value is NaN or empty
      if (isNaN(imperialFt) || isNaN(imperialIn) || isNaN(imperialWeight)) {
        console.log("Invalid input values");
        return; // Exit the function early if any input is invalid
      }

      // Perform the BMI calculation for imperial units
      bmi = calculateBMIImperial(imperialWeight, imperialFt, imperialIn);
    } else if (measurementSystem === "metric") {
      const metricWeight = parseFloat($("#metric-weight-kg").val().trim());
      const metricHeight = parseFloat($("#metric-height-cm").val());

      // Check if any input value is NaN or empty
      if (isNaN(metricWeight) || isNaN(metricHeight)) {
        console.log("Invalid input values");
        return; // Exit the function early if any input is invalid
      }

      // Perform the BMI calculation for metric units
      bmi = calculateBMIMetric(metricWeight, metricHeight);
    }

    // Set the BMI result to the input field
    $("#bmi-results").val(isNaN(bmi) ? "Invalid input" : bmi.toFixed(1));

    // Interpret BMI
    if (bmi < 18.5) {
      $("#bmi-interpretation").text("You are Underweight (18.9 BMI or less)");
    } else if (bmi >= 18.5 && bmi < 24.9) {
      $("#bmi-interpretation").text("Normal weight");
    } else if (bmi >= 24.9 && bmi < 29.9) {
      $("#bmi-interpretation").text("Overweight");
    } else {
      $("#bmi-interpretation").text("Obesity");
    }
  });

  // Toggle form visibility when measurement selection changes
  $("input[name='measurement']").change(function() {
    const selectedValue = $(this).val();
    if (selectedValue === "metric") {
      $(".imperial-form").hide();
      $(".metric-form").show();
    } else {
      $(".metric-form").hide();
      $(".imperial-form").show();
    }
  });
});