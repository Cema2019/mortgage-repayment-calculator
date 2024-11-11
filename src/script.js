// Global variables

let principal = document.getElementById("principal");
let CalculateInterest = document.getElementById("interestRate");
let calculatedPayments = document.getElementById("loanTerm");
let monthlyAmount = document.getElementById("monthly-Pay");
let totalAmount = document.getElementById("total-amount");
const mortgageTypeElements = document.querySelectorAll(
  'input[name="mortgageType"]'
);
const emptyResults = document.querySelector(".empty-results");
const completeResults = document.querySelector(".complete-results");

const calculateResults = (e) => {
  e.preventDefault();

  // Parse input values
  const principalValue = parseFloat(principal.value);
  const interestRate = parseFloat(CalculateInterest.value) / 100 / 12;
  const totalPayments = parseFloat(calculatedPayments.value) * 12;

  // Determine selected mortgage type
  const selectedMortgageType = document.querySelector(
    'input[name="mortgageType"]:checked'
  );
  if (!selectedMortgageType) {
    return; // No mortgage type selected
  }

  if (selectedMortgageType.value === "interest") {
    // Monthly interest-only payment
    const monthlyPayment = (principalValue * interestRate).toFixed(2);
    const totalInterest = (monthlyPayment * totalPayments).toFixed(2);

    // Display Results
    monthlyAmount.innerHTML = "$" + monthlyPayment;
    totalAmount.innerHTML = "$" + totalInterest;
  } else {
    // Monthly principal and interest payment calculation
    //Compute monthly Payment

    const x = Math.pow(1 + interestRate, totalPayments);
    const monthly = (principalValue * x * interestRate) / (x - 1);
    const monthlyPayment = monthly.toFixed(2);

    //Compute Total Payment

    const totalPayment = (monthly * totalPayments).toFixed(2);

    // Display Results

    monthlyAmount.innerHTML = "$" + monthlyPayment;
    totalAmount.innerHTML = "$" + totalPayment;
  }

  // Hide the empty results and show the complete results after calculation
  emptyResults.classList.add("d-none");
  completeResults.classList.remove("d-none");
  completeResults.classList.add("d-block");
};

const resetValues = (e) => {
  e.preventDefault();

  // Reset input fields
  principal.value = "";
  CalculateInterest.value = "";
  calculatedPayments.value = "";

  // Reset selected mortgage type
  mortgageTypeElements.forEach((element) => {
    element.checked = false;
    element.parentNode.style.backgroundColor = "";
  });

  // Clear displayed results
  monthlyAmount.innerHTML = "";
  totalAmount.innerHTML = "";

  // Show empty results and hide complete results
  emptyResults.classList.remove("d-none");
  completeResults.classList.remove("d-block");
  completeResults.classList.add("d-none");
};

// Highlight selected radio button
mortgageTypeElements.forEach((element) => {
  element.addEventListener("change", () => {
    mortgageTypeElements.forEach(
      (el) => (el.parentNode.style.backgroundColor = "")
    ); // Clear any previously set background color

    // Set background color for the selected option
    element.parentNode.style.backgroundColor = "yellow";
  });
});

document
  .getElementById("loan-form")
  .addEventListener("submit", calculateResults);

document.getElementById("clear-all").addEventListener("click", resetValues);