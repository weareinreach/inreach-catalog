import React from 'react';

import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';
import Grid from 'material-ui/Grid';
import Tabs, { Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';

import withWidth from '../withWidth';
import breakpoints from '../../theme/breakpoints';
import fetchUserLists from '../../helpers/fetchUserLists';
import AsylumConnectButton from '../AsylumConnectButton';
import AsylumConnectMap from '../AsylumConnectMap';
import SearchBar from './SearchBar';
import SearchRefinementControls from './SearchRefinementControls';
import SearchStatusHandler from './SearchStatusHandler';
import ResourceListItem from '../resource/ResourceListItem';
import {mobilePadding} from '../../theme/sharedClasses';

const styles = theme => ({
  formRow: {
    marginBottom: '2.5rem'
  },
  container: {
    minHeight: '500px',
    paddingTop: '60px',
    paddingBottom: '60px'
  },
  tabContainer: {
    backgroundColor: theme.palette.primary[500],
    justifyContent: 'space-evenly'
  },
  [theme.breakpoints.down('sm')]: {
    container: {
      height: "100%",
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
    }
  }
});

const Results = (props) => {


}

class SearchResultsContainer extends React.Component {
  constructor(props, context) {
    super(props, context)
    //this.props.clearSearchStatus();
    //this.props.fetchSearchResults();

    this.state = { lists: [], tab: 0 };

    this.handleListAddFavorite = this.handleListAddFavorite.bind(this);
    this.handleListRemoveFavorite = this.handleListRemoveFavorite.bind(this);
    this.handleListNew = this.handleListNew.bind(this);
    this.handleSwipeChange = this.handleSwipeChange.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
    this.fetchLists = this.fetchLists.bind(this);
  }

  componentDidMount() {
    const { session } = this.props;
    if (session) {
      this.fetchLists(session);
    }

    this.doSearch();
    window.addEventListener('popstate', this.doSearch.bind(this));

  }

  doSearch() {
    this.props.clearSearchStatus();
    this.props.fetchSearchResults();
  }

  componentDidUpdate(prevProps) {
    if (this.props.searchStatus === "redirect"  && prevProps.searchStatus === null) {
      this.doSearch()
    }
  }

  handleListNew(list) {
    this.setState(prevState => ({ lists: [...prevState.lists, list]}));
  };

  handleListAddFavorite(listId, favorite) {
    this.setState(prevState => ({ lists: prevState.lists.map(list => (
      list.id === listId
        ? Object.assign(
            {},
            list,
            {fetchable_list_items: [
              ...list.fetchable_list_items,
              { fetchable_id: favorite}
            ]},
          )
        : list
    ))}));
  };

  handleListRemoveFavorite(listId, favorite) {
    this.setState(prevState => ({ lists: prevState.lists.map(list => (
      list.id === listId
        ? Object.assign(
            {},
            list,
            {fetchable_list_items: list.fetchable_list_items.filter(item =>
              item.fetchable_id !== favorite
            )},
          )
        : list
    ))}));
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

  fetchLists(session) {
    fetchUserLists(session)
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          return Promise.reject(response);
        }
      })
      .then(data => {
        this.setState({lists: data.collections});
      })
      .catch(response => {
        console.warn(response);
      });
  }

  render() {
    const { 
      tabContainer,
      container, 
      formRow, 
      containerSearchForm, 
      containerSearchResults } = this.props.classes;
    const isMobile = this.props.width < breakpoints['sm'];
    return (
      <Grid container alignItems='flex-start' justify='center' spacing={0} className={container}>
        <Grid item md={10} lg={9} xs={12}>
        <div className={containerSearchForm}>
          <SearchStatusHandler {...this.props} />
          <SearchBar {...this.props} classes={null} />
          <SearchRefinementControls onFilterChange={this.props.onFilterChange} onSortChange={this.props.onSortChange} selectedFilters={this.props.selectedFilters} />
          <Grid container spacing={0}>
            <Grid item xs={12} className={formRow}>
              <AsylumConnectButton variant="secondary" onClick={this.props.handleSearchButtonClick} >
                Search
              </AsylumConnectButton>
            </Grid>
          </Grid>
        </div>
        {isMobile ? 
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
        : null}
        <SwipeableViews
          index={this.state.tab}
          onChangeIndex={this.handleSwipeChange}
        >
          <div className={containerSearchResults}>
          { this.props.searching ?
              <Grid container spacing={0}>
                <Grid item xs={12} style={{textAlign: "center"}}>
                  <CircularProgress />
                </Grid>
              </Grid>
            :
              this.props.searchResults.map((organization) => {
                return (
                  <ResourceListItem
                    handleListAddFavorite={this.handleListAddFavorite}
                    handleListRemoveFavorite={this.handleListRemoveFavorite}
                    handleListNew={this.handleListNew}
                    handleMessageNew={this.props.handleMessageNew}
                    key={organization.id}
                    lists={this.state.lists}
                    resource={organization}
                    session={this.props.session}
                    user={this.props.user}
                  />
                )
              })
            }
          </div>
        {isMobile ?
          <div>
            <AsylumConnectMap {...this.props} 
              mapProps={this.props.mapProps} classes={null}
              loadingElement={<div style={{ width:"100%", height: window.innerHeight-91+"px" }} />}
              containerElement={<div style={{ width:"100%",height: window.innerHeight-91+"px" }} />}
              mapElement={<div style={{ width:"100%",height: window.innerHeight-91+"px" }} />} 
            />
          </div>
        : null}
        </SwipeableViews>
        </Grid>
      </Grid>
    );
  }
    
}


export default withWidth(withStyles(styles)(SearchResultsContainer));
