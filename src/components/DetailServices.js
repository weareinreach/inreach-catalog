import React from 'react';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import ACBadge from './Badge';
import resourceTypes, {getTags} from '../utils/tags';

// TODO: move to utils and test
const addBadges = (list, locale) => {
  return (
    list
      ?.map((item) => {
        const itemTags = getTags(item, locale);
        const badgeList = [
          ...(itemTags?.length ? itemTags : []),
          ...(item?.categories?.length ? item.categories : []),
          ...(item?.areas?.length ? item.areas : []),
        ].sort();

        item.badge = resourceTypes.getBadge(badgeList, locale);

        return item;
      })
      ?.sort((first, second) => {
        if (first.badge < second.badge) {
          return -1;
        }

        if (first.badge > second.badge) {
          return 1;
        }

        return 0;
      }) || []
  );
};

const Services = (props) => {
  const {classes, list, isMobile, locale, resource, resourceTags} = props;
  const itemsWithBadges = addBadges(list, locale);
  let lastBadge = false;

  return (
    <Grid container spacing={0}>
      <Grid item xs={12} className={classes.sectionSpacing}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            {itemsWithBadges.map((item) => {
              const {_id, badge, name, slug} = item;
              const itemLink = `/${locale}/resource/${resource.slug}/service/${slug}`;

              if (isMobile) {
                let newType = false;

                if (lastBadge !== badge) {
                  newType = true;
                  lastBadge = badge;
                }

                return (
                  <div>
                    {newType && (
                      <ACBadge
                        extraClasses={{
                          icon: classes.serviceBadge,
                          tooltip: classes.serviceTooltip,
                        }}
                        key="misc"
                        type={badge}
                        width="48px"
                        height="48px"
                      />
                    )}
                    <li>
                      <Link to={itemLink} className={classes.serviceText}>
                        {name}
                      </Link>
                    </li>
                  </div>
                );
              }

              return (
                <Typography
                  key={_id}
                  variant="body2"
                  style={{position: 'relative'}}
                >
                  {badge ? (
                    <ACBadge
                      extraClasses={{
                        icon: classes.serviceBadge,
                        tooltip: classes.serviceTooltip,
                      }}
                      key="misc"
                      type={badge}
                      width="48px"
                      height="48px"
                    />
                  ) : (
                    <ACBadge
                      extraClasses={{
                        icon: classes.serviceBadge,
                        tooltip: classes.serviceTooltip,
                      }}
                      key="misc"
                      type="misc"
                      width="45px"
                      height="45px"
                    />
                  )}
                  <Link to={itemLink} className={classes.serviceText}>
                    {name}
                  </Link>
                </Typography>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Services;
