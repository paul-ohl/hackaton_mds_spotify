# Musicalendar 🎵📅

Application web permettant de visualiser vos playlists Spotify sous forme de calendrier musical.

## 🎯 Fonctionnalités

- Importation de playlists Spotify publiques via URL
- Visualisation des musiques dans un calendrier interactif
- Navigation facile à travers vos morceaux préférés

## 📱 Guide d'utilisation

### Comment importer une playlist

1. Ouvrez Spotify et accédez à la playlist publique que vous souhaitez importer
2. Cliquez sur les trois points (...) et sélectionnez "Partager" > "Copier le lien de la playlist"
3. Sur Musicalendar, collez l'URL de la playlist dans le champ prévu à cet effet
4. Cliquez sur "Importer" pour visualiser votre playlist dans le calendrier

### Navigation dans le calendrier

- Utilisez les flèches de navigation pour passer d'un mois à l'autre
- Cliquez sur une date pour voir les morceaux associés
- Profitez de la vue d'ensemble de votre musique organisée chronologiquement

## 👩‍💻 Guide pour les développeurs

### Prérequis

- Docker
- Git

### Installation

1. Clonez le repository :

```bash
git clone https://github.com/paul-ohl/hackaton_mds_spotify.git
cd hackaton_mds_spotify
```

2. Executez le projet avec Docker :

```bash
docker compose up
```

3. L'application sera accessible sur :

```bash
localhost:3000
```

## 📝 License

Ce projet est sous licence GNU General Public License. Voir le fichier `LICENSE` pour plus de détails.
