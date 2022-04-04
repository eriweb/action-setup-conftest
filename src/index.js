const core = require('@actions/core')
const tc = require('@actions/tool-cache')


function getLatestVersion() {
    // TODO: get tags from github
    return "0.30.0"
}

function getLatestUrl(version) {
    // TODO: handle arch and OS
    return `https://github.com/open-policy-agent/conftest/releases/download/v${version}/conftest_${version}_Linux_x86_64.tar.gz`
}

async function setup() {
    try {
        const version = getLatestVersion()
        let toolPath = tc.find('conftest', version)
        if (toolPath) {
            core.info(`Found conftest in tool cache at ${toolPath}`)
        } else {
            core.info(`Attempting to resolve and download conftest version ${version}`)
            const conftestPath = await tc.downloadTool(getLatestUrl(version))
            const extractedFolder = await tc.extractTar(conftestPath)
            toolPath = await tc.cacheDir(extractedFolder, 'conftest', version)
        }
        core.addPath(toolPath)
        console.log(`conftest installed to ${toolPath}`)

    } catch (error) {
        core.setFailed(error.message)
    }
}

module.exports = setup

if (require.main === module) {
    setup();
  }