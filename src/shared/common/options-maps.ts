export const getOptionsMap = (Options: { label: string; value: string }[]) => {
  const stateOptionsMap = new Map();
  Options?.forEach(item => {
    stateOptionsMap.set(item.value, item.label);
  });
  return stateOptionsMap;
};
