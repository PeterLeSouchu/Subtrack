import LegalPage from '../components/Legal-page';

const sections = [
  {
    id: 'editeur',
    title: 'Éditeur de l’application',
    content: <p>Équipe SubTrack</p>,
  },
  {
    id: 'contact',
    title: 'Contact',
    content: <p>subtrack33@gmail.com</p>,
  },
  {
    id: 'hebergement',
    title: 'Hébergement',
    content: <p>Vercel</p>,
  },
  {
    id: 'description',
    title: 'Description de l’application',
    content: (
      <p>
        Subtrack est présenté comme un prototype expérimental, conçu pour par
        un développeur dans le but d&apos; enrichir son portfolio. Cette
        plateforme permet La gestion des mensualités au cours des mois / années
        , mais n’est pas destinée à être utilisée comme une véritable
        application. Elle est mise à disposition gratuitement, à titre de
        démonstration.
      </p>
    ),
  },
  {
    id: 'responsabilite',
    title: 'Responsabilité',
    content: (
      <p>
        L’éditeur de l’application ne saurait être tenu responsable des
        erreurs, interruptions de service ou pertes de données pouvant survenir
        lors de l’utilisation de Subtrack, en raison de son caractère
        expérimental. L&apos;utilisation de l&apos;application se fait sous la
        seule responsabilité de l&apos;utilisateur.
      </p>
    ),
  },
];

export default function LegalNotices() {
  return (
    <LegalPage
      title='Mentions légales'
      sections={sections}
    />
  );
}
