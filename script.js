 const input = document.getElementById("taskInput")
 const button = document.getElementById("addBTN")
 const list = document.getElementById("taskOutput")

 let tasks = []
 
 // local storage???
 
 const storedTasks = (localStorage.getItem('tasks'))
 if (storedTasks) {
     tasks = JSON.parse(storedTasks)
 
 }
 //salvar com função
 function saveTasks() {
   localStorage.setItem('tasks', JSON.stringify(tasks))}
   
   //função pra renderizar

 function displayTasks() {
     list.innerHTML = ''
     tasks.forEach((task, index) => {
         const li = document.createElement('li')
         const deleteButton = document.createElement('button')
         const number = document.createElement('span')
const text = document.createElement('span')

number.textContent = `${index + 1}. `
text.textContent = task.text

            deleteButton.textContent = 'X'
            
          if (task.completed) {li.classList.add('complete')}
         
          //concuir tarefa
            li.addEventListener('click', () => {
            task.completed = !task.completed
            saveTasks()
            displayTasks()
                
     })

     //remover tarefa
     deleteButton.addEventListener('click', (event) => {
        event.stopPropagation()
        tasks.splice(index, 1)
        saveTasks()
        displayTasks()      
    })
      li.appendChild(number)
li.appendChild(text)
        li.appendChild(deleteButton)
        list.appendChild(li)
    })
}
function updateAndRender() {
  saveTasks()
  displayTasks()
}

 //adicionar tarefa
    button.addEventListener('click', () => {
        const value = input.value
        if (value.trim() === '') return
        tasks.push(
            {text: value, completed: false}
        )
   updateAndRender()
        input.value = ''
        
    })
    // adicionar com enter
    input.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {button.click()}
        
    })

    //render no início
    displayTasks()

