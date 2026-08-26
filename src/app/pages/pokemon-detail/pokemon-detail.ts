import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { PokemonService } from '../../services/pokemon-service';
import { Pokemon } from '../../entity/pokemon.entity';
import { traduireNom, traduireStat, traduireType } from '../../entity/pokemon-traductions';

@Component({
  imports: [],
  selector: 'app-pokemon-detail',
  styleUrl: './pokemon-detail.css',
  templateUrl: './pokemon-detail.html',
})
export class PokemonDetail {
  private pokemonService = inject(PokemonService);

  id = input.required<string>();

  pokemon = signal<Pokemon | null>(null);
  chargement = signal(true);
  erreur = signal<string | null>(null);

  nom = computed(() => {
    const p = this.pokemon();
    return p ? traduireNom(p.id, p.name) : '';
  });

  protected readonly traduireType = traduireType;
  protected readonly traduireStat = traduireStat;
  protected readonly min = Math.min;

  constructor() {
    effect(() => {
      const id = this.id();
      this.chargement.set(true);
      this.erreur.set(null);

      this.pokemonService.getDetail(id).subscribe({
        next: (pokemon) => {
          this.pokemon.set(pokemon);
          this.chargement.set(false);
        },
        error: () => {
          this.erreur.set('Ce Pokémon est introuvable.');
          this.chargement.set(false);
        },
      });
    });
  }
}
