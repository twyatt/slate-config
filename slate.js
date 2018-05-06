/*
 *                 ______________    ______________
 *                |              |  |              |
 *                |    monitor   |  |    monitor   |
 *     ________   |    middle    |  |     right    |
 *    | laptop |  |              |  |              |
 *    |  left  |   --------------    -------------- 
 *    |--------|         ||                ||
 *   /__________\       ====              ====
 */
 
var laptopLeft    = "0";
var monitorMiddle = "1";
var monitorRight  = "2";

var moveToLeftDisplay = S.operation("move", {
	"screen": laptopLeft,
	"x": "screenOriginX",
	"y": "screenOriginY",
	"width": "screenSizeX",
	"height": "screenSizeY"
});
var moveToMiddleDisplay = S.operation("move", {
	"screen": monitorMiddle,
	"x": "screenOriginX",
	"y": "screenOriginY",
	"width": "screenSizeX",
	"height": "screenSizeY"
});
var moveToRightDisplay = S.operation("move", {
	"screen": monitorRight,
	"x": "screenOriginX",
	"y": "screenOriginY",
	"width": "screenSizeX",
	"height": "screenSizeY"
});

/*
var emulatorWidth = "480";
var emulatorHeight = "768";

var androidEmulatorOperation = function(windowObject) {
	var title = windowObject.title();
	var regex = /^Genymotion.*API (\d+).*$/;
	if (title !== undefined && title.match(regex)) {
		S.log("Found emulator: " + title);

		match = regex.exec(title);
		if (match != null) {
			api = match[1];

			var offset;
			switch (api) {
				default: // fall thru intentional
				case '23':
					offset = 0;
					break;
				case '21':
					offset = 1;
					break;
				case '18':
					offset = 2;
					break;
				case '16':
					offset = 3;
					break;
			}

			var screenOffsetX = emulatorWidth * (offset + 1);
			var operation = S.operation("move", {
				"screen": monitorViewSonicRight,
				"x": "screenOriginX+screenSizeX-" + screenOffsetX,
				"y": "screenOriginY",
				"width": emulatorWidth,
				"height": emulatorHeight
			});
			windowObject.doOperation(operation);
		}
	}
}
*/

var threeDisplayLayout = S.layout("threeMonitor", {
	"Google Chrome": {
		operations: [moveToLeftDisplay],
		repeat: true
	},
	"Safari": {
		operations: [moveToLeftDisplay],
		repeat: true
	},
	"Slack": {
		operations: [moveToLeftDisplay]
	},
	"Spotify": {
		operations: [moveToLeftDisplay]
	},
	"Android Studio": {
		operations: [function(windowObject) {
			var title = windowObject.title();
			if (title == "Logcat") {
				windowObject.doOperation(moveToRightDisplay);
			} else if (title != "Welcome to Android Studio") {
				windowObject.doOperation(moveToMiddleDisplay);
			}
		}],
		repeat: true
	},
	"iTerm2": {
		operations: [
			S.operation("move", {
				"screen": monitorRight,
				"x": "screenOriginX + 15",
				"y": "screenOriginY + 15",
				"width": "screenSizeX * 2/3",
				"height": "screenSizeY - 25"
			})
		],
		repeat: true
	}/*,
	"player": {
		"operations": [androidEmulatorOperation],
		"ignore-fail": true,
		"repeat": true
	}*/
});

// S.default(1, oneDisplayLayout);
// S.default(2, twoDisplayLayout);
S.default(3, threeDisplayLayout);

var threeDisplays = S.operation("layout", {
	"name": threeDisplayLayout
});
var universialLayout = function() {
	S.log("screen count = " + S.screenCount());

	if (S.screenCount() === 3) {
		threeDisplays.run();
	}
};

S.bindAll({
	"0:ctrl": universialLayout,
	"pad0:ctrl": universialLayout
});
