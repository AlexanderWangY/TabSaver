let myLeads = [];
const inputEl = document.getElementById('input-el');
const inputBtn = document.getElementById('input-btn');
const deleteBtn = document.getElementById('delete-btn');
const ulEl = document.getElementById('ul-el');
const tabBtn = document.getElementById('tab-btn');

const leadsFromLS = JSON.parse( localStorage.getItem("myLeads") );

if (leadsFromLS) {
    myLeads = leadsFromLS;
    render(myLeads);
}

tabBtn.addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var tab = tabs[0];
        myLeads.push(tab.url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
    });
});

inputBtn.addEventListener('click', function() {
    myLeads.push(inputEl.value);
    inputEl.value = '';
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
});

deleteBtn.addEventListener('dblclick', () => {
    myLeads = [];
    localStorage.clear();
    render(myLeads);
});


function render(leads) {
    let thisLead = leads;
    let listItems = "";
for (let i = 0; i < thisLead.length; i++) {
    listItems += `
    <li>
        <a target='_blank' href='${thisLead[i]}'>
            ${thisLead[i]}
        </a>
    </li>
    `
};
ulEl.innerHTML = listItems;
};
