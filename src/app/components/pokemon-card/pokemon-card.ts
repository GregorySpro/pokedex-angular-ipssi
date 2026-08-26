import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PokemonCarte } from '../../entity/pokemon.entity';

@Component({
  imports: [RouterLink],
  selector: 'app-pokemon-card',
  styleUrl: './pokemon-card.css',
  templateUrl: './pokemon-card.html',
})
export class PokemonCard {
  pokemon = input.required<PokemonCarte>();
}
