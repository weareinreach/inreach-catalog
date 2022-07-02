import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import ValidLanguageList from '../utils/validLanguageList';
import ValidNativeLanguageList from '../utils/validNativeLanguageList';
import language from '../utils/language';
import {getLocale, setLocale} from '../utils/locale';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/List';
import {withStyles} from '@material-ui/core/styles';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import AsylumConnectBackButton from './AsylumConnectBackButton';
import AsylumConnectDropdownListItem from './AsylumConnectDropdownListItem';
import AsylumConnectSelector from './AsylumConnectSelector';
import {LanguageIcon} from './icons';
import Filter from './Filter';
import withWidth from './withWidth';
import {
	breakpoints,
	mobilePadding,
	searchInput,
	searchInputMobile
} from '../theme';
import {FormattedMessage} from 'react-intl';

const styles = (theme) => ({
	root: {
		display: 'block'
	},
	languageListContainer: {
		width: 'auto'
	},
	bodySelector: Object.assign(searchInput(theme), {
		borderLeft: '2px solid ' + theme.palette.common.lightGrey,
		cursor: 'pointer',
		position: 'relative',
		boxShadow:
			'-10px 0px 0px 0px rgba(255,255,255,1), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
		[theme.breakpoints.down('md')]: {
			boxShadow: '0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
			borderLeft: 'none'
		},
		[theme.breakpoints.down('xs')]: searchInputMobile(theme)
	}),
	languageList: {
		background: theme.palette.background.paper,
		paddingTop: 0,
		overflow: 'auto',
		maxHeight: 300,
		[theme.breakpoints.down('xs')]: {
			position: 'static',
			width: '100%',
			maxHeight: 'none',
			height: 'auto',
			boxShadow: 'none',
			border: 'none',
			borderRadius: '0px',
			marginBottom: '91px'
		}
	},
	providedByInReach: {
		display: 'flex',
		fontFamily: 'arial',
		fontSize: '11px',
		color: '#666',
		whiteSpace: 'nowrap',
		padding: theme.spacing(2)
	},
	poweredByGoogle: {
		display: 'flex',
		fontFamily: 'arial',
		fontSize: '11px',
		color: '#666',
		whiteSpace: 'nowrap',
		padding: theme.spacing(2)
	},
	gooLogoLink: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	},
	gooLogoImg: {
		paddingRight: '4px',
		paddingLeft: '4px',
		width: 'auto'
	},
	filterFormControl: {
		width: '100%',
		border: '2px solid #E9E9E9',
		borderRadius: '4px'
	},
	filterInput: {
		padding: '0 10px'
	},
	filterInputBar: {
		padding: `${theme.spacing(2)}px ${theme.spacing(2)}px 0px`,
		[theme.breakpoints.down('xs')]: {
			padding: '10px'
		}
	},
	blackTranslateColor: {
		display: 'inline',
		fontSize: '12px',
		color: '#444',
		fontWeight: 'bold',
		textDecoration: 'none'
	},
	languageLink: {
		textTransform: 'capitalize'
	},
	centerTextAlign: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		padding: '5 5 5',
		cursor: 'pointer'
	},
	textCenter: {
		textAlign: 'center'
	},
	mobilePadding: {
		[theme.breakpoints.down('xs')]: mobilePadding(theme)
	},
	topPadding: {
		[theme.breakpoints.down('xs')]: {
			paddingTop: '8px'
		}
	},
	languageSelect: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	},
	languageIcon: {
		width: '35px',
		height: '30px',
		paddingRight: '3px',
		'@media(max-width:972px)': {
			width: '33px',
			height: '27px'
		}
	}
});

class LangMenuItem extends React.Component {
	constructor(props) {
		super(props);
		this.handleSelectLang = this.handleSelectLang.bind(this);
	}

	handleSelectLang() {
		this.props.handleSelectLang(
			this.props.langCode,
			this.props.langName,
			this.props.provider
		);
	}

	render() {
		return (
			<AsylumConnectDropdownListItem
				data-test-id="nav-button-language-item"
				button
				onClick={this.handleSelectLang}
				provider={this.props.provider}
			>
				{this.props.langName}
			</AsylumConnectDropdownListItem>
		);
	}
}

class Language extends React.Component {
	constructor() {
		super();
		this.state = {
			open: false,
			selectedLang: 'English',
			langsList: ValidLanguageList.all(),
			langsNativeList: ValidNativeLanguageList.all(),
			provider: ''
		};
		this.handleClick = this.handleClick.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
		this.handleReload = this.handleReload.bind(this);
		this.handleRequestCloseAfterSelect =
			this.handleRequestCloseAfterSelect.bind(this);
		this.generateLanguageItems = this.generateLanguageItems.bind(this);
		this.generateNativeLanguageItems =
			this.generateNativeLanguageItems.bind(this);
		this.generateLanguageList = this.generateLanguageList.bind(this);
		this.generateLabelWithIcon = this.generateLabelWithIcon.bind(this);
		this.handleOnFilterChange = this.handleOnFilterChange.bind(this);
		this.handleOnFilterBarClick = this.handleOnFilterBarClick.bind(this);
	}

	generateNativeLanguageItems() {
		return (
			<Fragment>
				{this.state.langsNativeList.map((lang, index) => (
					<LangMenuItem
						key={100 + index}
						langName={lang.local}
						langCode={lang['1']}
						handleSelectLang={this.handleRequestCloseAfterSelect}
						provider={ValidNativeLanguageList.provider}
					/>
				))}
			</Fragment>
		);
	}

	generateLanguageItems() {
		return (
			<Fragment>
				{this.state.langsList.map((lang, index) => (
					<LangMenuItem
						key={200 + index}
						langName={lang.local}
						langCode={lang['1']}
						handleSelectLang={this.handleRequestCloseAfterSelect}
						provider="gt"
					/>
				))}
			</Fragment>
		);
	}

	generateLanguageList() {
		return (
			<List
				className={[
					this.props.classes.languageList,
					'skiptranslate',
					this.props.classes.mobilePadding
				].join(' ')}
				spacing={3}
			>
				<ListSubheader className={this.props.classes.providedByInReach}>
					<FormattedMessage
						id="language.inreach-attribution"
						defaultMessage="Provided by InReach"
						description="Dropdown label describing language translator"
					>
						{(providedBy) => <span>{providedBy}</span>}
					</FormattedMessage>
				</ListSubheader>
				{this.generateNativeLanguageItems()}
				<div className={this.props.classes.filterInputBar}>
					<Filter
						className={this.props.classes.filterFormControl}
						handleOnChange={this.handleOnFilterChange}
						handleOnClick={this.handleOnFilterBarClick}
						inputClassName={this.props.classes.filterInput}
					/>
				</div>
				<ListSubheader className={this.props.classes.poweredByGoogle}>
					<FormattedMessage
						id="language.google-attribution"
						defaultMessage="Powered by Google Translate"
						description="Dropdown label describing language translator"
					>
						{(poweredBy) => <span>{poweredBy}</span>}
					</FormattedMessage>
					<a
						className={this.props.classes.gooLogoLink}
						href="https://translate.google.com"
						target="_blank"
						rel="noopener noreferrer"
					>
						<img
							src="https://www.gstatic.com/images/branding/googlelogo/1x/googlelogo_color_42x16dp.png"
							width="37px"
							height="14px"
							className={this.props.classes.gooLogoImg}
							alt="Google Translate"
						/>
						<FormattedMessage
							id="language.dropdown-translate"
							defaultMessage="Powered by"
							description="Dropdown label describing language translator"
						>
							{(translate) => (
								<span className={this.props.classes.blackTranslateColor}>
									{translate}
								</span>
							)}
						</FormattedMessage>
					</a>
				</ListSubheader>
				{this.generateLanguageItems()}
			</List>
		);
	}

	generateLabelWithIcon(label, colorClass) {
		return (
			<div
				className={classNames(this.props.classes.languageSelect, colorClass)}
			>
				<div className={this.props.classes.languageIcon}>
					<LanguageIcon extraStyle={colorClass} />
				</div>
				{label}
			</div>
		);
	}

	handleClick(event) {
		this.setState(
			{open: !this.state.open},
			{selectedLang: language.getLanguage()}
		);
	}

	handleSelect(langCode, langName, provider) {
		if (typeof this.props.onSelect === 'function') {
			this.props.onSelect(langCode, langName, provider);
			this.setState({
				selectedLanguage: langName
			});
		}
	}

	handleOnFilterChange(e) {
		const filteredList = ValidLanguageList.filteredLanguageList(e.target.value);
		const filteredNativeList = ValidNativeLanguageList.filteredLanguageList(
			e.target.value
		);
		this.setState({
			langsList: filteredList,
			langsNativeList: filteredNativeList
		});
	}
	handleOnFilterBarClick(e) {
		e.stopPropagation();
	}

	handleRequestCloseAfterSelect(langCode, langName, provider) {
		this.setState({open: false, selectedLang: langName, provider: provider});
		if ((langCode === 'en' || langCode === 'es') && provider === 'inreach') {
			this.setState({open: false, selectedLang: langName, provider: provider});
			//clear location.hash
			var uri = window.location.toString();
			if (uri.indexOf('#') > 0) {
				var clean_uri = uri.substring(0, uri.indexOf('#'));
				window.history.replaceState({}, document.title, clean_uri);
			}
			//also clear googltrans cookie
			document.cookie = 'googtrans=; path=/;Max-Age=0;';
		} else {
			//use google translate
			window.location.hash = '#googtrans(' + langCode + ')';
		}
		language.setLanguage(langName);
		language.setLanguageCode(langCode);
		provider
			? language.setLanguageProvider(provider)
			: language.removeLanguageProvider();
		this.handleSelect(langCode, langName);

		if (langCode === 'es' && getLocale() === 'en_MX') {
			setLocale('es_MX');
		}
		if (langCode === 'es' && getLocale() === 'en_US') {
			setLocale('es_US');
		}

		if (langCode === 'en' && getLocale() === 'es_MX') {
			setLocale('en_MX');
		}
		if (langCode === 'en' && getLocale() === 'es_US') {
			setLocale('en_US');
		}

		if (this.props.autoReload) {
			window.location.reload();
		}
	}

	handleReload() {
		window.location.reload();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.triggerReload) {
			this.handleReload();
		}
	}

	componentWillMount() {
		var currentLang = language.getLanguage(); //window.localStorage.getItem('lang') ? window.localStorage.getItem('lang') : 'English';
		if (window.location.hash.length !== 0) {
			let langCode = language.getLanguageCode();
			currentLang =
				ValidLanguageList.byCode(langCode) ||
				ValidNativeLanguageList.byCode(langCode);
		}
		this.setState({selectedLang: currentLang});
		this.handleSelect(ValidLanguageList.codeByName(currentLang), currentLang);
		this.handleSelect(
			ValidNativeLanguageList.codeByName(currentLang),
			currentLang
		);
		if (currentLang === 'English') {
			document.cookie =
				'googtrans=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;';

			//Google Translate started adding root domain translation cookies - this will clear those
			var hostComponents = window.location.host.split('.');
			var domain =
				hostComponents.length >= 2
					? hostComponents[hostComponents.length - 2] +
					  '.' +
					  hostComponents[hostComponents.length - 1]
					: window.location.host;
			document.cookie =
				'googtrans=;domain=' +
				domain +
				';path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
		}
	}

	render() {
		const {
			classes,
			history,
			handleRequestOpen,
			useMobile,
			inputClass,
			label,
			triggerReload,
			colorClass,
			useIcon,
			useOnlyIcon,
			listContainerClass,
			enableOverlay,
			noArrow
		} = this.props;
		const {selectedLang} = this.state;
		const selectorLabel = label || selectedLang;
		const isMobile = this.props.width < breakpoints['sm'] && useMobile;
		if (triggerReload === true) {
			this.handleReload();
		}

		return (
			<div
				className={classes.root + ' hide--on-print'}
				data-test-id="nav-button-language"
			>
				{!isMobile ? (
					<AsylumConnectSelector
						label={
							useOnlyIcon
								? this.generateLabelWithIcon('', colorClass)
								: useIcon
								? this.generateLabelWithIcon(selectorLabel, colorClass)
								: selectorLabel
						}
						containerClass={inputClass}
						selected={[]}
						closeOnClick={true}
						listContainerClass={classNames([
							classes.languageListContainer,
							listContainerClass
						])}
						colorClass={colorClass}
						containerWidth="250px"
						enableOverlay={enableOverlay}
						noArrow={noArrow}
					>
						{this.generateLanguageList()}
					</AsylumConnectSelector>
				) : (
					<div className={classes.mobilePadding + ' ' + classes.topPadding}>
						<AsylumConnectBackButton
							color="default"
							onClick={() => {
								handleRequestOpen('none');
								history.push('/');
							}}
						/>
						<FormattedMessage
							id="language.dropdown-select-language"
							defaultMessage="Select Language"
							description="Dropdown label to prompting to select a language"
						>
							{(selectLanguage) => (
								<Typography className={classes.textCenter} variant="h3">
									{selectLanguage}
								</Typography>
							)}
						</FormattedMessage>
						{this.generateLanguageList()}
					</div>
				)}
			</div>
		);
	}
}

Language.defaultProps = {
	useMobile: true,
	autoReload: true,
	useIcon: false,
	useOnlyIcon: false,
	noArrow: false,
	enableOverlay: false
};

Language.propTypes = {
	classes: PropTypes.object.isRequired,
	useMobile: PropTypes.bool,
	autoReload: PropTypes.bool
};

LangMenuItem.defaultProps = {
	langName: 'English',
	langCode: 'en'
};

LangMenuItem.propTypes = {
	langName: PropTypes.string.isRequired,
	langCode: PropTypes.string.isRequired
};

export default withStyles(styles)(withWidth(Language));
