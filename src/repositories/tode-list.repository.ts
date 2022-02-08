import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {TodeList, TodeListRelations, Todo} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {TodoRepository} from './todo.repository';

export class TodeListRepository extends DefaultCrudRepository<
  TodeList,
  typeof TodeList.prototype.id,
  TodeListRelations
> {

  public readonly todos: HasManyRepositoryFactory<Todo, typeof TodeList.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('TodoRepository') protected todoRepositoryGetter: Getter<TodoRepository>,
  ) {
    super(TodeList, dataSource);
    this.todos = this.createHasManyRepositoryFactoryFor('todos', todoRepositoryGetter,);
    this.registerInclusionResolver('todos', this.todos.inclusionResolver);
  }
}
