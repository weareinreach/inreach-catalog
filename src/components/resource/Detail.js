import React from 'react';
import PropTypes from 'prop-types';
import {Route, Switch} from 'react-router-dom';

import {withStyles} from 'material-ui/styles';
import {
  bodyLink,
  boldFont,
  italicFont,
  dividerSpacing,
  mobilePadding
} from '../../theme';
import Resource from './Resource';
import Service from './Service';

const styles = theme => ({
  tabRoot: {
    minWidth: '0'
  },
  tabLabelContainer: {
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit
  },
  tabLabel: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
  },
  tabIndicator: {
    height: '4px'
  },
  container: {
    minHeight: '500px',
    paddingTop: '60px',
    paddingBottom: '60px',
    [theme.breakpoints.down('xs')]: Object.assign(mobilePadding(theme), {
      /*height: "100%",*/
      paddingTop: '0px',
      paddingBottom: '0px',
      backgroundColor: theme.palette.common.white
      /*marginBottom: '91px'*/
    })
  },
  cushion: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  },
  separator: {
    padding: '0 ' + theme.spacing.unit,
    fontSize: '1.25rem',
    '&:after': {
      content: '" "'
    }
  },
  header: {
    borderBottom: '1px solid ' + theme.palette.common.darkGrey
  },
  contentSpacing: {
    margin: theme.spacing.unit * 3 + ' 0'
  },
  bottomSpacing: {
    marginBottom: theme.spacing.unit * 2
  },
  mobileSpacing: {
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing.unit * 3
    }
  },
  lineSpacing: {
    lineHeight: '1.4rem'
  },
  sectionSpacing: {
    marginBottom: theme.spacing.unit * 0
  },
  dividerSpacing: dividerSpacing(theme),
  orgName: {
    fontSize: '21px',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
      fontSize: '24px'
    }
  },
  serviceOrg: {
    [theme.breakpoints.down('xs')]: {
      color: theme.palette.common.darkBlack,
      textTransform: 'none',
      fontWeight: 400,
      textAlign: 'center'
    }
  },
  serviceOrgContainer: {
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing.unit * 2
    }
  },
  serviceBadge: {
    position: 'absolute',
    marginLeft: theme.spacing.unit * -1
  },
  serviceText: {
    display: 'block',
    lineHeight: (theme.spacing.unit * 0.5 + 45).toString() + 'px',
    paddingLeft: theme.spacing.unit * 7,
    marginTop: 0,
    marginBottom: 0,
    [theme.breakpoints.down('xs')]: {
      display: 'inline-block',
      width: '90%',
      verticalAlign: 'top',
      lineHeight: 1.6,
      paddingLeft: 0,
      marginBottom: theme.spacing.unit
    }
    //marginTop: theme.spacing.unit * 2,
    //marginBottom: theme.spacing.unit * 2
    //paddingTop:"10px"
  },
  serviceTooltip: {
    top: theme.spacing.unit
  },
  boldFont: boldFont(theme),
  italicFont: italicFont(theme),
  moreInfo: Object.assign(
    {
      color: theme.palette.common.darkGrey,
      [theme.breakpoints.down('xs')]: {
        color: theme.palette.common.darkBlack,
        textAlign: 'center'
      }
    },
    boldFont(theme)
  ),
  bodyLink: bodyLink(theme),
  mobileRatingSummary: {
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
      marginTop: theme.spacing.unit * 2
    }
  },
  listLink: {
    '& + &:before': {
      content: '", "'
    }
  },
  dialogBody: {
    minWidth: '600px',
    overflowY: 'auto',
    padding: '5.5rem'
  },
  toolbarRoot: {
    justifyContent: 'space-between'
  },
  toolbarGutters: {
    paddingLeft: '0',
    paddingRight: '0'
  }
});

class Detail extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      tab: 0
      //userReview: null,
      //userComment: null
    };

    this.handleTabClickDesktop = this.handleTabClickDesktop.bind(this);
    this.handleTabClickMobile = this.handleTabClickMobile.bind(this);
    this.handleSwipeChange = this.handleSwipeChange.bind(this);
  }

  componentWillMount() {
    window.scroll(0, 0);
  }

  componentWillUnmount() {}

  handleTabClickDesktop(e, tab) {
    this.setState({
      tab
    });
  }

  handleTabClickMobile(e, tab) {
    this.setState({
      tab
    });
  }

  handleSwipeChange(index, indexLatest) {
    this.setState({
      tab: index
    });
  }

  render() {
    return (
      <Switch>
        <Route
          path="/:locale/resource/:id/service/:serviceId"
          render={props => (
            <Service
              {...props}
              defaultClasses={this.props.classes}
              handleListAddFavorite={this.props.handleListAddFavorite}
              handleListRemoveFavorite={this.props.handleListRemoveFavorite}
              handleListNew={this.props.handleListNew}
              handleLogOut={this.props.handleLogOut}
              handleMessageNew={this.props.handleMessageNew}
              handleRequestOpen={this.props.handleRequestOpen}
              handleSwipeChange={this.handleSwipeChange}
              handleTabClickDesktop={this.handleTabClickDesktop}
              handleTabClickMobile={this.handleTabClickMobile}
              lists={this.props.lists}
              locale={this.props.locale}
              mapResources={this.props.mapResources}
              resource={this.props.resource}
              service={this.props.service}
              setSelectedResource={this.props.setSelectedResource}
              setSelectedService={this.props.setSelectedService}
              session={this.props.session}
              tab={this.state.tab}
              t={this.props.t}
              user={this.props.user}
            />
          )}
        />
        <Route
          path="/:locale/resource/:id"
          render={props => (
            <Resource
              {...props}
              defaultClasses={this.props.classes}
              handleListAddFavorite={this.props.handleListAddFavorite}
              handleListRemoveFavorite={this.props.handleListRemoveFavorite}
              handleListNew={this.props.handleListNew}
              handleLogOut={this.props.handleLogOut}
              handleMessageNew={this.props.handleMessageNew}
              handleRequestOpen={this.props.handleRequestOpen}
              handleResourceBackButton={this.props.handleResourceBackButton}
              handleSwipeChange={this.handleSwipeChange}
              handleTabClickDesktop={this.handleTabClickDesktop}
              handleTabClickMobile={this.handleTabClickMobile}
              lists={this.props.lists}
              locale={this.props.locale}
              mapResources={this.props.mapResources}
              resource={this.props.resource}
              setSelectedResource={this.props.setSelectedResource}
              session={this.props.session}
              tab={this.state.tab}
              t={this.props.t}
              user={this.props.user}
            />
          )}
        />
      </Switch>
    );
  }
}

Detail.propTypes = {
  handleMessageNew: PropTypes.func.isRequired
};

export default withStyles(styles)(Detail);
