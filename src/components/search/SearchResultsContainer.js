import React from 'react';

import Fa from 'react-fontawesome';

import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Tooltip from 'material-ui/Tooltip';
import Tabs, { Tab } from 'material-ui/Tabs';
import IconButton from 'material-ui/IconButton';
import SwipeableViews from 'react-swipeable-views';

import withWidth from '../withWidth';
import breakpoints from '../../theme/breakpoints';
import AsylumConnectBackButton from '../AsylumConnectBackButton';
import AsylumConnectButton from '../AsylumConnectButton';
import AsylumConnectCheckbox from '../AsylumConnectCheckbox';
import AsylumConnectInfographicButton from "../AsylumConnectInfographicButton";
import Loading from '../Loading';
import AsylumConnectMap from '../AsylumConnectMap';
import SearchBar from './SearchBar';
import SearchRefinementControls from './SearchRefinementControls';
import ResourceListItem from '../resource/ResourceListItem';
import {mobilePadding, boldFont} from '../../theme/sharedClasses';

const styles = theme => ({
  tooltip: { fontFamily: 'sans-serif' },
  container: {
    minHeight: '500px',
    paddingTop: '60px',
    paddingBottom: '60px'
  },
  tabContainer: {
    backgroundColor: theme.palette.primary[500],
    justifyContent: 'space-evenly'
  },
  centerText: {
    textAlign: "center"
  },
  noResults: Object.assign(boldFont(theme), {
    textAlign: "center"
  }),
  fullBottomMargin: {
    marginBottom: '2rem'
  },
  halfBottomMargin: {
    marginBottom: '1rem'
  },
  [theme.breakpoints.up('sm')]: {
    filterContainer: {
      marginTop: "-0.8rem"
    }
  },
  [theme.breakpoints.down('sm')]: {
    container: {
      paddingTop: '0px',
      paddingBottom: '0px'
    },
    containerSearchForm: Object.assign(mobilePadding(theme), { 
      backgroundColor: theme.palette.primary[500],
      paddingTop: "20px",
      paddingBottom: "20px"
    }),
    containerSearchResults: Object.assign(mobilePadding(theme), { 
      backgroundColor: theme.palette.common.white
    }),
    formRow: {
      marginBottom: '0'
    },
    checkboxDefault: {
      color: theme.palette.common.white,
      alignItems: 'flex-start'
    },
    checkboxLabel: {
      color: theme.palette.common.white
    }
  },
  backButton: {
    paddingBottom: '0.83em'
  }
});

const ResultsContainer = (props) => {
  const { containerSearchResults, searching, searchResults, noResults } = props;
  return (
    <div className={containerSearchResults}>
      {searchResults.length ? 
        searchResults.map((organization) => {
          return (
            <ResourceListItem key = {organization.id} resource={organization} {...props} />
          )
        })
      : null }
      { searching ? <Loading /> : 
        searchResults.length ? null :
        <Typography type="body2" className={noResults}>
          We didn't currently find any verified resources within your search criteria.<br/>Try choosing different resource types or searching for a different location.
        </Typography>
      }
    </div>
  );
}

class SearchResultsContainer extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = { tab: 0 };

    this.handleSwipeChange = this.handleSwipeChange.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
  }

  componentDidMount() {
    this.doSearch();
    window.addEventListener('popstate', this.doSearch.bind(this));
    window.addEventListener('scroll', this.addPage.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.doSearch.bind(this));
    window.removeEventListener('scroll', this.addPage.bind(this));
  }

  doSearch(ev) {
    this.props.clearSearchStatus();
    this.props.fetchSearchResults();
  }

  addPage(ev) {
    let searchContainer = document.querySelectorAll('.container--search'); 
    if (searchContainer.length && (window.innerHeight + window.scrollY) >= (searchContainer[0].offsetTop + searchContainer[0].offsetHeight)) {
        this.props.fetchNextSearchResultsPage();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.searchStatus === "refresh"  && prevProps.searchStatus === null) {
      this.doSearch()
    }
  }

  handleTabChange(event, value) {
    this.setState({
      tab: value
    });
  }

  handleSwipeChange(index, indexLatest) {
    this.setState({
      tab: index
    });
  }

  render() {
    const { 
      backButton,
      centerText,
      checkboxDefault,
      checkboxLabel,
      container,
      containerSearchForm, 
      containerSearchResults,
      filterContainer,
      fullBottomMargin, 
      halfBottomMargin,
      noResults,
      tabContainer,
      tooltip
      } = this.props.classes;
    const searchResultsProps = {
      containerSearchResults: containerSearchResults,
      handleListAddFavorite: this.props.handleListAddFavorite,
      handleListRemoveFavorite: this.props.handleListRemoveFavorite,
      handleListNew: this.props.handleListNew,
      handleListNew: this.props.handleListNew,
      handleLogOut: this.props.handleLogOut,
      handleMessageNew: this.props.handleMessageNew,
      handleRequestOpen: this.props.handleRequestOpen,
      lists: this.props.lists,
      noResults: noResults,
      session: this.props.session,
      searchResults: this.props.searchResults,
      searching: this.props.searching,
      user: this.props.user
    };
    const {showWalkinCheckbox} = this.props;
    const toolbarClass = showWalkinCheckbox ? halfBottomMargin : fullBottomMargin
    const isMobile = this.props.width < breakpoints['sm'];
    return (
      <Grid container alignItems='flex-start' justify={this.props.width >= breakpoints['xl'] ? 'flex-start' : 'center'} spacing={0} className={container}>
        <Grid item xs={12} sm={11} md={10} lg={10} xl={11} >
        <div className={containerSearchForm+' no-background'}>
          {isMobile ?
            <div className={backButton}>
              <AsylumConnectBackButton color="contrast" onClick={() => {this.props.history.goBack()}} />
            </div>
          : null 
          }
          <SearchBar {...this.props} classes={null} />
          <Grid container spacing={0} alignItems='flex-start'>
            <Grid item xs={12} md={8} className={toolbarClass}>
              <Grid container spacing={0} justify='space-between'>  
                <Grid item xs>
                  <AsylumConnectButton variant="secondary" onClick={this.props.handleSearchButtonClick} disabled={this.props.searchDisabled}>
                    Search
                    {this.props.searchDisabled ? <Fa name="spinner" spin style={{marginLeft: "0.5rem"}} /> : null}
                  </AsylumConnectButton>
                </Grid>
                {isMobile ? null : 
                <Grid item xs className='pull-right'>
                  <Tooltip
                    className={tooltip}
                    classes={{tooltipTop:"badge-tooltipTop"}}
                    title='Print Results'
                    placement="top"
                  >
                    <IconButton color="primary" style={{height: 'auto'}} onClick={this.props.handlePrintClick} disabled={this.props.printDisabled}>
                      <Fa name="print" />
                    </IconButton>
                  </Tooltip>                  
                  {/*<AsylumConnectButton variant="secondary" onClick={this.props.handlePrintClick} disabled={this.props.printDisabled}>
                    Print
                    {this.props.printDisabled ? <Fa name="spinner" spin style={{marginLeft: "0.5rem"}} /> : null}
                  </AsylumConnectButton>*/}
                </Grid>
                }
              </Grid>
              {this.props.infographic ? 
                <Grid container spacing={0} justify='space-between'>  
                  <Grid item xs>
                    <AsylumConnectInfographicButton type="link" url={this.props.infographic.url} text={"Asylum Seeker's "+this.props.infographic.name} />
                  </Grid>
                </Grid>
              : null}
            </Grid>
            <Grid item xs={12} md={4} className={filterContainer+' '+toolbarClass}>
              <SearchRefinementControls 
                clearSearchFilters={this.props.clearSearchFilters}
                handleFilterSelect={this.props.handleFilterSelect} 
                handleSortSelect={this.props.handleSortSelect} 
                selectedFilters={this.props.selectedFilters.filter(item => (item!=='time-walk-in'))} 
                selectedSort={this.props.selectedSort}  />
            </Grid>
            {showWalkinCheckbox ? <Grid item xs={12} className={centerText+' '+halfBottomMargin}>
              <AsylumConnectCheckbox label="Only show me resources that provide walk-in hours" value="time-walk-in" onChange={this.props.handleFilterSelect} checked={(this.props.selectedFilters.indexOf("time-walk-in") >= 0)} additionalClasses={{
                checkboxDefault: checkboxDefault,
                label: checkboxLabel
              }} />
            </Grid> 
            : null}
          </Grid>
        </div>
        {isMobile ? 
          <div>
            <Tabs
              value={this.state.tab}
              onChange={this.handleTabChange}
              indicatorColor="white"
              textColor="white"
              centered
              classes={{
                flexContainer: tabContainer
              }}
            >
              <Tab label="List" />
              <Tab label="Map" />
            </Tabs>
            <SwipeableViews
              index={this.state.tab}
              onChangeIndex={this.handleSwipeChange}
            >
              <ResultsContainer {...searchResultsProps}/>
              <div className="position-relative">
                <AsylumConnectMap
                  containerElement={<div style={{ width:"100%",height: window.innerHeight-91+"px" }} />}
                  history={this.props.history}
                  loadingElement={<div style={{ width:"100%", height: window.innerHeight-91+"px" }} />}
                  mapElement={<div style={{ width:"100%",height: window.innerHeight-91+"px" }} />} 
                  mapMaxDistance={this.props.mapMaxDistance}
                  resources={this.props.mapResources}
                  searchCenter={this.props.searchCenter}
                />
              </div>
            </SwipeableViews>
          </div>
          : <ResultsContainer {...searchResultsProps} /> 
          }
        </Grid>
      </Grid>
    );
  }
    
}


export default withWidth(withStyles(styles)(SearchResultsContainer));
