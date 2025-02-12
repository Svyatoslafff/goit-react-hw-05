import { Link } from 'react-router-dom';
import css from './ErrorMessage.module.scss';

export default function ErrorMessage({ error }) {
    return (
        <div className={css.errorMessageContainer}>
            <h2>{error}</h2>
            <p>Please try again later!</p>
            <ul>
                <li>
                    <Link to={'/'} className={css.onErrorLink}>
                        To Home
                    </Link>
                </li>
                <li>
                    <button
                        type="button"
                        onClick={() => window.location.reload()}
                        className={css.onErrorLink}
                    >
                        Reload Page
                    </button>
                </li>
            </ul>
        </div>
    );
}
