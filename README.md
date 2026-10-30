# Bretagne RP — site officiel

Site multi-pages statique, conçu pour être hébergé sur **GitHub Pages**.

## Pages
- `index.html` : accueil, présentation, statistiques et objectif membres
- `serveur.html` : présentation du serveur
- `partenaires.html` : annuaire des partenaires
- `actualites.html` : annonces
- `admin/index.html` : outil local de préparation et d'export des données

## Mise en ligne sur GitHub Pages
1. Crée un dépôt GitHub (par exemple `bretagne-rp`).
2. Envoie **tout le contenu** de ce dossier à la racine du dépôt.
3. Dans GitHub : **Settings → Pages**.
4. Choisis **Deploy from a branch**, branche `main`, dossier `/ (root)`, puis **Save**.
5. Attends la publication. L'adresse sera généralement `https://TON-PSEUDO.github.io/bretagne-rp/`.

## Configuration
Ouvre `data/config.json` et remplace :
- `discord` par ton vrai lien d'invitation
- `description` et `longDescription`
- `logo` et `banner` par les chemins ou URL de tes images
- `members` par le nombre actuel (mise à jour manuelle)
- `target` par ton objectif

Les fichiers `data/partners.json` et `data/news.json` contiennent respectivement les partenaires et les actualités. Exemple de partenaire :

```json
[
  {
    "id": "partenaire-1",
    "name": "Nom du serveur",
    "description": "Présentation du serveur partenaire.",
    "logo": "https://exemple.fr/logo.png",
    "banner": "https://exemple.fr/banniere.png",
    "discord": "https://discord.gg/ton-invitation",
    "featured": true
  }
]
```

## Utiliser le panneau admin
Ouvre `/admin/` depuis le site publié ou via un serveur local. Les formulaires chargent les fichiers JSON et permettent de préparer les changements. Clique sur les boutons d'export puis remplace les fichiers correspondants dans le dépôt GitHub. Après commit/push, GitHub Pages publiera les changements.

**Limite importante :** GitHub Pages ne fournit ni base de données ni serveur. L'admin inclus n'est PAS une authentification sécurisée et ses changements restent dans la mémoire de la page jusqu'à l'export. N'y saisis aucun secret, mot de passe ou token. Toute personne connaissant l'adresse `/admin/` peut ouvrir cet outil. Pour une administration privée avec publication automatique, il faudra ajouter un backend et une authentification (par exemple Supabase + une fonction serveur, ou un CMS Git sécurisé).

## Aperçu Discord (Open Graph)
Les pages incluent des métadonnées Open Graph avec une image SVG d'aperçu. Pour un aperçu fiable, configure une URL publique absolue dans `og:image` une fois le site publié. Discord peut conserver un aperçu en cache après modification.
