
export  function Task(item) {
    
    const card = document.createElement('div');
    card.classList.add('card');
    card.textContent = item.title; 

    card.draggable = true;
    card.id = item.id;

    card.ondragstart = () => {
          console.log("started" , card.id);
    }

    card.ondragend = (e) => {
    e.preventDefault()

    }

    return card
}