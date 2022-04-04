const core = require('@actions/core')
const tc = require('@actions/tool-cache')


function getLatestVersion() {
    // TODO: get tags from github
    return "0.30.0"
}

function getLatestUrl() {
    let version = getLatestVersion()
    // TODO: handle arch and OS
    return `https://github.com/open-policy-agent/conftest/releases/download/v${version}/conftest_${version}_Linux_x86_64.tar.gz`
}

async function setup() {
    try {
        const conftestPath = await tc.downloadTool(getLatestUrl())
        const extractedFolder = await tc.extractTar(conftestPath)
        const cachedPath = await tc.cacheDir(extractedFolder, 'conftest', '0.30.0')
        core.addPath(cachedPath)
        console.log(`conftest installed to ${cachedPath}`)

    } catch (error) {
        core.setFailed(error.message)
    }
}

module.exports = setup

if (require.main === module) {
    setup();
  }