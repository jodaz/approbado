import * as React from 'react';
import Spinner from './Spinner';

class LazyLoader extends React.PureComponent {
    render() {
        const { children } = this.props;

        return (
        <React.Suspense fallback={<Spinner />}>
            {children}
        </React.Suspense>
        )
    }
}

export default LazyLoader;
