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
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
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
          "https://images.unsplash.com/photo-1501183638710-841dd1904471?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
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
    },
    {
      hotel: {
        name: "Parisian Elegance Hotel",
        city: "Paris",
        photos: [
          "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80"
        ],
        amenities: ["wifi", "restaurant", "spa", "gym"],
        lat: 48.8566,
        lng: 2.3522
      },
      rooms: [
        { type: "Classic Room", basePrice: 400, totalCount: 15, capacity: 2 },
        { type: "Eiffel View Suite", basePrice: 900, totalCount: 4, capacity: 2 }
      ]
    },
    {
      hotel: {
        name: "Kyoto Zen Gardens",
        city: "Kyoto",
        photos: [
          "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=800&q=80"
        ],
        amenities: ["spa", "wifi", "restaurant", "parking"],
        lat: 35.0116,
        lng: 135.7681
      },
      rooms: [
        { type: "Serenity Room", basePrice: 300, totalCount: 10, capacity: 2 },
        { type: "Garden View Suite", basePrice: 700, totalCount: 3, capacity: 4 }
      ]
    },
    {
      hotel: {
        name: "Swiss Alps Retreat",
        city: "St. Moritz",
        photos: [
          "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1506520141644-8cdce0e0ea79?auto=format&fit=crop&w=800&q=80"
        ],
        amenities: ["ski", "spa", "pool", "wifi", "fireplace"],
        lat: 46.4908,
        lng: 9.8355
      },
      rooms: [
        { type: "Mountain View Room", basePrice: 500, totalCount: 12, capacity: 2 },
        { type: "Luxury Chalet", basePrice: 1200, totalCount: 2, capacity: 6 }
      ]
    },
    {
      hotel: {
        name: "Dubai Desert Oasis",
        city: "Dubai",
        photos: [
          "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1582647509711-c8aa8a8bda71?auto=format&fit=crop&w=800&q=80"
        ],
        amenities: ["pool", "spa", "gym", "wifi", "restaurant"],
        lat: 25.2048,
        lng: 55.2708
      },
      rooms: [
        { type: "Oasis Room", basePrice: 350, totalCount: 20, capacity: 2 },
        { type: "Royal Desert Suite", basePrice: 1500, totalCount: 4, capacity: 4 }
      ]
    },
    {
      hotel: {
        name: "Amalfi Coast Villa",
        city: "Amalfi",
        photos: [
          "https://images.unsplash.com/photo-1533090161767-e6f6631ad0c9?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1498307833015-e7b400441eb8?auto=format&fit=crop&w=800&q=80"
        ],
        amenities: ["beach", "pool", "wifi", "restaurant"],
        lat: 40.6333,
        lng: 14.6029
      },
      rooms: [
        { type: "Sea View Room", basePrice: 450, totalCount: 8, capacity: 2 },
        { type: "Cliffside Suite", basePrice: 950, totalCount: 3, capacity: 3 }
      ]
    },
    {
      hotel: {
        name: "Sydney Harbour Suites",
        city: "Sydney",
        photos: [
          "https://images.unsplash.com/photo-1506973035872-a4e21a8dff6a?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1523428461295-d1ce4999f7d2?auto=format&fit=crop&w=800&q=80"
        ],
        amenities: ["pool", "gym", "wifi", "restaurant", "parking"],
        lat: -33.8688,
        lng: 151.2093
      },
      rooms: [
        { type: "Harbour View Room", basePrice: 300, totalCount: 15, capacity: 2 },
        { type: "Opera Suite", basePrice: 850, totalCount: 2, capacity: 4 }
      ]
    },
    {
      hotel: {
        name: "London Royal Boutique",
        city: "London",
        photos: [
          "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?auto=format&fit=crop&w=800&q=80"
        ],
        amenities: ["wifi", "restaurant", "gym", "spa"],
        lat: 51.5074,
        lng: -0.1278
      },
      rooms: [
        { type: "Classic British Room", basePrice: 380, totalCount: 12, capacity: 2 },
        { type: "Regent Suite", basePrice: 800, totalCount: 3, capacity: 3 }
      ]
    },
    {
      hotel: {
        name: "Rome Historic Palace",
        city: "Rome",
        photos: [
          "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1515542622106-78b28af7815d?auto=format&fit=crop&w=800&q=80"
        ],
        amenities: ["wifi", "restaurant", "parking"],
        lat: 41.9028,
        lng: 12.4964
      },
      rooms: [
        { type: "Piazza Room", basePrice: 320, totalCount: 10, capacity: 2 },
        { type: "Emperor Suite", basePrice: 750, totalCount: 4, capacity: 4 }
      ]
    },
    {
      hotel: {
        name: "Maldives Overwater Paradise",
        city: "Maldives",
        photos: [
          "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1506456044701-d64dfad96525?auto=format&fit=crop&w=800&q=80"
        ],
        amenities: ["beach", "pool", "spa", "wifi"],
        lat: 3.2028,
        lng: 73.2207
      },
      rooms: [
        { type: "Lagoon Villa", basePrice: 1100, totalCount: 6, capacity: 2 },
        { type: "Overwater Bungalow", basePrice: 1800, totalCount: 4, capacity: 2 }
      ]
    },
    {
      hotel: {
        name: "Cape Town Ocean View",
        city: "Cape Town",
        photos: [
          "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1575881476617-64dfd2365fd1?auto=format&fit=crop&w=800&q=80"
        ],
        amenities: ["pool", "wifi", "restaurant", "beach"],
        lat: -33.9249,
        lng: 18.4241
      },
      rooms: [
        { type: "Bay View Room", basePrice: 280, totalCount: 14, capacity: 2 },
        { type: "Atlantic Suite", basePrice: 650, totalCount: 3, capacity: 4 }
      ]
    },
    {
      hotel: {
        name: "Tokyo Tower Hotel",
        city: "Tokyo",
        photos: [
          "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&w=800&q=80"
        ],
        amenities: ["gym", "wifi", "restaurant", "spa"],
        lat: 35.6762,
        lng: 139.6503
      },
      rooms: [
        { type: "City Lights Room", basePrice: 350, totalCount: 20, capacity: 2 },
        { type: "Skyline Suite", basePrice: 900, totalCount: 5, capacity: 3 }
      ]
    },
    {
      hotel: {
        name: "Hawaii Volcano Lodge",
        city: "Hawaii",
        photos: [
          "https://images.unsplash.com/photo-1542259009477-d625272157b7?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1598471158656-baf44b586cc8?auto=format&fit=crop&w=800&q=80"
        ],
        amenities: ["beach", "pool", "wifi", "nature"],
        lat: 19.8968,
        lng: -155.5828
      },
      rooms: [
        { type: "Jungle Cabin", basePrice: 290, totalCount: 10, capacity: 2 },
        { type: "Oceanfront Villa", basePrice: 850, totalCount: 4, capacity: 5 }
      ]
    },
    {
      hotel: {
        name: "Venice Canal Palace",
        city: "Venice",
        photos: [
          "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=800&q=80"
        ],
        amenities: ["wifi", "restaurant"],
        lat: 45.4408,
        lng: 12.3155
      },
      rooms: [
        { type: "Gondola View Room", basePrice: 420, totalCount: 8, capacity: 2 },
        { type: "Grand Canal Suite", basePrice: 1050, totalCount: 2, capacity: 3 }
      ]
    },
    {
      hotel: {
        name: "Rio Copacabana Resort",
        city: "Rio de Janeiro",
        photos: [
          "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1518639192441-8fce0a366e2e?auto=format&fit=crop&w=800&q=80"
        ],
        amenities: ["beach", "pool", "gym", "wifi", "restaurant"],
        lat: -22.9068,
        lng: -43.1729
      },
      rooms: [
        { type: "Beachfront Room", basePrice: 310, totalCount: 15, capacity: 2 },
        { type: "Carnival Suite", basePrice: 780, totalCount: 3, capacity: 4 }
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
