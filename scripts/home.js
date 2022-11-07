const listOfInput = document.querySelectorAll(".dropdown-item");

for (let input of listOfInput) {
  input.addEventListener("click", function () {
    input.parentElement.parentElement.children[0].innerHTML = input.innerHTML;
  });
}
