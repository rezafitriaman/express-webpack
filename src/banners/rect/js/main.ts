import {CustomFramework} from "../../framework/framework";

// this the parent of a banner, instant of CustomFramework
// todo an generic function for all the rect banner goes hier:
//      browser check
//      show banner or hide
//      start ads
//
export class Rect extends CustomFramework {
    bannerName: unknown;
    constructor(theBannerName: unknown, theDummyData: unknown) {
        super(theBannerName, theDummyData);
        this.bannerName = theBannerName;
    }
    color(standardColor: string = 'transparent') {
        console.log(`${this.bannerName} has ${standardColor} color.`);
        //this.greet()
    }
}
