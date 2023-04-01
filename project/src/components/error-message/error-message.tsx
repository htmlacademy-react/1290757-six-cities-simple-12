import {useAppSelector} from '../../hooks/util';
import './error-message.css';
import {State} from '../../store/reducer';

function ErrorMessage(): JSX.Element | null {
  const {error}: State = useAppSelector((state: State) => state);

  return (error)
    ? <div className='error-message'>{error}</div>
    : null;
}

export default ErrorMessage;
