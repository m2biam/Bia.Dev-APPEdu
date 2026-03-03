$(document).ready(function() {
    // 1. CONFIGURAÇÕES TÉCNICAS
    const colunas = 8;
    const linhas = 13; 
    const totalLetras = colunas * linhas; // 104 letras exatas para o grid 8x8
    const palavrasAlvo = ["GATO", "GIRAFA", "ZEBRA", "JACARE"];
    
    let acertos = 0;
    let selecaoAtual = "";
    let elementosSelecionados = [];

    const $grid = $('#grid-letras');
    $grid.empty();

    // 2. GERAÇÃO DO GRID SEM ERROS MATEMÁTICOS
    let gridVirtual = [];
    for (let i = 0; i < totalLetras; i++) {
        gridVirtual.push(String.fromCharCode(65 + Math.floor(Math.random() * 26)));
    }

    // Coloca as palavras em linhas específicas (pulando de 3 em 3 para não embolar)
    palavrasAlvo.forEach((palavra, index) => {
        let linhaSorteada = index * 3; 
        let maxInicio = colunas - palavra.length;
        let colunaInicio = Math.floor(Math.random() * (maxInicio + 1));
        
        for (let j = 0; j < palavra.length; j++) {
            let posicao = (linhaSorteada * colunas) + (colunaInicio + j);
            gridVirtual[posicao] = palavra[j];
        }
    });

    // Desenha o grid na tela
    gridVirtual.forEach((letra, i) => {
        $grid.append(`<div class="letra" data-idx="${i}">${letra}</div>`);
    });

    // 3. LÓGICA DE INTERATIVIDADE (CLIQUE E SOM)
    $('.letra').click(function() {
        if ($(this).hasClass('correta')) return;

        $(this).toggleClass('selecionada');
        const letra = $(this).text();

        if ($(this).hasClass('selecionada')) {
            selecaoAtual += letra;
            elementosSelecionados.push(this);
        } else {
            selecaoAtual = "";
            elementosSelecionados = [];
            $('.letra').removeClass('selecionada');
        }

        // Verifica se a criança achou a palavra
        palavrasAlvo.forEach(palavra => {
            if (selecaoAtual === palavra) {
                new Audio('acerto.mp3').play(); // O "Plim!"
                
                $(elementosSelecionados).addClass('correta').removeClass('selecionada');
                $(`#item-${palavra}`).addClass('palavra-encontrada');
                
                selecaoAtual = "";
                elementosSelecionados = [];
                acertos++;

                // Vitória Final
                if (acertos === palavrasAlvo.length) {
                    setTimeout(() => {
                        new Audio('sucesso.mp3').play(); // Sua voz de parabéns!
                        $('#modal-vitoria').css('display', 'flex');
                        $('#mensagem-vitoria').text("Você achou todos os animais!");
                    }, 500);
                }
            }
        });
    });
});