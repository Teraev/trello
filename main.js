
import { Task } from "./components/Todo.js";
import { getData, patchData, postData } from "./lib/http.request.js";
import { reload } from "./lib/utils.js";


const modal = document.getElementById("modal");
const open_modal = document.querySelector(".create-btn");
const span = document.querySelector(".close");
const form = document.forms.namedItem("Form");
const containers = document.querySelectorAll("[data-status]")
const name = form.querySelector('#name');
const description = form.querySelector('#description');


open_modal.onclick = () => {
  modal.style.display = "flex";
};

span.onclick = function () {
  modal.style.display = "none";
};


getData('/todos')
  .then(res => reload(res.data, Task, containers));


form.onsubmit = async (e) => {
  e.preventDefault();

  const task = {
    id: crypto.randomUUID(),
    createdAt: new Date().toLocaleString(),
  };

  const fm = new FormData(e.target)

  fm.forEach((val, key) => task[key] = val)


  const names = name.value
  const descriptions = description.value

  if (names === '' || descriptions === '') {
    alert('Заполните все поля!');
    return;
  }

  const res = await postData("/todos", task);

  if (res.status === 200 || res.status === 201) {
    getData('/todos')
      .then(res => reload(res.data, Task, containers));
  }
};


for (let container of containers) {
  const parent = container.parentElement
  container.ondragover = (e) => {
    e.preventDefault()
  }

  container.ondragenter = (e) => {
    e.preventDefault()
    parent.classList.add('hovered')
  }

  container.ondragleave = (e) => {
    parent.classList.remove('hovered')
  }

  container.ondrop = async (e) => {
    const droppinElem = document.querySelector('[data-selected]');
    console.log(droppinElem);
    container.append(droppinElem);
    parent.classList.remove('hovered');
    console.log(container);
    const res = await patchData('/todos/' + droppinElem.id); 

    if (res.id === 200 || res.id === 201) {
        droppinElem.tasks = container.getAttribute('[data-status]'); 
    }
};
}

