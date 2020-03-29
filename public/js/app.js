console.log('Client side JS has loaded in')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const m1 = document.querySelector('#m1')
const m2 = document.querySelector('#m2')



weatherForm.addEventListener('submit',(event)=>
{
    event.preventDefault()
    m1.textContent = 'Loading..'
    const location=search.value
    fetch('http://localhost:3000/weather?address='+ encodeURIComponent(location)+'').then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                m1.textContent = data.error                
            }
            else{
                m1.textContent = data.location
                m2.textContent = data.foreCast
            }
        })
    })
})


