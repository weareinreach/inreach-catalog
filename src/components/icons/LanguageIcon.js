import React from 'react';
import PropTypes from 'prop-types';

const LanguageIcon = ({width, color}) => (
  <svg id="923c45f5-476a-41e2-a79b-d6c326607a73" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width={width}><title>icon-language</title><path d="M19.55,23.12,19,24.5h-.78l2.06-5.41h.79l2,5.41h-.77l-.53-1.37Zm2-.66-.9-2.4-.9,2.4Z" fill={color}/><path d="M30.14,22.48a7.89,7.89,0,0,1-1.82,3.28c.16.14.32.26.48.37a9.6,9.6,0,0,0,2.7,1.33.32.32,0,0,1,.25.31.34.34,0,0,1,0,.13.32.32,0,0,1-.31.26.51.51,0,0,1-.19,0,9.15,9.15,0,0,1-2.88-1.51c-.17-.14-.33-.26-.49-.41-.16.14-.32.27-.49.4a10.5,10.5,0,0,1-2.85,1.52l-.15,0a.33.33,0,0,1-.33-.24.34.34,0,0,1,0-.13.36.36,0,0,1,.26-.32A9.19,9.19,0,0,0,27.14,26l.24-.2a8.09,8.09,0,0,1-1.8-3.28H24.24c-.15,0-.23-.14-.23-.32s.08-.3.23-.3h3.23v-1.1c0-.16.13-.28.34-.28s.35.12.35.28v1.1h3.37c.14,0,.23.13.23.3s-.09.32-.23.32Zm-3.89,0a7.21,7.21,0,0,0,1.6,2.82,6.7,6.7,0,0,0,1.57-2.82Z" fill={color}/><path d="M36,15.76H14a1.32,1.32,0,0,0-1.32,1.32v13.1A1.32,1.32,0,0,0,14,31.5H28.9l4.73,2.75V31.5H36a1.32,1.32,0,0,0,1.32-1.32V17.08A1.32,1.32,0,0,0,36,15.76Z" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.82"/></svg>
);

LanguageIcon.defaultProps = { width: '100%', color: '#000' }
LanguageIcon.propTypes = { width: PropTypes.string, color: PropTypes.string }

export default LanguageIcon;
