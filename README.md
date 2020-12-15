# onDutySchedulle.js
onDutySchedulle is a cronJob wrap for [onDutyJs](https://github.com/PhantasWeng/onDuty.js), base on pm2.


### Install
1. Install dependencies package
`npm install` or `yarn install`

2. Set login info
  - Copy **.env.example** to **.env**
  - Set your **username** and **password** in `.env`
  - You can also set timer option
    - default workDay: 1-5
    - default punchTime: 10,19
  - Create a bot on telegram. [@botfather](https://telegram.me/BotFather)
    - Add your bot appToken into .env
    - Add you userID into .env

### Run
For NPM:
Command: `npm run start` `npm run stop` or enter command `npm run` to list all options.

For Yarn:
use Command: `yarn start` to start, `yarn stop` to stop.

### AUTO STARTUP
If you have install `pm2` in global. you can use these script to create a `autostart` after server bootup or reboot.
1. create a platform with `pm2 startup`
2. Run your single-punch by `npm run start` or `yarn start`
3. use `pm2 save` to save the process.
4. `sudo reboot` to reboot your server, and see if its works.

