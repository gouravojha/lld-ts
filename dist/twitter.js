"use strict";
class Users {
    constructor(name, handle, bio, info, joined_date, followers, following) {
        this.name = name;
        this.handle = handle;
        this.bio = bio;
        this.info = info;
        this.joined_date = joined_date;
        this.followers = followers;
        this.following = following;
    }
    isMonitized() {
        if (this.followers >= 10000) {
            return true;
        }
        return false;
    }
}
class Personal extends Users {
    constructor(name, handle, bio, info, joined_date, followers, following, isVerified) {
        super(name, handle, bio, info, joined_date, followers, following);
        this.isVerified = isVerified;
    }
    booster(likes, views, isVerified) {
        if (this.isMonitized()) {
            let totalReach = likes * views;
            if (isVerified) {
                return Math.round(((totalReach * 0.90) ^ 3));
            }
            else {
                return Math.round(((totalReach * 0.50) ^ 2));
            }
        }
        else {
            return 100;
        }
    }
    display() {
        return {
            "name": this.name,
            "handle": this.handle,
            "bio": this.bio,
            "info": this.info,
            "joined_date": this.joined_date,
            "followers": this.followers,
            "following": this.following,
            "isVerified": this.isVerified
        };
    }
}
const gourav = new Personal("Gourav Ojha", "gouravojha", "Software Engineer", "I build robust Systems", new Date(), 10000, 10000000, true);
const user = gourav.display();
console.log(user);
console.log(gourav.booster(100, 1000, true));
