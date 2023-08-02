const bearerToken = sessionStorage.getItem("bearerToken") || "";
const baseUrl = 'https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp';
const authToken = "Bearer " + bearerToken;

function createCustomer(){
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

function addCustomer(){
    const customerData = createCustomer();
    const apiUrl = `${baseUrl}?cmd=create`;
    fetch(apiUrl, {
        method: "POST",
        headers: {
            'Authorization': authToken,
        },
        body: JSON.stringify(customerData)
    })
    .then((response) => {
        if(response.ok){
            console.log("Customer added successfully");
            document.getElementById("message").innerHTML = "Customer added successfully";
            setInterval(() => {
                window.location.href = "/html/customerList.html";
            }, 1000);
        } else {
            throw new Error("Customer not added");
        }
    })
    .catch((error) => {
        console.error(error);
    });
}
document.getElementById("add-customer-btn").addEventListener("click", event => {
    event.preventDefault();
    addCustomer();
});
