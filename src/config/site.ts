export const site = {
  name: "Klothe",
  currency: "BDT",
  shipping: {
    zones: {
      insideDhaka: {
        name: "Inside Dhaka",
        rate: 60,
      },
      outsideDhaka: {
        name: "Outside Dhaka",
        rate: 120,
      },
    },
  },
} as const;

export type ShippingZone = keyof typeof site.shipping.zones;
