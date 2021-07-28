export const getProductIdByURL = (url: string) => {
  const idList = url.match(/ML[A-Z]{1,}-?([0-9]{1,})/)

  if (!idList?.length) return "";

  return idList[0].replace('-', '').replace('p/', '');
}