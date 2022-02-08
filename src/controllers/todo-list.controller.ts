import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {TodeList} from '../models';
import {TodeListRepository} from '../repositories';

export class TodoListController {
  constructor(
    @repository(TodeListRepository)
    public todeListRepository : TodeListRepository,
  ) {}

  @post('/tode-lists', {
    responses: {
      '200': {
        description: 'TodeList model instance',
        content: {'application/json': {schema: getModelSchemaRef(TodeList)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TodeList, {
            title: 'NewTodeList',
            
          }),
        },
      },
    })
    todeList: TodeList,
  ): Promise<TodeList> {
    return this.todeListRepository.create(todeList);
  }

  @get('/tode-lists/count', {
    responses: {
      '200': {
        description: 'TodeList model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(TodeList)) where?: Where<TodeList>,
  ): Promise<Count> {
    return this.todeListRepository.count(where);
  }

  @get('/tode-lists', {
    responses: {
      '200': {
        description: 'Array of TodeList model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(TodeList, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(TodeList)) filter?: Filter<TodeList>,
  ): Promise<TodeList[]> {
    return this.todeListRepository.find(filter);
  }

  @patch('/tode-lists', {
    responses: {
      '200': {
        description: 'TodeList PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TodeList, {partial: true}),
        },
      },
    })
    todeList: TodeList,
    @param.query.object('where', getWhereSchemaFor(TodeList)) where?: Where<TodeList>,
  ): Promise<Count> {
    return this.todeListRepository.updateAll(todeList, where);
  }

  @get('/tode-lists/{id}', {
    responses: {
      '200': {
        description: 'TodeList model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(TodeList, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.query.object('filter', getFilterSchemaFor(TodeList)) filter?: Filter<TodeList>
  ): Promise<TodeList> {
    return this.todeListRepository.findById(id, filter);
  }

  @patch('/tode-lists/{id}', {
    responses: {
      '204': {
        description: 'TodeList PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TodeList, {partial: true}),
        },
      },
    })
    todeList: TodeList,
  ): Promise<void> {
    await this.todeListRepository.updateById(id, todeList);
  }

  @put('/tode-lists/{id}', {
    responses: {
      '204': {
        description: 'TodeList PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() todeList: TodeList,
  ): Promise<void> {
    await this.todeListRepository.replaceById(id, todeList);
  }

  @del('/tode-lists/{id}', {
    responses: {
      '204': {
        description: 'TodeList DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.todeListRepository.deleteById(id);
  }
}
