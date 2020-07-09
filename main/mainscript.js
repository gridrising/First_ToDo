function addLiOfToDo(event) {
    event.preventDefault();

    let formInput = document.getElementById("add_form-input");

    let li = document.createElement('li');
    li.className = "to_do_list-One";
    li.textContent = formInput.value;

    let button = document.createElement('button');
    button.className = "remove-button";
    button.textContent = '[x]';

    document.body.firstElementChild.firstElementChild.
    lastElementChild.lastElementChild.append(li);
    document.body.firstElementChild.firstElementChild.
    lastElementChild.lastElementChild.append(button);

    formInput.value = '';
}

function removeLi(event) {

    if (event.target.className != 'remove-button') return;

    let li = event.target.previousSibling;
    let button = event.target;

    li.remove();
    button.remove();
}
document.addEventListener('submit', addLiOfToDo);
document.addEventListener('click', removeLi);