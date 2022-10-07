fetch("./data.json")
    .then(response =>
        response.json())
    .then(data => {
        fetch("./skills.json")
            .then(res => res.json())
            .then(skills =>
                (emplData(data, skills)))
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
       <td><img src="./images/edit-icon.png" id="edit-btn" onclick="edtModal()">
       <img src="./images/delete-icon.png" id="dlt-btn" onclick="dltModal()"></td>`
        tbody.appendChild(tableRowData);
    });
}
//Add-Modal Box
let modal = document.getElementById("modal-box");
let editModal = document.getElementById("edit-modal-content")
// Get the button that opens the modal
let btn = document.getElementById("add-btn");
 
// Get the <span> element that closes the modal
let span = document.getElementsByTagName("span")[0];
 
// When the user clicks on the button, open the modal
btn.onclick = function () {
    modal.style.display = "block";
 
}
 
// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
    editModal.style.display = "none";
}
 
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
 
    }
}
// Delete-Modal Box
function dltModal() {
    let dltModal = document.getElementById("dlt-modal");
    dltModal.style.display = "block";
    let noBtn = document.getElementById("no-btn");
    noBtn.addEventListener("click", () => {
        dltModal.style.display = "none";
    })
}
 
function edtModal() {
    let edtModal = document.getElementById("edit-modal");
    edtModal.style.display = "block";
    let cancelBtn = document.getElementById("cancel-btn");
    cancelBtn.addEventListener("click", () => {
        edtModal.style.display = "none";
    })
 
}
 
 
//filter dropdown
 
let filterDropdown = document.getElementById("filter-box-head");
let filterList = document.getElementById("filter-list");
filterDropdown.addEventListener("click", () => {
 
    if (filterList.style.display == "block") {
        filterList.style.display = "none";
    } else
        filterList.style.display = "block";
})
 
 
//skill dropdown inside Add-Modal box
 
fetch("./skills.json")
    .then(resp => resp.json())
    .then(skills => skillList(skills));
 
function skillList(skills) {
    skills.forEach(item => {
        let skillList = document.getElementById("skill-list");
        let listItem = document.createElement("li");
        listItem.setAttribute("class", "skill-list-items")
        listItem.innerHTML = `<li>${item.skill_name}</li>`;
        skillList.appendChild(listItem);
    });
    let skill_dropdown = document.getElementById("skill-box-head");
    let skillList = document.getElementById("skill-list");
    skill_dropdown.addEventListener("click", () => {
 
        if (skillList.style.display == "block") {
            skillList.style.display = "none";
        } else
            skillList.style.display = "block";
    })
}
//sort dropdown
 
let sortDropdown = document.getElementById("sort-box-head");
let sortList = document.getElementById("sort-list");
sortDropdown.addEventListener("click", () => {
 
    if (sortList.style.display == "block") {
        sortList.style.display = "none";
    } else
        sortList.style.display = "block";
})
