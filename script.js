const form = document.querySelector("form");
const section = document.querySelector("body>main>section")
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

// Création d'un tableau avec mes champs que je parcours via un foreach pour appeler mon event qui appel ma fonction verifyallChampNoEmpty
let fields = {
   cardholderNameField:{ element: cardholderNameField , isGood:true},
   cardNumberField:{ element: cardNumberField , isGood:true},
   monthField:{ element: monthField , isGood:true},
   yearField:{ element: yearField , isGood:true},
   cvcField:{ element: cvcField , isGood:true},
}

// Booléen global pour vérifier si le formulaire est valide
let isFormValid = true;

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
   cvcSize:{name: 'cvcSize' , text:'Wrong size, 3 expected numbers for year'},
}

function RemoveAllMessage(classCSSMessage){
   const errors = document.querySelectorAll(`.${classCSSMessage}`)
   if(errors!=null){
      errors.forEach((error)=>{
         error.remove()
      })
   }
}

function RemoveAndShowMessageWithClassCSS(element, position , message,classCSSMessage) {

   console.log(message.name)
   const error = document.querySelector(`#${message.name}_${classCSSMessage}`)
   if(error){
      error.remove();
   }
   if(message!=null){
      // Permet d'ajouter un <p> a l'element avec un id et une classe
      element.insertAdjacentHTML(`${position}`,`<p id=${message.name}_${classCSSMessage} class=${classCSSMessage}>${message.text}</p>`)
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
function verifyAllChampNoEmpty(){
   if(cardholderNameField.value.trim()!=="" && cardNumberField.value.trim()!=="" && monthField.value.trim()!=="" && yearField.value.trim()!=="" && cvcField.value.trim()!==""){
      submit.disabled=false;
   }
   else {
      submit.disabled=true;
   }
}

Object.values(fields).forEach((field)=>{
   field.element.addEventListener("input" , (e) => {
      verifyAllChampNoEmpty()
   })
})

// submit.disabled = false;


submit.addEventListener("click",(e)=>{

   e.preventDefault();

   isFormValid = true;

   RemoveAllMessage("error")

   Object.values(fields).forEach((field)=>{
      if(field.isGood===false){
         field.element.classList.remove('border_error')
      }
   })
   
   Object.values(fields).forEach((field)=>{
      field.isGood = true
   })


   // Vérification du champ cardholdername
   if(verifyFormatField(cardholderNameField,/^[A-Za-z-' ]+$/g)===false){
      fields.cardholderNameField.isGood = false
      RemoveAndShowMessageWithClassCSS(cardholderNameField,"afterend",messagesError.cardholderNameFormat,"error")
   }
   else if(verifyFormatField(cardholderNameField,/^[A-Za-z]+(?:-[A-Za-z]+)?\s+[A-Za-z]+(?:-[A-Za-z]+)?(?:\s+[A-Za-z]+(?:-[A-Za-z]+)*)*$/)==false){
      RemoveAndShowMessageWithClassCSS(cardholderNameField,"afterend",messagesError.cardholderNameNumberName,"error")
   }
   if(verifySizeMaxField(cardholderNameField,30 )==false){
      fields.cardholderNameField.isGood = false
      RemoveAndShowMessageWithClassCSS(cardholderNameField,"afterend",messagesError.cardholderNameSize,"error")
   }


   // Vérification du champ cardNumberField
   if(verifyFormatField(cardNumberField, /^[0-9]+$/g)===false){
      fields.cardNumberField.isGood = false
      RemoveAndShowMessageWithClassCSS(cardNumberField,"afterend",messagesError.numberOnly,"error")
   }
   if(verifySizeField(cardNumberField,16)===false){
         fields.cardNumberField.isGood = false
         RemoveAndShowMessageWithClassCSS(cardNumberField,"afterend",messagesError.cardSize,"error")
   }

   // // Vérification du champ monthField
   if(verifyFormatField(monthField,/^[0-9]+$/g)===false){
      fields.monthField.isGood = false
      RemoveAndShowMessageWithClassCSS(divDate,"beforeend",messagesError.numberOnly,"error")
   }
   else {
      if(verifySizeField(monthField,2)===false){
         fields.monthField.isGood = false
         RemoveAndShowMessageWithClassCSS(divDate,"beforeend",messagesError.monthSize,"error")
      }
      else if(!verifyIntervalField(monthField, 1,12)){
         fields.monthField.isGood = false
         RemoveAndShowMessageWithClassCSS(divDate,"beforeend",messagesError.monthValue,"error")
      }
   }

   // Vérification du champ yearField
   if(verifyFormatField(yearField,/^[0-9]+$/g)===false){
      fields.yearField.isGood = false
      RemoveAndShowMessageWithClassCSS(divDate,"beforeend",messagesError.numberOnly,"error")
   }
   else {
      if(verifySizeField(yearField,2)===false){
         fields.yearField.isGood = false
         RemoveAndShowMessageWithClassCSS(divDate,"beforeend",messagesError.yearSize,"error")
      }
      else if(verifyIntervalField(yearField, currentYearFormatYY,99)==false){
         fields.yearField.isGood = false;
         RemoveAndShowMessageWithClassCSS(divDate,"beforeend",messagesError.yearValue,"error")
      }
   }

   // Vérification si Date est dans le future
   if(fields.monthField.isGood==true && fields.yearField.isGood==true){
      if(verifyDateInTheFuture(monthField.value,yearField.value)==false){
         fields.monthField.isGood = false
         fields.yearField.isGood = false
         RemoveAndShowMessageWithClassCSS(divDate,"beforeend",messagesError.dateFuture,"error")
      }
   }

   // Vérification de CVC
   if(verifySizeField(cvcField,3)==false){
      fields.cvcField.isGood = false
      RemoveAndShowMessageWithClassCSS(cvcField,"afterend",messagesError.cvcSize,"error")
   }
   if(verifyFormatField(cvcField,/^[0-9]+$/)==false){
      fields.cvcField.isGood = false
      RemoveAndShowMessageWithClassCSS(cvcField,"afterend",messagesError.numberOnly,"error")
   }

   // Parcours la liste d'objet fields et si fields.isGood == false ajoute la classe border_error et met isFormValid a false
   Object.values(fields).forEach((field)=>{
      if(field.isGood===false){
         field.element.classList.add("border_error")
         isFormValid = false;
      }
   })


   // Si isFormValid == true supprime le form et affiche Success et met les valeurs sur cardFront et cardback
   if(isFormValid){
      form.remove()
      divSuccess = ` <div id='divSuccess'>
                        <img src="images/icon-complete.svg" alt="Success">
                        <h2 class='uppercase'>thank you !</h2>
                        <p class='capitalize'>we've added your card details</p>
                     </div>`
      section.insertAdjacentHTML("beforeend",divSuccess)


      cardNumberField.value = cardNumberField.value.match(/.{1,4}/g)?.join(" ")


      front = `<p>${cardNumberField.value}</p>
                     <div>
                     <p class='uppercase'>${cardholderNameField.value}</p>
                     <p>${monthField.value}/${yearField.value}</p>
                     </div>`


      back = `<p>123</p>` 

      cardFront.insertAdjacentHTML("beforeend",front)
      cardBack.insertAdjacentHTML("beforeend",back)

   }

})
