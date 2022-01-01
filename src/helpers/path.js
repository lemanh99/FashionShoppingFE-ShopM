export const storePathValues = () => {
    const storage = globalThis?.sessionStorage;
    if (!storage) return;
    // Set the previous path as the value of the current path.
    const prevPath = storage.getItem("currentPath");
    storage.setItem("prevPath", prevPath);
    // Set the current path value by looking at the browser's location object.
    storage.setItem("currentPath", globalThis.location.pathname);
}

export const getCurrentPath = () => {
    let path = window.location.pathname
    if(path) return path;
    const storage = globalThis?.sessionStorage;
    if (!storage) return;
    return storage.getItem("currentPath");
}

export const getPrevPath = () => {
    const storage = globalThis?.sessionStorage;
    if (!storage) return;
    return storage.getItem("prevPath");
}