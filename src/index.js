import deepMerge from "deepmerge"
import SwaggerUI from "swagger-ui"
import EditorLayout from "./layout"

import EditorPlugin from "./plugins/editor"
import LocalStoragePlugin from "./plugins/local-storage"
import ValidateBasePlugin from "./plugins/validate-base"
import ValidateSemanticPlugin from "./plugins/validate-semantic"
import ValidateJsonSchemaPlugin from "./plugins/json-schema-validator"
import EditorAutosuggestPlugin from "./plugins/editor-autosuggest"
import EditorAutosuggestSnippetsPlugin from "./plugins/editor-autosuggest-snippets"
import EditorAutosuggestKeywordsPlugin from "./plugins/editor-autosuggest-keywords"
import EditorAutosuggestOAS3KeywordsPlugin from "./plugins/editor-autosuggest-oas3-keywords"
import EditorAutosuggestRefsPlugin from "./plugins/editor-autosuggest-refs"
import PerformancePlugin from "./plugins/performance"
import JumpToPathPlugin from "./plugins/jump-to-path"
import SplitPaneModePlugin from "./plugins/split-pane-mode"
import ASTPlugin from "./plugins/ast"

// eslint-disable-next-line no-undef
const { GIT_DIRTY, GIT_COMMIT, PACKAGE_VERSION } = buildInfo

window.versions = window.versions || {}
window.versions.swaggerEditor = `${PACKAGE_VERSION}/${GIT_COMMIT || "unknown"}${GIT_DIRTY ? "-dirty" : ""}`
const plugins = {
  EditorPlugin,
  ValidateBasePlugin,
  ValidateSemanticPlugin,
  ValidateJsonSchemaPlugin,
  LocalStoragePlugin,
  EditorAutosuggestPlugin,
  EditorAutosuggestSnippetsPlugin,
  EditorAutosuggestKeywordsPlugin,
  EditorAutosuggestRefsPlugin,
  EditorAutosuggestOAS3KeywordsPlugin,
  PerformancePlugin,
  JumpToPathPlugin,
  SplitPaneModePlugin,
  ASTPlugin,
}

const defaults = {
  // we have the `dom_id` prop for legacy reasons
  dom_id: "#swagger-editor", // eslint-disable-line camelcase
  layout: "EditorLayout",
  presets: [
    SwaggerUI.presets.apis
  ],
  plugins: [
    ...Object.values(plugins),
    () => ({ components: { EditorLayout } }),
    SwaggerUI.plugins.SafeRender({
      fullOverride: true,
      componentList: [
        "StandaloneLayout",
        "EditorLayout",
        "Topbar",
        "EditorContainer",
      ],
    })
  ],
  showExtensions: true,
  swagger2GeneratorUrl: "null",
  oas3GeneratorUrl: "null",
  swagger2ConverterUrl: "http://localhost:3000/api/convert",
}

export default function SwaggerEditor(options) {
  let mergedOptions = deepMerge(defaults, options)

  mergedOptions.presets = defaults.presets.concat(options.presets || [])
  mergedOptions.plugins = defaults.plugins.concat(options.plugins || [])
  return SwaggerUI(mergedOptions)
}

SwaggerEditor.plugins = plugins
