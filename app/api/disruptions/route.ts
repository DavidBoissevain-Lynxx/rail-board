export async function GET() {
  return Response.json([
    { id: 1, location: "Utrecht Centraal", asset: "Wissel 1043", open: true },
    { id: 2, location: "Amsterdam Sloterdijk", asset: "Sein 212", open: true },
    { id: 3, location: "Zwolle", asset: "Overweg", open: false },
    { id: 4, location: "Rotterdam Centraal", asset: "Bovenleiding", open: true },
    { id: 5, location: "Eindhoven", asset: "Wissel 87", open: false },
  ]);
}