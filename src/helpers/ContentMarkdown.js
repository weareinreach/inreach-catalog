import React from 'react';
import ReactMarkdown from 'react-markdown';

const ContentMarkdown = (props) => {
   return (
     <ReactMarkdown {...props} source={props.source} unwrapDisallowed={true} disallowedTypes={['paragraph']} linkTarget={(url, text, title) => {
        if(url[0] === '#') {
          return undefined;
        } else {
          return '_blank'
        }
     }} />
   );
 };

 export default ContentMarkdown;