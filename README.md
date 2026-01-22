# 🌟 [Projet Subtrack](https://subtrack-seven.vercel.app/)

**Subtrack est une application web réalisée dans le cadre de mon portfolio. Elle permet de suivre et gérer facilement les paiements mensuels en offrant une vue d'ensemble claire grâce à des graphiques et des statistiques détaillées. L'application inclut également un historique des paiements passés et permet à l'utilisateur de définir des limites budgétaires personnalisées pour mieux contrôler ses dépenses et ajuster son budget en fonction de ses besoins.**

L'application est accessible à l'adresse suivante: https://subtrack-seven.vercel.app/

![Screenshot de l'application](/public/screenshot-subtrack.png)

## ⭐ Fonctionnalitées de l'application :

- Créer un compte utilisateur
- Se connecter
- Ajouter modifier / supprimer une mensualité
- Ajouter / modifier / supprimer une limite budgétaire
- Filtrer une mensualité par nom / catégorie / prix
- Visualiser les mensualités sous forme de graphique (camembert)
- Visualiser les statistiques des mensualités
- Visualiser l'historique de ses mensualités par mois
- Visualiser l'historique de ses mensualités par année (graphique en bar  avec prix / mois)
- Modifier son mot de passe
- Supprimer son compte

## 🛠️ Fonctionnement de l'application :

### ⚙️ 1. Architecture

- Projet réalisé avec Next.js v15 (Fullstack) + TypeScript.
- API REST CRUD
- Utilisation d'ESLint.

### 🔒 2. Sécurité

- Mise en place d'un middleware pour rediriger l'utilisateur en front selon son statut de connexion.
- Utilisation de ZOD avec React Hook Form pour valider les données avant de les envoyer au back.
- Utilisation supplémentaire de ZOD en back pour valider les données.
- Prémunition des attaques XSS avec React.
- Protection des route API avec la session de Auth.js.
- Hashage du mot de passe avec Bcrypt.
- Suppression du compte (google uniquement) par 2FA avec envoi d'un code OTP par mail.

### ❌ 3. Gestion d'erreur

- Utilisation des hook useMutation (POST / PATCH / DELETE) et de useQuery(GET) de TanStack Query lors des requêtes API avec leurs fonctionnalités permettant de gérer le pending, le success et l'erreur provenant du back.
- Pour les erreurs provenant du front, donc des erreurs de validation de schéma de formulaire avec ZOD, on utilise React Hook Form qui, en complément d'un schéma ZOD déclenche automatiquement l'erreur, afin de l'afficher.
- Utilisation du bloc try catch dans l'API pour chaque requête.

### ⏳ 4. Gestion du chargement (requêtes API)

- Mise en place d'un composant Spinner.
- Utilisation de TanStack Query lors des requêtes API pour afficher le Spinner selon le pending.

### 🗄️ 5. Base de données

- Utilisation d'une base de données relationnelle Postgres.
- Utilisation de l'ORM Prisma pour communiquer avec la base de données.


### 📅 6. Historique des mensualités

- Mise en place d'un Cron job  avec Vercel, qui s'effectue une fois tous les 1ers du mois à minuit.
- Mise en place d'une route API qui vient faire 2 actions, la 1ère étant de venir nettoyer les codes OTP qui ne sont plus valides, ces codes sont utilisés lors de la suppression des comptes google par mail, et si l'utilisateur ne va pas au bout de sa démarche, alors le code reste en BDD. Ensuite, cette route vient stocker toutes les mensualités de l'utilisateur dans l'historique, seulement pour les utilisateurs actifs sur l'application, c'est à dire  ceux qui se sont connectés dans les 3 derniers mois.


### 💻 7. Technologies utilisées

- Next.js avec TypeScript
- [Tailwind CSS](https://tailwindcss.com/) pour le style
- [Axios](https://www.npmjs.com/package/axios) pour les requêtes API
- [TanStack Query](https://tanstack.com/query/latest) pour facilité les requêtes API et sa mise en cache
- [React Hook Form](https://www.npmjs.com/package/react-hook-form) pour la gestion des formulaires
- [ZOD](https://www.npmjs.com/package/zod) Pour valider les données de formulaire
- [Shadcn/ui](https://ui.shadcn.com/) Pour des composants modernes et accessibles
- [Prisma](https://www.prisma.io/docs/getting-started/quickstart-sqlite) Pour simplifier la communication avec la BDD
- [Auth.js](https://authjs.dev/) Pour automatiser l'authetification
- [Date-fns](https://date--fns-org.translate.goog/?_x_tr_sl=en&_x_tr_tl=fr&_x_tr_hl=fr&_x_tr_pto=sc) Pour gérer les dates
- [Bcrypt](https://www.npmjs.com/package/bcrypt) Pour hasher les mot de passes
- [Chart.js](https://www.chartjs.org/) Pour la visualisation des données sous forme de graphique
- [Framer motion](https://motion.dev/) Pour améliorer / moderniser l'UI avec des effets
- [Nodemailer](https://www.nodemailer.com/) Pour l'envoi des codes OTP par mail
- [Postgres](https://www.postgresql.org/) Pour la base de données
- [Storybook](https://storybook.js.org/) Pour documenter certains composants

### ⬇️ 8. Points à ajouter ou améliorer

- Factoriser le code pour diminuer le nombre de composants nécessaires.
- Améliorer le style et le rendre plus moderne.
- Améliorer l'accessibilité.
- Ajouter plus de statistiques sur le dashboard et l'historique.
- Ajouter un thème sombre/clair.
- Améliorer l'architecture de l'API (notamment le nom de ces dernières pour une meilleure compréhension).
- Améliorer la partie de configuration avec Auth.js
- Améliorer la gestion du cache pour éviter des fetchs répétitifs.
