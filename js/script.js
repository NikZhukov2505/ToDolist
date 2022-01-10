let tasks = [];

// if (localStorage.getItem('todo') != null) {
//     tasks = JSON.parse(localStorage.getItem('todo'));
// }

let imgDone, imgEdit, imgTrash;
let output = document.getElementById('output');
let i = 0;





imgDone = `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-square" viewBox="0 0 16 16">
  <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z"/>
  <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
</svg>
`

imgEdit = `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
</svg>
`

imgTrash = `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
</svg>
`

const addTodo = () => {
    const input = document.getElementById('inp')
    i = 0
    if (input.value == '') {
        alert('Напиши что либо!!')
    } else {
        const todo = {
            id: tasks.length + 1,
            name: input.value,
            completed: false
        }
        tasks.push(todo)

        input.value = ''
    }
    addToLocalStorage()
}

const renderTodos = () => {
    output.innerHTML = ''

    tasks.forEach(element => {
        const card = document.createElement('div')
        const title = document.createElement('h3')
        const btns = document.createElement('div')
        btns.classList = 'btns'
        const done = document.createElement('button')
        done.classList = 'done'
        const edit = document.createElement('button')
        edit.classList = 'edit'
        const trash = document.createElement('button')
        trash.classList = 'trash'


        let style = window.getComputedStyle(output)
        style = +style.height.slice(0, -2)

        done.addEventListener('click', () => {
            i++
            element.completed = !element.completed
            addToLocalStorage()
        })

        if (element.id == tasks.length && i == 0 && tasks.length != 1 && element.completed != true) {
            card.classList = 'newCard card'
            card.animate([
                // keyframes
                {
                    position: 'absolute',
                    top: `${style + 100}px`,
                },
                {
                    top: `${style + 200}px`,
                }
            ], {
                duration: 1200,
                iterations: 1,
            })
        } else if (element.id == tasks.length && element.completed == true && i == 0) {
            card.classList = 'newCard active'
        }
        else if (element.completed == true) {
            card.classList = 'active'
        }
        else {
            card.classList = 'card'
        }

        title.innerHTML = element.name
        done.innerHTML = imgDone
        edit.innerHTML = imgEdit
        trash.innerHTML = imgTrash

        btns.append(done, edit, trash)
        card.append(title, btns)

        output.append(card)

        trash.addEventListener('click', () => {
            i++
            tasks = tasks.filter(item => item.id != element.id)
            addToLocalStorage()
        })


        edit.addEventListener('click', () => {
            const userAnswer = confirm('Заменить?')
            if (userAnswer == true) {
                const newTask = prompt('New Task')
                element.name = newTask
            }
            addToLocalStorage()
        })

    })
}

let addTask = document.getElementById('btnAdd')
addTask.addEventListener('click', addTodo)

const addToLocalStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
    renderTodos()
}
const addFromLocalStorage = () => {
    const data = localStorage.getItem('tasks')
    if (data != null) {
        tasks = JSON.parse(data)
        renderTodos()
    }
}
addFromLocalStorage()