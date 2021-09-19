"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.svelteTemplateEngine = void 0;
function svelteTemplateEngine(filePath, options, next) {
    const Component = require(filePath).default;
    let { html, head, css } = Component.render(options);
    if (css.code) {
        head = `${head}<style>${css.code}</style>`;
    }
    next(null, html.replace('%head%', head));
}
exports.svelteTemplateEngine = svelteTemplateEngine;
//# sourceMappingURL=svelte-template-engine.js.map