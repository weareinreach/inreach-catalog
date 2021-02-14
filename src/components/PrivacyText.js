import React from 'react';
import Typography from '@material-ui/core/Typography';
import {FormattedMessage} from 'react-intl';

const PrivacyText = () => (
  <Typography variant="body1">
    <FormattedMessage id="legal.privacy-google-analytics-usage"/>
    {' '}
    <FormattedMessage id="legal.privacy-anonymized-addresses">
      { anonymized => <a href="https://support.google.com/analytics/answer/2763052?hl=en"
      target="_blank"
      rel="noopener noreferrer">{anonymized}</a>} 
    </FormattedMessage> 
    {' '}
    <FormattedMessage id="legal.privacy-google-analytics-scope" /> 
    {' '}
    <FormattedMessage id="legal.privacy-here">{here => <a
      href="https://tools.google.com/dlpage/gaoptout"
      target="_blank"
      rel="noopener noreferrer"
    >
      {here}
    </a>}</FormattedMessage>
  </Typography>
);

export default PrivacyText;
