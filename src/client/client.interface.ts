export interface Client{
  name: String;
  siret: String;
  raisonSocial: String;
  address: {
    numero: String,
    nomRue: String,
    departement: String,
    ville: String,
  };
  contrat: {
    debut: String,
    fin: String,
  };
  siege: {
    email: String,
    telephone: String,
  };
  gerant: {
    name: String,
    email: String;
    telephone: String,
  };
  coupon:{
    total: Number,
    imprimer: Number,
    restant: Number,
  };
}
