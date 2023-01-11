const Searchreducer = (state, action) => {
    switch (action.type) {
      case "SEARCHING_NOTES":
        return {
          searchedvalue:action.payload,
          issearched: true,
        };
      default:
        return state;
    }
  };
  
  export default Searchreducer;
  