const refs = {
  search: document.querySelector("#searchInput"),
  list: document.querySelector("#list"),
  addBtn: document.querySelector("#add-btn"),
  newItemInput: document.querySelector("#new__item-text"),
  expBtn: document.querySelector("#export-btn"),
};

let items = [
  {
    id: 1,
    text: "Купити Лимони",
    isCompleted: false,
  },
  {
    id: 2,
    text: "Почистити Апельсин",
    isCompleted: false,
  },
  {
    id: 3,
    text: "Повністю вивчити JavaScript",
    isCompleted: false,
  },
];

let lastId = items[items.length - 1].id;

function addItem(text) {
  lastId++;

  const newItem = {
    id: lastId,
    text,
    isCompleted: false,
  };

  items.push(newItem);

  return newItem;
}

function createItem(item) {
  const listItemElem = document.createElement("li");
  listItemElem.dataset.itemid = item.id;
  listItemElem.className =
    "box is-flex is-align-items-center is-justify-content-space-between js-list-item";

  const leftDiv = document.createElement("div");
  leftDiv.className = "is-flex is-align-items-center";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "checkbox mr-2 js-item-checkbox";
  checkbox.checked = item.isCompleted;

  const textP = document.createElement("p");
  textP.textContent = item.text;

  leftDiv.append(checkbox, textP);

  const actionsElem = document.createElement("div");

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "button is-medium is-danger js-delete-btn";
  deleteBtn.textContent = "Delete";

  actionsElem.append(deleteBtn);

  listItemElem.append(leftDiv, actionsElem);

  return listItemElem;
}

function renderItems(filteredItems) {
  refs.list.innerHTML = "";
  for (const item of filteredItems) {
    const itemElem = createItem(item);
    refs.list.append(itemElem);
  }
}

renderItems(items);

function updateItem(itemId, isCompleted) {
  items = items.map((item) => {
    if (item.id === itemId) {
      return { ...item, isCompleted };
    }
    return item;
  });

  renderItems(items);
}

refs.search.addEventListener("input", (e) => {
  const inputText = e.currentTarget.value;

  const filteredItems = [];
  for (const item of items) {
    const match = item.text.toLowerCase().includes(inputText.toLowerCase());
    if (match) {
      filteredItems.push(item);
    }
  }
  renderItems(filteredItems);
});

function handelAdd() {
  const text = refs.newItemInput.value;

  addItem(text);
  renderItems(items);
  refs.newItemInput.value = "";
}

function deleteItem(itemId) {
  items = items.filter((item) => item.id !== itemId);
  renderItems(items);
}

function handleDeleteClick(e) {
  const listItemElem = e.target.closest(".js-list-item");
  const itemId = Number(listItemElem.dataset.itemid);
  deleteItem(itemId);
}

refs.list.addEventListener("click", (e) => {
  if (e.target.classList.contains("js-delete-btn")) {
    handleDeleteClick(e);
  }
});

refs.addBtn.addEventListener("click", handelAdd);

function handleCheckboxChange(e) {
  const checked = e.target.checked;
  const listItemElem = e.target.closest(".js-list-item");
  const itemId = Number(listItemElem.dataset.itemid);
  updateItem(itemId, checked);
}

refs.list.addEventListener("click", (e) => {
  if (e.target.classList.contains("js-item-checkbox")) {
    handleCheckboxChange(e);
  }
});

refs.expBtn.addEventListener("click", () => {
  console.log(items);
});

function handleKeyDown(e) {
  if (e.code === "KeyS" && e.ctrlKey) {
    e.preventDefault();
    handelAdd();
  }
}

function setupShortCuts() {
  window.removeEventListener("keydown", handleKeyDown);
  window.addEventListener("keydown", handleKeyDown);
}

setupShortCuts();
