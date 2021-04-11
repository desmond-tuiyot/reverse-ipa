export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("ipaState", serializedState);
  } catch (err) {
    console.log(err);
  }
};

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("ipaState");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    console.log(err);
    return undefined;
  }
};
