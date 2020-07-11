const inputAdd = document.querySelector('.add_form');
const tableWithLi = document.querySelector('.to_do_list-table');
const tableWithRemoveLi = document.querySelector('.to_do_list-table')
const filterForm = document.querySelector('#filter_form-radio')
const searchForm = document.querySelector('.search_form')
const searchFormInput = document.querySelector('.search_form-input')
const sortedByAll = document.querySelector('#sorted-by-all')
const sortedByCompleted = document.querySelector('#sorted-by-completed');


inputAdd.addEventListener("submit", (event) => {

    event.preventDefault();
    const inputWithText = event.target.querySelector('#add_form-input')

    const li = document.createElement("li");
    li.className = "to_do_list-One";
    li.textContent = inputWithText.value;
    if (sortedByCompleted.checked){
        li.style = 'display:none';
    }

    const button = document.createElement("button");
    button.className = "remove-button";
    button.textContent = "[x]";

    tableWithLi.append(li);
    tableWithLi.lastChild.append(button);
    inputWithText.value = '';

})

tableWithRemoveLi.addEventListener('click', (event) => {
    if (event.target.closest(".remove-button")) {
        let liWillRemoved;
        if (event.target.closest('.to_do_list-One')) {
            liWillRemoved = event.target.closest('.to_do_list-One');
        } else {
            liWillRemoved = event.target.closest('.to_do_list-One-completed');
        }
        const buttonWillRemoved = event.target;

        liWillRemoved.remove();
        buttonWillRemoved.remove();
    }
})

tableWithLi.addEventListener('click', (event) => {
    if (event.target.closest('.to_do_list-One')) {
        event.target.className = 'to_do_list-One-completed';
    }
})

filterForm.addEventListener('change', (event) => {
    if (event.target.closest('#sorted-by-all')) {
        for (let oneLi of tableWithLi.querySelectorAll('li')) {
            if (oneLi.style.display === 'none') {
                oneLi.style = 'display:';
            }
        }
    } else if (event.target.closest('#sorted-by-completed')) {
        for (let oneLi of tableWithLi.querySelectorAll('li')) {
            if (oneLi.className === 'to_do_list-One-completed') {
                oneLi.style = 'display:';
            } else {
                oneLi.style = 'display:none';
            }
        }

    } else if (event.target.closest('#sorted-by-uncompleted')) {
        for (let oneLi of tableWithLi.querySelectorAll('li')) {
            if (oneLi.className === 'to_do_list-One') {
                oneLi.style = 'display:';
            } else {
                oneLi.style = 'display:none';
            }
        }

    }
    searchFormInput.value = '';
})

searchForm.addEventListener('input', (event) => {

    event.preventDefault();

    const allListOfLi = tableWithLi.querySelectorAll('li');
    const filter = event.target.value.toLowerCase();

    for (let oneLi of allListOfLi) {
        let textValueOfLi = oneLi.textContent || oneLi.innerText;
        textValueOfLi = textValueOfLi.toLowerCase();
        if (sortedByAll.checked) {
            if (textValueOfLi.indexOf(filter) > -1) {
                oneLi.style = "display:";
            } else {
                oneLi.style = "display:none";
            }
        } else {
            if (sortedByCompleted.checked) {
                console.log(oneLi);
                if (oneLi.closest('.to_do_list-One-completed')) {
                    if (textValueOfLi.indexOf(filter) > -1) {
                        oneLi.style = "display:";
                    } else {
                        oneLi.style = "display:none";
                    }
                }
            } else {
                console.log(oneLi);
                if (oneLi.closest('.to_do_list-One')) {
                    if (textValueOfLi.indexOf(filter) > -1) {
                        oneLi.style = "display:";
                    } else {
                        oneLi.style = "display:none";
                    }
                }
            }
        }
    }
})
