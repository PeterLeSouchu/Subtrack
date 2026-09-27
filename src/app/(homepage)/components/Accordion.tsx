"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";

export default function AccordionHomePage() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>
          Qu&apos;est-ce que SubTrack ?
        </AccordionTrigger>
        <AccordionContent>
          SubTrack est une application web qui vous permet de gérer vos
          mensualités. L&apos;objectif de l&apos;application est de vous aider
          au quotidien a connaitre et visualiser vos dépenses concernant vos
          mensualités{" "}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>
          Comment fonctionne SubTrack ?
        </AccordionTrigger>
        <AccordionContent>
          Pour utiliser cette application, vous devrez créer un compte. Une fois
          connecté, vous aurez accès à une interface composée de quatre sections
          principales : le tableau de bord, l&apos;historique, le bilan et
          votre profil.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>
          SubTrack est-il gratuit ?
        </AccordionTrigger>
        <AccordionContent>
          Oui bien sûr, l&apos;application SubTrack est entièrement gratuite.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>
          Quels types de dépenses puis-je suivre ?
        </AccordionTrigger>
        <AccordionContent>
          Sur SubTrack, vous pouvez suivre vos mensualités, ou tout autre
          dépense qui se renouvelle chaque mois. L&apos;application a été conçue
          pour faciliter le suivi de vos mensualités, de sorte à ce que vous
          n&apos;ayez pas à réécrire chaque mois vos mensualités,
          l&apos;application renouvelle cela tous les mois.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-5">
        <AccordionTrigger>
          Est-ce que SubTrack est disponible sur mobile ?
        </AccordionTrigger>
        <AccordionContent>
          L&apos;application est effectivement responsive, donc utilisable sur
          tout type d&apos;appareil, allant du mobile, en passant par la
          tablette jusqu&apos;à l&apos;ordinateur.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-6">
        <AccordionTrigger>
          Y a t-il une application mobile ?
        </AccordionTrigger>
        <AccordionContent>
          Actuellement, aucune application mobile n&apos;existe, cependant, nous
          travaillons dessus afin de rendre SubTrack plus optimisé pour les
          mobiles.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-7">
        <AccordionTrigger>
          Est-ce sécurisé ?
        </AccordionTrigger>
        <AccordionContent>
          L&apos;application est entièrement sécurisé, vos mots de passe sont
          chiffrés ainsi vous êtes le seul à pouvoir visualiser vos dépenses. De
          plus aucune somme d&apos;argent ne transite sur notre application,
          l&apos;objectif est de vous aider à visualiser et gérer vos
          mensualités.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
