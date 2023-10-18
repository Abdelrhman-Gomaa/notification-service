import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class SendNotificationInput {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  parentId: number;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  thumbnail?: string;

  @IsNotEmpty()
  @IsString()
  NotifyType: string;
  
  @IsNotEmpty()
  @IsString()
  notifyService: string;
}