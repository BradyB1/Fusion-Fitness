// Define your API key
const apiKey = "iWjX0bq+v09QWNAhhhABfA==KXhinApfAWQDnQg3";

document.addEventListener('DOMContentLoaded', function() {
  // Function to handle form submission
  function getWorkout(event) {
    console.log("getWorkout function called"); // Log to indicate the function is called
    event.preventDefault(); // Prevent default form submission behavior

    // Specify the muscle group to retrieve exercises for
    var muscle = 'biceps';

    // Make fetch request to the Exercises API
    fetch('https://api.api-ninjas.com/v1/exercises?muscle=' + muscle, {
      method: 'GET',
      headers: {
        'X-Api-Key': apiKey // Include API key in the request headers
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      displayResults(data); // Call displayResults function with the retrieved data
    })
    .catch(error => {
      console.error('Error:', error); // Log error if fetch request fails
    });
  }

  // Function to display the results on the page
  function displayResults(exercises) {
    var resultsDiv = document.getElementById('exerciseResults'); // Get reference to the results container
    resultsDiv.innerHTML = ''; // Clear previous results

    // Loop through each exercise and append its name to the results container
    exercises.forEach(function(exercise) {
      var p = document.createElement('p');
      p.textContent = exercise.name;
      resultsDiv.appendChild(p);
    });
  }

  // Attach event handler to form submission
  document.getElementById('exerciseForm').addEventListener('submit', getWorkout);
});
