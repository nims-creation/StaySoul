import axios from 'axios';

async function seed() {
  try {
    console.log("Logging in as admin...");
    const loginRes = await axios.post('http://localhost:8080/api/v1/auth/login', {
      email: 'admin2@gmail.com',
      password: 'password'
    });
    
    let token = loginRes.data;
    if (typeof token === 'object' && token.data && token.data.accessToken) {
      token = token.data.accessToken;
    } else if (typeof token === 'object' && token.accessToken) {
      token = token.accessToken;
    }
    
    console.log("Admin login successful. Token extracted.");
    
    const axiosAuth = axios.create({
      baseURL: 'http://localhost:8080/api/v1',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    console.log("Creating Hotel 1...");
    const hotelData = {
      name: "Minimalist Ocean View Villa",
      location: "Malibu, California",
      city: "Malibu",
      address: "123 Ocean Drive",
      email: "host@malibu.com",
      phoneNumber: "1234567890",
      photos: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750"],
      amenities: ["beachfront", "wifi", "modern"],
      price: 150
    };
    
    const hotelRes = await axiosAuth.post('/admin/hotels', hotelData);
    const hotelId = hotelRes.data.id || (hotelRes.data.data ? hotelRes.data.data.id : null);
    console.log("Hotel created with ID:", hotelId);
    
    // Create a room
    console.log("Creating room for hotel " + hotelId + "...");
    const roomData = {
      type: "KING",
      price: 150,
      totalRooms: 5,
      amenities: ["Ocean View", "Balcony"]
    };
    const roomRes = await axiosAuth.post(`/admin/hotels/${hotelId}/rooms`, roomData);
    console.log("Room created.");
    
    // Activate Hotel
    console.log("Activating Hotel...");
    await axiosAuth.patch(`/admin/hotels/${hotelId}/activate`);
    console.log("Hotel activated.");
    
  } catch (e) {
    if (e.response) {
      console.log("Error status:", e.response.status);
      console.log("Error JSON:", JSON.stringify(e.response.data));
    } else {
      console.log("Error:", e.message);
    }
  }
}
seed();
