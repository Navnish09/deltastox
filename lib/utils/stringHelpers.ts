// capitalize the first letter of a string
export const capitalize = (str: string) => {
  str = str.toLowerCase();
  return str.charAt(0).toUpperCase() + str.slice(1);
};
