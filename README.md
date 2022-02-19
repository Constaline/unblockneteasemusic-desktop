# UnblockNeteaseMusic Desktop

UnblockNeteaseMusic Windows Desktop version.

## Usage
1. Run and it listens at port 16163 (default).
2. Open NeteaseMusic client, set proxy to IP 127.0.0.1, port 16163.
3. Save and restart the NeteaseMusic client. Enjoy!

## Download
See [Release Page](https://github.com/Constaline/unblockneteasemusic-desktop/releases)

## Settings 
1. Click tray icon in the system's notification area, and click "Configuration" in context menu.
2. Edit `config.json`.
3. Relaunch the UnblockNeteaseMusic client.

#### `config.json` arugments

|key|description|default|optional|
|---|-----------|-------|--------|
|port|The HTTP proxy port.|`16163`|-|
|source|Rewrite file url, let client request file through source list.|-|-|

## Thanks
* [nondanee/UnblockNeteaseMusic](https://github.com/nondanee/UnblockNeteaseMusic)
* [UnblockNeteaseMusic/server](https://github.com/UnblockNeteaseMusic/server)
* [njzydark/UnblockNeteaseMusic](https://github.com/njzydark/UnblockNeteaseMusic)
* [aynakeya/UnblockNeteaseMusic](https://github.com/aynakeya/UnblockNeteaseMusic)