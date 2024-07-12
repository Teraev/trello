
import { Task } from "./component/Todo";
import { getData, postData } from "./lib/http.request";
import { reload } from "./lib/utils";


const modal = document.getElementById("modal");
const open_modal = document.querySelector(".create-btn");
const span = document.querySelector(".close");
const form = document.forms.namedItem("Form");

open_modal.onclick = () => {
  modal.style.display = "flex";
};

span.onclick = function () {
  modal.style.display = "none";
};

form.onsubmit = (e) => {
  e.preventDefault();

  const fm = new FormData(e.target);

  let todo = {
    id: crypto.randomUUID(),
    title: fm.get("name"),
    description: fm.get("description"),
    createdAt: new Date().toLocaleString(),
    status: fm.get("tasks"),
  };

  postData("todos/", todo)
    .then((res) => {
      console.log("Todo added:", res);
    })
    .catch((error) => {
      console.error("Error adding todo:", error);
    });
};



const list_headers = document.querySelectorAll('.list-header');
const cardContainers = document.querySelectorAll('.card_container');

list_headers.forEach((header, index) => {
    const status = header.textContent.trim();
    const cardContainer = cardContainers[index];
    
    getData(`todos?status=${status}`)
      .then(res => {
      console.log(res); 
      reload(res , Task , cardContainer); 
    })

    cardContainer.оndragover = (event) => {
        event.preventDefault(); 
    };

});