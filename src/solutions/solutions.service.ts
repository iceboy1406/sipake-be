import { Injectable } from '@nestjs/common';
import { CreateSolutionDto } from './dto/create-solution.dto';
import { UpdateSolutionDto } from './dto/update-solution.dto';

@Injectable()
export class SolutionsService {
  create(createSolutionDto: CreateSolutionDto) {
    return 'This action adds a new solution';
  }

  findAll() {
    return `This action returns all solutions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} solution`;
  }

  update(id: number, updateSolutionDto: UpdateSolutionDto) {
    return `This action updates a #${id} solution`;
  }

  remove(id: number) {
    return `This action removes a #${id} solution`;
  }
}
