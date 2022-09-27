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
    let table_row_head = document.createElement("tr");
    table_row_head.setAttribute("id", "tr_head");
    table_row_head.innerHTML = `<th>Employee ID</th><th>Employee Name</th><th>Designation</th><th>Email-ID</th><th>Skills</th><th>Actions</th>`
    thead.appendChild(table_row_head);
    data.forEach(item => {
        let tbody = document.getElementById("tbody");
        let table_row_data = document.createElement("tr");
        table_row_data.setAttribute("class", "tr_data");
        let reqSkill = item.skills.map(skillId => {
            for (let skillObj of skillSet) {
                if (skillObj.skill_id == skillId) {
                    return skillObj.skill_name;
                }
            }
        })
        table_row_data.innerHTML = `<td>${item.emp_id}</td><td>${item.emp_name}</td>
        <td>${item.emp_desig}</td><td>${item.email_id}</td><td>${reqSkill.join(", ")}</td>
        <td><button id="dlt-btn" onclick="dltModal()">Delete</button></td>`
        tbody.appendChild(table_row_data);
    });

}
//Add-Modal Box
let modal = document.getElementById("modal-box");

// Get the button that opens the modal
let btn = document.getElementById("add-btn");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
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
    let noBtn = document.getElementById("noBtn");
    noBtn.addEventListener("click", () => {
        dltModal.style.display = "none";
    })
}




//filter dropdown

let filter_dropdown = document.getElementById("filter-box-head");
let filter_list = document.getElementById("filter-list");
filter_dropdown.addEventListener("click", () => {

    if (filter_list.style.display == "block") {
        filter_list.style.display = "none";
    } else
        filter_list.style.display = "block";
})


//skill dropdown inside Add-Modal box

fetch("./skills.json")
    .then(resp => resp.json())
    .then(skills => skillList(skills));

function skillList(skills) {
    skills.forEach(item => {
        let skill_list = document.getElementById("skill-list");
        let list_item = document.createElement("li");
        list_item.setAttribute("class", "skill-list-items")
        list_item.innerHTML = `<li>${item.skill_name}</li>`;
        skill_list.appendChild(list_item);
    });
    let skill_dropdown = document.getElementById("skill-box-head");
    let skill_list = document.getElementById("skill-list");
    skill_dropdown.addEventListener("click", () => {

        if (skill_list.style.display == "block") {
            skill_list.style.display = "none";
        } else
            skill_list.style.display = "block";
    })
}
//sort dropdown

let sort_dropdown = document.getElementById("sort-box-head");
let sort_list = document.getElementById("sort-list");
sort_dropdown.addEventListener("click", () => {

    if (sort_list.style.display == "block") {
        sort_list.style.display = "none";
    } else
        sort_list.style.display = "block";
})
