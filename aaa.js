const claveSelector = document.getElementById('clave-selector');
const tempoSelector = document.getElementById('tempo-selector');
const keySelector = document.getElementById('key-selector');
const noteSelector = document.getElementById('note-selector');
const bpmInput = document.getElementById('bpm-input');
const accidentalSelector = document.getElementById('accidental-selector');

let ligaduraMode = false;
let eraserMode = false;
let primeiraNotaLigadura = null;

function getDinamicoInicioX() {
    const numSimbolos = keySelector.value.length;
    return 110 + (numSimbolos * 22);
}

function configurarClique(pauta) {
    pauta.addEventListener('mousedown', function(e) {
        // 1. LÓGICA DA BORRACHA
        if (eraserMode) {
            const nota = e.target.closest('.placed-note');
            const ligadura = e.target.closest('path'); 

            if (nota) {
                nota.remove();
                return;
            }
            if (ligadura) {
                ligadura.remove();
                return;
            }
            return; 
        }

        const notaClicada = e.target.closest('.placed-note');
        if (ligaduraMode) {
            if (notaClicada) {
                if (!primeiraNotaLigadura) {
                    primeiraNotaLigadura = notaClicada;
                    notaClicada.style.color = "#2ecc71";
                } else {
                    desenharLigadura(primeiraNotaLigadura, notaClicada, pauta);
                    primeiraNotaLigadura.style.color = "black";
                    primeiraNotaLigadura = null;
                }
            }
            return;
        }

        if (e.button === 0 && !notaClicada) {
            const rect = pauta.getBoundingClientRect();
            const rawX = e.clientX - rect.left;
            const rawY = e.clientY - rect.top;
            const margem = getDinamicoInicioX() + 50;

            if (rawX < margem) return;

            const x = margem + (Math.round((rawX - margem) / 40) * 40);
            const y = 80 + (Math.round((rawY - 80) / 7) * 7);

            const nota = document.createElement('span');
            nota.className = 'placed-note';
            
            const acidente = accidentalSelector.value;
            if (acidente !== "") {
                nota.innerHTML = `<span class="note-accidental">${acidente}</span>${noteSelector.value}`;
            } else {
                nota.textContent = noteSelector.value;
            }
            
            nota.style.left = `${x}px`;
            nota.style.top = `${y}px`;
            
            // Botão direito para apagar nota individualmente
            nota.oncontextmenu = (ev) => { 
                ev.preventDefault(); 
                nota.remove(); 
            };

            pauta.querySelector('#notes-container').appendChild(nota);
        }
    });
}

function adicionarNovaLinha() {
    const folha = document.getElementById('folha-musica');

    const template = document.querySelector('.preview-container');
    const novaLinha = template.cloneNode(true);
    
    novaLinha.id = "pauta-" + Date.now();
    novaLinha.querySelector('#notes-container').innerHTML = '';
    novaLinha.querySelector('#measures-container').innerHTML = '';
    
    const novoSvg = novaLinha.querySelector('svg');
    if (novoSvg) {
        novoSvg.id = "slur-container-" + Date.now();
        novoSvg.innerHTML = '';
    }

    folha.appendChild(novaLinha);
    
    configurarClique(novaLinha);
    
    atualizarTudo();
}
function atualizarTudo() {
    const pautas = document.querySelectorAll('.preview-container');
    pautas.forEach(p => {
        const img = p.querySelector('.clef');
        if(img) {
            img.src = claveSelector.value;
            if (claveSelector.value.includes('fa')) img.style.height = "80px";
            else if (claveSelector.value.includes('do')) img.style.height = "90px";
            else img.style.height = "140px";
        }

        const keySig = p.querySelector('.key-sig');
        if(keySig) keySig.textContent = keySelector.value;

        const partes = tempoSelector.value.split('/');
        const timeSig = p.querySelector('.time-sig');
        if(timeSig) {
            timeSig.innerHTML = `<span>${partes[0]}</span><span>${partes[1]}</span>`;
            timeSig.style.left = `${getDinamicoInicioX()}px`;
        }

        const bpmDisplay = p.querySelector('#bpm-display');
        if(bpmDisplay) bpmDisplay.innerHTML = `♩ = ${bpmInput.value}`;

        const mContainer = p.querySelector('#measures-container');
        if(mContainer) {
            mContainer.innerHTML = '';
            const num = parseInt(partes[0]);
            const startX = getDinamicoInicioX() + 60;
            const gap = (780 - startX) / num;
            for (let i = 1; i <= num; i++) {
                const b = document.createElement('div');
                b.className = 'measure-bar';
                b.style.left = `${startX + (i * gap)}px`;
                mContainer.appendChild(b);
            }
        }
    });
}

function desenharLigadura(nota1, nota2, pauta) {
    const svg = pauta.querySelector('#slur-container');
    
    const x1 = parseFloat(nota1.style.left); 
    const y1 = parseFloat(nota1.style.top);
    const x2 = parseFloat(nota2.style.left);
    const y2 = parseFloat(nota2.style.top);
 
    const adjX1 = x1; 
    const adjY1 = y1 - 10; 
    const adjX2 = x2;
    const adjY2 = y2 - 10;

    const midX = (adjX1 + adjX2) / 2;
    
    const distanciaX = Math.abs(adjX2 - adjX1);
    const curvatura = 25 + (distanciaX * 0.1); 

    const controlY = (adjY1 < 90) ? Math.max(adjY1, adjY2) + curvatura : Math.min(adjY1, adjY2) - curvatura;

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    const d = `M ${adjX1} ${adjY1} Q ${midX} ${controlY} ${adjX2} ${adjY2}`;
    
    path.setAttribute("d", d);
    path.setAttribute("class", "slur-path"); 
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", "black");
    path.setAttribute("stroke-width", "2");
    
    svg.appendChild(path);
}

function toggleLigaduraMode() {
    ligaduraMode = !ligaduraMode;
    eraserMode = false;
    atualizarBotoes();
}

function toggleEraser() {
    eraserMode = !eraserMode;
    ligaduraMode = false; 
    atualizarBotoes();
}

function atualizarBotoes() {
    const btnL = document.getElementById('ligadura-toggle');
    const btnE = document.getElementById('eraser-btn');
    
    btnL.style.background = ligaduraMode ? "#2ecc71" : "#95a5a6";
    btnL.textContent = ligaduraMode ? "Ativo" : "Ativar";
    
    btnE.style.background = eraserMode ? "#e74c3c" : "#95a5a6";
    btnE.textContent = eraserMode ? "Ativa" : "Desativada";
}

function limparPartitura() {
    if (confirm("Deseja apagar todas as notas e ligaduras?")) {
        document.querySelectorAll('#notes-container, #slur-container').forEach(c => c.innerHTML = '');
    }
}

claveSelector.onchange = atualizarTudo;
keySelector.onchange = atualizarTudo;
tempoSelector.onchange = atualizarTudo;
bpmInput.oninput = atualizarTudo;

window.onload = () => {
    const pautaInicial = document.getElementById('staff-clickable');
    if(pautaInicial) {
        configurarClique(pautaInicial);
        atualizarTudo();
    }
};