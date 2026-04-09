const axios = require('axios');

async function test() {
  try {
    const response = await axios.post('http://localhost:8080/api/v1/auth/login', {
      email: 'success_test3@gmail.com',
      password: 'password'
    });
    console.log("Response data type:", typeof response.data);
    console.log("Response data keys:", Object.keys(response.data));
    console.log("Response data full:", JSON.stringify(response.data));
  } catch (e) {
    if (e.response) {
      console.log("Error response status:", e.response.status);
      console.log("Error response data full:", JSON.stringify(e.response.data));
    } else {
      console.log("Error:", e.message);
    }
  }
}
test();
