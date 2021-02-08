export const handleEuro = (price = 0) => {
  if (typeof price !== "string") return;

  const cent = parseInt(price.match(/\d/g).join(""));
  return cent;
};
