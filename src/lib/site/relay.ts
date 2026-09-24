/**
 * Shared "live service" order data for the order-relay scene
 * (guest phone → wire → kitchen display).
 *
 * One source of truth so the phone, the travelling packet and the
 * kitchen screen all show the *same* order — table, items, note —
 * which is the whole point of the section.
 */

export type RelayItem = { qty: number; name: string; price: number };

export type RelayOrder = {
  id: number;
  table: number;
  items: RelayItem[];
  note?: string;
};

export const RELAY_ORDERS: RelayOrder[] = [
  {
    id: 1042,
    table: 6,
    items: [
      { qty: 2, name: "Butter Chicken", price: 320 },
      { qty: 4, name: "Garlic Naan", price: 60 },
    ],
    note: "One mild",
  },
  {
    id: 1043,
    table: 2,
    items: [
      { qty: 1, name: "Paneer Tikka", price: 280 },
      { qty: 2, name: "Lassi", price: 120 },
    ],
    note: "Jain paneer",
  },
  {
    id: 1044,
    table: 9,
    items: [
      { qty: 1, name: "Dal Makhani", price: 290 },
      { qty: 3, name: "Butter Naan", price: 60 },
      { qty: 1, name: "Jeera Rice", price: 180 },
    ],
  },
  {
    id: 1045,
    table: 4,
    items: [
      { qty: 2, name: "Chilli Chicken", price: 340 },
      { qty: 1, name: "Fried Rice", price: 240 },
    ],
    note: "Extra spicy",
  },
  {
    id: 1046,
    table: 11,
    items: [
      { qty: 1, name: "Tandoori Platter", price: 420 },
      { qty: 2, name: "Naan", price: 50 },
    ],
  },
  {
    id: 1047,
    table: 7,
    items: [
      { qty: 2, name: "Veg Biryani", price: 260 },
      { qty: 1, name: "Raita", price: 60 },
    ],
  },
];

/** "2× Butter Chicken" line labels for the kitchen display. */
export function orderLines(order: RelayOrder): string[] {
  return order.items.map(({ qty, name }) => `${qty}× ${name}`);
}

/** Cart total in ₹. */
export function orderTotal(order: RelayOrder): number {
  return order.items.reduce((sum, it) => sum + it.qty * it.price, 0);
}

/** Compact packet label, e.g. "№1042 · T6". */
export function packetLabel(order: RelayOrder): string {
  return `№${order.id} · T${order.table}`;
}
