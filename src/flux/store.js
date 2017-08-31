const state = {
  data: null
}

export default function(update) {
  return {
    getState: () => {
      return state;
    }
  }
};