export const getAllPokemon = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
    .then((res) => res.json())
    .then((data) => resolve(data))
  });
};

// JSONの読み込みエラーがpromiseで発生するので修正
// export const getPokemon = (url) => {
//   return new Promise((resolve, reject) => {
//     fetch(url)
//     .then((res) => res.json())
//     .then((data) => {
//       // console.log(data);
//       resolve(data);
//     });
//   });
// };

export const getPokemon = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTPエラー! ステータス: ${res.status}`);
  }
  const data = await res.json();
  return data;
}