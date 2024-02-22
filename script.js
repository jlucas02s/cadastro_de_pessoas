

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

        if (email === 'JoaoLucasDEV02@gmail.com' && password === '123') {
            // Login bem-sucedido, exibir o conteúdo principal
            document.getElementById("loginContainer").style.display = "none";
            document.getElementById("mainContainer").style.display = "block";
        } else {
            // Login falhou, exibir mensagem de erro
            alert('Login falhou. Verifique suas credenciais.');
        }
   
    
    // Por enquanto, vamos apenas exibir os valores de e-mail e senha
    console.log("E-mail: " + email);
    console.log("Senha: " + password);

    // Depois da autenticação, você pode redirecionar o usuário para a página principal
    // window.location.href = "principal.html";
});


document.getElementById("cadastroForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevenir o envio do formulário

    const formData = new FormData(this);

    fetch('http://localhost:3000/api/pessoas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Object.fromEntries(formData))
    })
    .then(response => response.json())
    .then(data => {
        console.log('Pessoa cadastrada com ID:', data.pessoa_id);
        // Limpar o formulário após o cadastro bem-sucedido
        document.getElementById("cadastroForm").reset();
    })
    .catch(error => {
        console.error('Erro ao cadastrar pessoa:', error);
        // Exibir mensagem de erro ao usuário
    });
});


document.getElementById("pesquisaForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevenir o envio do formulário

    const query = document.getElementById("pesquisaInput").value;

    fetch(`/api/pessoas?q=${query}`)
    .then(response => response.json())
    .then(data => {
        console.log('Resultados da pesquisa:', data);
        // Manipular os resultados da pesquisa (exibir na página, etc.)
    })
    .catch(error => {
        console.error('Erro ao pesquisar pessoas:', error);
        // Exibir mensagem de erro ao usuário
    });
});
document.getElementById("scrollToPesquisa").addEventListener("click", function() {
    document.getElementById("pesquisaSection").scrollIntoView();
});
