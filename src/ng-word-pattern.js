'use strict';

module.exports = function(context, options = {}) {
  const words = options.words || [];
  const patterns = options.patterns || [];

  const { Syntax, getSource, report, RuleError } = context;

  const check = (node) => {
    return new Promise((resolve, reject) => {
        const text = getSource(node);

        patterns.forEach(p => {
          const regexp = new RegExp(p.pattern, p.flags);

          if (regexp.test(text)) {
            report(node, new RuleError(`text contains NG pattern /${p.pattern}/${p.flags ?? ""}.\ntext:\n${text.trim()}\n`));
          }
        });

        words.forEach(word => {
          if (text.indexOf(word) !== -1) {
            report(node, new RuleError(`text contains NG word "${word}".\ntext:\n${text.trim()}\n`));
          }
        });

        resolve();
      });
  };

  return {
    [Syntax.Header](node) {
      return check(node);
    },
    [Syntax.ListItem](node) {
      return check(node);
    },
    [Syntax.Paragraph](node) {
      return check(node);
    }
  };
}

