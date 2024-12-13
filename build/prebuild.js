const fse = require('fs-extra');
const path = require('path');
const ROOT_PATH = path.join(__dirname, '..');

// 复制lib\UnblockNeteaseMusic\ca.crt到目录assets\ca.crt
const copy_crt = () => {
    const sourcePath = path.join(ROOT_PATH, 'lib', 'UnblockNeteaseMusic', 'ca.crt');
    const targetPath = path.join(ROOT_PATH, 'assets', 'ca.crt');
    fse.copySync(sourcePath, targetPath);
    console.log('Copy ca.crt success');
}

const main = () => {
    copy_crt();
}

main();
