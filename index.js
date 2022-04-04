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
    } else if(action === 'Depositar') {
      deposit();
    } else if(action === 'Consultar Saldo') {

    } else if(action === 'Sacar') {

    } else if(action === 'Sair') {
      console.log(chalk.bgBlue.black('Obrigado por usar o Accounts!'));
      process.exit();
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

     /* Verifica se o arquivo existe, se ele existir,
    você vai receber uma mensagem de aviso para criar uma conta 
    com nome diferente */
    if(fs.existsSync(`accounts/${accountName}.json`)){
      console.log(chalk.bgRed.black('Esta conta já existe, escolhe outro nome!'));
      buildAccount();
      return;
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

    console.log(chalk.green('Parabéns, a sua conta foi criada!'));
    operation();

    })
  .catch(err => console.log(err));
};

// add an amount to user account
function deposit() {
  inquirer.prompt([
    {
      name: 'accountName',
      message: 'Qual o nome da sua conta?'
    },
  ])
  .then((answer) => {
    const accountName = answer['accountName'];

    // verify if account exists
    if(!checkAccount(accountName)) {
      return deposit();
    }
  })
  .catch(err => console.log(err));
};

function checkAccount(accountName) {
  if(!fs.existsSync(`accounts/${accountName}.json`)) {
    console.log(chalk.bgRed.black('Esta conta não existe, escolha outro nome!'));
    return false;
  } else {
    return true;
  }
}