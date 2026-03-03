// 1. Variáveis Globais
const cartas = document.querySelectorAll('.carta');
let primeiraCarta = null;
let segundaCarta = null;
let bloqueiaTabuleiro = false;
let paresEncontrados = 0;

// Calcula automaticamente quantos pares existem no seu HTML (se tiver 6 cartas, são 3 pares)
const totalPares = cartas.length / 2; 

// 2. Função de Virar a Carta
function virarCarta() {
    // Proteção: não vira se o tabuleiro estiver travado, se clicar na mesma carta ou se já estiver virada
    if (bloqueiaTabuleiro || this === primeiraCarta || this.classList.contains('virada')) return;

    this.classList.add('virada');

    if (primeiraCarta === null) {
        primeiraCarta = this;
        return;
    }

    segundaCarta = this;
    checarPar();
}

// 3. Função de Checar o Par
function checarPar() {
    let animal1 = primeiraCarta.dataset.animal;
    let animal2 = segundaCarta.dataset.animal;

    if (animal1 === animal2) {
        // --- ACERTOU! ---
        new Audio('acerto.mp3').play().catch(e => console.log("Erro som:", e));
        
        paresEncontrados++;
        desabilitarCartas();

        // VERIFICA VITÓRIA
        if (paresEncontrados === totalPares) {
            setTimeout(() => {
                new Audio('sucesso.mp3').play().catch(e => console.log("Erro som:", e));
                
                // Abre o modal sem usar jQuery (mais seguro)
                const modal = document.getElementById('modal-parabens');
                if (modal) {
                    modal.style.display = 'flex';
                }
            }, 600);
        }
    } else {
        // --- ERROU ---
        bloqueiaTabuleiro = true;
        setTimeout(() => {
            primeiraCarta.classList.remove('virada');
            segundaCarta.classList.remove('virada');
            resetarJogada();
        }, 1000);
    }
}

// 4. Funções de Apoio
function desabilitarCartas() {
    primeiraCarta.removeEventListener('click', virarCarta);
    segundaCarta.removeEventListener('click', virarCarta);
    resetarJogada();
}

function resetarJogada() {
    primeiraCarta = null;
    segundaCarta = null;
    bloqueiaTabuleiro = false;
}

function embaralhar() {
    cartas.forEach(carta => {
        let posicaoAleatoria = Math.floor(Math.random() * cartas.length); 
        carta.style.order = posicaoAleatoria;
    });
}

// 5. Inicialização
cartas.forEach(carta => carta.addEventListener('click', virarCarta));
embaralhar();

// Botões de Reiniciar (O do topo e o de dentro do modal)
const botoesReiniciar = [
    document.getElementById('btn-reiniciar'),
    document.getElementById('btn-reiniciar-modal') // Caso queira um ID específico no modal
];

botoesReiniciar.forEach(btn => {
    if (btn) {
        btn.onclick = () => window.location.reload();
    }
});

// Função global para garantir que o HTML encontre o comando de reiniciar
function reiniciarJogo() {
    window.location.reload();
}