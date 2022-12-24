export const validateId = (item: string) => {
  const id = /[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}/;
  return item.match(id) ? true : false;
};