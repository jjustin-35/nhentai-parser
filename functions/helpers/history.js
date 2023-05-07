const setHistoryData = (data, urls) => {
  const { source } = data;
  const { userId } = source;

  const historyData = {
    userId,
    urls
  };

  return historyData;
};

export default setHistoryData;