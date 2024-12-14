const cron = require('node-cron');

const userService = require('../Services/userServices');
const Users = require('../Models/userModel');

const currentTime = new Date();

// Extract individual components of the current time
const currentHour = currentTime.getHours();
const currentMinute = currentTime.getMinutes();
const currentSecond = currentTime.getSeconds();

const growBalance = async ()=>{
    try{
        const users = await Users.find({plan:'starter'}).exec();
        for(const user of users){
            if (!user.trade.autoTrade || user.balance===user.trade.stopAt){
                continue;
            }
            user.balance += user.balance * 0.1;
            await userService.updateUserBalance(user.id, user.balance)
            console.log(`users ${user.fullName} balance updated by plan Starter at ${new Date().toISOString()}`)
        }
    }catch(err){
        console.error(err)
    }
}

const growBronzeBalance = async ()=>{
    try{
        const users = await Users.find({plan:'bronze'}).exec();
        for (const user of users){
            if (!user.trade.autoTrade || user.balance===user.trade.stopAt){
                continue;
            }
            user.balance += user.balance * 0.2;
            await userService.updateUserBalance(user.id, user.balance)
            console.log(`users ${user.fullName} balance updated by plan Bronze  at ${new Date().toISOString()}`)
        }
    }catch(err){
        console.error(err)
    }
}
const growSilverBalance = async ()=>{
    try{
        const users = await Users.find({plan:'silver'}).exec();
        for (const user of users){
            if (!user.trade.autoTrade || user.balance===user.trade.stopAt){
                continue;
            }
            user.balance += user.balance * 0.3;
            await userService.updateUserBalance(user.id, user.balance)
            console.log(`users ${user.fullName} balance updated by plan Silver  at ${new Date().toISOString()}`)
        }
    }catch(err){
        console.error(err)
    }
}
const growDiamondBalance = async ()=>{
    try{
        const users = await Users.find({plan:'diamond'}).exec();
        for (const user of users){
            if (!user.trade.autoTrade || user.balance===user.trade.stopAt){
                continue;
            }
            user.balance += user.balance * 0.5;
            await userService.updateUserBalance(user.id, user.balance)
            console.log(`users ${user.fullName} balance updated by plan Diamond  at ${new Date().toISOString()}`)
        }
    }catch(err){
        console.error(err)
    }
}

const cronBalanceJob ={
    growBalance,
    growBronzeBalance,
    growSilverBalance,
    growDiamondBalance,
}
module.exports= cronBalanceJob;