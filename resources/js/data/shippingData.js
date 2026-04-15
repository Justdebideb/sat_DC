export const COURIERS = [
  {
    id: 'lbc',
    name: 'LBC Express',
    logo: 'LBC',
    trackingUrl: 'https://www.lbcexpress.com/track/',
    color: '#DC143C',
    deliveryTime: '2-3 business days',
  },
  {
    id: 'grab',
    name: 'GrabExpress',
    logo: 'Grab',
    trackingUrl: 'https://www.grab.com/ph/express/tracking/',
    color: '#00A651',
    deliveryTime: 'Same day - 1 day',
  },
  {
    id: 'jnt',
    name: 'J&T Express',
    logo: 'J&T',
    trackingUrl: 'https://www.jtexpress.ph/track',
    color: '#FF6B35',
    deliveryTime: '2-4 business days',
  },
  {
    id: 'ninjavan',
    name: 'Ninja Van',
    logo: 'Ninja',
    trackingUrl: 'https://www.ninjavan.ph/track',
    color: '#FFBB00',
    deliveryTime: '2-3 business days',
  },
];

export const SHIPPING_ZONES = [
  {
    id: 'metro_manila',
    name: 'Metro Manila',
    cities: ['Manila', 'Quezon City', 'Caloocan', 'Makati', 'Pasay', 'Taguig', 'Pasig', 'Mandaluyong', 'Muntinlupa', 'Las Piñas', 'Parañaque', 'Marikina', 'San Juan', 'Valenzuela'],
    deliveryTime: '1-2 days',
    shippingFee: 50,
  },
  {
    id: 'luzon',
    name: 'Luzon (Outside Metro Manila)',
    cities: ['Baguio', 'Angeles', 'Batangas', 'Lipa', 'Laguna', 'Cavite', 'Pampanga', 'Tarlac', 'Nueva Ecija', 'Olongapo'],
    deliveryTime: '2-3 days',
    shippingFee: 80,
  },
  {
    id: 'visayas',
    name: 'Visayas',
    cities: ['Cebu', 'Iloilo', 'Bacolod', 'Tacloban', 'Dumaguete', 'Roxas'],
    deliveryTime: '3-5 days',
    shippingFee: 120,
  },
  {
    id: 'mindanao',
    name: 'Mindanao',
    cities: ['Davao', 'Cagayan de Oro', 'General Santos', 'Zamboanga', 'Butuan', 'Surigao'],
    deliveryTime: '4-7 days',
    shippingFee: 150,
  },
];

export const TRACKING_EVENTS = [
  {
    status: 'order_placed',
    title: 'Order Placed',
    description: 'Your order has been received and is being processed',
    timestamp: '2026-04-12T10:30:00',
    location: 'Online',
    completed: true,
  },
  {
    status: 'payment_confirmed',
    title: 'Payment Confirmed',
    description: 'Payment has been successfully processed',
    timestamp: '2026-04-12T10:35:00',
    location: 'Online',
    completed: true,
  },
  {
    status: 'processing',
    title: 'Order Processing',
    description: 'Your order is being prepared for shipment',
    timestamp: '2026-04-12T14:00:00',
    location: 'AURA Warehouse, Quezon City',
    completed: true,
  },
  {
    status: 'packed',
    title: 'Order Packed',
    description: 'Your items have been carefully packed',
    timestamp: '2026-04-12T16:30:00',
    location: 'AURA Warehouse, Quezon City',
    completed: true,
  },
  {
    status: 'shipped',
    title: 'Shipped',
    description: 'Your order has been handed over to the courier',
    timestamp: '2026-04-13T09:00:00',
    location: 'LBC Hub, Quezon City',
    completed: true,
  },
  {
    status: 'in_transit',
    title: 'In Transit',
    description: 'Your package is on its way to your address',
    timestamp: '2026-04-13T11:45:00',
    location: 'LBC Sorting Center, Manila',
    completed: true,
  },
  {
    status: 'out_for_delivery',
    title: 'Out for Delivery',
    description: 'Your package is with the delivery rider',
    timestamp: '2026-04-13T15:30:00',
    location: 'LBC Branch, Makati',
    completed: false,
  },
  {
    status: 'delivered',
    title: 'Delivered',
    description: 'Your package has been successfully delivered',
    timestamp: null,
    location: 'Your Address',
    completed: false,
  },
];

export const generateTrackingData = (orderNumber, shippingAddress) => {
  const courier = COURIERS[Math.floor(Math.random() * COURIERS.length)];
  const trackingNumber = `${courier.id.toUpperCase()}-${orderNumber.slice(-8)}-${Math.floor(Math.random() * 1000)}`;
  
  // Determine shipping zone based on address
  let zone = SHIPPING_ZONES[0]; // Default to Metro Manila
  for (const z of SHIPPING_ZONES) {
    if (z.cities.some(city => shippingAddress.city?.toLowerCase().includes(city.toLowerCase()))) {
      zone = z;
      break;
    }
  }
  
  return {
    orderNumber,
    trackingNumber,
    courier,
    estimatedDelivery: new Date(Date.now() + (2 * 24 * 60 * 60 * 1000)), // 2 days from now
    currentStatus: 'in_transit',
    shippingZone: zone,
    events: TRACKING_EVENTS,
    shippingAddress,
  };
};
