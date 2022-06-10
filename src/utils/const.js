export const statusOptions = [
  { value: 1, key: 'option.hotelStatus.waiting' },
  { value: 2, key: 'option.hotelStatus.displayed' },
  { value: 3, key: 'option.hotelStatus.contracted' },
  { value: 4, key: 'option.hotelStatus.trial' }
]

export const statusOptionsV2 = [
  { value: 1, key: 'option.hotelStatus.waiting' },
  { value: 2, key: 'option.hotelStatus.displayed' },
  { value: 3, key: 'option.hotelStatus.contracted' },
  { value: 4, key: 'option.hotelStatus.trial' },
  { value: 5, key: 'option.hotelStatus.terminated' },
  { value: 6, key: 'option.hotelStatus.suspended' }
]

export const statusOptionsV3 = [
  { value: 0, key: 'option.status.allNoticeType' },
  { value: 1, key: 'option.status.normal' },
  { value: 2, key: 'option.status.donateCoupon' },
  { value: 3, key: 'option.status.remindCoupon' }
]

export const statusOptionsV4 = [
  { value: 0, key: 'option.status.allStatus' },
  { value: 1, key: 'option.status.draft' },
  { value: 2, key: 'option.status.created' },
  { value: 3, key: 'option.status.sending' },
  { value: 4, key: 'option.status.sent' }
]

export const targetType = [
  { value: 2, key: 'option.targetType.promotion' },
  { value: 13, key: 'option.targetType.hotelGo2Choice' },
  { value: 4, key: 'option.targetType.hotel' },
  { value: 1, key: 'option.targetType.notice' },
  { value: 3, key: 'option.targetType.serviceAgreement' },
  { value: 5, key: 'option.targetType.faq' },
  { value: 6, key: 'option.targetType.inviteFriend' },
  { value: 7, key: 'option.targetType.openApp' },
  { value: 8, key: 'option.targetType.mileagePoint' },
  { value: 9, key: 'option.targetType.directDiscount' },
  { value: 10, key: 'option.targetType.signUp' },
  { value: 11, key: 'option.targetType.promotionGroup' },
  { value: 14, key: 'option.targetType.amenityPack' }
]

export const targetTypeV2 = [
  { value: 1, key: 'option.targetType.promotionEvent' },
  { value: 13, key: 'option.targetType.hotelGo2Choice' },
  { value: 2, key: 'option.targetType.hotel' },
  { value: 3, key: 'option.targetType.notice' },
  { value: 4, key: 'option.targetType.link' },
  { value: 5, key: 'option.targetType.district' },
  { value: 6, key: 'option.targetType.mileagePoint' },
  { value: 7, key: 'option.targetType.coupon' },
  { value: 8, key: 'option.targetType.directDiscount' },
  { value: 9, key: 'option.targetType.inviteFriend' },
  { value: 10, key: 'option.targetType.promotionGroup' },
  { value: 12, key: 'option.targetType.amenityPack' }
]

export const sendToOptions = [
  { value: 0, key: 'option.status.sendTo' },
  { value: 1, key: 'option.status.allUser' },
  { value: 2, key: 'option.status.go2joy' },
  { value: 3, key: 'option.status.allPartner' },
  { value: 6, key: 'option.status.allTrailPartner' },
  { value: 7, key: 'option.status.allContractPartner' },
  { value: 8, key: 'option.status.allImportFromExcelFile' },
  { value: 9, key: 'option.status.crmFilter' },
  { value: 10, key: 'option.status.userInput' }
]

export const sendToOptionsV2 = [
  { value: 1, key: 'option.status.allUser' },
  { value: 2, key: 'option.status.go2joy' },
  { value: 3, key: 'option.status.allPartner' },
  { value: 7, key: 'option.status.allContractPartner' },
  { value: 8, key: 'option.status.allImportFromExcelFile' },
  { value: 9, key: 'option.status.crmFilter' }
]

export const contractOptions = [
  { value: 0, key: 'option.contracts.notClassified' },
  { value: 1, key: 'option.contracts.type1' },
  { value: 2, key: 'option.contracts.type2' },
  { value: 3, key: 'option.contracts.type3' },
  { value: 4, key: 'option.contracts.type4Recontracted' },
  { value: 5, key: 'option.contracts.typeGo2joyRoom' }
]

export const typeOptions = [
  { value: 0, key: 'option.hotelTypes.none' },
  { value: 1, key: 'option.hotelTypes.couples' },
  { value: 2, key: 'option.hotelTypes.travel' },
  { value: 3, key: 'option.hotelTypes.couplesAndTravel' },
  { value: 4, key: 'option.hotelTypes.quarantine' }
]

export const typeOptionsV2 = [
  { value: 0, key: 'option.hotelTypes.allTypes' },
  { value: 1, key: 'option.hotelTypes.couples' },
  { value: 2, key: 'option.hotelTypes.travel' },
  { value: 3, key: 'option.hotelTypes.couplesAndTravel' },
  { value: 4, key: 'option.hotelTypes.quarantine' }
]
export const routerView = {
  render: function (createElement) {
    return createElement(
      'router-view'
    )
  }
}
