const apiShorten = 'https://api.shrtco.de/v2/shorten?url=';
const getShorten = async (query) => {
  const data = await fetch(`${apiShorten}${query}`);
  const { result } = await data.json();
  return {
    linkOne: result.full_short_link,
    linkTwo: result.full_short_link2,
    linkOriginal: result.original_link,
  };
};

export default getShorten;
// https://api.shrtco.de/v2/shorten?url=https://stackblitz.com/edit/rick-calculadora?file=README.md,js%2Fcalc.js,index.html,services%2FgetShorten.js,js%2Fshorten.js