import React from 'react';
import {useIntl} from 'react-intl';

import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';

function Filter(props) {
	const {
		className,
		inputClassName,
		filteredLanguageValue,
		handleOnChange,
		handleOnClick
	} = props;

	const intl = useIntl();

	return (
		<FormControl className={className}>
			<Input
				disableUnderline={true}
				id="languageInput"
				value={filteredLanguageValue}
				onChange={handleOnChange}
				onClick={handleOnClick}
				className={inputClassName}
				placeholder={intl.formatMessage({
					id: 'form.filter-generic-placeholder'
				})}
			/>
		</FormControl>
	);
}

export default Filter;
