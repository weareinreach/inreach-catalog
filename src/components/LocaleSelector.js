import React from 'react';
import List from '@material-ui/core/List';
import {withStyles} from '@material-ui/core/styles';

import {getLocale, setLocale} from '../utils/locale';
import language from '../utils/language';

import AsylumConnectSelector from './AsylumConnectSelector';
import AsylumConnectDropdownListItem from './AsylumConnectDropdownListItem';

import {searchInput, searchInputMobile} from '../theme';

const styles = (theme) => ({
	inputClass: Object.assign(searchInput(theme), {
		cursor: 'pointer',
		position: 'relative',
		boxShadow: '0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
		marginBottom: '0',
		[theme.breakpoints.down('md')]: {
			boxShadow: '0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
			borderLeft: 'none'
		},
		[theme.breakpoints.down('xs')]: searchInputMobile(theme)
	})
});

const supportedLocales = [
	{name: '🇨🇦 Canada', code: ['en_CA']},
	{name: '🇲🇽 Mexico', code: ['en_MX', 'es_MX']},
	{name: '🇺🇸 United States', code: ['en_US', 'es_US']},
	{name: '🌎 Other / Travel Support', code: ['intl']}
];

class LocaleSelector extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedLocale: this.props.locale ? this.props.locale : false,
			selectedLocaleName: this.props.locale
				? this.getLocaleNameFromCode(this.props.locale)
				: false
		};

		this.handleSelectLocale = this.handleSelectLocale.bind(this);
		this.getLocaleNameFromCode = this.getLocaleNameFromCode.bind(this);
	}

	handleSelectLocale(localeCode, localeName) {
		this.setState({
			selectedLocale: localeCode,
			selectedLocaleName: localeName
		});
		if (
			this.props.setOnChange === true &&
			typeof this.props.changeLocale === 'function'
		) {
			this.props.changeLocale(localeCode);
		}
		if (typeof this.props.handleSelectLocale === 'function') {
			this.props.handleSelectLocale(localeCode, localeName);
		}
		setLocale(localeCode);
	}

	getLocaleNameFromCode(code) {
		let selectedLocale = supportedLocales.filter((item) =>
			item.code.includes(code)
		);
		if (selectedLocale.length) {
			return selectedLocale[0].name;
		} else {
			return false;
		}
	}

	componentWillMount() {
		if (this.state.selectedLocale === false) {
			this.setState({
				selectedLocale: getLocale(),
				selectedLocaleName: this.getLocaleNameFromCode(getLocale())
			});
		}
	}

	render() {
		const {localeLabel} = this.props;
		const {inputClass} = this.props.classes;
		const provider = language.getLanguageProvider();
		const langCode = language.getLanguageCode();
		function isDisabled(itemCode) {
			if (
				provider === 'inreach' &&
				langCode === 'es' &&
				(itemCode.includes('en_CA') || itemCode.includes('intl'))
			) {
				return true;
			}
		}

		function getCodeFromArray(itemCode) {
			if (provider === 'inreach' && langCode === 'es') {
				return itemCode[1];
			} else {
				return itemCode[0];
			}
		}

		function getLabelName(label) {
			//is language is spanish, provider is inreach, and label is not MX or US, set label to US
			if (label === '🇨🇦 Canada' || label === '🌎 Other / Travel Support') {
				if (provider === 'inreach' && langCode === 'es') {
					setLocale('es_US');
					return '🇺🇸 United States';
				} else {
					return label;
				}
			} else {
				return label;
			}
		}
		return (
			<AsylumConnectSelector
				label={
					this.state.selectedLocaleName
						? this.state.selectedLocaleName
						: localeLabel
				}
				selected={[]}
				containerClass={inputClass}
				closeOnClick={true}
			>
				<List>
					{supportedLocales.map((item, index) => (
						<AsylumConnectDropdownListItem
							disabled={isDisabled(item.code)}
							button
							key={index}
							selected={this.state.selectedLocale === item.name}
							onClick={(event) => {
								this.handleSelectLocale(getCodeFromArray(item.code), item.name);
							}}
						>
							{item.name}
						</AsylumConnectDropdownListItem>
					))}
				</List>
			</AsylumConnectSelector>
		);
	}
}

export default withStyles(styles)(LocaleSelector);
