fetch("./data.json")
    .then(response =>
        response.json())
    .then(data => emplData(data));
 

function emplData(data) {
    let thead = document.getElementById("thead");
    let table_row_head = document.createElement("tr");
    table_row_head.setAttribute("id", "tr_head");
    table_row_head.innerHTML = `<th>Emp. ID</th><th>Emp. Name</th><th>Designation</th><th>Email-ID</th><th>Skills</th>`
    thead.appendChild(table_row_head);
    data.forEach(item => {
        let tbody = document.getElementById("tbody");
        let table_row_data = document.createElement("tr");
        table_row_data.setAttribute("class", "tr_data");
        table_row_data.innerHTML = `<td>${item.emp_id}</td><td>${item.emp_name}</td><td>${item.emp_desig}</td><td>${item.email_id}</td><td>${item.skills}</td>`
        tbody.appendChild(table_row_data);
    });

}

