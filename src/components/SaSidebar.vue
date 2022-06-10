<template>
  <el-menu
    fixed
    :default-active="$route.path"
    class="el-menu-vertical"
    :collapse="isCollapse"
    @select="handleSelect"
  >
    <!-- <div v-if="hasPermission(menu.permission)"> -->
      <component
        :is="menu.childrens ? 'ElSubmenu' : 'ElMenuItem'"
        v-for="menu in menus"
        :key="'top-menu-' + menu.title"
        :index="menu.path || menu.title"
        :default-active="menu.children ? $router.currentRoute.fullPath: null"
        :class="{'is-active' : setActive(menu.actives)}"
      >
        <template
          :slot="menu.childrens ? 'title': 'default'"
        >
          <i v-if="menu.icon" :class="menu.icon" />
          <img v-if="menu.image" :src="menu.image" class="menu-image">
          <span class="submenu-title" slot="title">{{ $t(`breadcrumb.${menu.title}`) }}</span>
        </template>
        <el-menu-item
          v-for="sub in menu.childrens"
          :key="'sub-menu-'+ menu.title+'-'+sub.title"
          :index="sub.path || sub.title"
          :class="{'is-active' : setActive(sub.actives)}"
        >
          <span class="router-children">{{ $t(`breadcrumb.${sub.title}`) }}</span>
        </el-menu-item>
      </component>
  </el-menu>
</template>

<script>
export default {
  name: 'SaSidebar',
  props: {
    isCollapse: Boolean
  },
  computed: {
    menus () {
      return [
        {
          title: 'activities',
          path: '/hotel/sadmin/activities',
          image: require('@/assets/images/svg/collapse.svg'),
          actives: ['activities_detail']
        },
        {
          title: 'home',
          path: '/hotel/sadmin/dashboard',
          image: require('@/assets/images/svg/dashboard.svg'),
          actives: ['categoryEdit', 'collection', 'collectionDetails', 'collectionEdit', 'categoryDetails', 'selectApplyHotel']
        },
        {
          title: 'hotels',
          image: require('@/assets/images/svg/advanced.svg'),
          actives: [
            'hotels',
            'hotel_staff_mgt',
            'hotel_staff_detail',
            'hotel_staff_edit',
            'hotel_staff_create',
            'product_type_create',
            'product_type_edit',
            'hotel_group_create',
            'hotel_group_detail',
            'hotel_group_edit',
            'product_detail',
            'product-mgt',
            'hotel-facility-mgt',
            'facility_create',
            'facility_edit',
            'hotel_facility_mgt',
            'notice_to_hotel',
            'notice_to_hotel_detail',
            'notice_to_hotel_create',
            'notice_edit',
            'create_apply_for_hotel',
            'reply_to_hotel',
            'list_apply_for_hotel',
            'notice_to_hotel_reply',
            'send_notice_to_hotel',
            'hotelDisplayCreate',
            'hotelDisplayEdit',
            'hotelDisplayDetails',
            'detailRoomType',
            'settingFs',
            'room_type',
            'editRoomType',
            'createRoomType',
            'stampCreate',
            'stampDetailTotalUser',
            'stampDetails',
            'stampEdit'
          ],
          childrens: [
            {
              title: 'product_type_mgt',
              path: '/hotel/sadmin/product-type-mgt',
              actives: ['product-type-mgt', 'product_type_create', 'product_type_edit']
            },
            {
              title: 'product_mgt',
              path: '/hotel/sadmin/product-mgt',
              actives: ['product-mgt', 'product_detail']
            },
            {
              title: 'hotel_group_mgt',
              path: '/hotel/sadmin/hotel-group-mgt',
              actives: ['hotel-group-mgt', 'hotel_group_create', 'hotel_group_detail', 'hotel_group_edit']
            },
            {
              title: 'hotel_staff_mgt',
              path: '/hotel/sadmin/hotel-staff-mgt',
              actives: ['hotel_staff_mgt', 'hotel_staff_detail', 'hotel_staff_edit', 'hotel_staff_create']
            },
            {
              title: 'hotel_facility_mgt',
              path: '/hotel/sadmin/hotel-facility-mgt',
              actives: ['facility_create', 'facility_edit', 'hotel_facility_mgt']
            },
            {
              title: 'notice_to_hotel',
              path: '/hotel/sadmin/notice-to-hotel',
              actives: ['notice_to_hotel', 'notice_to_hotel_detail', 'notice_to_hotel_create', 'notice_edit', 'create_apply_for_hotel', 'reply_to_hotel', 'list_apply_for_hotel', 'notice_to_hotel_reply', 'send_notice_to_hotel']
            },
            {
              title: 'hotelDisplay',
              path: '/hotel/sadmin/hotel-display',
              actives: [
                'hotelDisplayCreate',
                'hotelDisplayEdit',
                'hotelDisplayDetails'
              ]
            },
            {
              title: 'roomType',
              path: '/hotel/sadmin/room-type',
              actives: [
                'detailRoomType',
                'settingFs',
                'roomType',
                'editRoomType',
                'createRoomType'
              ]
            },
            {
              title: 'stamp',
              path: '/hotel/sadmin/stamp',
              actives: [
                'stampCreate',
                'stampDetailTotalUser',
                'stampDetails',
                'stampEdit'
              ]
            },
            {
              title: 'review',
              path: '/hotel/sadmin/review'
            }
          ]
        },
        {
          title: 'user',
          image: require('@/assets/images/svg/user.svg'),
          actives: ['userDetails', 'userEdit', 'firstBookingDetails', 'pointListMgt'],
          childrens: [
            {
              title: 'userMgt',
              path: '/hotel/sadmin/users',
              actives: ['userDetails', 'userEdit', 'pointListMgt']
            },
            {
              title: 'deviceMgt',
              path: '/hotel/sadmin/device'
            },
            {
              title: 'counselingMgt',
              path: '/hotel/sadmin/counseling'
            },
            {
              title: 'firstBooking',
              path: '/hotel/sadmin/first-booking',
              actives: ['firstBookingDetails']
            }
          ]
        },
        {
          title: 'booking',
          image: require('@/assets/images/svg/basic.svg'),
          actives: [
            'bookingReportHotels',
            'searchByBookingNo',
            'cashFlowReportDetail',
            'sendMail',
            'revenueReportDetails',
            'sendingMailCreate',
            'sendingMailDetails'
          ],
          childrens: [
            {
              title: 'bookingReport',
              path: '/hotel/sadmin/booking-report',
              actives: ['bookingReportHotels', 'searchByBookingNo']
            },
            {
              title: 'cashFlowReport',
              path: '/hotel/sadmin/cash-flow-report',
              actives: ['cashFlowReportDetail', 'sendMail']
            },
            {
              title: 'hotelDebt',
              path: '/hotel/sadmin/hotel-debt',
              actives: ['hotelDebtDetailList', 'hotelDebtEdit', 'hotelDebtDetail', 'hotelDebtDetailList', 'hotelDebtReview', 'hotelDebtCreate', 'ApplyForHotel']
            },
            {
              title: 'sendingMail',
              path: '/hotel/sadmin/sending-mail',
              actives: [
                'sendingMailCreate',
                'sendingMailDetails'
              ]
            },
            {
              title: 'revenueReport',
              path: '/hotel/sadmin/revenue-report',
              actives: ['revenueReportDetails']
            }
          ]
        },
        {
          title: 'marketing',
          icon: 'el-icon-data-line',
          actives: [
            'articleCreate',
            'articleEdit',
            'articleSetup',
            'Pin article',
            'Article with title',
            'Article with image',
            'Article with summary',
            'Article collection',
            'articleCategoryEdit',
            'articleCategoryCreate',
            'smsCreate',
            'promotion',
            'createPromotion',
            'editPromotion',
            'promotionDetails',
            'couponCondition',
            'hotelApply',
            'userApply',
            'applyForUser',
            'applyForHotel',
            'applyForHotelRoom',
            'chooseWinner',
            'hotelApply',
            'userApply',
            'groupPromotion',
            'editGroupPromotion',
            'createGroupPromotion',
            'applyForPromotion',
            'settingGroupPromotion',
            'crm',
            'crmDetail',
            'crmCreate',
            'inviteFriendCreate',
            'inviteFriendEdit',
            'inviteFriendDetails',
            'inviteFriendDetailsList',
            'inviteeList',
            'noticeCreate',
            'noticeEdit',
            'noticeDetails',
            'notificationCreate',
            'notificationEdit',
            'notificationDetails',
            'bannerCreate',
            'bannerEdit',
            'bannerDetails',
            'bannerSetting',
            'popupCreate',
            'popupEdit',
            'popupDetails',
            'popupSetting',
            'pgpbCreate',
            'pgpbEdit',
            'pgpb',
            'pgpbTotalOfIntroduction'
          ],
          childrens: [
            {
              title: 'promotion',
              path: '/hotel/sadmin/promotion',
              actives: [
                'createPromotion',
                'editPromotion',
                'promotionDetails',
                'couponCondition',
                'hotelApply',
                'userApply',
                'applyForUser',
                'applyForHotel',
                'applyForHotelRoom',
                'chooseWinner',
                'hotelApply',
                'userApply',
                'groupPromotion',
                'editGroupPromotion',
                'createGroupPromotion',
                'applyForPromotion',
                'settingGroupPromotion'
              ]
            },
            {
              title: 'inviteFriend',
              path: '/hotel/sadmin/invite-friend',
              actives: [
                'inviteFriendCreate',
                'inviteFriendEdit',
                'inviteFriendDetails',
                'inviteFriendDetailsList',
                'inviteeList'
              ]
            },
            {
              title: 'notice',
              path: '/hotel/sadmin/notice',
              actives: [
                'noticeCreate',
                'noticeEdit',
                'noticeDetails'
              ]
            },
            {
              title: 'notification',
              routeName: '/hotel/sadmin/notification',
              path: '/hotel/sadmin/notification',
              actives: [
                'notificationCreate',
                'notificationEdit',
                'notificationDetails'
              ]
            },
            {
              title: 'banner',
              routeName: '/hotel/sadmin/banner',
              actives: [
                'bannerCreate',
                'bannerEdit',
                'bannerDetails',
                'bannerSetting',
                'banner'
              ]
            },
            {
              title: 'popup',
              routeName: '/hotel/sadmin/popup',
              actives: [
                'popupCreate',
                'popupEdit',
                'popupDetails',
                'popupSetting',
                'popup'
              ]
            },
            {
              title: 'sms',
              path: '/hotel/sadmin/sms',
              actives: ['smsCreate']
            },
            {
              title: 'crm',
              path: '/hotel/sadmin/crm',
              actives: [
                'crmDetail',
                'crmCreate'
              ]
            },
            {
              title: 'pgpb',
              routeName: '/hotel/sadmin/pgpb',
              actives: [
                'pgpbCreate',
                'pgpbEdit',
                'pgpb',
                'pgpbTotalOfIntroduction'
              ]
            },
            {
              title: 'articleHome',
              path: '/hotel/sadmin/article-home',
              actives: [
                'articleSetup',
                'Pin article',
                'Article with title',
                'Article with image',
                'Article with summary',
                'Article collection'
              ]
            },
            {
              title: 'article',
              path: '/hotel/sadmin/article',
              actives: ['articleCreate', 'articleEdit']
            },
            {
              title: 'articleCategory',
              path: '/hotel/sadmin/article-category',
              actives: ['articleCategoryEdit', 'articleCategoryCreate']
            }
          ]
        },
        {
          title: 'saAccountMgt',
          icon: 'el-icon-user',
          actives: ['go2joyStaffDetails', 'go2joyStaffCreate', 'go2joyStaffEdit', 'SaleIncentiveHistoryDetails', 'SaleIncentiveHistoryCreate', 'DetailsOfStaff', 'AccountSaleIncentiveDetail'],
          childrens: [
            {
              title: 'SaleIncentiveHistory',
              path: '/hotel/sadmin/sale-incentive-history',
              actives: ['SaleIncentiveHistoryDetails', 'SaleIncentiveHistoryCreate', 'DetailsOfStaff', 'AccountSaleIncentiveDetail']
            },
            {
              title: 'go2joyStaffs',
              path: '/hotel/sadmin/staffs-management',
              actives: ['go2joyStaffDetails', 'go2joyStaffCreate', 'go2joyStaffEdit']
            },
            {
              title: 'go2joyConfirmGroup',
              path: '/hotel/sadmin/confirm-group-mgt',
              actives: ['go2joyConfirmGroup']
            },
            {
              title: 'permission',
              path: '/hotel/sadmin/permission',
              actives: ['permissionDetails']
            }
          ]
        },
        {
          title: 'mileagePointMgt',
          image: require('@/assets/images/svg/dollar.svg'),
          actives: ['mpUserMgt', 'pointListMgt', 'mpBoostingDetails', 'mpBoostingCreate', 'mpBoostingEdit'],
          childrens: [
            {
              title: 'mpBoostingMgt',
              path: '/hotel/sadmin/mp-boosting-mgt',
              actives: ['mpBoostingDetails', 'mpBoostingCreate', 'mpBoostingEdit']
            },
            {
              title: 'mpUserMgt',
              path: '/hotel/sadmin/mp-user-mgt'
            }
          ]
        },
        {
          title: 'trackingMgt',
          image: require('@/assets/images/svg/basic.svg'),
          actives: ['trackingMgt', 'bookingTrackingMgt', 'hotelStatusTrackingMgt', 'hotelIntroduceSignup', 'hotelIntroduceSignup', 'numberOfSignup', 'checkinByRegister'],
          childrens: [
            {
              title: 'bookingTrackingMgt',
              path: '/hotel/sadmin/booking-tracking-mgt',
              actives: ['bookingTrackingMgt']
            },
            {
              title: 'hotelStatusTrackingMgt',
              path: '/hotel/sadmin/hotel-status-tracking-mgt',
              actives: ['hotelStatusTrackingMgt']
            },
            {
              title: 'hotelIntroduceSignup',
              path: '/hotel/sadmin/hotel-introduce-signup',
              actives: ['hotelIntroduceSignup', 'numberOfSignup', 'checkinByRegister']
            }
          ]
        },
        {
          title: 'settings',
          icon: 'el-icon-s-tools',
          actives: ['openSecondSplashEdit', 'openSecondSplashCreate', 'hotelOnTopEdit', 'hotelOnTopCreate'],
          childrens: [
            {
              title: 'generalSetting',
              path: '/hotel/sadmin/general-setting'
            },
            {
              title: 'openSecondSplash',
              path: '/hotel/sadmin/open-second-splash',
              actives: ['openSecondSplashEdit', 'openSecondSplashCreate']
            },
            {
              title: 'hotelOntop',
              path: '/hotel/sadmin/hotel-on-top-management',
              actives: ['hotelOnTopEdit', 'hotelOnTopCreate']
            }
          ]
        }
      ]
    }
  },
  methods: {
    setActive (actives = []) {
      if (actives && actives.length === 0) {
        return false
      }
      const result = actives.find(item => item === this.$router.currentRoute.name)
      return !!result
    },
    handleSelect (key) {
      if (key !== this.$router.currentRoute.fullPath) {
        this.$router.push(key)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
}
.el-image {
  height: 100%;
  width: 170px;
  padding-top: 10px;
  padding-left: 10px;
}
.el-submenu .el-menu-item {
  min-width: auto;
}
.el-menu {
  height: 100%;
  .menu-image {
    display: inline-block;
    width: 20px;
    vertical-align: middle;
    margin-right: 10px;
    filter: invert(0.6) sepia(1) saturate(1) hue-rotate(185deg);
  }
  .el-menu-item {
    padding: 0;
    .el-tooltip {
      padding: 14px 20px !important;
    }
    a {
      width: 100%;
      height: 100%;
      display: block;
      color: #263a5b;
    }
  }
}
.el-submenu.is-active,
.el-menu-item.is-active {
  .submenu-title,
  .router-link-active {
    color: #ff6400;
  }
  .menu-image {
    filter: invert(40%) sepia(67%) saturate(3335%) hue-rotate(5deg) brightness(95%) contrast(102%) !important;
  }
}
.el-menu-item.is-active {
  .router-children {
    color: #ff6400;
  }
}
.el-submenu:hover, .el-menu-item:hover {
  .submenu-title {
    color: #ff6400;
  }
  .menu-image {
    filter: invert(40%) sepia(67%) saturate(3335%) hue-rotate(5deg) brightness(95%) contrast(102%) !important;
  }
}
.el-menu-item:hover {
  .router-children {
    color: #ff6400;
  }
}
</style>
