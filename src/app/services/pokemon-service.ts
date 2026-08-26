import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Pokemon, PokemonApiListResponse, PokemonCarte } from '../entity/pokemon.entity';
import { traduireNom } from '../entity/pokemon-traductions';

@Service()
export class PokemonService {
  private http = inject(HttpClient);
  private readonly baseUrl = 'https://pokeapi.co/api/v2/pokemon';

  getListe(limit = 200): Observable<PokemonCarte[]> {
    return this.http
      .get<PokemonApiListResponse>(`${this.baseUrl}?limit=${limit}`)
      .pipe(map((reponse) => reponse.results.map((item) => this.versCarte(item.name, item.url))));
  }

  getDetail(idOuNom: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.baseUrl}/${idOuNom}`);
  }

  private versCarte(nom: string, url: string): PokemonCarte {
    const segments = url.split('/').filter(Boolean);
    const id = Number(segments[segments.length - 1]);
    return {
      id,
      nom: traduireNom(id, nom),
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
    };
  }
}
