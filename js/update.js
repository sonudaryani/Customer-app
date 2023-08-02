const bearerToken = sessionStorage.getItem("bearerToken") || "";
const baseUrl = 'https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp';
const authToken = "Bearer " + bearerToken;
const message = document.getElementById("message");


//function to edit customer object from form input data by user
function editCustomer(){
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;
    const street = document.getElementById("street").value;
    const city = document.getElementById("city").value;
    const state = document.getElementById("state").value;

    if(firstName === "" || lastName === ""){
        message.innerHTML = "Please enter atleast first name and last name";
        message.style.color = "red";
        return;
    }

    const customerData = {
        first_name: firstName,
        last_name: lastName,
        street: street,
        address: address,
        city: city,
        state: state,
        email: email,
        phone: phone
    };

    return customerData;
}

//function to update customer to database
function updateCustomer(){
    const uuid = sessionStorage.getItem("uuid");
    fetch(`${baseUrl}?cmd=update&uuid=${uuid}`, {
        method: "POST",
        headers: {
            'Authorization': authToken,
        },
        body: JSON.stringify(editCustomer())
    })
    .then((response) => {
        if(response.ok){
            console.log("Customer updated successfully");
            document.getElementById("message").innerHTML = "Customer updated successfully";
            sessionStorage.removeItem("uuid");
            setInterval(() => {
                window.location.href = "/html/customerList.html";
            }, 1000);
        } else {
            throw new Error("Customer not updated");
        }
    })
    .catch((error) => {
        console.error(error);
    });
}

//event listener for update button
document.getElementById("update-customer-btn").addEventListener("click", event => {
    event.preventDefault();
    updateCustomer();
});