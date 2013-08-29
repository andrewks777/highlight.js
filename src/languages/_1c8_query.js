/*
Language: 1C8 query
Author: andrewks <andrewks777@yahoo.de>
*/

function(hljs){
  var IDENT_RE_RU = '[a-zA-Zа-яёА-ЯЁ_][a-zA-Z0-9а-яёА-ЯЁ_]*';
  var KEYWORDS = 'автоупорядочивание autoorder булево boolean внешнее outer внутреннее inner возр asc все all выбрать select где where дата date для изменения for update of значение value hierarchy иерархия hierarchy из from имеющие having индексировать по index by итоги по totals by как as левое left общие overall объединить union первые top периодами periods полное full поместить into правое right различные distinct разрешенные allowed сгруппировать по group by соединение по join on строка string тип type типзначения valuetype только only убыв desc упорядочить по order by число number уничтожить drop';
  var BUILT_IN_A = 'в in выбор case выразить cast год year декада tendays день day есть is и and иерархии или or иначе else истина true квартал quarter когда when конец end ложь false между between месяц month минута minute не not неделя week null неопределено undefined подобно like полугодие halfyear секунда second спецсимвол escape ссылка refs тогда then час hour';
  var BUILT_IN_F = 'датавремя datetime деньгода dayofyear деньнедели weekday добавитькдате dateadd естьnull isnull количество count конецпериода endofperiod максимум max минимум min началопериода beginofperiod подстрока substring представление presentation представлениессылки refpresentation разностьдат datediff среднее avg сумма sum';
  var BUILT_IN_DF = 'пустаятаблица emptytable';
  var BUILT_IN = BUILT_IN_A + ' ' + BUILT_IN_F + ' ' + BUILT_IN_DF;
  var DQUOTE =  {className: '',  begin: '""'};
  var STR = {
      className: 'string',
      begin: '"', end: '"',
      contains: [DQUOTE],
      relevance: 0
    };
  var NUMBER_MODE = {
    className: 'number',
    begin: '(\\d+(\\.\\d*)?|\\.\\d+)',
    relevance: 0
  };
  var NUMBER_MODE_WRAP_OP = {
    className: 'operator1',
    begin: '[<>=\\+\\-\\*\\/\\(,]',
    contains: [NUMBER_MODE],
    relevance: 0
  };
  var NUMBER_MODE_WRAP_SPACE = {
    className: '',
    begin: '\\s',
    contains: [NUMBER_MODE],
    relevance: 0
  };
  var OPERATOR_SYMB1 = {
    className: 'operator1',
    begin: '[\\+\\-\\*\\/\\(\\)\\,<>=]',
    relevance: 0
  };
  var OPERATOR_SYMB2 = {
    className: 'operator2',
    begin: '[%\\?\\[\\];:]',
    relevance: 0
  };
  var PARAM = {
    className: 'param',
    begin: '&' + IDENT_RE_RU
  };

  return {
    case_insensitive: true,
    lexems: IDENT_RE_RU,
    keywords: {keyword: KEYWORDS, built_in: BUILT_IN},
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      STR,
      PARAM,
      NUMBER_MODE_WRAP_OP,
      NUMBER_MODE_WRAP_SPACE,
      OPERATOR_SYMB1,
      OPERATOR_SYMB2
    ]
  };
}
