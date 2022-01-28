const form=document.querySelector('form')
const submButt=document.getElementById('srbt')
form.addEventListener('submit',handleSubmit)
submButt.addEventListener('click',handleSubmit)

function NewElem(current_id,parent_id){
    this.current_id=current_id
    this.parent_id=parent_id
    this.createNew=function(){
    let parent=document.getElementById(parent_id)
    var element=document.createElement('div')
        text=document.createTextNode('')
        element.id=current_id
        parent.appendChild(element)
        element.appendChild(text)
    }
    }
new NewElem('city_region','Result').createNew()
new NewElem('city','city_region').createNew()
new NewElem('region','city_region').createNew()
new NewElem('condition','Result').createNew()
new NewElem('condition_text','condition').createNew()

new NewElem('icon','Result').createNew()
new NewElem('temp','Result').createNew()
new NewElem('line','Result').createNew()
new NewElem('time','Result').createNew()
new NewElem('feelslike','Result').createNew()
new NewElem('humidity','Result').createNew()


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
     country:web.location.country.toUpperCase(),
     region:web.location.region.toUpperCase(),
     time:web.location.localtime,
     temp:Math.round(web.current.temp_f),
     is_day:web.current.is_day,
     condition:web.current.condition.text,
     icon:web.current.condition.icon,
     
     feellike:Math.round(web.current.feelslike_f),
     humidity:web.current.humidity,

    }

    
return data


}





 function Result(data){
   
    var region=document.getElementById('region') 

    var city=document.getElementById('city')
    var time=document.getElementById('time')
    var temp=document.getElementById('temp')
    var cond=document.getElementById('condition_text')
    var fl=document.getElementById('feelslike')
    var line=document.getElementById('line')
    var humidity=document.getElementById('humidity')
    
   
    if(data.country=="UNITED STATES OF AMERICA"){
        region.innerHTML="  "+","+"  "+data.region
    }else{ region.innerHTML="  "+","+"  "+data.country}
    
    city.innerHTML=data.city
    temp.innerHTML=data.temp
    cond.innerHTML=data.condition 
    fl.innerHTML="Feels like: "+ data.feellike
    humidity.innerHTML="Humidity: "+data.humidity
    
    icon(data)

    //change background pic depends on the time of the day
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

function icon(data){
var test_image=document.getElementById('image')
if(test_image!=null){
test_image.parentNode.removeChild(test_image)
}
icon_str=data.icon
icon_num=icon_str.substring(icon_str.length-7)
let parent=document.getElementById("condition")
var img = document.createElement("img");
img.id="image"
if(data.is_day==0){
    img.src = `icons/night/${icon_num}`;
}else{ img.src=`icons/day/${icon_num}`;}
parent.appendChild(img)
}