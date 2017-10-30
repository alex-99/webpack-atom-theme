import "./style/style.sass"
import * as data from "./data.js"
import * as colorInput from "./component/colorInput.js"
import build from "./component/build.js"

function setup() {
  data.dom.root = document.getElementById("app-root")
  data.dom.name = document.getElementById("name-container")
  data.dom.color = document.getElementById("color-container")
  data.dom.meta = document.getElementById("meta-container")


  for(let prop in data.meta) {
    let parent = document.createElement("div");
    parent.setAttribute("class", "option");

    let p = document.createElement("p");
    p.appendChild(document.createTextNode(prop + ": "));

    let input = document.createElement("input");
    input.setAttribute("type", "text");
    input.value = data.meta[prop]
    input.addEventListener("change", () => {
      data.meta[prop] = input.value;
    });



    parent.appendChild(p);
    parent.appendChild(input);

    data.dom.meta.appendChild(parent);
  }

  let button = document.createElement("button");
  button.appendChild(document.createTextNode("save"));
  button.addEventListener("click", () => {
    build();
  })
  data.dom.meta.appendChild(button)

  data.meta.engines = {
    atom: ">0.50.0"
  }
  data.meta.private = false;
  data.meta.theme = "syntax";

  for(let color in data.colors) {
    data.dom.color.appendChild(colorInput.newColorPicker(data.colors[color], color))
  }

}

setup();
