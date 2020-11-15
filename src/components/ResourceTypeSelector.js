import React from 'react';
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
    borderLeft: '2px solid ' + theme.palette.common.lightGrey,
    cursor: 'pointer',
    position: 'relative',
    boxShadow:
      '-10px 0px 0px 0px rgba(255,255,255,1), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
    [theme.breakpoints.down('md')]: {
      boxShadow: '0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
      borderLeft: 'none',
    },
    [theme.breakpoints.down('xs')]: searchInputMobile(theme),
  }),
  uncheckLink: {
    fontFamily: theme.typography.body2.fontFamily,
    fontSize: theme.typography.body2.fontSize,
    fontWeight: theme.typography.body2.fontWeight,
    position: 'absolute',
    right: theme.spacing(2),
    top: theme.spacing(2),
    textDecoration: 'none',
  },
  filterLayout: {
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      width: '100%',
      '& > div:first-child': {
        overflowY: 'auto',
        width: '50%',
        position: 'absolute',
        top: theme.spacing(6),
        bottom: '0',
        left: '0',
        marginBottom: theme.spacing(2),
      },
      '& > div:last-child': {
        width: '50%',
        height: '420px',
        marginLeft: '50%',
      },
    },
  },
  sectionHeader: {
    color: theme.palette.common.darkBlack,
  },
  sectionTitle: {
    fontWeight: '600',
    display: 'inline-block',
    verticalAlign: 'middle',
  },
  filterCheckBox: {
    transform: 'scale(1.5)',
    color: '#5073B3',
    marginRight: '-1.2rem',
  },
  subFilterCheckBox: {
    transform: 'scale(1.5)',
    color: '#5073B3',
    marginRight: '0rem',
  },
  subFilterCheckBoxLabel: {
    fontSize: '16px',
  },
  dividerSpacing: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  dividerwithoutColor: {
    backgroundColor: '#FFF',
  },
  arrowIcon: {
    height: '48px',
    width: '18px',
    color: '#5073B3',
    position: 'absolute',
    right: '0',
    [theme.breakpoints.down('xs')]: {
      height: '48px',
      width: '40px',
    },
  },
  subfilterSpacing: {
    marginTop: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      position: 'absolute',
      left: '50%',
      top: theme.spacing(2),
      bottom: '0',
      height: '100%',
      display: 'block',
      width: 'inherit'
    },
    [theme.breakpoints.down('xs')]: {
      marginLeft: '20px',
    },
  },
  resourceList: {
    padding: theme.spacing(2),
    right: '0',
    [theme.breakpoints.up('md')]: {
      maxHeight: '420px',
      padding: theme.spacing(4),
    },
  },
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
    type,
  } = props;
  const hasChildren = typeof children !== 'undefined' && children.length > 0;
  const categoryValue = hasChildren
    ? children?.map((item) => `${props.value}.${item.value}`).join(',')
    : props.value;

  return (
    <div>
      <Typography
        variant="body2"
        className={classes.sectionHeader}
        onClick={onClick}
      >
        {typeof categoryValue !== 'undefined' ? (
          <span className={classes.sectionTitle}>
            <AsylumConnectCheckbox
              label=""
              value={categoryValue}
              classes={{
                checkboxDefault: classes.filterCheckBox,
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
    type,
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
      <Typography variant="body2" className={classes.sectionHeader}>
        {typeof categoryValue !== 'undefined' ? (
          <span className={classes.sectionTitle}>
            <AsylumConnectCheckbox
              label=""
              classes={{
                checkboxDefault: classes.filterCheckBox,
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
    type,
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
                    labelClass: classes.subFilterCheckBoxLabel,
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
      clickedCategory: -1,
    };

    this.handleCategoryHover = this.handleCategoryHover.bind(this);
    this.handleCategorySelect = this.handleCategorySelect.bind(this);
  }

  handleCategoryHover(index) {
    this.setState({
      hoveredCategory: index,
      clickedCategory: -1,
    });
  }

  handleCategorySelect(index) {
    if (index === this.state.clickedCategory) {
      this.setState({
        clickedCategory: -1,
        hoveredCategory: -1,
      });
    } else {
      this.setState({
        clickedCategory: index,
        hoveredCategory: -1,
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
      filterLayout,
    } = this.props.classes;
    const {
      onChange,
      selectedResourceTypes,
      clearResourceTypes,
      moveSearchButton,
    } = this.props;
    const isMobile = this.props.width < breakpoints['sm'];
    const containerWidth = isMobile ? '100%' : this.props.containerWidth + 'px';
    const resourceTypes = ResourceTypes.getResourceTypesByGroup(
      this.props.locale
    );

    return (
      <AsylumConnectSelector
        label="Service Type"
        selected={selectedResourceTypes}
        containerWidth={containerWidth}
        containerClass={searchInput}
        listContainerClass={resourceList}
        moveSearchButton={moveSearchButton}
      >
        <span href="#" onClick={clearResourceTypes} className={uncheckLink}>
          Uncheck All
        </span>
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
                arrowIcon,
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
                    arrowIcon,
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
                    dividerSpacing,
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
  clearResourceTypes: PropTypes.func.isRequired,
};

export default withStyles(styles)(withWidth(ResourceTypeSelector));
