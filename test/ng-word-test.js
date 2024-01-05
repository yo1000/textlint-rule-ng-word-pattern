import rule from "../src/ng-word-pattern";
import TextLintTester from "textlint-tester";

const tester = new TextLintTester();

tester.run("ng-word-pattern", rule, {
  valid: [{
    text: "この文章に、NGワードは含まれません。",
    options: {
      words: ["No Good", "Sensitive", "F-word"]
    }
  }, {
    text: "この文章に、全角スペースは 含 ま れ ま せ ん。",
    options: {
      words: ["　"]
    }
  }, {
    text: "この文章に、NGパターンは含まれません。",
    options: {
      patterns: [{
        pattern: "no good",
        flags: "i"
      }]
    }
  }, {
    text: "この文章に、連続スペースは 含 ま れ ま せ ん。",
    options: {
      patterns: [{
        pattern: "[\s]{2,}"
      }]
    }
  }, {
    text: "この文章には、NGワードもNGパターンも含まれません。",
    options: {
      words: ["NG word"],
      patterns: [{
        pattern: "NG pattern",
        flags: "i"
      }]
    }
  }],

  invalid: [{
    text: "この文章には、NGワードが含まれます。",
    options: {
      words: ["NG"]
    },
    errors: [{
      message: `text contains NG word "NG".
text:
この文章には、NGワードが含まれます。
`,
      line: 1,
      column: 1
    }]
  }, {
    text: "この文章には、全角スペースが　含　ま　れ　ま　す。",
    options: {
      words: ["　"]
    },
    errors: [{
      message: `text contains NG word "　".
text:
この文章には、全角スペースが　含　ま　れ　ま　す。
`,
      line: 1,
      column: 1
    }]
  }, {
    text: "この文章には、NGパターンが含まれます。",
    options: {
      patterns: [{
        pattern: "Ng",
        flags: "i"
      }]
    },
    errors: [{
      message: `text contains NG pattern /Ng/i.
text:
この文章には、NGパターンが含まれます。
`,
      line: 1,
      column: 1
    }]
  }, {
    text: "この文章には、連続スペースが  含  ま    れ    ま        す。",
    options: {
      patterns: [{
        pattern: "[\\s]{2,}"
      }]
    },
    errors: [{
      message: `text contains NG pattern /[\\s]{2,}/.
text:
この文章には、連続スペースが  含  ま    れ    ま        す。
`,
      line: 1,
      column: 1
    }]
  }, {
    text: "この文章には、NG wordおよび、NG patternが含まれます。",
    options: {
      words: ["NG word"],
      patterns: [{
        pattern: "ng pattern",
        flags: "i"
      }]
    },
    errors: [{
      message: `text contains NG pattern /ng pattern/i.
text:
この文章には、NG wordおよび、NG patternが含まれます。
`,
      line: 1,
      column: 1
    }, {
      message: `text contains NG word "NG word".
text:
この文章には、NG wordおよび、NG patternが含まれます。
`,
      line: 1,
      column: 1
    }]
  }]
});

