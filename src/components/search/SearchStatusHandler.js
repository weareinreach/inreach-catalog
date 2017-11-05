import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  Link
} from 'react-router-dom';


const SearchStatusHandler = (props) => {
  switch(props.searchStatus) {
    case 'redirect':
      var resourceTypes = (props.selectedResources.length ? props.selectedResources.join(',') : 'any');
      return (<Redirect to={`/search/${encodeURIComponent(props.nearLatLng.lat + ',' + props.nearLatLng.lng)}/${encodeURIComponent(resourceTypes)}/all/default`} push={true} />);
    break;
    default:
      return null;
    break;
  } 
}


export default SearchStatusHandler;