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
