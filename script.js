const refs = {
  search: document.querySelector("#searchInput"),
  list: document.querySelector("#list"),
  addBtn: document.querySelector("#add-btn"),
  newItemInput: document.querySelector("#new__item-text"),
  expBtn: document.querySelector("#export-btn"),
};

const items = [
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
  listItemElem.className =
    "box is-flex is-align-items-center is-justify-content-space-between";

  const leftDiv = document.createElement("div");
  leftDiv.className = "is-flex is-align-items-center";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "checkbox mr-2";

  checkbox.addEventListener("click", () => {
    const index = items.findIndex((i) => i.id === item.id);
    items[index].isCompleted = checkbox.checked;
  });

  const textP = document.createElement("p");
  textP.textContent = item.text;

  leftDiv.append(checkbox, textP);

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "button is-medium is-danger";
  deleteBtn.textContent = "Delete";

  deleteBtn.addEventListener("click", () => {
    const index = items.findIndex((i) => i.id === item.id);
    items.splice(index, 1);

    listItemElem.remove();
  });

  listItemElem.append(leftDiv, deleteBtn);
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

refs.addBtn.addEventListener("click", () => {
  const text = refs.newItemInput.value;

  addItem(text);
  renderItems(items);
  refs.newItemInput.value = "";
});

refs.expBtn.addEventListener("click", () => {
  console.log(items);
});
