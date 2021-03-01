

const initial_state = [
  {
    label: 'Active task',
    created: new Date(2021, 0, 25, 14, 55),
    id: 11,
    status: 'active',
    min: 10,
    sec: 30,
  },
  {
    label: 'Completed task',
    created: new Date(2020, 11, 12, 14, 55),
    id: 52,
    status: 'completed',
    min: 8,
    sec: 30,
  },
  {
    label: 'Active task',
    created: new Date(2021, 0, 20, 10, 55),
    id: 3,
    status: 'active',
    min: 0,
    sec: 3,
  },
]
const test_person = { firstName: "Vital",lastName: "Lihoy", email: 'mail@mail.ru' }

const reducer = (state = test_person, action) => {
  switch (action.type) {
    case 'TRANSFERS':
      return {
        ...state,
        transfers: action.transfers,
        active_all: action.transfers.length === 4,
        index: 0,
      };

    case 'ALL_TRANSFERS':
      return {
        ...state,
        active_all: action.active_all,
        transfers: action.transfers,
        index: 0,
      };

    case 'SET_ID':
      return { ...state, searchId: action.searchId };

    case 'NEW_TICKETS':

      return {
        ...state,
        index: 0,
      };

    case 'TAB':
      return {
        ...state,
        tab_value: action.tab_value,
        index: 0,
      };

    case 'MORE':
      return {
        ...state,
        index: action.index,
      };

    default:
      return { ...initial_state, firstName: "Vital", lastName: "Lihoy", email: 'mail@mail.ru' };
  }
};

export default reducer;
