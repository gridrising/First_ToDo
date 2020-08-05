const addToDoForm = document.querySelector(".add_form");
const textOfAddToDoForm = addToDoForm.querySelector("#add_form-input");
const tableWithToDo = document.querySelector(".to_do_list-table");
const arrayWithToDo = [];
const filterForm = document.querySelector(".filter_form-radio");
const listOfFilterButtons = filterForm.querySelectorAll(".filter_form-button");
const searchFormInput = document.querySelector(".search_form-input");
const sortedByAll = document.querySelector("#sorted-by-all");
const sortedByCompleted = document.querySelector("#sorted-by-completed");
const sortedByUncompleted = document.querySelector("#sorted-by-uncompleted");
let filterCurrentButton = sortedByAll;

const createToDo = () => {
  const toDo = `<li class="to_do_list-One">${textOfAddToDoForm.value}<div class="remove-button">[x]</div></li>`;
  return toDo;
};
const removeToDo = (eventTarget) => {
  eventTarget.closest("li").remove();
  eventTarget.remove();
};
const pressFilterButton = (eventTarget) => {
  listOfFilterButtons.forEach((item) => {
    if (item === eventTarget) {
      item.classList.add("filter_form-button-pressed");
    } else {
      item.classList.remove("filter_form-button-pressed");
    }
  });
  filterCurrentButton = eventTarget;
};
const showListOfCompleted = (arrayWithLiUncompleted, arrayWithLiCompleted) => {
  arrayWithLiUncompleted.forEach((item) =>
    item.classList.add("to_do_list-One-hidden")
  );
  arrayWithLiCompleted.forEach((item) =>
    item.classList.remove("to_do_list-One-hidden")
  );
};
const showListOfUncompleted = (
  arrayWithLiCompleted,
  arrayWithLiUncompleted
) => {
  arrayWithLiCompleted.forEach((item) =>
    item.classList.add("to_do_list-One-hidden")
  );
  arrayWithLiUncompleted.forEach((item) =>
    item.classList.remove("to_do_list-One-hidden")
  );
};
const createListOfCompleted = () => {
  return arrayWithToDo.filter((item) =>
    item.classList.contains("to_do_list-One-completed")
  );
};
const createListOfUncompleted = () => {
  return arrayWithToDo.filter(
    (item) => !item.classList.contains("to_do_list-One-completed")
  );
};
const showAllToDo = () => {
  arrayWithToDo.forEach((item) =>
    item.classList.remove("to_do_list-One-hidden")
  );
};
const chooseWhichListShow = () => {
  if (filterCurrentButton === sortedByCompleted) {
    showListOfCompleted(createListOfUncompleted(), createListOfCompleted());
  } else {
    showListOfUncompleted(createListOfCompleted(), createListOfUncompleted());
  }
};
const filterByText = (textValueOfToDo, filter, oneToDo) => {
  if (textValueOfToDo.includes(filter)) {
    oneToDo.classList.remove("to_do_list-One-hidden");
  } else {
    oneToDo.classList.add("to_do_list-One-hidden");
  }
};
const makeSearchWithFilter = (textValueOfToDo, filter, oneToDo) => {
  switch (filterCurrentButton) {
    case sortedByAll:
      filterByText(textValueOfToDo, filter, oneToDo);
      break;
    case sortedByCompleted:
      if (oneToDo.classList.contains("to_do_list-One-completed")) {
        filterByText(textValueOfToDo, filter, oneToDo);
      }
      break;
    case sortedByUncompleted:
      if (!oneToDo.classList.contains("to_do_list-One-completed")) {
        filterByText(textValueOfToDo, filter, oneToDo);
      }
      break;
    default:
      break;
  }
};
// listener for adding new toDo
addToDoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  tableWithToDo.insertAdjacentHTML("beforeEnd", createToDo());
  arrayWithToDo.push(tableWithToDo.lastChild);
  textOfAddToDoForm.value = "";
});
// listener for deleting toDo
tableWithToDo.addEventListener("click", (event) => {
  if (event.target.closest(".remove-button")) {
    removeToDo(event.target);
    removeButton(event.target);
  }
});
// listener for changing state of toDo
tableWithToDo.addEventListener("click", (event) => {
  event.target.classList.toggle("to_do_list-One-completed");
});
// listener for filter of state
filterForm.addEventListener("click", (event) => {
  pressFilterButton(event.target);
  filterCurrentButton === sortedByAll ? showAllToDo() : chooseWhichListShow();
  searchFormInput.value = "";
});
tableWithToDo.addEventListener("click", (event) => {
  filterCurrentButton === sortedByAll ? showAllToDo() : chooseWhichListShow();
  searchFormInput.value = "";
});
// listener for search with filter
searchFormInput.addEventListener("input", (event) => {
  const filter = event.target.value.toLowerCase();
  arrayWithToDo.forEach((oneToDo) => {
    const textValueOfToDo = oneToDo.textContent.toLowerCase();
    makeSearchWithFilter(textValueOfToDo, filter, oneToDo);
  });
});
