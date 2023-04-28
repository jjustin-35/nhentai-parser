const basePath = 'https://nhentai.net/g/';

const parser = (numbers) => {
  if (!numbers) return;
  const numberArray = numbers.replace(/\s+/g, ' ').trim().split(' ');

  const urls = numberArray.map((number) => {
    if (!number || isNaN(number) || number.length !== 6) {
      return 'not a valid number';
    }
    return `${basePath}${number}/`;
  });

  return urls;
};

export default parser;
