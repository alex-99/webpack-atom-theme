const Zip = require("jszip");
const saver = require("file-saver")
import * as data from "../data.js";

export default function build() {
  const zip = new Zip();
  zip.file("index.less", indexLess());
  zip.file("package.json", packageJson());
  zip.file("README.md", readme());

  let stylesheets = zip.folder("stylesheets");

  stylesheets.file("base.less", baseLess());
  stylesheets.file("syntax-variables.less", syntaxVariablesLess());
  stylesheets.file("colors.less", colors());

  zip.generateAsync({type:"blob"})
  .then(function (blob) {
    saver.saveAs(blob, data.meta.name + ".zip");
  });
}

function readme() {
  return `# ${data.meta.name}
  made with: `
}
function indexLess() {
  return `@import "./stylesheets/base.less";`
}

function packageJson() {
  data.meta.name += "-syntax";
  return JSON.stringify(data.meta)
}

function colors() {
  return `// These colors are specific to the theme. Do not use in a package!

@very-light-gray: ${data.colors.veryLightGray};
@light-gray: ${data.colors.lightGray};
@gray: ${data.colors.gray};
@dark-gray: ${data.colors.darkGray};
@very-dark-gray: ${data.colors.veryDarkGray};

@cyan: ${data.colors.cyan};
@blue: ${data.colors.blue};
@purple: ${data.colors.purple};
@green: ${data.colors.green};
@red: ${data.colors.red};
@orange: ${data.colors.orange};
@light-orange: ${data.colors.lightOrange};`
}

function syntaxVariablesLess() {
  return `@import "colors";

// This defines all syntax variables that syntax themes must implement when they
// include a syntax-variables.less file.

// General colors
@syntax-text-color: @very-light-gray;
@syntax-cursor-color: white;
@syntax-selection-color: lighten(@dark-gray, 10%);
@syntax-selection-flash-color: @very-light-gray;
@syntax-background-color: @very-dark-gray;

// Guide colors
@syntax-wrap-guide-color: @dark-gray;
@syntax-indent-guide-color: @gray;
@syntax-invisible-character-color: @gray;

// For find and replace markers
@syntax-result-marker-color: @light-gray;
@syntax-result-marker-color-selected: white;

// Gutter colors
@syntax-gutter-text-color: @very-light-gray;
@syntax-gutter-text-color-selected: @syntax-gutter-text-color;
@syntax-gutter-background-color: @dark-gray;
@syntax-gutter-background-color-selected: @gray;

// For git diff info. i.e. in the gutter
@syntax-color-renamed: @blue;
@syntax-color-added: @green;
@syntax-color-modified: @orange;
@syntax-color-removed: @red;`
}

function baseLess() {
  return `@import "syntax-variables";

atom-panel.modal {
  border: 2px solid #000;
  background-color: @dark-gray;
}

atom-panel.modal .select-list ol.list-group {
  background-color: @dark-gray;
}

atom-panel.modal .select-list ol.list-group li.selected span {
  color: @light-gray;
}

atom-panel.modal .select-list ol.list-group li.selected {
  color: @light-gray;
}

.selected kbd {
  background: @light-gray;
  color: #000;
}

.find-and-replace,
.project-find {
  background-color: @dark-gray;
}

.find-and-replace .options-label .options,
.project-find .options-label .options {
  color: @light-gray;
}

.find-and-replace .description,
.project-find .description {
  color: @light-gray;
}

.find-and-replace .description .subtle-info-message .highlight,
.project-find .description .subtle-info-message .highlight {
  color: @light-gray;
}

.find-and-replace .find-meta-container .result-counter {
  color: @light-gray;
}

atom-text-editor::shadow .highlight.find-result .region {
  border-color: @purple;
}

atom-text-editor, :host {
  background-color: @syntax-background-color;
  color: @syntax-text-color;

  .wrap-guide {
    background-color: @syntax-wrap-guide-color;
  }

  .indent-guide {
    color: @syntax-indent-guide-color;
  }

  .invisible-character {
    color: @syntax-invisible-character-color;
  }

  .gutter {
    background-color: @syntax-gutter-background-color;
    color: @syntax-gutter-text-color;

    .line-number {
      &.cursor-line {
        background-color: @syntax-gutter-background-color-selected;
        color: @syntax-gutter-text-color-selected;
      }

      &.cursor-line-no-selection {
        color: @syntax-gutter-text-color-selected;
      }
    }
  }

  .gutter .line-number.folded,
  .gutter .line-number:after,
  .fold-marker:after {
    color: @light-gray;
  }

  .invisible {
    color: @syntax-text-color;
  }

  .cursor {
    color: @syntax-cursor-color;
  }

  .selection .region {
    background-color: @syntax-selection-color;
  }
}

atom-text-editor .search-results .marker .region,
:host .search-results .marker .region {
  background-color: transparent;
  border: 1px solid @syntax-result-marker-color;
}

atom-text-editor .search-results .marker.current-result .region,
:host .search-results .marker.current-result .region {
  border: 1px solid @syntax-result-marker-color-selected;
}

.comment {
  color: @dark-gray;
}

.keyword {
  color: @light-orange;

  &.control {
    color: @light-orange;
  }

  &.operator {
    color: @light-gray;
  }

  &.css {
    &.operator.logic {
      color: @blue;
    }
  }

  &.other.special-method {
    color: @blue;
  }

  &.other.unit {
    color: @light-orange;
  }
}

.storage {
  color: @light-gray;

  &.type {
	&.js {
	  color: @blue;
	  font-style: italic;
    }
  }

  &.modifier {
	color: @blue;
	font-style: italic;
  }

  &.js {
    &.type {
      &.function {
        color: @light-orange;
        font-style: italic;
      }
      &.var {
        color: @blue;
        font-style: italic;
      }
	  &.variable {
        color: @blue;
        font-style: italic;
      }
    }
  }
}

.punctuation.quasi.element.js {
  color: @red;
  font-weight: bolder;
}

.storage.type.function.arrow.js {
  color: @red;
  font-weight: bolder;
  font-style: normal;
}

.function.arrow.js .name.function {
  color: @gray;
}

.source.js.jsx .entity.other.attribute-name {
  font-style: normal!important;
}

.punctuation.section.embedded.jsx {
  color: @red;
  font-weight: bolder;
}

.keyword.operator.spread.js {
  color: @red;
  font-weight: bolder;
}

.keyword.control.module.js {
  color: @purple;
}

.support.class.component.jsx {
  color: @blue;
  font-weight: bold;
  font-style: normal;
}

.entity.name.tag.jsx {
  color: @blue;
  font-weight: bold;
}

.text {
  &.html {
    &.basic {
      color: @light-gray;
    }
  }
}

.constant {
  &.character.escape {
    color: @light-gray;
  }

  &.character {
    color: @light-orange;
  }

  &.numeric {
    color: @purple;
  }

  &.other.color {
    color: @light-orange;
  }

  &.other.symbol {
    color: @green;
  }

  &.js {
    &.boolean {
      color: @light-orange;
    }
  }
}

.string.unquoted.js {
  color: @gray;
}

.variable {
  color: @gray;

  &.interpolation {
    color: @red;
	font-weight: bolder;
  }

  &.other {
    &.js {
      color: @gray;
    }
  }

  &.parameter {
    &.js {
      color: @blue;
      font-style: italic;
    }
    &.css {
      color: @light-orange;
    }
  }
}

.invalid.illegal {
  background-color: @red;
  color: @syntax-background-color;
}

.string {
  color: @green;

  &.quoted.js {
    color: @green;
  }

  &.regexp {
    color: @light-orange;

    .source.ruby.embedded {
      color: @light-orange;
    }

	.anchor {
		color: @blue;
	}

	.constant {
		color: @red;
	}

	.punctuation.definition.string.begin,
	.punctuation.definition.string.end {
	  color: @purple;
	}
  }

  &.other.link {
    color: @blue;
  }
}

.punctuation {
  &.css {
    &.property-list {
      color: @gray;
    }
    &.separator {
      color: @light-gray;
    }
    &.terminator {
      color: @light-gray;
    }
  }
  &.definition {
    &.css {
      &.constant {
        color: @light-orange;
      }
    }
    &.tag {
      color: @light-gray;
      font-weight: bold;
    }
    &.comment {
      color: @dark-gray;
    }

    &.variable,
    &.parameters,
    &.array {
      color: @syntax-text-color;
    }

    &.string {
      color: @green;
    }

    &.heading,
    &.identity {
      color: @blue;
    }

    &.bold {
      font-weight: bold;
    }

    &.italic {
      font-style: italic;
    }
  }

  &.section {
    &.css {
      &.function {
        color: @gray;
      }
    }
  }

  &.section.embedded {
    color: @red;
  }
}

.support {
  &.class {
    color: @blue;
    font-style: italic;
  }

  &.constant  {
    &.js {
      color: @light-gray;
    }
  }

  &.function  {
    &.js {
      color: @light-gray;
    }

    &.any-method {
      color: @blue;
    }
  }
  &.css {
    &.property-name {
      color: @gray;
      font-style: italic;
      font-weight: bold;
    }
    &.constant {
      color: @blue;
    }
    &.function.misc {
      color: @blue;
    }
  }
}

.entity {
  &.js {
    &.instance.name.type {
      color: @blue;
      font-style: italic;
    }
  }

  &.other.inherited-class {
    color: @light-gray;
  }

  &.name.class, &.name.type.class {
    color: @light-gray;
	font-weight: bold;
  }

  &.name.section {
    color: @blue;
  }

  &.name.function {
    color: @light-gray;
  }

  &.html {
    &.name.tag {
      color: @blue;
      font-weight: bold;
    }
    &.other.attribute-name {
      color: @red;
    }
	&.other.attribute-name.id {
      color: @red;
    }
  }

  &.css {
    &.name.tag {
      color: @gray;
    }
  }

  &.other.attribute-name {
    color: @red;

    &.id {
      color: @green;
    }
  }
}

.meta {
  &.css {
    &.property-value {
      color: @gray;
    }
  }

  &.html {
    &.tag {
      color: @gray;
    }
  }

  &.class {
    color: @light-gray;
  }

  &.link {
    color: @light-orange;
  }

  &.require {
    color: @blue;
  }

  &.selector {
    color: @light-orange;
  }

  &.separator {
    background-color: @gray;
    color: @syntax-text-color;
  }

  &.delimiter {
    color: @light-gray;
  }

  &.brace.curly {
    &.js {
	  color: @light-gray;
	}
  }

  &.brace.square {
    &.js {
	  color: @light-gray;
	}
  }
}

.none {
  color: @syntax-text-color;
}

.markup {
  &.bold {
    color: @light-orange;
    font-weight: bold;
  }

  &.changed {
    color: @red;
  }

  &.deleted {
    color: @red;
  }

  &.italic {
    color: @red;
    font-style: italic;
  }

  &.heading .punctuation.definition.heading {
    color: @blue;
  }

  &.inserted {
    color: @green;
  }

  &.list {
    color: @red;
  }

  &.quote {
    color: @light-orange;
  }

  &.raw.inline {
    color: @green;
  }

  &.underline.link.gfm {
    color: @blue;
  }
}

.source.gfm .markup {
  -webkit-font-smoothing: auto;
  &.heading {
    color: @green;
  }
}

.source.gfm .variable.ordered.list.gfm,
.source.gfm .variable.unordered.list.gfm {
  color: @red;
}

.source.gfm .support.gfm,
.source.gfm .markup.raw.gfm {
  color: @purple;
}

.source.gfm .link .entity.gfm {
  font-style: italic;
}

.source.gfm .link .punctuation {
  &.definition.begin.gfm {
    color: @blue;
  }

  &.definition.end.gfm {
    color: @blue;
  }
}

atom-text-editor[mini] .scroll-view,
:host([mini]) .scroll-view {
  padding-left: 1px;
}

.meta > .storage.type + .entity.name {
  color: @light-gray;
  font-weight: bolder;
}
`
}
