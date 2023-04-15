import React, {Dispatch, SetStateAction, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/util';
import {SortingType} from '../../const/const';
import {setSorting} from '../../store/action';
import {State} from '../../types/types';

const SORTING_TYPES: SortingType[] = [SortingType.Popular, SortingType.LowToHigh, SortingType.HighToLow, SortingType.TopRates];

const Sorting = (): JSX.Element => {
  const [selectorState, setSelectorState]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
  const {sortingType}: State = useAppSelector((state: State) => state);
  const dispatch = useAppDispatch();

  const handleElementClick = (currentSortingType: SortingType): void => {
    setSelectorState(false);
    dispatch(setSorting(currentSortingType));
  };

  const getFilterElement = (currentSortingType: SortingType, isActive: boolean): JSX.Element => (
    <li key={Math.random() * Number.MAX_VALUE} className={`places__option ${isActive ? 'places__option--active' : ''}`} onClick={() => handleElementClick(currentSortingType)}>{currentSortingType}</li>
  );

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" onClick={(): void => {setSelectorState(true);}}>
        {sortingType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${selectorState ? 'places__options--opened' : ''}`}>
        {SORTING_TYPES.map((iterableSortingType: SortingType) => getFilterElement(iterableSortingType, iterableSortingType === sortingType))}
      </ul>
    </form>
  );
};

export default Sorting;
