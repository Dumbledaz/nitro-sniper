# Nitro Sniper [![CodeFactor](https://www.codefactor.io/repository/github/hellbound1337/nitro-sniper/badge)](https://www.codefactor.io/repository/github/hellbound1337/nitro-sniper) [![GitHub issues](https://img.shields.io/github/issues/hellbound1337/nitro-sniper?style=flat)](https://github.com/hellbound1337/nitro-sniper/issues) [![GitHub stars](https://img.shields.io/github/stars/hellbound1337/nitro-sniper?style=flat)](https://github.com/hellbound1337/nitro-sniper/stargazers)
Snipe nitro gift codes from alt accounts to your main account.

# Preview 
![Preview](https://i.imgur.com/PU3QaZc.png)

# Features
- Colours for your eyes to distinguish success and failure.
- Multi-token support.
- Notifications work if you don't use your main token for sniping.
- Removes non-alphanumeric chars automatically from codes and tries to redeem.
- Auto-detects obvious fake codes.
- Light, no cluttered code, very simple and efficient.
- One-click deploy.

# Installation methods
#### Heroku (recommended)
Click on the image below and login to continue the setup.  

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/hellbound1337/nitro-sniper/tree/master)  

#### Local
- Make sure [Node](https://nodejs.org/en/) is installed on your system and open a command prompt/terminal.
- Run `git clone https://github.com/hellbound1337/nitro-sniper nitro-sniper`
- Run `cd nitro-sniper`
- Run `npm install`
- Edit the dotenv file. <br>
    - To insert multiple tokens in the guildTokens variable, use `,` as a separator.<br>
    - Example: `token1,token2`
- Run `node .`

# Tips
- The less the latency to discord servers, the better; You could be competing with other snipers. <br>
    - High bandwidth hosting would benefit the sniper.
- There's a really high risk you might get terminated using this. <br>
    - Do not mention you have this anywhere. <br>
    - This is technically stealing money from discord.