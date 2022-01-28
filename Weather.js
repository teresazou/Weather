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
new NewElem('condition').createNew()
new NewElem('icon').createNew()
new NewElem('temp').createNew()
new NewElem('line').createNew()
new NewElem('time').createNew()

new NewElem('feelslike').createNew()
new NewElem('humidity').createNew()


function handleSubmit(e){

    e.preventDefault()
    search()
}

async function fetchWeb (where){
    try{
        let  response= await fetch(`https://api.weatherapi.com/v1/current.json?key=3ff5b41e1989466dbfc03436222301&q=${where}`, {mode: 'cors'})
        var web=await response.json()
        console.log(web)
        show_reset()
        
        
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
     is_day:web.current.is_day,
     condition:web.current.condition.text,
     
     feellike:Math.round(web.current.feelslike_f),
     humidity:web.current.humidity,

    }

    
return data


}





 function Result(data){
    // var title_city=document.getElementById('Title_city')
    // var title_time=document.getElementById('Title_time')
    // var title_temp=document.getElementById('Title_temp')
    // var title_cond=document.getElementById('Title_condition')
    

    var city=document.getElementById('city')
    var time=document.getElementById('time')
    
    var temp=document.getElementById('temp')
    var cond=document.getElementById('condition')
    var fl=document.getElementById('feelslike')
    var line=document.getElementById('line')
    var humidity=document.getElementById('humidity')
    
    // title_time.innerHTML="Local Time: "
    // title_temp.innerHTML="Current Temperature: "
    // title_cond.innerHTML="Current Condition: "
    // title_fl.innerHTML="Feels like: "


    city.innerHTML=data.city
    temp.innerHTML=data.temp
    cond.innerHTML=data.condition
    fl.innerHTML="Feels like: "+ data.feellike
    humidity.innerHTML="Humidity: "+data.humidity
    

    //change background pic
    day_night_background(data)
    


}

function show_reset(){
    var result=document.getElementById('Result')
     result.style.display="flex";
     form.reset()
}

function day_night_background(data){
    if(data.is_day==0){
    document.body.style.background= "url('night.jpg') no-repeat center center fixed";
    document.body.style.backgroundSize="cover"
    }else{
    document.body.style.background= "url('daytime.jpg') no-repeat center center fixed";
    document.body.style.backgroundSize="cover"

    }
}