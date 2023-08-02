const bearerToken = sessionStorage.getItem("bearerToken") || "";
const baseUrl = 'https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp';
const authToken = "Bearer " + bearerToken;
const tableBody = document.getElementById("customer-list");

function getCustomerList(){
    const apiUrl =  `${baseUrl}?cmd=get_customer_list`;
    fetch(apiUrl, {
        method: "GET",
        headers: {
            'Authorization': authToken,
        }
    })
    .then((response) => response.json())
    .then((customerList) => {
        console.log(customerList);
        renderData(customerList);
    })
    .catch((error) => {
        console.error(error);
    });

}

function renderData(data){
    tableBody.innerHTML = "";
    data.forEach((customer) => {
        const tableRow = document.createElement("tr");
        tableRow.innerHTML = `
            <td>${customer.first_name}</td>
            <td>${customer.last_name}</td>
            <td>${customer.address}</td>
            <td>${customer.city}</td>
            <td>${customer.state}</td>
            <td>${customer.email}</td>
            <td>${customer.phone}</td>
            <td id="action"><button id="deleteBtn" data-uuid="${customer.uuid}"><span class="material-icons">delete</span></button> <button id="editBtn" data-uuid="${customer.uuid}"><span class="material-icons">edit</span></button></td>
        `;
        tableBody.appendChild(tableRow);
    });
    const deleteButtons = document.querySelectorAll('#deleteBtn');
  deleteButtons.forEach(btn => {
    btn.addEventListener('click', handleDelete);
  });

  const editButtons = document.querySelectorAll('#editBtn');
  editButtons.forEach(btn => {
    btn.addEventListener('click', (event) => {
        const uuidElement = event.target.parentNode;
        const uuid = uuidElement.getAttribute('data-uuid');
        console.log('Edit customer with uuid:', uuid);
        sessionStorage.setItem("uuid", uuid);
        window.location.href = "/html/updateCustomer.html";
    });
  });
}

getCustomerList();

function handleDelete(event) {
    const uuidElement = event.target.parentNode;
    const uuid = uuidElement.getAttribute('data-uuid');
    console.log('Delete customer with uuid:', uuid);
    deleteCustomer(uuid)
    const row = uuidElement.parentNode.parentNode;
    tableBody.removeChild(row);
  }
  
  // Function to delete a specific customer
  function deleteCustomer(uuid) {
    const deleteUrl = `${baseUrl}?cmd=delete&uuid=${uuid}`;
          fetch(deleteUrl, {
              method: 'POST',
              headers: {
                  'Authorization': authToken
              }
          })
        .then((response) => {
                if(response.ok){
                    console.log("Customer deleted successfully");
                } else {
                    throw new Error("Customer not deleted!!");
                }
        })
        .catch((error) => {
            console.error(error);
        });
  }
  
  document.getElementById("customer-page-btn").addEventListener("click", event => {
    event.preventDefault();
    window.location.href = "/html/addCustomer.html";
  });