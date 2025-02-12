import { Link } from 'react-router-dom';
import css from './NotFoundPage.module.scss';

export default function NotFoundPage() {
    return (
        <div>
            <h2>Not Found</h2>
            <Link to="/" className={css.toHomeLink}>
                To Home
            </Link>
        </div>
    );
}
