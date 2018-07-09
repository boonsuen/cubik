// export const loadLocalAuth = () => {
//   try {
//     const localAuth = localStorage.getItem('localAuth');
//     if (localAuth === null) {
//       return false;
//     }
//     return JSON.parse(localAuth);
//   } catch (err) {
//     return undefined
//   }
//   const localAuth = localStorage.getItem('localAuth');
// };

// export const loadPreventFlashLoad = () => {
//   try {
//     const localAuth = localStorage.getItem('preventFlashLoad');
//     if (localAuth === null) {
//       return false;
//     }
//     return JSON.parse(localAuth);
//   } catch (err) {
//     return undefined
//   }
// };

export const getLocalItem = (itemName) => {
  try {
    const localItem = localStorage.getItem(itemName);
    return localItem === null ? null : JSON.parse(localItem);
  } catch (err) {
    return undefined;
  }
}