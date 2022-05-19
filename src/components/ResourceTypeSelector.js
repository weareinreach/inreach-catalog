import React from 'react';
import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import AsylumConnectSelector from './AsylumConnectSelector';
import AsylumConnectCheckbox from './AsylumConnectCheckbox';
import ACBadge from './Badge';
import {breakpoints, searchInput, searchInputMobile} from '../theme';
import ResourceTypes from '../utils/tags';
import withWidth from './withWidth';

const styles = (theme) => ({
	searchInput: Object.assign(searchInput(theme), {
		// borderLeft: '2px solid ' + theme.palette.common.lightGrey,
		cursor: 'pointer',
		position: 'relative',
		// boxShadow: '0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
		marginBottom: '0',
		// width: '400px',
		height: '48px',
		padding: '13px',
		color: theme.palette.signUp[600],
		// boxShadow:
		// 	'-10px 0px 0px 0px rgba(255,255,255,1), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
		[theme.breakpoints.down('md')]: {
			boxShadow: '0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
			borderLeft: 'none'
		},
		[theme.breakpoints.down('xs')]: searchInputMobile(theme)
	}),
	uncheckLink: {
		fontFamily: theme.typography.body1.fontFamily,
		fontSize: '18px',
		fontWeight: theme.typography.h3.fontWeight,
		cursor: 'pointer'
	},
	uncheckLinkDisabled: {
		fontFamily: theme.typography.body1.fontFamily,
		fontSize: '18px',
		fontWeight: theme.typography.h3.fontWeight,
		color: theme.palette.common.darkGrey,
		cursor: 'not-allowed'
	},
	filterLayout: {
		backgroundColor: theme.palette.common.white,
		[theme.breakpoints.up('sm')]: {
			// display: 'flex',
			width: '100%',
			'& > div:first-child': {
				overflowY: 'auto',
				padding: '8px',
				// backgroundColor: 'theme.palette.common.white',
				// boxShadow: '0px 1px 0px 1px rgba(0, 0, 0, 0.12)',
				textAlign: 'left'
			},
			'& > div:nth-child(2)': {
				// overflowY: 'auto',
				width: 'auto',
				// height: 'fit-content',
				top: theme.spacing(6),
				bottom: '0',
				left: '0',
				marginBottom: theme.spacing(2),
				backgroundColor: theme.palette.common.white,
				boxShadow: '0px 6px 10px 0px rgba(0, 0, 0, 0.12)'
			},
			'& > div:last-child': {
				width: '290px',
				height: 'auto',
				marginTop: '-615px',
				marginLeft: '100%',
				backgroundColor: theme.palette.common.white,
				boxShadow: '0px 1px 10px 1px rgba(0, 0, 0, 0.12)'
			}
		}
	},
	sectionHeader: {
		color: theme.palette.common.darkBlack
	},
	sectionTitle: {
		// fontWeight: '600',
		display: 'inline-block',
		verticalAlign: 'middle'
	},
	filterCheckBox: {
		transform: 'scale(1.5)',
		color: '#5073B3',
		marginRight: '-1.2rem'
	},
	subFilterCheckBox: {
		transform: 'scale(1.5)',
		color: '#5073B3',
		marginRight: '0rem'
	},
	subFilterCheckBoxLabel: {
		fontSize: '16px'
	},
	dividerSpacing: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2)
	},
	dividerwithoutColor: {
		backgroundColor: '#FFF'
	},
	arrowIcon: {
		height: '48px',
		width: '18px',
		color: '#5073B3',
		position: 'absolute',
		right: '0',
		[theme.breakpoints.down('xs')]: {
			height: '48px',
			width: '40px'
		}
	},
	subfilterSpacing: {
		// marginTop: theme.spacing(3),
		[theme.breakpoints.up('sm')]: {
			// position: 'absolute',
			// left: '50%',
			top: theme.spacing(2),
			bottom: '0',
			height: '100%',
			display: 'block',
			width: 'inherit'
		},
		[theme.breakpoints.down('xs')]: {
			marginLeft: '20px'
		}
	},
	resourceList: {
		// padding: theme.spacing(2),
		right: '0',
		[theme.breakpoints.up('md')]: {
			maxHeight: '24px'
			// padding: theme.spacing(4),
			// position: 'unset !important'
		}
	}
});

const FilterCollectionMobile = (props) => {
	const {
		category,
		children,
		classes,
		index,
		onChange,
		onClick,
		clickedCategory,
		resourceTypes,
		selectedResourceTypes,
		t,
		type
	} = props;
	const hasChildren = typeof children !== 'undefined' && children.length > 0;
	const categoryValue = hasChildren
		? children?.map((item) => `${props.value}.${item.value}`).join(',')
		: props.value;

	return (
		<div>
			<Typography
				variant="body1"
				className={classes.sectionHeader}
				onClick={onClick}
			>
				{typeof categoryValue !== 'undefined' ? (
					<span className={classes.sectionTitle}>
						<AsylumConnectCheckbox
							label=""
							value={categoryValue}
							classes={{
								checkboxDefault: classes.filterCheckBox
							}}
							onChange={onChange}
							checked={selectedResourceTypes.indexOf(categoryValue) >= 0}
						/>
					</span>
				) : null}
				<ACBadge type={type} width="45px" height="45px" useIcon={true} />
				<span className={classes.sectionTitle}>{category}</span>
				{hasChildren ? <ExpandMoreIcon className={classes.arrowIcon} /> : null}
			</Typography>
			{hasChildren && clickedCategory == index ? (
				<Grid container spacing={0} className={classes.subfilterSpacing}>
					{children.map((filter, i) => {
						const itemValue = `${props.value}.${filter.value}`;

						return (
							<Grid item key={i} xs={12} sm={6} md={4}>
								<AsylumConnectCheckbox
									label={filter.title}
									value={itemValue}
									onChange={onChange}
									disabled={selectedResourceTypes.indexOf(categoryValue) >= 0}
									checked={
										selectedResourceTypes.indexOf(itemValue) >= 0 ||
										selectedResourceTypes.indexOf(categoryValue) >= 0
									}
								/>
							</Grid>
						);
					})}
				</Grid>
			) : null}
			{index + 1 !== resourceTypes.length ? (
				<Divider className={classes.dividerSpacing} />
			) : null}
		</div>
	);
};

const FilterCollection = (props) => {
	const {
		category,
		children,
		classes,
		index,
		onChange,
		onMouseOver,
		onClick,
		clickedCategory,
		hoveredCategory,
		resourceTypes,
		selectedResourceTypes,
		t,
		type
	} = props;
	const hasChildren = typeof children !== 'undefined' && children.length > 0;
	const categoryValue = hasChildren
		? children?.map((item) => `${props.value}.${item.value}`).join(',')
		: props.value;

	var backgroundColor = '#FFFFFF';
	if (clickedCategory == index) {
		backgroundColor = '#E9E9E9';
	} else if (hoveredCategory == index) {
		backgroundColor = '#D3DCEC';
	}

	return (
		<div
			onMouseOver={onMouseOver}
			onClick={onClick}
			style={{backgroundColor: backgroundColor}}
		>
			<Typography variant="body1" className={classes.sectionHeader}>
				{typeof categoryValue !== 'undefined' ? (
					<span className={classes.sectionTitle}>
						<AsylumConnectCheckbox
							label=""
							classes={{
								checkboxDefault: classes.filterCheckBox
							}}
							value={categoryValue}
							onChange={onChange}
							checked={selectedResourceTypes.indexOf(categoryValue) >= 0}
						/>
					</span>
				) : null}
				<ACBadge type={type} width="45px" height="45px" useIcon={true} />
				<span className={classes.sectionTitle}>{category}</span>
				{hasChildren ? (
					<ArrowForwardIosIcon className={classes.arrowIcon} />
				) : null}
			</Typography>
			{index + 1 !== resourceTypes.length ? (
				<Divider />
			) : (
				<Divider className={[classes.dividerwithoutColor].join(' ')} />
			)}
		</div>
	);
};

const FilterSubCollection = (props) => {
	const {
		category,
		children,
		classes,
		index,
		onChange,
		clickedCategory,
		hoveredCategory,
		resourceTypes,
		selectedResourceTypes,
		t,
		type
	} = props;
	const hasChildren = typeof children !== 'undefined' && children.length > 0;
	const categoryValue = hasChildren
		? children?.map((item) => `${props.value}.${item.title}`).join(',')
		: props.value;

	return (
		<div>
			{hasChildren && (clickedCategory == index || hoveredCategory == index) ? (
				<Grid container spacing={1} className={classes.subfilterSpacing}>
					{children.map((filter, i) => {
						const itemValue = `${props.value}.${filter.value}`;

						return (
							<Grid item key={i} xs={12}>
								<AsylumConnectCheckbox
									label={filter.title}
									value={itemValue}
									classes={{
										checkboxDefault: classes.subFilterCheckBox,
										labelClass: classes.subFilterCheckBoxLabel
									}}
									labelClass={classes.subFilterCheckBoxLabel}
									onChange={onChange}
									disabled={selectedResourceTypes.indexOf(categoryValue) >= 0}
									checked={
										selectedResourceTypes.indexOf(itemValue) >= 0 ||
										selectedResourceTypes.indexOf(categoryValue) >= 0
									}
								/>
							</Grid>
						);
					})}
				</Grid>
			) : null}
		</div>
	);
};

class ResourceTypeSelector extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			hoveredCategory: -1,
			clickedCategory: -1
		};

		this.handleCategoryHover = this.handleCategoryHover.bind(this);
		this.handleCategorySelect = this.handleCategorySelect.bind(this);
	}

	handleCategoryHover(index) {
		this.setState({
			hoveredCategory: index,
			clickedCategory: -1
		});
	}

	handleCategorySelect(index) {
		if (index === this.state.clickedCategory) {
			this.setState({
				clickedCategory: -1,
				hoveredCategory: -1
			});
		} else {
			this.setState({
				clickedCategory: index,
				hoveredCategory: -1
			});
		}
	}

	render() {
		const {
			searchInput,
			sectionHeader,
			sectionTitle,
			filterCheckBox,
			subFilterCheckBox,
			subFilterCheckBoxLabel,
			subfilterSpacing,
			dividerSpacing,
			dividerwithoutColor,
			arrowIcon,
			resourceList,
			uncheckLink,
			uncheckLinkDisabled,
			filterLayout
		} = this.props.classes;
		const {
			onChange,
			selectedResourceTypes,
			clearResourceTypes,
			moveSearchButton
		} = this.props;
		const isMobile = this.props.width < breakpoints['sm'];
		const containerWidth = isMobile ? '100%' : null;
		const resourceTypes = ResourceTypes.getResourceTypesByGroup(
			this.props.locale
		);

		return (
			<AsylumConnectSelector
				label={<FormattedMessage id="resource.service-type-heading" />}
				selected={selectedResourceTypes}
				containerWidth={containerWidth}
				containerClass={searchInput}
				listContainerClass={resourceList}
				moveSearchButton={moveSearchButton}
			>
				{isMobile ? (
					<div>
						{selectedResourceTypes.length ? (
							<span onClick={clearResourceTypes} className={uncheckLink}>
								<FormattedMessage id="search.uncheck-all" />
							</span>
						) : (
							<span className={uncheckLinkDisabled}>
								<FormattedMessage id="search.uncheck-all" />
							</span>
						)}
					</div>
				) : null}
				{isMobile ? (
					resourceTypes.map((filter, i) => (
						<FilterCollectionMobile
							key={i}
							index={i}
							classes={{
								sectionHeader,
								sectionTitle,
								filterCheckBox,
								subfilterSpacing,
								dividerSpacing,
								arrowIcon
							}}
							onChange={onChange}
							onClick={(ev) => {
								this.handleCategorySelect(i);
							}}
							clickedCategory={this.state.clickedCategory}
							selectedResourceTypes={selectedResourceTypes}
							resourceTypes={resourceTypes}
							t={this.props.t}
							{...filter}
						/>
					))
				) : (
					<div className={filterLayout}>
						<div>
							{selectedResourceTypes.length ? (
								<span onClick={clearResourceTypes} className={uncheckLink}>
									<FormattedMessage id="search.uncheck-all" />
								</span>
							) : (
								<span className={uncheckLinkDisabled}>
									<FormattedMessage id="search.uncheck-all" />
								</span>
							)}
						</div>
						<div>
							{resourceTypes.map((filter, i) => (
								<FilterCollection
									key={i}
									index={i}
									classes={{
										sectionHeader,
										sectionTitle,
										filterCheckBox,
										subfilterSpacing,
										dividerSpacing,
										dividerwithoutColor,
										arrowIcon
									}}
									onChange={onChange}
									onMouseOver={(ev) => {
										this.handleCategoryHover(i);
									}}
									onClick={(ev) => {
										this.handleCategorySelect(i);
									}}
									clickedCategory={this.state.clickedCategory}
									hoveredCategory={this.state.hoveredCategory}
									selectedResourceTypes={selectedResourceTypes}
									resourceTypes={resourceTypes}
									t={this.props.t}
									{...filter}
								/>
							))}
						</div>
						<div>
							{resourceTypes.map((filter, i) => (
								<FilterSubCollection
									key={i}
									index={i}
									classes={{
										sectionHeader,
										sectionTitle,
										subFilterCheckBox,
										subFilterCheckBoxLabel,
										subfilterSpacing,
										dividerSpacing
									}}
									onChange={onChange}
									clickedCategory={this.state.clickedCategory}
									hoveredCategory={this.state.hoveredCategory}
									selectedResourceTypes={selectedResourceTypes}
									resourceTypes={resourceTypes}
									t={this.props.t}
									{...filter}
								/>
							))}
						</div>
					</div>
				)}
			</AsylumConnectSelector>
		);
	}
}

ResourceTypeSelector.propTypes = {
	clearResourceTypes: PropTypes.func.isRequired
};

export default withStyles(styles)(withWidth(ResourceTypeSelector));
