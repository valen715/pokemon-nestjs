/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Query } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { Pokemons } from './entities/pokemon.entity';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get(':name')
  async getOne(@Param('name') name: string): Promise<Pokemons> {
    return this.pokemonService.getOne(name);
  }

  @Get()
  async getAll(@Query('offset') offset = 0, @Query('limit') limit = 20): Promise<Pokemons[]> {
    return this.pokemonService.getAll(offset, limit);
  }
}
