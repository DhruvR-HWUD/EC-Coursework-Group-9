export interface Store {
  id: string;
  name: string;
  address: string;
  city: string;
  postcode: string;
  phone: string;
  hours: { days: string; time: string }[];
  clickCollectAvailable: boolean;
  coordinates: { lat: number; lng: number };
}

export const stores: Store[] = [
  {
    id: 'store-1',
    name: 'Verde Boutique — Covent Garden',
    address: '14 Floral Street',
    city: 'London',
    postcode: 'WC2E 9DH',
    phone: '+44 20 7946 0958',
    hours: [
      { days: 'Monday – Friday', time: '10:00 – 19:00' },
      { days: 'Saturday', time: '10:00 – 18:00' },
      { days: 'Sunday', time: '11:00 – 17:00' },
    ],
    clickCollectAvailable: true,
    coordinates: { lat: 51.5129, lng: -0.1243 },
  },
  {
    id: 'store-2',
    name: 'Verde Boutique — Northern Quarter',
    address: '27 Oldham Street',
    city: 'Manchester',
    postcode: 'M1 1JG',
    phone: '+44 161 946 0412',
    hours: [
      { days: 'Monday – Friday', time: '10:00 – 18:30' },
      { days: 'Saturday', time: '10:00 – 18:00' },
      { days: 'Sunday', time: '11:00 – 16:00' },
    ],
    clickCollectAvailable: true,
    coordinates: { lat: 53.4841, lng: -2.2364 },
  },
  {
    id: 'store-3',
    name: 'Verde Boutique — The Lanes',
    address: '8 Meeting House Lane',
    city: 'Brighton',
    postcode: 'BN1 1HB',
    phone: '+44 1273 946 083',
    hours: [
      { days: 'Monday – Saturday', time: '10:00 – 18:00' },
      { days: 'Sunday', time: '11:00 – 17:00' },
    ],
    clickCollectAvailable: true,
    coordinates: { lat: 50.8214, lng: -0.1394 },
  },
];
