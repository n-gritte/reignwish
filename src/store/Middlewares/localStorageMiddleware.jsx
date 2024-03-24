export const localStorageMiddleware = (store) => (next) => (action) => {
    let result = next(action);
    localStorage.setItem("reign_maison_react", JSON.stringify(store.getState()));
    console.log(store.getState())
    return result
};