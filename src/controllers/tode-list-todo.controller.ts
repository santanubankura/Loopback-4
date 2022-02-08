import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  TodeList,
  Todo,
} from '../models';
import {TodeListRepository} from '../repositories';

export class TodeListTodoController {
  constructor(
    @repository(TodeListRepository) protected todeListRepository: TodeListRepository,
  ) { }

  @get('/tode-lists/{id}/todos', {
    responses: {
      '200': {
        description: 'Array of Todo\'s belonging to TodeList',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Todo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Todo>,
  ): Promise<Todo[]> {
    return this.todeListRepository.todos(id).find(filter);
  }

  @post('/tode-lists/{id}/todos', {
    responses: {
      '200': {
        description: 'TodeList model instance',
        content: {'application/json': {schema: getModelSchemaRef(Todo)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof TodeList.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Todo, {
            title: 'NewTodoInTodeList',
            exclude: ['id'],
            optional: ['todeListId']
          }),
        },
      },
    }) todo: Omit<Todo, 'id'>,
  ): Promise<Todo> {
    return this.todeListRepository.todos(id).create(todo);
  }

  @patch('/tode-lists/{id}/todos', {
    responses: {
      '200': {
        description: 'TodeList.Todo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Todo, {partial: true}),
        },
      },
    })
    todo: Partial<Todo>,
    @param.query.object('where', getWhereSchemaFor(Todo)) where?: Where<Todo>,
  ): Promise<Count> {
    return this.todeListRepository.todos(id).patch(todo, where);
  }

  @del('/tode-lists/{id}/todos', {
    responses: {
      '200': {
        description: 'TodeList.Todo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Todo)) where?: Where<Todo>,
  ): Promise<Count> {
    return this.todeListRepository.todos(id).delete(where);
  }
}
