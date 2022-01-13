window.onload = verificaLogin();

function verificaLogin()
{
    let autenticate = localStorage.getItem('session')
    if(autenticate){
        if (JSON.parse(autenticate).authorized_session) {
            window.location.href = "/home.html";
        }
    }
}

function logar()
{
    let user = document.querySelector('#usuario').value;
    let pass = document.querySelector('#password').value;
    let email = document.querySelector('#email').value;

    fetch('http://localhost:5000/autenticate', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({user, pass, email})
    })
        .then((res) => res.json()
        .then((res2) => { 
            redireciona(res2)
            salvaInfos(res2)
        })
    );
}
//                        edujr004@gmail.com
function redireciona(res)
{
    avisa(res)
    if(res) window.location.href = "/home.html";
}

function avisa(res)
{
    const aviso = document.querySelector('.aviso')
    
    if(!res){
        aviso.classList.remove('off')
        setTimeout(() => {
            aviso.classList.add('off')
        }, 2000);
    }
}

function salvaInfos(status)
{
    const input_remember = document.querySelector('#remember').checked
    if(input_remember){
        status && localStorage.setItem('session', JSON.stringify({ authorized_session: status.session, dados_aleatorios: status.infoUser }));
    }
    if(!input_remember){
        status && localStorage.setItem('session', JSON.stringify({dados_aleatorios: [status.infoUser[1]]}))
    }
}