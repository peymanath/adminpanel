/**
 * Author: Peyman Nader
 * Author ULR: https://github.com/peymanath
 * Description: Jalali Date
 */

const _$ = document;
const _s = q => (_$.querySelectorAll(q).length > 1) ? _$.querySelectorAll(q) : _$.querySelector(q);
const _sID = q => _$.getElementById(q);


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
     * directory containing css and gif files for this class DO NOT FORGET the
     * trailing /!
     */
    base = "../public/js/date/view/";

    /**
     * Input ID to insert the date
     */
    inputID = "PersianDate"

    /**
     * Buttun id for show for the calendar
     */
    buttonID = "PersianDateButton"

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

    newDate(Options = {}) {

        if (window.addEventListener) { // Mozilla, Chrome and Others
            window.addEventListener("load", () => this.createElements, false);
            window.addEventListener("mousedown", () => this.onDeativate(), false);
        }

        const checkInput = _sID(this.buttonID) ? true : false;

        this.inputID = Options.inputID ? Options.inputID : this.inputID;

        this.buttonID = (checkInput) ? this.buttonID :  Options.buttonID ? Options.buttonID : this.inputID


        _sID(this.buttonID).addEventListener('click', () => {
            this.openCalendar()
        })

        _sID(this.inputID).addEventListener('change', () => {
            this.manualInput()
        })
    }

    /**
     * Create the calendar skeleton for the first time
     */
    get createElements() {
        /**
         * 
         */
        const divBack = _$.createElement("div");
        divBack.setAttribute("id", "MYCALENDAR_DIV_BACK");

        const tb = _$.createElement("table");
        tb.setAttribute("width", "210");
        tb.setAttribute("id", "MYCALENDAR_MAIN_TB");

        tb.insertRow(0);
        tb.rows[0].insertCell(0);
        tb.rows[0].insertCell(1);
        tb.rows[0].insertCell(2);
        tb.rows[0].className = "MYCALENDAR_LINE_TOP";

        const ImgDown = _$.createElement("img");
        ImgDown.setAttribute("src", this.base + "prev_month.gif");
        ImgDown.setAttribute("border", "0");
        ImgDown.setAttribute("title", this.prevMonth);
        ImgDown.onclick = () => {
            this.changeMonth(-1);
        };
        ImgDown.style.cursor = "pointer";
        tb.rows[0].cells[0].setAttribute("align", "center");
        tb.rows[0].cells[0].setAttribute("vAlign", "middle");
        tb.rows[0].cells[0].appendChild(ImgDown);

        // tb.rows[0].cells[1].style.paddingLeft = "5px";
        tb.rows[0].cells[1].setAttribute("colSpan", "5");
        tb.rows[0].cells[1].setAttribute("align", "center");
        tb.rows[0].cells[1].setAttribute("vAlign", "middle");

        const ImgUp = _$.createElement("img");
        ImgUp.setAttribute("src", this.base + "next_month.gif");
        ImgUp.setAttribute("border", "0");
        ImgUp.setAttribute("title", this.nextMonth);
        ImgUp.onclick = () => {
            this.changeMonth(1);
        };
        ImgUp.style.cursor = "pointer";
        tb.rows[0].cells[2].setAttribute("align", "center");
        tb.rows[0].cells[2].setAttribute("vAlign", "middle");
        tb.rows[0].cells[2].appendChild(ImgUp);

        tb.insertRow(1);

        for (let dw in this.weekDays) {
            tb.rows[1].insertCell(dw);
            tb.rows[1].cells[dw].setAttribute("width", "30");
            tb.rows[1].cells[dw].setAttribute("align", "center");
            tb.rows[1].cells[dw].setAttribute("vAlign", "middle");
            tb.rows[1].cells[dw].className = "MYCALENDAR_DAY_WEEK";
            tb.rows[1].cells[dw].innerHTML = this.weekDays[dw];
        }

        for (let i = 2; i <= 7; i++) {
            tb.insertRow(i);
            for (let j = 0; j < 7; j++) {
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
            + "prev_year.gif\" border=\"0\" style=\"cursor:pointer;\" onclick=\"new ChangeYear().start(-1);\" title=\""
            + this.prevYear + "\" />";
        _Bottom += "<SPAN id=\"MYCALENDAR_SPAN_YEAR\">&nbsp;</SPAN>";
        _Bottom += "<img src=\""
            + this.base
            + "next_year.gif\" border=\"0\" style=\"cursor:pointer;\" onclick=\"new ChangeYear().start(1)\" title=\""
            + this.nextYear + "\" />";
        tb.rows[8].cells[0].innerHTML = _Bottom;

        let hdActiveElement = _$.createElement("input");
        hdActiveElement.setAttribute("name", "MYCALENDAR_HDACTIVE_ELEMENT");
        hdActiveElement.setAttribute("id", "MYCALENDAR_HDACTIVE_ELEMENT");
        hdActiveElement.setAttribute("type", "hidden");

        let hdYear = _$.createElement("input");
        hdYear.setAttribute("name", "MYCALENDAR_HDYEAR");
        hdYear.setAttribute("id", "MYCALENDAR_HDYEAR");
        hdYear.setAttribute("type", "hidden");

        let hdMonth = _$.createElement("input");
        hdMonth.setAttribute("name", "MYCALENDAR_HDMONTH");
        hdMonth.setAttribute("id", "MYCALENDAR_HDMONTH");
        hdMonth.setAttribute("type", "hidden");

        divBack.appendChild(tb);

        _$.body.appendChild(hdActiveElement);
        _$.body.appendChild(hdYear);
        _$.body.appendChild(hdMonth);
        _$.body.appendChild(divBack);
    }

    getPosX(object) {
        let current_left = 0;

        if (object.offsetParent) {
            while (object.offsetParent) {
                current_left += object.offsetLeft;
                object = object.offsetParent;
            }
        }
        return current_left;
    }

    getPosY(object) {
        let current_top = 0;

        if (object.offsetParent) {
            while (object.offsetParent) {
                current_top += object.offsetTop;
                object = object.offsetParent;
            }
        }
        return current_top;
    }

    zeroPad(_text, _size) {
        _size = new Number(_size);

        let _getText = new String(_text);
        _getText = "0000000000000000000000" + _getText;

        if ((new String(_text)).length > _size) {
            return (new String(_text));
        } else {
            return _getText.slice(-_size);
        }
    }

    ParsiNumber(numb) {
        numb = new String(numb);
        var out = "";
        let thisParsi = this.parsi;
        for (let i = 0; i < numb.length; i++) {
            out += thisParsi[numb[i]];
        }
        return out;
    }

    ReverseNumber(numb) {
        numb = new String(numb);
        var out = "";
        let thisParsi = this.parsi;
        for (let i = 0; i < numb.length; i++) {
            out += thisParsi.indexOf(numb[i]);
        }
        return parseInt(out, 10);
    }

    calcRasad(Year) {
        let Rasad = Year + 2346;
        return Rasad;
    }

    mktime() {
        var dt = new Date();
        var timeStamp = dt.getTime() / 1000;
        timeStamp = this.zone(timeStamp);
        var Day = Math.floor(timeStamp / 86400);
        Day += 287;
        var Year = Math.floor((Day / this.KhayamYear) - (Day * this.CorrectingKhayamYear));
        var dayOfYear = Day - Math.round(Year * this.KhayamYear);
        if (dayOfYear == 0)
            dayOfYear = 366;
        Year += 1348;
        var Month = 0;
        while (Month < 12 && dayOfYear > this.mountCounter[Month])
            Month++;
        Day = dayOfYear - this.mountCounter[Month - 1];
        return {
            year: Year,
            month: Month,
            day: Day
        };
    }

    isLeap(Year) {
        let Rasad;
        Rasad = this.calcRasad(Year);
        var yrNam = Rasad % 2820;
        yrNam = yrNam % 128;
        var leapCount = this.Khayamii.indexOf(yrNam);
        if (leapCount >= 0) {
            return true;
        }
        return false;
    }

    isDate(ID_OBJECT) {
        var arr_date = [];
        var objValue = new String(_sID(ID_OBJECT).value);
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
                    if (this.isLeap(Year)) {
                        this.monthDays[11] = 30; // Espand in
                        // leap year
                    }
                    if (Month > 0 && Month <= 12) {
                        if (Day > 0
                            && Day <= this.monthDays[(Month - 1)]) {
                            returning = {
                                year: Year,
                                month: Month,
                                day: Day
                            };
                            objValue = Year + '/' + Month + '/' + Day;
                        }
                    }
                }
            }
        }
        _sID(ID_OBJECT).value = objValue;
        return returning;
    }

    dayOfWeek(year, dayOfYear) {
        var Rasad = this.calcRasad(year);

        var count2820 = Math.floor(Rasad / 2820);
        var mod2820 = Rasad % 2820;
        let count128 = Math.floor(mod2820 / 128);
        var mod128 = mod2820 % 128;

        var leapCount = 0;
        while (mod128 > this.Khayamii[leapCount])
            leapCount++;

        var yearStartDay = (count2820 + 1) * 3 + count128 * 5 + mod128
            + leapCount;
        if (dayOfYear > 0)
            dayOfYear--;
        return (yearStartDay + dayOfYear) % 7;
    }

    openCalendar(ID_OBJECT = this.inputID, OBJECT = _sID(this.buttonID)) {

        this.closeCalendar;

        _sID("MYCALENDAR_HDACTIVE_ELEMENT").value = ID_OBJECT;
        var __Month, __Year;
        var validDate = this.isDate(ID_OBJECT);
        if (!validDate) {
            validDate = this.mktime();
        }
        __Month = validDate.month;
        __Year = validDate.year;

        _sID("MYCALENDAR_HDYEAR").value = __Year;
        _sID("MYCALENDAR_HDMONTH").value = __Month;

        _sID("MYCALENDAR_DIV_BACK").style.display = "block";

        var _WTB = _sID("MYCALENDAR_MAIN_TB").offsetWidth;
        var _HTB = _sID("MYCALENDAR_MAIN_TB").offsetHeight;
        _sID("MYCALENDAR_DIV_BACK").style.width = _WTB
            + "px";
        _sID("MYCALENDAR_DIV_BACK").style.height = _HTB
            + "px";
        var x = (this.getPosX(OBJECT) - _WTB + OBJECT.offsetWidth);
        var y = (this.getPosY(OBJECT) + OBJECT.offsetHeight + 3);

        if ((new String(navigator.appName))
            .match("Microsoft Internet Explorer")) {
            x += 13;
            y += 14;
        }

        _sID("MYCALENDAR_DIV_BACK").style.left = x + "px";
        _sID("MYCALENDAR_DIV_BACK").style.top = y + "px";
        _sID("MYCALENDAR_DIV_BACK").style.visibility = "visible";
        this.listDays(__Month, __Year);
    }

    get closeCalendar() {
        _sID("MYCALENDAR_DIV_BACK").style.display = "none";
        _sID("MYCALENDAR_DIV_BACK").style.visibility = "hidden";
    }

    daysOfMonth(month, year) {
        if (month < 7) {
            return 31;
        }
        if (month > 6 && month < 12) {
            return 30;
        }
        if (this.isLeap(year)) {
            return 30;
        }
        return 29;
    }

    getStrMonth(month) {
        return (new String(this.monthNames[(month - 1)]));
    }

    listDays(month, year) {
        var tb = _sID("MYCALENDAR_MAIN_TB");

        var validDate = this.mktime();
        var currentDay = validDate.day;
        var currentMonth = validDate.month;
        var currentYear = validDate.year;

        var daysMonth = this.daysOfMonth(month, year);
        var dayWeek = this.dayOfWeek(year,
            this.mountCounter[month - 1] + 1);

        var incDay = 0;
        var _$L = "";
        var _$R = "";

        for (var i = 2; i < 8; i++) {
            for (var j = 0; j < 7; j++) {
                if (i == 2 && j < dayWeek || incDay >= daysMonth) {
                    tb.rows[i].cells[j].innerHTML = "&nbsp;";
                } else {
                    var showClass = "MYCALENDAR_NUMBER_DAY";
                    if ((incDay + 1) == currentDay && month == currentMonth
                        && year == currentYear) { // current day
                        showClass = "MYCALENDAR_NUMBER_CURRENT_DAY";
                    }
                    _$L = "<a href=\"javascript:void(0)\" onclick=\"new fixDate().start(this)\" class=\""
                        + showClass + "\">";
                    _$R = "</a>";

                    tb.rows[i].cells[j].innerHTML = _$L
                        + this.ParsiNumber(++incDay) + _$R;
                }
            }
        }
        
        let tmpYear = this.ParsiNumber(year);
        _sID("MYCALENDAR_SPAN_YEAR").innerHTML = tmpYear;
        tb.rows[0].cells[1].innerHTML = this.getStrMonth(month);
    }

    writeTS(_year, _month, _day) {
        var parObj = _sID(_sID('MYCALENDAR_HDACTIVE_ELEMENT').value);
        var hdTimeStamp = _$.createElement("input");
        hdTimeStamp.setAttribute("name", parObj.id + "_TIMESTAMP");
        hdTimeStamp.setAttribute("id", parObj.id + "_TIMESTAMP");
        hdTimeStamp.setAttribute("type", "hidden");
        hdTimeStamp.setAttribute("value", this.createtime(_year,
            _month, _day));
        parObj.parentNode.insertBefore(hdTimeStamp, parObj);
    }

    createtime(year, month, day) {
        year = parseInt(year);
        month = parseInt(month);
        day = parseInt(day);
        var dayOfYear = this.mountCounter[month - 1] + day;
        if (year < 1300)
            year += 1300;
        year -= 1348;
        day = dayOfYear + Math.round(this.KhayamYear * year);
        day -= 287;
        var timeStamp = day * 86400;
        timeStamp = this.zone(timeStamp);
        return timeStamp;
    }

    zone(timeStamp) {
        var xTime = new Date(1000 * timeStamp);
        var timezoneOffset = xTime.getTimezoneOffset();
        return timeStamp + timezoneOffset;
    }

    changeMonth(op) {
        var currYear = parseInt( _sID("MYCALENDAR_HDYEAR").value, 10);
        var currMonth = parseInt( _sID("MYCALENDAR_HDMONTH").value, 10);

        if (op == 1) { // up
            if (currMonth < 12) {
                _sID("MYCALENDAR_HDMONTH").value = (currMonth + 1);
                this.listDays((currMonth + 1), currYear);
            } else {
                _sID("MYCALENDAR_HDMONTH").value = 1;
                _sID("MYCALENDAR_HDYEAR").value = ++currYear;
                this.listDays(1, currYear);
            }
        } else { // down
            if (currMonth > 1) {
                _sID("MYCALENDAR_HDMONTH").value = (currMonth - 1);
                this.listDays((currMonth - 1), currYear);
            } else {
                if ((currYear - 1) > 0) {
                    _sID("MYCALENDAR_HDMONTH").value = 12;
                    _sID("MYCALENDAR_HDYEAR").value = --currYear;
                    this.listDays(12, currYear);
                }
            }
        }
    }

    changeYear(op) {
        var currYear = parseInt(
            _sID("MYCALENDAR_HDYEAR").value, 10);
        var currMonth = parseInt(_sID("MYCALENDAR_HDMONTH").value, 10);
        _sID("MYCALENDAR_HDYEAR").value = (currYear + op);
        this.listDays(currMonth, (currYear + op));
    }

    manualInput(ID_OBJECT = this.inputID) {

        _sID("MYCALENDAR_HDACTIVE_ELEMENT").value = ID_OBJECT;
        var validDate = this.isDate(ID_OBJECT);
        if (!validDate) {
            alert("Wrong format: 'YYYY/MM/DD'");
            return;
        }
        this.writeTS(validDate.year, validDate.month,
            validDate.day);
    }

    onDeativate(ev) {
        ev = (ev ? ev : window.event);
        var _target = (_$.all ? ev.srcElement : ev.target);
        var _deativate = true;

        if (_sID("MYCALENDAR_DIV_BACK").style.visibility == "visible") {
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
                this.closeCalendar
            }
        }
    }
}

class fixDate extends PersianDate {

    start(OBJECT) {

        var _day = this.ParsiNumber(this.ReverseNumber(OBJECT.innerHTML));
        var _idElement = new String(_sID("MYCALENDAR_HDACTIVE_ELEMENT").value);

        var _month = this.ParsiNumber(new String(_sID("MYCALENDAR_HDMONTH").value));
        
        var _year = this.ParsiNumber(new String(_sID("MYCALENDAR_HDYEAR").value));

        _sID(_idElement).value = _year.concat("/", _month, "/", _day);

        this.writeTS(_year, _month, _day);

        if (this.execFunction != null) {
            try {
                eval(this.execFunction);
            } catch (e) {
            }
        }
        
        this.closeCalendar;
    }
}

class ChangeYear extends PersianDate {
    start(op) {
        var currYear = parseInt(
            _sID("MYCALENDAR_HDYEAR").value, 10);
        var currMonth = parseInt(
            _sID("MYCALENDAR_HDMONTH").value, 10);
        _sID("MYCALENDAR_HDYEAR").value = (currYear + op);
        this.listDays(currMonth, (currYear + op));
    }
}