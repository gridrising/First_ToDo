const inputAdd = document.querySelector('.add_form');
const inputWithText = inputAdd.querySelector('#add_form-input');
const tableWithLi = document.querySelector('.to_do_list-table');
const filterForm = document.querySelector('#filter_form-radio');
const searchForm = document.querySelector('.search_form');
const searchFormInput = document.querySelector('.search_form-input');
const sortedByAll = document.querySelector('#sorted-by-all');
const sortedByCompleted = document.querySelector('#sorted-by-completed');
const sortedByUncompleted = document.querySelector('#sorted-by-uncompleted');
const createLi = () => {
    const li = document.createElement("li");
    li.classList.add("to_do_list-One");
    li.textContent = inputWithText.value;
    if (sortedByCompleted.checked) {
        li.style = 'display:none';
    }
    return li;
}
const createButton = () => {
    const button = document.createElement("button");
    button.classList.add("remove-button");
    button.textContent = "[x]";
    return button;
}
const removeLi = (eventTarget) => {
    const liWillRemoved = eventTarget.closest('li');
    liWillRemoved.remove();
}
const removeButton = (eventTarget) => {
    eventTarget.remove();
}
const showListOfLiIfCompleted = (arrayWithLiUncompleted, arrayWithLiCompleted) => {
    arrayWithLiUncompleted.forEach((item) => {
        item.classList.add('to_do_list-One-hidden');
    })
    arrayWithLiCompleted.forEach((item) => {
        item.classList.remove('to_do_list-One-hidden');
    })
}
const showListOfLiIfUnCompleted = (arrayWithLiCompleted, arrayWithLiUncompleted) => {
    arrayWithLiCompleted.forEach((item) => {
        item.classList.add('to_do_list-One-hidden');
    })
    arrayWithLiUncompleted.forEach((item) => {
        item.classList.remove('to_do_list-One-hidden');
    })
}
const createListOfCompleted = () => {
    const arrayWithLi = tableWithLi.querySelectorAll('li');
    const listOfLi = [].filter.call(arrayWithLi, (item) => {
        return item.classList.contains('to_do_list-One-completed')
    })
    return listOfLi;
}
const createListOfUncompleted = () => {
    const arrayWithLi = tableWithLi.querySelectorAll('li');
    const listOfLi = [].filter.call(arrayWithLi, (item) => {
        return !(item.classList.contains('to_do_list-One-completed'));
    })
    return listOfLi;
}
const showAllLi = () => {
    const arrayWithLi = tableWithLi.querySelectorAll('li');
    arrayWithLi.forEach((item) => {
        item.classList.remove('to_do_list-One-hidden')
    })
}
const chooseWhichListOfLiShow = () => {
    if (sortedByCompleted.checked) {
        showListOfLiIfCompleted(createListOfUncompleted(), createListOfCompleted());
    } else {
        showListOfLiIfUnCompleted(createListOfCompleted(), createListOfUncompleted());
    }
}
const filterByText = (textValueOfLi, filter, oneLi) => {
    if (textValueOfLi.indexOf(filter) != -1) {
        oneLi.classList.remove('to_do_list-One-hidden')
    } else {
        oneLi.classList.add('to_do_list-One-hidden')
    }
}
const makeSearchWithFilter = (textValueOfLi, filter, oneLi) => {
    switch (true) {
        case sortedByAll.checked:
            filterByText(textValueOfLi, filter, oneLi);
            break;
        case sortedByCompleted.checked:
            if (oneLi.classList.contains('to_do_list-One-completed')) {
                filterByText(textValueOfLi, filter, oneLi);
            }
            break;
        case sortedByUncompleted.checked:
            if (!oneLi.classList.contains('to_do_list-One-completed')) {
                filterByText(textValueOfLi, filter, oneLi);
            }
            break;
    }
}
inputAdd.addEventListener("submit", (event) => {
    event.preventDefault();
    tableWithLi.append(createLi());
    tableWithLi.lastChild.append(createButton());
    inputWithText.value = '';
})
tableWithLi.addEventListener('click', (event) => {
    if (event.target.closest(".remove-button")) {
        removeLi(event.target);
        removeButton(event.target);
    }
})
tableWithLi.addEventListener('click', (event) => {
    // Make Li completed or not;
    event.target.classList.toggle('to_do_list-One-completed');
})
filterForm.addEventListener('change', (event) => {
    sortedByAll.checked ? showAllLi() : chooseWhichListOfLiShow();
    searchFormInput.value = '';
})
searchForm.addEventListener('input', (event) => {
    event.preventDefault();
    const allListOfLi = tableWithLi.querySelectorAll('li');
    const filter = event.target.value.toLowerCase();
    allListOfLi.forEach((oneLi) => {
        let textValueOfLi = oneLi.textContent.toLowerCase() || oneLi.innerText.toLowerCase();
        makeSearchWithFilter(textValueOfLi, filter, oneLi);
    })
})
