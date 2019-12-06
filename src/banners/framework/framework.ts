// todo function play pause repeat for the banner
//      polite init /onload
//      show ads when local or production
//      dummy data
//      function dynamic font size
//      dynamic ads (Adform.DynAdsHelper.getVar())
//      browser check /msieversion crome apple safari
//      function enabler adform or doubleclic

//import { B300x250 } from "../rect/js/b300x250";
//import { B250x250 } from "../rect/js/b250x250";
//import { Rect } from "../rect/js/main";

export class CustomFramework {
    bannerName: unknown;
    politeLoading: unknown;
    develop: boolean;
    dummyData: any;
    isDevelop: boolean = null;
    constructor(theBannerName: unknown, theDummyData: unknown) {
        // @ts-ignore dhtml comes from adform library
        this.politeLoading = dhtml.getVar('bn', 0);
        this.develop = (window.location.href.indexOf('9999') != -1);
        this.bannerName = theBannerName;
        this.dummyData = theDummyData;
    }
    politeInit() {
        if (this.politeLoading) {
            // when banner is served from tag
            // @ts-ignore
            dhtml.sharedEvents.once('pageLoadComplete', this.showAd);

            // noinspection JSDeprecatedSymbols
            // @ts-ignore
            dhtml.external.initPoliteMode();
        } else {
            let _this = this;
            // when testing locally
            setTimeout(function(){ _this.showAd(_this) }, 2000);
        }
    }
    showAd (_this:any) {

        let banners: NodeList = document.querySelectorAll('.present #content');
        let spinners: NodeList = document.querySelectorAll('.spinner');

        banners.forEach(banner => (<HTMLElement>banner).style.display = 'flex');
        spinners.forEach(spinner => (<HTMLElement>spinner).style.display = 'none');

        _this.env(_this)
    }
    env(_this:any) {
        //todo make this function right / on develop start or production start
        if(_this.develop) {
            console.log('banner-start', _this.bannerName);
            console.log('framework', _this);

            // @ts-ignore comes from adform library
            Adform.DynAdsHelper.setDemoData(_this.dummyData );

            this.isDevelop = true;
            (<any>window).env = 'develop';
        }else {

            this.isDevelop = false;
            (<any>window).env = 'live';
        }
    }
    // generic function
    dynamicFontsize(target:any, parentContainer:any) {

        while(target.offsetWidth > parentContainer.offsetWidth) {

            target.style.fontSize = (parseInt(window.getComputedStyle(target, null).getPropertyValue("font-size")) -1) + 'px';

        }
    }
    greet() {
        console.log(`Hey ${this.bannerName}, this is from CustomFramework`);
    }
}
