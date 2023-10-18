import { IsNotEmpty, IsNumber } from 'class-validator';

export class FindNotificationInput {
  @IsNotEmpty()
  @IsNumber()
  modelId: number;
}