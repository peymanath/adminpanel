const _$ = document;
const _s = q => (_$.querySelectorAll(q).length > 1) ? _$.querySelectorAll(q) : _$.querySelector(q);

/**
 * Author: Peyman Nader
 * Author ULR: https://github.com/peymanath
 * Description: Jalali Date
 */

class PersianDate {
    /**
     * text for tooltip of previous month link
     */
    prevMonth = "ماه قبل";

    /**
     * text for tooltip of next month link
     */
    nextMonth = "ماه بعد";

    /**
     * array of abbreviations of week days
     */
    weekDays = ["ش", "ی", "د", "س", "چ", "پ", "آ"];

    /**
     * text for tooltip of previous year link
     */
    prevYear = "سال قبل";

    /**
     * text for tooltip of next year link
     */
    nextYear = "سال بعد";

    /**
     * number of days in each month
     */
    monthDays = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];

    /**
     * array of numbers in Farsi typeface.
     */
    parsi = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    /**
     * array containing the name of months
     */
    monthNames = ["فروردین", "اردیبهشت", "خرداد", "تیر", "امرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"];

    /**
     * list of holidays in year format: [ Month, Day, Title ]
     */
    holidays = [
        [1, 1, "نوروز"],
        [1, 2, "نوروز"],
        [1, 3, "نوروز"],
        [1, 4, "نوروز"],
        [1, 13, "سیزده بدر"],
        [12, 29, "روز ملی نفت"]
    ];

    /**
     * directory containing css and gif files for this class DO NOT FORGET the
     * trailing /!
     */
    base = "../public/js/date/view/";


    /**
     * function that will be evaluated after the last step of selecting a date
     */
    execFunction = null;

    /**
     * Reference values used by Khayam for calculations
     */
    Khayamii = [5, 9, 13, 17, 21, 25, 29, 34, 38, 42, 46, 50, 54, 58, 62, 67, 71, 75, 79, 83, 87, 91, 95, 100, 104, 108, 112, 116, 120, 124, 0];
    CorrectingKhayamYear = 0.00000006152;
    KhayamYear = 365.24218956;

    /**
     * Total days from start of year till end of each month
     */
    mountCounter = [0, 31, 62, 93, 124, 155, 186, 216, 246, 276, 306, 336];

    /**
     * Create the calendar skeleton for the first time
     */
    get testDate() {
    }
    get createElements() {
        /**
         * Add stylesheet to <head> tag
         */
        _s("head").innerHTML = _s("head").innerHTML + `<link href="${this.base}persian_calendar.css" rel="stylesheet" type="text/css">`;

        /**
         * 
         */
        const divBack = _$.createElement("div");
		// divBack.style.direction = 'rtl';
		divBack.setAttribute("id", "MYCALENDAR_DIV_BACK");

        const tb = _$.createElement("table");
		tb.setAttribute("width", "210");
		// tb.setAttribute("border", "0");
		// tb.setAttribute("cellSpacing", "0");
		// tb.setAttribute("cellPadding", "0");
		tb.setAttribute("id", "MYCALENDAR_MAIN_TB");

        tb.insertRow(0);
		tb.rows[0].insertCell(0);
		tb.rows[0].insertCell(1);
		tb.rows[0].insertCell(2);
		tb.rows[0].className = "MYCALENDAR_LINE_TOP";

		const ImgDown = document.createElement("img");
		ImgDown.setAttribute("src", this.base + "prev_month.gif");
		ImgDown.setAttribute("border", "0");
		ImgDown.setAttribute("title", this.prevMonth);
		ImgDown.onclick = function() {
			// $persianCalendar.$changeMonth(-1);
		};
		ImgDown.style.cursor = "pointer";
		tb.rows[0].cells[0].setAttribute("align", "center");
		tb.rows[0].cells[0].setAttribute("vAlign", "middle");
		tb.rows[0].cells[0].appendChild(ImgDown);

		// tb.rows[0].cells[1].style.paddingLeft = "5px";
		tb.rows[0].cells[1].setAttribute("colSpan", "5");
		tb.rows[0].cells[1].setAttribute("align", "center");
		tb.rows[0].cells[1].setAttribute("vAlign", "middle");

		const ImgUp = document.createElement("img");
		ImgUp.setAttribute("src", this.base + "next_month.gif");
		ImgUp.setAttribute("border", "0");
		ImgUp.setAttribute("title", this.nextMonth);
		ImgUp.onclick = function() {
			// $persianCalendar.$changeMonth(1);
		};
		ImgUp.style.cursor = "pointer";
		tb.rows[0].cells[2].setAttribute("align", "center");
		tb.rows[0].cells[2].setAttribute("vAlign", "middle");
		tb.rows[0].cells[2].appendChild(ImgUp);

		tb.insertRow(1);

		for ( let dw in this.weekDays) {
			tb.rows[1].insertCell(dw);
			tb.rows[1].cells[dw].setAttribute("width", "30");
			tb.rows[1].cells[dw].setAttribute("align", "center");
			tb.rows[1].cells[dw].setAttribute("vAlign", "middle");
			tb.rows[1].cells[dw].className = "MYCALENDAR_DAY_WEEK";
			tb.rows[1].cells[dw].innerHTML = this.weekDays[dw];
		}

		for ( let i = 2; i <= 7; i++) {
			tb.insertRow(i);
			for ( let j = 0; j < 7; j++) {
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
		let _Bottom = "<img src=\""
				+ this.base
				+ "prev_year.gif\" border=\"0\" style=\"cursor:pointer;\" onclick=\"$persianCalendar.$changeYear(-1);\" title=\""
				+ this.prevYear + "\" />";
		_Bottom += "<SPAN id=\"MYCALENDAR_SPAN_YEAR\">&nbsp;</SPAN>";
		_Bottom += "<img src=\""
				+ this.base
				+ "next_year.gif\" border=\"0\" style=\"cursor:pointer;\" onclick=\"$persianCalendar.$changeYear(1);\" title=\""
				+ this.nextYear + "\" />";
		tb.rows[8].cells[0].innerHTML = _Bottom;

		let hdActiveElement = document.createElement("input");
		hdActiveElement.setAttribute("name", "MYCALENDAR_HDACTIVE_ELEMENT");
		hdActiveElement.setAttribute("id", "MYCALENDAR_HDACTIVE_ELEMENT");
		hdActiveElement.setAttribute("type", "hidden");

		let hdYear = document.createElement("input");
		hdYear.setAttribute("name", "MYCALENDAR_HDYEAR");
		hdYear.setAttribute("id", "MYCALENDAR_HDYEAR");
		hdYear.setAttribute("type", "hidden");

		let hdMonth = document.createElement("input");
		hdMonth.setAttribute("name", "MYCALENDAR_HDMONTH");
		hdMonth.setAttribute("id", "MYCALENDAR_HDMONTH");
		hdMonth.setAttribute("type", "hidden");

		divBack.appendChild(tb);

		document.body.appendChild(hdActiveElement);
		document.body.appendChild(hdYear);
		document.body.appendChild(hdMonth);
		document.body.appendChild(divBack);
    }
}

const perDate = new PersianDate();

console.log(perDate.createElements);