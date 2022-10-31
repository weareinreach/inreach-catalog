import PropTypes from 'prop-types';
import React from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';

import AccountPage from './AccountPage';
import FavoritesListContainer from './FavoritesListContainer';
import ReviewsListContainer from './ReviewsListContainer';

import ResetPasswordPage from './ResetPasswordPage';
import Suggestion from './Suggestion';
import Static from './Static';

class PageContainer extends React.Component {
	render() {
		const {
			changeLocale,
			country,
			handleLogOut,
			handleMessageNew,
			handleRequestOpen,
			handleUnconfirmSession,
			history,
			match,
			logo,
			locale,
			location,
			session,
			sessionConfirmed,
			user,
			userData,
			t
		} = this.props;
		const favoritesListProps = {
			country: country,
			dialog: this.props.dialog,
			// handleListRemoveFavorite: this.props.handleListRemoveFavorite,
			handleLogOut: this.props.handleLogOut,
			handleMessageNew: this.props.handleMessageNew,
			handleRequestOpen: this.props.handleRequestOpen,
			lists: this.props.lists,
			locale: locale,
			session: this.props.session,
			user: this.props.user,
			userData: this.props.userData,
			t: t
		};
		const reviewsListProps = {
			country: country,
			dialog: this.props.dialog,
			// handleListRemoveFavorite: this.props.handleListRemoveFavorite,
			handleLogOut: this.props.handleLogOut,
			handleMessageNew: this.props.handleMessageNew,
			handleRequestOpen: this.props.handleRequestOpen,
			locale: locale,
			comments: this.props.comments,
			session: this.props.session,
			user: this.props.user,
			t: t
		};

		return (
			<div className="page-container">
				<Switch>
					<Route
						path="/:locale/favorites/:listId"
						render={() => <FavoritesListContainer {...favoritesListProps} />}
					/>
					<Route
						path="/:locale/favorites"
						render={() => <FavoritesListContainer {...favoritesListProps} />}
					/>
					<Route
						path="/:locale/reviews/:listId"
						render={() => <ReviewsListContainer {...reviewsListProps} />}
					/>
					<Route
						path="/:locale/reviews"
						render={() => <ReviewsListContainer {...reviewsListProps} />}
					/>
					<Route
						path="/:locale/account/reset-password"
						render={() => (
							<ResetPasswordPage
								country={country}
								handleMessageNew={handleMessageNew}
								handleLogOut={handleLogOut}
								handleRequestOpen={handleRequestOpen}
								history={history}
								locale={locale}
								match={match}
								location={location}
								session={session}
								t={t}
							/>
						)}
					/>
					<Route
						path="/:locale/account"
						render={() => (
							<AccountPage
								country={country}
								handleMessageNew={handleMessageNew}
								handleLogOut={handleLogOut}
								handleRequestOpen={handleRequestOpen}
								handleUnconfirmSession={handleUnconfirmSession}
								history={history}
								locale={locale}
								session={session}
								sessionConfirmed={sessionConfirmed}
								user={user}
								userData={userData}
								t={t}
							/>
						)}
					/>
					<Route
						path="/:locale/suggestions/new"
						render={(props) => (
							<Suggestion
								country={country}
								handleMessageNew={handleMessageNew}
								handleLogOut={handleLogOut}
								handleRequestOpen={handleRequestOpen}
								history={history}
								locale={locale}
								session={session}
								user={user}
								userData={userData}
								t={t}
								{...props}
							/>
						)}
					/>
					<Route
						path="/:locale/page/:pageName"
						render={(props) => (
							<Static
								changeLocale={changeLocale}
								handleMessageNew={handleMessageNew}
								handleLogOut={handleLogOut}
								handleRequestOpen={handleRequestOpen}
								history={history}
								session={session}
								user={user}
								userData={userData}
								logo={logo}
								{...props}
							/>
						)}
					/>
					<Route
						render={(props) => (
							<Redirect
								to={
									window.location.pathname.indexOf(
										localStorage.getItem('locale') || 'en_US'
									) < 0
										? '/' +
										  (localStorage.getItem('locale') || 'en_US') +
										  window.location.pathname
										: '/'
								}
							/>
						)}
					/>
				</Switch>
			</div>
		);
	}
}

PageContainer.propTypes = {
	handleUnconfirmSession: PropTypes.func.isRequired,
	sessionConfirmed: PropTypes.bool.isRequired
};

export default PageContainer;
