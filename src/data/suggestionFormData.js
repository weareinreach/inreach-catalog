export const features = [
	{
		label: 'resource-property.has-confidentiality-policy',
		name: 'has-confidentiality-policy',
		value: false
	},
	{
		label: 'resource-property.free-of-cost',
		name: 'cost-free',
		value: false
	}
];

export const requirements = [
	{
		label: 'resource-property.photo-id',
		name: 'req-photo-id',
		value: false
	},
	{
		label: 'resource-property.proof-of-income',
		name: 'req-proof-of-income',
		value: false
	},
	{
		label: 'resource-property.proof-of-age',
		name: 'req-proof-of-age',
		value: false
	},
	{
		label: 'resource-property.medical-insurance',
		name: 'req-medical-insurance',
		value: false
	},
	{
		label: 'resource-property.proof-of-residence',
		name: 'req-proof-of-residence',
		value: false
	},
	{
		label: 'resource-property.referral',
		name: 'req-referral',
		value: false
	}
];

export const suggestEditsOptions = {
	RESOURCE_IS_CLOSED: {
		label: 'resource.suggest-edits-closed-or-inactive',
		dbValue: 'This resource is closed or inactive'
	},
	CONTACT_LOCATION_INCORRECT: {
		label: 'resource.suggest-edits-contact-location-incorrect',
		dbValue: ' Contact or location information is incorrect'
	},
	DESCRIPTION_INACCURATE: {
		label: 'resource.suggest-edits-inaccurate-description',
		dbValue: 'Description is inaccurate'
	},
	OTHER: {label: 'resource.suggest-edits-other', dbValue: 'Other'}
};
