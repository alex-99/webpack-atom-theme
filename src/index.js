import "./style/style.sass"
import * as data from "./data.js"

function setup() {
  data.dom.root = document.getElementById("app-root")
  data.dom.name = document.getElementById("name-container")
  data.dom.color = document.getElementById("color-container")
  data.dom.meta = document.getElementById("meta-container")


  data.meta.version = "";
  data.meta.description = "";
  data.meta.repositiory = "";
  data.meta.licence = "";

  for(let prop in data.meta) {
    let parent = document.createElement("div");
    parent.setAttribute("class", "option");

    
    let p = document.createElement("p");
    p.appendChild(document.createTextNode(prop + ": "));

    let input = document.createElement("input");
    input.setAttribute("type", "text");
    input.addEventListener("change", () => {
      data.meta[prop] = input.value;
      console.log(data.meta);
    });

    parent.appendChild(p);
    parent.appendChild(input);



    data.dom.meta.appendChild(parent);
  }

  data.meta.engines = {
    atom: ">0.50.0"
  }
  data.meta.private = false;
  data.meta.name = "";
  data.meta.theme = "syntax";
}

setup();
