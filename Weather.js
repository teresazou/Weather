const form=document.querySelector('form')
const submButt=document.getElementById('srbt')
form.addEventListener('submit',handleSubmit)
submButt.addEventListener('click',handleSubmit)

function NewElem(current_id){
    this.current_id=current_id
    this.createNew=function(){
    let parent=document.getElementById("Result")
    var element=document.createElement('div')
        text=document.createTextNode('')
        element.id=current_id
        parent.appendChild(element)
        element.appendChild(text)
    }
    }
new NewElem('city').createNew()
new NewElem('time').createNew()
new NewElem('temp').createNew()
new NewElem('condition').createNew()
new NewElem('feelslike').createNew()



function handleSubmit(e){

    e.preventDefault()
    search()
}

async function fetchWeb (where){
    try{
        let  response= await fetch(`https://api.weatherapi.com/v1/current.json?key=3ff5b41e1989466dbfc03436222301&q=${where}`, {mode: 'cors'})
        var web=await response.json()
        console.log(web)
        
        
        //ending point
       } 
    catch(err){
    alert("error")
              }
              var newdata=ProcessData(web)
              Result(newdata)
}


function search(){
    var input=document.querySelector('input[type="text"]')
    var inputVal=input.value
    fetchWeb(inputVal)
}


function ProcessData(web){
    
   var data={
     city: web.location.name.toUpperCase(),
     time:web.location.localtime,
     temp:Math.round(web.current.temp_f),
     condition:web.current.condition.text,
     feellike:web.current.feelslike_f

    }

    
return data


}





 function Result(data){
    var city=document.getElementById('city')
    var time=document.getElementById('time')
    var temp=document.getElementById('temp')
    var cond=document.getElementById('condition')
    var fl=document.getElementById('feelslike')
    city.innerHTML=data.city
    time.innerHTML=data.time
    temp.innerHTML=data.temp
    cond.innerHTML=data.condition
    fl.innerHTML=data.feellike
    



}

