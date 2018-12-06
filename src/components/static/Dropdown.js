import React from 'react';
import PropTypes from 'prop-types';
import withStylesProps from '../withStylesProps';
import Typography from 'material-ui/Typography';
import List, {ListItem, ListItemText, ListSubheader} from 'material-ui/List';

import ContentMarkdown from '../../helpers/ContentMarkdown';

require('./Resource.scss');

import { searchInput } from '../../theme/sharedClasses';
import AsylumConnectSelector from '../AsylumConnectSelector';
import Resource from './Resource';

const styles = (theme, props) => ({
  textAlignCenter: {
    textAlign: 'center',
  },
  titleMargin: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit
  },
  italic: {
    fontStyle: 'italic',
  },
  applyColor: {
    color: props.color
  },
  inlineBlock: {
    display: 'inline-block'
  },
  dropdownInput: Object.assign(searchInput(theme), {
    cursor: 'pointer',
    position: 'relative',
    marginBottom: '0px'
  }),
  listContainerClass: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.fontSize,
  }
})


class Dropdown extends React.Component {
  constructor(props, context) {
    super(props,context);
    this.state = {
      selected: this.props.selected
    };
    this.handleSelect = this.handleSelect.bind(this);
    /*this.fetchPage = this.fetchPage.bind(this);
    this.handlePageRequest = this.handlePageRequest.bind(this);*/
  }

  handleSelect(item) {
    this.setState({
      selected: item
    })
    if(typeof this.props.onSelect == 'function') {
      this.props.onSelect(item);
    }
  }

  render() {
    const {classes, dropdown, label, color} = this.props;
    let {keys} = this.props;
    const containerWidth = '100%';
    var removal = keys.indexOf('label');
    if (removal > -1) {
      keys.splice(removal, 1);
    }
    return (
      <div>
        <AsylumConnectSelector label={this.state.selected ? this.state.selected : label} selected={[]} containerWidth={containerWidth} containerClass={classes.dropdownInput} listContainerClass={classes.listContainerClass} closeOnClick={true}>
          <List>
            {keys.map((item, index) => <ListItem button key={index} selected={this.state.selected === item} onClick={event => this.handleSelect(item)}>{item}</ListItem>)}
          </List>
        </AsylumConnectSelector>
        {dropdown && this.state.selected && dropdown[this.state.selected] && dropdown[this.state.selected].length ?
          dropdown[this.state.selected].map((resource, index) => <Resource key={index} color={color} {...resource} />)
          :null}
      </div>
    );
  }
}

Dropdown.propTypes = {
  label: PropTypes.string,
  keys: PropTypes.array,
  dropdown: PropTypes.object
};

export default withStylesProps(styles)(Dropdown);
