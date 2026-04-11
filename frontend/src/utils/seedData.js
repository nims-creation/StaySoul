import { adminApi } from '../api/apiClient';

/**
 * Seeds the database with premium demo properties.
 * IMPORTANT: The Hotel entity uses 'photos' (String[] array), NOT 'imageUrl'.
 * Sending 'imageUrl' would be silently ignored by the backend.
 */
export const seedPremiumProperties = async () => {
  const properties = [
    {
      hotel: {
        name: "Azure Haven Resort",
        city: "Maldives",
        photos: [
          "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=800&q=80"
        ],
        amenities: ["beach", "pool", "spa", "wifi", "restaurant"],
        lat: 4.1755,
        lng: 73.5093
      },
      rooms: [
        { type: "Ocean Villa", basePrice: 1200, totalCount: 5, capacity: 2 },
        { type: "Presidential Water Suite", basePrice: 2500, totalCount: 2, capacity: 4 }
      ]
    },
    {
      hotel: {
        name: "Skyline Elite Suites",
        city: "New York",
        photos: [
          "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1455587734955-081b22074882?auto=format&fit=crop&w=800&q=80"
        ],
        amenities: ["pool", "gym", "wifi", "restaurant", "parking"],
        lat: 40.7580,
        lng: -73.9855
      },
      rooms: [
        { type: "Manhattan Suite", basePrice: 650, totalCount: 10, capacity: 2 },
        { type: "Penthouse Loft", basePrice: 1500, totalCount: 2, capacity: 3 }
      ]
    },
    {
      hotel: {
        name: "Everest Peak Lodge",
        city: "Zermatt",
        photos: [
          "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80"
        ],
        amenities: ["ski", "spa", "wifi", "restaurant", "fireplace"],
        lat: 46.0207,
        lng: 7.7491
      },
      rooms: [
        { type: "Alpine Cabin", basePrice: 450, totalCount: 8, capacity: 2 },
        { type: "Family Stone Lodge", basePrice: 850, totalCount: 4, capacity: 6 }
      ]
    },
    {
      hotel: {
        name: "Bali Tranquil Estate",
        city: "Bali",
        photos: [
          "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=800&q=80"
        ],
        amenities: ["pool", "spa", "wifi", "beach", "yoga"],
        lat: -8.4095,
        lng: 115.1889
      },
      rooms: [
        { type: "Garden Villa", basePrice: 320, totalCount: 6, capacity: 2 },
        { type: "Infinity Pool Suite", basePrice: 780, totalCount: 3, capacity: 4 }
      ]
    },
    {
      hotel: {
        name: "Royal Rajputana Palace",
        city: "Mumbai",
        photos: [
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&w=800&q=80"
        ],
        amenities: ["pool", "spa", "wifi", "restaurant", "gym"],
        lat: 18.9388,
        lng: 72.8354
      },
      rooms: [
        { type: "Heritage Room", basePrice: 280, totalCount: 15, capacity: 2 },
        { type: "Maharaja Suite", basePrice: 950, totalCount: 3, capacity: 4 }
      ]
    },
    {
      hotel: {
        name: "Santorini Cliff Villas",
        city: "Santorini",
        photos: [
          "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=800&q=80"
        ],
        amenities: ["pool", "spa", "wifi", "restaurant", "beach"],
        lat: 36.3932,
        lng: 25.4615
      },
      rooms: [
        { type: "Sunset Cliff Room", basePrice: 550, totalCount: 8, capacity: 2 },
        { type: "Caldera View Villa", basePrice: 1100, totalCount: 4, capacity: 3 }
      ]
    }
  ];

  const results = [];
  for (const item of properties) {
    // 1. Create Hotel
    const hotel = await adminApi.createHotel(item.hotel);
    
    // 2. Add Rooms
    for (const roomData of item.rooms) {
      await adminApi.addRoom(hotel.id, roomData);
    }
    
    // 3. Activate - creates inventory for all rooms for the next year
    await adminApi.activateHotel(hotel.id);
    
    results.push(hotel);
  }
  
  return results;
};
