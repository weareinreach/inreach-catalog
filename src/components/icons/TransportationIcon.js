import React from 'react';
import PropTypes from 'prop-types';

const TransportationIcon = ({width, fillColor}) => (
<svg xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink'
width={width} viewBox='0 0 36 37'>
    <defs>
        <path id='a' d='M0 .127h34.873V35H0z' />
    </defs>
    <g fill='none' fillRule='evenodd'>
        <g transform='translate(.297 .794)'>
            <mask id='b' fill='#fff'>
                <use xlinkHref='#a' />
            </mask>
            <path fill={fillColor} d='M34.873 17.563c0 9.63-7.807 17.437-17.437 17.437C7.807 35 0 27.194 0 17.563 0 7.933 7.807.127 17.436.127c9.63 0 17.437 7.806 17.437 17.436'
            mask='url(#b)' />
        </g>
        <g stroke='#FFF' strokeWidth='0.5'>
            <path strokeLinecap='round' strokeLinejoin='round' d='M23.827 26.914H11.554a1.712 1.712 0 0 1-1.707-1.707V10.17c0-.94.768-1.708 1.707-1.708h12.273c.94 0 1.708.769 1.708 1.708v15.037c0 .939-.769 1.707-1.708 1.707z'
            />
            <path strokeLinecap='round' strokeLinejoin='round' d='M23.45 20.854H11.932a.856.856 0 0 1-.853-.853v-7.903c0-.47.384-.854.853-.854h11.52c.469 0 .853.384.853.854V20c0 .47-.384.853-.853.853z'
            />
            <path d='M20.645 10.295h-5.909a.414.414 0 0 1 0-.826h5.91a.414.414 0 0 1 0 .826z'
            />
            <path strokeLinecap='round' strokeLinejoin='round' d='M14.816 23.692a1.525 1.525 0 1 1-3.05 0 1.525 1.525 0 0 1 3.05 0zM23.614 23.692a1.525 1.525 0 1 1-3.049 0 1.525 1.525 0 0 1 3.05 0zM12.893 28.59h-.797a.84.84 0 0 1-.838-.838.84.84 0 0 1 .838-.838h.797a.84.84 0 0 1 .838.838.84.84 0 0 1-.838.838zM23.492 28.59h-.797a.84.84 0 0 1-.838-.838.84.84 0 0 1 .838-.838h.797a.84.84 0 0 1 .838.838.84.84 0 0 1-.838.838z'
            />
        </g>
    </g>
</svg>
);

TransportationIcon.defaultProps = { width: '100%', fillColor: '#5073B3' }
TransportationIcon.propTypes = { width: PropTypes.string, fillColor: PropTypes.string }

export default TransportationIcon;
