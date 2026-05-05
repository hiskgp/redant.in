// export const BUSINESS_TYPES = {
//   retail: {
//     id: 'retail',
//     name: 'Online Retail',
//     nameTa: 'ஆன்லைன் விற்பனை',
//     icon: '🛍️',
//     color: '#6B46C1',
//     catalogLabel: 'Products',
//     catalogLabelTa: 'பொருட்கள்',
//     categories: ['Fashion', 'Electronics', 'Home & Kitchen', 'Grocery', 'Books', 'Other'],
//     orderStages: [
//       { id: 'new', label: 'New', labelTa: 'புதியது' },
//       { id: 'confirmed', label: 'Confirmed', labelTa: 'உறுதி' },
//       { id: 'packed', label: 'Packed', labelTa: 'பேக்' },
//       { id: 'shipped', label: 'Shipped', labelTa: 'அனுப்பியது' },
//       { id: 'delivered', label: 'Delivered', labelTa: 'டெலிவரி' }
//     ]
//   },
//   food: {
//     id: 'food',
//     name: 'Food & Bakery',
//     nameTa: 'உணவு',
//     icon: '🥘',
//     color: '#FF6B35',
//     catalogLabel: 'Menu',
//     catalogLabelTa: 'மெனு',
//     categories: ['Tiffin Center', 'Bakery', 'Restaurant', 'Cloud Kitchen', 'Juice Shop', 'Other'],
//     orderStages: [
//       { id: 'new', label: 'New', labelTa: 'புதியது' },
//       { id: 'confirmed', label: 'Confirmed', labelTa: 'உறுதி' },
//       { id: 'cooking', label: 'Preparing', labelTa: 'தயார்' },
//       { id: 'ready', label: 'Ready', labelTa: 'ரெடி' },
//       { id: 'delivered', label: 'Delivered', labelTa: 'டெலிவரி' }
//     ]
//   },
//   services: {
//     id: 'services',
//     name: 'Services',
//     nameTa: 'சேவைகள்',
//     icon: '💼',
//     color: '#EC4899',
//     catalogLabel: 'Services',
//     catalogLabelTa: 'சேவைகள்',
//     categories: ['Beauty Salon', 'Spa', 'Clinic', 'Mobile Repair', 'Tuition', 'Photography', 'Other'],
//     orderStages: [
//       { id: 'new', label: 'New', labelTa: 'புதியது' },
//       { id: 'confirmed', label: 'Confirmed', labelTa: 'உறுதி' },
//       { id: 'in_progress', label: 'In Progress', labelTa: 'நடக்கிறது' },
//       { id: 'completed', label: 'Completed', labelTa: 'முடிந்தது' }
//     ]
//   }
// } as const

// export type BusinessType = keyof typeof BUSINESS_TYPES

export const BUSINESS_TYPES = {
  retail: {
    id: 'retail',
    name: 'Online Retail',
    nameTa: 'à®†à®©à¯à®²à¯ˆà®©à¯ à®µà®¿à®±à¯à®ªà®©à¯ˆ',
    icon: 'ðŸ›ï¸',
    color: '#6B46C1',
    catalogLabel: 'Products',
    catalogLabelTa: 'à®ªà¯Šà®°à¯à®Ÿà¯à®•à®³à¯',
    categories: ['Fashion', 'Electronics', 'Home & Kitchen', 'Grocery', 'Books', 'Other'],
    orderStages: [
      { id: 'new', label: 'New', labelTa: 'à®ªà¯à®¤à®¿à®¯à®¤à¯' },
      { id: 'confirmed', label: 'Confirmed', labelTa: 'à®‰à®±à¯à®¤à®¿' },
      { id: 'packed', label: 'Packed', labelTa: 'à®ªà¯‡à®•à¯' },
      { id: 'shipped', label: 'Shipped', labelTa: 'à®…à®©à¯à®ªà¯à®ªà®¿à®¯à®¤à¯' },
      { id: 'delivered', label: 'Delivered', labelTa: 'à®Ÿà¯†à®²à®¿à®µà®°à®¿' }
    ],
    sampleItems: [
      { name: 'Cotton Saree', name_ta: 'à®•à®¾à®Ÿà¯à®Ÿà®©à¯ à®ªà¯à®Ÿà®µà¯ˆ', price: 899 },
      { name: 'Wireless Earbuds', name_ta: 'à®‡à®¯à®°à¯à®ªà®Ÿà¯à®¸à¯', price: 1299 },
    ]
  },
  food: {
    id: 'food',
    name: 'Food & Bakery',
    nameTa: 'à®‰à®£à®µà¯',
    icon: 'ðŸ¥˜',
    color: '#FF6B35',
    catalogLabel: 'Menu',
    catalogLabelTa: 'à®®à¯†à®©à¯',
    categories: ['Tiffin Center', 'Bakery', 'Restaurant', 'Cloud Kitchen', 'Juice Shop', 'Other'],
    orderStages: [
      { id: 'new', label: 'New', labelTa: 'à®ªà¯à®¤à®¿à®¯à®¤à¯' },
      { id: 'confirmed', label: 'Confirmed', labelTa: 'à®‰à®±à¯à®¤à®¿' },
      { id: 'cooking', label: 'Preparing', labelTa: 'à®¤à®¯à®¾à®°à¯' },
      { id: 'ready', label: 'Ready', labelTa: 'à®°à¯†à®Ÿà®¿' },
      { id: 'delivered', label: 'Delivered', labelTa: 'à®Ÿà¯†à®²à®¿à®µà®°à®¿' }
    ],
    sampleItems: [
      { name: 'Idli', name_ta: 'à®‡à®Ÿà¯à®²à®¿', price: 40 },
      { name: 'Biryani', name_ta: 'à®ªà®¿à®°à®¿à®¯à®¾à®£à®¿', price: 180 },
    ]
  },
  services: {
    id: 'services',
    name: 'Services',
    nameTa: 'à®šà¯‡à®µà¯ˆà®•à®³à¯',
    icon: 'ðŸ’¼',
    color: '#EC4899',
    catalogLabel: 'Services',
    catalogLabelTa: 'à®šà¯‡à®µà¯ˆà®•à®³à¯',
    categories: ['Beauty Salon', 'Spa', 'Clinic', 'Mobile Repair', 'Tuition', 'Photography', 'Other'],
    orderStages: [
      { id: 'new', label: 'New', labelTa: 'à®ªà¯à®¤à®¿à®¯à®¤à¯' },
      { id: 'confirmed', label: 'Confirmed', labelTa: 'à®‰à®±à¯à®¤à®¿' },
      { id: 'in_progress', label: 'In Progress', labelTa: 'à®¨à®Ÿà®•à¯à®•à®¿à®±à®¤à¯' },
      { id: 'completed', label: 'Completed', labelTa: 'à®®à¯à®Ÿà®¿à®¨à¯à®¤à®¤à¯' }
    ],
    sampleItems: [
      { name: 'Haircut', name_ta: 'à®®à¯à®Ÿà®¿ à®µà¯†à®Ÿà¯à®Ÿà¯', price: 300 },
    ]
  }
} as const

export type BusinessType = keyof typeof BUSINESS_TYPES