import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckOutPage from './pages/checkout/checkout.component';
import Header from './components/header/header.component';
import {
	auth,
	createUserProfileRequest,
} from './firebase-projects/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selector';

import './App.css';

class App extends Component {
	componentDidMount() {
		// this.unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
		// 	this.setState({ currentUser: user });
		// 	console.log(user);
		// });
		const { setCurrentUser } = this.props;
		this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
			if (userAuth) {
				const userRef = await createUserProfileRequest(userAuth);

				userRef.onSnapshot((snapshot) => {
					setCurrentUser({
						id: snapshot.id,
						...snapshot.data(),
					});
				});
			}
			setCurrentUser(userAuth);
		});
	}

	componentWillUnmount() {
		this.unsubscribeFromAuth();
	}

	render() {
		return (
			<div>
				<Header />
				<Switch>
					<Route exact path='/' component={HomePage} />
					<Route path='/shop' component={ShopPage} />
					<Route
						exact
						path='/signin'
						render={() =>
							this.props.currentUser ? <Redirect to='/' /> : <SignInAndSignUp />
						}
					/>
					<Route exact path='/checkout' component={CheckOutPage} />
				</Switch>
			</div>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
	setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
