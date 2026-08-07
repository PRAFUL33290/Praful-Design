/* @ds-bundle: {"format":4,"namespace":"PrafulDesignSystem_83043c","components":[{"name":"Button","sourcePath":"components/buttons/Button.jsx"},{"name":"Card","sourcePath":"components/cards/Card.jsx"},{"name":"Accordion","sourcePath":"components/content/Accordion.jsx"},{"name":"Badge","sourcePath":"components/feedback/Badge.jsx"},{"name":"Field","sourcePath":"components/forms/Field.jsx"},{"name":"CTABanner","sourcePath":"components/layout/CTABanner.jsx"},{"name":"Header","sourcePath":"components/navigation/Header.jsx"},{"name":"SubMenu","sourcePath":"components/navigation/SubMenu.jsx"},{"name":"ThemeToggle","sourcePath":"components/navigation/ThemeToggle.jsx"}],"sourceHashes":{"components/buttons/Button.jsx":"ecb072bd6ea0","components/cards/Card.jsx":"898b58150348","components/content/Accordion.jsx":"478cdb89962d","components/feedback/Badge.jsx":"e0346d8f5263","components/forms/Field.jsx":"367660ee8d0e","components/layout/CTABanner.jsx":"911a4788f726","components/navigation/Header.jsx":"0ae52c3e9eb1","components/navigation/SubMenu.jsx":"87f8c9cf32fe","components/navigation/ThemeToggle.jsx":"7afa0eff72c8"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.PrafulDesignSystem_83043c = window.PrafulDesignSystem_83043c || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/buttons/Button.jsx
try { (() => {
function Button({
  variant = 'primaire',
  size = 'default',
  disabled = false,
  as = 'button',
  href,
  icon,
  children,
  onClick
}) {
  const Tag = as === 'a' ? 'a' : 'button';
  const cls = 'pd-btn pd-btn--' + variant + (size === 'small' ? ' pd-btn--s' : '');
  return React.createElement(React.Fragment, null, React.createElement('style', null, `
.pd-btn{font-family:var(--police);display:inline-flex;align-items:center;gap:8px;justify-content:center;padding:14px 28px;border-radius:var(--rayon-pill);font-weight:700;font-size:14px;letter-spacing:.03em;text-transform:uppercase;border:1px solid transparent;cursor:pointer;transition:var(--transition);white-space:nowrap}
.pd-btn--s{padding:9px 20px;font-size:12px}
.pd-btn--primaire{background:var(--degrade);color:var(--sur-couleur);box-shadow:0 10px 24px -8px rgba(79,70,229,.35)}
.pd-btn--primaire:hover{transform:translateY(-2px);box-shadow:0 14px 30px -8px rgba(79,70,229,.45)}
.pd-btn--secondaire{background:var(--voile);color:var(--texte-fort);border-color:var(--bordure-forte)}
.pd-btn--secondaire:hover{background:var(--survol);border-color:var(--accent-clair);color:var(--accent-clair)}
.pd-btn:disabled{opacity:.45;cursor:not-allowed;transform:none!important}
`), React.createElement(Tag, {
    className: cls,
    disabled: Tag === 'button' ? disabled : undefined,
    href: Tag === 'a' ? href : undefined,
    onClick
  }, icon ? React.createElement('span', {
    className: 'pd-btn__icon',
    'aria-hidden': true
  }, icon) : null, children));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/Button.jsx", error: String((e && e.message) || e) }); }

// components/cards/Card.jsx
try { (() => {
function Card({
  variant = 'carte',
  eyebrow,
  title,
  description,
  meta,
  footer,
  children
}) {
  return React.createElement(React.Fragment, null, React.createElement('style', null, `
.pd-carte{background:linear-gradient(160deg,var(--surface-2) 0%,var(--surface) 65%);border:1px solid var(--bordure);border-radius:var(--rayon);padding:32px;transition:var(--transition);box-shadow:var(--ombre)}
.pd-carte:hover{transform:translateY(-4px);box-shadow:var(--ombre-carte);border-color:var(--bordure-forte)}
.pd-carte__eyebrow{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:var(--tracking-label);color:var(--accent-clair);margin-bottom:12px;display:block}
.pd-carte__titre{font-size:20px;font-weight:800;color:var(--texte-fort);margin:0 0 10px}
.pd-carte__desc{font-size:15px;color:var(--texte-doux);line-height:1.6;margin:0}
.pd-carte__meta{margin-top:20px;font-size:13px;color:var(--texte-faible)}
.pd-carte--temoignage{font-style:normal}
.pd-carte--temoignage .pd-carte__desc{font-size:16px;color:var(--texte)}
`), React.createElement('div', {
    className: 'pd-carte pd-carte--' + variant
  }, eyebrow ? React.createElement('span', {
    className: 'pd-carte__eyebrow'
  }, eyebrow) : null, title ? React.createElement('h3', {
    className: 'pd-carte__titre'
  }, title) : null, description ? React.createElement('p', {
    className: 'pd-carte__desc'
  }, description) : null, children, meta ? React.createElement('div', {
    className: 'pd-carte__meta'
  }, meta) : null, footer));
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/Card.jsx", error: String((e && e.message) || e) }); }

// components/content/Accordion.jsx
try { (() => {
const {
  useState
} = React;
function Accordion({
  items = []
}) {
  const [open, setOpen] = useState(0);
  return React.createElement(React.Fragment, null, React.createElement('style', null, `
.pd-accordeon{display:flex;flex-direction:column;gap:12px}
.pd-accordeon__item{border:1px solid var(--bordure);border-radius:var(--rayon-s);overflow:hidden;background:var(--surface)}
.pd-accordeon__tete{display:flex;align-items:center;justify-content:space-between;padding:18px 20px;cursor:pointer;gap:16px}
.pd-accordeon__q{font-size:15px;font-weight:700;color:var(--texte-fort);margin:0}
.pd-accordeon__signe{width:22px;height:22px;flex:none;display:flex;align-items:center;justify-content:center;font-size:18px;color:var(--accent-clair);transition:var(--transition)}
.pd-accordeon__signe--ouvert{transform:rotate(45deg)}
.pd-accordeon__corps{padding:0 20px 18px;font-size:14px;color:var(--texte-doux);line-height:1.6}
`), React.createElement('div', {
    className: 'pd-accordeon'
  }, items.map((it, i) => React.createElement('div', {
    className: 'pd-accordeon__item',
    key: i
  }, React.createElement('div', {
    className: 'pd-accordeon__tete',
    onClick: () => setOpen(open === i ? -1 : i)
  }, React.createElement('p', {
    className: 'pd-accordeon__q'
  }, it.question), React.createElement('span', {
    className: 'pd-accordeon__signe' + (open === i ? ' pd-accordeon__signe--ouvert' : '')
  }, '+')), open === i ? React.createElement('div', {
    className: 'pd-accordeon__corps'
  }, it.reponse) : null))));
}
Object.assign(__ds_scope, { Accordion });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Accordion.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Badge.jsx
try { (() => {
function Badge({
  variant = 'degrade',
  children
}) {
  return React.createElement(React.Fragment, null, React.createElement('style', null, `
.pd-badge{display:inline-flex;align-items:center;gap:6px;padding:6px 16px;border-radius:var(--rayon-pill);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:var(--tracking-label);white-space:nowrap;width:fit-content}
.pd-badge--degrade{background:var(--degrade);color:var(--sur-couleur)}
.pd-badge--neutre{background:var(--voile);color:var(--texte-doux);border:1px solid var(--bordure)}
.pd-badge--jaune{background:rgba(255,200,61,.16);color:#a67300}
[data-theme="dark"] .pd-badge--jaune{color:var(--jaune)}
`), React.createElement('span', {
    className: 'pd-badge pd-badge--' + variant
  }, children));
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Badge.jsx", error: String((e && e.message) || e) }); }

// components/forms/Field.jsx
try { (() => {
function Field({
  label,
  type = 'text',
  placeholder,
  error,
  required = false,
  as = 'input',
  value,
  onChange
}) {
  const Tag = as === 'textarea' ? 'textarea' : 'input';
  return React.createElement(React.Fragment, null, React.createElement('style', null, `
.pd-champ{display:flex;flex-direction:column;gap:8px;width:100%}
.pd-champ__label{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:var(--tracking-label);color:var(--texte-doux)}
.pd-champ__input{font-family:var(--police);font-size:15px;color:var(--texte);background:var(--champ-fond);border:1px solid var(--bordure);border-radius:var(--rayon-s);padding:13px 16px;transition:var(--transition);outline:none}
.pd-champ__input:focus{border-color:var(--accent-clair);box-shadow:var(--lueur)}
.pd-champ__erreur{font-size:12px;color:var(--erreur)}
`), React.createElement('label', {
    className: 'pd-champ'
  }, label ? React.createElement('span', {
    className: 'pd-champ__label'
  }, label, required ? ' *' : '') : null, React.createElement(Tag, {
    className: 'pd-champ__input',
    type: Tag === 'input' ? type : undefined,
    placeholder,
    value,
    onChange,
    rows: Tag === 'textarea' ? 4 : undefined
  }), error ? React.createElement('span', {
    className: 'pd-champ__erreur'
  }, error) : null));
}
Object.assign(__ds_scope, { Field });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Field.jsx", error: String((e && e.message) || e) }); }

// components/layout/CTABanner.jsx
try { (() => {
function CTABanner({
  title = 'Prêt à lancer votre projet ?',
  description = 'Parlons de votre besoin, sans engagement.',
  label = 'Demander un devis'
}) {
  return React.createElement(React.Fragment, null, React.createElement('style', null, `
.pd-bandeau{background:var(--cta-degrade);border-radius:var(--rayon);padding:56px var(--gouttiere);text-align:center;color:#fff;display:flex;flex-direction:column;align-items:center;gap:20px}
.pd-bandeau h2{color:#fff;font-size:var(--h2)}
.pd-bandeau p{color:rgba(255,255,255,.82);font-size:16px;margin:0;max-width:520px}
`), React.createElement('div', {
    className: 'pd-bandeau'
  }, React.createElement('h2', null, title), React.createElement('p', null, description), React.createElement(__ds_scope.Button, {
    variant: 'primaire'
  }, label)));
}
Object.assign(__ds_scope, { CTABanner });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/CTABanner.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SubMenu.jsx
try { (() => {
function SubMenu({
  items = []
}) {
  return React.createElement(React.Fragment, null, React.createElement('style', null, `
.pd-sousmenu{background:var(--voile-menu);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);border:1px solid var(--bordure);border-radius:var(--rayon);padding:12px;display:flex;flex-direction:column;gap:4px;box-shadow:var(--ombre-carte);min-width:320px}
.pd-sousmenu__item{display:flex;align-items:flex-start;gap:14px;padding:12px;border-radius:var(--rayon-s);cursor:pointer;transition:var(--transition)}
.pd-sousmenu__item:hover{background:var(--survol)}
.pd-sousmenu__icone{width:38px;height:38px;border-radius:10px;background:var(--degrade);color:var(--sur-couleur);display:flex;align-items:center;justify-content:center;flex:none;font-size:16px}
.pd-sousmenu__titre{font-size:14px;font-weight:700;color:var(--texte-fort);margin:0 0 2px}
.pd-sousmenu__desc{font-size:13px;color:var(--texte-doux);margin:0}
`), React.createElement('div', {
    className: 'pd-sousmenu'
  }, items.map((it, i) => React.createElement('div', {
    className: 'pd-sousmenu__item',
    key: i
  }, React.createElement('span', {
    className: 'pd-sousmenu__icone',
    'aria-hidden': true
  }, it.icon || '◆'), React.createElement('div', null, React.createElement('p', {
    className: 'pd-sousmenu__titre'
  }, it.title), React.createElement('p', {
    className: 'pd-sousmenu__desc'
  }, it.description))))));
}
Object.assign(__ds_scope, { SubMenu });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SubMenu.jsx", error: String((e && e.message) || e) }); }

// components/navigation/ThemeToggle.jsx
try { (() => {
function ThemeToggle({
  theme = 'clair',
  onToggle
}) {
  const isDark = theme === 'sombre';
  return React.createElement(React.Fragment, null, React.createElement('style', null, `
.pd-bascule{width:44px;height:44px;border-radius:50%;border:1px solid var(--bordure-forte);background:var(--surface-2);display:inline-flex;align-items:center;justify-content:center;cursor:pointer;transition:var(--transition);color:var(--texte-fort)}
.pd-bascule:hover{background:var(--survol);border-color:var(--accent-clair)}
.pd-bascule svg{width:18px;height:18px}
`), React.createElement('button', {
    className: 'pd-bascule',
    'aria-label': 'Changer de thème',
    onClick: onToggle
  }, isDark ? React.createElement('svg', {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  }, React.createElement('circle', {
    cx: 12,
    cy: 12,
    r: 4
  }), React.createElement('path', {
    d: 'M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4'
  })) : React.createElement('svg', {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  }, React.createElement('path', {
    d: 'M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z'
  }))));
}
Object.assign(__ds_scope, { ThemeToggle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/ThemeToggle.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Header.jsx
try { (() => {
function Header({
  brand = 'Praful Design',
  links = ['Offres', 'Réalisations', 'À propos', 'Contact'],
  scrolled = false,
  theme = 'clair',
  onToggleTheme
}) {
  return React.createElement(React.Fragment, null, React.createElement('style', null, `
.pd-entete{position:sticky;top:0;height:76px;display:flex;align-items:center;justify-content:space-between;padding:0 var(--gouttiere);transition:var(--transition);z-index:10}
.pd-entete--scrolled{background:var(--voile-menu);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-bottom:1px solid var(--bordure)}
.pd-entete__marque{font-weight:800;font-size:19px;letter-spacing:-.02em;background:var(--degrade);-webkit-background-clip:text;background-clip:text;color:transparent}
.pd-entete__nav{display:flex;gap:32px;list-style:none;margin:0;padding:0}
.pd-entete__nav a{font-size:14px;font-weight:600;color:var(--texte);text-decoration:none}
.pd-entete__nav a:hover{color:var(--accent-clair)}
.pd-entete__droite{display:flex;align-items:center;gap:16px}
`), React.createElement('header', {
    className: 'pd-entete' + (scrolled ? ' pd-entete--scrolled' : '')
  }, React.createElement('span', {
    className: 'pd-entete__marque'
  }, brand), React.createElement('nav', null, React.createElement('ul', {
    className: 'pd-entete__nav'
  }, links.map((l, i) => React.createElement('li', {
    key: i
  }, React.createElement('a', {
    href: '#'
  }, l))))), React.createElement('div', {
    className: 'pd-entete__droite'
  }, React.createElement(__ds_scope.ThemeToggle, {
    theme,
    onToggle: onToggleTheme
  }), React.createElement(__ds_scope.Button, {
    variant: 'primaire',
    size: 'small'
  }, 'Demander un devis'))));
}
Object.assign(__ds_scope, { Header });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Header.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Accordion = __ds_scope.Accordion;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Field = __ds_scope.Field;

__ds_ns.CTABanner = __ds_scope.CTABanner;

__ds_ns.Header = __ds_scope.Header;

__ds_ns.SubMenu = __ds_scope.SubMenu;

__ds_ns.ThemeToggle = __ds_scope.ThemeToggle;

})();
