let tasks = [];

let imgDone, imgEdit, imgTrash;
let output = document.getElementById('output')

imgDone = `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-square" viewBox="0 0 16 16">
  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
  <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z"/>
</svg>
`
imgEdit = `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
</svg>
`
imgTrash = `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash2-fill" viewBox="0 0 16 16">
  <path d="M2.037 3.225A.703.703 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2a.702.702 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671L2.037 3.225zm9.89-.69C10.966 2.214 9.578 2 8 2c-1.58 0-2.968.215-3.926.534-.477.16-.795.327-.975.466.18.14.498.307.975.466C5.032 3.786 6.42 4 8 4s2.967-.215 3.926-.534c.477-.16.795-.327.975-.466-.18-.14-.498-.307-.975-.466z"/>
</svg>
`


const addTodo = () => {
    const input = document.getElementById('inp')
    const todo = {
        id: tasks.length + 1,
        name: input.value,
        completed: false,
    }

    tasks.push(todo)
    input.value = ''
    renderTodos()
}

const renderTodos = () => {
    output.innerHTML = '';
    tasks.forEach(element => {
        const card = document.createElement('div')
        const title = document.createElement('h3')
        const btns = document.createElement('div')
        const done = document.createElement('button')
        const edit = document.createElement('button')
        const trash = document.createElement('button')

        card.classList = (element.completed == true) ? 'active' : 'card'
        title.innerHTML = element.name
        done.innerHTML = imgDone
        edit.innerHTML = imgEdit
        trash.innerHTML = imgTrash

        btns.append(done, edit, trash)
        card.append(title, btns)
        output.append(card)

        done.addEventListener('click', () => {
            element.completed = !element.completed
            renderTodos()

        })
        edit.addEventListener('click', () => {
            let ask = confirm('Действительно хотите заменить запись?')
            if (ask == true) {
                let record = prompt('Введите задачу')
                element.name = record
            }
            renderTodos()
        })
        trash.addEventListener('click', () => {
            tasks = tasks.filter(item => {
                if (item.id != element.id) {
                    return true
                }
            })
            console.log(element.id);
            renderTodos()
        })



    })
}

let addTask = document.getElementById('btnAdd')
addTask.addEventListener('click', (addTodo))

