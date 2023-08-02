async function authenticateUser() {
    const loginId = document.getElementById("loginId").value;
    const password = document.getElementById("password").value;
    const authUrl = "https://qa2.sunbasedata.com/sunbase/portal/api/assignment_auth.jsp";
    const loginCredentials = {
      login_id: loginId,
      password: password
    };
  
    try {
      //apiUrl
      const response = await fetch(authUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(loginCredentials)
      });
  
      if (response.ok) {
        const data = await response.json();
        const token = data.access_token;
        console.log("Token:", token);
        sessionStorage.setItem("bearerToken", token);
        setInterval(() => {
          window.location.href = "/html/customerList.html";
        }, 1000);
        return token;
      } else {
        throw new Error("Authentication failed");
      }
    } catch (error) {
      console.error("Error while authenticating user:", error);
      throw error;
    }
  }
  
//login button event handler
document.getElementById("login-btn").addEventListener("click", event => {
    event.preventDefault();
    authenticateUser();
});