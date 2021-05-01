//API URL
export const API_URL = 'https://cabinet-expertcomptable.com/';
export const API_URL_DEV = 'http://odyssee.facnote.com';
export const API_URL_PROD = 'https://cabinet-expertcomptable.com/';

//API End Points
export const REGISTER = `/auth/register`;
export const LOGIN = `/api/login`;
export const GETCABINET = `/api/v1/cabinet`;
export const GETSOCIETY = `/api/v1/society`;
export const GETHISTORY = `/api/v1/bills`;
export const GETENTERPRISE = `/api/v1/reconciliations/enterprise`;
export const GETPURCHASES = `/api/v1/purchases`;

export const GETSALES = `/api/v1/sales`;
export const UPLOAD_FILES = `/api/v1/bill`;
export const SENDCOMMENT = `/api/v1/comments/association`;
export const REPLYCOMMENT = `/api/v1/comments/reply`;
export const GETCOMMENTS = `/api/v1/comments`;
export const GETEXERCICES = `/api/v1/exercises`;

export const GETACCOUNTSBANK = `/api/v1/accounts/bank`;

export const SAVE_INDEMNITY = `/api/v1/note`;
export const text = {
  voirProfile: 'Voir mon profile',
  voirSociete: 'Votre expert comptable',
  nomComplet: 'Prénom Nom',
  HistoriqueJustificatifs: 'Historique des justificatifs',
  RelevesBancaires: 'Banque',
  MesAchats: 'Achat',
  Ventes: 'Ventes',
  filter: 'Filter',
  Reinitialiser: 'Reinitialiser',
  dateDebut: 'Date début',
  dateFin: 'Date fin',
  compte: 'Compte',
  banque: 'Banque',
  searchReleveBanquaire: 'Description, numero de facture, compte ',
  debit: 'Debit',
  credit: 'Credit',
  min: 'Min',
  max: 'Max',
  identifier: 'Vous identifier',
  mentionsLegales: 'mentions légales',
  mentionLegalesUrl:'https://facnote.com/fr/mentions.html',
  CGU: 'CGU',
  cguURL:'https://facnote.com/fr/cgu.html',
  Identifiant: 'Identifiant',
  motDePasse: 'Mot de passe',
  Connexion: 'Connexion',
  ErrorLogin: 'identifiant ou mot de passe incorrect !',
  Felicitation: 'Felicitation',
  indemnitySuccess: 'Les données ont été enregistrées avec succès',
  telechargementError: 'telechargement fichier interrompu',
  Echec: 'Échec',
  IndemnitiesTitle: 'Indemnités Kilométriques',
  Date: 'Date',
  PuissanceAdministrative: 'Puissance Administrative',
  Champobligatoire: 'Champ obligatoire',
  DistanceParcourue: 'Distance parcourue(KM)',
  LieuDepart: 'Lieu de départ',
  LieuArrive: "Lieu d'arrivée",
  ClientMotif: 'Client ou motif',
  Valider: 'Valider',
  Annuler: 'Annuler',
  Appeler: 'Appeler',
  EnvoyerEmail: ' Envoyer un email',
  Deconnecter: 'Deconnecter',
  FactureSucces: 'Vos factures ont bien été transmises',
  Envoyer: 'Envoyer',
  EnregistrerIdentifiant: 'Enregistrer mes identifiants',
  Type: 'Type',
  Source: 'Source',
  BillNumber: 'Facture',
  Libelle: 'Libelle',
  Compte: 'Compte',
  TousComptes: 'Tous les comptes',
  periode: 'Période',
  Accueil: 'Accueil',
  DeposerFacture: 'Déposer facture',
  Cabinet: 'Cabinet',
  Plus: 'Plus',
  MontantTTC: 'TTC',
  SoldeAu: 'Solde au',
  transactionJustifier: 'transaction(s) à justifier',
  transactionNonJustifier: 'transaction(s) non justifier',
};

export const routes = {
  Indemnities: 'Indemnities',
  HistoryOfPayementReceipts: 'HistoryOfPayementReceipts',
  BankStatement: 'BankStatement',
  MyPurchases: 'MyPurchases',
  Sales: 'Sales',
  Invoices: 'Invoices',
  Home: 'Home',
  Cabinet: 'Cabinet',
  More: 'More',
  Login: 'Login',
};

export const permissions = {
  banque: 'rapprochement_index',
  banque_entreprise: 'rapprochement_entreprise',
  sales: 'facturation_achats_homepage',
  purchases: 'facturation_ventes_homepage',
  expenseReport: 'crm_note_frais_note_frais',
};
