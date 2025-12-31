module.exports = {
    apps: [
        {
            name: 'momomagicwebsite',
            script: 'npm',
            args: 'start',
            env: {
                NODE_ENV: 'production',
                PORT: 3000
            }
        }
    ]
}
