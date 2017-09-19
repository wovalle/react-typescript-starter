import * as React from 'react';
import * as classNames from 'classnames';
import { SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED, FILTER_TYPES } from '../../constants/filters';
import './style.scss';

export const FILTER_TITLES = {
  [SHOW_ALL]: 'All',
  [SHOW_ACTIVE]: 'Active',
  [SHOW_COMPLETED]: 'Completed',
};

export namespace Footer {
  export interface Props {
    filter: TodoFilterType;
    activeCount: number;
    completedCount: number;
    onShow: (filter: TodoFilterType) => any;
    onClearCompleted: () => any;
  }

  export interface State {
    /* empty */
  }
}

export class Footer extends React.Component<Footer.Props, Footer.State> {
  renderTodoCount() {
    const { activeCount } = this.props;
    const itemWord = activeCount === 1 ? 'item' : 'items';

    return (
      <span className={'count'}>
        <strong>{activeCount || 'No'}</strong> {itemWord} left
      </span>
    );
  }

  renderFilterLink(filter: TodoFilterType) {
    const { filter: selectedFilter, onShow } = this.props;

    const handleOnShow = (filter: TodoFilterType) => onShow(filter);

    return (
      <a
        className={classNames({ selected: filter === selectedFilter })}
        style={{ cursor: 'pointer' }}
        onClick={handleOnShow(filter)}
      >
        {FILTER_TITLES[filter]}
      </a>
    );
  }

  renderClearButton() {
    const { completedCount, onClearCompleted } = this.props;
    if (completedCount > 0) {
      return (
        <button className="clear-completed" onClick={onClearCompleted} >
          Clear completed
        </button>
      );
    }
  }

  render() {
    const filterTypes = FILTER_TYPES.map(filter => (
      <li key={filter}>
        {this.renderFilterLink(filter)}
      </li>
    ));

    return (
      <footer className="footer">
        {this.renderTodoCount()}
        <ul className="filters">
          {filterTypes}
        </ul>
        {this.renderClearButton()}
      </footer>
    );
  }
}
