// 1. Variáveis Globais
const cartas = document.querySelectorAll('.carta');
let primeiraCarta = null;
let segundaCarta = null;
let bloqueiaTabuleiro = true; // Começa como TRUE para o "Preview" da APAE
let paresEncontrados = 0;
const totalPares = cartas.length / 2; 

// 2. Função de Inicialização (O "Preview" da APAE)
function prepararAmbiente() {
    embaralhar();

    // Vira todas as cartas para cima para a criança ver
    cartas.forEach(carta => carta.classList.add('virada'));

    // Espera 5 segundos (5000ms) e depois desvira
    setTimeout(() => {
        cartas.forEach(carta => {
            // Só desvira se a carta ainda não foi "encontrada" (caso use reiniciar no meio do jogo)
            carta.classList.remove('virada');
        });
        
        bloqueiaTabuleiro = false; // AGORA libera o jogo para a criança clicar
        console.log("Memorização terminada. Valendo!");
    }, 5000); 
}

// 3. Função de Virar a Carta
function virarCarta() {
    if (bloqueiaTabuleiro || this === primeiraCarta || this.classList.contains('virada')) return;

    this.classList.add('virada');

    if (primeiraCarta === null) {
        primeiraCarta = this;
        return;
    }

    segundaCarta = this;
    checarPar();
}

// 4. Função de Checar o Par
function checarPar() {
    let animal1 = primeiraCarta.dataset.animal;
    let animal2 = segundaCarta.dataset.animal;

    if (animal1 === animal2) {
        // --- ACERTOU! ---
        // Usando o caminho ./ e minúsculo para não dar erro no GitHub
        new Audio('./acerto.mp3').play().catch(e => console.log("Erro som:", e));
        
        paresEncontrados++;
        desabilitarCartas();

        if (paresEncontrados === totalPares) {
            setTimeout(() => {
                new Audio('./sucesso.mp3').play().catch(e => console.log("Erro som:", e));
                
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

// 5. Funções de Apoio
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

// 6. Inicialização e Eventos
cartas.forEach(carta => carta.addEventListener('click', virarCarta));

// Chama o preview assim que a página carrega
prepararAmbiente();

// Funções de Reiniciar
function reiniciarJogo() {
    window.location.reload();
}

const botoesReiniciar = [
    document.getElementById('btn-reiniciar'),
    document.getElementById('btn-reiniciar-modal')
];

botoesReiniciar.forEach(btn => {
    if (btn) {
        btn.onclick = () => reiniciarJogo();
    }
});