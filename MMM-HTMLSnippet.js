/* Magic Mirror
* Module: MMM-HTMLSnippet
*
* By ulrichwisser
*/

Module.register("MMM-HTMLSnippet",{
	defaults: {
		html: "",
		height: "10px",
	},

	start: function() {
		let self = this;

		// send config to node helper
		this.sendSocketNotification("INIT", this.config)

		// Schedule update timer.
		this.scheduleUpdate(2000);
	},
	
	getScripts: function() {
		return [
			'https://rawgit.com/davidjbradshaw/iframe-resizer/master/js/iframeResizer.min.js'
		]
	},
	

	scheduleUpdate: function(delay) {
		let self = this
		let nextLoad = self.config.updateInterval;
		if (typeof delay !== "undefined" && delay >= 0) {
			nextLoad = delay;
		}
		setTimeout(function() {
			self.updateDom();
			self.scheduleUpdate();
		}, nextLoad);
	},

	getDom: function() {
		let self = this
		var wrapper = document.createElement("iframe")
		wrapper.id = "HTMLSNIPPET"
		wrapper.className = "htmlsnippet module"
		wrapper.style.width = self.config.width
		wrapper.style.height = self.config.height
		wrapper.style.border = "none"
		wrapper.style.display = "block"
		wrapper.style.overflow = "hidden"
		wrapper.style.backgroundColor = self.config.backgroundColor
		wrapper.scrolling = "no"
		wrapper.src = self.config.html
		iFrameResize({ log: true }, '#HTMLSNIPPET')
		wrapper.onload = (e) => {
			if (wrapper.contentWindow.closed) {
		    		alert("onload called" + wrapper.contentWindow.closed + "source: " + e);
			}
		};

		return wrapper
	},

	suspend: function() {
		var doms = document.getElementsByClassName("htmlsnippet")
		if (doms.length > 0) {
			for (let dom of doms) {
				dom.style.display = "none"
			}
		}
	},

	resume: function() {
		var doms = document.getElementsByClassName("htmlsnippet")
		if (doms.length > 0) {
			for (let dom of doms) {
				dom.style.display = "block"
			}
		}
	},

}
)
