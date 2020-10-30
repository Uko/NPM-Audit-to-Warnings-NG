let data = '';
process.stdin.setEncoding('utf8');
process.stdin.on('readable', () => {
    let chunk = process.stdin.read();
    if (chunk !== null) {
        data += chunk;
    }
});

function warningsNGSeverity(string) {
    switch (string) {
        case 'low': return 'LOW';
        case 'moderate': return 'NORMAL';
        case 'high': return 'HIGH';
        case 'critical': return 'ERROR';

        default: return 'NORMAL';
    }
}

process.stdin.on('end', () => {

    const audit = JSON.parse(data);

    const actions = audit.actions;
    const advisories = audit.advisories;

    const issues = actions.flatMap((action) =>
        action.resolves.map((resolve) => {
            const advisory = advisories[resolve.id];
            return {
                fileName: resolve.path,
                packageName: advisory.module_name,
                cattegory: advisory.title,
                type: action.action,
                message: advisory.recommendation,
                description: `${advisory.overview}\nRead more at: ${advisory.url}`,
                severity: warningsNGSeverity(advisory.severity)
            };
        }));

    console.log(JSON.stringify({ issues: issues }));
});
