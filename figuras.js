export const FIGURAS = {
    semibreve: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 80" width="30" height="80">
        <ellipse cx="15" cy="50" rx="10" ry="6.5" fill="black" stroke="black" stroke-width="1"/>
        <ellipse cx="15" cy="50" rx="6" ry="3.5" fill="white"/>
    </svg>`,
 
    minima: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 80" width="30" height="80">
        <ellipse cx="13" cy="50" rx="9" ry="6" transform="rotate(-20,13,50)" fill="white" stroke="black" stroke-width="1.8"/>
        <line x1="22" y1="49" x2="22" y2="15" stroke="black" stroke-width="2" stroke-linecap="round"/>
    </svg>`,
 
    minima_pont: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 80" width="36" height="80">
        <ellipse cx="13" cy="50" rx="9" ry="6" transform="rotate(-20,13,50)" fill="white" stroke="black" stroke-width="1.8"/>
        <line x1="22" y1="49" x2="22" y2="15" stroke="black" stroke-width="2" stroke-linecap="round"/>
        <circle cx="30" cy="47" r="2.5" fill="black"/>
    </svg>`,
 
    seminima: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 80" width="30" height="80">
        <ellipse cx="13" cy="50" rx="9" ry="6" transform="rotate(-20,13,50)" fill="black" stroke="black" stroke-width="1"/>
        <line x1="22" y1="49" x2="22" y2="15" stroke="black" stroke-width="2" stroke-linecap="round"/>
    </svg>`,
 
    seminima_pont: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 80" width="36" height="80">
        <ellipse cx="13" cy="50" rx="9" ry="6" transform="rotate(-20,13,50)" fill="black" stroke="black" stroke-width="1"/>
        <line x1="22" y1="49" x2="22" y2="15" stroke="black" stroke-width="2" stroke-linecap="round"/>
        <circle cx="30" cy="47" r="2.5" fill="black"/>
    </svg>`,
 
    colcheia: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 80" width="30" height="80">
        <ellipse cx="13" cy="50" rx="9" ry="6" transform="rotate(-20,13,50)" fill="black" stroke="black" stroke-width="1"/>
        <line x1="22" y1="49" x2="22" y2="15" stroke="black" stroke-width="2" stroke-linecap="round"/>
        <path d="M22 15 C32 20, 30 30, 22 35" fill="none" stroke="black" stroke-width="2" stroke-linecap="round"/>
    </svg>`,
 
    colcheia_pont: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 80" width="36" height="80">
        <ellipse cx="13" cy="50" rx="9" ry="6" transform="rotate(-20,13,50)" fill="black" stroke="black" stroke-width="1"/>
        <line x1="22" y1="49" x2="22" y2="15" stroke="black" stroke-width="2" stroke-linecap="round"/>
        <path d="M22 15 C32 20, 30 30, 22 35" fill="none" stroke="black" stroke-width="2" stroke-linecap="round"/>
        <circle cx="30" cy="47" r="2.5" fill="black"/>
    </svg>`,
 
    semicolcheia: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 80" width="30" height="80">
        <ellipse cx="13" cy="50" rx="9" ry="6" transform="rotate(-20,13,50)" fill="black" stroke="black" stroke-width="1"/>
        <line x1="22" y1="49" x2="22" y2="15" stroke="black" stroke-width="2" stroke-linecap="round"/>
        <path d="M22 15 C32 20, 30 28, 22 33" fill="none" stroke="black" stroke-width="2" stroke-linecap="round"/>
        <path d="M22 22 C32 27, 30 35, 22 40" fill="none" stroke="black" stroke-width="2" stroke-linecap="round"/>
    </svg>`,
 
    fusa: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 80" width="30" height="80">
        <ellipse cx="13" cy="50" rx="9" ry="6" transform="rotate(-20,13,50)" fill="black" stroke="black" stroke-width="1"/>
        <line x1="22" y1="49" x2="22" y2="12" stroke="black" stroke-width="2" stroke-linecap="round"/>
        <path d="M22 12 C32 17, 30 24, 22 29" fill="none" stroke="black" stroke-width="2" stroke-linecap="round"/>
        <path d="M22 19 C32 24, 30 31, 22 36" fill="none" stroke="black" stroke-width="2" stroke-linecap="round"/>
        <path d="M22 26 C32 31, 30 38, 22 43" fill="none" stroke="black" stroke-width="2" stroke-linecap="round"/>
    </svg>`,
 
    semifusa: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 80" width="30" height="80">
        <ellipse cx="13" cy="50" rx="9" ry="6" transform="rotate(-20,13,50)" fill="black" stroke="black" stroke-width="1"/>
        <line x1="22" y1="49" x2="22" y2="10" stroke="black" stroke-width="2" stroke-linecap="round"/>
        <path d="M22 10 C32 15, 30 21, 22 26" fill="none" stroke="black" stroke-width="2" stroke-linecap="round"/>
        <path d="M22 17 C32 22, 30 28, 22 33" fill="none" stroke="black" stroke-width="2" stroke-linecap="round"/>
        <path d="M22 24 C32 29, 30 35, 22 40" fill="none" stroke="black" stroke-width="2" stroke-linecap="round"/>
        <path d="M22 31 C32 36, 30 42, 22 47" fill="none" stroke="black" stroke-width="2" stroke-linecap="round"/>
    </svg>`,
 
    pausa_semibreve: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 80" width="30" height="80">
        <rect x="5" y="46" width="20" height="8" fill="black" rx="1"/>
    </svg>`,
 
    pausa_minima: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 80" width="30" height="80">
        <rect x="5" y="50" width="20" height="8" fill="black" rx="1"/>
    </svg>`,
 
    pausa_seminima: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 80" width="30" height="80">
        <path d="M15 28 C20 32, 20 36, 15 38 C22 40, 22 48, 15 52 L13 56" fill="none" stroke="black" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="13" cy="57" r="4" fill="black"/>
    </svg>`,
 
    pausa_colcheia: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 80" width="30" height="80">
        <path d="M18 30 C26 34, 24 44, 16 46" fill="none" stroke="black" stroke-width="2.5" stroke-linecap="round"/>
        <circle cx="14" cy="49" r="4" fill="black"/>
        <line x1="18" y1="30" x2="12" y2="58" stroke="black" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`,
 
    pausa_semicolcheia: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 80" width="30" height="80">
        <path d="M18 26 C26 30, 24 38, 16 40" fill="none" stroke="black" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M18 38 C26 42, 24 50, 16 52" fill="none" stroke="black" stroke-width="2.5" stroke-linecap="round"/>
        <circle cx="14" cy="55" r="4" fill="black"/>
        <line x1="18" y1="26" x2="12" y2="60" stroke="black" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`,
 
    pausa_fusa: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 80" width="30" height="80">
        <path d="M18 22 C26 26, 24 33, 16 35" fill="none" stroke="black" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M18 33 C26 37, 24 44, 16 46" fill="none" stroke="black" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M18 44 C26 48, 24 55, 16 57" fill="none" stroke="black" stroke-width="2.5" stroke-linecap="round"/>
        <circle cx="14" cy="60" r="4" fill="black"/>
        <line x1="18" y1="22" x2="12" y2="64" stroke="black" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`,
 
    fermata: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 80" width="30" height="80">
        <path d="M5 52 Q15 30, 25 52" fill="none" stroke="black" stroke-width="2" stroke-linecap="round"/>
        <circle cx="15" cy="50" r="3.5" fill="black"/>
        <line x1="5" y1="56" x2="25" y2="56" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
    </svg>`,
};
 
export const LABELS_FIGURAS = {
    semibreve:          'Semibreve',
    minima:             'Mínima',
    minima_pont:        'Mínima pontuada',
    seminima:           'Semínima',
    seminima_pont:      'Semínima pontuada',
    colcheia:           'Colcheia',
    colcheia_pont:      'Colcheia pontuada',
    semicolcheia:       'Semicolcheia',
    fusa:               'Fusa',
    semifusa:           'Semifusa',
    pausa_semibreve:    'Pausa semibreve',
    pausa_minima:       'Pausa mínima',
    pausa_seminima:     'Pausa semínima',
    pausa_colcheia:     'Pausa colcheia',
    pausa_semicolcheia: 'Pausa semicolcheia',
    pausa_fusa:         'Pausa fusa',
    fermata:            'Fermata (ponto de órgão)',
};