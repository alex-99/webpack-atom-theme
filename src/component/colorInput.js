const Picker = require('simple-color-picker');
import * as data from "../data.js"
import "./simple-color-picker.css"

export function newColorPicker(str, name) {
  let parent = document.createElement("div");
  parent.setAttribute("class", "color");


  let input = document.createElement("input");
  input.setAttribute("type", "text");
  input.value = data.colors[str];

  let p = document.createElement("p");
  p.appendChild(document.createTextNode(name + ": "))

  let picker = new Picker({
    color: str.toUpperCase(),
    el: parent,
    width: 200,
    height: 200
  });

  picker.$el.style.display = "none"


  input.addEventListener("blur", () => {
    picker.$el.style.display = "none"
  });
  input.addEventListener("focus", () => {
    picker.$el.style.display = "block"
  });

  if(name == "veryDarkGray") {
    p.appendChild(document.createTextNode(" (background color)"))
    document.body.style.backgroundColor = input.value;

    input.addEventListener("change", () => {
      setGlobalStyle(picker, input, p);
      data.colors[str] = input.value;
      picker.setColor(data.colors[str]);

    });
    picker.onChange(() => {
      setGlobalStyle(picker, input, p);
      data.colors[str] = picker.getHexString();
      input.value = data.colors[str];

    });

  } else {
    picker.onChange(() => {
      data.colors[str] = picker.getHexString();
      input.value = data.colors[str];
      input.style.color = data.colors[str];
      p.style.color = data.colors[str];
    });
    input.addEventListener("change", () => {
      data.colors[str] = input.value;
      picker.setColor(data.colors[str]);
      input.style.color = data.colors[str];
      p.style.color = data.colors[str]

    });
  }

  parent.appendChild(p);
  parent.appendChild(input);

  return parent;
}

function setGlobalStyle(picker, input, p) {
  document.body.style.backgroundColor = picker.getHexString();
  if(picker.isDark()) {
    document.body.setAttribute("class", "dark");
    input.style.color = "rgba(255, 255, 255, 0.85)";
    p.style.color = "rgba(255, 255, 255, 0.85)";
  } else {
    document.body.setAttribute("class", "light");
    input.style.color = "rgba(0, 0, 0, 0.85)";
    p.style.color = "rgba(0, 0, 0, 0.85)";
  }
}
