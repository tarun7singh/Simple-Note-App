// variable for storing data and colors
var data = {
  notes: [],
  currentColor: "#ffffff",
};

// button colors
var colors = [
  "#ffffff",
  "#f28b82",
  "#fbbc04",
  "#fff475",
  "#ccff90",
  "#a7ffeb",
  "#cbf0f8",
  "#aecbfa",
  "#d7aefb",
  "#fdcfe8",
  "#e6c9a8",
  "#e8eaed",
];

// listener for enter key
document.querySelector(".addtext").addEventListener("keyup", (e) => {
  if (event.keyCode === 13) {
    e.preventDefault();
    addNote();
  }
});

// listener for submit button
document.querySelector("#submit").addEventListener("click", () => {
  addNote();
});

// listener to change color
document.querySelectorAll(".colors button").forEach((button) => {
  button.addEventListener("click", () => {
    changeColor();
  });
});

// function for adding new note to the list
var addNote = () => {
  if (document.querySelector(".addtext").value !== "") {
    let value = document.querySelector(".addtext").value;
    document.querySelector(".addtext").value = "";
    data.notes.push(value);
    renderElement();
    updateStorage();
  }
};

// function for changing color
var changeColor = () => {
  document.querySelectorAll(".note, .addNote, .colorDiv").forEach((note) => {
    if (event.srcElement.style.background !== undefined) {
      note.style.background = event.srcElement.style.background;
      data.currentColor = event.srcElement.style.background;
      updateStorage();
    } else {
      note.style.background = data.currentColor;
    }
  });
};

// function for rendering elements to the page
var renderElement = () => {
  let note = document.querySelectorAll(".note");
  note.forEach((i) => {
    i.outerHTML = "";
  });
  for (let i in data.notes) {
    let note = document.createElement("div");
    note.className = "note";

    let text = document.createElement("input");
    text.contentEditable = "true";
    text.addEventListener("change", () => {
      data.notes[i] = text.value;
      updateStorage();
    });
    text.value = data.notes[i];
    note.appendChild(text);

    button = document.createElement("button");
    button.className = "delete";
    button.innerHTML = "Trash";
    button.addEventListener("click", () => {
      data.notes.splice(i, 1);
      renderElement();
      updateStorage();
    });
    note.appendChild(button);

    document
      .querySelector(".container")
      .insertBefore(note, document.querySelector(".colorDiv"));
  }
  document.querySelectorAll(".note, .addNote, .colorDiv").forEach((note) => {
    note.style.background = data.currentColor;
  });
};

// function for updating local storage
var updateStorage = () => {
  localStorage.data = JSON.stringify(data);
};

// Event listener for updating and adding stuff after page load
window.addEventListener("load", () => {
  if (localStorage.data) {
    data = JSON.parse(localStorage.data);
  } else {
    data.notes = [
      "You can add notes",
      "Delete notes",
      "Edit notes",
      "Change color",
      "All changes are stored in local storage",
    ];
  }
  var i = 0;
  document.querySelectorAll(".colors button").forEach((button) => {
    button.style.background = colors[i];
    i += 1;
  });
  renderElement();
});
