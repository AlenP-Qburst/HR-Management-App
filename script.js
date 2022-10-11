//loading data to the table from two JSON files


fetch("./data.json")
    .then(response =>
        response.json())
    .then(data => {
        fetch("./skills.json")
            .then(res => res.json())
            .then(skills =>
                (emplData(data, skills)))
    });

let newArr = [];

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
       <td><img src="./images/edit-icon.png" id="edit-btn" onclick="edtModal()">
       <img src="./images/delete-icon.png" id="dlt-btn" onclick="dltModal()"></td>`
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

function edtModal() {
    let edtModal = document.getElementById("edit-modal");
    edtModal.style.display = "block";
    let cancelBtn = document.getElementById("cancel-btn");
    cancelBtn.addEventListener("click", () => {
        edtModal.style.display = "none";
    })

}

function dltModal() {
    let dltModal = document.getElementById("dlt-modal");
    dltModal.style.display = "block";
    let noBtn = document.getElementById("no-btn");
    noBtn.addEventListener("click", () => {
        dltModal.style.display = "none";
    })
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
