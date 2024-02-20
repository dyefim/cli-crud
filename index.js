const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

const GREETING_PARAM_KEY = '--greeting';

let greeting = 'Hey there';

const args = process.argv.slice(2);

if (args[0].includes(GREETING_PARAM_KEY + '=')) {
  greeting = args[0].replace(GREETING_PARAM_KEY + '=', '');
}

readline.question('Who are you? \n', (name) => {
  console.log(`${greeting} ${name}!`);
  readline.close();
});
