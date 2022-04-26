//console.log("Testing!!")

const weatherForm = document.querySelector('form')
const search      = document.querySelector('input')
const messageOne  = document.querySelector('#message-1')
const messageTwo  = document.querySelector('#message-2')
messageOne.textContent=''
messageTwo.textContent=''
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent='loading ....'
    messageTwo.textContent=''

    // fetch('http://localhost:3000/weather?address=' + location).then((response) => {

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            console.log(data)
            if (data.error) {
                messageOne.textContent=data.error
                // messageOne.addClass('error')

            } else {
                messageOne.textContent=data.Place
                messageTwo.textContent=data.forcast
                // messageOne.addClass('green')
                // messageTwo.addClass('green')
            }
        })
    })
})
