import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import RTRouter from './routes'

const Root = ({ store, history }) => (
    <Provider store={store}>
        <RTRouter history={history} store={store} />
    </Provider>
)

Root.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
}

export default Root
