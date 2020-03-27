import React from 'react';

import {Link} from 'react-router-dom';

import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import {isACOpportunity} from '../../helpers/Opportunities';
import resourceTypes from '../../helpers/ResourceTypes';
import ACBadge from '../Badge';

function groupedServices(list) {
  let newList;
}

const Services = props => {
  var lastBadge = false;
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} className={props.classes.sectionSpacing}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            {props.list && props.list
              ? props.list
                  .map(item => {
                    item.badge = resourceTypes.getBadge(
                      []
                        .concat(
                          item.tags && item.tags.length ? item.tags : [],
                          item.categories && item.categories.length
                            ? item.categories
                            : [],
                          item.areas && item.areas.length ? item.areas : []
                        )
                        .sort()
                    );
                    return item;
                  })
                  .sort((first, second) => {
                    if (first.badge < second.badge) {
                      return -1;
                    }
                    if (first.badge > second.badge) {
                      return 1;
                    }
                    return 0;
                  })
                  .map(item => {
                    if (props.isMobile) {
                      let newType = false;
                      if (lastBadge !== item.badge) {
                        newType = true;
                        lastBadge = item.badge;
                      }
                      return (
                        <div>
                          {newType ? (
                            <ACBadge
                              extraClasses={{
                                icon: props.classes.serviceBadge,
                                tooltip: props.classes.serviceTooltip
                              }}
                              key="misc"
                              type={item.badge}
                              width="48px"
                              height="48px"
                            />
                          ) : null}
                          <li>
                            {isACOpportunity(item) ? (
                              <Link
                                to={
                                  '/' +
                                  props.locale +
                                  '/resource/' +
                                  props.resource.slug +
                                  '/service/' +
                                  item.slug
                                }
                                className={props.classes.serviceText}
                              >
                                {item.title}
                              </Link>
                            ) : (
                              <span className={props.classes.serviceText}>
                                {item.title}
                              </span>
                            )}
                          </li>
                        </div>
                      );
                    } else {
                      return (
                        <Typography
                          key={item.id}
                          variant="body2"
                          style={{position: 'relative'}}
                        >
                          {item.badge ? (
                            <ACBadge
                              extraClasses={{
                                icon: props.classes.serviceBadge,
                                tooltip: props.classes.serviceTooltip
                              }}
                              key="misc"
                              type={item.badge}
                              width="48px"
                              height="48px"
                            />
                          ) : (
                            <ACBadge
                              extraClasses={{
                                icon: props.classes.serviceBadge,
                                tooltip: props.classes.serviceTooltip
                              }}
                              key="misc"
                              type="misc"
                              width="45px"
                              height="45px"
                            />
                          )}
                          {isACOpportunity(item) ? (
                            <Link
                              to={
                                '/' +
                                props.locale +
                                '/resource/' +
                                props.resource.slug +
                                '/service/' +
                                item.slug
                              }
                              className={props.classes.serviceText}
                            >
                              {item.title}
                            </Link>
                          ) : (
                            <span className={props.classes.serviceText}>
                              {item.title}
                            </span>
                          )}
                        </Typography>
                      );
                    }
                  })
              : null}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Services;
