
export function Task(item) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.textContent = item.name;
    card.id = item.id
    card.draggable = true;


    card.ondragstart = () => {
        card.dataset.selected = true

        setTimeout(() => {
            card.classList.add('hide')

        }, 0)
    }

    card.ondragend = () => {
        delete card.dataset.selected
        card.classList.remove('hide')


    }
    return card
}