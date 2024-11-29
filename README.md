# ProxiTurn - Application de Tirage au Sort Daily

**ProxiTurn** est une webapp simple et efficace qui permet de rendre aléatoire l’ordre de passage des participants à un daily. Conçue pour optimiser les réunions quotidiennes et garantir un passage équitable et aléatoire des membres, cette application est idéale pour les équipes qui cherchent à rendre leurs sessions plus dynamiques et organisées.

## Fonctionnalités

- **Tirage au sort aléatoire** : Chaque jour, l’ordre des participants au daily est généré de manière aléatoire.
- **Interface simple et intuitive** : Interface utilisateur minimaliste pour une expérience fluide.
- **Facilité d’utilisation** : Ajouter, supprimer ou réorganiser les participants en quelques clics.
- **Accès rapide** : Accessible via un navigateur web, sans installation nécessaire.

## Prérequis

Avant d’utiliser **ProxiTurn**, vous aurez besoin de :

- Un navigateur web moderne (Chrome, Firefox, Safari, etc.)
- Une connexion Internet active

## Installation

### 1. Clonez ce repository

Clonez le repository avec la commande suivante :

```git clone https://github.com/AxelDemeyere/ProxiRoll.git```

### 2. Installez les dépendances

Une fois dans le répertoire du projet cloné, installez les dépendances nécessaires pour faire fonctionner l'application. Utilisez la commande suivante dans votre terminal :

``cd proxiturndaily``  
``npm install``

Cela téléchargera et installera toutes les bibliothèques et packages nécessaires. Assurez-vous d'avoir **Node.js** et **npm** installés sur votre machine avant d'exécuter cette commande.

### 3. Démarrez l'application en local

Une fois les dépendances installées, vous pouvez démarrer l'application localement avec la commande suivante :

``npm run``

L'application sera maintenant accessible à l'adresse [http://localhost:5173/](http://localhost:5173/).

### Déploiement

Pour déployer l’application sur un serveur distant, suivez les instructions spécifiques à votre service d'hébergement préféré. Assurez-vous que votre environnement de production est configuré correctement (par exemple, avec Docker si vous utilisez des containers).

## Utilisation

1. **Ajouter des participants** : Entrez le nom du membre et cliquez sur le bouton “Ajouter”.
2. **Lancer le tirage** : Appuyez sur “Tirer au sort” pour générer un ordre de passage aléatoire.
3. **Visualiser l'ordre** : L’ordre des participants sera affiché sur la page.


## Contribuer

Les contributions sont les bienvenues ! Pour participer, suivez ces étapes :

1. Forkez ce repository.
2. Créez une nouvelle branche :
   
   ``git checkout -b feature/nouvelle-fonctionnalite``

3. Commitez vos changements :

   ``git commit -am 'Ajout de nouvelle fonctionnalité'``

4. Poussez sur votre branche :

   ``git push origin feature/nouvelle-fonctionnalite``

5. Ouvrez une Pull Request pour discuter des changements.

## Auteurs

- **Axel Demeyere** - Développeur principal
