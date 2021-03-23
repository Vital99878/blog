export const monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June',
                     'July', 'August', 'September', 'October', 'November', 'December',
];

export function validateEmail(email) {
  let re = /\S+@\S+\.\S+/;
  return re.test(email);
}

