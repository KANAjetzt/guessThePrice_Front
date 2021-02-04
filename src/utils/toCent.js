export const handleEuro = (price) => {
  if (typeof price !== "string") return;

  const cent = parseInt(price.match(/\d/g).join(""));
  return cent;
};
