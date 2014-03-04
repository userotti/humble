/*
Name: 			Style Switcher Initializer
Written by: 	Crivos - (http://www.crivos.com)
Version: 		1.0
*/

var styleSwitcher = {

	initialized: false,
	options: {
		color: '#CCC',
		gradient: 'true'
	},

	initialize: function() {

		var $this = this;

		if (this.initialized) return;

		// Style Switcher Cache Script
		jQuery.styleSwitcherCachedScript = function( url, options ) {
			options = $.extend( options || {}, {
				dataType: "script",
				cache: true,
				url: url
			});
			return jQuery.ajax( options );
		};

		// Style Switcher CSS
		$("head").append($('<link rel="stylesheet">').attr("href", "master/style-switcher/style-switcher.css") );
		$("head").append($('<link rel="stylesheet/less">').attr("href", "master/less/skin.less") );
		$("head").append($('<link rel="stylesheet">').attr("href", "master/style-switcher/colorpicker/css/colorpicker.css") );

		$.styleSwitcherCachedScript("master/style-switcher/colorpicker/js/colorpicker.js").done(function(script, textStatus) {

			less = {
				env: "development"
			};

			$.styleSwitcherCachedScript("master/less/less.js").done(function(script, textStatus) {

				$this.build();
				$this.events();

				if($.cookie("colorGradient") != null) {
					$this.options.gradient = $.cookie("colorGradient");
				}

				if($.cookie("skin") != null) {
					$this.setColor($.cookie("skin"));
				} else {
					$this.container.find("ul[data-type=colors] li:first a").click();
				}

				if($.cookie("layout") != null)
					$this.setLayoutStyle($.cookie("layout"));

				if($.cookie("pattern") != null)
					$this.setPattern($.cookie("pattern"));

				if($.cookie("initialized") == null) {
					$this.container.find("h4 a").click();
					$.cookie("initialized", true);
				}

				$this.initialized = true;

			});
		});

		$.styleSwitcherCachedScript("master/style-switcher/cssbeautify/cssbeautify.js").done(function(script, textStatus) {});

	},

	build: function() {

		var $this = this;

		// Base HTML
		var switcher = $("<div />")
			.attr("id", "styleSwitcher")
			.addClass("style-switcher visible-lg")
			.append(
				$("<h4 />")
					.html("Style Switcher")
					.append(
						$("<a />")
							.attr("href", "#")
							.append(
								$("<i />")
									.addClass("icon icon-cogs")
							)
					),
				$("<div />")
					.addClass("style-switcher-mode")
					.append(
						$("<div />")
							.addClass("options-links mode")
							.append(
								$("<a />")
									.attr("href", "#")
									.attr("data-mode", "basic")
									.addClass("active")
									.html("Basic"),
								$("<a />")
									.attr("href", "#")
									.attr("data-mode", "advanced")
									.html("Advanced")
							)
					),
				$("<div />")
					.addClass("style-switcher-wrap")
					.append(
						$("<h5 />")
							.html("Colors"),
						$("<ul />")
							.addClass("options colors")
							.attr("data-type", "colors"),
						$("<h5 />")
							.html("Layout Style"),
						$("<div />")
							.addClass("options-links layout")
							.append(
								$("<a />")
									.attr("href", "#")
									.attr("data-layout-type", "wide")
									.addClass("active")
									.html("Wide"),
								$("<a />")
									.attr("href", "#")
									.attr("data-layout-type", "boxed")
									.html("Boxed")
							),
						$("<h5 />")
							.html("Website Type"),
						$("<div />")
							.addClass("options-links website-type")
							.append(
								$("<a />")
									.attr("href", "index.html")
									.attr("data-website-type", "normal")
									.html("Normal"),
								$("<a />")
									.attr("href", "index-one-page.html")
									.attr("data-website-type", "one-page")
									.html("One Page")
							),
						$("<div />")
							.hide()
							.addClass("patterns")
							.append(
								$("<h5 />")
									.html("Background Patterns"),
								$("<ul />")
									.addClass("options")
									.attr("data-type", "patterns")
							),
						$("<hr />"),
						$("<div />")
							.addClass("options-links")
							.append(
								$("<a />")
									.addClass("reset")
									.attr("href", "#")
									.html("Reset"),
								$("<a />")
									.addClass("get-css")
									.attr("href", "#getCSSModal")
									.html("Get Skin CSS")
							)
					)
			);

		$("body").append(switcher);

		var modalHTML = '<div class="modal fade" id="getCSSModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"> <div class="modal-dialog"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button> <h4 class="modal-title" id="cssModalLabel">Skin CSS</h4> </div> <div class="modal-body"> <div class="alert alert-info fade in" id="addBoxedClassInfo">Please add the <strong>&quot;boxed&quot;</strong> class to the &lt;body&gt; element.</div><textarea id="getCSSTextarea" class="get-css" readonly></textarea></div> </div> </div> </div> </div>';

		$("body").append(modalHTML);

		this.container = $("#styleSwitcher");

		// Switcher Mode
		this.container.find("div.options-links.mode a").click(function(e) {

			e.preventDefault();

			var modeContainer = $(this).parents(".mode");

			modeContainer.find("a.active").removeClass("active");
			$(this).addClass("active");

			if($(this).attr("data-mode") == "advanced") {
				$("#styleSwitcher").addClass("advanced").removeClass("basic");
			} else {
				$("#styleSwitcher").addClass("basic").removeClass("advanced");
			}

		});

		// Colors Skins
		var colors = [
			{"Hex": "#0088CC", "colorName": "Blue"},
			{"Hex": "#4EB25C", "colorName": "Green"},
			{"Hex": "#4A5B7D", "colorName": "Navy"},
			{"Hex": "#E05048", "colorName": "Red"},
			{"Hex": "#B8A279", "colorName": "Beige"},
			{"Hex": "#c71c77", "colorName": "Pink"},
			{"Hex": "#734BA9", "colorName": "Purple"},
			{"Hex": "#2BAAB1", "colorName": "Cyan"}
		];

		var colorList = this.container.find("ul[data-type=colors]");

		$.each(colors, function(i, value) {

			var color = $("<li />")
							.append(
								$("<a />")
									.css("background-color", colors[i].Hex)
									.attr({
										"data-color-hex": colors[i].Hex,
										"data-color-name": colors[i].colorName,
										"href": "#",
										"title": colors[i].colorName
									})
							);

			colorList.append(color);

		});

		if($.cookie("skin") != null) {
			var currentSkinColor = $.cookie("skin");
		} else {
			var currentSkinColor = colors[0].Hex;
		}

		var colorGradient = $("<div />")
								.addClass("color-gradient")
								.append(
									$("<input />")
										.attr("id", "colorGradient")
										.attr("checked", $this.options.gradient)
										.attr("type", "checkbox"),
									$("<label />")
										.attr("for", "colorGradient")
										.html("Gradient")
								);

		var colorPicker = $("<div />")
								.attr("id", "colorPickerHolder")
								.attr("data-color", currentSkinColor)
								.attr("data-color-format", "hex")
								.addClass("color-picker");

		colorList.before(colorGradient, colorPicker);

		colorList.find("a").click(function(e) {
			e.preventDefault();
			$this.setColor($(this).attr("data-color-hex"));
			$("#colorPickerHolder").ColorPickerSetColor($(this).attr("data-color-hex"));
		});

		$("#colorPickerHolder").ColorPicker({
			color: currentSkinColor,
			flat: true,
			livePreview: false,
			onChange: function (hsb, hex, rgb) {
				$this.setColor("#" + hex);
			}
		});

		$("#colorPickerHolder .colorpicker_color, #colorPickerHolder .colorpicker_hue").on("mousedown", function(e) {
			e.preventDefault();
			$this.isChanging = true;
		}).on("mouseup", function(e) {
			e.preventDefault();
			$this.isChanging = false;
			setTimeout(function() {
				$this.setColor("#" + $("#colorPickerHolder .colorpicker_hex input").val());
			}, 100);
		});

		if($.cookie("colorGradient") == "false") {
			$("#colorGradient").removeAttr("checked");
		}

		$("#colorGradient").on("change", function() {
			var active = $(this).is(":checked").toString();
			$this.options.gradient = active;
			$this.setColor($this.options.color);
			$.cookie("colorGradient", active);
		});

		// Layout Styles
		this.container.find("div.options-links.layout a").click(function(e) {

			e.preventDefault();
			$this.setLayoutStyle($(this).attr("data-layout-type"), true);

		});

		// Website Type
		this.container.find("div.options-links.website-type a").click(function(e) {

			e.preventDefault();
			$.cookie("showSwitcher", true);
			self.location = $(this).attr("href");

		});

		if($("body").hasClass("one-page")) {
			this.container.find("div.options-links.website-type a:last").addClass("active");
			this.container.find("div.options-links.layout").prev().remove();
			this.container.find("div.options-links.layout").remove();
		} else {
			this.container.find("div.options-links.website-type a:first").addClass("active");
		}

		// Background Patterns
		var patterns = ["gray_jean", "linedpaper", "az_subtle", "blizzard", "denim", "fancy_deboss", "honey_im_subtle", "linen", "pw_maze_white", "skin_side_up", "stitched_wool", "straws", "subtle_grunge", "textured_stripes", "wild_oliva", "worn_dots", "bright_squares", "random_grey_variations"];

		var patternsList = this.container.find("ul[data-type=patterns]");

		$.each(patterns, function(key, value) {

			var pattern = $("<li />")
							.append(
								$("<a />")
									.addClass("pattern")
									.css("background-image", "url(img/patterns/" + value + ".png)")
									.attr({
										"data-pattern": value,
										"href": "#",
										"title": value.charAt(0).toUpperCase() + value.slice(1)
									})
							);

			patternsList.append(pattern);

		});

		patternsList.find("a").click(function(e) {
			e.preventDefault();
			$this.setPattern($(this).attr("data-pattern"));
		});

		// Reset
		$this.container.find("a.reset").click(function(e) {
			e.preventDefault();
			$this.reset();
		});

		// Get CSS
		$this.container.find("a.get-css").click(function(e) {
			e.preventDefault();
			$this.getCss();
		});

	},

	events: function() {

		var $this = this;

		$this.container.find("h4 a").click(function(e){

			e.preventDefault();

			if($this.container.hasClass("active")) {

				$this.container.animate({
					left: "-" + $this.container.width() + "px"
				}, 300).removeClass("active");

			} else {

				$this.container.animate({
					left: "0"
				}, 300).addClass("active");

			}

		})

		if($.cookie("showSwitcher") != null || $("body").hasClass("one-page")) {
			$this.container.find("h4 a").click();
			$.removeCookie("showSwitcher");
		}

	},

	setColor: function(color) {

		var $this = this;

		if(this.isChanging) {
			return false;
		}

		$this.options.color = color;

		less.modifyVars({ gradient : $this.options.gradient, skinColor : color });
		$.cookie("skin", color);

		// Default Logo
		if(color == this.container.find("ul[data-type=colors] li:first a").attr("data-color-hex")) {
			$("h1.logo img").attr("src", "img/logo-default.png");
		} else {
			$("h1.logo img").attr("src", "img/logo.png");
		}

	},

	setLayoutStyle: function(style, refresh) {

		if($("body").hasClass("one-page"))
			return false;

		$.cookie("layout", style);

		if(refresh) {
			$.cookie("showSwitcher", true);
			window.location.reload();
			return false;
		}

		var layoutStyles = this.container.find("div.options-links.layout");
		var backgroundPatterns = this.container.find("div.patterns");

		layoutStyles.find("a.active").removeClass("active");
		layoutStyles.find("a[data-layout-type=" + style + "]").addClass("active");

		if(style == "wide") {
			backgroundPatterns.hide();
			$("body").removeClass("boxed");
			$("link[href*='bootstrap-responsive']").attr("href", "css/bootstrap-responsive.css");

			$.removeCookie("pattern");

		} else {
			backgroundPatterns.show();
			$("body").addClass("boxed");
			$("link[href*='bootstrap-responsive']").attr("href", "css/bootstrap-responsive-boxed.css");

			if($.cookie("pattern") == null)
				this.container.find("ul[data-type=patterns] li:first a").click();

		}

	},

	setPattern: function(pattern) {

		var isBoxed = $("body").hasClass("boxed");

		if(isBoxed) $("body").css("background-image", "url(img/patterns/" + pattern + ".png)")

		$.cookie("pattern", pattern);

	},

	reset: function() {

		$.removeCookie("skin");
		$.removeCookie("layout");
		$.removeCookie("pattern");
		$.removeCookie("colorGradient");

		$.cookie("showSwitcher", true);
		window.location.reload();

	},

	getCss: function() {

		raw = "";

		var isBoxed = $("body").hasClass("boxed");

		if(isBoxed) {
			raw = 'body { background-image: url("img/patterns/' + $.cookie("pattern") + '.png"); }';
			$("#addBoxedClassInfo").show();
		} else {
			$("#addBoxedClassInfo").hide();
		}

		$("#getCSSTextarea").text("");

		$("#getCSSTextarea").text($('style[id^="less:"]').text());

		$("#getCSSModal").modal("show");

		options = {
			indent: "\t",
			autosemicolon: true
		};

		raw = raw + $("#getCSSTextarea").text();

		$("#getCSSTextarea").text(cssbeautify(raw, options));

	}

};

styleSwitcher.initialize();