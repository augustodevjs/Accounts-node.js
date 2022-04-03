// Módulos externos
const inquirer = require('inquirer');
const chalk = require('chalk');

// Módulos internos
const fs = require('fs');

operation();

function operation() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'O que você deseja fazer?',
      choices: [ 'Criar conta', 'Consultar Saldo', 'Depositar', 'Sacar', 'Sair']
    },
  ])
  .then((answer) => {
    const action = answer['action'];
    if(action === 'Criar conta') {
      createAccount();
    }
  })
  .catch(err => console.log(err))
};

// create an account
function createAccount() {
  console.log(chalk.bgGreen.black('Parabéns por escolher o nosso banco!'))
  console.log(chalk.green('Defina as opções da sua conta a seguir'))
  buildAccount();
};

function buildAccount() {
  inquirer.prompt([
    {
      name: 'accountName',
      message: 'Digite um nome para a sua conta:'
    }
  ])
  .then((answer) => {
    const accountName = answer['accountName'];
    console.info(accountName);

    /* Verifica se não existe um diretório account.
    Se não existe, ocorre a criação do mesmo */
    if(!fs.existsSync('accounts')) {
      fs.mkdirSync('accounts');
    }

    /* Cria um arquivo json com o nome da conta, 
    dentro desse arquivo possui um balance com o valor 0 */
    fs.writeFileSync(
      `accounts/${accountName}.json`, 
      '{"balance": 0}', 
      function(err){
        console.log(err);
      }
    )

    /* Verifica se foi criado duas contas com o mesmo nome,
    se for criado, você recebe uma mensagem de erro */
    if(fs.existsSync(`accounts/${accountName}.json`)){
      console.log(chalk.bgRed.black('Esta conta já existe, escolhe outro nome!'));
      buildAccount();
      return;
    }

    console.log(chalk.green('Parabéns, a sua conta foi criada!'));
    operation();

    })
  .catch(err => console.log(err));
};