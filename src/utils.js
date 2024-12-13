const { app } = require('electron')
const fse = require('fs-extra')
const path = require('path')
const isElevated = require('is-elevated')
const { exec } = require('child_process');
const { showDialog } = require('./notifier')

// 退出应用
const appQuit = () => {
  console.log('App Quit')
  app.quit()
}

// 重新启动应用
const appRelaunch = () => {
  console.log('App Relaunch')
  app.relaunch({ args: process.argv.slice(1) + ['--relaunch'] })
  app.exit(0)
}

// 删除配置文件
const removeConfigFile = () => {
  let filePath = path.join(global.USERDATA_PATH, 'config.json')
  try {
    fse.removeSync(filePath);
    console.log('removeConfigFile success')
    appRelaunch()
  } catch (e) {
    console.log('removeConfigFile ERROR:', e)
    appQuit()
  }
}

// 安装证书
const installCertificate = async () => {
  // 判断证书文件路径
  let certRelativePath = '../assets/ca.crt'
  if(!app.isPackaged) {
    certRelativePath = './assets/ca.crt'
  }
  const CERT_PATH = path.join(global.ROOT_PATH, certRelativePath);
  console.log('CERT_PATH:', CERT_PATH)
  // 处理证书错误
  const handleCertificateError = (error) => {
    const errorMessages = {
        'EACCES': '没有足够的权限，请以管理员身份运行',
        'ENOENT': '证书文件不存在',
        'EINVAL': '无效的证书格式'
    };

    showDialog({ message: errorMessages[error.code] })
  }


  // 检查管理员权限（Windows）
  const isRunAsAdmin = async () => {
    if (process.platform !== 'win32') {
      return false;
    }
    try {
      let result = await isElevated();
      console.log('isRunAsAdmin result:', result)
      return result;
    } catch (error) {
      console.error('检查管理员权限失败:', error);
      handleCertificateError({ code: 'EACCES' });
      return false;
    }
  }
  
  // 安装证书到系统（windows）
  const installCertToSystem = async (certPath) => {
    const options = {
      storeName: 'ROOT', // Windows 证书存储位置
      force: true,       // 是否强制覆盖已存在的证书
      silent: false,     // 是否静默安装
      timeout: 30000     // 命令执行超时时间
    };
    // 根据不同选项构建命令
    let command;
    const forceFlag = options.force ? '-f' : '';
    command = `certutil -addstore ${forceFlag} "${options.storeName}" "${certPath}"`;
    console.log('command:', command)
    return new Promise((resolve, reject) => {
      exec(command, {
        timeout: options.timeout,
        windowsHide: options.silent
      }, (error, stdout, stderr) => {
        // 输出命令执行结果
        if(stdout) {
          console.log('stdout:', stdout)
        }
        if (error) {
          reject(error);
        }
        resolve(stdout);
      });
    });
  }

  // 检查证书文件是否存在
  if (!fse.existsSync(CERT_PATH)) {
    handleCertificateError({ code: 'ENOENT' });
    return;
  }
  // 检查是否以管理员身份运行
  if (await isRunAsAdmin()) {
    try { 
      await installCertToSystem(CERT_PATH);
      showDialog({ message: '证书安装成功' })
    } catch (error) {
      handleCertificateError(error);
    }
  } else {
    handleCertificateError({ code: 'EACCES' });
  }
}

module.exports = {
  appQuit,
  appRelaunch,
  removeConfigFile,
  installCertificate
}