import React, { Component } from 'react';

import Modal from '../../Components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
	return class extends Component {
		state = { error: null };
		reqInterceptor = axios.interceptors.request.use((req) => {
			this.setState({ error: null });
			return req;
		});
		resInterceptor = axios.interceptors.response.use(
			(res) => res,
			(error) => this.setState({ error })
		);

		UNSAFE_componentWillUnmount () {
			axios.interceptors.request.eject(this.reqInterceptor);
			axios.interceptors.response.eject(this.resInterceptor);
		}

		errorConfirmedHandler = () => {
			this.setState({ error: null });
		};

		render () {
			return (
				<div>
					<Modal
						show={this.state.error}
						modalClosed={this.errorConfirmedHandler}
					>
						{this.state.error ? this.state.error.message : null}
					</Modal>
					<WrappedComponent {...this.props} />
				</div>
			);
		}
	};
};

export default withErrorHandler;
