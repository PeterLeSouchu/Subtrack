export default function LegalNotices() {
  return (
    <div className='pt-36   px-5 pb-20 '>
      <h1 className='sm:text-4xl text-3xl font-bold text-center mb-20 '>
        Mentions légales
      </h1>
      <div className='flex flex-col items-start md:gap-10 gap-7  max-w-2xl w-full mx-auto '>
        <p className='backdrop-blur-sm '>
          <span className='font-semibold'>Éditeur de l’application :</span>{' '}
          Équipe SubTrack
        </p>
        <p className='backdrop-blur-sm '>
          <span className='font-semibold'>Contact : </span>subtrack33@gmail.com
        </p>
        <p className='backdrop-blur-sm '>
          <span className='font-semibold'>Hébergement :</span> Vercel
        </p>

        <div>
          <span className='font-semibold'>Description de l’application :</span>
          <p className=' backdrop-blur-sm '>
            Subtrack est présenté comme un prototype expérimental, conçu pour
            par un développeur dans le but d&apos; enrichir son portfolio. Cette
            plateforme permet La gestion des mensualités au cours des mois /
            années , mais n’est pas destinée à être utilisée comme une véritable
            application. Elle est mise à disposition gratuitement, à titre de
            démonstration.
          </p>
        </div>

        <div>
          <span className='font-semibold'>Responsabilité :</span>
          <p className=' backdrop-blur-sm '>
            L’éditeur de l’application ne saurait être tenu responsable des
            erreurs, interruptions de service ou pertes de données pouvant
            survenir lors de l’utilisation de Subtrack, en raison de son
            caractère expérimental. L&apos;utilisation de l&apos;application se
            fait sous la seule responsabilité de l&apos;utilisateur.
          </p>
        </div>
      </div>
    </div>
  );
}
