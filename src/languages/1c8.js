/*
Language: 1C8
Author: andrewks <andrewks777@yahoo.de>
*/

function(hljs){
  var IDENT_RE_RU = '[a-zA-Zа-яА-Я_][a-zA-Z0-9а-яА-Я_]*';
  var OneS_KEYWORDS = 'если if тогда then иначеесли elsif иначе else конецесли endif цикл do для for по to из in каждого each пока while конеццикла enddo процедура procedure конецпроцедуры endprocedure функция function конецфункции endfunction перем var экспорт export перейти goto и and или or не not знач val прервать break продолжить continue возврат return попытка try исключение except конецпопытки endtry вызватьисключение raise выполнить execute добавитьобработчик addhandler удалитьобработчик removehandler истина true ложь false null неопределено undefined новый new';
  var OneS_BUILT_IN = '';
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
  var NUMBER_MODE_WRAP = {
    className: '',
    begin: '[\\s=\\+\\-\\*\\/%\\(\\[,]',
    contains: [NUMBER_MODE],
    relevance: 0
  };
  var DATE = {
    className: 'date',
    begin: '\'\\d[\\d\\.\\-: ]+\\d\''
  };

  return {
    case_insensitive: true,
    lexems: IDENT_RE_RU,
    keywords: {keyword: OneS_KEYWORDS, built_in: OneS_BUILT_IN},
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      NUMBER_MODE_ALONE,
      NUMBER_MODE_WRAP,
      STR_START, STR_CONT,
      {
        className: 'function',
        begin: '\\b(процедура|procedure|функция|function)', end: '$',
        lexems: IDENT_RE_RU,
        keywords: 'процедура procedure функция function',
        contains: [
          {className: 'title', begin: IDENT_RE_RU},
          {
            className: 'tail',
            endsWithParent: true,
            contains: [
              {
                className: 'params',
                begin: '\\(', end: '\\)',
                lexems: IDENT_RE_RU,
                keywords: 'знач val истина true ложь false null неопределено undefined',
                contains: [STR_START, STR_CONT, NUMBER_MODE_WRAP, DATE]
              },
              {
                className: 'export',
                begin: '(экспорт|export)', endsWithParent: true,
                lexems: IDENT_RE_RU,
                keywords: 'экспорт export',
                contains: [hljs.C_LINE_COMMENT_MODE]
              }
            ]
          },
          hljs.C_LINE_COMMENT_MODE
        ]
      },
      {className: 'preprocessor', begin: '(#|&)', end: '$'},
      DATE
    ]
  };
}
