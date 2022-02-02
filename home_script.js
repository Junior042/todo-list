window.onload = perfil()

// Variaveis 
const userPerfil = document.querySelector('#user_perfil');
let cont = document.querySelector('.cont-res')
let arr = [];

// lista quando a pagina inicia 
list()

// Quando aperta enter 
document.querySelector("#entra-dados")
  .addEventListener('keydown', (e)=>{
    up(e)
  });

// Funções
// Create Product
function up(e){
  let entradado = document.querySelector("#entra-dados").value
  
  if(e.keyCode == 13){
    const dadoId = JSON.parse(localStorage.getItem('session'));
    let IdUser;
    if(!!dadoId.dados_aleatorios[0] == true){
      IdUser = dadoId.dados_aleatorios[0]
    }
    
    if(!!entradado.length){
      let dadosProduto = {
        "name": entradado,
        "checked": false,
        "userId": IdUser
      }
      fetch('http://localhost:5000/CreateProducts',{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosProduto)
      })
      .then((res) => res.json()
      .then((res2) => console.log(res2)));
    }

  };
}

// Funçao que lista as tarefas na tela 
function list(){
  let teste = JSON.parse(localStorage.getItem('banco'))

  cont.innerHTML = '';
  for (let i in teste){
    cont.innerHTML += `
    <div class="cont-linha-tarefa">
      <span class="cont-span ${teste[i].checked == true ? "checked" : ''}" id="cont-span${i}">
        <div class="bolinha" id="bolinha${i}" onclick="risca(${i})"></div>
        <p>${teste[i].dado}</p>
      </span>
      <img src="./images/x.svg" alt="Close" onclick="del(${i})" class="img-close"/>
    </div>
    `;
  } 
  document.querySelector("#entra-dados").value = '';
}

// Função que faz um up no localStorage 
function upLocalStorage(){
  localStorage.setItem('banco', JSON.stringify(arr))
}

// Função que deleta a linha da tarefa respectiva 
function del(dado){
  arr.splice(dado, 1);
  upLocalStorage()
  list();
}

// Função que risca a linha com a tarefa respectiva 
function risca(dado){
  let bolinha = document.querySelector(`#bolinha${dado}`);


  arr = JSON.parse(localStorage.getItem('banco'))
  arr[dado].checked == false ? arr[dado].checked = true : arr[dado].checked = false
  localStorage.setItem('banco', JSON.stringify(arr))
  list()
}

// ================================================================================================
let atv = false

function light(){

  if(atv == false){
    let body = document.querySelector('body')
    body.style.background = "white";
    let input = document.querySelector('#entra-dados')
    input.style.background = "white"
    let cont_res = document.querySelector('.cont-res')
    cont_res.style.background = "white"
    let header = document.querySelector('header')
    header.innerHTML = `
    <img src="./images/bg-desktop-light.jpg" alt="">
    `;
  }
}


// funções de perfil e descript do perfil
function perfil(){
  const crypt = JSON.parse(localStorage.getItem('session'));
  if(crypt.dados_aleatorios.length == 1){
    descryptUser(crypt.dados_aleatorios[0]);
  }
  if(crypt.dados_aleatorios.length == 2){
    descryptUser(crypt.dados_aleatorios[1]);
  }
}

function descryptUser(crypt){
  fetch('http://localhost:5000/descryptUser', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({crypt})
  })
    .then((res) => res.json()
    .then((res2) => {
      userPerfil.innerText = `Seja bem vindo: ${res2}`
    }))
}