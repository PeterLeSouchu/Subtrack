import LegalPage from '../components/Legal-page';

const sections = [
  {
    id: 'definition',
    title: 'Définition de l’application',
    content: (
      <p>
        SubTrack est une application prototype développée pour démontrer les
        compétences de son auteur en développement web et ainsi enrichir son
        portfolio. Elle est gratuite, à usage expérimental, et destinée
        uniquement à des fins de démonstration.
      </p>
    ),
  },
  {
    id: 'inscription',
    title: 'Inscription et création de compte',
    content: (
      <p>
        Pour accéder aux fonctionnalités de l’application, les utilisateurs
        doivent créer un compte. Les informations fournies doivent être exactes
        et ne pas porter atteinte aux droits de tiers.
      </p>
    ),
  },
  {
    id: 'responsabilite',
    title: 'Limitation de responsabilité',
    content: (
      <p>
        SubTrack étant une application expérimentale, aucune garantie n’est
        donnée quant à sa stabilité, sa sécurité ou sa disponibilité.
        L&apos;application est fortement sécurisée, néanmoins aucune
        application au monde n&apos;est à l&apos;abri d&apos;une faille
        informatique, de ce fait l&apos;auteur de l&apos;application décline
        toute responsabilité en cas de pertes de données, d’indisponibilité ou
        de dommages directs ou indirects liés à l’utilisation de
        l’application.
      </p>
    ),
  },
  {
    id: 'donnees',
    title: 'Protection des données',
    content: (
      <p>
        Les données personnelles collectées sont limitées aux informations
        nécessaires pour la création de comptes. Elles ne sont utilisées
        qu&apos;à cette fin et ne sont ni revendues ni exploitées à des fins
        commerciales.
      </p>
    ),
  },
  {
    id: 'cookies',
    title: 'Cookies',
    content: (
      <p>
        SubTrack utilise des cookies, qui sont obligatoires pour accéder aux
        fonctionnalités réservées aux utilisateurs connectés. Ces cookies sont
        de petits fichiers stockés sur votre appareil lors de votre visite sur
        l&apos;application. Ils permettent de mémoriser vos préférences, de
        vous authentifier et d&apos;analyser l&apos;utilisation de
        l&apos;application. Vous pouvez gérer vos préférences en matière de
        cookies dans les paramètres de votre navigateur, mais sachez que
        désactiver les cookies peut limiter votre accès aux fonctionnalités de
        SubTrack.
      </p>
    ),
  },
  {
    id: 'modification',
    title: 'Modification des CGU',
    content: (
      <p>
        Ces CGU sont susceptibles d’être modifiées sans préavis. Les
        utilisateurs seront informés de tout changement important via
        l’interface de l’application.
      </p>
    ),
  },
];

export default function CGU() {
  return (
    <LegalPage
      title='Conditions générales d’utilisation'
      sections={sections}
      numbered
    />
  );
}
