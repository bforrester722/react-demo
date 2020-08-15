
export function wait(waitTime, callback) {
	return new Promise(resolve => {
		window.setTimeout(() => {
			window.requestAnimationFrame(() => {
				if (!callback) { resolve(); }
				if (typeof callback === 'function') {
	    		resolve(callback());
	    	}
			});
		}, waitTime);
	});
};