export const uniqueId = () => {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = (Math.random() * 16) | 0,
			v = c === 'x' ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
};

export const findItemIndexById = <
	T extends {
		id: string;
		title: string;
	}
>(
	items: T[],
	id: string,
	title?: string
) => {
	return items.findIndex((item: T) => item.id === id || item.title === title);
};
