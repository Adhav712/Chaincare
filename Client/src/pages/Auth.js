async function Auth() {
  const cookie = document.cookie;
  const jwt = cookie.split("=")[1];

  console.log("accessToken", jwt);
  const checkAuth = async() => {
      const fetchs = await fetch("http://localhost:3000/authentication", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + jwt,
        },
      });
      try {
        //get data from the response and store in the usestate
    
        const data = await fetchs.json();
        //console.log("17 Auth page",data);
        return data.ID;
      } catch (error) {
        console.log(error);
        window.location.href = "/login";
      }
  }
  checkAuth();
}

export default Auth;
