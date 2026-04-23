import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-auth.js";
import { FIGURAS, LABELS_FIGURAS } from "./figuras.js";
 
const firebaseConfig = {
    apiKey: "AIzaSyDgPknkzS8dH5dWqPctRSW3OoIoY4UXwzU",
    authDomain: "partifly-7cb1a.firebaseapp.com",
    projectId: "partifly-7cb1a",
    storageBucket: "partifly-7cb1a.firebasestorage.app",
    messagingSenderId: "828238404697",
    appId: "1:828238404697:web:a45c4d317e1111c9b96548"
};
 
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
 
onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "login.html";
    }
});
 
function inicializarSelectFiguras() {
    const sel = document.getElementById('note-selector');
    sel.innerHTML = '';
 
    const grupos = [
        {
            label: 'Notas',
            figuras: ['semibreve','minima','minima_pont','seminima','seminima_pont',
                      'colcheia','colcheia_pont','semicolcheia','fusa','semifusa']
        },
        {
            label: 'Pausas',
            figuras: ['pausa_semibreve','pausa_minima','pausa_seminima',
                      'pausa_colcheia','pausa_semicolcheia','pausa_fusa']
        },
        {
            label: 'Especiais',
            figuras: ['fermata']
        }
    ];
 
    grupos.forEach(grupo => {
        const og = document.createElement('optgroup');
        og.label = grupo.label;
        grupo.figuras.forEach(id => {
            const op = document.createElement('option');
            op.value = id;
            op.textContent = LABELS_FIGURAS[id];
            og.appendChild(op);
        });
        sel.appendChild(og);
    });
}
 
const claveSelector      = document.getElementById('clave-selector');
const tempoSelector      = document.getElementById('tempo-selector');
const keySelector        = document.getElementById('key-selector');
const noteSelector       = document.getElementById('note-selector');
const bpmInput           = document.getElementById('bpm-input');
const accidentalSelector = document.getElementById('accidental-selector');
 
let ligaduraMode = false;
let eraserMode   = false;
let primeiraNotaLigadura = null;
 
 
function getDinamicoInicioX() {
    const numSimbolos = keySelector.value.length;
    return 110 + (numSimbolos * 22);
}
 
window.adicionarNovaLinha = function () {
    const original = document.getElementById('staff-clickable');
    const novo = original.cloneNode(true);
    novo.id = "staff-" + Date.now();
    novo.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));
    novo.querySelector('.notes-container').innerHTML = '';
    novo.querySelector('.slur-container').innerHTML = '';
    document.getElementById('folha-musica').appendChild(novo);
    configurarClique(novo);
    atualizarTudo();
};
 
window.limparPartitura = function () {
    const todasAsPautas = document.querySelectorAll('.preview-container');
    todasAsPautas.forEach((pauta, i) => {
        if (i === 0) {
            pauta.querySelector('.notes-container').innerHTML = '';
            pauta.querySelector('.slur-container').innerHTML = '';
        } else {
            pauta.remove();
        }
    });
};
 
window.toggleLigaduraMode = function () {
    ligaduraMode = !ligaduraMode;
    eraserMode   = false;
    document.getElementById('ligadura-toggle').textContent = ligaduraMode ? "Ligadura: ON" : "Ativar";
    document.getElementById('eraser-btn').textContent = "Desativada";
};
 
window.toggleEraser = function () {
    eraserMode   = !eraserMode;
    ligaduraMode = false;
    document.getElementById('eraser-btn').textContent = eraserMode ? "Ativada" : "Desativada";
    document.getElementById('ligadura-toggle').textContent = "Ativar";
};
 
function criarElementoNota(figuraId, acidente) {
    const wrapper = document.createElement('div');
    wrapper.className = 'placed-note';
 
    if (acidente) {
        const acc = document.createElement('span');
        acc.className = 'note-accidental';
        acc.textContent = acidente;
        wrapper.appendChild(acc);
    }
 
    const svgStr = FIGURAS[figuraId];
    if (svgStr) {
        const tmp = document.createElement('div');
        tmp.innerHTML = svgStr;
        wrapper.appendChild(tmp.firstElementChild);
    }
 
    wrapper.dataset.figura  = figuraId;
    wrapper.dataset.acidente = acidente || '';
 
    return wrapper;
}
 
function configurarClique(pauta) {
    pauta.addEventListener('mousedown', function (e) {
        if (eraserMode) {
            const nota     = e.target.closest('.placed-note');
            const ligadura = e.target.closest('path');
            if (nota)     { nota.remove();     return; }
            if (ligadura) { ligadura.remove(); return; }
            return;
        }
 
        const notaClicada = e.target.closest('.placed-note');
        if (ligaduraMode) {
            if (notaClicada) {
                if (!primeiraNotaLigadura) {
                    primeiraNotaLigadura = notaClicada;
                    notaClicada.style.outline = "2px solid #2ecc71";
                } else {
                    desenharLigadura(
                        primeiraNotaLigadura,
                        notaClicada,
                        pauta.querySelector('.slur-container')
                    );
                    primeiraNotaLigadura.style.outline = "";
                    primeiraNotaLigadura = null;
                }
            }
            return;
        }
 
        if (e.button === 0 && !notaClicada && e.target.closest('.preview-container')) {
            const rect  = pauta.getBoundingClientRect();
            const rawX  = e.clientX - rect.left;
            const rawY  = e.clientY - rect.top;
 
            const margemX = getDinamicoInicioX() + 30;
            if (rawX < margemX) return;
 
            const x = Math.round(rawX / 20) * 20;
            const y = 80 + (Math.round((rawY - 80) / 7) * 7);
 
            const figuraId = noteSelector.value;
            const acidente = accidentalSelector.value;
            const nota     = criarElementoNota(figuraId, acidente);
 
            nota.style.left = `${x}px`;
            nota.style.top  = `${y}px`;
 
            pauta.querySelector('.notes-container').appendChild(nota);
        }
    });
}
 
// Retorna quantos "beats de semínima" cabem num compasso para o compasso escolhido
function getBeatsPerMeasure() {
    const compasso = tempoSelector.value; // e.g. "4/4", "3/4", "6/8"
    const [num, den] = compasso.split('/').map(Number);
    // Normaliza para unidades de semínima (quarter note)
    return (num * 4) / den;
}

// Largura visual de um beat (semínima) em pixels — ajuste este valor para mais/menos espaço
const PX_POR_BEAT = 48;

function desenharBarrasDeCompasso(pauta) {
    const measuresContainer = pauta.querySelector('.measures-container');
    if (!measuresContainer) return;

    // Limpa barras anteriores
    measuresContainer.innerHTML = '';

    const pautaWidth  = pauta.offsetWidth || 800;
    const inicioX     = getDinamicoInicioX() + 50; // após clave + armação + compasso
    const larguraUtil = pautaWidth - inicioX - 14;  // 14px para a barra final

    const beats        = getBeatsPerMeasure();
    const larguraComp  = PX_POR_BEAT * beats;
    const numCompassos = Math.floor(larguraUtil / larguraComp);

    for (let i = 1; i <= numCompassos; i++) {
        const x   = inicioX + i * larguraComp;
        const bar = document.createElement('div');
        bar.className        = 'measure-bar';
        bar.style.left       = `${x}px`;
        bar.style.position   = 'absolute';
        bar.style.width      = '2px';
        bar.style.height     = '58px';
        bar.style.background = '#333';
        bar.style.top        = '50%';
        bar.style.transform  = 'translateY(-50%)';
        measuresContainer.appendChild(bar);
    }
}

function atualizarTudo() {
    document.querySelectorAll('.preview-container').forEach(pauta => {
        const img = pauta.querySelector('.clef');
        if (img) {
            img.src        = claveSelector.value;
            img.style.height = claveSelector.value.includes('fa')
                ? "70px" : claveSelector.value.includes('do') ? "80px" : "120px";
        }
 
        const bpmDisplay = pauta.querySelector('.bpm-text');
        if (bpmDisplay) bpmDisplay.textContent = `♩ = ${bpmInput.value}`;
 
        const keySig = pauta.querySelector('.key-sig');
        if (keySig) keySig.textContent = keySelector.value;
 
        const timeSig = pauta.querySelector('.time-sig');
        if (timeSig) {
            const partes = tempoSelector.value.split('/');
            timeSig.innerHTML      = `<span>${partes[0]}</span><span>${partes[1]}</span>`;
            timeSig.style.left     = `${getDinamicoInicioX()}px`;
        }

        desenharBarrasDeCompasso(pauta);
    });
}

function desenharLigadura(n1, n2, svg) {
    const x1 = parseFloat(n1.style.left);
    const y1 = parseFloat(n1.style.top);
    const x2 = parseFloat(n2.style.left);
    const y2 = parseFloat(n2.style.top);
 
    const midX    = (x1 + x2) / 2;
    const controlY = Math.min(y1, y2) - 30;
 
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", `M ${x1} ${y1 - 10} Q ${midX} ${controlY} ${x2} ${y2 - 10}`);
    path.setAttribute("class", "slur-path");
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", "black");
    path.setAttribute("stroke-width", "2");
    svg.appendChild(path);
}
 
function exportarDadosPartitura() {
    const pentagramas = [];
    document.querySelectorAll('.preview-container').forEach((pauta, i) => {
        const notas = [];
        pauta.querySelectorAll('.placed-note').forEach(n => {
            notas.push({
                figura:   n.dataset.figura,
                acidente: n.dataset.acidente,
                left:     n.style.left,
                top:      n.style.top
            });
        });
        const ligaduras = [];
        pauta.querySelectorAll('.slur-path').forEach(l => {
            ligaduras.push({ d: l.getAttribute('d') });
        });
        pentagramas.push({ index: i, notas, ligaduras });
    });
    return JSON.stringify({ pentagramas }, null, 2);
}
 
function downloadPartitura() {
    const dados = exportarDadosPartitura();
    const blob  = new Blob([dados], { type: 'application/json' });
    const url   = URL.createObjectURL(blob);
    const a     = document.createElement('a');
    a.href      = url;
    a.download  = `partitura_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
}
 
function importarDadosPartitura(json) {
    const data = JSON.parse(json);
    window.limparPartitura();
 
    data.pentagramas.forEach((pautaData, i) => {
        let pauta = document.querySelectorAll('.preview-container')[i];
        if (!pauta) {
            window.adicionarNovaLinha();
            const todas = document.querySelectorAll('.preview-container');
            pauta = todas[todas.length - 1];
        }
 
        pautaData.notas.forEach(n => {
            const nota = criarElementoNota(n.figura, n.acidente);
            nota.style.left = n.left;
            nota.style.top  = n.top;
            pauta.querySelector('.notes-container').appendChild(nota);
        });
 
        const svg = pauta.querySelector('.slur-container');
        pautaData.ligaduras.forEach(l => {
            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("d", l.d);
            path.setAttribute("class", "slur-path");
            path.setAttribute("fill", "none");
            path.setAttribute("stroke", "black");
            path.setAttribute("stroke-width", "2");
            svg.appendChild(path);
        });
    });
}
 
function carregarFicheiro() {
    const input    = document.createElement('input');
    input.type     = 'file';
    input.accept   = '.json';
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader    = new FileReader();
        reader.onload   = (ev) => importarDadosPartitura(ev.target.result);
        reader.readAsText(file);
    };
    input.click();
}

const modal = document.getElementById("about-modal");
const btnOpen = document.getElementById("open-about");
const btnClose = document.querySelector(".close-modal");

if (btnOpen) {
    btnOpen.onclick = function(e) {
        e.preventDefault(); 
        if (modal) modal.style.display = "block";
    };
}
if (btnClose) {
    btnClose.onclick = function() {
        if (modal) modal.style.display = "none";
    };
}
window.onclick = function(event) {
    if (modal && event.target == modal) {
        modal.style.display = "none";
    }
};
 
document.getElementById('btn-salvar-cloud').addEventListener('click', downloadPartitura);
document.getElementById('btn-carregar-cloud').addEventListener('click', carregarFicheiro);
 
claveSelector.addEventListener('change', atualizarTudo);
tempoSelector.addEventListener('change', atualizarTudo);
keySelector.addEventListener('change', atualizarTudo);
bpmInput.addEventListener('input', atualizarTudo);
 
inicializarSelectFiguras();
configurarClique(document.getElementById('staff-clickable'));
atualizarTudo();