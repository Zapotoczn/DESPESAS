const form = document.querySelector('form');
const amount = document.getElementById('amount');
const expense = document.getElementById('expense');
const category = document.getElementById('category');

const expenseList = document.querySelector('ul');
const expensesQuantity = document.querySelector("aside header p span")
const expensesTotal = document.querySelector("aside header h2")

amount.oninput = () => {
    let value = amount.value.replace(/\D/g, "");

    amount.value = formatCurrentBrl(value);
}

function formatCurrentBrl(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value / 100);

}

form.onsubmit = (event) => {
    event.preventDefault();

    const newExpense = {
        id: new Date().getTime(),
        amount: amount.value,
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        created_at: new Date()
    }

    expenseAdd(newExpense);
};

function expenseAdd(newExpense) {
    try {
        const expenseItem = document.createElement('li');
        expenseItem.classList.add("expense")

        const expenseIcon = document.createElement('img');
        expenseIcon.setAttribute('src', `img/${newExpense.category_id}.svg`);
        expenseIcon.setAttribute('alt', newExpense.category_name);
        
        // div

        const expenseInfo = document.createElement('div');
        expenseInfo.classList.add('expense-info');

        const expenseStrong = document.createElement('strong');
        expenseStrong.textContent = newExpense.expense;
        
        const expenseSpan = document.createElement('span');
        expenseSpan.textContent = newExpense.category_name;
        
        expenseInfo.append(expenseStrong, expenseSpan);
        //span

        const expenseSpanValue = document.createElement('span');
        expenseSpanValue.classList.add('expense-amount');
        expenseSpanValue.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace('R$', '')}`;

        // adicionar X
        const expenseXbutton = document.createElement('img');
        expenseXbutton.classList.add('remove-icon');
        expenseXbutton.setAttribute('src', './img/remove.svg');
        expenseXbutton.setAttribute('alt', 'Remover');

        // adicionar final
        expenseItem.append(expenseIcon, expenseInfo, expenseSpanValue, expenseXbutton);
        expenseList.append(expenseItem);

        //
        updateTotals();
        
    } catch (error) {
        console.error(error);
    }
}

function updateTotals() {
    try {
        const items = expenseList.children
        expensesQuantity.textContent = `${items.length} ${items.length > 1 ? 'despesas' : 'despesa'}`;

        let total = 0;

        for (let item = 0; item < items.length; item++) {
            const itemAmount = items[item].querySelector('.expense-amount');

            let value = itemAmount.textContent.replace(/[^\d]/g, "").replace(',', '.');

            value = parseFloat(value);

            total += Number(value);
        }

        expensesTotal.textContent = formatCurrentBrl(total);

    } catch (error) {
       console.error(error); 
    }
}

expenseList.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-icon')) {
        event.target.parentElement.remove();
        updateTotals();
    }
});