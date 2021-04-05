// prettier-ignore
export const monthNames = [  'January',  'February',  'March',  'April',  'May',  'June',  'July',  'August',  'September',  'October',  'November',  'December']

export const date = (createdAt) => {
  return `${monthNames[new Date(createdAt).getMonth()]} ${new Date(createdAt).getDate()}, ${new Date(
    createdAt
  ).getFullYear()}`;
};
