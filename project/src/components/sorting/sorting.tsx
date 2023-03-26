import React, {Dispatch, SetStateAction, useState} from 'react';
import {useAppDispatch} from '../../hooks/util';
import {sortOffers} from '../../store/action';
import {SortingTypes} from '../../types/types';

type SortingState = {
  isOpen: boolean;
  sortingType: string;
}

const SORTING_TYPES: SortingTypes[] = [SortingTypes.Popular, SortingTypes.LowToHigh, SortingTypes.HighToLow, SortingTypes.TopRates];

const sortingState: SortingState = {
  isOpen: false,
  sortingType: SortingTypes.Popular
};

const Sorting = (): JSX.Element => {
  const [currentSorting, setCurrentSorting]: [SortingState, Dispatch<SetStateAction<SortingState>>] = useState(sortingState);
  const dispatch = useAppDispatch();

  const getFilterElement = (sortingType: string): JSX.Element => {
    const isActive: boolean = sortingType === currentSorting.sortingType;
    const onClickHandler = (): void => {
      setCurrentSorting({isOpen: !currentSorting.isOpen, sortingType: sortingType});
      dispatch(sortOffers(sortingType));
    };

    return (
      <li key={Math.random() * Number.MAX_VALUE} className={`places__option ${isActive ? 'places__option--active' : ''}`} onClick={onClickHandler}>{sortingType}</li>
    );
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" onClick={() => setCurrentSorting({isOpen: !currentSorting.isOpen, sortingType: currentSorting.sortingType})}>
        {currentSorting.sortingType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${currentSorting.isOpen ? 'places__options--opened' : ''}`}>
        {SORTING_TYPES.map((sortingType: string) => getFilterElement(sortingType))}
      </ul>
    </form>
  );
};

export default Sorting;
