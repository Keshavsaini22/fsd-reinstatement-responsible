export const buildQueryStringFilters = (obj: any) => {
  return Object.entries(obj)
    .filter(([_, value]) => value !== undefined && value !== null && value !== "" && (value as []).length !== 0)
    .map(([key, value]) => {
      if (value instanceof Array) {
        if (value.length > 1) {
          const array = (value as any[]).filter(x => x !== undefined);
          return array.map(c => `${key}[]=${c}`).join("&");
        }
        return `${key}[]=${value}`;
      }
      return `${key}=${value}`;
    })
    .join("&");
};
