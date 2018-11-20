import React from 'react';
import ReactMarkdown from 'react-markdown';

const ContentMarkdown = (props) => {
   return (
     <ReactMarkdown {...props} source={props.source} unwrapDisallowed={true} disallowedTypes={['paragraph']} />
   );
 };

 export default ContentMarkdown;