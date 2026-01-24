// tests/home-to-login.spec.ts
import { test, expect, } from "@playwright/test";

test.setTimeout(180000);

test("Navigation de la page d’accueil vers la page de login", async ({
  page,
}) => {
  const date = Date.now();
  console.log("➡️ Navigation vers la page d’accueil");
  await page.goto("http://localhost:3000");
  console.log("✅ Page d’accueil chargée");

  console.log("➡️ Vérification du titre principal");
  await page.getByRole('heading', { name: 'Gardez une longueur d’avance' }).click();
  console.log("✅ Titre affiché");

  console.log('➡️ Recherche du bouton (Link) "Inscription"');
  await page.getByRole('link', { name: 'Inscription' }).click();
  console.log('✅ Bouton "Se connecter" trouvé et cliqué');


  await expect(page).toHaveURL(/\/sign-up$/);

  console.log('➡️ Click sur le champ email');
  await page.getByRole('textbox', { name: 'Email' }).click();
  console.log(' ✅ Click sur le champ email');
  console.log('➡️ Remplissage du champ email');
  console.log('➡️ Click sur le champ email');
  await page.getByRole('textbox', { name: 'Email' }).click();
  console.log(' ✅ Click sur le champ email');
  
  console.log('➡️ Remplissage du champ email');
  await page.getByRole('textbox', { name: 'Email' }).fill(`user${date}@gmail.com`);
  console.log(' ✅ Champ email rempli');
  
  console.log('➡️ Click sur le champ mot de passe');
  await page.getByRole('textbox', { name: 'Entrez votre mot de passe' }).click();
  console.log(' ✅ Click sur le champ mot de passe');
  
  console.log('➡️ Remplissage du champ mot de passe');
  await page.getByRole('textbox', { name: 'Entrez votre mot de passe' }).fill('Password1.');
  console.log(' ✅ Champ mot de passe rempli');
  
  console.log('➡️ Click sur le champ confirmation mot de passe');
  await page.getByRole('textbox', { name: 'Confirmez votre mot de passe' }).click();
  console.log(' ✅ Click sur le champ confirmation mot de passe');
  
  console.log('➡️ Remplissage du champ confirmation mot de passe');
  await page.getByRole('textbox', { name: 'Confirmez votre mot de passe' }).fill('Password1.');
  console.log(' ✅ Champ confirmation mot de passe rempli');

  console.log('➡️ Click sur le champ confirmation mot de passe');
  await page.getByRole('button', { name: 'S\'inscrire', exact: true }).click();
  console.log(' ✅ Bouton S\'inscrire cliqué');
  

  await expect(page).toHaveURL(/\/sign-in$/);
console.log('✅ Arrivé sur la page sign-in');

console.log('➡️ Click sur le champ email (sign-in)');
await page.getByRole('textbox', { name: 'Email' }).click();
console.log(' ✅ Click sur le champ email (sign-in)');

console.log('➡️ Remplissage du champ email (sign-in)');
await page.getByRole('textbox', { name: 'Email' }).fill(`user${date}@gmail.com`);
console.log(' ✅ Champ email (sign-in) rempli');

console.log('➡️ Click sur le champ mot de passe (sign-in)');
await page.getByRole('textbox', { name: 'Entrez votre mot de passe' }).click();
console.log(' ✅ Click sur le champ mot de passe (sign-in)');

console.log('➡️ Remplissage du champ mot de passe (sign-in)');
await page.getByRole('textbox', { name: 'Entrez votre mot de passe' }).fill('Password1.');
console.log(' ✅ Champ mot de passe (sign-in) rempli');

console.log('➡️ Click sur le bouton Se connecter');
await page.getByRole('button', { name: 'Se connecter', exact: true }).click();
console.log(' ✅ Bouton Se connecter cliqué');

});
