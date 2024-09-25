/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { Pokemon } from './entities/pokemon.entity';
import { CreatePuntuationDto } from './dto/create-puntuation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PokemonService {
  constructor(
    @InjectRepository(Pokemon)
    private readonly pokemonRepository: Repository<Pokemon>,
    private readonly httpService: HttpService) { }

  async getOne(name: string): Promise<Pokemon> {
    const response = await lastValueFrom(this.httpService.get(`https://pokeapi.co/api/v2/pokemon/${name}`));
    return response.data;
  }

  async getAll(offset: number, limit: number): Promise<Pokemon[]> {
    const response = await lastValueFrom(this.httpService.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`));
    return response.data.results;
  }

  async createPuntuation(createPuntuationDto: CreatePuntuationDto): Promise<Pokemon> {
    const { id, puntuation } = createPuntuationDto;

    const pokemon = await this.pokemonRepository.findOne({ where: { id } });

    if (!pokemon) {
      throw new NotFoundException(`Pokemon with ID ${id} not found`);
    }

    pokemon.puntuation = puntuation;
    return this.pokemonRepository.save(pokemon); 
  }
}
