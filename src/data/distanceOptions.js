export const distanceOptions = [
	{
		searchValue: 'isNational',
		distanceFormatMessageId: 'National',
		distanceDeaultMessage: 'National',
		description:
			'option to show organizations that can serve people nationally',
		selectionMessageformatMessageId:
			'Show me national organizations who can help anyone located in the United States',
		selectionMessagedefaultMessage:
			'Show me national organizations who can help anyone located in the United States',
		selectedDescription:
			'text to indicate results will be for organizations who can help anyone located in the United States'
	},
	{
		searchValue: '100',
		distanceFormatMessageId: 'within 100 miles',
		distanceDefaultMessage: 'within 100 miles',
		description: 'distance range option - up to 100miles or 62km',
		selectionMessageformatMessageId:
			'Show search results within 100miles/62km of ',
		selectionMessagedefaultMessage:
			'Show search results within 100miles/62km of ',
		selectedDescription:
			'text to indicate results will be within 100miles/62km of the specified search location'
	},
	{
		searchValue: '200',
		distanceFormatMessageId: 'within 200 miles',
		distanceDefaultMessage: 'within 200 miles',
		description: 'distance range option - up to 200miles or 124km',
		selectionMessageformatMessageId:
			'Show search results within 200miles/124km of ',
		selectionMessagedefaultMessage:
			'Show search results within 200miles/124km of ',
		selectedDescription:
			'text to indicate results will be within 200miles/124km of the specified search location'
	}
];
