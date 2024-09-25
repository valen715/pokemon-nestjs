/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { Pokemons } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {
  constructor(private readonly httpService: HttpService) {}

  async getOne(name: string): Promise<Pokemons> {
    const response = await lastValueFrom(this.httpService.get(`https://pokeapi.co/api/v2/pokemon/${name}`));
    return response.data; 
  }

  async getAll(offset: number, limit: number): Promise<Pokemons[]> {
    const response = await lastValueFrom(this.httpService.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`));
    return response.data.results; 
  }
}
