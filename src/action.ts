import * as core from "@actions/core"
import * as tc from "@actions/tool-cache"
import { exec } from "@actions/exec"

export async function run() {
    console.log('hello')
    await install()
    await execute()

}

function getLatestVersion() {
    // TODO: get tags from github
    return "0.30.0"
}

function getLatestUrl() {
    let version = getLatestVersion()
    // TODO: handle arch and OS
    return `https://github.com/open-policy-agent/conftest/releases/download/v${version}/conftest_${version}_Linux_x86_64.tar.gz`
}

async function execute() {
    try {
        await exec("conftest")
    } catch(error) {
        core.setFailed(getErrorMessage(error))
    }
    
}
async function install() {
    try {
        const conftestPath = await tc.downloadTool(getLatestUrl())
        const extractedFolder = await tc.extractTar(conftestPath)
        const cachedPath = await tc.cacheDir(extractedFolder, 'conftest', '0.30.0')
        core.addPath(cachedPath)
        console.log(`conftest installed to ${cachedPath}`)

    } catch (error) {
        core.setFailed(getErrorMessage(error))
    }
}

function getErrorMessage(error: unknown) {
    if (error instanceof Error) return error.message
    return String(error)
}
