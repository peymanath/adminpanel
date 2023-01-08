/**
 * ******************************************************************************
 * 
 * Most of this work is based on the library coded by Sandro Alves Peres
 * <sandrinhodobanjo@yahoo.com.br> 2009-11-17 Thank you Sandro Alves Peres In
 * honor to work done by Mr. Sandro Alves Peres, I marked all functions done by
 * him
 * 
 * The parts regarding Persian calendar is adopted from the "Persian Calendar"
 * in phpClasses by KeyhanSedaghat <keyhansedaghat@netscape.net>
 * 
 * ******************************************************************************
 */
$persianCalendar = {
	/**
	 * text for tooltip of previous month link
	 */
	$_prevMonth : "ماه قبل",

	/**
	 * text for tooltip of next month link
	 */
	$_nextMonth : "ماه بعد",

	/**
	 * array of abbreviations of week days
	 */
	$_weekDays : [ "ش", "ی", "د", "س", "چ", "پ", "آ" ],

	/**
	 * text for tooltip of previous year link
	 */
	$_prevYear : "سال قبل",

	/**
	 * text for tooltip of next year link
	 */
	$_nextYear : "سال بعد",

	/**
	 * number of days in each month
	 */
	$_monthDays : [ 31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29 ],

	/**
	 * array of numbers in Farsi typeface.
	 */
	$_parsi : [ "۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹" ],
	/**
	 * array containing the name of months
	 */
	$_monthNames : [ "فروردین", "اردیبهشت", "خرداد", "تیر", "امرداد", "شهریور",
			"مهر", "آبان", "آذر", "دی", "بهمن", "اسفند" ],

	/**
	 * list of holidays in year format: [ Month, Day, Title ]
	 * 
	 * @author Sandro Alves Peres
	 * 
	 */
	$_holidays : [ [ 1, 1, "نوروز" ], [ 1, 2, "نوروز" ], [ 1, 3, "نوروز" ],
			[ 1, 4, "نوروز" ], [ 1, 13, "سیزده بدر" ],
			[ 12, 29, "روز ملی نفت" ] ],

	/**
	 * directory containing css and gif files for this class DO NOT FORGET the
	 * trailing /!
	 * 
	 * @author Sandro Alves Peres
	 * 
	 */
	$$base : "../public/js/date/view/",

	/**
	 * some special styling for safari and chrome background and border
	 * 
	 * @author Sandro Alves Peres
	 * 
	 */
	$$border : "1px solid #999",
	$$backGround : "#F0F1FF",

	/**
	 * function that will be evaluated after the last step of selecting a date
	 * 
	 * @author Sandro Alves Peres
	 * 
	 */
	$$execFunction : null,

	/**
	 * Reference values used by Khayam for calculations
	 */
	$_Khayamii : [ 5, 9, 13, 17, 21, 25, 29, 34, 38, 42, 46, 50, 54, 58, 62,
			67, 71, 75, 79, 83, 87, 91, 95, 100, 104, 108, 112, 116, 120, 124,
			0 ],
	$_Correcting_Khayam_Year : 0.00000006152,
	$_Khayam_Year : 365.24218956,

	/**
	 * Total days from start of year till end of each month
	 */
	$_mountCounter : [ 0, 31, 62, 93, 124, 155, 186, 216, 246, 276, 306, 336 ],

	/**
	 * Create the calendar skeleton (date picker) for the first time
	 * 
	 * @author Sandro Alves Peres; modified by Keyhan Sedaghat
	 * 
	 */
	$createElements : function() {
		var __$Style = document.createElement("link");
		__$Style.setAttribute("href", $persianCalendar.$$base
				+ "persian_calendar.css");
		__$Style.setAttribute("rel", "stylesheet");
		__$Style.setAttribute("type", "text/css");
		document.getElementsByTagName("head")[0].appendChild(__$Style);

		var divBack = document.createElement("div");
		divBack.style.direction = 'rtl';
		divBack.setAttribute("id", "MYCALENDAR_DIV_BACK");

		var tb = document.createElement("table");
		tb.setAttribute("width", "210");
		tb.setAttribute("border", "0");
		tb.setAttribute("cellSpacing", "0");
		tb.setAttribute("cellPadding", "0");
		tb.setAttribute("id", "MYCALENDAR_MAIN_TB");

		var expSafChr = /Safari|Chrome/gi;
		if (expSafChr.test((new String(navigator.userAgent)))) {
			tb.style.border = $persianCalendar.$$border;
			tb.style.backgroundColor = $persianCalendar.$$backGround;
		}

		tb.insertRow(0);
		tb.rows[0].insertCell(0);
		tb.rows[0].insertCell(1);
		tb.rows[0].insertCell(2);
		tb.rows[0].className = "MYCALENDAR_LINE_TOP";

		var ImgDown = document.createElement("img");
		ImgDown.setAttribute("src", $persianCalendar.$$base + "prev_month.gif");
		ImgDown.setAttribute("border", "0");
		ImgDown.setAttribute("title", $persianCalendar.$_prevMonth);
		ImgDown.onclick = function() {
			$persianCalendar.$changeMonth(-1);
		};
		ImgDown.style.cursor = "pointer";
		tb.rows[0].cells[0].setAttribute("align", "center");
		tb.rows[0].cells[0].setAttribute("vAlign", "middle");
		tb.rows[0].cells[0].appendChild(ImgDown);

		// tb.rows[0].cells[1].style.paddingLeft = "5px";
		tb.rows[0].cells[1].setAttribute("colSpan", "5");
		tb.rows[0].cells[1].setAttribute("align", "center");
		tb.rows[0].cells[1].setAttribute("vAlign", "middle");

		var ImgUp = document.createElement("img");
		ImgUp.setAttribute("src", $persianCalendar.$$base + "next_month.gif");
		ImgUp.setAttribute("border", "0");
		ImgUp.setAttribute("title", $persianCalendar.$_nextMonth);
		ImgUp.onclick = function() {
			$persianCalendar.$changeMonth(1);
		};
		ImgUp.style.cursor = "pointer";
		tb.rows[0].cells[2].setAttribute("align", "center");
		tb.rows[0].cells[2].setAttribute("vAlign", "middle");
		tb.rows[0].cells[2].appendChild(ImgUp);

		tb.insertRow(1);

		for ( var dw in $persianCalendar.$_weekDays) {
			tb.rows[1].insertCell(dw);
			tb.rows[1].cells[dw].setAttribute("width", "30");
			tb.rows[1].cells[dw].setAttribute("align", "center");
			tb.rows[1].cells[dw].setAttribute("vAlign", "middle");
			tb.rows[1].cells[dw].className = "MYCALENDAR_DAY_WEEK";
			tb.rows[1].cells[dw].innerHTML = $persianCalendar.$_weekDays[dw];
		}

		for ( var i = 2; i <= 7; i++) {
			tb.insertRow(i);
			for ( var j = 0; j < 7; j++) {
				tb.rows[i].insertCell(j);
				tb.rows[i].cells[j].setAttribute("width", "30");
				tb.rows[i].cells[j].setAttribute("align", "center");
				tb.rows[i].cells[j].setAttribute("vAlign", "middle");
				tb.rows[i].cells[j].className = "MYCALENDAR_CELL_DAY";
				tb.rows[i].cells[j].innerHTML = "&nbsp;";
			}
		}

		tb.insertRow(8);
		tb.rows[8].insertCell(0);
		tb.rows[8].cells[0].setAttribute("colSpan", "7");
		tb.rows[8].cells[0].setAttribute("align", "center");
		tb.rows[8].cells[0].setAttribute("vAlign", "middle");
		tb.rows[8].cells[0].className = "MYCALENDAR_LINE_BOTTOM";
		var _Bottom = "<img src=\""
				+ $persianCalendar.$$base
				+ "prev_year.gif\" border=\"0\" style=\"cursor:pointer;\" onclick=\"$persianCalendar.$changeYear(-1);\" title=\""
				+ $persianCalendar.$_prevYear + "\" />";
		_Bottom += "<SPAN id=\"MYCALENDAR_SPAN_YEAR\">&nbsp;</SPAN>";
		_Bottom += "<img src=\""
				+ $persianCalendar.$$base
				+ "next_year.gif\" border=\"0\" style=\"cursor:pointer;\" onclick=\"$persianCalendar.$changeYear(1);\" title=\""
				+ $persianCalendar.$_nextYear + "\" />";
		tb.rows[8].cells[0].innerHTML = _Bottom;

		var hdActiveElement = document.createElement("input");
		hdActiveElement.setAttribute("name", "MYCALENDAR_HDACTIVE_ELEMENT");
		hdActiveElement.setAttribute("id", "MYCALENDAR_HDACTIVE_ELEMENT");
		hdActiveElement.setAttribute("type", "hidden");

		var hdYear = document.createElement("input");
		hdYear.setAttribute("name", "MYCALENDAR_HDYEAR");
		hdYear.setAttribute("id", "MYCALENDAR_HDYEAR");
		hdYear.setAttribute("type", "hidden");

		var hdMonth = document.createElement("input");
		hdMonth.setAttribute("name", "MYCALENDAR_HDMONTH");
		hdMonth.setAttribute("id", "MYCALENDAR_HDMONTH");
		hdMonth.setAttribute("type", "hidden");

		divBack.appendChild(tb);

		document.body.appendChild(hdActiveElement);
		document.body.appendChild(hdYear);
		document.body.appendChild(hdMonth);
		document.body.appendChild(divBack);
	},

	/**
	 * Get coordination of objects
	 * 
	 * @author Sandro Alves Peres
	 * 
	 */
	
	$getPosX : function(object) {
		var current_left = 0;

		if (object.offsetParent) {
			while (object.offsetParent) {
				current_left += object.offsetLeft;
				object = object.offsetParent;
			}
		}
		return current_left;
	},

	$getPosY : function(object) {
		var current_top = 0;

		if (object.offsetParent) {
			while (object.offsetParent) {
				current_top += object.offsetTop;
				object = object.offsetParent;
			}
		}
		return current_top;
	},

	/**
	 * Left pad the given text to the mentioned size
	 * 
	 * @author Sandro Alves Peres
	 * 
	 * @param string
	 *            _text; text to be padded
	 * @param integer
	 *            _size; length of the output
	 */
	$zeroPad : function(_text, _size) {
		_size = new Number(_size);
		_getText = new String(_text);
		_getText = "0000000000000000000000" + _getText;

		if ((new String(_text)).length > _size) {
			return (new String(_text));
		} else {
			return _getText.slice(-_size);
		}
	},

	/**
	 * convert number typefaces to Farsi
	 * 
	 * @param string
	 *            numb; number to be converted from Latin (1,2,3,...) into Farsi
	 *            (۱, ۲, ۳, ...)
	 * @returns String; Farsi number string
	 */
	$_ParsiNumber : function(numb) {
		numb = new String(numb);
		var out = "";
		for (i = 0; i < numb.length; i++) {
			out += $persianCalendar.$_parsi[numb[i]];
		}
		return out;
	},

	/**
	 * convert number typefaces from Farsi; reverse the $_ParsiNumber
	 * 
	 * @param string
	 *            numb; Farsi number string (۱, ۲, ۳, ...)
	 * @returns integer; converted number
	 */
	$_ReverseNumber : function(numb) {
		numb = new String(numb);
		var out = "";
		for (i = 0; i < numb.length; i++) {
			out += $persianCalendar.$_parsi.indexOf(numb[i]);
		}
		return parseInt(out, 10);
	},
	/**
	 * Calculate the years from reference Observation year
	 */
	$_calcRasad : function(Year) {
		Rasad = Year + 2346;
		return Rasad;
	},

	/**
	 * Create time object based on current time
	 */
	$_mktime : function() {
		var dt = new Date();
		var timeStamp = dt.getTime() / 1000;
		timeStamp = $persianCalendar.$_zone(timeStamp);
		var Day = Math.floor(timeStamp / 86400);
		Day += 287;
		var Year = Math.floor((Day / $persianCalendar.$_Khayam_Year)
				- (Day * $persianCalendar.$_Correcting_Khayam_Year));
		var dayOfYear = Day - Math.round(Year * $persianCalendar.$_Khayam_Year);
		if (dayOfYear == 0)
			dayOfYear = 366;
		Year += 1348;
		var Month = 0;
		while (Month < 12 && dayOfYear > $persianCalendar.$_mountCounter[Month])
			Month++;
		Day = dayOfYear - $persianCalendar.$_mountCounter[Month - 1];
		return {
			year : Year,
			month : Month,
			day : Day
		};
	},

	/**
	 * Checks the specified year for a leap year
	 */
	$_isLeap : function(Year) {
		Rasad = $persianCalendar.$_calcRasad(Year);
		var yrNam = Rasad % 2820;
		yrNam = yrNam % 128;
		var leapCount = $persianCalendar.$_Khayamii.indexOf(yrNam);
		if (leapCount >= 0) {
			return true;
		}
		return false;
	},

	/**
	 * Check the value for the correct format and range of values Considering
	 * the leap years
	 * 
	 * @author Sandro Alves Peres; modified by Keyhan Sedaghat
	 * 
	 */
	$isDate : function(ID_OBJECT) {
		var arr_date = [];
		var objValue = new String(document.getElementById(ID_OBJECT).value);
		arr_date = objValue.split("/");
		var returning = false;
		objValue = "";
		if (3 == arr_date.length) {
			var Year = new Number(arr_date[0]);
			var Month = new Number(arr_date[1]);
			var Day = new Number(arr_date[2]);
			if (!isNaN(Year) && !isNaN(Month) && !isNaN(Day)) {
				if (Year > 0) {
					if (Year < 1300) {
						Year += 1300;
					}
					if ($persianCalendar.$_isLeap(Year)) {
						$persianCalendar.$_monthDays[11] = 30; // Espand in
						// leap year
					}
					if (Month > 0 && Month <= 12) {
						if (Day > 0
								&& Day <= $persianCalendar.$_monthDays[(Month - 1)]) {
							returning = {
								year : Year,
								month : Month,
								day : Day
							};
							objValue = Year + '/'
									+ $persianCalendar.$zeroPad(Month, 2) + '/'
									+ $persianCalendar.$zeroPad(Day, 2);
						}
					}
				}
			}
		}
		document.getElementById(ID_OBJECT).value = objValue;
		return returning;
	},

	/**
	 * Find day number in the week
	 */
	$_dayOfWeek : function(year, dayOfYear) {
		var Rasad = $persianCalendar.$_calcRasad(year);

		var count2820 = Math.floor(Rasad / 2820);
		var mod2820 = Rasad % 2820;
		count128 = Math.floor(mod2820 / 128);
		var mod128 = mod2820 % 128;

		var leapCount = 0;
		while (mod128 > $persianCalendar.$_Khayamii[leapCount])
			leapCount++;

		var yearStartDay = (count2820 + 1) * 3 + count128 * 5 + mod128
				+ leapCount;
		if (dayOfYear > 0)
			dayOfYear--;
		return (yearStartDay + dayOfYear) % 7;
	},

	/**
	 * Build and open the calendar in the desired place
	 * 
	 * @author Sandro Alves Peres; modified by Keyhan Sedaghat
	 * 
	 * @param string
	 *            ID_OBJECT; id of the text input holding the result or a
	 *            previous date value
	 * @param object
	 *            OBJECT; object of the button pressed
	 */
	$openCalendar : function(ID_OBJECT, OBJECT) {
		$persianCalendar.$closeCalendar();

		document.getElementById("MYCALENDAR_HDACTIVE_ELEMENT").value = ID_OBJECT;
		var __Month, __Year;
		var validDate = $persianCalendar.$isDate(ID_OBJECT);
		if (!validDate) {
			validDate = $persianCalendar.$_mktime();
		}
		__Month = validDate.month;
		__Year = validDate.year;

		document.getElementById("MYCALENDAR_HDYEAR").value = __Year;
		document.getElementById("MYCALENDAR_HDMONTH").value = __Month;

		document.getElementById("MYCALENDAR_DIV_BACK").style.display = "block";

		var _WTB = document.getElementById("MYCALENDAR_MAIN_TB").offsetWidth;
		var _HTB = document.getElementById("MYCALENDAR_MAIN_TB").offsetHeight;
		document.getElementById("MYCALENDAR_DIV_BACK").style.width = _WTB
				+ "px";
		document.getElementById("MYCALENDAR_DIV_BACK").style.height = _HTB
				+ "px";
		var x = ($persianCalendar.$getPosX(OBJECT) - _WTB + OBJECT.offsetWidth);
		var y = ($persianCalendar.$getPosY(OBJECT) + OBJECT.offsetHeight + 3);

		if ((new String(navigator.appName))
				.match("Microsoft Internet Explorer")) {
			x += 13;
			y += 14;
		}

		document.getElementById("MYCALENDAR_DIV_BACK").style.left = x + "px";
		document.getElementById("MYCALENDAR_DIV_BACK").style.top = y + "px";
		document.getElementById("MYCALENDAR_DIV_BACK").style.visibility = "visible";
		$persianCalendar.$listDays(__Month, __Year);
	},

	/**
	 * Clear any open calendar
	 * 
	 * @author Sandro Alves Peres
	 * 
	 */
	$closeCalendar : function() {
		document.getElementById("MYCALENDAR_DIV_BACK").style.display = "none";
		document.getElementById("MYCALENDAR_DIV_BACK").style.visibility = "hidden";
	},

	/**
	 * Find number of days in the given month, consider leap year
	 * 
	 * @author Sandro Alves Peres; modified by Keyhan Sedaghat
	 * 
	 * @param integer
	 *            month; number of month
	 * @param integer
	 *            year; number of year
	 */
	$daysOfMonth : function(month, year) {
		if (month < 7) {
			return 31;
		}
		if (month > 6 && month < 12) {
			return 30;
		}
		if ($persianCalendar.$_isLeap(year)) {
			return 30;
		}
		return 29;
	},

	/**
	 * Give name of the given month
	 * 
	 * @author Sandro Alves Peres; modified by Keyhan Sedaghat
	 * 
	 * @param integer
	 *            month; number of month
	 */
	$getStrMonth : function(month) {
		return (new String($persianCalendar.$_monthNames[(month - 1)]));
	},

	/**
	 * Fill the calendar table with correct data
	 * 
	 * @author Sandro Alves Peres; modified by Keyhan Sedaghat
	 * 
	 * @param integer
	 *            month; number of month
	 * @param integer
	 *            year; number of year
	 */
	$listDays : function(month, year) {
		var tb = document.getElementById("MYCALENDAR_MAIN_TB");

		var validDate = $persianCalendar.$_mktime();
		var currentDay = validDate.day;
		var currentMonth = validDate.month;
		var currentYear = validDate.year;

		var daysMonth = $persianCalendar.$daysOfMonth(month, year);
		var dayWeek = $persianCalendar.$_dayOfWeek(year,
				$persianCalendar.$_mountCounter[month - 1] + 1);

		var incDay = 0;
		var _$L = "";
		var _$R = "";
		var _strHoliday = new String();

		for ( var i = 2; i < 8; i++) {
			for ( var j = 0; j < 7; j++) {
				if (i == 2 && j < dayWeek || incDay >= daysMonth) {
					tb.rows[i].cells[j].innerHTML = "&nbsp;";
				} else {
					var showClass = "MYCALENDAR_NUMBER_DAY";
					if ((incDay + 1) == currentDay && month == currentMonth
							&& year == currentYear) { // current day
						showClass = "MYCALENDAR_NUMBER_CURRENT_DAY";
					}

					_strHoliday = "";
					for ( var k in $persianCalendar.$_holidays) {
						if ($persianCalendar.$_holidays[k][1] == (incDay + 1)
								&& $persianCalendar.$_holidays[k][0] == month) {
							showClass = "MYCALENDAR_NUMBER_HOLIDAY";
							_strHoliday = " title=\""
									+ $persianCalendar.$_holidays[k][2] + "\"";
							break;
						}
					}
					_$L = "<a href=\"javascript:void(0)\" onclick=\"$persianCalendar.$fixDate(this);\" class=\""
							+ showClass + "\"" + _strHoliday + ">";
					_$R = "</a>";

					tb.rows[i].cells[j].innerHTML = _$L
							+ $persianCalendar.$_ParsiNumber(++incDay) + _$R;
				}
			}
		}
		var tmpYear = $persianCalendar.$zeroPad(year, 4);
		tmpYear = $persianCalendar.$_ParsiNumber(tmpYear);
		document.getElementById("MYCALENDAR_SPAN_YEAR").innerHTML = tmpYear;
		tb.rows[0].cells[1].innerHTML = $persianCalendar.$getStrMonth(month);
	},

	/**
	 * Get the selection and fill the text input and run an optional function
	 * Also add a hidden input field before the date input to upload timestamp
	 * along with the string value
	 * 
	 * @param OBJECT;
	 *            selected cell from the calendar table
	 * 
	 * @author Sandro Alves Peres; slightly modified by Keyhan Sedaghat
	 * 
	 */
	$fixDate : function(OBJECT) {
		var _day = $persianCalendar.$_ReverseNumber(OBJECT.innerHTML);
		var _idElement = new String(document
				.getElementById("MYCALENDAR_HDACTIVE_ELEMENT").value);
		var _month = new String(
				document.getElementById("MYCALENDAR_HDMONTH").value);
		var _year = new String(
				document.getElementById("MYCALENDAR_HDYEAR").value);
		_day = new String($persianCalendar.$zeroPad(_day, 2));
		_month = new String($persianCalendar.$zeroPad(_month, 2));
		_year = new String($persianCalendar.$zeroPad(_year, 4));
		document.getElementById(_idElement).value = _year.concat("/", _month,
				"/", _day);

		$persianCalendar.$_writeTS(_year, _month, _day);

		if ($persianCalendar.$$execFunction != null) {
			try {
				eval($persianCalendar.$$execFunction);
			} catch (e) {
			}
		}

		$persianCalendar.$closeCalendar();
	},

	/**
	 * write the calculated timestamp to an input element for later use this
	 * element is put inside the form to enable server side action
	 * 
	 * @param integer
	 *            _year; value of year
	 * @param integer
	 *            _month; value of month
	 * @param integer
	 *            _day; value of day
	 */
	$_writeTS : function(_year, _month, _day) {
		var parObj = document.getElementById(document
				.getElementById('MYCALENDAR_HDACTIVE_ELEMENT').value);
		var hdTimeStamp = document.createElement("input");
		hdTimeStamp.setAttribute("name", parObj.id + "_TIMESTAMP");
		hdTimeStamp.setAttribute("id", parObj.id + "_TIMESTAMP");
		hdTimeStamp.setAttribute("type", "hidden");
		hdTimeStamp.setAttribute("value", $persianCalendar.$_createtime(_year,
				_month, _day));
		parObj.parentNode.insertBefore(hdTimeStamp, parObj);
	},

	/**
	 * Calculates timestamp for the given date( year, month, day)
	 * 
	 * @param integer
	 *            year; value of year
	 * @param integer
	 *            month; value of month
	 * @param integer
	 *            day; value of day
	 * @returns integer timestamp
	 */
	$_createtime : function(year, month, day) {
		year = parseInt(year);
		month = parseInt(month);
		day = parseInt(day);
		var dayOfYear = $persianCalendar.$_mountCounter[month - 1] + day;
		if (year < 1300)
			year += 1300;
		year -= 1348;
		day = dayOfYear + Math.round($persianCalendar.$_Khayam_Year * year);
		day -= 287;
		var timeStamp = day * 86400;
		timeStamp = $persianCalendar.$_zone(timeStamp);
		return timeStamp;
	},

	/**
	 * Consider the value of time zone offset. Note: timezone depends on the
	 * system.
	 * 
	 * @param integer
	 *            timeStamp; value of timestamp before time zone correction
	 * @returns timestamp after time zone correction
	 */
	$_zone : function(timeStamp) {
		var xTime = new Date(1000 * timeStamp);
		var timezoneOffset = xTime.getTimezoneOffset();
		return timeStamp + timezoneOffset;
	},

	/**
	 * Handle navigating in the months
	 * 
	 * @param integer
	 *            op; direction of change in month
	 * 
	 * @author Sandro Alves Peres
	 */
	$changeMonth : function(op) {
		var currYear = parseInt(
				document.getElementById("MYCALENDAR_HDYEAR").value, 10);
		var currMonth = parseInt(
				document.getElementById("MYCALENDAR_HDMONTH").value, 10);

		if (op == 1) { // up
			if (currMonth < 12) {
				document.getElementById("MYCALENDAR_HDMONTH").value = (currMonth + 1);
				$persianCalendar.$listDays((currMonth + 1), currYear);
			} else {
				document.getElementById("MYCALENDAR_HDMONTH").value = 1;
				document.getElementById("MYCALENDAR_HDYEAR").value = ++currYear;
				$persianCalendar.$listDays(1, currYear);
			}
		} else { // down
			if (currMonth > 1) {
				document.getElementById("MYCALENDAR_HDMONTH").value = (currMonth - 1);
				$persianCalendar.$listDays((currMonth - 1), currYear);
			} else {
				if ((currYear - 1) > 0) {
					document.getElementById("MYCALENDAR_HDMONTH").value = 12;
					document.getElementById("MYCALENDAR_HDYEAR").value = --currYear;
					$persianCalendar.$listDays(12, currYear);
				}
			}
		}
	},

	/**
	 * Handle navigating in the years
	 * 
	 * @param integer
	 *            op; direction of change in month
	 * 
	 * @author Sandro Alves Peres; modified by Keyhan Sedaghat
	 */
	$changeYear : function(op) {
		var currYear = parseInt(
				document.getElementById("MYCALENDAR_HDYEAR").value, 10);
		var currMonth = parseInt(
				document.getElementById("MYCALENDAR_HDMONTH").value, 10);
		document.getElementById("MYCALENDAR_HDYEAR").value = (currYear + op);
		$persianCalendar.$listDays(currMonth, (currYear + op));
	},

	/**
	 * action for manual manipulation of the input element
	 * 
	 * @param string
	 *            ID_OBJECT; id of the input element
	 */
	$_manualInput : function(ID_OBJECT) {
		document.getElementById("MYCALENDAR_HDACTIVE_ELEMENT").value = ID_OBJECT;
		var validDate = $persianCalendar.$isDate(ID_OBJECT);
		if (!validDate) {
			alert("Wrong format: 'YYYY/MM/DD'");
			return;
		}
		$persianCalendar.$_writeTS(validDate.year, validDate.month,
				validDate.day);
	},

	/**
	 * Event handler for closing the calendar table
	 * 
	 * @param event
	 *            ev; event generally this is mouse click event on the button
	 * 
	 * @author Sandro Alves Peres
	 */
	$onDeativate : function(ev) {
		ev = (ev ? ev : window.event);
		var _target = (document.all ? ev.srcElement : ev.target);
		var _deativate = true;
		if (document.getElementById("MYCALENDAR_DIV_BACK").style.visibility == "visible") {
			if (_target.parentNode != null) {
				var _pNode = _target.parentNode;
				while (_pNode != null) {
					if (_pNode.id == "MYCALENDAR_DIV_BACK") {
						_deativate = false;
						break;
					}
					_pNode = _pNode.parentNode;
				}
			}
			if (_deativate) {
				$persianCalendar.$closeCalendar();
			}
		}
	}

};

/**
 * Prepare event listener for loading the page and get the calendar table ready
 * And next listen for mouse event to hide the calendar
 * 
 * @author Sandro Alves Peres
 * 
 */
if (window.addEventListener) { // Mozilla, Chrome and Others
	window.addEventListener("load", $persianCalendar.$createElements, false);
	window.addEventListener("mousedown", $persianCalendar.$onDeativate, false);
} else if (window.attachEvent) { // IE
	window.attachEvent("onload", $persianCalendar.$createElements);
	document.attachEvent("onmousedown", function() {
		$persianCalendar.$onDeativate(event);
	});
} else {
	window.onload = function() {
		$persianCalendar.$createElements();
	};
	window.onmousedown = function() {
		$persianCalendar.$onDeativate(event);
	};
}