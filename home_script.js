window.onload = perfil()

// Variaveis 
const userPerfil = document.querySelector('#user_perfil');
let cont = document.querySelector('.cont-res')
let arr = [];

// lista quando a pagina inicia 
//list()

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
    let IdUser = !!dadoId.dados_aleatorios[0] && dadoId.dados_aleatorios[0];
    
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
      .then((res2) => res2 && list(IdUser)));
    }

  };
}

// Funçao que lista as tarefas na tela 
function list(userId){

  fetch('http://localhost:5000/ReadProducts',{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({userId})
  })
  .then((res) => res.json()
  .then((res2) => renderList(res2)))

  document.querySelector("#entra-dados").value = '';
}

function renderList(dados){
  cont.innerHTML = '';
  dados.map((dado) => {
    cont.innerHTML += `
    <div class="cont-linha-tarefa">
      <span class="cont-span " id="cont-span${dado.id}">
        <div class="bolinha" id="bolinha${dado.id}" onclick="risca(${dado.id})"></div>
        <p>${dado.name}</p>
      </span>
      <img src="./images/x.svg" alt="Close" onclick="del(${dado.id})" class="img-close"/>
    </div>`
  })
}

function del(dado){
  const dadoId = JSON.parse(localStorage.getItem('session'));
  let IdUser = !!dadoId.dados_aleatorios[0] && dadoId.dados_aleatorios[0];
  fetch(`http://localhost:5000/DeleteProduto/${dado}`)
  .then(() => list(IdUser))
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