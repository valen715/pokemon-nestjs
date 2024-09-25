/* eslint-disable prettier/prettier */
import { IsInt, IsPositive, Max, Min } from 'class-validator';

export class RatePokemonDto {
  @IsInt()
  id: number;

  @IsInt()
  @IsPositive()
  @Min(1)
  @Max(5)
  rating: number;
}
