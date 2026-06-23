/* interclasses.js — Live Google Sheets integration + team rosters */

const CONTROL_ID  = '1eejXQCdkVlcgaRCT-aZBUc4jpNMRDNbIZMBV8mS_d04'; // Results sheet
const SCHEDULE_ID  = '1njQ8QBw7acmxCVo8hzeGvFOxzN2gqWg7UhGF7TD7Z3I'; // Schedule sheet
const SCHEDULE_GID = '501903747';                                      // "CRONOGRAMA GERAL" tab

// ─── Team rosters (from "Times do Interclasses" document) ─────────────────────
const TEAMS = {
  '6A': {
    'Futebol':        ['Antonio Amarante','Bruno Chico','Fernando José','Lucas Larizati','Miguel Vita','Pedro Henrique','Rafael Matos','Arthur Mantovani'],
    'Basquete':       ['Bruno Chico','Fernando José','Miguel Vita','Pedro Henrique','Antonio Amarante'],
    'Vôlei':          ['Clarisse Rosa','Giovanna Vellodoree','Luzia Gizlio','Maria Fernanda','Natalia Xavier','Sofia Valim Kiyohara','Bruno Chico'],
    'Pebolim':        ['Antonio Cabizuca','Antonio Amarante e Lucas de Freitas','Clarisse Rosa e Sofia Valim Kiyohara'],
    'Tênis de Mesa':  ['Antonio Amarante','Nicolas Frossard'],
    'Futmesa':        ['Antonio Amarante e Rafael Matos','Pedro Henrique e Bruno Chico'],
    'Olimpíada CG':   ['Antonio Cabizuca e Nicolas Frossard'],
  },
  '6B': {
    'Futebol':        { 'Time 1': ['Miguel Arruti','Gustavo Lourenço','Pedro Magnelli','Thiago Chico','Vinicius Sintra'], 'Time 2': ['Felipe Vita','João Vitor','Rafael Bot','Rodrigo Goldman','Theo Gama','Joaquim Sily'] },
    'Basquete':       ['Felipe Vita','Gustavo Lourenço','Pedro Magnelli','Thiago Chico','Vinicius Sintra','João Vitor'],
    'Vôlei':          ['Isabela Cordeiro','Lara Souza','Manuela Pereira','Manuela Rodrigues','Maria Clara Panis','Maria Eduarda','Maria Silvia','Marina Pazinato','Nina Almada','Rafael Angheben','Carol Mota'],
    'Handebol':       ['Gustavo Lourenço','Thiago Chico','Vinicius Sintra','Miguel Vita','João Vitor','Bruno Chico','Miguel Parruti'],
    'Pebolim':        ['Gustavo Lourenço','Isabela Cordeiro e Lara Souza','João Vitor e Manuela Rodrigues','Maria Clara Panis e Isabella Morais','Rodrigo Goldman e Rafael Matos'],
    'Tênis de Mesa':  ['Gustavo Lourenço','João Vitor','Rodrigo Goldman','Thiago Chico','Vinicius Sintra'],
    'Futmesa':        ['Gustavo Lourenço e Thiago Chico','João Vitor e Vinicius Sintra'],
    'Olimpíada CG':   ['Isabela Cordeiro, João Vitor e Maria Clara Panis'],
  },
  '7A': {
    'Futebol':        ['Daniel Breder','Pedro Bezerra','Gabriel Ramos','Pedro Tambellini','Francisco Collet','Luiza Lopes','Andrey'],
    'Basquete':       ['Lucas Santana','Gabriel Siqueira','Pedro Tambellini','Bento Campeão','Pedro Amaral','Andrey','Nicolas Cabral'],
    'Vôlei':          ['Lucas Santana','Gabriel Siqueira','Pedro Tambellini','Nicolas Cabral','Bento Campeão','Pedro Amaral','Andrey'],
    'Handebol':       ['Lucas Santana','Gabriel Siqueira','Pedro Tambellini','Nicolas Cabral','Bento Campeão','Pedro Amaral','Andrey'],
    'Tênis de Mesa':  ['Bento Campeão','Daniel Breder','Mateus Fer'],
    'Olimpíada CG':   ['Bento Campeão, Mateus, Daniel e Andrey'],
  },
  '7B': {
    'Futebol':        ['Bento Campeão','Lucas Santana','Pietro Tambellini','Pedro Amaral','Rafael Parente','Rafael Eid','Pietro Bertolla','Bernardo Donha','Mateus Fre','Nicolas Cabral'],
    'Basquete':       ['Bernardo Donha','Rafael Parente','Pietro Trevizan','Pedro Bezerra','Mateus Fre','Rafael Eid','Daniel Breder'],
    'Vôlei':          ['Bernardo Donha','Rafael Parente','Pietro Trevizan','Pedro Bezerra','Mateus Fre','Rafael Eid','Daniel Breder'],
    'Handebol':       ['Bernardo Donha','Rafael Parente','Pietro Trevizan','Pedro Bezerra','Mateus Fre','Rafael Eid','Daniel Breder'],
    'Pebolim':        ['Bento Campeão e Lucas Santana','Gabriel Siqueira e Pedro Amaral','Parente e Pietro Trevizan','Rafael Eid'],
    'Futmesa':        ['Bento Campeão e Rafael Parente','Mateus Fer e Pietro Trevizan','Pedro Amaral e Lucas Santana','Rafael Eid e Pedro Bezerra','Nicolas Cabral e Gabriel Siqueira'],
    'Olimpíada CG':   ['Gabriel Siqueira, Lucas Santana, Pedro Amaral e Pedro Bezerra'],
  },
  '8A': {
    'Futebol':        ['Miguel Cammarosan','Aike','Samuel','Guilherme','Arthur Mota','Gustavo Simões','Nicolas Seton'],
    'Basquete':       ['Miguel Cammarosan','Aike','Samuel','Guilherme','Arthur Mota','Gustavo Simões','Nicolas Seton'],
    'Vôlei':          ['Miguel Cammarosan','Aike','Samuel','Guilherme','Arthur Mota','Gustavo Simões','Nicolas Seton'],
    'Handebol':       ['Miguel Cammarosan','Aike','Samuel','Guilherme','Arthur Mota','Gustavo Simões','Nicolas Seton'],
    'Pebolim':        ['Samuel e Leo Rosa','Aike e Miguel'],
    'Futmesa':        ['Leo Rosa e Samuel'],
    'Olimpíada CG':   ['Manuela Gomes','Carolina Barreto','Ana Carol','Sofia Rechi'],
  },
  '8B': {
    'Futebol':        ['Ayrton Aitsuda','Felipe Lobão','Matheus Zavatti','Pedro Figueiras','Leo Luz','Leo Rosa','Lucas Serra','Guilherme Crespilha','Pedro Pereira'],
    'Basquete':       ['Ayrton Aitsuda','Felipe Lobão','Matheus Zavatti','Pedro Figueiras','Leo Luz','Leo Rosa','Lucas Serra','Guilherme Crespilha','Pedro Pereira'],
    'Vôlei':          ['Ayrton Aitsuda','Felipe Lobão','Matheus Zavatti','Pedro Figueiras','Leo Luz','Leo Rosa','Lucas Serra','Guilherme Crespilha','Pedro Pereira'],
    'Futmesa':        ['Leo Luz e Felipe Lobão','Lucas e Crespilha'],
  },
  '9A': {
    'Futebol':        ['Joaquim','Rodrigo','Daniel','Tardelli','Pedro','João Gabriel'],
    'Basquete':       ['Joaquim','Rodrigo','Daniel','Tardelli','Pedro','João Gabriel'],
    'Vôlei':          ['Joaquim','Daniel','Tardelli','Livia Aragão','Ana Luiza','Elena'],
    'Handebol':       ['Joaquim','Rodrigo','Daniel','Tardelli','Pedro','João Gabriel','Matheus Jobim'],
  },
  '9B': {
    'Futebol':        ['Heitor','Be','Gabriel','Garcia','Luiz','Heckmann'],
    'Basquete':       ['Heitor','Be','Gabriel','Garcia','Luiz','Heckman'],
    'Vôlei':          ['Heitor','Be','Gabriel','Garcia','Luiz','Heckman'],
    'Handebol':       ['Heitor','Be','Gabriel','Garcia','Luiz','Heckman','João Gabriel'],
    'Futmesa':        ['Heitor e Be'],
  },
  '1A': {
    'Futebol':        ['Bruno Almada','Dimitri Ivanov','Giovanni Vitale','Nicolas Rauber','Pedro Serpico','Pietro Lamaison','Theo Camargo','Vini Lourenzo'],
    'Basquete':       ['Bruno Almada','Dimitri Ivanov','Nicolas Rauber','Pedro Serpico','Pietro Lamaison','Theo Camargo','Vini Lourenzo'],
    'Vôlei':          ['Bruno Almada','Dimitri Ivanov','Nicolas Rauber','Pedro Serpico','Pietro Lamaison','Theo Camargo','Vini Lourenzo'],
    'Handebol':       ['Bruno Almada','Dimitri Ivanov','Nicolas Rauber','Pedro Serpico','Pietro Lamaison','Theo Camargo','Vini Lourenzo'],
    'Futmesa':        ['Dimitri Ivanov e Pietro Lamaison'],
  },
  '1B': {
    'Futebol':        ['Antonio Casati','Erik Nunes','Fernando Madeira','Mateus Cavalcante','Pedro Casati','Pedro Eid','Pedro Thomozini','Davi Mendes'],
    'Basquete':       ['Antonio Casati','Enzo','Erik Nunes','Giovanni','Mateus Cavalcante','Miguel Ramos','Pedro Casati','Pedro Eid','Pedro Thomozini'],
    'Vôlei':          ['Antonio Casati','Enzo','Erik Nunes','Giovanni','Mateus Cavalcante','Miguel Ramos','Pedro Casati','Pedro Eid','Pedro Thomozini'],
    'Handebol':       ['Antonio Casati','Enzo','Erik Nunes','Giovanni','Mateus Cavalcante','Miguel Ramos','Pedro Casati','Pedro Eid','Pedro Thomozini'],
    'Pebolim':        ['Erik Nunes e Mateus Cavalcanti'],
    'Tênis de Mesa':  ['Erik Nunes','Mateus Cavalcanti','Giovanni'],
    'Futmesa':        ['Erik Nunes e Mateus Cavalcanti','Pedro Eid e Giovanni'],
    'Olimpíada CG':   ['Leo Lobo, Pedro Cardoso, Mateus Cavalcanti e Erik Nunes'],
  },
  '2°': {
    'Futebol':        { 'Feminino': ['Clara Coelho','Dudinha','Lara Lourenço','Leticia','Lorena Ikeda','Mari Grecco','Sofia Moraes','Valentina Campos'], 'Masculino': ['Caio Medina','Gabriel Galebe','Lorenzo Bertolla','Luca Maia','Maurício','Murilo','Pedro K'] },
    'Basquete':       ['Caio Medina','Luca Maia','Matias','Maurício','Murilo','Pedro K'],
    'Vôlei':          { 'Time 1': ['Caio Medina','Gabriel Galebe','Lorenzo Bertolla','Luca Maia','Matias','Maurício','Murilo','Pedro K'], 'Time 2': ['Dudinha','Gabi Piccina','Lara Lourenço','Lara Raele','Lorena Ikeda','Sofia Moraes'] },
    'Handebol':       ['Caio Medina','Gabriel Galebe','Lorenzo Bertolla','Luca Maia','Maurício','Murilo','Pedro K'],
    'Pebolim':        ['Luca Maia e Gabriel Galebe'],
    'Tênis de Mesa':  ['Gabriel Galebe','Luca Maia','Matias','Maurício'],
    'Futmesa':        ['Clara Coelho e Mari Grecco','Caio Medina e Pedro K','Luca Maia e Gabriel Galebe'],
    'Olimpíada CG':   ['Gabi Piccina, Julia Porto, Mari Grecco e Valentina Campos'],
  },
  '3A': {
    'Futebol':        { 'Feminino': ['Nycolly','Cecília','Saldes','Campoi','Alice','Marina'], 'Time 1': ['Sampaio','Bruno Relva','Antonio','Arthur','Beretta','Sant\'Anna'], 'Time 2': ['Kazuki','Sant\'Anna','Donha','Luiz','Copelli'] },
    'Basquete':       { 'Time 1': ['Donha','Luiz','Kazuki','Sant\'Anna','Copelli'], 'Time 2': ['Tambasco','Sampaio','Bruno Relva','João Marcelo','Guilherme','Arthur'] },
    'Vôlei':          { 'Time 1': ['Copelli','Kazuki','Sant\'Anna','Marina','Luiz','Donha','Filippo'], 'Time 2': ['Tambasco','Sampaio','Bruno Relva','João Marcelo','Guilherme','Barros','Arthur','Antonio'] },
    'Handebol':       ['Sant\'Anna','Kazuki','Donha','Luiz','Copelli','PH','Sampaio'],
    'Tênis de Mesa':  ['Kazuki','Sant\'Anna','Sampaio','Bruno Relva','Beretta'],
    'Pebolim':        ['Bruno Relva e Tambasco','Kazuki e Sant\'Anna','Talli e Peter'],
    'Futmesa':        ['Bruno Relva e Antonio','Barros e Tambasco','Beretta e Sant\'Anna','Arthur e Matheus'],
    'Olimpíada CG':   ['Sampaio, André, Capp e Talli','Guilherme, Bruno Relva, Tambasco e Arthur','Ana, Bia, Laura e Manu'],
  },
  '3B': {
    'Futebol':        { 'Time 1': ['André','Guilherme','Tambasco','Barros','Kazuki'], 'Time 2': ['PH','José','Mateus Mendes','Vitor','Capp','Bruno Manzione','Filippo'], 'Time 3': ['Sampaio','Arthur','Pedro Amiralian','Matheus Regatieri','Guilherme'] },
    'Basquete':       ['PH','José','Bruno Manzione','Capp','Beretta','Fukuda'],
    'Handebol':       ['João Marcelo','Guilherme','Bruno Relva','Sampaio','Beretta','Arthur','Tambasco'],
    'Pebolim':        ['Capp e Filippo','José e Luiz','Donha e Bruno Manzione'],
    'Tênis de Mesa':  ['Filippo','Bruno Manzione'],
    'Olimpíada CG':   ['Bruno Manzione, Filippo, Mateus Mendes e José','Kazuki, Copelli, João Marcelo e Sant\'Anna'],
  },
};

const CLASS_ORDER = ['6A','6B','7A','7B','8A','8B','9A','9B','1A','1B','2°','3A','3B'];
const REFRESH_MS  = 60_000;

const SPORT_TABS = [
  { tab: 'Futebol A',    label: 'Futebol — Div. A',          short: 'Fut. A',    filter: 'Futebol' },
  { tab: 'Futebol B',    label: 'Futebol — Div. B',          short: 'Fut. B',    filter: 'Futebol' },
  { tab: 'Futebol Fem',  label: 'Futebol Feminino',          short: 'Fut. Fem',  filter: 'Futebol' },
  { tab: 'Basquete A',   label: 'Basquete — Div. A',         short: 'Basq. A',   filter: 'Basquete' },
  { tab: 'Basquete B',   label: 'Basquete — Div. B',         short: 'Basq. B',   filter: 'Basquete' },
  { tab: 'Vôlei A',      label: 'Vôlei — Div. A',            short: 'Vôlei A',   filter: 'Vôlei' },
  { tab: 'Vôlei B',      label: 'Vôlei — Div. B',            short: 'Vôlei B',   filter: 'Vôlei' },
  { tab: 'Handebol A',   label: 'Handebol — Div. A',         short: 'Hand. A',   filter: 'Handebol' },
  { tab: 'Handebol B',   label: 'Handebol — Div. B',         short: 'Hand. B',   filter: 'Handebol' },
  { tab: 'Tênis de Mesa', label: 'Tênis de Mesa',            short: 'T. Mesa',   filter: 'Tênis de Mesa' },
  { tab: 'Pebolim',      label: 'Pebolim',                   short: 'Pebolim',   filter: 'Pebolim' },
  { tab: 'Futmesa',      label: 'Futmesa',                   short: 'Futmesa',   filter: 'Futmesa' },
  { tab: 'Olimpíada CG', label: 'Olimpíada do Conhecimento', short: 'Olimpíada', filter: 'Olimpíada' },
];

// ─── Schedule sheet constants ─────────────────────────────────────────────────
const MODALITY_MAP = {
  'FUT-A':   { filter: 'Futebol',       short: 'Fut. A',    label: 'Futebol — Div. A' },
  'FUT-B':   { filter: 'Futebol',       short: 'Fut. B',    label: 'Futebol — Div. B' },
  'FUT-Fem': { filter: 'Futebol',       short: 'Fut. Fem',  label: 'Futebol Feminino' },
  'BAS-A':   { filter: 'Basquete',      short: 'Basq. A',   label: 'Basquete — Div. A' },
  'BAS-B':   { filter: 'Basquete',      short: 'Basq. B',   label: 'Basquete — Div. B' },
  'VÔL-A':   { filter: 'Vôlei',         short: 'Vôlei A',   label: 'Vôlei — Div. A' },
  'VÔL-B':   { filter: 'Vôlei',         short: 'Vôlei B',   label: 'Vôlei — Div. B' },
  'HAN-A':   { filter: 'Handebol',      short: 'Hand. A',   label: 'Handebol — Div. A' },
  'HAN-B':   { filter: 'Handebol',      short: 'Hand. B',   label: 'Handebol — Div. B' },
  'P.Pong':  { filter: 'Tênis de Mesa', short: 'T. Mesa',   label: 'Tênis de Mesa' },
  'Pebolim': { filter: 'Pebolim',       short: 'Pebolim',   label: 'Pebolim' },
  'Futmesa': { filter: 'Futmesa',       short: 'Futmesa',   label: 'Futmesa' },
  'Olimp.CG':{ filter: 'Olimpíada',     short: 'Olimpíada', label: 'Olimpíada do Conhecimento' },
};

const FULLDAY_TO_ABBR = {
  'Quarta-feira': 'Qua', 'Quinta-feira': 'Qui', 'Sexta-feira': 'Sex',
  'Segunda-feira': 'Seg', 'Terça-feira': 'Ter',
};

const DAY_ORDER  = ['Qua', 'Qui', 'Sex', 'Seg', 'Ter'];
const DAY_LABELS = { Qua: 'Quarta', Qui: 'Quinta', Sex: 'Sexta', Seg: 'Segunda', Ter: 'Terça' };
const DAYS       = new Set(DAY_ORDER);

let activeFilter      = 'Todos';
let activeGrupoSport  = 'Futebol';
let lastMatches       = [];
let lastChampions     = [];
let lastGroups        = [];   // [{ sport, divisions: [{ label, groups: [{ name, teams[], matches[] }] }] }]

// Normalise player/team names from sheet data: replace backslash+apostrophe,
// backslash+backtick, or bare backtick with a plain apostrophe.
const fixApostrophe = s => s.replace(/\\[`']/g, "'").replace(/`/g, "'");

// ─── CSV parser ───────────────────────────────────────────────────────────────
function parseCSV(text) {
  const rows = [];
  let row = [], field = '', inQ = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQ) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') inQ = false;
      else field += c;
    } else {
      if (c === '"')  inQ = true;
      else if (c === ',') { row.push(field); field = ''; }
      else if (c === '\r') { /* skip CR */ }
      else if (c === '\n') {
        row.push(field); field = '';
        if (row.some(f => f.trim())) rows.push(row);
        row = [];
      } else field += c;
    }
  }
  if (row.length) { row.push(field); if (row.some(f => f.trim())) rows.push(row); }
  return rows;
}

// ─── Data fetching ────────────────────────────────────────────────────────────
async function fetchChampions() {
  const url  = `https://docs.google.com/spreadsheets/d/${CONTROL_ID}/export?format=csv`;
  const r    = await fetch(url);
  const rows = parseCSV(await r.text());
  const hIdx = rows.findIndex(r => r[0] === 'Modalidade');
  if (hIdx === -1) return [];
  return rows.slice(hIdx + 1)
    .filter(r => r[0] && r[0].trim())
    .map(r => ({ sport: r[0].trim(), champion: (r[1] || '').trim() }));
}

async function fetchSportMatches({ tab, label, short, filter }) {
  // Futebol Fem tab uses "Jogo N" rows instead of day-abbrev rows — needs a separate parse path.
  if (tab === 'Futebol Fem') {
    const params = new URLSearchParams({ tqx: 'out:csv', headers: '0', sheet: tab });
    const url    = `https://docs.google.com/spreadsheets/d/${CONTROL_ID}/gviz/tq?${params}`;
    const r      = await fetch(url);
    const rows   = parseCSV(await r.text());
    return rows
      .filter(r => /^Jogo\s+\d/i.test((r[0] || '').trim()) && r[1] && r[1].trim())
      .map(r => ({
        dia: 'Qua', hora: '', fase: r[0].trim(),
        teamA: fixApostrophe(r[1].trim()), scoreA: (r[2] || '').trim(),
        scoreB: (r[3] || '').trim(), teamB: fixApostrophe((r[4] || '').trim()),
        label, short, filter,
      }));
  }

  const tq = "select A,B,C,D,E,F where A='Qua' or A='Qui' or A='Sex' or A='Seg' or A='Ter'";
  const params = new URLSearchParams({ tqx: 'out:csv', tq, headers: '0', sheet: tab });
  const url    = `https://docs.google.com/spreadsheets/d/${CONTROL_ID}/gviz/tq?${params}`;
  const r      = await fetch(url);
  const rows   = parseCSV(await r.text());
  return rows
    .filter(r => r.length >= 6 && DAYS.has(r[0]) && r[2].trim())
    .map(r => ({
      dia: r[0], hora: r[1], teamA: fixApostrophe(r[2].trim().replace(/\s*\([^)]+\)\s*$/, '')),
      scoreA: r[3].trim(), scoreB: r[4].trim(), teamB: fixApostrophe(r[5].trim().replace(/\s*\([^)]+\)\s*$/, '')),
      label, short, filter
    }));
}

// Fetch all match fixtures (schedule + times) from the new Schedule sheet master tab.
// Columns: A Dia · B Início · C Fim · D Local · E Modalidade · F Fase · G Equipe A · H Equipe B
async function fetchScheduleFixtures() {
  const params = new URLSearchParams({ tqx: 'out:csv', headers: '0', gid: SCHEDULE_GID });
  const url    = `https://docs.google.com/spreadsheets/d/${SCHEDULE_ID}/gviz/tq?${params}`;
  const r      = await fetch(url);
  const rows   = parseCSV(await r.text());
  return rows
    .filter(r => r.length >= 8 && FULLDAY_TO_ABBR[r[0].trim()] && MODALITY_MAP[r[4].trim()])
    .map(r => ({
      dia:   FULLDAY_TO_ABBR[r[0].trim()],
      hora:  r[1].trim(),
      local: r[3].trim(),
      fase:  r[5].trim(),
      teamA: fixApostrophe(r[6].trim().replace(/\s*\([^)]+\)\s*$/, '')),
      teamB: fixApostrophe(r[7].trim().replace(/\s*\([^)]+\)\s*$/, '')),
      scoreA: '',
      scoreB: '',
      ...MODALITY_MAP[r[4].trim()],   // filter, short, label
    }));
}

// Fetch scores from the Results sheet per-sport tabs (old behaviour, now score-only role).
async function fetchResultsMatches() {
  const settled = await Promise.allSettled(SPORT_TABS.map(s => fetchSportMatches(s)));
  return settled.filter(s => s.status === 'fulfilled').flatMap(s => s.value);
}

// Merge: fixtures from Schedule sheet, scores overlaid from Results sheet.
async function fetchAllMatches() {
  const [fixtures, results] = await Promise.all([fetchScheduleFixtures(), fetchResultsMatches()]);

  // Normalise a name to a diacritic-free, lowercase, single-space string for fuzzy comparison.
  const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, ' ').trim();
  // Match key: sport filter + sorted team pair. For two-leg matches (fase = "Jogo N"), include
  // the leg label so Jogo 1 and Jogo 2 get separate entries.
  const isLeg = fase => fase && /^Jogo\s+\d/i.test(fase);
  const key = (filter, a, b, fase) => {
    const base = filter + '|' + [norm(a), norm(b)].sort().join('|');
    return isLeg(fase) ? base + '|' + fase.toLowerCase() : base;
  };

  // Index only results that actually have a score entered.
  const idx = {};
  for (const m of results) {
    if (m.scoreA !== '' || m.scoreB !== '') {
      const k = key(m.filter, m.teamA, m.teamB, m.fase);
      idx[k] ??= m;
    }
  }

  return fixtures.map(f => {
    const hit = idx[key(f.filter, f.teamA, f.teamB, f.fase)];
    if (!hit) return f;
    // Re-orient the score so A/B match the fixture's team order.
    const sameOrder = norm(hit.teamA) === norm(f.teamA);
    return {
      ...f,
      scoreA: sameOrder ? hit.scoreA : hit.scoreB,
      scoreB: sameOrder ? hit.scoreB : hit.scoreA,
    };
  });
}

// ─── Standings computation ────────────────────────────────────────────────────
function computeStandings(matches) {
  const table = {};
  for (const m of matches) {
    if (!table[m.teamA]) table[m.teamA] = { team: m.teamA, gp: 0, w: 0, d: 0, l: 0, pts: 0 };
    if (!table[m.teamB]) table[m.teamB] = { team: m.teamB, gp: 0, w: 0, d: 0, l: 0, pts: 0 };
  }
  for (const m of matches) {
    const sa = parseInt(m.scoreA, 10);
    const sb = parseInt(m.scoreB, 10);
    if (isNaN(sa) || isNaN(sb)) continue;
    table[m.teamA].gp++;
    table[m.teamB].gp++;
    if (sa > sb) {
      table[m.teamA].w++; table[m.teamA].pts += 3;
      table[m.teamB].l++;
    } else if (sa < sb) {
      table[m.teamB].w++; table[m.teamB].pts += 3;
      table[m.teamA].l++;
    } else {
      table[m.teamA].d++; table[m.teamA].pts += 1;
      table[m.teamB].d++; table[m.teamB].pts += 1;
    }
  }
  return Object.values(table).sort((a, b) =>
    b.pts - a.pts || b.w - a.w || a.l - b.l || a.team.localeCompare(b.team)
  );
}

function standingsTableHTML(standings) {
  const hasGames = standings.some(r => r.gp > 0);
  return `<table class="standings-table">
    <thead>
      <tr>
        <th class="st-rank">#</th>
        <th>Turma</th>
        <th class="st-num">J</th>
        <th class="st-num">V</th>
        <th class="st-num">D</th>
        <th class="st-num">PTS</th>
      </tr>
    </thead>
    <tbody>
      ${standings.map((row, i) => {
        const isLeader = i === 0 && hasGames && row.pts > 0;
        const highlight = row.team.startsWith('3');
        return `<tr class="${isLeader ? 'st-row--leader' : ''}">
          <td class="st-rank">${i + 1}</td>
          <td class="st-team-name ${highlight ? 'st-team-name--highlight' : ''}">${row.team}</td>
          <td class="st-num">${row.gp}</td>
          <td class="st-num">${row.w}</td>
          <td class="st-num">${row.l}</td>
          <td class="st-num st-pts-val">${row.pts}</td>
        </tr>`;
      }).join('')}
    </tbody>
  </table>`;
}

// ─── Rendering — champions ────────────────────────────────────────────────────
function renderChampions(data) {
  const board = document.getElementById('champions-board');
  if (!board) return;
  board.innerHTML = `<div class="champions-grid">
    ${data.map(({ sport, champion }) => {
      const won = champion.length > 0;
      return `<div class="champion-card ${won ? 'champion-card--won' : 'champion-card--pending'}">
        <span class="champion-sport-name">${sport}</span>
        <span class="champion-name">${won ? champion : 'Em disputa'}</span>
      </div>`;
    }).join('')}
  </div>`;
  if (window.ScrollTrigger) ScrollTrigger.refresh();
}

// ─── Rendering — sport filter pills (Jogos tab) ───────────────────────────────
function renderFilters() {
  const container = document.getElementById('sport-filters');
  if (!container) return;
  const labels = ['Todos', ...new Set(SPORT_TABS.map(s => s.filter))];
  container.innerHTML = labels.map(l =>
    `<button class="pill-filter ${l === activeFilter ? 'pill-filter--active' : ''}"
             data-filter="${l}">${l}</button>`
  ).join('');
  container.querySelectorAll('.pill-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      activeFilter = btn.dataset.filter;
      container.querySelectorAll('.pill-filter').forEach(b =>
        b.classList.toggle('pill-filter--active', b.dataset.filter === activeFilter)
      );
      renderMatches(lastMatches);
    });
  });
}

// ─── Rendering — matches ──────────────────────────────────────────────────────
function renderMatches(matches) {
  const list = document.getElementById('matches-list');
  if (!list) return;

  const pool = activeFilter === 'Todos'
    ? matches
    : matches.filter(m => m.filter === activeFilter);

  if (!pool.length) {
    list.innerHTML = `<p class="matches-empty">Nenhum jogo encontrado${activeFilter !== 'Todos' ? ' nesta modalidade' : ''}.</p>`;
    if (window.ScrollTrigger) ScrollTrigger.refresh();
    return;
  }

  const byDay = {};
  pool.forEach(m => { (byDay[m.dia] ??= []).push(m); });

  list.innerHTML = DAY_ORDER
    .filter(d => byDay[d])
    .map(day => {
      const sorted = byDay[day].slice().sort((a, b) => a.hora.localeCompare(b.hora));
      return `<div class="day-group">
        <h3 class="day-label">${DAY_LABELS[day]}</h3>
        <div class="day-matches">
          ${sorted.map(m => {
            const isDone = m.scoreA !== '' && m.scoreB !== '';
            const teamsHTML = isDone
              ? `${m.teamA} <em class="match-score">${m.scoreA}&thinsp;×&thinsp;${m.scoreB}</em> ${m.teamB}`
              : `${m.teamA}<em> × </em>${m.teamB}`;
            const badge = isDone
              ? `<span class="match-badge match-badge--done">Resultado</span>`
              : `<span class="match-badge match-badge--pending">Pendente</span>`;
            const localTag = m.local ? `<span class="match-local">${m.local}</span>` : '';
            return `<div class="match-row${isDone ? ' match-row--done' : ''}">
              <span class="match-time">${m.hora}</span>
              <span class="match-sport-tag">${m.short}</span>
              ${localTag}
              <span class="match-teams">${teamsHTML}</span>
              ${badge}
            </div>`;
          }).join('')}
        </div>
      </div>`;
    }).join('');

  if (window.ScrollTrigger) ScrollTrigger.refresh();
}

// ─── Groups — fetch full sport tabs & parse "Grupo N" sections ────────────────
const SPORTS = [...new Set(SPORT_TABS.map(s => s.filter))];

// Derive a readable division label from a tab's full label, e.g.
//   "Futebol — Div. A" → "Div. A"   "Futebol Feminino" → "Feminino"   "Pebolim" → ""
function divisionLabel(label, filter) {
  if (label.includes('—')) return label.split('—')[1].trim();
  if (label !== filter && label.startsWith(filter)) return label.slice(filter.length).trim();
  return '';
}

async function fetchSportGroups({ tab, label, short, filter }) {
  const params = new URLSearchParams({ tqx: 'out:csv', headers: '0', sheet: tab });
  const url    = `https://docs.google.com/spreadsheets/d/${CONTROL_ID}/gviz/tq?${params}`;
  const r      = await fetch(url);
  const rows   = parseCSV(await r.text());

  // Futebol Feminino: two-leg final with aggregate — parse its unique layout fully
  if (tab === 'Futebol Fem') {
    const legs = [];
    const agg  = { teamA: '', scoreA: '', teamB: '', scoreB: '', penA: '', penB: '' };
    let champion = '';
    for (const row of rows) {
      const a = (row[0] || '').trim();
      if (/^Jogo\s+\d/i.test(a) && row[1] && row[1].trim()) {
        legs.push({
          label: a,
          teamA: row[1].trim(),
          scoreA: (row[2] || '').trim(),
          scoreB: (row[3] || '').trim(),
          teamB: (row[4] || '').trim(),
        });
      } else if (a === 'Agregado' && row[1]) {
        agg.teamA  = row[1].trim();
        agg.scoreA = (row[2] || '').trim();
        agg.penA   = (row[5] || '').trim();
      } else if (!a && row[1] && agg.teamA) {
        agg.teamB  = row[1].trim();
        agg.scoreB = (row[2] || '').trim();
        agg.penB   = (row[5] || '').trim();
      } else if (/^CAMPEÃ/i.test(a)) {
        champion = (row[1] || '').trim();
      }
    }
    return { tab, label, filter, groups: [], finalData: { legs, agg, champion } };
  }

  const groups = [];
  let current  = null;
  for (const row of rows) {
    const a = (row[0] || '').trim();
    if (a.startsWith('Grupo') && /jogos/i.test(a)) {
      const m = a.match(/Grupo\s+\S+/i);
      current = { name: m ? m[0] : a, teams: [], matches: [] };
      groups.push(current);
      continue;
    }
    if (a.startsWith('Grupo') && /classific/i.test(a)) { current = null; continue; }
    if (/mata-?mata|semifinal|^final/i.test(a))        { current = null; continue; }
    if (current && DAYS.has(a) && row[2] && row[2].trim()) {
      const teamA  = row[2].trim().replace(/\s*\([^)]+\)\s*$/, '');
      const teamB  = (row[5] || '').trim().replace(/\s*\([^)]+\)\s*$/, '');
      current.matches.push({ teamA, scoreA: (row[3] || '').trim(), scoreB: (row[4] || '').trim(), teamB });
      if (teamA && !current.teams.includes(teamA)) current.teams.push(teamA);
      if (teamB && !current.teams.includes(teamB)) current.teams.push(teamB);
    }
  }
  return { tab, label, filter, groups };
}

async function fetchAllGroups() {
  const settled = await Promise.allSettled(SPORT_TABS.map(s => fetchSportGroups(s)));
  return settled.filter(s => s.status === 'fulfilled').map(s => s.value);
}

// ─── Rendering — grupos sport filter pills ───────────────────────────────────
function renderGrupoFilters() {
  const container = document.getElementById('grupo-sport-filters');
  if (!container) return;
  container.innerHTML = SPORTS.map(s =>
    `<button class="pill-filter ${s === activeGrupoSport ? 'pill-filter--active' : ''}"
             data-sport="${s}">${s}</button>`
  ).join('');
  container.querySelectorAll('.pill-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      activeGrupoSport = btn.dataset.sport;
      container.querySelectorAll('.pill-filter').forEach(b =>
        b.classList.toggle('pill-filter--active', b.dataset.sport === activeGrupoSport)
      );
      renderGrupos();
    });
  });
}

// ─── Rendering — grupos: composition chips + standings, by division ──────────
function renderGrupos() {
  const board = document.getElementById('grupos-board');
  if (!board) return;

  const divisions = lastGroups.filter(d => d.filter === activeGrupoSport);
  if (!divisions.length) {
    board.innerHTML = '<p class="grupo-empty">Sem dados disponíveis</p>';
    return;
  }
  const showDivLabel = divisions.length > 1;

  board.innerHTML = divisions.map(div => {
    const label = showDivLabel ? divisionLabel(div.label, div.filter) : '';
    let body;
    if (div.finalData) {
      const { legs, agg, champion } = div.finalData;
      const hasScores  = legs.some(l => l.scoreA !== '' || l.scoreB !== '');
      const hasAgg     = agg.scoreA !== '' || agg.scoreB !== '';
      const hasPen     = agg.penA !== '' || agg.penB !== '';
      const legRows = legs.map(l => {
        const scored = l.scoreA !== '' && l.scoreB !== '';
        return `<tr class="final-leg-row${scored ? ' final-leg-row--scored' : ''}">
          <td class="final-col-label">${l.label}</td>
          <td class="final-col-team final-col-team--home">${l.teamA}</td>
          <td class="final-col-score">${scored ? `${l.scoreA}&thinsp;×&thinsp;${l.scoreB}` : '—'}</td>
          <td class="final-col-team final-col-team--away">${l.teamB}</td>
        </tr>`;
      }).join('');
      const aggRow = agg.teamA ? `
        <tr class="final-agg-row">
          <td class="final-col-label">Agregado</td>
          <td class="final-col-team final-col-team--home">${agg.teamA}</td>
          <td class="final-col-score">${hasAgg ? `${agg.scoreA}&thinsp;–&thinsp;${agg.scoreB}` : '—'}</td>
          <td class="final-col-team final-col-team--away">${agg.teamB}</td>
        </tr>` : '';
      const penRow = hasPen ? `
        <tr class="final-pen-row">
          <td class="final-col-label">Pênaltis</td>
          <td colspan="2" class="final-col-score">${agg.penA}&thinsp;–&thinsp;${agg.penB}</td>
          <td></td>
        </tr>` : '';
      const championRow = champion ? `
        <div class="final-champion">
          <span class="final-champion-label">CAMPEÃ</span>
          <span class="final-champion-name">${champion}</span>
        </div>` : '';
      body = `<div class="final-card">
        <table class="final-table">
          <thead>
            <tr>
              <th class="final-col-label"></th>
              <th class="final-col-team">Casa</th>
              <th class="final-col-score"></th>
              <th class="final-col-team">Fora</th>
            </tr>
          </thead>
          <tbody>
            ${legRows}
            ${aggRow}
            ${penRow}
          </tbody>
        </table>
        ${championRow}
      </div>`;
    } else {
      body = div.groups.length
        ? `<div class="grupos-grid${div.groups.length > 1 ? ' grupos-grid--multi' : ''}">
            ${div.groups.map(g => {
              const standings = computeStandings(g.matches);
              const chips = g.teams.map(t =>
                `<span class="grupo-team-chip ${t.startsWith('3') ? 'grupo-team-chip--highlight' : ''}">${t}</span>`
              ).join('');
              return `<div class="grupo-card">
                <h3 class="grupo-card-title">${g.name}</h3>
                <div class="grupo-teams">${chips}</div>
                ${standings.length ? standingsTableHTML(standings) : ''}
              </div>`;
            }).join('')}
          </div>`
        : '<p class="grupo-empty">Sem grupos definidos para esta modalidade</p>';
    }
    return `<section class="ic-sport-section">
      ${label ? `<h2 class="ic-division-label">${label}</h2>` : ''}
      ${body}
    </section>`;
  }).join('');

  if (window.ScrollTrigger) ScrollTrigger.refresh();
}

// ─── Skeleton loader ──────────────────────────────────────────────────────────
function showSkeleton() {
  const board = document.getElementById('champions-board');
  if (board) {
    board.innerHTML = `<div class="champions-grid">
      ${Array(13).fill(0).map(() => `<div class="skeleton-card">
        <div class="skeleton-line skeleton-line--short"></div>
        <div class="skeleton-line skeleton-line--medium"></div>
      </div>`).join('')}
    </div>`;
  }
  const list = document.getElementById('matches-list');
  if (list) {
    list.innerHTML = Array(5).fill(0).map(() => `<div class="match-row">
      <div class="skeleton-line" style="width:44px;height:1rem"></div>
      <div class="skeleton-line" style="width:70px"></div>
      <div class="skeleton-line" style="width:160px"></div>
      <div class="skeleton-line" style="width:60px"></div>
    </div>`).join('');
  }
  const grupos = document.getElementById('grupos-board');
  if (grupos) {
    grupos.innerHTML = `<div class="grupos-grid grupos-grid--multi">
      ${Array(3).fill(0).map(() => `<div class="skeleton-card" style="height:160px">
        <div class="skeleton-line skeleton-line--short"></div>
        <div class="skeleton-line skeleton-line--long"></div>
        <div class="skeleton-line skeleton-line--medium"></div>
        <div class="skeleton-line skeleton-line--long"></div>
      </div>`).join('')}
    </div>`;
  }
}

// ─── Timestamp ───────────────────────────────────────────────────────────────
function updateTimestamp() {
  const el = document.getElementById('last-updated');
  if (!el) return;
  const d = new Date();
  el.textContent = `atualizado ${d.getHours().toString().padStart(2,'0')}:${d.getMinutes().toString().padStart(2,'0')}`;
}

// ─── Per-page refresh routines ───────────────────────────────────────────────
async function refreshGames() {
  try {
    lastMatches = await fetchAllMatches();
    renderMatches(lastMatches);
    updateTimestamp();
  } catch (err) {
    console.warn('Jogos refresh failed:', err);
    const el = document.getElementById('last-updated');
    if (el) el.textContent = 'erro ao atualizar';
  }
}

async function refreshChampions() {
  try {
    lastChampions = await fetchChampions();
    renderChampions(lastChampions);
  } catch (err) {
    console.warn('Campeões refresh failed:', err);
  }
}

async function refreshGrupos() {
  try {
    lastGroups = await fetchAllGroups();
    renderGrupos();
  } catch (err) {
    console.warn('Grupos refresh failed:', err);
    const board = document.getElementById('grupos-board');
    if (board && !board.querySelector('.grupo-card')) {
      board.innerHTML = '<p class="grupo-empty">Erro ao carregar grupos</p>';
    }
  }
}

// ─── Rendering — teams ───────────────────────────────────────────────────────
let activeClass = '3A';

function sportCardHTML(sport, roster) {
  const isGrouped = !Array.isArray(roster);
  let playersHTML;
  if (isGrouped) {
    playersHTML = Object.entries(roster).map(([group, players]) =>
      `<li class="team-subgroup">
        <span class="team-subgroup-label">${group}</span>
        <ul class="team-players-inner">
          ${players.map(p => `<li class="team-player">${p}</li>`).join('')}
        </ul>
      </li>`
    ).join('');
  } else {
    playersHTML = roster.map(p => `<li class="team-player">${p}</li>`).join('');
  }
  return `<div class="team-card">
    <span class="team-sport-header">${sport}</span>
    <ul class="team-players-list ${isGrouped ? 'team-players-list--grouped' : ''}">${playersHTML}</ul>
  </div>`;
}

function renderTeams(classKey) {
  const board = document.getElementById('teams-board');
  if (!board) return;
  const data = TEAMS[classKey];
  if (!data) { board.innerHTML = ''; return; }
  board.innerHTML = `<div class="teams-grid">
    ${Object.entries(data).map(([sport, roster]) => sportCardHTML(sport, roster)).join('')}
  </div>`;
  if (window.ScrollTrigger) ScrollTrigger.refresh();
}

function renderClassFilters() {
  const container = document.getElementById('class-filters');
  if (!container) return;
  container.innerHTML = CLASS_ORDER.map(c =>
    `<button class="class-pill ${c === activeClass ? 'class-pill--active' : ''} ${(c === '3A' || c === '3B') ? 'class-pill--highlight' : ''}"
             data-class="${c}">${c}</button>`
  ).join('');
  container.querySelectorAll('.class-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      activeClass = btn.dataset.class;
      container.querySelectorAll('.class-pill').forEach(b =>
        b.classList.toggle('class-pill--active', b.dataset.class === activeClass)
      );
      renderTeams(activeClass);
    });
  });
}

// ─── Page-scoped init ────────────────────────────────────────────────────────
function initGames() {
  renderFilters();
  showSkeleton();
  refreshGames();
  setInterval(refreshGames, REFRESH_MS);
}

function initChampions() {
  showSkeleton();
  refreshChampions();
  setInterval(refreshChampions, REFRESH_MS);
}

function initGrupos() {
  renderGrupoFilters();
  showSkeleton();
  refreshGrupos();
  setInterval(refreshGrupos, REFRESH_MS);
}

function initTeams() {
  renderClassFilters();
  renderTeams(activeClass);
}

// ─── Cronograma (Meu Cronograma) ─────────────────────────────────────────────

// Grade definitions: each grade groups one or more TEAMS keys
const GRADES = [
  { label: '6º ano',   classes: ['6A','6B'] },
  { label: '7º ano',   classes: ['7A','7B'] },
  { label: '8º ano',   classes: ['8A','8B'] },
  { label: '9º ano',   classes: ['9A','9B'] },
  { label: '1ª série', classes: ['1A','1B'] },
  { label: '2ª série', classes: ['2°']      },
  { label: '3ª série', classes: ['3A','3B'] },
];

// How group keys in the TEAMS roster map to fixture team-id suffixes
const GROUP_SUFFIX = {
  'Time 1':    '-T1',
  'Time 2':    '-T2',
  'Time 3':    '-T3',
  'Feminino':  '-Fem',
  'Masculino': '-Mas',
};

// How TEAMS class keys map to the prefix used in fixture team ids
// '2°' is written as '2' in the schedule sheet (e.g. '2-Fem', '2-T2').
const CLASS_PREFIX = { '2°': '2' };
const classPrefix = c => CLASS_PREFIX[c] ?? c;

// Sports whose fixtures list the class (+ team suffix) as the team id.
// All other sports list individual / pair player names as the team id.
const TEAM_SPORTS = new Set(['Futebol','Basquete','Vôlei','Handebol','Olimpíada']);

// Map TEAMS sport keys → the `filter` field used in match data
const SPORT_TO_FILTER = {
  'Futebol':       'Futebol',
  'Basquete':      'Basquete',
  'Vôlei':         'Vôlei',
  'Handebol':      'Handebol',
  'Tênis de Mesa': 'Tênis de Mesa',
  'Pebolim':       'Pebolim',
  'Futmesa':       'Futmesa',
  'Olimpíada CG':  'Olimpíada',
};

// Normalize a name: lower-case, strip diacritics, strip non-alphanum (handles
// apostrophe / backtick drift like Sant'Anna vs Sant`Anna), collapse spaces.
const normName = s =>
  s.toLowerCase().normalize('NFD')
   .replace(/[̀-ͯ]/g, '')
   .replace(/[^a-z0-9 ]/g, '')
   .replace(/\s+/g, ' ')
   .trim();

let cronogramaGrade   = null;   // { label, classes } or null until user selects
let cronogramaMatches = null;

// Returns all individual player names across the given list of class keys,
// deduped and sorted. Handles flat arrays, grouped objects, and pair entries
// like "A e B" or "A, B".
function getAllPlayersForClasses(classes) {
  const names = new Set();
  function extract(entry) {
    entry.split(/,\s*|\s+e\s+/).forEach(n => { const t = n.trim(); if (t) names.add(t); });
  }
  function fromRoster(roster) {
    if (Array.isArray(roster)) roster.forEach(extract);
    else if (typeof roster === 'object') Object.values(roster).forEach(fromRoster);
  }
  for (const cls of classes) {
    const data = TEAMS[cls];
    if (data) Object.values(data).forEach(fromRoster);
  }
  return [...names].sort((a, b) => a.localeCompare(b, 'pt'));
}

// Build a set of "tokens" describing how playerName appears in fixtures across
// the given list of class keys.  Returns { teamTokens, soloTokens }.
//
// teamTokens: Set of fixture team-id strings (e.g. '3A-T1') for team sports.
// soloTokens: Map of filter → Set of normalized entry strings (e.g. 'sampaio')
//             for individual sports.
function getPlayerTokens(classes, playerName) {
  const playerNorm = normName(playerName);
  const teamFilterMap = {};   // filter → Set of fixture team-id strings (sport-scoped)
  const soloFilterMap = {};   // filter → Set of normalized entry strings

  function playerInEntry(entry) {
    return entry.split(/,\s*|\s+e\s+/).some(n => normName(n) === playerNorm);
  }

  for (const cls of classes) {
    const data = TEAMS[cls];
    if (!data) continue;
    const prefix = classPrefix(cls);

    for (const [sport, roster] of Object.entries(data)) {
      const filter = SPORT_TO_FILTER[sport];
      if (!filter) continue;

      if (TEAM_SPORTS.has(filter)) {
        // Team sport: roster is either a flat array (one team) or an object
        // keyed by group name (e.g. 'Time 1', 'Feminino').
        // Scope team-ids per sport so Sampaio on 3A-T1 (Futebol) ≠ 3A-T2 (Vôlei).
        if (Array.isArray(roster)) {
          if (roster.some(playerInEntry)) {
            teamFilterMap[filter] ??= new Set();
            teamFilterMap[filter].add(prefix);          // e.g. '3B' or '9A'
          }
        } else {
          for (const [group, players] of Object.entries(roster)) {
            if (Array.isArray(players) && players.some(playerInEntry)) {
              const suffix = GROUP_SUFFIX[group] ?? '';
              teamFilterMap[filter] ??= new Set();
              teamFilterMap[filter].add(prefix + suffix);   // e.g. '3A-T1', '2-Fem'
            }
          }
        }
      } else {
        // Individual / pair sport: roster entries ARE the fixture team ids.
        // Collect each entry string where this player appears.
        const collectEntries = r => {
          if (Array.isArray(r)) {
            r.forEach(entry => {
              if (playerInEntry(entry)) {
                soloFilterMap[filter] ??= new Set();
                soloFilterMap[filter].add(normName(entry));
              }
            });
          } else if (typeof r === 'object') {
            Object.values(r).forEach(collectEntries);
          }
        };
        collectEntries(roster);
      }
    }
  }

  return { teamFilterMap, soloFilterMap };
}

// ─── Grade autocomplete ───────────────────────────────────────────────────────

function showCronogramaGradeSuggestions(grades, inputEl) {
  const list = document.getElementById('cronograma-grade-suggestions');
  if (!list) return;
  list.innerHTML = grades
    .map(g => `<li class="cronograma-suggestion-item" data-label="${g.label}">${g.label}</li>`)
    .join('');
  list.classList.toggle('cronograma-suggestions--visible', grades.length > 0);
  list.querySelectorAll('.cronograma-suggestion-item').forEach(item => {
    item.addEventListener('mousedown', e => {
      e.preventDefault();
      selectGrade(item.dataset.label, inputEl);
    });
  });
}

function hideCronogramaGradeSuggestions() {
  const list = document.getElementById('cronograma-grade-suggestions');
  if (list) list.classList.remove('cronograma-suggestions--visible');
}

function selectGrade(label, inputEl) {
  cronogramaGrade = GRADES.find(g => g.label === label) ?? null;
  if (inputEl) inputEl.value = label;
  hideCronogramaGradeSuggestions();
  // Clear the name field when grade changes
  const nameInput = document.getElementById('cronograma-name-input');
  if (nameInput) { nameInput.value = ''; hideCronogramaSuggestions(); }
}

// ─── Name autocomplete ────────────────────────────────────────────────────────

function showCronogramaSuggestions(names, inputEl) {
  const list = document.getElementById('cronograma-suggestions');
  if (!list) return;
  list.innerHTML = names
    .map(n => `<li class="cronograma-suggestion-item" data-name="${n}">${n}</li>`)
    .join('');
  list.classList.toggle('cronograma-suggestions--visible', names.length > 0);
  list.querySelectorAll('.cronograma-suggestion-item').forEach(item => {
    item.addEventListener('mousedown', e => {
      e.preventDefault();
      inputEl.value = item.dataset.name;
      hideCronogramaSuggestions();
    });
  });
}

function hideCronogramaSuggestions() {
  const list = document.getElementById('cronograma-suggestions');
  if (list) list.classList.remove('cronograma-suggestions--visible');
}

// ─── Schedule rendering ───────────────────────────────────────────────────────

function renderPlayerSchedule(gradeObj, playerName, matches) {
  const results = document.getElementById('cronograma-results');
  if (!results) return;

  const { teamFilterMap, soloFilterMap } = getPlayerTokens(gradeObj.classes, playerName);
  const hasAnyToken = Object.keys(teamFilterMap).length > 0 || Object.keys(soloFilterMap).length > 0;

  if (!hasAnyToken) {
    results.innerHTML = `<p class="matches-empty">
      Nenhum jogo encontrado para <strong>${playerName}</strong> na <strong>${gradeObj.label}</strong>.
      Verifique se o nome está idêntico ao da lista de times.
    </p>`;
    if (window.ScrollTrigger) ScrollTrigger.refresh();
    return;
  }

  const pool = (matches || []).filter(m => {
    if (TEAM_SPORTS.has(m.filter)) {
      const ids = teamFilterMap[m.filter];
      return !!ids && (ids.has(m.teamA) || ids.has(m.teamB));
    }
    const entries = soloFilterMap[m.filter];
    if (!entries) return false;
    return entries.has(normName(m.teamA)) || entries.has(normName(m.teamB));
  });

  if (!pool.length) {
    results.innerHTML = `<p class="matches-empty">Nenhum jogo agendado encontrado para <strong>${playerName}</strong> (${gradeObj.label}).</p>`;
    if (window.ScrollTrigger) ScrollTrigger.refresh();
    return;
  }

  // Derive a readable sports list for the header from the matched fixtures
  const sportLabels = [...new Set(pool.map(m => m.filter))];

  const byDay = {};
  pool.forEach(m => { (byDay[m.dia] ??= []).push(m); });

  results.innerHTML = `
    <div class="cronograma-player-header">
      <span class="cronograma-player-name">${playerName}</span>
      <span class="cronograma-player-meta">${gradeObj.label} &bull; ${sportLabels.join(' &bull; ')}</span>
    </div>
    ${DAY_ORDER.filter(d => byDay[d]).map(day => {
      const sorted = byDay[day].slice().sort((a, b) => a.hora.localeCompare(b.hora));
      return `<div class="day-group">
        <h3 class="day-label">${DAY_LABELS[day]}</h3>
        <div class="day-matches">
          ${sorted.map(m => {
            const isDone = m.scoreA !== '' && m.scoreB !== '';
            const teamsHTML = isDone
              ? `${m.teamA} <em class="match-score">${m.scoreA}&thinsp;×&thinsp;${m.scoreB}</em> ${m.teamB}`
              : `${m.teamA}<em> × </em>${m.teamB}`;
            const badge = isDone
              ? `<span class="match-badge match-badge--done">Resultado</span>`
              : `<span class="match-badge match-badge--pending">Pendente</span>`;
            const localTag = m.local ? `<span class="match-local">${m.local}</span>` : '';
            return `<div class="match-row${isDone ? ' match-row--done' : ''}">
              <span class="match-time">${m.hora}</span>
              <span class="match-sport-tag">${m.short}</span>
              ${localTag}
              <span class="match-teams">${teamsHTML}</span>
              ${badge}
            </div>`;
          }).join('')}
        </div>
      </div>`;
    }).join('')}`;

  if (window.ScrollTrigger) ScrollTrigger.refresh();
}

function initCronograma() {
  const form        = document.getElementById('cronograma-form');
  const gradeInput  = document.getElementById('cronograma-grade-input');
  const nameInput   = document.getElementById('cronograma-name-input');
  const results     = document.getElementById('cronograma-results');

  if (!form || !gradeInput || !nameInput || !results) return;

  // Grade input — filter GRADES by typed text
  gradeInput.addEventListener('input', () => {
    const val = gradeInput.value.trim().toLowerCase();
    if (!val) { hideCronogramaGradeSuggestions(); cronogramaGrade = null; return; }
    const hits = GRADES.filter(g =>
      g.label.toLowerCase().includes(val) ||
      g.classes.some(c => c.toLowerCase().includes(val))
    );
    showCronogramaGradeSuggestions(hits, gradeInput);
  });
  gradeInput.addEventListener('blur', () => {
    setTimeout(() => {
      hideCronogramaGradeSuggestions();
      // If the typed text exactly matches a grade label, keep it selected;
      // otherwise snap to closest match or clear.
      const match = GRADES.find(g => g.label.toLowerCase() === gradeInput.value.trim().toLowerCase());
      if (match) { cronogramaGrade = match; gradeInput.value = match.label; }
      else if (!cronogramaGrade) gradeInput.value = '';
    }, 150);
  });

  // Name input — filter players from the selected grade
  nameInput.addEventListener('input', () => {
    const val = nameInput.value.trim().toLowerCase();
    if (!val) { hideCronogramaSuggestions(); return; }
    if (!cronogramaGrade) return;
    const all  = getAllPlayersForClasses(cronogramaGrade.classes);
    const hits = all.filter(n => n.toLowerCase().includes(val));
    showCronogramaSuggestions(hits.slice(0, 8), nameInput);
  });
  nameInput.addEventListener('blur', () => setTimeout(hideCronogramaSuggestions, 150));

  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = nameInput.value.trim();
    if (!name) return;
    if (!cronogramaGrade) {
      results.innerHTML = `<p class="matches-empty">Selecione sua série antes de buscar.</p>`;
      gradeInput.focus();
      return;
    }
    hideCronogramaSuggestions();
    hideCronogramaGradeSuggestions();
    if (!cronogramaMatches) {
      results.innerHTML = `<p class="matches-empty">Carregando jogos, tente novamente em instantes…</p>`;
      return;
    }
    renderPlayerSchedule(cronogramaGrade, name, cronogramaMatches);
    results.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // Pre-fetch matches in the background so search is instant
  fetchAllMatches()
    .then(m => { cronogramaMatches = m; })
    .catch(() => { cronogramaMatches = []; });
}

// Each subpage carries only its own root container — detect & run that page.
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('matches-list'))      initGames();
  if (document.getElementById('grupos-board'))      initGrupos();
  if (document.getElementById('champions-board'))   initChampions();
  if (document.getElementById('teams-board'))       initTeams();
  if (document.getElementById('cronograma-results')) initCronograma();
});
