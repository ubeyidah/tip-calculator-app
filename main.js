const calculateItems = {
  moneyCents: 0,
  tip: 0,
  numberPeople: 0
}

const billInputEl = document.querySelector('.js-bill-input');
const optionsEl = document.querySelectorAll('.js-option');
const customTipInputEl = document.querySelector('.js-custom-tip-input');
const peoplesInputEl = document.querySelector('.js-peoples-input');
const tipAmountEl = document.querySelector('.js-tip-amount');
const totalEl = document.querySelector('.js-total');
const resetBtn = document.querySelector('.js-reset-btn');


function renderCalculation(){
  const tip = calculateItems.moneyCents * (calculateItems.tip / 100);
  const divideNumPeople = Math.round(tip / calculateItems.numberPeople);
  const tipAmountString = (divideNumPeople / 100).toFixed(2);
  const totalTip = Math.round(tip);
  const totalTipString = (totalTip / 100).toFixed(2)
  // display it in the page
  tipAmountEl.innerHTML = `${tipAmountString} <span>Birr</span>`;
  totalEl.innerHTML = `${totalTipString} <span>Birr</span>`;
}


// get bill value
billInputEl.addEventListener('input', () => {
  const {value} = billInputEl;
  const errorEl = document.querySelector('.js-bill-error')
  if(!value || value == ''){
    errorEl.textContent = 'Can\' be zero';
  }else{
    errorEl.textContent = '';
    calculateItems.moneyCents = +value * 100;
    checkAllFill();
  }
})

// get tip value
optionsEl.forEach(option => {
  option.addEventListener('click', (e) => {
    unactiveOptions();
    option.classList.toggle('active');
    calculateItems.tip = +e.target.value;
    customTipInputEl.value = '';
    checkAllFill();
  })
})

function unactiveOptions(){
  optionsEl.forEach(option => option.classList.remove('active'));
}

customTipInputEl.addEventListener('input' , () => {
  unactiveOptions();
  const errorEl = document.querySelector('.js-select-error');
  if(!customTipInputEl.value){
    errorEl.textContent = 'Select tip.';
  }else {
    errorEl.textContent = '';
    calculateItems.tip = +customTipInputEl.value;
    checkAllFill();
  }
})


// get number of people value
peoplesInputEl.addEventListener('input', ()=> {
  const errorEl = document.querySelector('.js-num-error');
  if(!peoplesInputEl.value){
    errorEl.textContent = 'Can\'t be zero.';
  }else {
    errorEl.textContent = '';
    calculateItems.numberPeople = +peoplesInputEl.value;
    checkAllFill();
  }
})


function checkAllFill(){
  if(calculateItems.moneyCents && calculateItems.tip && calculateItems.numberPeople){
    renderCalculation();
    resetBtn.disabled = false;
  }else{
    resetBtn.disabled = true;
    tipAmountEl.innerHTML = `0.00 <span>Birr</span>`;
    totalEl.innerHTML = `0.00 <span>Birr</span>`;
  }
}

resetBtn.addEventListener('click', () => {
  billInputEl.value = '';
  customTipInputEl.value = '';
  unactiveOptions();
  peoplesInputEl.value = '';
  resetBtn.disabled = true;
  tipAmountEl.innerHTML = `0.00 <span>Birr</span>`;
  totalEl.innerHTML = `0.00 <span>Birr</span>`;
  
})