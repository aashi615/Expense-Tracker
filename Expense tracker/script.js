const balance = document.getElementById("balance");
const money_plus= document.getElementById('money-plus');
const money_minus= document.getElementById('money-minus');
const list= document.getElementById("list");
const form= document.getElementById('form');
const text= document.getElementById('text');
const amount= document.getElementById('amount');


const localStorageTransaction = JSON.parse(localStorage.getItem("Transactions"))
let Transactions = localStorage.getItem("Transactions") !==null ? localStorageTransaction : [];

function addTransactionDOM(transaction){
 const sign= transaction.amount< 0 ? "-" : "+";
 const item= document.createElement("li");
    item.classList.add(
        transaction.amount < 0 ? "minus" : "plus"
    )
    item.innerHTML=` 
    ${transaction.text}<span>${sign}${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `;
    list.appendChild(item);
   }
   //removeTransaction
   function removeTransaction(id){
    Transactions=Transactions.filter(transaction => transaction.id !==id)
    updateLocalStorage();
    Init();
   }
   //Add Transaction
  function addTransaction(e){
    e.preventDefault();
    if(
        text.value.trim()=== "" || amount.value.trim()===""
    ){
        alert("Please Enter text and value");
    }
    else{
        const transaction ={
            id:generateID(),
            text:text.value,
            amount: +amount.value,
 };
 Transactions.push(transaction);
 addTransactionDOM(transaction);
 updateLocalStorage();
 updateValues();
 text.value="";
 amount.value="";
    }
 
}
//Generate ID
function generateID(){
    return Math.floor(Math.random()*10000000);
}
   //Update UpdateValues
   function updateValues(){
    //hr value ko fetch krna h
    const amounts = Transactions.map(transaction => transaction.amount);
    const total = amounts.reduce((acc,item) => (acc+=item),0).toFixed(2);
    const income = amounts.filter(item => item > 0).reduce((acc,item) => (acc+=item),0).toFixed(2);
    const expense = (
        amounts.filter(item => item<0).reduce((acc,item) => (acc+=item),0)*-1
    ).toFixed(2);

    balance.innerText=`$${total}`;
    money_plus.innerText=`$${income}`;
    money_minus.innerText=`$${expense}`;
   }
   //Init app
   function Init(){
    list.innerHTML="";
    Transactions.forEach(addTransactionDOM);
    updateValues();

   } 
   //Update Local Storage
   function updateLocalStorage(){
    localStorage.setItem(
        "transactions",
        JSON.stringify(Transactions)
    );
   }
   Init();
   
   form.addEventListener("submit",addTransaction);

