import {Rect} from "./main";
//import {CustomFramework} from "../../framework/framework";

// this is a banner
// todo function animation
//      function on specific banner
export class B250x250 extends Rect{
    constructor(theDummyData: unknown, theBannerName: unknown = '250x250') {
        super(theBannerName, theDummyData);
    }
    start() {
        this.politeInit();
        let _this = this;
        let inter = setInterval(wait, 1000);

        function wait() {
            if(_this.isDevelop !== null) {
                _this.initCode();
                clearInterval(inter);
            }
        }
    }
    color(standardColor = 'red') {
        console.log("hot...");
        super.color(standardColor);
    }
    initCode() {
        console.log('code initialized');

        this.color();
    }
}

