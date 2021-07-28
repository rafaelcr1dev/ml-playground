export const convertIdItemsToParamsString = (results: any) => {
  let paramsStringIdItems = "";

  results.slice(0, 19).forEach((item:any) => {
    if (item.id)
      paramsStringIdItems += `,${item.id}`
  })

  return paramsStringIdItems;
}