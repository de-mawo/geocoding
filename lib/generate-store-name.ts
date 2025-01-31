const adjectives = [
  "Super",
  "Mega",
  "Ultra",
  "Speedy",
  "Golden",
  "Fresh",
  "Epic",
  "Smart",
  "Happy",
  "Cosmic",
];

const nouns = [
  "Mart",
  "Market",
  "Shop",
  "Store",
  "Boutique",
  "Bazaar",
  "Emporium",
  "Outlet",
  "Depot",
  "Corner",
];

const themes = [
  "Tech",
  "Fashion",
  "Grocery",
  "Furniture",
  "Toys",
  "Books",
  "Sports",
  "Gaming",
  "Pets",
  "Beauty",
];

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function generateRandomStoreName(): string {
  const adjective = getRandomElement(adjectives);
  const theme = getRandomElement(themes);
  const noun = getRandomElement(nouns);
  return `${adjective} ${theme} ${noun}`;
}
