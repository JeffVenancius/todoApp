let todoArr = []
let donesArr = []

function addNew() {
    let textArea = document.querySelector("textarea")
    let currentTime = getCurrentTime()
    todoArr.push([textArea.value, currentTime])
    textArea.value = ""
    renderArray()
}


function renderArray(ArrOf = 'todo') {
    let sortWhich = '#todo__sort'
    let listId = '#todo__list'
    let checked = ''
    let checkedFn = todoChecked
    let removeFn = removeTodo

    if (ArrOf === 'dones') {
            sortWhich = '#dones__sort'
            listId = '#dones__list'
            checkedFn = donesChecked
            checked = "checked"
            removeFn = removeDones
    }


    let sorted = sortList(sortWhich)
    let list = document.querySelector(listId)
 
    
    let mappedArr = sorted.map(i => {
        let item = `
                    <div class="todo__item">
                        <div>
                            <input type="checkbox" name= ${i[0]} class="checkbox__${ArrOf}" ${checked}>
                            <h3>${i[0]}</h3>
                            <p>${i[1]}</p>
                        </div>
                        <button id=${i[0]+'__btn'} class='btn__${ArrOf}'></button>
                    </div>
                    `
        return item
    })
    list.innerHTML = mappedArr
    for (let d of document.querySelectorAll('.checkbox__' + ArrOf)) {
        d.addEventListener('change', checkedFn)
    }
    for (let btn of document.querySelectorAll('.btn__' + ArrOf)) {
        btn.addEventListener('click', removeFn)
    }
    
}


function removeTodo(el) {
    let id = el.target.id
    id = id.replace('__btn', '')
    todoArr.splice(todoArr.find(element => element[0] === id), 1)
    reRender()
}

function removeDones(el) {
    let id = el.target.id
    id = id.replace('__btn', '')
    donesArr.splice(donesArr.find(element => element[0] === id), 1)
    reRender()
}

function todoChecked(e) {
    let compare = todoArr.find(element => element[0] === e.target.name)
    todoArr.splice(todoArr.find(element => element[0] === compare[0]),1)
    donesArr.push(compare)
    reRender()
}


function reRender() {
    donesArr = donesArr.sort((a, b) => {
        let dateA = convertToNum(a[1])
        let dateB = convertToNum(b[1])
        return dateA - dateB
    })

    todoArr = todoArr.sort((a, b) => {
        let dateA = convertToNum(a[1])
        let dateB = convertToNum(b[1])
        return dateA - dateB
    })

    renderArray()
    renderArray('dones')

}

function donesChecked(e) {
    let compare = donesArr.find(element => element[0] === e.target.name)
    donesArr.splice(donesArr.find(element => element[0] === compare[0]),1)
    todoArr.push(compare)
    reRender()
}


function sortList(list) {
    let output
    let sortBy = document.querySelector(list)
    list === '#todo__sort'? output = [...todoArr] : output = [...donesArr]
    switch (sortBy.selectedIndex) {
        case 0:
            output = output.sort()
            break
        case 1:
            output = output.sort()
            output = output.reverse()
            break
        case 3:
            output = output.reverse()
            break
    }
    return output
}


function convertToNum(strDate) {
    return strDate.replace(/\//g,'').replace(/ /g, '').replace(/:/g,'').replace('-', '')
}

function getCurrentTime() {
    let now = new Date
    let day = format(now.getDate())
    let month = format(now.getMonth() + 1)
    let year = format(now.getFullYear())

    let hour = now.getHours()
    let minutes = now.getMinutes()
    let seconds = now.getSeconds()
    
    let date = [day, month, year].join('/')
    let time = [hour, minutes, seconds].join(':')

    return date + ' - ' + time

}


function format(date) {
    return date.toString().padStart(2,'0')
}