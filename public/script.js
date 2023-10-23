// Creating references to the text area and the submit button
const textArea = document.getElementById("text_to_summarize");
const submitButton = document.getElementById("submit-button");
const summarizedTextArea = document.getElementById("summary");

// Adding an event listener to the submit button
textArea.addEventListener("input", verifyTextLength);
submitButton.addEventListener("click", submitData);


submitButton.disabled = true;

// Function to validate text length 
function verifyTextLength(e) {

  const textarea = e.target;

  if (textarea.value.length > 200 && textarea.value.length < 100000) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
}


// Function to get the summarized text
function submitDate(e) {

 submitButton.classList.add("submit-button--loading");

 const text_to_summarize = textArea.value;

 var myHeaders = new Headers();
 myHeaders.append("Content-Type", "application/json");

 var raw = JSON.stringify({
   "text_to_summarize": text_to_summarize
 });

 var requestOptions = {
   method: 'POST',
   headers: myHeaders,
   body: raw,
   redirect: 'follow'
 };

fetch('/summarize', requestOptions)
   .then(response => response.text()) // Response will be summarized text
   .then(summary => {

    summarizedTextArea.value = summary;

    submitButton.classList.remove("submit-button--loading");
})
   .catch(error => {
     console.log(error.message);
   });
}