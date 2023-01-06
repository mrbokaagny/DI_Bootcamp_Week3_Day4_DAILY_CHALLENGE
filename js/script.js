let tasks = [];

// affiche de message
let msgContent = document.getElementsByClassName('msg_content')[0]

// recuperation du input 
let forms = document.forms[0]
let inputValue = forms.elements[0] 

// container des tâches
let listTaskCard = document.getElementsByClassName('listTasks')[0]


// suppression des tâches
function deletedChild(){
        let child = listTaskCard.lastElementChild
        while(child){
            listTaskCard.removeChild(child)
            child = listTaskCard.lastChild
        }
}


// Mise à jour du DOM
function updateDom(){
    deletedChild()
    for (const key in tasks) {
        createElement(key,tasks[key].text,tasks[key].task_id,tasks[key].done)            
    }
}



// marquer tâche terminer 
function doneTask(key){
    let objtExtract = tasks[key]
        objtExtract = { task_id : objtExtract.task_id  , text : objtExtract.text , done : !objtExtract.done}
        tasks[key] = objtExtract
        updateDom()
}

// creation des div à injecter
function createElement(index,libelle,taskId,done){

    let taskDiv = document.createElement('div')
    taskDiv.classList.add('task_item')
    taskDiv.setAttribute('data-task-id' , taskId)

    // creation de la case à suppression
    let closeCard = document.createElement('div')
    closeCard.classList.add('close_card')
    closeCard.textContent = 'x'
    closeCard.addEventListener('click' , function(){
        deleteTask(index)
    })

    // creation du contenu texte
    let spanText = document.createElement('span')
    spanText.textContent =  libelle


    // creation du input de type check
    let inputCheck = document.createElement('input')
    inputCheck.type = 'checkbox'
    inputCheck.classList.add('input_style')
    inputCheck.addEventListener('click' , function(){
        doneTask(index)
    })

    if(done){
        spanText.style.color = 'red'
        spanText.style.fontWeight = 'bolder'
        spanText.style.textDecoration = 'line-through'
        inputCheck.setAttribute('checked',true)
    }
    
    listTaskCard.append(taskDiv)
    
    taskDiv.appendChild(closeCard)
    taskDiv.appendChild(inputCheck)
    taskDiv.appendChild(spanText)
}


// ajouter une tâche
function addTask(event){
    event.preventDefault()
    if(inputValue.value == ''){
        msgContent.classList.toggle('show')
        msgContent.textContent = 'Veuillez renseigner une tâche avant validation '
        msgContent.style.backgroundColor = 'red'
        setTimeout(function(){
            msgContent.classList.toggle('show')
        },1500)
    }
    else{

        let obj = {task_id : tasks.length == 0 ? 0 : tasks.length  , text : inputValue.value , done : false}
        tasks.unshift(obj)
        deletedChild()
        for (const key in tasks) {
            createElement(key,tasks[key].text,tasks[key].task_id,tasks[key].done)            
        }

        msgContent.classList.toggle('show')
        msgContent.textContent = 'Tâche ajouté avec succès '
        msgContent.style.backgroundColor = 'green'
        setTimeout(function(){
            msgContent.classList.toggle('show')
        },1500)

        inputValue.value = ''
    }
    
}


// suppression d'une task
function deleteTask(index){
   tasks = tasks.filter((elt,key)=> key!=index)
   updateDom()
}

// tout supprimer
function deleteAll(){
    tasks = []
    deletedChild()
}
