export const communityReviewerVerifyOptions = [
	{
		dbValue: true,
		formatMessageId: 'form.yes',
		defaultMessage: 'yes',
		description: 'yes option'
	},
	{
		dbValue: false,
		formatMessageId: 'form.no',
		defaultMessage: 'no',
		description: 'no option'
	}
];

export const handleRadioButton = (answer) => {
	if (answer === 'true') {
		return true;
	} else if (answer === 'false') {
		return false;
	}
};
