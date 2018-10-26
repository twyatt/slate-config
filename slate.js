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
	}
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
