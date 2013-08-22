/*
Language: 1C7
Author: andrewks <andrewks777@yahoo.de>
*/

function(hljs){
  var IDENT_RE_RU = '[a-zA-Zа-яёА-ЯЁ_][a-zA-Z0-9а-яёА-ЯЁ_]*';
  var KEYWORDS = 'если if тогда then иначеесли elsif иначе else конецесли endif цикл do для for по to пока while конеццикла enddo процедура procedure конецпроцедуры endprocedure функция function конецфункции endfunction перем var экспорт export перейти goto и and или or не not знач val прервать break продолжить continue возврат return далее forward попытка try исключение except конецпопытки endtry вызватьисключение raise';
  var BUILT_IN = 'контекст context описаниеошибки geterrordescription текущаяибкод currentibcode текущаяибнаименование currentibdescr текущаяибстатус currentibstatus текущаяибцентральная iscurrentibcenter ибсозданияобъекта birthibofobject центральнаяибкод centralibcode текущаяибтолькополучатель iscurrentibrecepientonly фс fs загрузитьвнешнююкомпоненту loadaddin подключитьвнешнююкомпоненту attachaddin создатьобъект createobject статусвозврата returnstatus разделительстраниц pagebreak разделительстрок linebreak символтабуляции tabsymbol перечисление enum константа const планысчетов chartsofaccounts видысубконто subcontokinds видрасчета calculationkind группарасчетов calculationgroup регистр register окр round цел int мин min макс max лог10 log10 лог ln стрдлина strlen пустаястрока isblankstring сокрл triml сокрп trimr сокрлп trimall лев left прав right сред mid найти find стрзаменить strreplace стрчисловхождений strcountoccur стрколичествострок strlinecount стрполучитьстроку strgetline врег upper нрег lower oemtoansi ansitooem симв chr кодсимв asc рабочаядата workingdate текущаядата curdate добавитьмесяц addmonth начмесяца begofmonth конмесяца endofmonth начквартала begofquart конквартала endofquart начгода begofyear конгода endofyear начнедели begofweek коннедели endofweek датагод getyear датамесяц getmonth датачисло getday номернеделигода getweekofyear номерднягода getdayofyear номерднянедели getdayofweek периодстр periodstr началостандартногоинтервала begofstandardrange конецстандартногоинтервала endofstandardrange текущеевремя currenttime сформироватьпозициюдокумента makedocposition разобратьпозициюдокумента splitdocposition дата date строка string число number пропись spelling формат format шаблон template фиксшаблон fixtemplate ввестизначение inputvalue ввестичисло inputnumeric ввестистроку inputstring ввестидату inputdate ввестипериод inputperiod ввестиперечисление inputenum вопрос doquerybox предупреждение domessagebox сообщить message очиститьокносообщений clearmessagewindow состояние status сигнал beep разм dim заголовоксистемы systemcaption имякомпьютера computername имяпользователя username полноеимяпользователя userfullname названиенабораправ rightname праводоступа accessright названиеинтерфейса userinterfacename каталогпользователя userdir каталогиб ibdir каталогпрограммы bindir каталогвременныхфайлов tempfilesdir каталогбазыданных dbdir монопольныйрежим exclusivemode основнойязык generallanguage начатьтранзакцию begintransaction зафиксироватьтранзакцию committransaсtion отменитьтранзакцию rollbacktransaction значениевстрокувнутр valuetostringinternal значениеизстрокивнутр valuefromstringinternal значениевстроку valuetostring значениеизстроки valuefromstring значениевфайл valuetofile значениеизфайла valuefromfile сохранитьзначение savevalue восстановитьзначение restorevalue получитьта getap получитьдатута getdateofap получитьвремята gettimeofap получитьдокументта getdocofap получитьпозициюта getapposition установитьтана setaptobeg установитьтапо setaptoend рассчитатьрегистрына calcregsonbeg рассчитатьрегистрыпо calcregsonend выбранныйплансчетов defaultchartofaccounts основнойплансчетов mainchartofaccounts счетпокоду accountbycode началопериодаби beginofperiodbt конецпериодаби endofperiodbt конецрассчитанногопериодаби endofcalculatedperiodbt максимальноеколичествосубконто maxsubcontocount назначитьсчет setaccount ввестиплансчетов inputchartofaccounts ввестивидсубконто inputsubcontokind основнойжурналрасчетов basiccalcjournal типзначения valuetype типзначениястр valuetypestr пустоезначение emptyvalue получитьпустоезначение getemptyvalue назначитьвид setkind префиксавтонумерации autonumprefix получитьзначенияотбора getselectionvalues записьжурналарегистрации logmessagewrite командасистемы system запуститьприложение runapp завершитьработусистемы exitsystem найтипомеченныенаудаление findmarkedfordelete найтиссылки findreferences удалитьобъекты deleteobjects обработкаожидания idleprocessing открытьформу openform открытьформумодально openformmodal _idtostr _strtoid _getperformancecounter календари calendars метаданные metadata последовательность sequence правилоперерасчета recalculationrule';

  var DQUOTE =  {className: 'dquote',  begin: '""'};
  var STR_START = {
      className: 'string',
      begin: '"', end: '"|$',
      contains: [DQUOTE],
      relevance: 0
    };
  var STR_CONT = {
    className: 'string',
    begin: '\\|', end: '"|$',
    contains: [DQUOTE]
  };
  var NUMBER_MODE = {
    className: 'number',
    begin: '(\\d+(\\.\\d*)?|\\.\\d+)',
    relevance: 0
  };
  var NUMBER_MODE_ALONE = {
    className: 'number',
    begin: '^(\\d+(\\.\\d*)?|\\.\\d+)',
    relevance: 0
  };
  var NUMBER_MODE_WRAP_OP = {
    className: 'operator',
    begin: '[=\\+\\-\\*\\/%\\?\\(\\[,]',
    contains: [NUMBER_MODE],
    relevance: 0
  };
  var NUMBER_MODE_WRAP_SPACE = {
    className: '',
    begin: '\\s',
    contains: [NUMBER_MODE],
    relevance: 0
  };
  var DATE = {
    className: 'date',
    begin: '\'\\d{2}\\.\\d{2}\\.(\\d{2}|\\d{4})\''
  };
  var OPERATOR_SYMB = {
    className: 'operator',
    begin: '[\\+\\-\\*\\/%\\?\\(\\)\\[\\];:\\.\\,=]+',
    relevance: 0
  };
  var PREPROCESSOR = {
    className: 'preprocessor',
    begin: '#', end: '$'
  };
  var GOTO_LABEL = {
    className: 'goto-label',
    begin: '~' + IDENT_RE_RU
  };

  return {
    case_insensitive: true,
    lexems: IDENT_RE_RU,
    keywords: {keyword: KEYWORDS, built_in: BUILT_IN},
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      STR_START, STR_CONT,
      PREPROCESSOR,
      GOTO_LABEL,
      DATE,
      NUMBER_MODE_ALONE,
      NUMBER_MODE_WRAP_OP,
      NUMBER_MODE_WRAP_SPACE,
      OPERATOR_SYMB
    ]
  };
}
