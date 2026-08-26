# Pokedex

**Auteur :** [Prénom NOM à compléter]

## Description

Application Angular consommant l'API publique [PokeAPI](https://pokeapi.co/) pour afficher les 200
premiers Pokémon sous forme de cartes, avec une recherche par nom en direct. Un clic sur une carte
ouvre une page de détail (bonus) avec les types et les statistiques de base du Pokémon.

## Installation et lancement

```bash
npm install
ng serve
```

L'application est ensuite disponible sur `http://localhost:4200`.

## Choix techniques

- **Architecture** : séparation stricte entre `entity/` (typage TypeScript des réponses de l'API),
  `services/` (`PokemonService`, seul point d'appel à `HttpClient`) et `components/` / `pages/`
  (affichage uniquement, aucun appel HTTP direct dans un composant).
- **Liste sans appel supplémentaire par carte** : `GET /pokemon?limit=200` ne renvoie qu'un nom et une
  URL par Pokémon. L'identifiant de chaque Pokémon est extrait du dernier segment de l'URL, ce qui
  permet de construire l'image directement (`raw.githubusercontent.com/PokeAPI/sprites/.../{id}.png`)
  sans requête détail supplémentaire.
- **Recherche en direct** : l'évènement `(input)` du champ de recherche met à jour un simple
  `signal<string>`, et un `computed()` recalcule la liste filtrée à chaque changement de ce signal.
- **Noms/types/stats en français** : PokeAPI ne renvoie les données qu'en anglais. Plutôt que de
  multiplier les appels (un par Pokémon vers `pokemon-species` pour récupérer le nom localisé), un
  petit dictionnaire statique (`entity/pokemon-traductions.ts`) fait la correspondance.
- **Mode zoneless** : le projet (généré avec Angular 22) n'utilise pas Zone.js. Toutes les données
  affichées conditionnellement dans le template (`pokemons`, `chargement`, `erreur`, `pokemon`) sont
  donc des `signal()`, mis à jour avec `.set()` après chaque réponse (ou erreur) de `HttpClient`, pour
  que l'affichage se rafraîchisse correctement.
- **Bonus réalisés** : page de détail avec routage (`/pokemon/:id`, paramètre lié automatiquement via
  `withComponentInputBinding()`), indicateur de chargement, et gestion d'erreur réseau (aussi bien
  pour la liste que pour le détail).
- **CSS** : classique, sans librairie ni framework, un fichier `.css` par composant.

## Fonctionnalités principales

- **Recherche par nom** : le champ de recherche filtre la liste des Pokémon en direct, sans rechargement de la page grâce à un `signal()` et un `computed()`.
- **Affichage des cartes** : chaque Pokémon est affiché sous forme de carte avec son image, son nom et son identifiant. L'image est construite à partir de l'identifiant extrait de l'URL de l'API, évitant ainsi des appels supplémentaires pour récupérer les détails.
- **Page de détail** : un clic sur une carte ouvre une page de détail pour le Pokémon sélectionné, affichant ses types et ses statistiques de base. Cette page utilise le routage d'Angular pour naviguer entre les différents Pokémon.
- **Gestion des erreurs** : l'application gère les erreurs réseau et affiche un message approprié en cas de problème lors de la récupération des données de l'API. Cela inclut la gestion des erreurs pour la liste des Pokémon ainsi que pour la page de détail.
- **Indicateur de chargement** : un indicateur visuel est affiché pendant le chargement des données, offrant une meilleure expérience utilisateur en informant que les données sont en cours de récupération.