export const distanceOptions = [
	{
		searchValue: 'isNational',
		distanceFormatMessageId: 'search.diatance-nationally',
		distanceDeaultMessage: 'Nationally',
		description:
			'option to show organizations that can serve people nationally',
		selectionMessageFormatMessageId:
			'search.show-national-organizations-country',
		selectionMessageDefaultMessage:
			'Show me national organizations who can help anyone located in the country',
		selectedDescription:
			'text to indicate results will be for organizations who can help anyone located in the selected country'
	},
	{
		searchValue: '100',
		distanceFormatMessageId: 'search.distance-100',
		distanceDefaultMessage: '100 miles',
		description: 'distance range option - up to 100miles or 160km',
		selectionMessageFormatMessageId: 'search.distance-message-100',
		selectionMessageDefaultMessage:
			'Show search results within 100miles/160km of ',
		selectedDescription:
			'text to indicate results will be within 100miles/160km of the specified search location'
	},
	{
		searchValue: '200',
		distanceFormatMessageId: 'search.distance-200',
		distanceDefaultMessage: '200 miles',
		description: 'distance range option - up to 200miles or 320km',
		selectionMessageFormatMessageId: 'search.distance-message-200',
		selectionMessageDefaultMessage:
			'Show search results within 200miles/320km of ',
		selectedDescription:
			'text to indicate results will be within 200miles/320km of the specified search location'
	}
];
