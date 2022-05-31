import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';
import {IntlProvider, FormattedMessage, FormattedNumber} from 'react-intl';

import './App.scss';
import AccountMobile from './components/AccountMobile';
import Announcement from './components/Announcement';
import BottomBanner from './components/BottomBanner';
import AsylumConnectDialog from './components/AsylumConnectDialog';
import Footer from './components/Footer';
import Header from './components/Header';
import ListNewMobile from './components/ListNewMobile';
import Message from './components/Message';
import PasswordMobile from './components/PasswordMobile';
import Language from './components/Language';
import MapPage from './components/MapPage';
import MoreMobile from './components/MoreMobile';
import PageContainer from './components/PageContainer';
import PrivacyMobile from './components/PrivacyMobile';
import PrivacyNotice from './components/PrivacyNotice';
import RedirectWithParams from './components/RedirectWithParams';
import ShareMobile from './components/ShareMobile';
import DeleteListMobile from './components/DeleteListMobile';
import ThankYouMobile from './components/ThankYouMobile';

import withWidth from './components/withWidth';
import LogoImg from './images/logoInReach.png';
import LogoImgMobile from './images/logo3x.png';
import LogoImgCA from './images/logoInReach.png';
import LogoImgMXMobile from './images/logo2x.png';
import LogoImgMX from './images/logoInReach.png';
import {breakpoints} from './theme';
import {fetchUser} from './utils/api';
import {
	resetLocale,
	fetchLocale,
	getLocale,
	setLocale,
	validLocales
} from './utils/locale';
import en_US from './lang/en-US.json';
import en_CA from './lang/en-CA.json';
import es_MX from './lang/es-MX.json';
import en_MX from './lang/en-MX.json';

const styles = (theme) => {
	return {
		container: {
			fontFamily: theme.typography.fontFamily,
			fontSize: theme.typography.fontSize
		},
		[theme.breakpoints.down('xs')]: {
			navPadding: {
				paddingBottom: '76px'
			},
			mobileScroll: {
				maxHeight: '100%',
				overflowY: 'auto'
			}
		}
	};
};

const LanguageMap = {
	en_US: en_US,
	en_CA: en_CA,
	es_MX: es_MX,
	en_MX: en_MX,
	intl: en_US
};

class AppConnectCatalog extends React.Component {
	constructor(props, context) {
		super(props, context);

		const jwt = window.localStorage.getItem('jwt');
		const user = window.localStorage.getItem('user');
		const initialLocale = getLocale();
		const localPieces = initialLocale.split('_');
		const country = localPieces[localPieces.length - 1];

		this.state = {
			content: fetchLocale(getLocale()),
			country,
			dialog: 'none',
			lists: [],
			locale: initialLocale,
			message: null,
			messageOpen: false,
			nearAddress: '',
			session: jwt,
			sessionConfirmed: false,
			user: user,
			userData: {}
		};

		this.changeLocale = this.changeLocale.bind(this);
		this.handleAddressChange = this.handleAddressChange.bind(this);
		this.handleConfirmSession = this.handleConfirmSession.bind(this);
		this.handleFetchUser = this.handleFetchUser.bind(this);
		this.handleListNew = this.handleListNew.bind(this);
		this.handleListRemoveFavorite = this.handleListRemoveFavorite.bind(this);
		this.handleLogIn = this.handleLogIn.bind(this);
		this.handleLogOut = this.handleLogOut.bind(this);
		this.handleMessageClose = this.handleMessageClose.bind(this);
		this.handleMessageNew = this.handleMessageNew.bind(this);
		this.handleRequestClose = this.handleRequestClose.bind(this);
		this.handleRequestOpen = this.handleRequestOpen.bind(this);
		this.handleStorageChange = this.handleStorageChange.bind(this);
		this.handleUnconfirmSession = this.handleUnconfirmSession.bind(this);
		this.translate = this.translate.bind(this);
	}

	componentDidMount() {
		if (this.state?.session) {
			// assume confirmed until proven otherwise
			this.handleConfirmSession();
			this.handleFetchUser(this.state.session);
		}

		window.addEventListener('storage', this.handleStorageChange);
	}

	componentWillUnmount() {
		if (
			this.props?.match?.params?.locale &&
			this.state.locale !== this.props?.match?.params?.locale
		) {
			this.changeLocale(this.props.match.params.locale);
		}

		window.removeEventListener('storage', this.handleStorageChange);
	}

	componentWillReceiveProps(nextProps) {
		if (
			nextProps?.match?.params?.locale &&
			nextProps?.match?.params?.locale !== this.state.locale
		) {
			this.changeLocale(nextProps.match.params.locale);
		}
	}

	changeLocale(newLocale) {
		//localStorage newLocale
		if (validLocales.indexOf(newLocale) < 0) {
			resetLocale();
		} else {
			setLocale(newLocale);
		}

		this.setState({
			locale: newLocale,
			content: fetchLocale(getLocale())
		});
	}

	translate(key) {
		if (this.state.content && this.state.content[key]) {
			return this.state.content[key];
		}

		return key;
	}

	handleFetchUser(session) {
		const handleErr = () => this.handleLogOut();

		fetchUser(session)
			.then((userData) => {
				this.setState({userData, lists: userData?.lists || []});
				window.localStorage.setItem('user', userData._id);
				this.handleStorageChange();
			})
			.catch(handleErr);
	}

	handleAddressChange(address) {
		this.setState({nearAddress: address});
	}

	handleConfirmSession() {
		this.setState({sessionConfirmed: true});
	}

	handleUnconfirmSession() {
		this.setState({sessionConfirmed: false});
	}

	handleListNew(list, session) {
		this.setState((prevState) => ({lists: [...prevState.lists, list]}));
		this.handleFetchUser(session);
	}

	handleListRemoveFavorite(listId, favorite) {
		this.setState((prevState) => ({
			lists: prevState.lists.map((list) =>
				list.id === listId
					? {
							...list,
							items: list.items.filter((item) => item.fetchable_id !== favorite)
					  }
					: list
			)
		}));
	}

	handleFavoriteUpdate = (update) => {
		if (this.state.lists.length <= 0) {
			this.setState({lists: [update]});
		} else {
			this.setState((prevState) => ({
				lists: prevState.lists.map((list) => {
					if (list._id === update._id) {
						return update;
					}
					return list;
				})
			}));
		}
		this.handleMessageNew('Resource successfully added to favorites list.');
	};

	handleLogIn(jwt) {
		window.localStorage.setItem('jwt', jwt);
		this.handleStorageChange();
		this.handleConfirmSession();
		this.handleFetchUser(jwt);
	}

	handleLogOut() {
		window.localStorage.removeItem('jwt');
		window.localStorage.removeItem('user');
		this.handleStorageChange();
		this.handleUnconfirmSession();
	}

	handleMessageNew(message) {
		this.setState({message, messageOpen: true});
	}

	handleMessageClose(event, reason) {
		if (reason === 'clickaway') {
			return;
		}

		this.setState({messageOpen: false});
	}

	handleRequestOpen(dialog) {
		this.setState({dialog});
	}

	handleRequestClose() {
		this.setState({dialog: 'none'});
	}

	handleStorageChange() {
		this.setState({
			session: window.localStorage.getItem('jwt'),
			user: window.localStorage.getItem('user')
		});
	}

	render() {
		return (
			<Route
				from="/*"
				component={() => {
					window.location.href = 'https://app.inreach.org';
				}}
			/>
		);
	}
}
AppConnectCatalog.propTypes = {
	user: PropTypes.string,
	width: PropTypes.number.isRequired
};

export default withStyles(styles)(withWidth(AppConnectCatalog));
