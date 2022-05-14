// Variaveis 
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
function up(e){
  let entradado = document.querySelector("#entra-dados").value
  if(e.keyCode == 13){
    arr = JSON.parse(localStorage.getItem('banco')) /*o arr resebe o banco toda vez que a pagina é dada reload*/

    localStorage.getItem('banco') != null 
      ? arr.push({dado: entradado, checked: false}) 
      : arr = [{dado: entradado, checked: false}];

    localStorage.setItem('banco', JSON.stringify(arr))
    list()
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
      <img src="../assets/images/x.svg" alt="Close" onclick="del(${i})" class="img-close"/>
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
    <img src="../assets/images/bg-desktop-light.jpg" alt="">
    `;
  }
}
