const inputAdd = document.querySelector('.add_form');
const tableWithLi = document.querySelector('.to_do_list-table');
const tableWithRemoveLi = document.querySelector('.to_do_list-table')

inputAdd.addEventListener("submit", (event) => {

    event.preventDefault();
    const inputWithText = event.target.querySelector('#add_form-input')

    const li = document.createElement("li");
    li.className = "to_do_list-One";
    li.textContent = inputWithText.value;

    const button = document.createElement("button");
    button.className = "remove-button";
    button.textContent = "[x]";

    tableWithLi.append(li);
    tableWithLi.lastChild.append(button);
    inputWithText.value = '';

})

tableWithRemoveLi.addEventListener('click', (event) => {
    if (event.target.closest(".remove-button")) {
        const liWillRemoved = event.target.closest('.to_do_list-One');
        const buttonWillRemoved = event.target;

        liWillRemoved.remove();
        buttonWillRemoved.remove();
    }
})