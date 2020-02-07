let selectorLintConfig = {
    global: {
        // Simple
        type: true,
        class: true,
        id: false,
        universal: false,
        attribute: false,

        // Pseudo
        psuedo: false,
    },

    local: {
        // Simple
        type: true,
        class: true,
        id: false,
        universal: true,
        attribute: true,

        // Pseudo
        psuedo: true,
    },

    options: {
        excludedFiles: ['admin_overrides.css'],
    }
};

module.exports = {
    plugins: [
        require('autoprefixer'),
        require('cssnano'),
        // require('postcss-selector-lint')(selectorLintConfig)
    ]
};
