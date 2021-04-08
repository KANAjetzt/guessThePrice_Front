export const saveLS = (data, key) => {
  // Stringify Data
  const dataString = JSON.stringify(data);

  localStorage.setItem(key, dataString);
};

export const getLS = key => {
  return JSON.parse(localStorage.getItem(key));
};

export const deleteLS = key => {
  localStorage.removeItem(key);
};
