export interface UserLdap {
  id: any;
  login: string;
  nom: string;
  prenom: string;
  nomComplet: string;
  motDePasse: string | null;
  mail: string;
  role: string;
  employeNumero: number;
  employeNiveau: number;
  dateEmbauche: string;
  publishedId: number;
  active: boolean;
}
