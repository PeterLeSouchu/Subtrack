'use client';

import { Accordion, AccordionItem } from '@nextui-org/react';

export default function AccordionComponent() {
  return (
    <Accordion variant='splitted'>
      <AccordionItem
        key='1'
        aria-label="Qu'est-ce que SubTrack ?"
        title="Qu'est-ce que SubTrack ?"
        className=' max-w-7xl font-bold'
      >
        <p className='font-normal'>
          SubTrack est une application web qui vous permet de gérer vos
          mensualités. L&apos;objectif de l&apos;application est de vous aider
          au quotidien a connaitre et visualiser vos dépenses concernant vos
          mensualités{' '}
        </p>
      </AccordionItem>
      <AccordionItem
        key='2'
        aria-label='Comment fonctionne SubTrack ?'
        title='Comment fonctionne SubTrack ?'
        className=' max-w-7xl font-bold'
      >
        <p className='font-normal'>
          Pour utiliser cette application, vous devrez créer un compte. Une fois
          connecté, vous aurez accès à une interface composée de quatre sections
          principales :
        </p>
        <ul className='font-normal flex flex-col gap-2 mt-4'>
          <li>
            <em> - Dashboard</em> : Cette page vous permet de suivre vos
            dépenses mensuelles le mois en cours.
          </li>
          <li>
            <em> - Historique</em> : Consultez cette section pour visualiser
            l&apos;évolution de vos dépenses au fil des mois et des années.
          </li>
          <li>
            <em> - Bilan</em> : Représentée sous forme de graphique, cette page
            vous offre un aperçu clair de vos dépenses tout au long de
            l&apos;année avec possibilité de sélectionner des catégories de
            mensualité.
          </li>
          <li>
            <em> - Profil</em> : Cette section vous offre la possibilité de
            personnaliser votre profil et de fixer des plafonds budgétaires pour
            diverses catégories.
          </li>
        </ul>
      </AccordionItem>
      <AccordionItem
        key='3'
        aria-label='SubTrack est-il gratuit ? '
        title='SubTrack est-il gratuit ? '
        className='max-w-7xl font-bold'
      >
        <p className='font-normal'>
          {' '}
          Oui bien sûr, l&apos;application SubTrack est entièrement gratuite.
        </p>
      </AccordionItem>
      <AccordionItem
        key='4'
        aria-label='Quels types de dépenses puis-je suivre ?'
        title='Quels types de dépenses puis-je suivre ?'
        className='max-w-7xl font-bold'
      >
        <p className='font-normal'>
          Sur SubTrack, vous pouvez suivre vos mensualités, ou tout autre
          dépense qui se renouvelle chaque mois. L&apos;application a été conçue
          pour faciliter le suivi de vos mensualités, de sorte à ce que vous
          n&apos;ayez pas à réécrire chaque mois vos mensualités,
          l&apos;application renouvelle cela tous les mois.
        </p>
      </AccordionItem>
      <AccordionItem
        key='5'
        aria-label='Est-ce que SubTrack est disponible sur mobile ?'
        title='Est-ce que SubTrack est disponible sur mobile ?'
        className='max-w-7xl font-bold'
      >
        <p className='font-normal'>
          L&apos;application est effectivement responsive, donc utilisable sur
          tout type d&apos;appareil, allant du mobile, en passant par la
          tablette jusqu&apos;à l&apos;ordinateur.
        </p>
      </AccordionItem>
      <AccordionItem
        key='7'
        aria-label='Y a t-il une application mobile ?'
        title='Y a t-il une application mobile ?'
        className='max-w-7xl font-bold'
      >
        <p className='font-normal'>
          Actuellement, aucune application mobile n&apos;existe, cependant, nous
          travaillons dessus afin de rendre SubTrack plus optimisé pour les
          mobiles.
        </p>
      </AccordionItem>
      <AccordionItem
        key='6'
        aria-label='Est-ce sécurisé ?'
        title='Est-ce sécurisé ?'
        className='max-w-7xl font-bold'
      >
        <p className='font-normal'>
          L&apos;application est entièrement sécurisé, vos mots de passe sont
          chiffrés ainsi vous êtes le seul à pouvoir visualiser vos dépenses. De
          plus aucune somme d&apos;argent ne transite sur notre application,
          l&apos;objectif est de vous aider à visualiser et gérer vos
          mensualités.
        </p>
      </AccordionItem>
    </Accordion>
  );
}
