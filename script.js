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

let fieldYearisBlur = false;

// Création d'un tableau associatif d'objet champs
let fields = {
   cardholderNameField:{ element: cardholderNameField , isGood:null, verifyField:verifyCardholderNameField},
   cardNumberField:{ element: cardNumberField , isGood:null , verifyField:verifyCardNumberField},
   monthField:{ element: monthField , isGood:null, verifyField:verifyDate},
   yearField:{ element: yearField , isGood:null, verifyField:verifyDate},
   cvcField:{ element: cvcField , isGood:null, verifyField:verifyCVCField},
}

// Tableau de message d'erreur 
const messagesError = {
   fieldIsEmpty:{name:'fieldIsEmpty',text:'This field is required'},
   fieldsAreEmpty:{name:'fieldIsEmpty',text:'This fields are required'},

   cardholderNameFormat:{name: 'cardholderNameFormat' , text:'Only letters, hyphens, apostrophes, and spaces are allowed'},
   cardholderNameAndLastname:{name:'cardholderNameNumberChaine', text:'Must be contain name and lastname minimum'},
   cardholderNameSize:{name:'cardholderNameSize',text:'Must contain between than 2 and 30 characters'},

   numberOnly:{name: 'numberOnly' , text:'Wrong format, numbers only'},
   cardSize:{name: 'cardSize' , text:'Wrong size, 16 expected numbers'},
   
   monthSize:{name: 'monthSize' , text:'Wrong size, 2 expected numbers for month'},
   monthValue:{name: 'monthValue' , text:'Wrong value, must be between 01 and 12 for month'},
   yearValue:{name: 'yearValue' , text:`Wrong value, must be between ${currentYearFormatYY} and 99 for year`},
   yearSize:{name: 'yearSize' , text:'Wrong size, 2 expected numbers for year'},
   dateFuture:{name: 'dateFuture' , text:'Must be in the future'},
   
   cvcSize:{name: 'cvcSize' , text:'Wrong size, 3 expected numbers'},
}

function removeAllMessage(classCSSMessage){
   const errors = document.querySelectorAll(`.${classCSSMessage}`)
   if(errors!==null){
      errors.forEach((error)=>{
         error.remove()
      })
   }
}

// Supprime tous les messages d'erreur et les class border_error et remet tout les objet field.isGood a null
function init(){

   removeAllMessage("error")

   Object.values(fields).forEach((field)=>{
      if(field.isGood===false){
         field.element.classList.remove('border_error')
      }
   })
   
   Object.values(fields).forEach((field)=>{
      field.isGood = null
   })
}

function showMessageWithClassCSS(element,elementID, position , message,classCSSMessage) {

   if(message!=null){
      // Permet d'ajouter un <p> a l'element avec un id et une classe
      element.insertAdjacentHTML(`${position}`,`<p class='${classCSSMessage} ${elementID}_${classCSSMessage}'>${message.text}</p>`)
   }
}

// Vérifie le format
function verifyFormatField(field,regex) {
   if(regex.test(field.value)){
      return true;
   }
   return false
}

// Vérfie la taille
function verifySizeField(field,size){
   if(field.value.length===size){
      return true
   }
   return false
}

// Vérifie si la taille est entre le min et le max inclus
function verifySizeMinMaxField(field,min,max){
   if(field.value.length>=min && field.value.length<=max){
      return true
   }
   return false
}

// Vérifie si interval est entre min et max inclus
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
   
      if(dateCardExp>=dateCurrent){
         return true
      }
      return false
       
}

//Vérifie si un champ est vide
function verifyFieldIsEmpty(field,div=null){
   if(field.value.trim()===''){
      return true
   }
   return false
}

// Vérifie si tout les champs ne sont pas vide si c'est le cas submit prend la valeur false a l'attribut disabled
function verifyAllFieldsNoEmpty(){
   if(cardholderNameField.value.trim()!=="" && cardNumberField.value.trim()!=="" && monthField.value.trim()!=="" && yearField.value.trim()!=="" && cvcField.value.trim()!==""){
      submit.disabled=false;
   }
   else {
      submit.disabled=true;
   }
}

// Vérifie le champ cardholderName
function verifyCardholderNameField(){

   const errorCardholderName = document.querySelector('.cardholder_name_error')
   if(errorCardholderName){
      errorCardholderName.remove()
   }

   fields.cardholderNameField.isGood = true

   // Vérification du champ cardholdername
   if(verifyFieldIsEmpty(cardholderNameField)){
      fields.cardholderNameField.isGood = false
      showMessageWithClassCSS(cardholderNameField,cardholderNameField.id,'afterend',messagesError.fieldIsEmpty,'error')
   }
   else if(!verifyFormatField(cardholderNameField,/^[A-Za-z-' ]+$/g)){
      fields.cardholderNameField.isGood = false
      showMessageWithClassCSS(cardholderNameField,cardholderNameField.id,"afterend",messagesError.cardholderNameFormat,"error")
   }
   else if(!verifyFormatField(cardholderNameField,/^[A-Za-z-' ]+(?:\s[A-Za-z-' ]+)+$/)){
      fields.cardholderNameField.isGood = false
      showMessageWithClassCSS(cardholderNameField,cardholderNameField.id,"afterend",messagesError.cardholderNameAndLastname,"error")
   }
   else if(!verifySizeMinMaxField(cardholderNameField,2,30 )){
      fields.cardholderNameField.isGood = false
      showMessageWithClassCSS(cardholderNameField,cardholderNameField.id,"afterend",messagesError.cardholderNameSize,"error")
   }
   
}

// Vérifie le champ cardNumber
function verifyCardNumberField(){

   const errorCardNumber = document.querySelector('.card_number_error')
   if(errorCardNumber){
      errorCardNumber.remove()
   }

   fields.cardNumberField.isGood = true

   // Vérification du champ cardNumberField
   if(verifyFieldIsEmpty(cardNumberField)){
      fields.cardNumberField.isGood = false
      showMessageWithClassCSS(cardNumberField,cardNumberField.id,"afterend",messagesError.fieldIsEmpty,'error')
   }
   else if(!verifyFormatField(cardNumberField, /^[0-9]+$/g)){
         fields.cardNumberField.isGood = false
         showMessageWithClassCSS(cardNumberField,cardNumberField.id,"afterend",messagesError.numberOnly,"error")
   }
   else if(!verifySizeField(cardNumberField,16)){
            fields.cardNumberField.isGood = false
            showMessageWithClassCSS(cardNumberField,cardNumberField.id,"afterend",messagesError.cardSize,"error")
   }
}

// Vérifie les champs month et year
function verifyDate(){

   const errorDate = document.querySelector('.divDate_error')
   if(errorDate){
      errorDate.remove()
   }

   // Vérification du champ monthField
   if(verifyFieldIsEmpty(monthField,divDate)){
      fields.monthField.isGood = false
      showMessageWithClassCSS(divDate,divDate.id,"beforeend",messagesError.fieldsAreEmpty,"error")
   }
   else if(verifyFieldIsEmpty(yearField,divDate) && fieldYearisBlur) {
      fields.yearField.isGood = false
      showMessageWithClassCSS(divDate,divDate.id,"beforeend",messagesError.fieldsAreEmpty,"error")
   }
   else {
      verifyMonthField()
      verifyYearField()
      
      // Vérification si Date est dans le future
      if(fields.monthField.isGood==true && fields.yearField.isGood==true){
         if(!verifyDateInTheFuture(monthField.value,yearField.value)){
            fields.monthField.isGood = false
            fields.yearField.isGood = false
            showMessageWithClassCSS(divDate,divDate.id,"beforeend",messagesError.dateFuture,"error")
         }
      }
   }
}

// Vérifie le champ month
function verifyMonthField(){
   fields.monthField.isGood = true

   if(!verifyFormatField(monthField,/^[0-9]+$/g)){
      fields.monthField.isGood = false
      showMessageWithClassCSS(divDate,divDate.id,"beforeend",messagesError.numberOnly,"error")
   }
   else {
      if(!verifySizeField(monthField,2)){
         fields.monthField.isGood = false
         showMessageWithClassCSS(divDate,divDate.id,"beforeend",messagesError.monthSize,"error")
      }
      else if(!verifyIntervalField(monthField, 1,12)){
         fields.monthField.isGood = false
         showMessageWithClassCSS(divDate,divDate.id,"beforeend",messagesError.monthValue,"error")
      }
   }
}

// Vérifie le champ year
function verifyYearField(){
   
   const errorDate = document.querySelector('.divDate_error')
   if(errorDate){
      errorDate.remove()
   }

   fields.yearField.isGood = true

   if(verifyFieldIsEmpty(yearField,divDate)){
      fields.yearField.isGood = false
   }
   else if(!verifyFormatField(yearField,/^[0-9]+$/g)){
      fields.yearField.isGood = false
      showMessageWithClassCSS(divDate,divDate.id,"beforeend",messagesError.numberOnly,"error")
   }
   else {
      if(!verifySizeField(yearField,2)){
            fields.yearField.isGood = false
            showMessageWithClassCSS(divDate,divDate.id,"beforeend",messagesError.yearSize,"error")
         }
      else if(!verifyIntervalField(yearField, currentYearFormatYY,99)){
            fields.yearField.isGood = false;
            showMessageWithClassCSS(divDate,divDate.id,"beforeend",messagesError.yearValue,"error")
         }
   }
}

// Vérifie le champ CVC
function verifyCVCField(){

   const errorCVC = document.querySelector('.cvc_error')
   if(errorCVC){
      errorCVC.remove()
   }

   fields.cvcField.isGood = true

   // Vérification de CVC
   if(verifyFieldIsEmpty(cvcField)){
      fields.cvcField.isGood = false
      showMessageWithClassCSS(cvcField,cvcField.id,"afterend",messagesError.fieldIsEmpty,"error")
   }
   else if(!verifyFormatField(cvcField,/^[0-9]+$/)){
      fields.cvcField.isGood = false
      showMessageWithClassCSS(cvcField,cvcField.id,"afterend",messagesError.numberOnly,"error")
   }
   else if(!verifySizeField(cvcField,3)){
      fields.cvcField.isGood = false
      showMessageWithClassCSS(cvcField,cvcField.id,"afterend",messagesError.cvcSize,"error")
   }
}

// Vérifie tout les champs
function verifyAllField(){

   let isAllGood = true ; 
   
   verifyCardholderNameField()
   verifyCardNumberField()
   verifyDate()
   verifyCVCField()
   
   // Parcours la liste d'objet field et si field.isGood == false ajoute la classe border_error et met isFormValid a false
   Object.values(fields).forEach((field)=>{
      if(field.isGood===false){
         field.element.classList.add("border_error")
         isAllGood = false
      }
   })

   return isAllGood

}

// Supprime le form et le remplace par une divSuccess et rempli cardFront et cardBack
function successAddCard(name,numberCard,month,year,cvc){
   
   form.remove()

   const divSuccess = ` <div id='divSuccess'>
                           <img src="images/icon-complete.svg" alt="Success">
                           <h2 class='uppercase'>thank you !</h2>
                           <p class='capitalize'>we've added your card details</p>
                        </div>`
   divForm.insertAdjacentHTML("beforeend",divSuccess)


   numberCard = numberCard.match(/.{1,4}/g)?.join(" ")

   const front = `<p class='numberCard'>${numberCard}</p>
                  <div>
                  <p class='uppercase name'>${name}</p>
                  <p class='dateCard'>${month}/${year}</p>
                  </div>`


   const back = `<p class='cvc'>${cvc}</p>` 

   cardFront.insertAdjacentHTML("beforeend",front)
   cardBack.insertAdjacentHTML("beforeend",back)

}

// Permet d'afficher une fausse modale loading non linéaire
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

Object.values(fields).forEach((field)=>{
   field.element.addEventListener("input" , (e) => {
      verifyAllFieldsNoEmpty()
   })
})

submit.disabled=false

// Ajoute un event blur a tout les champs
Object.values(fields).forEach((field)=>{
   field.element.addEventListener('blur',(e)=>{
      if(field.element.name==='year'){
         fieldYearisBlur = true;
      }
      field.verifyField()
   })
})

// Event au submit du form
submit.addEventListener("click", async (e)=>{
   
   e.preventDefault();
   
   init()

   await showFalseLoading(1)

   if(verifyAllField()){
      successAddCard(cardholderNameField.value,cardNumberField.value,monthField.value,yearField.value,cvcField.value)
   }
})

