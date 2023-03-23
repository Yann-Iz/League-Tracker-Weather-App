# League Tracker Weather App

![lol](https://user-images.githubusercontent.com/83369372/227187561-bdfd98e0-773f-4be1-a975-c0af302fb66a.png)

![React Version](https://img.shields.io/badge/React-v18.2.0-61DAFB?logo=react&logoColor=white)
![Expo Version](https://img.shields.io/badge/Expo-v48.0.6-000020?logo=expo&logoColor=white)
![Node.js Version](https://img.shields.io/badge/Node.js-v19.4.0-339933?logo=node.js&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)

Bienvenue sur le repository de **League Tracker Weather App**, une application mobile React Native créée pour un projet d'école. Elle vous permet de suivre les statistiques de joueurs, de voir la rotation des champions League of Legends ainsi que la possibilité de consulter la météo .

## Table des matières

- [Fonctionnalités](#fonctionnalités)
- [Installation](#installation)
- [Utilisation](#utilisation)
- [Technologies utilisées](#technologies-utilisées)
- [Contribution](#contribution)
- [Licence](#licence)

## Fonctionnalités

**League Tracker Weather App** propose les fonctionnalités suivantes :

1. **Statistiques de League of Legends** : Obtenez des informations détaillées sur votre profil de joueur, y compris votre nom d'invocateur, votre niveau, votre rang, vos victoires et bien plus encore.
2. **Météo** : Consultez la météo actuelle pour votre localisation.

## Installation

Pour installer et exécuter l'application, suivez les étapes ci-dessous :

1. Clonez ce dépôt sur votre machine locale :

   ```bash
   git clone https://github.com/Yann-Iz/League-Tracker-Weather-App.git
   cd League-Tracker-Weather-App
   
2. Installez les dépendances du projet :

   ```bash
   npm install
   
3. Exécutez l'application sur votre émulateur ou appareil mobile :

   ```bash
   npx react-native run-android # Pour Android
   npx react-native run-ios     # Pour iOS
   
## Utilisation 

1. Ouvrez l'application sur votre appareil.
2. Inscrivez-vous et connectez vous grâce à la page de Login gérée via Firebase.
3. Accédez à l'onglet "Home" pour consulter les statistiques de votre profil.
4. Accédez à l'onglet "Rotation" pour consulter la rotation de champion de la semaine.

(La version du logiciel affichant la météo se trouve dans la branche **weather**)

⚠️ Les clés d'API fournies dans le code sont expirées et servent uniquement d'exemple. Veillez à bien les remplacer par vos propres clés d'API. ⚠️

## Technologies utilisées

- React Native : Framework pour le développement d'applications mobiles multiplateformes.
- Expo : Plateforme et outils pour faciliter le développement avec React Native.
- Axios : Bibliothèque pour les requêtes HTTP.
- React Navigation : Navigation entre les différents écrans de l'application.
- API Riot Games : Fournit les informations sur les joueurs et les statistiques de League of Legends.
- API OpenWeatherMap : Fournit les informations météorologiques.

## Contribution

Toute contribution à ce projet est la bienvenue. N'hésitez pas à soumettre une issue ou une pull request pour signaler un problème ou proposer une amélioration.

## Licence

Ce projet est sous licence MIT. Vous êtes libre de le modifier, de le distribuer et de l'utiliser à des fins personnelles ou commerciales, en accord avec les termes de la licence.
