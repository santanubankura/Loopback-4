import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Todo, TodoRelations, TodeList} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {TodeListRepository} from './tode-list.repository';

export class TodoRepository extends DefaultCrudRepository<
  Todo,
  typeof Todo.prototype.id,
  TodoRelations
> {

  public readonly todeList: BelongsToAccessor<TodeList, typeof Todo.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('TodeListRepository') protected todeListRepositoryGetter: Getter<TodeListRepository>,
  ) {
    super(Todo, dataSource);
    this.todeList = this.createBelongsToAccessorFor('todeList', todeListRepositoryGetter,);
    this.registerInclusionResolver('todeList', this.todeList.inclusionResolver);
  }
}
