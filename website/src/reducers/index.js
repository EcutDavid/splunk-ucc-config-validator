import { UPDATE_ERRORS } from '../actions';

export default (state = {}, { type, errors }) => {
  if (type === UPDATE_ERRORS) {
    return {
      ...state,
      errors
    };
  }

  return {
    ...state
  };
};
