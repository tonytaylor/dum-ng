var sys = require('system');

function waitFor(testFx, onReady, timeOutMs) {
	var maxTimeoutMs = timeOutMs ? timeOutMs : 3001,
		start = new Date().getTime(),
		condition = false,
		interval = setInterval(function () {
			if ((new Date().getTime() - start < maxTimeoutMs) && !condition) {
				condition = (typeof(testFx) === 'string' ? eval(testFx) : testFx.call(null));
			} else {
				if (!condition) {
					console.log('"waitFor()" timeout');
					phantom.exit();
				} else {
					console.log('"waitFor()" finished in ' + (new Date().getTime() - start) + 'ms.');
					typeof(onReady) === 'string' ? eval(onReady) : onReady.call(null);
					clearInterval(interval);
				}
			}
		}, 100); // repeat
		
}

if (sys.args.length !== 2) {
	console.log('Usage: jas-runner.js URL');
	phantom.exit(1);
}

var page = require('webpage').create();

page.onConsoleMessage = function (msg) {
	console.log(msg);
};

page.open(sys.args[1], function (status) {
	if (status !== 'success') {
		console.log('unable to access network');
		phantom.exit();
	} else {
		waitFor(function () {
			return page.evaluate(function () {
				return document.body.querySelector('.symbolSummary .pending') === null;
			});
		}, function () {
			var exitCode = page.evaluate(function () {
				console.log('');
				console.log(document.body.querySelector('.description').innerText);
				var list = document.body.querySelectorAll('.results > #details > .specDetail.failed');
				if (list && list.length > 0) {
					for (var i = 0, j = list.length; i < j; ++i) {
						var el = list[i],
							desc = el.querySelector('.description'),
							msg = el.querySelector('.resultMessage.fail');

						console.log('');
						console.log(desc.innerText);
						console.log(msg.innerText);
						console.log('');
					}
					return 1;
				} else {
					console.log(document.body.querySelector('.alert > .passingAlert').innerText);
					return 0;
				}
			});
			phantom.exit(exitCode);
		});
	}
});
