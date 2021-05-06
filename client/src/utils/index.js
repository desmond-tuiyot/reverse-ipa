export const saveState = (state) => {
  try {
    let serializedState = JSON.stringify(state);
    localStorage.setItem("ipaState", serializedState);
  } catch (error) {
    // ignore
  }
};

export const loadState = () => {
  try {
    let serializedState = localStorage.getItem("ipaState");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};

export const saveSearchParams = (state) => {
  try {
    const serializedSearchParams = JSON.stringify({
      search: {
        searchTerm: state.search.searchTerm,
        filters: state.search.filters,
      },
    });
    localStorage.setItem("reverse-ipa-search-params", serializedSearchParams);
    // console.log(serializedSearchParams);
  } catch (error) {
    // ignore
  }
};

export const loadSearchParams = () => {
  try {
    const serializedState = localStorage.getItem("reverse-ipa-search-params");
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};
