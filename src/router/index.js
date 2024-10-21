import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(""),  
    routes: [    
        {      
            path: "/",      
            name: "LogInPage",      
            component: () => import("@/views/LogInPage.vue"),
            meta: { hideFooter: true } // Footer를 숨김    
        },
        {      
            path: "/join",      
            name: "JoinPage",      
            component: () => import("@/views/join/JoinPage.vue"), 
            meta: { hideFooter: true } // Footer를 숨김   
        },
        {      
            path: "/auth",      
            name: "AuthPage",      
            component: () => import("@/views/join/AuthPage.vue"),
            meta: { hideFooter: true } // Footer를 숨김
        },
        {      
            path: "/joinform",      
            name: "JoinForm",      
            component: () => import("@/views/join/JoinForm.vue"),    
            meta: { hideFooter: true } // Footer를 숨김 
        },
        {      
            path: "/joinend",      
            name: "JoinEnd",      
            component: () => import("@/views/join/JoinEnd.vue"),
            meta: { hideFooter: true } // Footer를 숨김    
        },            
        {      
            path: "/findid",      
            name: "FindID",      
            component: () => import("@/views/find/FindID.vue"), 
            meta: { hideFooter: true } // Footer를 숨김
        },   
        {      
            path: "/yourid",      
            name: "YourID",      
            component: () => import("@/views/find/YourID.vue"), 
            meta: { hideFooter: true } // Footer를 숨김
        },    
        {      
            path: "/findpw",      
            name: "FindPW",      
            component: () => import("@/views/find/FindPW.vue"), 
            meta: { hideFooter: true } // Footer를 숨김  
        },   
        {      
            path: "/main",      
            name: "MainPage",      
            component: () => import("@/views/MainPage.vue"),    
        },      
        // {      
        //     path: "/",      
        //     name: "HelloWorld",      
        //     component: () => import("../components/HelloWorld.vue"),    
        // },  
        {      
            path: "/popup",      
            name: "Popup",      
            component: () => import("@/components/PopCoupon.vue"),    
        },     
        {      
            path: "/qrscan",      
            name: "QRScan",      
            component: () => import("@/components/QrScan.vue"),    
        },   
        {      
            path: "/cmlist",      
            name: "CMList",      
            component: () => import("@/views/cm/CMList.vue"),    
        },   
        {      
            path: "/cmcancel",      
            name: "CMListCancel",      
            component: () => import("@/views/cm/CMListCancel.vue"),    
        },   
        {      
            path: "/cmpin",      
            name: "CMPin",      
            component: () => import("@/views/cm/CMPin.vue"),    
        },      
        {      
            path: "/cmqr",      
            name: "CMQr",      
            component: () => import("@/views/cm/CMQr.vue"),    
        },      
        {      
            path: "/cmake",      
            name: "CouponMake",      
            component: () => import("@/views/coupon/CouponMake.vue"),    
        },    
        {      
            path: "/cevent",      
            name: "CouponEvent",      
            component: () => import("@/views/coupon/CouponEvent.vue"),    
        },      
        {      
            path: "/charge",      
            name: "CMCharge",      
            component: () => import("@/views/cm/CMCharge.vue"),    
        },      
        {      
            path: "/event",      
            name: "MainEvent",      
            component: () => import("@/views/MainEvent.vue"),    
        },      
        {      
            path: "/edownload",      
            name: "MainEventDownload",      
            component: () => import("@/views/MainEventDownload.vue"),    
        },      
        {      
            path: "/shopin",      
            name: "ShopIn",      
            component: () => import("@/views/shopin/ShopIn.vue"),    
        },     
        {      
            path: "/shopin2",      
            name: "ShopIn2",      
            component: () => import("@/views/shopin/ShopIn2.vue"),    
        },    
        {      
            path: "/shopin3",      
            name: "ShopIn3",      
            component: () => import("@/views/shopin/ShopIn3.vue"),    
        },
        {      
            path: "/complete",      
            name: "ShopInComplete",      
            component: () => import("@/views/ShopInComplete.vue"),    
        },
        {      
            path: "/findshop",      
            name: "FindShop",      
            component: () => import("@/views/findshop/FindShop.vue"),    
        },
        {      
            path: "/findmap",      
            name: "FindMap",      
            component: () => import("@/views/findshop/FindMap.vue"),    
        },
        {      
            path: "/mapdetail",      
            name: "FindMapDetail",      
            component: () => import("@/views/findshop/FindMapDetail.vue"),    
        },
        // {      
        //     path: "/shopin4",      
        //     name: "ShopIn4",      
        //     component: () => import("@/views/ShopIn4.vue"),    
        // },          
        {      
            path: "/service",      
            name: "ServiceAgreement",      
            component: () => import("@/views/form/ServiceAgreement.vue"),    
        },      
        {      
            path: "/privacy",      
            name: "PrivacyAgreement",      
            component: () => import("@/views/form/PrivacyAgreement.vue"),    
        },      
        {      
            path: "/marketing",      
            name: "MarketingAgreement",      
            component: () => import("@/views/form/MarketingAgreement.vue"),    
        },      
        {      
            path: "/advertise",      
            name: "AdvertiseAgreement",      
            component: () => import("@/views/form/AdvertiseAgreement.vue"),    
        },      
        {      
            path: "/locate",      
            name: "LocationAgreement",      
            component: () => import("@/views/form/LocationAgreement.vue"),    
        },      
        {      
            path: "/location",      
            name: "FindLocation",      
            component: () => import("@/components/FindLocation.vue"),    
        },      
        {      
            path: "/footer",      
            name: "Footer",      
            component: () => import("@/components/FooterPage.vue"),    
        },   
        {      
            path: "/test",      
            name: "TestingPinia",      
            component: () => import("@/views/TestingPinia.vue"),    
        },      
        {      
            path: "/testing",      
            name: "PractuceExe",      
            component: () => import("@/views/PracticIng.vue"),    
        },     
        {      
            path: "/paging",      
            name: "TestingPage",      
            component: () => import("@/components/TestingPage.vue"),    
        },     
        {      
            path: "/mypage/:id",      
            name: "mypage",      
            component: () => import("@/views/Mypage.vue"),    
        },     
        {      
            path: "/changepw",      
            name: "changePassword",      
            component: () => import("@/views/change/ChangePw.vue"),    
        }, 
        {      
            path: "/ChangePin1",      
            name: "ChangePin1",      
            component: () => import("@/views/changePin/ChangePin1.vue"),    
        }  ,
        {      
            path: "/ChangePin2",      
            name: "ChangePin2",      
            component: () => import("@/views/changePin/ChangePin2.vue"),    
        } ,
        {      
            path: "/ChangePin3",      
            name: "ChangePin3",      
            component: () => import("@/views/changePin/ChangePin3.vue"),    
        }  ,
        {      
            path: "/ChangePin4",      
            name: "ChangePin4",      
            component: () => import("@/views/changePin/ChangePin4.vue"),    
        }  ,
        {      
            path: "/Notice",      
            name: "NoticePage",      
            component: () => import("@/views/notice/NoticePage.vue"),    
        }  ,
        {      
            path: "/DetailPgae/:id",      
            name: "DetailPgae",      
            component: () => import("@/views/notice/DetailPgae.vue"),    
        }  ,
        {      
            path: "/Inquiry",      
            name: "InquiryPage",      
            component: () => import("@/views/inquiry/InquiryPage.vue"),    
        }  ,
        {      
            path: "/InquiryList",      
            name: "InquiryList",      
            component: () => import("@/views/inquiry/InquiryList.vue"),    
        }  ,
        {      
            path: "/InquiryListDetail/:id",      
            name: "InquiryListDetail",      
            component: () => import("@/views/inquiry/InquiryListDetail.vue"),    
        }  ,

        {      
            path: "/Terms",      
            name: "TermsPage",      
            component: () => import("@/views/franchisee/TermsPage.vue"),    
        }  ,
        {
            path: '/Terms/userService',
            name:'userService',
            component:()=> import("@/views/UeserService.vue")
        },
        {
            path: '/Terms/Franchiseeprivacy',
            name:'franchisee_privacy',
            component:()=> import("@/views/franchisee/FranchiseePrivacy.vue")
        },
        {
            path: '/Terms/FranchiseeMarketing',
            name:'franchisee_Marketing',
            component:()=> import("@/views/franchisee/FranchiseeMarketing.vue")
        },
        {
            path: '/Terms/FranchiseeAdvertisement',
            name:'franchisee_Advertisement',
            component:()=> import("@/views/franchisee/FranchiseeAdvertisement.vue")
        },
        {
            path: '/Terms/FranchiseeLocation',
            name:'franchisee_location',
            component:()=> import("@/views/franchisee/FranchiseeLocation.vue")
        },  
        {
            path: '/buisness',
            name:'BuisnessPgae',
            component:()=> import("@/views/BuisnessPage.vue")
        },  
        {
            path: '/franchiseeInfo',
            name:'FranchiseeInfo',
            component:()=> import("@/views/franchisee/FranchiseeInfo.vue")
        },  
        {
            path: '/couponbox',
            name:'CouponBox',
            component:()=> import("@/views/coupon/CouponBox.vue")
        },  

        {
            path: '/subPw',
            name:'subPw',
            component:()=> import("@/views/sub/SubPw.vue")
        },  
        
        {
            path: '/subId',
            name:'subId',
            component:()=> import("@/views/sub/SubId.vue")
        },  
        
        {
            path: '/ChangeFranchise',
            name:'ChangeFranchise',
            component:()=> import("@/views/change/ChangeFranchise.vue")
        },  
        {
            path: '/CustomerManagement',
            name:'CustomerManagement',
            component:()=> import("@/views/CustomerManagement.vue")
        },  
        {
            path: '/couponDetail/:id',
            name:'couponDetail',
            component:()=> import("@/views/coupon/CouponDetail.vue")
        },  
        {
            path: '/storeInformation',
            name:'storeInformation',
            component:()=> import("@/views/StoreInformation.vue")
        },  
        {
            path: '/franchiseEdit',
            name:'franchiseEdit',
            component:()=> import("@/views/franchisee/FranchiseEdit.vue")
        },  
        {
            path: '/changeImg',
            name:'changeImg',
            component:()=> import("@/views/change/ChangeImg.vue")
        }, 
        {
            path: '/couponGift',
            name:'couponGift',
            component:()=> import("@/views/coupon/CouponGift.vue"),
        },  
        {
            path: '/confirmpin',
            name:'confirmPin',
            component:()=> import("@/components/ConfirmPin.vue")
        },  
        {
            path: '/gift/:id',
            name:'giftPage',
            component:()=> import("@/views/GiftPage.vue")
        },  
        {
            path: '/roulette',
            name:'roulettePgae',
            component:()=> import("@/views/RoulettePage.vue")
        },  
    

    ],

    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            // 뒤로 가기/앞으로 가기 버튼을 눌렀을 때 저장된 스크롤 위치로 이동
            return savedPosition;
        } else {
            // 그 외의 경우 항상 페이지 상단으로 이동
            return { left: 0, top: 0 };
        }
    }

}); 

export default router;