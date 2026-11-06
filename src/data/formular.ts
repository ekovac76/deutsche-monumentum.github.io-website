// Kontaktformular: Versand per E-Mail über Web3Forms (web3forms.com).
// Den Zugangsschlüssel („Access Key“) bekommt man kostenlos auf web3forms.com, er wird an die Empfänger-Adresse geschickt.
// Ist kein Schlüssel eingetragen, zeigt das Formular nur einen Hinweis statt zu senden.
export const formular = {
  schluessel: '785ffb31-0d72-4c27-86d9-8152b2a7c4b9',
  betreff: 'Neue Anfrage über deutsche-monumentum.de',
  absenderName: 'Website Deutsche Monumentum',
};

// Tracking (Google Tag Manager, LinkedIn) nur auf der echten Domain – nicht in der Vorschau
export const trackingDomain = 'deutsche-monumentum.de';

// Auswahllisten im Kontaktformular – 1:1 wie im Webflow-Formular (Namen wie im CRM)
export const herkunft = ['Google', 'Youtube', 'Instagram', 'Linkedin', 'Facebook'];
export const formularProjekte = ['Denkmal Nürnberg', 'Pfungstadt QNG', 'Fabrik Lofts Wuppertal', 'Leipzig Gründerzeithaus', 'Weingut Renner Edesheim', 'Wuppertal Gründerzeithaus'];
