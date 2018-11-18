const localEvent = function (item) {
	this.get = () => localStorage.getItem(item) ? JSON.parse(localStorage.getItem(item)) : '';
	this.set = (obj) => {
		localStorage.setItem(item, JSON.stringify(obj));
	}
	this.clear = () => {
		localStorage.removeItem(item);
	}
}

export const user_info = new localEvent("user_info");
export const getDate = () => {
	const date = new Date();
	mouth = parseInt(date.getMonth()) + 1;
	return date.getTime();
}
