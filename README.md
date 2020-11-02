This repo contains a script which transforms the `npm audit` json output into another json which can be consumed by Jenkins Warnings Next Generation plugin. For more details please read https://uko.codes/npm-audit-jenkins-warnings-next-generation-native-json-format.

You can run the script like:

    npm audit --json | node transform-audit.js > issues.json
