export const isInList = (target, list) => {
	if (!list.items || list.items?.length <= 0) {
		return false;
	}
	return list.items.find((it) => it.fetchable_id === target);
};
