const img = document.querySelector('img');
const form=document.querySelector('form')
const submButt=document.getElementById('myBtn')
form.addEventListener('submit',handleSubmit)
submButt.addEventListener('click',handleSubmit)

function handleSubmit(e){
    e.preventDefault()
    search()
}
async function fetchWeb (inputVal){
    try{
        let  response= await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=pwhG816oq8FpyJ7fDq1rTXkKenCHQh3H&s=${inputVal}`, {mode: 'cors'})
        var web=await response.json()
        img.src= web.data.images.original.url
        img.style.display='block'
        reset()
       } 
    catch(err){
    alert("error")
              }

}

function search(){
    var input=document.querySelector('input[type="text"]')
    var inputVal=input.value
    fetchWeb(inputVal)
}

function reset(){
    form.reset()
}

