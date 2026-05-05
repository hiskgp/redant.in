export const aiReplies = {
  // SIZE & STOCK - 10 templates
  size: [
    "Yes akka! {size} size stock irukku. {product} la 3 colours irukku. Photo anupattuma?",
    "M size irukku da! Last 2 pieces than. Confirm pannitengala?",
    "XL sold out pa. L size adjust aaguma? Illa na next week varum.",
    "Stock irukku! {product} ready to ship. Today order panna naalaikku dispatch.",
    "Size chart anupren. Unga usual size enna? Naan suggest pannren.",
    "{size} perfect ah irukkum ungaluku. Naan check panni solren.",
    "All sizes available akka! S to XXL varaikum irukku.",
    "Only {size} left pa. Book pannidalama?",
    "Size issue varathu. Free exchange 7 days irukku.",
    "Trial panna mudiyathu online la, but size chart accurate."
  ],

  // PRICE - 8 templates
  price: [
    "{product} ₹{price} than akka. Quality super irukkum. COD available.",
    "₹{price} fixed rate da. Offer la 2 edutha ₹{discount} discount.",
    "Best price than pa. First time customer ku ₹50 off pannalam. Okay va?",
    "Wholesale ku 5 pieces minimum. Rate ₹{wholesale}. DM pannunga.",
    "Price negotiable illa pa, but quality ku guarantee.",
    "₹{price} including shipping! Vera charge illa.",
    "Market rate vida ₹200 kammi than. Direct from manufacturer.",
    "EMI option irukku. 3 months no interest."
  ],

  // COD - 7 templates
  cod: [
    "COD available all over Tamil Nadu! Delivery 2-3 days. ₹50 extra.",
    "Yes anna! COD irukku. Address confirm pannunga, naanga anuprom.",
    "Illa pa, COD um irukku, GPay um irukku. Convenient ah choose pannunga.",
    "COD ku ₹50 charge, online payment ku free shipping.",
    "Full COD possible. No advance needed.",
    "COD available only for orders below ₹3000.",
    "Cash on delivery 100% safe. Parcel open panni check pannalam."
  ],

  // DELIVERY - 6 templates
  delivery: [
    "Coimbatore ku 1-2 days. Chennai 2-3 days. Other TN 3-4 days max.",
    "Shipping free above ₹999! Keela na ₹50 than.",
    "Dispatch aana udane tracking link anuprom. WhatsApp la update varum.",
    "Same day dispatch if order before 4 PM.",
    "Delivery partner: DTDC/Delhivery. Safe delivery.",
    "Remote area ku 1 day extra aagum pa."
  ],

  // PHOTOS - 5 templates
  photos: [
    "Sure! {product} photos anupren. 1 min wait pannunga.",
    "Ithe real pic than akka! No filter. Video call la kuda kaatalaam.",
    "Innum 10+ designs irukku. Catalog link anupren, paarunga.",
    "Model wearing pic and flat lay both anupren.",
    "Video irukku pa. Fabric quality clear ah theriyum."
  ],

  // EXCHANGE - 5 templates
  exchange: [
    "7 days exchange irukku pa. Size issue na free exchange.",
    "Damage iruntha full refund. Size exchange 7 days. No questions.",
    "Exchange ku courier charge neenga pay pannanum. ₹70 than.",
    "Tag cut pannatha varaikum exchange possible.",
    "Color exchange possible if stock irukku."
  ],

  // OUT OF STOCK - 5 templates
  outofstock: [
    "{product} illa pa, but similar {alternative} irukku. Photo paarunga?",
    "Next week varum da. Unga number note pannikaren, vanthathum solren.",
    "Sold out! Pre-order pannalam. 5 days la varum.",
    "Only display piece irukku. 10% discount la thara mudiyum.",
    "Alternative suggest pannalaama? Same price range la irukku."
  ],

  // GREETINGS - 6 templates
  greeting: [
    "Vanakkam akka! 🙏 ChatSprout boutique ku welcome. Enna paakanum?",
    "Hello da! Epdi irukkinga? Enna help venum?",
    "Yes available! Full time online than. Sollunga enna venum?",
    "Welcome pa! New collection just arrived. Paarunga.",
    "Hi anna! Quick reply ku thanks. Enna product thedringa?",
    "Vanakkam! Free shipping offer going on. Check pannunga."
  ]
};

// Helper function to get random reply
export const getAIReply = (category, variables = {}) => {
  const replies = aiReplies[category] || aiReplies.greeting;
  let reply = replies[Math.floor(Math.random() * replies.length)];

  // Replace variables
  Object.entries(variables).forEach(([key, value]) => {
    reply = reply.replace(new RegExp(`{${key}}`, 'g'), value);
  });

  return reply;
};