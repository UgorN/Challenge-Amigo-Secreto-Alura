document.addEventListener('DOMContentLoaded', function() {
    let amigos = [];
    const listaAmigos = document.getElementById('listaAmigos');
    const resultado = document.getElementById('resultado');
    const amigoInput = document.getElementById('amigo');

    window.adicionarAmigo = function() {
        const nome = amigoInput.value.trim();
        if (nome) {
            amigos.push(nome);
            const li = document.createElement('li');
            li.textContent = nome;
            listaAmigos.appendChild(li);
            amigoInput.value = '';
        }
    };

    amigoInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            adicionarAmigo();
        }
    });

    window.sortearAmigo = function() {
        if (amigos.length < 2) {
            alert('Adicione pelo menos dois amigos para o sorteio.');
            return;
        }

        const sorteio = embaralhar(amigos.slice());
        const resultadoSorteio = [];
        const amigosCopia = amigos.slice();

        for (let i = 0; i < amigos.length; i++) {
            let amigo = amigos[i];
            let sorteado = sorteio[i];

            while (amigo === sorteado || amigosCopia.indexOf(sorteado) === -1) {
                sorteio = embaralhar(amigos.slice());
                sorteado = sorteio[i];
            }

            resultadoSorteio.push(`${amigo} vai presentear ${sorteado}.`);
            amigosCopia.splice(amigosCopia.indexOf(sorteado), 1);
        }

        resultado.innerHTML = '';
        resultadoSorteio.forEach(res => {
            const li = document.createElement('li');
            li.textContent = res;
            resultado.appendChild(li);
        });
    };

    window.novoSorteio = function() {
        amigos = []; // Limpa a lista de amigos
        listaAmigos.innerHTML = ''; // Limpa a lista de nomes adicionados
        resultado.innerHTML = ''; // Limpa os resultados do sorteio
    };

    function embaralhar(array) {
        let currentIndex = array.length, randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
    }
});