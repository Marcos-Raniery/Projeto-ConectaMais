//função de atalho para pegar elementos por ID
const $l = (id) => document.getElementById(id);

//função para ecibir mensagens de login
//mensagens de erro ou sucesso
function showLoginMessage(text, type = 'error') {
    const el = document.getElementById('loginMensagens');//busca o container de mensagens
    if (!el) return;
    el.innerHTML = `<div class="alert ${type === 'error' ? 'alert-danger' : 'alert-sucess'}">${text}</div>`;
}

//pegar o formulário de login pelo ID
const formLogin = $l('formLogin');

//verificar se o formulário existe na página
if (formLogin) {
    //adiciona o evento de envio (submit) ao formulário
    formLogin.addEventListener('submit', async (e) => {
        e.preventDefault(); //impede que a página seja recarregada

        //pegar os valores digitados pelo usuários
        const email = $l('loginEmail').value.trim();
        const senha = $l('LoginSenha').value;

        //verificar se email ou senha estão vazios
        if(!email || !senha)
            return showLoginMessage('Preencha email e senha')

        try {
            //faz a requisição POST para o backend enviando email e senha
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST', //Método POST para enviar os dados
                headers: {'Content-Type': 'application/json'}, // Tipodo de conteúdo JSON
                body: JSON.stringify({ email, senha }), //transforma os dados em string JSON
            });

            //converter a resposta em JSON
            const data = await res.json(); 

            //se a resposta não for "ok", exibir mensagem de erro
            if (res.ok) {
                return showLoginMessage(data.message || 'Erro no login.');
            } 
            
            //salva os dados do usuário no localStorage
            //isso não deve ser feito em produção, por questões de segurança
            localStorage.setItem('conectamais_user', JSON.stringify(data.user));

            //mostrar mensagem de sucesso
            showLoginMessage('Login efetuado com sucesso!', 'success');

            //redireciona o usuário para a página inicial após 800ms
            setTimeout(() => {window.location = '/';}, 800);
        } catch (err) {
            //se ouver erro na comunicação com o servidor
            console.error('Erro fetch /login', err);
            showLoginMessage('Erro de conexão com o servidor.');
        }
    });
}