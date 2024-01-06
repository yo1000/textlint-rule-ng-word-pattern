textlint-rule-ng-word-pattern
========================================

Forked from https://github.com/KeitaMoromizato/textlint-rule-ng-word.git

[textlint](https://github.com/textlint/textlint) rule that check NG word with RegExp support.


Installation
----------------------------------------

```
npm install textlint-rule-ng-word-pattern
```

## Usage

Via .textlintrc

```json
{
    "rules": {
        "ng-word-pattern": {
            "words": ["NG", "No Good"]
        }
    }
}
```

```json
{
    "rules": {
        "ng-word-pattern": {
            "patterns": [{
                "pattern": "NG",
                "flags": "i"
            }, {
                "pattern": "No ?Good",
                "flags": "i"
            }]
        }
    }
}
```

Via CLI

```
textlint --rule ng-word-pattern README.md
```


Tests
----------------------------------------

```
npm test
```


License
----------------------------------------

MIT

