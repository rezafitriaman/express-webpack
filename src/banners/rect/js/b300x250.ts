/// <reference path="../../../../node_modules/@types/gsap/index.d.ts" />

import {Rect} from "./main";
// this is a banner
// todo function animation
//      function on specific banner
export class B300x250 extends Rect {
    selectors:any;
    targetBanner: any;
    clickTAGvalue: any;
    landingpagetarget: any;
    dynAdsHelper: any;
    constructor(theDummyData: unknown, theBannerName: unknown = '300x250') {
        super(theBannerName, theDummyData);

        this.targetBanner = document.querySelector('.content-' + theBannerName);
        this.selectors = {
            spinner : this.targetBanner.parentElement.querySelector('#spinner'),
            contentWrapper : {
                self : this.targetBanner.querySelector('.content-wrapper'),
                head : {
                    self : this.targetBanner.querySelector('.head'),
                    logo : this.targetBanner.querySelector('.head .logo')
                },
                body : {
                    self : this.targetBanner.querySelector('.body'),
                    person : {
                        self : this.targetBanner.querySelector('.body .person'),
                        image : this.targetBanner.querySelector('.body .person img')
                    },
                    textWrapper : {
                        self : this.targetBanner.querySelector('.body .text-wrapper'),
                        slideOne : {
                            self : this.targetBanner.querySelector('#slide-one'),
                            slideOneTextOne : this.targetBanner.querySelector('#slide-one .text-one'),
                            slideOneTextTwo : this.targetBanner.querySelector('#slide-one .text-two')
                        },
                        slideTwo : {
                            self : this.targetBanner.querySelector('#slide-one'),
                            slideTwoTextOne : this.targetBanner.querySelector('#slide-one .text-one'),
                            slideTwoTextTwo : this.targetBanner.querySelector('#slide-one .text-two')
                        },
                    },
                    button : {
                        self : this.targetBanner.querySelector('.body .button'),
                        cta : this.targetBanner.querySelector('.body .button .cta')
                    },
                }
            },
            footer : {
                self : this.targetBanner.querySelector('.footer'),
                textWrapper : {
                    self : this.targetBanner.querySelector('.footer .text-wrapper'),
                    footerCopy : this.targetBanner.querySelector('.footer .text-wrapper .text')
                }
            }
        };
        // @ts-ignore
        this.clickTAGvalue = dhtml.getVar('clickTAG', 'https://kombijde.politie.nl/');
        // @ts-ignore
        this.landingpagetarget = dhtml.getVar('landingPageTarget', '_blank');
        // @ts-ignore
        this.dynAdsHelper = Adform.DynAdsHelper;
    }

    dynamicAds() {
        let _this = this;
        let clickArea = this.targetBanner;
        let bannerWidth = this.targetBanner.offsetWidth;
        let bannerHeight = this.targetBanner.offsetHeight;

        // @ts-ignore
        this.clickTAGvalue = dhtml.getVar('clickTAG', 'https://kombijde.politie.nl/');
        // clickArea
        clickArea.onclick = function() {
            window.open(_this.clickTAGvalue, _this.landingpagetarget);
        };
        // footer var
        this.dynAdsHelper.getVar('copy_footer', function(value:any) {
            let firstBase = value.split('|')[0];
            let secondBase = value.split('|')[1];
            _this.selectors.footer.textWrapper.footerCopy.innerHTML = '<span>' + firstBase + '</span>' + ' | ' +  secondBase;
        });
        // cta
        this.dynAdsHelper.getVar('cta_text', function(value:any) {
            _this.selectors.contentWrapper.body.button.cta.innerHTML = value;
        });
        // agent
        this.dynAdsHelper.getVar('asset_agenten', function(value: any) {
            _this.selectors.contentWrapper.body.person.image.setAttribute('src', value);
        });
        // slide one
        this.dynAdsHelper.getVar('copy_slide_one', function(value: any) {
            let sliderOne = _this.selectors.contentWrapper.body.textWrapper.slideOne;
            let firstBase = value.split('|')[0];
            let secondBase = value.split('|')[1];
            let first;
            let second;

            if(firstBase.match(/{{(\w+|\w+\s\w+)}}/g) == null) {
                // if the first row does not have yellow span / {{}}
                first = firstBase.replace(/{{(\w+|\w+\s\w+)}}/g, '');
                second = secondBase.match(/{{(\w+|\w+\s\w+)}}/g)[0].replace('{{',  '<span class="yellow">').replace('}}',  '</span>');
            }else {
                // if the first row does have yellow span / {{}}
                let yellowFirst = firstBase.match(/{{(\w+|\w+\s\w+)}}/g)[0].replace('{{',  '<span class="yellow">').replace('}}',  '</span>');
                let yellowSecond = secondBase.match(/{{(\w+(\s+)?\w+)}}/g)[0].replace('{{',  '<span class="yellow">').replace('}}',  '</span>');

                first = firstBase.replace(/{{(\w+|\w+\s\w+)}}/g, yellowFirst);
                second = secondBase.replace(/{{(\w+(\s+)?\w+)}}/g, yellowSecond);
            }
            sliderOne.slideOneTextOne.innerHTML = first;
            sliderOne.slideOneTextTwo.innerHTML = second;
        });
        // slide two
        this.dynAdsHelper.getVar('copy_silde_two', function(value :any) {
            let sliderTwo = _this.selectors.contentWrapper.body.textWrapper.slideTwo;
            let firstBase = value.split('|')[0];
            let secondBase = value.split('|')[1];
            let first;
            let second;

            if(firstBase.match(/{{(\w+|\w+\s\w+)}}/g) == null) {
                // if the first row does not have yellow span / {{}}
                first = firstBase.replace(/{{(\w+|\w+\s\w+)}}/g, '');
                second = secondBase.match(/{{(\w+|\w+\s\w+)}}/g)[0].replace('{{',  '<span class="yellow">').replace('}}',  '</span>');
            }else {
                // if the first row does have yellow span / {{}}
                let yellowFirst = firstBase.match(/{{(\w+|\w+\s\w+)}}/g)[0].replace('{{',  '<span class="yellow">').replace('}}',  '</span>');
                let yellowSecond = secondBase.match(/{{(\w+(\s+)?\w+)}}/g)[0].replace('{{',  '<span class="yellow">').replace('}}',  '</span>');
                first = firstBase.replace(/{{(\w+|\w+\s\w+)}}/g, yellowFirst);
                second = secondBase.replace(/{{(\w+(\s+)?\w+)}}/g, yellowSecond);
            }

            sliderTwo.slideTwoTextOne.innerHTML = first;
            sliderTwo.slideTwoTextTwo.innerHTML = second;
        });
        // background
        this.dynAdsHelper.getVar('asset_achtergrond', (value: any) => _this.selectors.contentWrapper.self.style.backgroundImage = `url(${value})`);
        // background position
        this.dynAdsHelper.getVar('achtergrond_positie_' + bannerWidth + 'x' + bannerHeight, (value:any) => _this.selectors.contentWrapper.self.style.backgroundPosition = value);

        //dynamic fontsize
        this.dynamicFontsize(_this.selectors.contentWrapper.body.textWrapper.slideOne.slideOneTextOne, _this.selectors.contentWrapper.body.textWrapper.self);
        this.dynamicFontsize(_this.selectors.contentWrapper.body.textWrapper.slideOne.slideOneTextTwo, _this.selectors.contentWrapper.body.textWrapper.self);

        this.dynamicFontsize(_this.selectors.contentWrapper.body.textWrapper.slideTwo.slideTwoTextOne, _this.selectors.contentWrapper.body.textWrapper.self);
        this.dynamicFontsize(_this.selectors.contentWrapper.body.textWrapper.slideTwo.slideTwoTextTwo, _this.selectors.contentWrapper.body.textWrapper.self);
    }
    animation() {
        /*
        ==========================
        animation
        ==========================
        */

        //CUSTOM EL
        let person = this.selectors.contentWrapper.body.person.self;

        let slideOneParent = this.selectors.contentWrapper.body.textWrapper.slideOne;
        let slideOne_textOne = slideOneParent.slideOneTextOne;
        let slideOne_textTwo = slideOneParent.slideOneTextTwo;

        let slideTwoParent = this.selectors.contentWrapper.body.textWrapper.slideTwo;
        let slideTwo_textOne = slideTwoParent.slideTwoTextOne;
        let slideTwo_textTwo = slideTwoParent.slideTwoTextTwo;

        let button = this.selectors.contentWrapper.body.button.self;
        // @ts-ignore
        let tlmain: TimelineMax = new TimelineMax({repeat: -1});

        tlmain
            .to(person, 0.2, {right:0, ease: Power2}, '+=0.5')
            //first text comes in
            .add('start-textOne', '+=0.4')
            .to(slideOne_textOne, 0.2, {left:0, ease: Power2.easeIn}, '+=0.4')
            .to(slideOne_textTwo, 0.2, {right:0, ease: Power2.easeIn}, 'start-textOne')
            //first text comes out
            .add('end-textOne', '+=1.4')
            .to(slideOne_textOne, 0.3, {left:310, ease: Power2.easeIn}, '+=1.4')
            .to(slideOne_textTwo, 0.3, {right:310, ease: Power2.easeIn}, 'end-textOne')
            //second text come in
            .add('start-textTwo', '+=0.5')
            .to(slideTwo_textOne, 0.2, {left:0, ease: Power2.easeIn}, '+=0.5')
            .to(slideTwo_textTwo, 0.2, {right:0, ease: Power2.easeIn}, 'start-textTwo')
            //button bang
            .to(button, 0.1, {scale: 1.13, fontSize:13, ease: Power2.easeIn}, '+=0.8')
            .to(button, 0.2, {scale: 1, fontSize:13, ease: Power2.easeIn})
            //button bang
            .to(button, 0.1, {scale: 1.13, fontSize:13, ease: Power2.easeIn}, '+=0.1')
            .to(button, 0.2, {scale: 1, fontSize:13, ease: Power2.easeIn})

            //second text comes out
            .add('end-textTwo', '+=1.4')
            .to(slideTwo_textOne, 0.3, {left:310, ease:Power2.easeIn}, '+=1.4')
            .to(slideTwo_textTwo, 0.3, {right:310, ease: Power2.easeIn}, 'end-textTwo')

            //person fade out
            .to(person, 0.4, {autoAlpha:0, ease: Power2}, '+=0.3')
    }
    start() {
        this.politeInit();
        let _this = this;
        let inter = setInterval(wait, 1000);

        function wait() {
            if(_this.isDevelop !== null) {
                clearInterval(inter);
                _this.initCode();
            }
        }
    }

    color(standardColor = 'green') {
        console.log("chill...");
        super.color(standardColor);
    }

    initCode() {
        console.log('code initialized');

        //this.setupDom(); done
        this.dynamicAds();
        //this.msieversion();
        this.animation();
        this.color();
    }
}
