import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Todo,
  TodeList,
} from '../models';
import {TodoRepository} from '../repositories';

export class TodoTodeListController {
  constructor(
    @repository(TodoRepository)
    public todoRepository: TodoRepository,
  ) { }

  @get('/todos/{id}/tode-list', {
    responses: {
      '200': {
        description: 'TodeList belonging to Todo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TodeList)},
          },
        },
      },
    },
  })
  async getTodeList(
    @param.path.number('id') id: typeof Todo.prototype.id,
  ): Promise<TodeList> {
    return this.todoRepository.todeList(id);
  }
}
