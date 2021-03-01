export const toggle_transfers = (transfers) => ({
  type: 'TRANSFERS',
  transfers,
});

export const select_all_transfers = (active_all, transfers) => ({
  type: 'ALL_TRANSFERS',
  active_all,
  transfers,
});

 // async actions
export function setId() {
  // return async (dispatch) => {
  //   const searchId = await getId();
  //   dispatch({ type: 'SET_ID', searchId });
  // };
}

export const get_tickets = () => {
  // return async (dispatch) => {
  //   const [new_tickets, stop] = await getTickets(id);
  //   dispatch({ type: 'NEW_TICKETS', new_tickets, stop });
  // };
};
