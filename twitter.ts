abstract class Users {
    name : string;
    handle : string;
    bio : string;
    info : string;
    joined_date : Date;
    following : number;
    followers : number;
    constructor(name : string, handle : string, bio : string, info : string, joined_date : Date, followers : number, following : number){
        this.name = name;
        this.handle = handle;
        this.bio = bio;
        this.info = info;
        this.joined_date = joined_date;
        this.followers = followers;
        this.following = following;
    }

    isMonitized() : boolean {
        if(this.followers >= 10000){
            return true;
        }
        return false;
    }

    abstract booster(likes : number ,views : number, isVerified : boolean) : number
    abstract display() : {}
}

class Personal extends Users {
    private isVerified : boolean 
    constructor(name : string, handle : string, bio : string, info : string, joined_date : Date, followers : number, following : number, isVerified:boolean) {
        super(name, handle, bio, info, joined_date, followers, following);
        this.isVerified = isVerified;
    }

    booster(likes : number ,views : number, isVerified : boolean) : number {
        if(this.isMonitized()){
            let totalReach : number = likes * views;
            if(isVerified){
                return Math.round(((totalReach * 0.90) ^ 3))
            }else{
                return Math.round(((totalReach * 0.50) ^ 2))
            }
        }else {
            return 100
        }
    }

    display(): {} {
        return {
            "name" : this.name,
            "handle" : this.handle,
            "bio" : this.bio,
            "info" : this.info,
            "joined_date" : this.joined_date,
            "followers" : this.followers,
            "following"  : this.following,
            "isVerified" : this.isVerified
        }
    }
}

const gourav = new Personal(
    "Gourav Ojha",
    "gouravojha",
    "Software Engineer",
    "I build robust Systems",
    new Date(),
    10000,
    10000000,
    true
)

const user = gourav.display()
console.log(user)
console.log(gourav.booster(100,1000,true))
