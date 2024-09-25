/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { Pokemon } from './entities/pokemon.entity';
import { CreatePuntuationDto } from './dto/create-puntuation.dto';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get(':name')
  async getOne(@Param('name') name: string): Promise<Pokemon> {
    return this.pokemonService.getOne(name);
  }

  @Get()
  async getAll(@Query('offset') offset = 0, @Query('limit') limit = 20): Promise<Pokemon[]> {
    return this.pokemonService.getAll(offset, limit);
  }

  @Patch()
  async createPuntuation(@Body() createPuntuationDto: CreatePuntuationDto) {
    return await this.pokemonService.createPuntuation(createPuntuationDto);
  }
  
}
