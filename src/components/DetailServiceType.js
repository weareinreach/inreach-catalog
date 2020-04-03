import React from 'react';
import Grid from '@material-ui/core/Grid';

import ACBadge from './Badge';
import resourceTypes from '../utils/resourceTypes';

const ServiceType = (props) => {
  const tags = resourceTypes.getResourceIndex(props.locale);
  let listedTags = [];
  let unfoundTags = [];
  let subcategories = [];
  let categories = [];
  let list = false;

  if (props.list && props.list.length) {
    props.list.map((item) => {
      let tag = typeof tags[item] !== 'undefined' ? tags[item] : item;

      if (tag.title) {
        subcategories.push(tag);
      } else if (tag.category) {
        categories.push(tag);
      } else {
        unfoundTags.push(tag);
      }

      return null;
    });

    list = subcategories
      .map((subcategory) => ({
        label: subcategory.title,
        type: subcategory.type,
      }))
      .concat(
        categories.length
          ? categories
              .filter((category) => {
                return (
                  subcategories.filter(
                    (subcategory) => subcategory.category === category.category
                  ).length === 0
                );
              })
              .map((category) => ({
                label: category.category,
                type: category.type,
              }))
          : [],
        unfoundTags.length
          ? unfoundTags.map((unfound) => ({label: unfound, type: 'misc'}))
          : []
      );
  }

  return (
    <Grid container spacing={0}>
      <Grid item xs={12} className={props.classes.sectionSpacing}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            {list
              ? list.map((tag, index) => {
                  if (
                    listedTags.indexOf(tag.label) < 0 &&
                    tag.type !== 'misc'
                  ) {
                    listedTags.push(tag.label);
                    return (
                      <span key={index} style={{position: 'relative'}}>
                        <ACBadge
                          extraClasses={{
                            icon: props.classes.serviceBadge,
                            tooltip: props.classes.serviceTooltip,
                          }}
                          type={tag.type}
                          mobileLabel={tag.label}
                          width="48px"
                          height="48px"
                        />
                        {!props.isMobile && (
                          <p className={props.classes.serviceText}>
                            {tag.label}
                          </p>
                        )}
                      </span>
                    );
                  }

                  return null;
                })
              : null}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ServiceType;
