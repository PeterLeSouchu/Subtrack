export default function CGU() {
  return (
    <div className='pt-36   px-5 pb-20 '>
      <h1 className='sm:text-4xl text-3xl font-bold text-center mb-20 '>
        Conditions gérérales d&apos;utilisation
      </h1>
      <div className='flex flex-col items-start md:gap-10 gap-7  max-w-2xl w-full mx-auto '>
        <div>
          <span className='font-semibold'>
            {' '}
            1 . Définition de l&apos;application :
          </span>
          <p className=' backdrop-blur-sm '>
            SubTrack est une application prototype développée pour démontrer les
            compétences de son auteur en développement web et ainsi enrichir son
            portfolio. Elle est gratuite, à usage expérimental, et destinée
            uniquement à des fins de démonstration.
          </p>
        </div>

        <div>
          <span className='font-semibold'>
            {' '}
            2. Inscription et création de compte :
          </span>
          <p className=' backdrop-blur-sm '>
            Pour accéder aux fonctionnalités de l’application, les utilisateurs
            doivent créer un compte. Les informations fournies doivent être
            exactes et ne pas porter atteinte aux droits de tiers.
          </p>
        </div>

        <div>
          <span className='font-semibold'>
            {' '}
            3. Limitation de responsabilité :
          </span>
          <p className=' backdrop-blur-sm '>
            SubTrack étant une application expérimentale, aucune garantie n’est
            donnée quant à sa stabilité, sa sécurité ou sa disponibilité.
            L&apos;application est fortement sécurisée, néanmoins aucune
            application au monde n&apos;est à l&apos;abri d&apos;une faille
            informatique, de ce fait l&apos;auteur de l&apos;application décline
            toute responsabilité en cas de pertes de données, d’indisponibilité
            ou de dommages directs ou indirects liés à l’utilisation de
            l’application.
          </p>
        </div>

        <div>
          <span className='font-semibold'> 4. Protection des données :</span>
          <p className=' backdrop-blur-sm '>
            Les données personnelles collectées sont limitées aux informations
            nécessaires pour la création de comptes. Elles ne sont utilisées
            qu&apos;à cette fin et ne sont ni revendues ni exploitées à des fins
            commerciales.
          </p>
        </div>

        <div>
          <span className='font-semibold'> 5. Cookies :</span>
          <p className=' backdrop-blur-sm '>
            SubTrack utilise des cookies, qui sont obligatoires pour accéder aux
            fonctionnalités réservées aux utilisateurs connectés. Ces cookies
            sont de petits fichiers stockés sur votre appareil lors de votre
            visite sur l&apos;application. Ils permettent de mémoriser vos
            préférences, de vous authentifier et d&apos;analyser
            l&apos;utilisation de l&apos;application. Vous pouvez gérer vos
            préférences en matière de cookies dans les paramètres de votre
            navigateur, mais sachez que désactiver les cookies peut limiter
            votre accès aux fonctionnalités de SubTrack.
          </p>
        </div>

        <div>
          <span className='font-semibold'> 6. Modification des CGU : </span>
          <p className=' backdrop-blur-sm '>
            Ces CGU sont susceptibles d’être modifiées sans préavis. Les
            utilisateurs seront informés de tout changement important via
            l’interface de l’application.
          </p>
        </div>
      </div>
    </div>
  );
}
