const body = document.querySelector("body");
const form = document.querySelector("form");
const divForm = document.querySelector("body > main > section > div:nth-child(2)")
const cardFront = document.querySelector("#cardfront")
const cardBack = document.querySelector("#cardback")

const cardholderNameField = document.querySelector("#cardholder_name");
const cardNumberField = document.querySelector("#card_number");

const monthField = document.querySelector("#month");
const yearField = document.querySelector("#year");
const divDate = document.querySelector("#divDate");

const cvcField = document.querySelector("#cvc");

const submit = document.querySelector("input[type=submit]")

const dateCurrent = new Date();
const currentYear = dateCurrent.getFullYear().toString()
const currentYearFormatYY = currentYear.slice(2)
const millenialCurrent = dateCurrent.getFullYear().toString().slice(0,-2);

// Création d'un tableau avec mes champs que je parcours via un foreach pour appeler mon event qui appel ma fonction verifyAllFieldNoEmpty
let fields = {
   cardholderNameField:{ element: cardholderNameField , isGood:true},
   cardNumberField:{ element: cardNumberField , isGood:true},
   monthField:{ element: monthField , isGood:true},
   yearField:{ element: yearField , isGood:true},
   cvcField:{ element: cvcField , isGood:true},
}


const messagesError = {
   cardholderNameFormat:{name: 'cardholderNameFormat' , text:'Only letters, hyphens, apostrophes, and spaces are allowed'},
   cardholderNameNumberName:{name:'cardholderNameNumberChaine', text:'Must be contain name and lastname minimum'},
   cardholderNameSize:{name:'cardholderNameSize',text:'Must contain less than 30 characters'},
   numberOnly:{name: 'numberOnly' , text:'Wrong format, numbers only'},
   cardSize:{name: 'cardSize' , text:'Wrong size, 16 expected numbers'},
   monthSize:{name: 'monthSize' , text:'Wrong size, 2 expected numbers for month'},
   monthValue:{name: 'monthValue' , text:'Wrong value, must be between 01 and 12'},
   yearValue:{name: 'yearValue' , text:`Wrong value, must be between ${currentYearFormatYY} and 99`},
   yearSize:{name: 'yearSize' , text:'Wrong size, 2 expected numbers for year'},
   dateFuture:{name: 'dateFuture' , text:'Must be in the future'},
   cvcSize:{name: 'cvcSize' , text:'Wrong size, 3 expected numbers'},
}

function RemoveAllMessage(classCSSMessage){
   const errors = document.querySelectorAll(`.${classCSSMessage}`)
   if(errors!=null){
      errors.forEach((error)=>{
         error.remove()
      })
   }
}

function init(){
   RemoveAllMessage("error")

   Object.values(fields).forEach((field)=>{
      if(field.isGood===false){
         field.element.classList.remove('border_error')
      }
   })
   
   Object.values(fields).forEach((field)=>{
      field.isGood = true
   })
}

function RemoveAndShowMessageWithClassCSS(element,elementID, position , message,classCSSMessage) {

   const error = document.querySelector(`#${elementID}_${message.name}_${classCSSMessage}`)
   if(error){
      error.remove();
   }
   if(message!=null){
      // Permet d'ajouter un <p> a l'element avec un id et une classe
      element.insertAdjacentHTML(`${position}`,`<p id=${elementID}_${message.name}_${classCSSMessage} class=${classCSSMessage}>${message.text}</p>`)
   }
}

function verifyFormatField(field,regex) {
   if(regex.test(field.value)){
      return true;
   }
   return false
}

function verifySizeField(field,size){
   if(field.value.length===size){
      return true
   }
   return false
}

function verifySizeMaxField(field,max){
   if(field.value.length<=max){
      return true
   }
   return false
}

function verifyIntervalField(field,min,max){
   if(parseInt(field.value)>=min && parseInt(field.value)<=max){
      return true
   }
   return false
}

// Vérifie si la date est dans le future, prend en param mois au format MM et année au format YY
function verifyDateInTheFuture(monthCardExp,yearCardExpYY){

      let yearCardExpYYYY = millenialCurrent+yearCardExpYY;
      const dateCardExp = new Date(parseInt(yearCardExpYYYY),parseInt(monthCardExp),0)
   
      if(dateCardExp>dateCurrent){
         return true
      }
      return false
       
}

// Vérifie si tout les champs ne sont pas vide si c'est le cas submit prend la valeur false a l'attribut disabled
function verifyAllFieldNoEmpty(){
   if(cardholderNameField.value.trim()!=="" && cardNumberField.value.trim()!=="" && monthField.value.trim()!=="" && yearField.value.trim()!=="" && cvcField.value.trim()!==""){
      submit.disabled=false;
   }
   else {
      submit.disabled=true;
   }
}

function verifyAllField(){

      let isAllGood = true ; 

      // Vérification du champ cardholdername
      if(verifyFormatField(cardholderNameField,/^[A-Za-z-' ]+$/g)===false){
         fields.cardholderNameField.isGood = false
         RemoveAndShowMessageWithClassCSS(cardholderNameField,cardholderNameField.id,"afterend",messagesError.cardholderNameFormat,"error")
      }
      else if(verifyFormatField(cardholderNameField,/^[A-Za-z]+(?:-[A-Za-z]+)?\s+[A-Za-z]+(?:-[A-Za-z]+)?(?:\s+[A-Za-z]+(?:-[A-Za-z]+)*)*$/)==false){
         RemoveAndShowMessageWithClassCSS(cardholderNameField,cardholderNameField.id,"afterend",messagesError.cardholderNameNumberName,"error")
      }
      if(verifySizeMaxField(cardholderNameField,30 )==false){
         fields.cardholderNameField.isGood = false
         RemoveAndShowMessageWithClassCSS(cardholderNameField,cardholderNameField.id,"afterend",messagesError.cardholderNameSize,"error")
      }
   
   
      // Vérification du champ cardNumberField
      if(verifyFormatField(cardNumberField, /^[0-9]+$/g)===false){
         fields.cardNumberField.isGood = false
         RemoveAndShowMessageWithClassCSS(cardNumberField,cardNumberField.id,"afterend",messagesError.numberOnly,"error")
      }
      if(verifySizeField(cardNumberField,16)===false){
            fields.cardNumberField.isGood = false
            RemoveAndShowMessageWithClassCSS(cardNumberField,cardNumberField.id,"afterend",messagesError.cardSize,"error")
      }
   
      // Vérification du champ monthField
      if(verifyFormatField(monthField,/^[0-9]+$/g)===false){
         fields.monthField.isGood = false
         RemoveAndShowMessageWithClassCSS(divDate,divDate.id,"beforeend",messagesError.numberOnly,"error")
      }
      else {
         if(verifySizeField(monthField,2)===false){
            fields.monthField.isGood = false
            RemoveAndShowMessageWithClassCSS(divDate,divDate.id,"beforeend",messagesError.monthSize,"error")
         }
         else if(!verifyIntervalField(monthField, 1,12)){
            fields.monthField.isGood = false
            RemoveAndShowMessageWithClassCSS(divDate,divDate.id,"beforeend",messagesError.monthValue,"error")
         }
      }
   
      // Vérification du champ yearField
      if(verifyFormatField(yearField,/^[0-9]+$/g)===false){
         fields.yearField.isGood = false
         RemoveAndShowMessageWithClassCSS(divDate,divDate.id,"beforeend",messagesError.numberOnly,"error")
      }
      else {
         if(verifySizeField(yearField,2)===false){
            fields.yearField.isGood = false
            RemoveAndShowMessageWithClassCSS(divDate,divDate.id,"beforeend",messagesError.yearSize,"error")
         }
         else if(verifyIntervalField(yearField, currentYearFormatYY,99)==false){
            fields.yearField.isGood = false;
            RemoveAndShowMessageWithClassCSS(divDate,divDate.id,"beforeend",messagesError.yearValue,"error")
         }
      }
   
      // Vérification si Date est dans le future
      if(fields.monthField.isGood==true && fields.yearField.isGood==true){
         if(verifyDateInTheFuture(monthField.value,yearField.value)==false){
            fields.monthField.isGood = false
            fields.yearField.isGood = false
            RemoveAndShowMessageWithClassCSS(divDate,divDate.id,"beforeend",messagesError.dateFuture,"error")
         }
      }
   
      // Vérification de CVC
      if(verifySizeField(cvcField,3)==false){
         fields.cvcField.isGood = false
         RemoveAndShowMessageWithClassCSS(cvcField,cvcField.id,"afterend",messagesError.cvcSize,"error")
      }
      if(verifyFormatField(cvcField,/^[0-9]+$/)==false){
         fields.cvcField.isGood = false
         RemoveAndShowMessageWithClassCSS(cvcField,cvcField.id,"afterend",messagesError.numberOnly,"error")
      }


      // Parcours la liste d'objet fields et si fields.isGood == false ajoute la classe border_error et met isFormValid a false
      Object.values(fields).forEach((field)=>{
         if(field.isGood===false){
            field.element.classList.add("border_error")
            isAllGood = false
         }
      })

      return isAllGood

}


function SuccessAddCard(name,numberCard,month,year,cvc){
   form.remove()

   const divSuccess = ` <div id='divSuccess'>
                     <img src="images/icon-complete.svg" alt="Success">
                     <h2 class='uppercase'>thank you !</h2>
                     <p class='capitalize'>we've added your card details</p>
                  </div>`
   divForm.insertAdjacentHTML("beforeend",divSuccess)


   numberCard = numberCard.match(/.{1,4}/g)?.join(" ")
   console.log(numberCard)


   const front = `<p>${numberCard}</p>
                  <div>
                  <p class='uppercase'>${name}</p>
                  <p>${month}/${year}</p>
                  </div>`


   const back = `<p>${cvc}</p>` 

   cardFront.insertAdjacentHTML("beforeend",front)
   cardBack.insertAdjacentHTML("beforeend",back)

}


function showFalseLoading(duration){

   return new Promise((loadingEnd) => {
      
      const dialog = `<dialog id='loadingModal'>
      <p id='loading'>Loading</p>                  
      </dialog>`

      body.classList.add("opacity")
      
      body.insertAdjacentHTML("afterend",dialog)
      
      const modal = document.querySelector('#loadingModal')
      const loading = document.querySelector("#loading")
      
      modal.showModal();
      
      let i = 0
      const interval = setInterval(() => {
         let randomNumber = Math.floor(Math.random()*100)
         if(randomNumber>=90){
            i++;
         }
         else {
            i = i
         }
         loading.innerHTML = `Loading... <span>${i}</span>%`
         if(i==100){
            clearInterval(interval)
            body.classList.remove("opacity")
            modal.close()
            loadingEnd(true)
         }
         
      }, duration);
   })
}

// Object.values(fields).forEach((field)=>{
//    field.element.addEventListener("input" , (e) => {
//       verifyAllFieldNoEmpty()
//    })
// })

submit.disabled = false;

submit.addEventListener("click", async (e)=>{
   
   e.preventDefault();
   
   init()

   // await showFalseLoading(1)

   // if(verifyAllField()){
   //    SuccessAddCard(cardholderNameField.value,cardNumberField.value,monthField.value,yearField.value,cvcField.value)
   // }

   SuccessAddCard('Sebastien LUCAS','1234123412341234','10','27','530')

})

