export default function (JSONShorten, createShort) {
  const shortens = JSON.parse(JSONShorten) || [];
  if (!shortens.length) return [];
  shortens.map(createShort);
  return shortens;
}
