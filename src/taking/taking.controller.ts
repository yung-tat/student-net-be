import { Controller } from '@nestjs/common';
import { TakingService } from './taking.service';

@Controller('taking')
export class TakingController {
  constructor(private readonly takingService: TakingService) {}
}
