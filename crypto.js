/** Separa o texto a cada 2 caracteres (nunca será ultrapassado pois a seed não pode passar de 128), depois inverte as posições */
function invert(text) {
  return text
    .match(/.{1,2}/g)
    .reverse()
    .join('');
}

function encrypt(input, seed) {
  input = input.trim(); // Remover espaços
  let output = '';

  input.split('').forEach((char) => {
    let charCodeInt = char.charCodeAt(0); // Pega o código ASCII do caractere
    output += (charCodeInt + seed).toString(16); // Adiciona a seed ao código, depois converte para hexadecimal
  });

  return invert(output); // Inverte o texto (ver função para mais explicação);
}

function decrypt(input, seed) {
  input = invert(input); // Inverte o texto (ver função para mais explicação);

  let output = '';

  input.match(/.{1,2}/g).forEach((char) => {
    let charCodeInt = parseInt(char, 16) - seed; // Converte de hexadecimal para decimal, depois subtrai a seed
    output += String.fromCharCode(charCodeInt); // Converte o código ASCII para caractere
  });

  return output;
}

//#region CLI

function displayCorrectUsage() {
  console.log('Utilização correta:');
  console.log('$ node .\\crypto.js [encrypt|decrypt] [input] [seed]');
}

const ACTION_ENCRYPT = 'encrypt';
const ACTION_DECRYPT = 'decrypt';
const ARGS = process.argv.slice(2);

if (ARGS.length != 3) {
  console.log(
    `Número incorreto de argumentos! O programa requer 3 argumentos, porém foram passados ${ARGS.length}`
  );
  displayCorrectUsage();
}

const ACTION = ARGS[0];
const INPUT = ARGS[1];
const SEED = Number(ARGS[2]);

if (SEED > 128 || SEED <= 0) {
  console.log('A seed deve ser um número entre 1 e 128');
  process.exit();
}

if (ACTION == ACTION_ENCRYPT) {
  console.log(encrypt(INPUT, SEED));
} else if (ACTION == ACTION_DECRYPT) {
  console.log(decrypt(INPUT, SEED));
} else {
  console.log('Ação não reconhecida!');
  displayCorrectUsage();
  process.exit();
}

//#endregion
