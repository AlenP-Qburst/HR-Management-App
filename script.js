//loading data to the table from two JSON files
fetch("./data.json")
    .then(response =>
        response.json())
    .then(data => {fetch("./skills.json")
    .then(res => res.json())
    .then(skills =>
    (emplData(data,skills)))});

let newArr=[];
function emplData(data,skillSet) {
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
  
//Load dropdown datas from JSON

fetch("./skills.json")
    .then(resp => resp.json())
    .then(skills => skillList(skills));
 
function skillList(skills) {
    let filterSelect=document.getElementById("filter-select");
    let addSkillSelect=document.getElementById("add-skill-select");
    let updateSkillSelect=document.getElementById("update-skill-select");
    skills.forEach(item => {
        let addSkillOPtions=document.createElement("option");
        addSkillOPtions.innerHTML=`<option value="${item.skill_name}">${item.skill_name}</option>`
        addSkillSelect.appendChild(addSkillOPtions);
         let filterOptions=document.createElement("option");
        filterOptions.innerHTML=`<option value="${item.skill_name}">${item.skill_name}</option>`
        filterSelect.appendChild(filterOptions);
        let updateSkillOption=document.createElement("option")
        updateSkillOption.innerHTML=`<option value="${item.skill_name}">${item.skill_name}</option>`
        updateSkillSelect.appendChild(updateSkillOption);
    })
}

//Sorting feature

let nameAscn=document.getElementById("name-ascn");
nameAscn.onclick=()=>
    {console.log("name asn click")};


function sortTable(columnIndex, order) {
    console.log("click");
    let table = document.getElementById("table");
    let switching, rowArr, x, y, i,shouldSwap;
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
            } 
            else {
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

 //Filtering feature
 






            
//  let update=document.getElementById("tbody");
//  update.addEventListener("click",() =>{
//     modal.style.display ="block";
//  })     