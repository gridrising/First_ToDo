const inputAdd = document.querySelector('.add_form');
inputAdd.addEventListener("submit", (event) => {

    event.preventDefault();
    const inputWithText = event.target.querySelector('#add_form-input')

    const li = document.createElement("li");
    li.className = "to_do_list-One";
    li.textContent = inputWithText.value;

    const button = document.createElement("button");
    button.className = "remove-button";
    button.textContent = "[x]";

    const tableWithLi = document.querySelector('.to_do_list-table');
    tableWithLi.append(li);
    tableWithLi.append(button);

})
const tableWithRemoveButtons = document.querySelector('.to_do_list-table')
tableWithRemoveButtons.addEventListener('click', (event) => {
    if (event.target.closest(".remove-button")) {
        const liWillRemoved = event.target.previousSibling;
        const buttonWillRemoved = event.target;

        liWillRemoved.remove();
        buttonWillRemoved.remove();
    }
})