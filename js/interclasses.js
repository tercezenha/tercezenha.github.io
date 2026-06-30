/* interclasses.js — Live Google Sheets integration + team rosters */

const CONTROL_ID  = '1eejXQCdkVlcgaRCT-aZBUc4jpNMRDNbIZMBV8mS_d04'; // Results sheet
const SCHEDULE_ID  = '1njQ8QBw7acmxCVo8hzeGvFOxzN2gqWg7UhGF7TD7Z3I'; // Schedule sheet
const SCHEDULE_GID = '501903747';                                      // "CRONOGRAMA GERAL" tab

// Finais sheet (replaces the old Mata-Mata sheet)
const FINAIS_ID         = '1E0yDmlD5mHNxfCtjaRY5hmqO6CJu7i3bilUQTvhE8KI';
const FINAIS_RESULT_GID = '987065534';   // "Resultados" tab — scores + bracket
const FINAIS_CAL_GID    = '509322914';   // "Calendário das Finais" tab — day/time/venue
const FINAIS_CHAMP_GID  = '1926301037';  // "Campeões" tab — champion per modality

// ─── Team rosters (from "Times do Interclasses" document) ─────────────────────
const TEAMS = {
  '6A': {
    'Futebol':        ['Antonio Amarante','Bruno Chico','Fernando José','Lucas Larizati','Miguel Vita','Pedro Henrique','Rafael Matos','Arthur Mantovani'],
    'Basquete':       ['Bruno Chico','Fernando José','Miguel Vita','Pedro Henrique','Antonio Amarante'],
    'Vôlei':          ['Clarisse Rosa','Giovanna Vellodoree','Luzia Gizlio','Maria Fernanda','Natalia Xavier','Sofia Valim Kiyohara','Bruno Chico'],
    'Pebolim':        ['Antonio Cabizuca','Antonio Amarante e Lucas de Freitas','Clarisse Rosa e Sofia Valim Kiyohara'],
    'Tênis de Mesa':  ['Antonio Amarante','Nicolas Frossard'],
    'Futmesa':        ['Antonio Amarante e Rafael Matos','Pedro Henrique e Bruno Chico'],
  },
  '6B': {
    'Futebol':        { 'Time 1': ['Miguel Arruti','Gustavo Lourenço','Pedro Magnelli','Thiago Chico','Vinicius Sintra'], 'Time 2': ['Felipe Vita','João Vitor','Rafael Bot','Rodrigo Goldman','Theo Gama','Joaquim Sily'] },
    'Basquete':       ['Felipe Vita','Gustavo Lourenço','Pedro Magnelli','Thiago Chico','Vinicius Sintra','João Vitor'],
    'Vôlei':          ['Isabela Cordeiro','Lara Souza','Manuela Pereira','Manuela Rodrigues','Maria Clara Panis','Maria Eduarda','Maria Silvia','Marina Pazinato','Nina Almada','Rafael Angheben','Carol Mota'],
    'Handebol':       ['Gustavo Lourenço','Thiago Chico','Vinicius Sintra','Miguel Vita','João Vitor','Bruno Chico','Miguel Arruti'],
    'Pebolim':        ['Gustavo Lourenço','Isabela Cordeiro e Lara Souza','João Vitor e Manuela Rodrigues','Maria Clara Panis e Isabella Morais','Rodrigo Goldman e Rafael Matos'],
    'Tênis de Mesa':  ['Gustavo Lourenço','João Vitor','Rodrigo Goldman','Thiago Chico','Vinicius Sintra'],
    'Futmesa':        ['Gustavo Lourenço e Thiago Chico','João Vitor e Vinicius Sintra'],
  },
  '7A': {
    'Futebol':        ['Daniel Breder','Pedro Bezerra','Gabriel Ramos','Pedro Tambellini','Francisco Collet','Luiza Lopes','Andrey'],
    'Basquete':       ['Lucas Santana','Gabriel Siqueira','Pedro Tambellini','Bento Campeão','Pedro Amaral','Andrey','Nicolas Cabral'],
    'Vôlei':          ['Catarina Barros','Maria Lamaison','Gabriela Galhardo','Betina Vitelli','Laura','Luiza Lopes'],
    'Handebol':       ['Lucas Santana','Gabriel Siqueira','Pedro Tambellini','Nicolas Cabral','Bento Campeão','Pedro Amaral','Andrey'],
    'Tênis de Mesa':  ['Bento Campeão','Daniel Breder','Mateus Fré'],
  },
  '7B': {
    'Futebol':        ['Bento Campeão','Lucas Santana','Pietro Tambellini','Pedro Amaral','Rafael Parente','Rafael Eid','Pietro Bertolla','Bernardo Donha','Mateus Fré','Nicolas Cabral'],
    'Basquete':       ['Bernardo Donha','Rafael Parente','Pietro Trevizan','Pedro Bezerra','Mateus Fré','Rafael Eid','Daniel Breder'],
    'Vôlei':          ['Bernardo Donha','Rafael Parente','Pietro Trevizan','Pedro Bezerra','Mateus Fré','Rafael Eid','Daniel Breder'],
    'Handebol':       ['Bernardo Donha','Rafael Parente','Pietro Trevizan','Pedro Bezerra','Mateus Fré','Rafael Eid','Daniel Breder'],
    'Pebolim':        ['Bento Campeão e Lucas Santana','Gabriel Siqueira e Pedro Amaral','Parente e Pietro Trevizan','Rafael Eid'],
    'Futmesa':        ['Bento Campeão e Rafael Parente','Mateus Fré e Pietro Trevizan','Pedro Amaral e Lucas Santana','Rafael Eid e Pedro Bezerra','Nicolas Cabral e Gabriel Siqueira'],
  },
  '8A': {
    'Futebol':        ['Miguel Cammarosan','Aike','Samuel','Guilherme','Arthur Mota','Gustavo Simões','Nicolas Seton'],
    'Basquete':       ['Miguel Cammarosan','Aike','Samuel','Guilherme','Arthur Mota','Gustavo Simões','Nicolas Seton'],
    'Vôlei':          ['Miguel Cammarosan','Aike','Samuel','Guilherme','Arthur Mota','Gustavo Simões','Nicolas Seton','Carolina Barreto','Carol','Julia Dalfe','Manuela Gomes','Ana Carol','Sofia Rechi'],
    'Handebol':       ['Miguel Cammarosan','Aike','Samuel','Guilherme','Arthur Mota','Gustavo Simões','Nicolas Seton'],
    'Pebolim':        ['Samuel e Leo Rosa','Aike e Miguel'],
    'Futmesa':        ['Leo Rosa e Samuel'],
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
    'Pebolim':        ['Erik Nunes e Mateus Cavalcante'],
    'Tênis de Mesa':  ['Erik Nunes','Mateus Cavalcante','Giovanni'],
    'Futmesa':        ['Erik Nunes e Mateus Cavalcante','Pedro Eid e Giovanni'],
    'Olimpíada CG':   ['Leo Lobo, Pedro Cardoso, Mateus Cavalcante e Erik Nunes'],
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
    'Futmesa':        ['Bruno Relva e Antonio','Barros e Tambasco','Beretta e Sant\'Anna','Arthur e Matheus Regatieri'],
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

// "Sala do 3B" is published as "Auditório" on the site.
function relabelLocal(local) {
  return /sala do 3b/i.test(local) ? 'Auditório' : local;
}

// Order the event days relative to today: days earlier than today (in the Wed→Tue
// sequence) sink to the bottom; today + upcoming stay on top — each partition keeps
// its chronological order. Returns the day list plus the set of past days.
function orderedDays() {
  const DAY_SEQ = { Qua: 0, Qui: 1, Sex: 2, Seg: 3, Ter: 4 };
  const WD_SEQ  = { 3: 0, 4: 1, 5: 2, 6: 2.5, 0: 2.5, 1: 3, 2: 4 }; // Sat/Sun → between Fri & Mon
  const today   = WD_SEQ[new Date().getDay()] ?? -1;
  const upcoming = DAY_ORDER.filter(d => DAY_SEQ[d] >= today);
  const past     = DAY_ORDER.filter(d => DAY_SEQ[d] <  today);
  return { order: [...upcoming, ...past], pastSet: new Set(past) };
}

let activeFilter      = 'Todos';
let activeLocation    = 'Todas';
let activeGrupoSport  = 'Futebol';
let lastMatches       = [];
let lastChampions     = [];
let lastGroups        = [];   // [{ sport, divisions: [{ label, groups: [{ name, teams[], matches[] }] }] }]

// Finais state
let lastFinaisBracket = [];   // [{ modality, champion, matches:[...] }]
let lastFinaisCalMap  = new Map(); // "modality||fase" → { hora, local }

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
  const params = new URLSearchParams({ tqx: 'out:csv', headers: '0', gid: FINAIS_CHAMP_GID });
  const url    = `https://docs.google.com/spreadsheets/d/${FINAIS_ID}/gviz/tq?${params}`;
  const r      = await fetch(url);
  const rows   = parseCSV(await r.text());
  const hIdx   = rows.findIndex(r => r[0] === 'Modalidade');
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
      local: relabelLocal(r[3].trim()),
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

// ─── Finais — fetch ───────────────────────────────────────────────────────────

// Maps modality label → { short, filter } for the Finais sheet modality strings,
// which match SPORT_TABS[].label exactly.
const FINAIS_LABEL_MAP = Object.fromEntries(SPORT_TABS.map(s => [s.label, { short: s.short, filter: s.filter }]));

// Fetch the Resultados tab from the Finais sheet.
// Returns [{ modality, champion, matches:[{ fase, teamA, scoreA, scoreB, teamB, penA, penB, winner }] }].
async function fetchFinaisBracket() {
  const params = new URLSearchParams({ tqx: 'out:csv', headers: '0', gid: FINAIS_RESULT_GID });
  const url = `https://docs.google.com/spreadsheets/d/${FINAIS_ID}/gviz/tq?${params}`;
  const r = await fetch(url);
  const rows = parseCSV(await r.text());

  const modalities = [];
  let current = null;
  const phaseRe = /^(QF|SF|Final)/i;

  for (const row of rows) {
    const col0 = (row[0] || '').trim();
    if (!col0) continue;
    if (col0 === 'Fase') continue;  // column header row

    if (col0.startsWith('CAMPEÃO')) {
      if (current) {
        current.champion = fixApostrophe(((row[7] || '') || (row[1] || '')).trim());
        modalities.push(current);
        current = null;
      }
      continue;
    }

    if (phaseRe.test(col0)) {
      if (current) {
        current.matches.push({
          fase:   col0,
          teamA:  fixApostrophe((row[1] || '').trim()),
          scoreA: (row[2] || '').trim(),
          scoreB: (row[3] || '').trim(),
          teamB:  fixApostrophe((row[4] || '').trim()),
          penA:   (row[5] || '').trim(),
          penB:   (row[6] || '').trim(),
          winner: fixApostrophe((row[7] || '').trim()),
        });
      }
      continue;
    }

    // New modality block.
    if (current) modalities.push(current);
    current = { modality: fixApostrophe(col0), champion: '', matches: [] };
  }
  if (current) modalities.push(current);

  return modalities.filter(m => m.matches.length > 0);
}

// Normalise calendar fase labels to the same form used in Resultados.
// "Final - ida" → "Final (Ida)", "Final - Vlt" → "Final (Volta)",
// "SF1 (Ida)" → "SF1 (Ida)" (pass-through).
function normCalFase(fase) {
  return fase
    .replace(/\s*-\s*ida\s*/i, ' (Ida)')
    .replace(/\s*-\s*vlt\s*/i, ' (Volta)')
    .replace(/\s*-\s*volta\s*/i, ' (Volta)')
    .trim();
}

// Fetch the Calendário das Finais tab.
// Returns Map keyed "modality||canonicalFase" → { hora, local }.
// Columns: Dia(0) · Início(1) · Fim(2) · Local(3) · Modalidade(4) · Fase(5) · Partida(6).
// First three rows are title / notes / blank; data starts at row 4 (0-indexed: 3).
async function fetchFinaisCalendar() {
  const params = new URLSearchParams({ tqx: 'out:csv', headers: '0', gid: FINAIS_CAL_GID });
  const url = `https://docs.google.com/spreadsheets/d/${FINAIS_ID}/gviz/tq?${params}`;
  const r = await fetch(url);
  const rows = parseCSV(await r.text());

  const map = new Map();
  for (const row of rows.slice(3)) {
    const mod  = fixApostrophe((row[4] || '').trim());
    const fase = normCalFase((row[5] || '').trim());
    if (!mod || !fase) continue;
    const key = `${mod}||${fase}`;
    if (!map.has(key)) {
      map.set(key, {
        hora:  (row[1] || '').trim(),
        local: relabelLocal((row[3] || '').trim()),
      });
    }
  }
  return map;
}

// ─── Finais — build items ────────────────────────────────────────────────────

// Modalities that use two-leg ties in their finals/semis.
// Value is the set of fase prefixes that are two-leg for that modality.
const FINAIS_TWO_LEG = {
  'Futebol — Div. A': ['Final'],
  'Futebol — Div. B': ['SF1', 'SF2', 'Final'],
};

// Modalities to skip entirely on the Finais page (decided outside the bracket).
const FINAIS_SKIP = new Set(['Futebol Feminino']);

// Build the list of items for the Finais page from bracket + calendar data.
// Two-leg ties → one aggregate item; single-leg finals → one row item.
// Returns items sorted by hora (ascending).
function buildFinaisItems(bracket, calMap) {
  const items = [];

  for (const { modality, champion, matches } of bracket) {
    if (FINAIS_SKIP.has(modality)) continue;
    const meta = FINAIS_LABEL_MAP[modality] || { short: modality, filter: modality };
    const twoLegPrefixes = FINAIS_TWO_LEG[modality] || [];

    // Group matches: detect two-leg ties by finding (Ida) + (Volta) pairs sharing a prefix.
    // All other matches are single-leg.
    const grouped = {};  // prefixKey → [idaMatch, voltaMatch]
    const singles = [];

    for (const match of matches) {
      const idaMatch   = /\(Ida\)/i.test(match.fase);
      const voltaMatch = /\(Volta\)/i.test(match.fase);
      if (idaMatch || voltaMatch) {
        // Extract the base fase (e.g. "Final", "SF1") by stripping the leg suffix.
        const base = match.fase.replace(/\s*\((Ida|Volta)\)\s*/i, '').trim();
        if (twoLegPrefixes.some(p => base.startsWith(p))) {
          grouped[base] ??= {};
          if (idaMatch) grouped[base].ida = match;
          else           grouped[base].volta = match;
          continue;
        }
      }
      // Single-leg match — but only include "Final" round (not QF/SF from prior rounds).
      if (/^Final/i.test(match.fase) || twoLegPrefixes.some(p => match.fase.startsWith(p))) {
        singles.push(match);
      }
    }

    // Single-leg final items.
    for (const match of singles) {
      const calKey = `${modality}||${match.fase}`;
      const cal    = calMap.get(calKey) || {};
      const isDone = match.scoreA !== '' && match.scoreB !== '';
      items.push({
        type:     'single',
        modality, short: meta.short,
        fase:     match.fase,
        hora:     cal.hora  || '',
        local:    cal.local || '',
        teamA:    match.teamA  || 'A definir',
        teamB:    match.teamB  || 'A definir',
        scoreA:   match.scoreA,
        scoreB:   match.scoreB,
        winner:   match.winner,
        isDone,
        champion: isDone && match.winner ? match.winner : (champion || ''),
      });
    }

    // Two-leg aggregate items.
    for (const [base, legs] of Object.entries(grouped)) {
      const ida    = legs.ida   || {};
      const volta  = legs.volta || {};

      const idaDone   = (ida.scoreA   || '') !== '' && (ida.scoreB   || '') !== '';
      const voltaDone = (volta.scoreA || '') !== '' && (volta.scoreB || '') !== '';
      const bothDone  = idaDone && voltaDone;

      // Aggregate score: Ida's teamA is home; Volta swaps sides.
      // teamA in Final(Volta) is the away team from Ida, so we need to match Ida's A/B.
      let aggA = '', aggB = '';
      let aggWinner = '';
      let penA = '', penB = '';
      if (bothDone) {
        const iaA = parseInt(ida.scoreA, 10) || 0;
        const iaB = parseInt(ida.scoreB, 10) || 0;
        // Volta: teamA = Ida's teamB, teamB = Ida's teamA → re-flip for Ida's perspective.
        const vA  = parseInt(volta.scoreB, 10) || 0;  // volta.scoreB = Ida's teamA
        const vB  = parseInt(volta.scoreA, 10) || 0;  // volta.scoreA = Ida's teamB
        aggA = String(iaA + vA);
        aggB = String(iaB + vB);
        penA = volta.penA || '';
        penB = volta.penB || '';
        if (penA || penB) {
          aggWinner = parseInt(penA, 10) > parseInt(penB, 10) ? (ida.teamA || '') : (ida.teamB || '');
        } else {
          aggWinner = parseInt(aggA) > parseInt(aggB) ? (ida.teamA || '') : (parseInt(aggA) < parseInt(aggB) ? (ida.teamB || '') : '');
        }
      }

      // Calendar: anchor hora/local on the Ida leg.
      const calKeyIda = `${modality}||${base} (Ida)`;
      const cal = calMap.get(calKeyIda) || {};

      // Human-readable fase label for the aggregate card header.
      const faseLabel = base === 'Final' ? 'Final — dois jogos'
        : /^SF(\d+)/i.test(base) ? `Semifinal ${base.replace(/^SF/i, '')} — dois jogos`
        : base;

      items.push({
        type:     'aggregate',
        modality, short: meta.short,
        fase:     faseLabel,
        base,
        hora:     cal.hora  || '',
        local:    cal.local || '',
        teamA:    ida.teamA  || volta.teamB || 'A definir',
        teamB:    ida.teamB  || volta.teamA || 'A definir',
        ida:  { scoreA: ida.scoreA  || '', scoreB: ida.scoreB  || '', isDone: idaDone },
        volta:{ scoreA: volta.scoreA || '', scoreB: volta.scoreB || '', isDone: voltaDone,
                hora: (calMap.get(`${modality}||${base} (Volta)`) || {}).hora || '' },
        aggA, aggB, penA, penB, bothDone,
        winner: aggWinner || (volta.winner || ida.winner || ''),
        champion: bothDone && aggWinner ? aggWinner : (champion || ''),
      });
    }
  }

  // Sort by hora, empty hora sinks to bottom.
  return items.sort((a, b) => {
    if (!a.hora && !b.hora) return 0;
    if (!a.hora) return 1;
    if (!b.hora) return -1;
    return a.hora.localeCompare(b.hora);
  });
}

// ─── Finais — render ─────────────────────────────────────────────────────────

function updateFinaisTimestamp() {
  const el = document.getElementById('finais-last-updated');
  if (!el) return;
  const d = new Date();
  el.textContent = `atualizado ${d.getHours().toString().padStart(2,'0')}:${d.getMinutes().toString().padStart(2,'0')}`;
}

function renderFinais(items) {
  const board = document.getElementById('finais-board');
  if (!board) return;

  if (!items.length) {
    board.innerHTML = '<p class="matches-empty">Nenhuma final encontrada.</p>';
    if (window.ScrollTrigger) ScrollTrigger.refresh();
    return;
  }

  board.innerHTML = items.map(item => {
    if (item.type === 'single') {
      return renderFinaisSingleRow(item);
    } else {
      return renderFinaisAggCard(item);
    }
  }).join('');

  if (window.ScrollTrigger) ScrollTrigger.refresh();
}

function renderFinaisSingleRow(item) {
  const isDone = item.isDone;
  const teamsHTML = isDone
    ? `${item.teamA} <em class="match-score finais-score">${item.scoreA}&thinsp;×&thinsp;${item.scoreB}</em> ${item.teamB}`
    : `${item.teamA}<em> × </em>${item.teamB}`;
  const badge = isDone
    ? `<span class="match-badge match-badge--done">Resultado</span>`
    : `<span class="match-badge match-badge--pending">Final</span>`;
  const localTag = item.local ? `<span class="match-local">${item.local}</span>` : '';
  return `<div class="match-row finais-row${isDone ? ' match-row--done finais-row--done' : ''}">
    <span class="match-time">${item.hora}</span>
    <span class="match-sport-tag finais-sport-tag">${item.short}</span>
    ${localTag}
    <span class="match-teams">${teamsHTML}</span>
    ${badge}
  </div>`;
}

function renderFinaisAggCard(item) {
  const idaDone   = item.ida.isDone;
  const voltaDone = item.volta.isDone;
  const bothDone  = item.bothDone;

  const idaScoreTD = idaDone
    ? `<td class="final-col-score">${item.ida.scoreA}&thinsp;×&thinsp;${item.ida.scoreB}</td>`
    : `<td class="final-col-score final-col-score--tbd">–</td>`;
  const voltaScoreTD = voltaDone
    ? `<td class="final-col-score">${item.volta.scoreA}&thinsp;×&thinsp;${item.volta.scoreB}</td>`
    : `<td class="final-col-score final-col-score--tbd">–</td>`;

  const voltaHora = item.volta.hora ? `<span class="finais-leg-hora">${item.volta.hora}</span>` : '';
  const idaHora   = item.hora       ? `<span class="finais-leg-hora">${item.hora}</span>`       : '';

  let aggHTML = '';
  if (bothDone) {
    const penHTML = (item.penA || item.penB)
      ? `<tr class="final-pen-row">
           <td class="final-col-label">Pênaltis</td>
           <td class="final-col-team final-col-team--home"></td>
           <td class="final-col-score">${item.penA}&thinsp;×&thinsp;${item.penB}</td>
           <td class="final-col-team final-col-team--away"></td>
         </tr>`
      : '';
    aggHTML = `<tr class="final-agg-row finais-agg-row">
      <td class="final-col-label">Agregado</td>
      <td class="final-col-team final-col-team--home finais-winner${item.winner && item.winner === item.teamA ? ' finais-winner--active' : ''}">${item.teamA}</td>
      <td class="final-col-score finais-agg-score">${item.aggA}&thinsp;×&thinsp;${item.aggB}</td>
      <td class="final-col-team final-col-team--away finais-winner${item.winner && item.winner === item.teamB ? ' finais-winner--active' : ''}">${item.teamB}</td>
    </tr>${penHTML}`;
  }

  const champHTML = item.champion
    ? `<div class="final-champion finais-champion">
         <span class="final-champion-label finais-champion-label">Campeão</span>
         <span class="final-champion-name finais-champion-name">${item.champion}</span>
       </div>`
    : '';

  const localTag = item.local ? ` · ${item.local}` : '';

  return `<div class="final-card finais-agg-card">
    <div class="finais-agg-header">
      <span class="finais-agg-sport">${item.short}</span>
      <span class="finais-agg-fase">${item.fase}</span>
    </div>
    <table class="final-table">
      <thead>
        <tr>
          <th class="final-col-label"></th>
          <th class="final-col-team final-col-team--home">${item.teamA}</th>
          <th class="final-col-score"></th>
          <th class="final-col-team final-col-team--away">${item.teamB}</th>
        </tr>
      </thead>
      <tbody>
        <tr class="final-leg-row${idaDone ? ' final-leg-row--scored' : ''}">
          <td class="final-col-label">Ida${idaHora}</td>
          <td class="final-col-team final-col-team--home"></td>
          ${idaScoreTD}
          <td class="final-col-team final-col-team--away"></td>
        </tr>
        <tr class="final-leg-row${voltaDone ? ' final-leg-row--scored' : ''}">
          <td class="final-col-label">Volta${voltaHora}</td>
          <td class="final-col-team final-col-team--home"></td>
          ${voltaScoreTD}
          <td class="final-col-team final-col-team--away"></td>
        </tr>
        ${aggHTML}
      </tbody>
    </table>
    ${champHTML}
  </div>`;
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

// ─── Rendering — location filter pills (Jogos tab) ────────────────────────────
function renderLocationFilters() {
  const container = document.getElementById('location-filters');
  if (!container) return;
  const labels = ['Todas', 'Quadra 1', 'Quadra 2'];
  container.innerHTML = labels.map(l =>
    `<button class="pill-filter ${l === activeLocation ? 'pill-filter--active' : ''}"
             data-location="${l}">${l}</button>`
  ).join('');
  container.querySelectorAll('.pill-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      activeLocation = btn.dataset.location;
      container.querySelectorAll('.pill-filter').forEach(b =>
        b.classList.toggle('pill-filter--active', b.dataset.location === activeLocation)
      );
      renderMatches(lastMatches);
    });
  });
}

// ─── Rendering — matches ──────────────────────────────────────────────────────
function renderMatches(matches) {
  const list = document.getElementById('matches-list');
  if (!list) return;

  const pool = matches.filter(m =>
    (activeFilter   === 'Todos' || m.filter === activeFilter) &&
    (activeLocation === 'Todas' || m.local  === activeLocation)
  );

  if (!pool.length) {
    const isFiltered = activeFilter !== 'Todos' || activeLocation !== 'Todas';
    list.innerHTML = `<p class="matches-empty">Nenhum jogo encontrado${isFiltered ? ' com esses filtros' : ''}.</p>`;
    if (window.ScrollTrigger) ScrollTrigger.refresh();
    return;
  }

  const byDay = {};
  pool.forEach(m => { (byDay[m.dia] ??= []).push(m); });

  const { order, pastSet } = orderedDays();
  list.innerHTML = order
    .filter(d => byDay[d])
    .map(day => {
      const sorted = byDay[day].slice().sort((a, b) => a.hora.localeCompare(b.hora));
      return `<div class="day-group${pastSet.has(day) ? ' day-group--past' : ''}">
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

async function refreshFinais() {
  try {
    const [bracket, calMap] = await Promise.all([fetchFinaisBracket(), fetchFinaisCalendar()]);
    lastFinaisBracket = bracket;
    lastFinaisCalMap  = calMap;
    renderFinais(buildFinaisItems(bracket, calMap));
    updateFinaisTimestamp();
  } catch (err) {
    console.warn('Finais refresh failed:', err);
    const el = document.getElementById('finais-last-updated');
    if (el) el.textContent = 'erro ao atualizar';
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
  renderLocationFilters();
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

function initFinais() {
  const board = document.getElementById('finais-board');
  if (!board) return;
  board.innerHTML = '<p class="matches-empty">Carregando finais…</p>';
  refreshFinais();
  setInterval(refreshFinais, REFRESH_MS);
}

// Each subpage carries only its own root container — detect & run that page.
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('matches-list'))    initGames();
  if (document.getElementById('grupos-board'))    initGrupos();
  if (document.getElementById('champions-board')) initChampions();
  if (document.getElementById('teams-board'))     initTeams();
  if (document.getElementById('finais-board'))    initFinais();
});
