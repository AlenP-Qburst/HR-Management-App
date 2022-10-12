//loading data to the table from two JSON files


fetch("./data.json")
    .then(response =>
        response.json())
    .then(data => {
    localStorage.setItem("employeeData",JSON.stringify(data));
        fetch("./skills.json")
            .then(res => res.json())
            .then(skills =>{
                localStorage.setItem("employeeSkills",JSON.stringify(skills))
                emplData(data, skills)
            })
    });



function emplData(data, skillSet) {
    let thead = document.getElementById("thead");
    let tableRowHead = document.createElement("tr");
    tableRowHead.setAttribute("id", "tr_head");
    tableRowHead.innerHTML = `<th>Employee ID</th><th>Employee Name</th><th>Designation</th><th>Email-ID</th><th>Skills</th><th>Actions</th>`
    thead.appendChild(tableRowHead);
    data.forEach(item => {
        let tbody = document.getElementById("tbody");
        let tableRowData = document.createElement("tr");
        tableRowData.setAttribute("class", "tr_data");
        let reqSkill = item.skills.map(skillId => {
            for (let skillObj of skillSet) {
                if (skillObj.skill_id == skillId) {
                    return skillObj.skill_name;
                }
            }
        })
        tableRowData.innerHTML = `<td>${item.emp_id}</td><td>${item.emp_name}</td>
       <td>${item.emp_desig}</td><td>${item.email_id}</td><td>${reqSkill.join(", ")}</td>
       <td><img src="./images/edit-icon.png" class="edit-btn" onclick="edtModal(this)" data-id="${item.emp_id}" data-name="${item.emp_name}"
       data-desig="${item.emp_desig}" data-email ="${item.email_id}" data-exp="${item.emp_exp}" data-phone ="${item.phone}" >
       <img src="./images/delete-icon.png" class="dlt-btn" onclick="dltModal(this)"></td>`
        tbody.appendChild(tableRowData);
    });
}

//----------------------------------------------------------------------------------------------//


//Modal Box- add and update

let modal = document.getElementById("modal-box");
let editModal = document.getElementById("edit-modal")
let btn = document.getElementById("add-btn");
let span = document.getElementsByTagName("span")[1];
btn.onclick = function () {
    modal.style.display = "block";
}
//close the modal when clicked on close symbol
span.onclick = function () {
    modal.style.display = "none";
    editModal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal || event.target == editModal) {
        modal.style.display = "none";
        editModal.style.display = "none";
    }
}

//------------------------------------------------------------------------------------------------//


// Update and delete modal display

function edtModal(iconTag) {

    let edtEmpId = document.getElementById("edit-emp-id").value = iconTag.dataset.id;
    let edtEmpName = document.getElementById("edit-emp-name").value = iconTag.dataset.name;
    let edtEmpDesig = document.getElementById("edit-emp-desig").value = iconTag.dataset.desig;
    let edtEmpEmail = document.getElementById("edit-emp-email").value = iconTag.dataset.email;
    let edtEmpExp = document.getElementById("edit-emp-exp").value = iconTag.dataset.exp;
    let edtEmpPhone = document.getElementById("edit-emp-phone").value = iconTag.dataset.phone;
    let edtModal = document.getElementById("edit-modal");
    edtModal.style.display = "block";
    let cancelBtn = document.getElementById("cancel-btn");
    cancelBtn.onclick = () => {
        edtModal.style.display = "none";
    }

}


//Delete Modal display and data deletion from the table



function dltModal(r) {
    
    let dltModal = document.getElementById("dlt-modal");
    dltModal.style.display = "block";
    let noBtn = document.getElementById("no-btn");
    noBtn.onclick = () => {
        dltModal.style.display = "none";
    }
    
    let yesBtn = document.getElementById("yes-btn");
    yesBtn.onclick = () => {
        dltModal.style.display = "none"; 
        var i = r.parentNode.parentNode.rowIndex;
        document.getElementById("table").deleteRow(i);
        
    }  
}


//------------------------------------------------------------------------------------------------//


//Sorting feature

let sortSelect = document.getElementById("sort-select");
sortSelect.addEventListener("change", () => {
    let sortSelect = document.getElementById("sort-select");
    let value = sortSelect.options[sortSelect.selectedIndex].value;
    switch (value) {
        case "Emp-ID (ascending)":
            sortTable(0, true);
            break;
        case "Emp-ID (descending)":
            sortTable(0, false);
            break;
        case "Alphabetic (a-z)":
            sortTable(1, true);
            break;
        case "Alphabetic (z-a)":
            sortTable(1, false);
            break;
    }
});

function sortTable(columnIndex, order) {
    let table = document.getElementById("table");
    let switching, rowArr, x, y, i, shouldSwap;
    switching = true;
    while (switching) {
        switching = false;
        rowArr = table.rows;
        for (i = 1; i < (rowArr.length - 1); i++) {
            shouldSwap = false;
            x = rowArr[i].getElementsByTagName("TD")[columnIndex];
            y = rowArr[i + 1].getElementsByTagName("TD")[columnIndex];
            if (order) {
                if ((columnIndex !== 0 && x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) || (columnIndex == 0 && Number(x.innerHTML) > Number(y.innerHTML))) {
                    shouldSwap = true;
                    break;
                }
            } else {
                if ((columnIndex !== 0 && x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) || (columnIndex == 0 && Number(x.innerHTML) < Number(y.innerHTML))) {
                    shouldSwap = true;
                    break;
                }
            }
        }
        if (shouldSwap) {
            rowArr[i].parentNode.insertBefore(rowArr[i + 1], rowArr[i]);
            switching = true;
        }
    }

}
//-----------------------------------------------------------------------------------------------//


//Filter table data based on skills

function filterFunction() {
    let dataAcquired;
    let userInput = document.getElementById("filter-input");
    let inputCaps = userInput.value.toUpperCase();
    let table = document.getElementById("table");
    let tr = table.getElementsByTagName("tr");
    let noOfRows = tr.length;

    for (let i = 0; i < noOfRows; i++) {
        let rowData = tr[i].getElementsByTagName("td")[4];
        if (rowData) {
            dataAcquired = rowData.textContent || rowData.innerHTML;

            if (dataAcquired.toUpperCase().includes(inputCaps)) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }

    }
}


//------------------------------------------------------------------------------------------//


//Add new employee


function addEmployee(){
let addModal=document.getElementById("modal-box");
addModal.style.display="none";    
let empID=document.getElementById("add-emp-id").value;
let empName=document.getElementById("add-emp-name").value;
let empDesig=document.getElementById("add-emp-desig").value;
let empEmail=document.getElementById("add-email-id").value;
let empExp=document.getElementById("add-emp-exp").value;
let empPhone=document.getElementById("add-emp-phone").value;
let tableBody=document.querySelector(".tbody");
let newRow=document.createElement("tr")
newRow.setAttribute("class", "tr_data");

newRow.innerHTML=`<td>${empID}</td><td>${empName}</td><td>${empDesig}</td><td>${empEmail}</td><td> </td>
<td><img src="./images/edit-icon.png" class="edit-btn"></img><img src="./images/delete-icon.png" class="dlt-btn" onclick="dltModal(this)"</td>`
tableBody.appendChild(newRow);

}





