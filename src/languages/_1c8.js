/*
Language: 1C8
Author: andrewks <andrewks777@yahoo.de>
*/

function(hljs){
  var IDENT_RE_RU = '[a-zA-Zа-яёА-ЯЁ_][a-zA-Z0-9а-яёА-ЯЁ_]*';
  var KEYWORDS = 'если if тогда then иначеесли elsif иначе else конецесли endif цикл do для for по to из in каждого each пока while конеццикла enddo процедура procedure конецпроцедуры endprocedure функция function конецфункции endfunction перем var экспорт export перейти goto и and или or не not знач val прервать break продолжить continue возврат return попытка try исключение except конецпопытки endtry вызватьисключение raise выполнить execute добавитьобработчик addhandler удалитьобработчик removehandler истина true ложь false null неопределено undefined новый new';
  var BUILT_IN = '';
  var DQUOTE =  {className: '',  begin: '""'};
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
    begin: '\'\\d[\\d\\.\\-: ]+\\d\''
  };
  var OPERATOR_SYMB = {
    className: 'operator',
    begin: '[\\+\\-\\*\\/%\\?\\(\\)\\[\\];:\\.\\,=]+',
    relevance: 0
  };
  var PREPROCESSOR = {
    className: 'preprocessor',
    begin: '(#|&)', end: '$'
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
