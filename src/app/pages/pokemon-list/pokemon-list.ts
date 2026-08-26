import { Component, computed, inject, signal } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';
import { PokemonCard } from '../../components/pokemon-card/pokemon-card';
import { PokemonService } from '../../services/pokemon-service';
import { PokemonCarte } from '../../entity/pokemon.entity';

@Component({
  imports: [PokemonCard],
  selector: 'app-pokemon-list',
  styleUrl: './pokemon-list.css',
  templateUrl: './pokemon-list.html',
})
export class PokemonList {
  private pokemonService = inject(PokemonService);

  pokemons = signal<PokemonCarte[]>([]);
  chargement = signal(true);
  erreur = signal<string | null>(null);
  recherche = signal('');

  private texteRecherche$ = new Subject<string>();

  pokemonsFiltres = computed(() => {
    const texte = this.recherche().trim().toLowerCase();
    if (!texte) {
      return this.pokemons();
    }
    return this.pokemons().filter((pokemon) => pokemon.nom.toLowerCase().includes(texte));
  });

  constructor() {
    this.pokemonService.getListe(200).subscribe({
      next: (pokemons) => {
        this.pokemons.set(pokemons);
        this.chargement.set(false);
      },
      error: () => {
        this.erreur.set("Impossible de charger les Pokémon. Vérifiez votre connexion.");
        this.chargement.set(false);
      },
    });

    this.texteRecherche$.pipe(debounceTime(400)).subscribe((texte) => {
      this.recherche.set(texte);
    });
  }

  onRecherche(evenement: Event) {
    const valeur = (evenement.target as HTMLInputElement).value;
    this.texteRecherche$.next(valeur);
  }
}
